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
  scoreType: string = 'overall',
  focusedCountry: string | null = null,
  fadeProgress: number = 0
): THREE.MeshLambertMaterial {
  const countryName = normalize(d.properties.ADMIN);

  const isHovered = hoveredFeature && d === hoveredFeature;
  const isFocused = focusedCountry && d.properties.ADMIN === focusedCountry;
  const cacheKey = `${countryName}_${scoreType}_${isHovered ? 1 : 0}_${isFocused ? 1 : 0}_${Math.round(fadeProgress * 10)}`;

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

  // If focused from search, interpolate between red and normal color
  if (isFocused && fadeProgress > 0) {
    const country = data.find((d) => normalize(d.country) === countryName);
    let normalRank: number | null = null;
    if (country) {
      const rawRank =
        scoreType === 'overall'
          ? country.kri_rank
          : country[scoreType as keyof CountryData];
      normalRank = typeof rawRank === 'number' ? rawRank : null;
    }

    const normalColor = normalRank
      ? rankBasedColorScale(normalRank)
      : colors.noData;

    // Use THREE.js color interpolation which is more reliable
    const redColorObj = new THREE.Color('#ff4757');
    const normalColorObj = new THREE.Color(normalColor);

    const interpolatedColor = redColorObj
      .clone()
      .lerp(normalColorObj, 1 - fadeProgress);

    const material = new THREE.MeshLambertMaterial({
      color: interpolatedColor,
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
