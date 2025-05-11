export function getElementById<T extends HTMLElement>(id: string): T {
  const element = document.getElementById(id);
  if (!element) {
    throw new Error(`Element with id "${id}" not found`);
  }
  return element as T;
}

export function setupSearchInput(
  input: HTMLInputElement,
  geoJson: any,
  world: any
) {
  input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      const search = input.value.trim().toLowerCase();
      const match = geoJson.features.find(
        (f: { properties: { ADMIN: string } }) =>
          f.properties.ADMIN.toLowerCase().includes(search)
      );

      if (match && match.__centroid) {
        const [lng, lat] = match.__centroid;
        // Start from a slightly higher altitude and zoom in smoothly
        world.pointOfView({ lat, lng, altitude: 2.5 }, 0);
        setTimeout(() => {
          world.pointOfView({ lat, lng, altitude: 1.5 }, 1000);
        }, 50);
        input.value = '';
        input.blur(); // Remove focus from input
      } else {
        console.log('Country not found');
      }
    }
  });
}
