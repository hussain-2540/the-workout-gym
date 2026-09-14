# THE WORKOUTS Website

A five-page static marketing website for THE WORKOUTS gym in G-13/2, Islamabad.

## Run & Operate

- `pnpm --filter @workspace/the-workouts-site run dev` — serve the static site locally
- `pnpm --filter @workspace/the-workouts-site run build` — copy the static site into `dist/public` for publishing
- No install, framework, database, or API credentials are required for the site.

## Stack

- HTML5, CSS3, and vanilla JavaScript
- Python's standard-library static server for local preview
- Static production output served from `dist/public`

## Where things live

- `artifacts/the-workouts-site/index.html` — homepage
- `artifacts/the-workouts-site/about.html` — gym story and team placeholders
- `artifacts/the-workouts-site/facilities.html` — equipment gallery and lightbox
- `artifacts/the-workouts-site/membership.html` — membership tiers and FAQ
- `artifacts/the-workouts-site/contact.html` — contact details, map, and validated form
- `artifacts/the-workouts-site/css/style.css` — shared responsive theme
- `artifacts/the-workouts-site/js/script.js` — navigation, lightbox, FAQ, form validation
- `artifacts/the-workouts-site/images/original/` — renamed supplied gym photos

## Architecture decisions

- Keep the site root static and framework-free so it can be deployed to any static host.
- Use the gym's supplied photography and verified facts only; unknown values remain visible placeholders.
- Keep interactive behavior procedural and in one small vanilla JavaScript file.
- Use a real Google Maps iframe plus a separate directions link so either route remains usable.

## Product

The site presents THE WORKOUTS as a credible 24/7 community gym with real imagery, accessible membership information, facilities, verified contact details, and direct WhatsApp/call actions.

## User preferences

- The build brief requires HTML5 + CSS3 + vanilla JavaScript only, with no framework or build dependency.

## Gotchas

- Replace bracketed placeholders only after the gym confirms prices, rating/review count, ladies-only hours, trainer bios/photos, email, and smoothie-bar status.
- Keep the `images/original/` filenames in sync with the HTML image manifest.

## Pointers

- See the `pnpm-workspace` skill for workspace structure, TypeScript setup, and package details
