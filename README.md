## An interactive map showing the state of child rights around the world.

This project started as a way to make sense of scattered, complex data — something visual, straightforward, and easier to explore. It combines the Kids Rights Index with global indicators like child marriage, labor, FGM, and violent discipline.

Some countries have detailed data, others don’t — and that gap is part of the picture too.

I built it as a way to explore patterns in child rights data — and to offer that understanding to anyone else who's curious about how those patterns vary around the world.

It’s a personal project, not affiliated with any organization.

---

## Sources

- Kids Rights Index 2024
- UNICEF Reports
- DHS & MICS Surveys

---

## How to run locally

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

### Now
- [x] Visualize Kids Rights Index core scores
- [x] Add tooltip and info panel for country-level info
- [x] Display child rights violations (where data exists)
- [x] Implement visual score toggle (life, health, education, etc.)
- [x] Finalize indicator data structure (child marriage, labor, FGM, etc.)
- [x] Visualize indicators in tooltip and info panel
- [x] Add country search (autocomplete, smarter matching)
- [ ] Fill in data for all relevant countries (child marriage, labor, FGM, etc.)
- [ ] Accessibility polish (hover/touch, color contrast, ARIA?)
- [ ] Improve mobile layout and responsiveness
- [ ] Explore more data sources and/or reports
- [ ] Explore justice-related indicators
  - Age of criminal responsibility
  - Juvenile incarceration
  - Legal protections for children
- [ ] Add “bright spots” layer (countries showing progress or strong youth engagement)
- [ ] Bookmark/share state: ability to link to a specific country or view (e.g. ?country=SE&tab=protection).
- [ ] Ethics statement - how data is gathered, used, and framed.
- [ ] Links to concrete UNICEF reports used

### Later
- [ ] Add optional map layer for organizational presence
- [ ] Explore “story” view: link to human stories or context behind the numbers
- [ ] Overlay risk data (conflict, climate, displacement)
- [ ] Explore time-based comparisons (e.g. trends since 2010)
- [ ] Consider basic offline/static fallback
