import * as THREE from 'three';
import { rankBasedColorScale } from './color';
import { normalize } from './utils';
import { generateTooltipContent } from '../tooltip';
import { GeoJsonFeature, CountryData, HoverHandlerOptions } from '../types';
import { animateDesaturation } from '../globe-renderer';
import { getScoreType } from '../score-state';
import { detectMobileMode } from './device';

export function createPolygonMaterial(
  d: any,
  data: any[],
  hoverD: any,
  desaturationProgress: number
): THREE.MeshLambertMaterial {
  const countryName = normalize(d.properties.ADMIN);
  const country = data.find((d) => normalize(d.country) === countryName);

  let rank = null;
  if (country) {
    const scoreType = getScoreType();
    const rawRank =
      scoreType === 'overall'
        ? country.kri_rank
        : country[scoreType as keyof CountryData];
    rank = typeof rawRank === 'number' ? rawRank : null;
  }

  if (rank === null) {
    return new THREE.MeshLambertMaterial({
      transparent: true,
      opacity: !hoverD ? 1 : 0.25,
      depthWrite: false,
    });
  }

  const isHovered = hoverD && d === hoverD;
  const opacity = !hoverD ? 1 : isHovered ? 1 : 1 - 0.7 * desaturationProgress;

  // Use rankBasedColorScale for smooth gradient coloring
  const baseColor = rankBasedColorScale(rank);

  return new THREE.MeshLambertMaterial({
    color: new THREE.Color(baseColor),
    transparent: true,
    opacity,
    depthWrite: false,
  });
}

export function handlePolygonClick(
  polygon: object | null,
  data: CountryData[],
  tooltip: HTMLElement,
  infoPanel: HTMLElement
): void {
  const clicked = polygon as GeoJsonFeature | null;

  if (clicked) {
    const countryName = clicked.properties.ADMIN || 'Unknown';
    const country = data.find(
      (d: any) => normalize(d.country) === normalize(countryName)
    );

    if (country) {
      tooltip.style.display = 'none';
      infoPanel.style.display = 'block';
      infoPanel.innerHTML = generateTooltipContent(countryName, country, {
        closeButton: true,
      });

      requestAnimationFrame(() => {
        const bars = infoPanel.querySelectorAll('.bar-fill');
        bars.forEach((bar) => {
          const score = parseFloat(bar.getAttribute('data-score') || '0');
          (bar as HTMLElement).style.width = `${score * 100}%`;
        });

        const indicatorBars = infoPanel.querySelectorAll(
          '.indicator-bar-fill[data-percentage]'
        );
        indicatorBars.forEach((bar) => {
          const percentage = bar.getAttribute('data-percentage') || '0';
          (bar as HTMLElement).style.width = `${percentage}%`;
        });
      });
    }
  }
}

export function handlePolygonHover({
  world,
  data,
  tooltip,
  infoPanel,
  getHoverD,
  setHoverD,
  animateDesaturation,
}: HoverHandlerOptions) {
  return (polygon: object | null) => {
    const prevHover = getHoverD();
    const newHover = polygon as GeoJsonFeature | null;

    updateHoverState(
      prevHover,
      newHover,
      world,
      setHoverD,
      animateDesaturation
    );
    updateTooltip(newHover, data, tooltip, infoPanel);

    return world.polygonAltitude((d: GeoJsonFeature) =>
      d === newHover ? 0.05 : 0.01
    );
  };
}

function updateHoverState(
  prev: GeoJsonFeature | null,
  next: GeoJsonFeature | null,
  world: any,
  setHoverD: (d: GeoJsonFeature | null) => void,
  animate: typeof animateDesaturation
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

function updateTooltip(
  hover: GeoJsonFeature | null,
  data: CountryData[],
  tooltip: HTMLElement,
  infoPanel: HTMLElement
) {
  if (!hover) {
    tooltip.style.display = 'none';
    return;
  }

  // on mobile don't show tooltip when info panel is open
  const isMobile = detectMobileMode();
  if (isMobile && infoPanel.innerHTML !== '') {
    tooltip.style.display = 'none';
    return;
  }

  const countryName = hover.properties?.ADMIN?.trim();
  if (!countryName) {
    tooltip.style.display = 'none';
    return;
  }

  const country = data.find(
    (d) => normalize(d.country) === normalize(countryName)
  );

  if (!country) {
    tooltip.style.display = 'none';
    return;
  }

  tooltip.innerHTML = generateTooltipContent(countryName, country);
  tooltip.style.display = 'block';

  requestAnimationFrame(() => {
    const bars = tooltip.querySelectorAll('.bar-fill');
    bars.forEach((bar) => {
      const score = parseFloat(bar.getAttribute('data-score') || '0');
      (bar as HTMLElement).style.width = `${score * 100}%`;
    });

    // Animate indicator progress bars
    const indicatorBars = tooltip.querySelectorAll(
      '.indicator-bar-fill[data-percentage]'
    );
    indicatorBars.forEach((bar) => {
      const percentage = bar.getAttribute('data-percentage') || '0';
      (bar as HTMLElement).style.width = `${percentage}%`;
    });
  });
}
