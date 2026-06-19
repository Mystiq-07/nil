# Nil

A food app where nothing arrives. You browse, cart, "order," and track — then nothing comes, and the craving passes. Built as a mobile-web PWA.

## Run

```bash
npm install
npm run dev      # local dev server
npm run build    # type-check + production build to /dist
npm run preview  # preview the production build
```

Open the dev URL on a phone (or use device emulation) for the intended experience. "Add to Home Screen" installs it as a PWA.

## Structure

- `src/store.tsx` — app state (screen, cart, stats, theme) + persistence
- `src/screens/` — Onboarding, Browse, Cart, Tracking, LetGo, You
- `src/components/ui.tsx` — Button, TopBar, TabBar, Toast, NightNudge, FoodCard
- `src/styles.css` — design tokens (dark + light) and component styles, from DESIGN.md
- `src/data.ts` — placeholder menu (swap emoji for licensed stock photography)

## Product rules baked in

- Prices and counts only — no calories, weight, or body metrics anywhere.
- The let-it-go moment is framed as money kept, never as beating hunger.
- "Order it for real" is always present and never blocks the user.
- Dark is the default theme (built for the 2am moment); light is a toggle.

## Not yet wired (v2 / handoff)

- Real scheduled web-push for the night nudge (needs a server + push keys).
- Licensed stock food photography in place of emoji placeholders.
- The real-money savings vault (RBI-regulated; v2 premium tier).
