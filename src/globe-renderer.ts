import Globe from "globe.gl";
import { CountryData, GeoJsonFeature } from "./types";
import { normalize } from "./utils";
import { generateTooltipContent } from "./tooltip";
import * as THREE from 'three';
import { childRightsColorScale } from "./color-utils";


let desaturationProgress = 0;

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

  document.addEventListener("click", (e) => {
    if ((e.target as HTMLElement).id === "close-info") {
      infoPanel.innerHTML = "";
      infoPanel.style.display = "none";
    }
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      infoPanel.innerHTML = "";
      infoPanel.style.display = "none";
    }
  });

  let hoverD: GeoJsonFeature | null = null;

  const world = new Globe(globeElement)
    .globeImageUrl("")
    .showAtmosphere(true)
    .atmosphereColor("#2e9c9f")
    .atmosphereAltitude(0.45)
    .polygonsData(geoJson.features)
    // .polygonCapColor((d: any) => {
    //   const score = getKriScore(d, data);
    //   const baseColor = score === null ? "#646464" : childRightsColorScale(score);
    //   return baseColor;
    // })
    .polygonCapColor(() => 'rgba(0,0,0,0)')
        // .polygonCapColor((feat: any) => {
    //   const score = getKriScore(feat, data);
    //   return score === null ? "#646464" : childRightsColorScale(score);
    // })
    .polygonCapMaterial((d: any) => {
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
          depthWrite: false
        });
      }
    
      const baseColor = childRightsColorScale(score);
      return new THREE.MeshLambertMaterial({
        color: new THREE.Color(baseColor),
        transparent: true,
        opacity,
        depthWrite: false
      });
    })
    .polygonSideColor(() => "rgba(0, 0, 0, 0.05)")    
    .polygonsTransitionDuration(200)
    .onPolygonClick((polygon: object | null) => {
      const clicked = polygon as GeoJsonFeature | null;

      if (clicked) {
        const countryName = clicked.properties.ADMIN || "Unknown";
        const country = data.find(
          (d: any) => normalize(d.country) === normalize(countryName)
        );

        if (country) {
          tooltip.style.display = "none";
          infoPanel.style.display = "block";
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
    })
    .onPolygonHover((polygon: object | null) => {
      const prevHover = hoverD;
      const newHover = polygon as GeoJsonFeature | null;
    
      const hadHover = !!prevHover;
      const hasHover = !!newHover;
    
      // Trigger fade transitions
      if (hasHover && !hadHover) {
        hoverD = newHover; // Set early so polygonCapMaterial knows which one to highlight
        animateDesaturation(world, 1, 200);
      } else if (!hasHover && hadHover) {
        animateDesaturation(world, 0, 400, () => {
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
    
      return world.polygonAltitude((d) => (d === hoverD ? 0.05 : 0.01));
    });
  return world;
}

function easeIn(t: number): number {
  return t * t;
}

function easeOut(t: number): number {
  return t * (2 - t);
}

function animateDesaturation(world: any, target: number, duration = 400, onComplete?: () => void) {
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

function getKriScore(feat: any, data: CountryData[]): number | null {
  const countryName = normalize(feat.properties.ADMIN);
  const country = data.find((d) => normalize(d.country) === countryName);
  return country?.kri_score ?? null;
}
