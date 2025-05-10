import Globe from "globe.gl";
import { CountryData, GeoJsonFeature } from "./types";
import { normalize } from "./utils";
// import * as d3chromatic from "d3-scale-chromatic";
import * as d3 from "d3-scale";
import { generateTooltipContent } from "./tooltip";

const childRightsColorScale = d3
  .scaleLinear<string>()
  .domain([0.0, 0.2, 0.4, 0.6, 0.8, 1.0])
  .range(["#4b5c6b", "#4b5c6b", "#5a7d9a", "#76b5c5", "#2e9c9f", "#3fd1c7"]);

export function createGlobe(
  geoJson: any,
  data: CountryData[],
  tooltip: HTMLElement,
  infoPanel: HTMLElement
) {
  const globeElement = document.getElementById("globe");
  if (!globeElement) {
    throw new Error('Element with id "globe" not found');
  }

  document.addEventListener("mousemove", (event) => {
    tooltip.style.left = `${event.pageX + 10}px`;
    tooltip.style.top = `${event.pageY + 10}px`;
  });

  const world = new Globe(globeElement)
    .globeImageUrl("")
    .showAtmosphere(true)
    .atmosphereColor("#2e9c9f")
    .atmosphereAltitude(0.45)
    .polygonsData(geoJson.features)
    .polygonCapColor((feat: any) => {
      const score = getKriScore(feat, data);
      return score === null ? "#646464" : childRightsColorScale(score);
    })
    .polygonSideColor(() => "rgba(0, 0, 0, 0.05)")
    .polygonStrokeColor(() => "#000000")
    .polygonsTransitionDuration(200)
    .onPolygonClick((polygon: object | null, _prevPolygon: object | null) => {
      const clicked = polygon as GeoJsonFeature | null;

      if (clicked) {
        const countryName = clicked.properties.ADMIN || "Unknown";
        const country = data.find(
          (d: any) => normalize(d.country) === normalize(countryName)
        );
      
        if (country) {
          tooltip.style.display = "none"; // hide floating tooltip
          infoPanel.style.display = "block";
          infoPanel.innerHTML = generateTooltipContent(countryName, country);
        }
      }
    })
    .onPolygonHover((polygon: object | null, _prevPolygon: object | null) => {
      const hoverD = polygon as GeoJsonFeature | null;
    
      if (hoverD && infoPanel.innerHTML === '') {
        const countryName = hoverD.properties.ADMIN || "Unknown";
        const country = data.find(
          (d: any) => normalize(d.country) === normalize(countryName)
        );
    
        if (country) {
          tooltip.style.display = "block";
          tooltip.innerHTML = generateTooltipContent(countryName, country);
        }
      } else {
        // Hide tooltip if nothing hovered or a country is selected
        tooltip.style.display = "none";
      }
    
      return world.polygonAltitude((d) => (d === hoverD ? 0.05 : 0.01));
    });

  return world;
}

function getKriScore(feat: any, data: CountryData[]): number | null {
  const countryName = normalize(feat.properties.ADMIN);
  const country = data.find((d) => normalize(d.country) === countryName);
  return country?.kri_score ?? null;
}
