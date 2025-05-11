export function detectMobileMode(): boolean {
  return window.innerWidth < 768 || 'ontouchstart' in window;
}
