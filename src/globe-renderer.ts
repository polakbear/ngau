import Globe from 'globe.gl';
import { CountryData, GeoJsonFeature } from './types';
import {
  createPolygonMaterial,
  handlePolygonClick,
  handlePolygonHover,
} from './utils/polygon-utils';

let desaturationProgress = 0;

export function createGlobe(
  geoJson: any,
  data: CountryData[],
  tooltip: HTMLElement,
  infoPanel: HTMLElement
) {
  const globeElement = document.getElementById('globe');
  if (!globeElement) {
    throw new Error('Element with id "globe" not found');
  }

  document.addEventListener('mousemove', (event) => {
    tooltip.style.left = `${event.pageX + 10}px`;
    tooltip.style.top = `${event.pageY + 10}px`;
  });

  document.addEventListener('click', (e) => {
    if ((e.target as HTMLElement).id === 'close-info') {
      infoPanel.innerHTML = '';
      infoPanel.style.display = 'none';
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      infoPanel.innerHTML = '';
      infoPanel.style.display = 'none';
    }
  });

  let hoverD: GeoJsonFeature | null = null;
  const getHoverD = () => hoverD;
  const setHoverD = (d: GeoJsonFeature | null) => {
    hoverD = d;
  };

  const world = new Globe(globeElement);
  const hoverConfig = {
    world,
    data,
    tooltip,
    infoPanel,
    getHoverD,
    setHoverD,
    animateDesaturation,
  };

  world
    .globeImageUrl('')
    .showAtmosphere(true)
    .atmosphereColor('#2e9c9f')
    .atmosphereAltitude(0.45)
    .polygonsData(geoJson.features)
    .polygonCapColor(() => 'rgba(0,0,0,0)')
    .polygonCapMaterial((d: any) =>
      createPolygonMaterial(d, data, hoverD, desaturationProgress)
    )
    .polygonSideColor(() => 'rgba(0, 0, 0, 0.05)')
    .polygonsTransitionDuration(200)
    .onPolygonClick((polygon: object | null) =>
      handlePolygonClick(polygon, data, tooltip, infoPanel)
    );
  world.onPolygonHover(handlePolygonHover(hoverConfig));
  return world;
}

function easeIn(t: number): number {
  return t * t;
}

function easeOut(t: number): number {
  return t * (2 - t);
}

function animateDesaturation(
  world: any,
  target: number,
  duration = 400,
  onComplete?: () => void
) {
  const start = performance.now();
  const from = desaturationProgress;
  const to = target;
  const easing = to > from ? easeIn : easeOut;

  function update(now: number) {
    const elapsed = now - start;
    const t = Math.min(elapsed / duration, 1);
    desaturationProgress = from + (to - from) * easing(t);

    world.polygonCapMaterial(world.polygonCapMaterial());

    if (t < 1) {
      requestAnimationFrame(update);
    } else {
      if (onComplete) onComplete();
    }
  }

  requestAnimationFrame(update);
}
