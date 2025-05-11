function easeIn(t: number): number {
  return t * t;
}

function easeOut(t: number): number {
  return t * (2 - t);
}

export function animateDesaturation(
  world: any,
  target: number,
  duration = 400,
  desaturationProgress: number = 0,
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
