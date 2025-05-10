// icons.ts
// Provides SVG icons as inline strings

export function svgLife(): string {
  // A simple leaf icon for Life
  return `
  <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path fill="currentColor" d="M12 2C8.13 2 5 5.13 5 9c0 4.93 7 11 7 11s7-6.07 7-11c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5S10.62 6.5 12 6.5s2.5 1.12 2.5 2.5S13.38 11.5 12 11.5z"/>
  </svg>
  `;
}

export function svgHealth(): string {
  // Heart icon for Health
  return `
  <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path fill="currentColor" d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
  </svg>
  `;
}

export function svgHat(): string {
  // Graduation cap icon for Education
  return `
  <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path fill="currentColor" d="M12 2L1 7l11 5 9-4.09V17h2V7L12 2zM3.07 8L12 4.25 20.93 8 12 11.75 3.07 8zM11 13.03v5.44c-.31.06-.66.13-1.01.23-1.31.37-2.15 1.68-1.78 2.99.34 1.21 1.47 1.9 2.74 1.9 1.28 0 2.42-.69 2.75-1.9.37-1.31-.47-2.62-1.78-2.99-.35-.1-.7-.18-1.01-.23v-5.44l-1 0z"/>
  </svg>
  `;
}

export function svgShield(): string {
  // Shield icon for Protection
  return `
  <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path fill="currentColor" d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4z"/>
  </svg>
  `;
}

export function svgPlanet(): string {
  // Planet icon for Environment
  return `
  <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <circle cx="12" cy="12" r="10" fill="none" stroke="currentColor" stroke-width="2"/>
    <path fill="currentColor" d="M2 12h20M12 2c3.87 0 7 3.13 7 7s-3.13 7-7 7-7-3.13-7-7 3.13-7 7-7z"/>
  </svg>
  `;
}

export function svgMarriage(): string {
  // Ring icon for Child Marriage
  return `
  <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <circle cx="12" cy="12" r="8" fill="none" stroke="currentColor" stroke-width="2"/>
    <circle cx="12" cy="12" r="4" fill="currentColor"/>
  </svg>
  `;
}

export function svgLabor(): string {
  // Worker icon for Child Labor
  return `
  <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path fill="currentColor" d="M12 2a4 4 0 014 4v2h2v2h-2v6H8v-6H6V8h2V6a4 4 0 014-4z"/>
  </svg>
  `;
}

export function svgFGM(): string {
  // Warning triangle for FGM Prevalence
  return `
  <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path fill="currentColor" d="M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z"/>
  </svg>
  `;
}
