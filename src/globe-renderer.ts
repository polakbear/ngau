import Globe from 'globe.gl';
import { CountryData, GeoJsonFeature } from './types';
import {
  createPolygonMaterial,
  handlePolygonClick,
  handlePolygonHover,
} from './utils/polygon-utils';

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
  const globeElement = document.getElementById('globe');
  if (!globeElement) {
    throw new Error('Element with id "globe" not found');
  }

  setupListeners(tooltip, infoPanel);
  let hoverD: GeoJsonFeature | null = null;

  const world = new Globe(globeElement)
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
    )
    .onPolygonHover((polygon: object | null) => {
      hoverD = handlePolygonHover(
        polygon,
        data,
        tooltip,
        infoPanel,
        world,
        hoverD,
        desaturationProgress
      );
    });
  return world;
}
