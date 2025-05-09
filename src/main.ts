import * as THREE from "three";
import Globe from "globe.gl";
import * as d3chromatic from "d3-scale-chromatic";

interface IndicatorEntry {
  indicator_type: string;
  value_total: number;
  value_female?: number | null;
  value_male?: number | null;
  year?: number;
  data_source?: string;
}

interface CountryData {
  country: string;
  kri_score: number | null;
  kri_rank?: number | null;
  life?: number | null;
  health?: number | null;
  education?: number | null;
  protection?: number | null;
  environment?: number | null;
  indicators?: IndicatorEntry[];
}

interface GeoJsonFeature {
  type: string;
  properties: {
    ADMIN: string;
    NAME: string;
    NAME_LONG: string;
  };
}

const normalize = (str: string) =>
  str
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z]/g, "");

let data: CountryData[] = [];

fetch("/data.json")
  .then((res) => res.json())
  .then((json) => {
    data = json;
    fetch("/countries.geojson")
      .then((res) => res.json())
      .then((geoJson) => {
        renderGlobe(geoJson);
      });
  });

function renderGlobe(geoJson: any) {
  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0x000000);

  const renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);

  const ambientLight = new THREE.AmbientLight(0xffffff, 1);
  scene.add(ambientLight);

  const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
  directionalLight.position.set(0, 1, 1).normalize();
  scene.add(directionalLight);

  const globeElement = document.getElementById("globe");
  if (!globeElement) {
    throw new Error('Element with id "globe" not found');
  }
  const tooltip = document.getElementById("tooltip");
  if (!tooltip) {
    throw new Error('Element with id "tooltip" not found');
  }

  const world = new Globe(globeElement)
    .globeImageUrl("")
    .showAtmosphere(true)
    .atmosphereColor("#ff5500")
    .atmosphereAltitude(0.45);

  scene.add(world);
  // camera.position.z = 300;

  world
    .polygonsData(geoJson.features)
    .polygonCapColor((feat: any) => {
      const score = getKriScore(feat);
      return score === null ? "#646464" : scoreToColor(score);
    })
    .polygonSideColor(() => "rgba(0, 0, 0, 0.05)")
    .polygonStrokeColor((feat: any) => {
      const score = getKriScore(feat);
      return score === null ? "#646464" : scoreToBorderColor(score);
    })
    .polygonsTransitionDuration(200)
    .onPolygonHover((polygon: object | null, prevPolygon: object | null) => {
      const hoverD = polygon as GeoJsonFeature | null;
      console.log(hoverD);
      if (hoverD) {
        const countryName = hoverD.properties.ADMIN || "Unknown";
        tooltip.style.display = "block";
        tooltip.innerHTML = countryName;

        // Update tooltip position
        document.addEventListener("mousemove", (event) => {
          tooltip.style.left = `${event.pageX + 10}px`;
          tooltip.style.top = `${event.pageY + 10}px`;
        });
      } else {
        tooltip.style.display = "none";
      }
      return world.polygonAltitude((d) => (d === hoverD ? 0.05 : 0.01));
    });
}

function getKriScore(feat: any): number | null {
  const countryName = normalize(feat.properties.ADMIN);
  const country = data.find((d: any) => normalize(d.country) === countryName);
  return country?.kri_score ?? null;
}

function scoreToColor(score: number | null): string {
  if (score === null) return "#646464"; // Default gray for null scores
  const normalizedScore = Math.max(0, Math.min(1, score)); // Clamp score between 0 and 1
  const reversedScore = normalizedScore; // Reverse the score
  return d3chromatic.interpolateInferno(reversedScore);
}

function scoreToBorderColor(score: number | null): string {
  return "#000";
}
