import * as THREE from 'three';
import Globe from 'three-globe';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import * as d3 from 'd3-geo';

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

const normalize = (str: string) =>
  str.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z]/g, "");

let data: CountryData[] = [];
let hoveredFeature: any = null;
let hoveredCountry: string | null = null;

fetch('/data.json')
  .then(res => res.json())
  .then(json => {
    data = json;
    fetch('/countries.geojson')
      .then(res => res.json())
      .then(geoJson => {
        geoJson.features.forEach((f: any) => {
          f.__centroid = d3.geoCentroid(f);
        });
        renderGlobe(data, geoJson);
      });
  });

function renderGlobe(data: CountryData[], geoJson: any) {
  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0x000000);

  const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
  const renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);

  const ambientLight = new THREE.AmbientLight(0xffffff, 1);
  scene.add(ambientLight);

  const controls = new OrbitControls(camera, renderer.domElement);
  controls.enableZoom = true;

  const raycaster = new THREE.Raycaster();
  const mouse = new THREE.Vector2();

  const world = new Globe()
    .globeImageUrl('')
    .showAtmosphere(true)
    .atmosphereColor('#ff5500')
    .atmosphereAltitude(0.25);

  scene.add(world);
  camera.position.z = 300;

  world
    .polygonsData(geoJson.features)
    .polygonCapColor((feat: any) => {
      const score = getKriScore(feat);
      // if (feat === hoveredFeature) {
      //   return '#ff5500';
      // }
      // return '#fff'
      return score === null ? '#646464' : scoreToColor(score);
    })
    .polygonSideColor(() => 'rgba(0, 0, 0, 0.05)')
    .polygonStrokeColor((feat: any) => {
      const score = getKriScore(feat);
      return score === null ? '#646464' : scoreToBorderColor(score);
    })
    .polygonAltitude((feat: any) => {
      if (feat === hoveredFeature) {
        const t = Date.now() * 0.005;
        return 0.02 + Math.sin(t) * 0.005;
      }
      return 0.01;
    })
    .polygonsTransitionDuration(200);

  window.addEventListener('mousemove', (event) => {
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
  });

  function animate() {
    requestAnimationFrame(animate);

    raycaster.setFromCamera(mouse, camera);
    const group = world.children.find(obj => obj.type === 'Group');
    if (!group) return;

    const intersects = raycaster.intersectObjects(group.children, true);
    let match = null;

    if (intersects.length > 0) {
      const pos = intersects[0].point.clone().normalize().multiplyScalar(100);
      const spherical = new THREE.Spherical().setFromVector3(pos);

      const phi = Math.max(0, Math.min(180, THREE.MathUtils.radToDeg(spherical.phi)));
      const theta = ((THREE.MathUtils.radToDeg(spherical.theta) % 360) + 360) % 360;

      const hoveredLat = 90 - phi;
      const hoveredLng = theta;

      match = geoJson.features.find((f: any) => {
        const [lng, lat] = f.__centroid;
        const dLat = lat - hoveredLat;
        const dLng = lng - hoveredLng;
        const distance = Math.sqrt(dLat * dLat + dLng * dLng);
        return distance < 3; // slightly relaxed threshold
      });
    }

    const newCountry = match?.properties?.ADMIN || null;

    if (newCountry !== hoveredCountry) {
      hoveredCountry = newCountry;
      hoveredFeature = match || null;
      if (newCountry) {
        console.log('✅ Hovering:', newCountry);
        world.polygonAltitude(world.polygonAltitude());
      } else {
        console.log('⬜ Hover cleared');
      }
      world.polygonAltitude(world.polygonAltitude());
    }

    controls.update();
    renderer.render(scene, camera);
  }

  animate();
}

function getKriScore(feat: any): number | null {
  const countryName = normalize(feat.properties.ADMIN);
  const country = data.find((d: any) => normalize(d.country) === countryName);
  return country?.kri_score ?? null;
}

function scoreToColor(score: number | null): string {
  if (score === null) return '#646464';
  if (score > 0.9) return '#003040';
  if (score > 0.8) return '#05273a';
  if (score > 0.7) return '#043d55';
  if (score > 0.6) return '#00374a';
  if (score > 0.5) return '#003e53';
  if (score > 0.4) return '#4e0f14';
  if (score > 0.3) return '#a83320';
  if (score > 0.2) return '#7f1116';
  if (score > 0.1) return '#862117';
  return '#2d0000';
}

function scoreToBorderColor(score: number | null): string {
  if (score === null) return '#646464';
  if (score > 0.9) return '#00475c';
  if (score > 0.8) return '#083c51';
  if (score > 0.7) return '#065c7a';
  if (score > 0.6) return '#03566c';
  if (score > 0.5) return '#056f8b';
  if (score > 0.4) return '#89212a';
  if (score > 0.3) return '#d94833';
  if (score > 0.2) return '#b82429';
  return '#2d0000';
}
