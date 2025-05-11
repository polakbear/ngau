import * as THREE from 'three';
import { childRightsColorScale } from './color-utils';
import { getKriScore } from './score-utils';
import { normalize } from './utils';
import { generateTooltipContent } from '../tooltip';
import { GeoJsonFeature, CountryData } from '../types';
import { animateDesaturation } from './animation-utils';

export function createPolygonMaterial(
  d: any,
  data: any[],
  hoverD: any,
  desaturationProgress: number
): THREE.MeshLambertMaterial {
  const score = getKriScore(d, data);
  const isNoData = score === null;
  const isHovered = hoverD && d === hoverD;

  const opacity = !hoverD
    ? 1
    : isHovered
    ? 1
    : 1 - 0.75 * desaturationProgress;

  if (isNoData) {
    // Create a striped texture for no-data countries
    const stripeCanvas = document.createElement('canvas');
    stripeCanvas.width = 64;
    stripeCanvas.height = 64;
    const ctx = stripeCanvas.getContext('2d')!;
    ctx.fillStyle = '#ddd';
    ctx.fillRect(0, 0, 64, 64);
    ctx.strokeStyle = '#888';
    ctx.lineWidth = 5;
    ctx.beginPath();
    ctx.moveTo(0, 64);
    ctx.lineTo(64, 0);
    ctx.stroke();

    const texture = new THREE.CanvasTexture(stripeCanvas);
    texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
    texture.repeat.set(30, 30);

    return new THREE.MeshLambertMaterial({
      map: texture,
      transparent: true,
      opacity,
      depthWrite: false,
    });
  }

  const baseColor = childRightsColorScale(score);
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
      });
    }
  }
}

export function handlePolygonHover(
  polygon: object | null,
  data: CountryData[],
  tooltip: HTMLElement,
  infoPanel: HTMLElement,
  world: any,
  hoverD: GeoJsonFeature | null,
  desaturationProgress: number
): GeoJsonFeature | null {
  const prevHover = hoverD;
  const newHover = polygon as GeoJsonFeature | null;

  const hadHover = !!prevHover;
  const hasHover = !!newHover;

  // Trigger fade transitions
  if (hasHover && !hadHover) {
    hoverD = newHover; // Set early so polygonCapMaterial knows which one to highlight
    animateDesaturation(world, 1, 200, desaturationProgress);
  } else if (!hasHover && hadHover) {
    animateDesaturation(world, 0, 400, desaturationProgress, () => {
      hoverD = null;
      world.polygonCapMaterial(world.polygonCapMaterial());
    });
  } else {
    hoverD = newHover;
  }

  // Tooltip logic
  if (newHover && infoPanel.innerHTML === "") {
    const countryName = newHover.properties.ADMIN || "Unknown";
    const country = data.find((d) => normalize(d.country) === normalize(countryName));

    if (country) {
      tooltip.style.display = "block";
      tooltip.innerHTML = generateTooltipContent(countryName, country);

      requestAnimationFrame(() => {
        const bars = tooltip.querySelectorAll(".bar-fill");
        bars.forEach((bar) => {
          const score = parseFloat(bar.getAttribute("data-score") || "0");
          (bar as HTMLElement).style.width = `${score * 100}%`;
        });
      });
    }
  } else {
    tooltip.style.display = "none";
  }

  world.polygonAltitude((d: GeoJsonFeature) => (d === hoverD ? 0.05 : 0.01));
  return hoverD;
}

