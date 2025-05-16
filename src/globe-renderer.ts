import Globe from 'globe.gl';
import { CountryData, GeoJsonFeature } from './types';
import {
  createPolygonMaterial,
  handlePolygonClick,
  handlePolygonHover,
} from './utils/poly';
import { detectMobileMode } from './utils/device';

let desaturationProgress = 0;

function setupListeners(tooltip: HTMLElement, infoPanel: HTMLElement): void {
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
}

export function createGlobe(
  geoJson: any,
  data: CountryData[],
  tooltip: HTMLElement,
  infoPanel: HTMLElement
) {
  const mobileMode = detectMobileMode();
  const globeElement = document.getElementById('globe');
  if (!globeElement) throw new Error('Element with id "globe" not found');

  tooltip.style.display = 'none';

  setupListeners(tooltip, infoPanel);

  let hoverD: GeoJsonFeature | null = null;
  const getHoverD = () => hoverD;
  const setHoverD = (d: GeoJsonFeature | null) => {
    hoverD = d;
    if (!d) {
      tooltip.style.display = 'none';
    }
  };

  const world = new Globe(globeElement);

  if (mobileMode) {
    const renderer = world.renderer?.();
    renderer?.setPixelRatio(1);
  }

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
    .atmosphereColor('#3fd1c7')
    .polygonStrokeColor(() => 'rgba(255,255,255,0.6)')
    .polygonCapColor(() => 'rgba(0,0,0,0)')
    .atmosphereAltitude(mobileMode ? 0.2 : 0.25)
    .polygonsData(geoJson.features)
    .polygonCapMaterial((d: any) =>
      createPolygonMaterial(d, data, hoverD, desaturationProgress)
    )
    .polygonSideColor(() => '#000000')
    .polygonAltitude((d: any) => (d === hoverD ? 0.02 : 0.01))
    .polygonsTransitionDuration(300)
    .onPolygonClick((polygon: object | null) =>
      handlePolygonClick(polygon, data, tooltip, infoPanel)
    )
    .backgroundColor('#0a1d26');

  if (mobileMode) {
    world.globeOffset([0, -150]);
  }
  if (!mobileMode) {
    world.onPolygonHover(handlePolygonHover(hoverConfig));
  }
  requestAnimationFrame(() => {
    world.pointOfView({ lat: 20, lng: 0, altitude: mobileMode ? 4 : 2.5 }, 0);
  });

  const globeReady = new Promise<void>((resolve) => {
    const checkGlobe = () => {
      if (world.scene()) {
        resolve();
      } else {
        requestAnimationFrame(checkGlobe);
      }
    };
    checkGlobe();
  });

  const originalWorld = world;
  const enhancedWorld = Object.assign(originalWorld, {
    onGlobeLoaded: (callback: () => void) => {
      globeReady.then(callback);
    },
  });

  return enhancedWorld;
}

export function animateDesaturation(
  world: any,
  target: number,
  duration = 400,
  onComplete?: () => void
) {
  const start = performance.now();
  const from = desaturationProgress;
  const to = target;
  const easing = (t: number) => t * (2 - t); // smooth easing

  function update(now: number) {
    const elapsed = now - start;
    const t = Math.min(elapsed / duration, 1);
    desaturationProgress = from + (to - from) * easing(t);
    world.polygonCapMaterial(world.polygonCapMaterial());
    if (t < 1) requestAnimationFrame(update);
    else onComplete?.();
  }

  requestAnimationFrame(update);
}
