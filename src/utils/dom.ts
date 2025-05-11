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
        world.pointOfView({ lat, lng, altitude: 1.0 }, 1000);
        input.value = '';
      } else {
        console.log('Country not found');
      }
    }
  });
}
