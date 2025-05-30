import * as THREE from 'three';
import { GeoJsonFeature, CountryData } from '../types';
import { rankBasedColorScale, colors } from '../utils/color';
import { normalize } from '../utils/utils';

// material cache to prevent excessive object creation
const materialCache = new Map<string, THREE.MeshLambertMaterial>();
const MAX_CACHE_SIZE = 500;

export function getOrCreatePolygonMaterial(
  d: any,
  data: CountryData[],
  hoveredFeature: GeoJsonFeature | null,
  desaturationProgress: number,
  scoreType: string = 'overall'
): THREE.MeshLambertMaterial {
  const countryName = normalize(d.properties.ADMIN);

  const isHovered = hoveredFeature && d === hoveredFeature;
  const cacheKey = `${countryName}_${scoreType}_${isHovered ? 1 : 0}`;

  if (materialCache.has(cacheKey)) {
    return materialCache.get(cacheKey)!;
  }

  if (materialCache.size > MAX_CACHE_SIZE) {
    const keysToRemove = Array.from(materialCache.keys()).slice(
      0,
      MAX_CACHE_SIZE / 2
    );
    keysToRemove.forEach((k) => materialCache.delete(k));
  }

  const country = data.find((d) => normalize(d.country) === countryName);

  let rank: number | null = null;
  if (country) {
    const rawRank =
      scoreType === 'overall'
        ? country.kri_rank
        : country[scoreType as keyof CountryData];
    rank = typeof rawRank === 'number' ? rawRank : null;
  }

  if (rank === null) {
    const material = new THREE.MeshLambertMaterial({
      color: new THREE.Color(colors.noData),
      transparent: true,
      opacity: 1,
      depthWrite: false,
    });
    materialCache.set(cacheKey, material);
    return material;
  }

  const opacity = !hoveredFeature
    ? 1
    : isHovered
      ? 1
      : 1 - 0.7 * desaturationProgress;
  const baseColor = rankBasedColorScale(rank);

  const material = new THREE.MeshLambertMaterial({
    color: new THREE.Color(baseColor),
    transparent: true,
    opacity,
    depthWrite: false,
  });

  materialCache.set(cacheKey, material);
  return material;
}
