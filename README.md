## An interactive map showing the state of child rights around the world.

This project started as a way to make sense of scattered, complex data — something visual, straightforward, and easier to explore. It combines the KidsRights Index with global indicators like child marriage, labor, FGM, and violent discipline.

Some countries have detailed data. Others don’t — and that gap is part of the picture too.

This map isn’t built for clicks or promotion. It’s a tool for exploring patterns in child rights data, and for anyone curious to better understand how those patterns vary across the world.

It’s a personal project, not affiliated with any organization.

---

## Sources

- KidsRights Index 2024
- UNICEF Reports
- DHS & MICS Surveys

---

## How to run locally

This project uses [Vite](https://vitejs.dev/) for development.

1. Clone the repository
2. Install dependencies
3. Start the dev server

```bash
git clone https://github.com/polakbear/ngau.git
cd ngau
npm install
npm run dev
```

Then open http://localhost:5173 in your browser.

## Roadmap

- [x] Visualize KidsRights Index core scores
- [x] Add tooltip and info panel for country-level info
- [x] Display child rights violations (where data exists)
- [ ] Implement visual score toggle (life, health, education, etc.)
- [ ] Finalize indicator data structure (child marriage, labor, FGM, etc.)
- [ ] Visualize indicators in tooltip and info panel
- [ ] Improve mobile layout and responsiveness
- [ ] Add optional map layer for organizational presence
- [ ] Explore justice-related indicators
  - Age of criminal responsibility
  - Juvenile incarceration
  - Legal protections for children
- [ ] Explore time-based comparisons (e.g. trends since 2010)
- [ ] Consider light/dark mode toggle
- [ ] Add “bright spots” layer (countries showing progress or strong youth engagement)
- [ ] Add country search improvements (autocomplete, smarter matching)
- [ ] Explore “story” view: link to human stories or context behind the numbers
- [ ] Optional: overlay risk data (conflict, climate, displacement)
- [ ] Consider basic offline/static fallback
