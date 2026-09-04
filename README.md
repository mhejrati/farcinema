# Farcinema website

Static site built with [Astro](https://astro.build). Film data lives in JSON, so adding a film is a data edit, not a code change.

## Run locally

```sh
npm install
npm run dev        # http://localhost:4321
```

## Build for deployment

```sh
npm run build      # outputs the static site to dist/
```

`dist/` can be dropped onto any static host. A GitHub Pages workflow is included in `.github/workflows/deploy.yml`;
push to `main` and enable Pages (Source: GitHub Actions) in the repo settings. `public/CNAME` keeps the farcinema.com domain.

## Editing content

- `content/films.json`: one entry per screening. Add a poster or still to `src/assets/posters/` and reference the filename.
  `focal` controls how the image is cropped in the 3:2 grid (CSS object-position, e.g. `"50% 20%"`).
- `content/site.json`: tagline, venue, Luma links, curators, social links, and the `upcomingSeries` banner. Set `upcomingSeries` to `null` to hide it.
- Upcoming events are pulled from Luma's public calendar API at build time, so rebuild (or redeploy) after publishing a new event.
