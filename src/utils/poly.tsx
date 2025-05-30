import { normalize } from './utils';
import {
  GeoJsonFeature,
  CountryData,
  InfoPanelState,
  TooltipSetter,
} from '../types';

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
