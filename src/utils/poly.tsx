import * as THREE from 'three';
import { rankBasedColorScale, colors } from './color';
import { normalize } from './utils';
import {
  GeoJsonFeature,
  CountryData,
  InfoPanelState,
  TooltipSetter,
} from '../types';

const materialCache = new Map<string, THREE.MeshLambertMaterial>();

export function createPolygonMaterial(
  d: any,
  data: CountryData[],
  hoverD: GeoJsonFeature | null,
  desaturationProgress: number,
  scoreType: string = 'overall'
): THREE.MeshLambertMaterial {
  const countryName = normalize(d.properties.ADMIN);
  const country = data.find((d) => normalize(d.country) === countryName);

  let rank: number | null = null;
  if (country) {
    const rawRank =
      scoreType === 'overall'
        ? country.kri_rank
        : country[scoreType as keyof CountryData];
    rank = typeof rawRank === 'number' ? rawRank : null;
  }

  const isHovered = hoverD && d === hoverD;
  const opacity = !hoverD ? 1 : isHovered ? 1 : 1 - 0.7 * desaturationProgress;

  const cacheKey = `${countryName}_${rank}_${isHovered}_${opacity}_${scoreType}`;

  if (materialCache.has(cacheKey)) {
    return materialCache.get(cacheKey)!;
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

export function handlePolygonClick(
  polygon: object | null,
  data: CountryData[],
  setTooltip: TooltipSetter,
  setInfoPanel: React.Dispatch<React.SetStateAction<InfoPanelState>>
): void {
  if (!polygon) return;
  const clicked = polygon as GeoJsonFeature;
  const countryName = clicked.properties.ADMIN || 'Unknown';
  const country = data.find(
    (d) => normalize(d.country) === normalize(countryName)
  );
  if (country) {
    setTooltip(null);
    setInfoPanel({
      countryName,
      country,
    });
  }
}

interface HoverConfig {
  setTooltip: TooltipSetter;
  setHoverD: (d: GeoJsonFeature | null) => void;
  data: CountryData[];
  mousePosition: { x: number; y: number };
}

export function handlePolygonHover({
  setTooltip,
  setHoverD,
  data,
  mousePosition,
}: HoverConfig) {
  // react-globe.gl passes (polygon, prevPolygon)
  return (polygon: object | null) => {
    if (polygon) {
      const feature = polygon as GeoJsonFeature;
      const countryName = feature.properties.ADMIN || 'Unknown';
      const country = data.find(
        (d) => normalize(d.country) === normalize(countryName)
      );
      setTooltip({
        x: mousePosition.x,
        y: mousePosition.y,
        countryName,
        country,
      });
      setHoverD(feature);
    } else {
      setTooltip(null);
      setHoverD(null);
    }
  };
}

export function updateHoverState(
  prev: GeoJsonFeature | null,
  next: GeoJsonFeature | null,
  world: any,
  setHoverD: (d: GeoJsonFeature | null) => void,
  animate: (
    world: any,
    target: number,
    duration?: number,
    onComplete?: () => void
  ) => void
) {
  const hadHover = !!prev;
  const hasHover = !!next;

  if (hasHover && !hadHover) {
    setHoverD(next);
    animate(world, 1, 200);
  } else if (!hasHover && hadHover) {
    animate(world, 0, 400, () => {
      setHoverD(null);
      world.polygonCapMaterial(world.polygonCapMaterial());
    });
  } else {
    setHoverD(next);
  }
}
