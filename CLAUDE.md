# Nil

Read this first. Last updated 2026-06-16.

## What Nil is

A food-delivery app where nothing ever arrives. You browse real nearby restaurants, fill a cart, "place" the order, watch it track — then it never comes, and the late-night craving to order food passes anyway. Tracked progress is money kept and cravings ridden out — never calories, weight, or any body metric (hard rule, see `docs/DESIGN.md`).

Full product reasoning is in `docs/`: `DESIGN.md` (design system/tokens), `Nil_Product_Plan.docx`, `Dopamine_App_Research_Brief.docx`, `Nil_Design_Language.docx`.

## Where the code is

`nil-app/` — React + Vite + TypeScript, wrapped with **Capacitor** (not React Native) into real iOS and Android app projects. The original web code and CSS design tokens carried over almost unchanged.

- `src/store.tsx` — app state (screen, cart, restaurants, stats, theme)
- `src/screens/` — Onboarding, Restaurants, Browse (per-restaurant menu), Cart, Tracking, LetGo, You
- `src/restaurant.ts` — fetches real nearby restaurants from OpenStreetMap's free Overpass API (no key needed), with a Bengaluru fallback if location is denied/unavailable
- `src/data.ts` — cuisine-guessing + per-cuisine placeholder menus (`menuFor()`), keyed off each restaurant's real name/OSM cuisine tag
- `src/styles.css` — design tokens (dark default + light) from `docs/DESIGN.md`
- `ios/`, `android/` — native Capacitor projects, already added and synced

## Environment setup already done on this Mac

- Capacitor pinned to **v6.x** (not the latest v8) because this machine runs Node 20, and Capacitor 8 requires Node 22+.
- Xcode, Java (`brew install openjdk@21`, PATH added to `~/.zshrc`), and CocoaPods (`brew install cocoapods`, to bypass a broken system Ruby `ffi` gem) are installed.
- Android SDK + an emulator (Pixel 3a) were already present.
- To rebuild/run: `npm run build && npx cap sync ios && npx cap run ios --target <simulator-udid>` (similar for android).

## Status

**Phase 1 — get it running natively**
- [x] iOS Simulator — confirmed working
- [ ] Android emulator — not yet attempted

**Phase 3 — feature/design work (pulled forward ahead of Phase 2)**
- [x] Onboarding rewritten as 3 screens explaining the "doom-scroll" concept; the word "fake" and any reveal-breaking copy was scrubbed from the rest of the app so the ritual plays straight until the Let-Go screen
- [x] Real nearby restaurants (OpenStreetMap) replace the single hardcoded menu; tapping a restaurant shows a cuisine-matched menu; cart is scoped to one restaurant at a time
- [ ] Styling pass to bring in richer layout (ratings/ETA, "frequently reordered", categorized sections) from Swiggy reference screenshots the user provided — **structure only, not their red visual style** (DESIGN.md explicitly forbids that — it's what would make Nil look like a real delivery app instead of "something else")
- User said a new flow/architecture spec is coming before this continues — **read whatever the user provides next and reconcile it against this file before resuming.**

**Phase 2 — parked, untouched**
- [ ] Real app icon + splash screen (still placeholder web favicon)
- [ ] Real push notifications for the night-nudge feature
- [ ] Native touches: haptics, status bar color per theme, safe-area insets on notched phones
- [ ] App Store / Play Store listing basics

## How to work with this user

Not a developer — explain tools/decisions in plain English (what something does and why) before diving into technical output. Give clear, jargon-light tradeoffs when there's a choice to make, rather than assuming familiarity with npm/Node/native toolchains.

## Skill routing

When the user's request matches an available skill, invoke it via the Skill tool. When in doubt, invoke the skill.

Key routing rules:
- Product ideas/brainstorming → invoke /office-hours
- Strategy/scope → invoke /plan-ceo-review
- Architecture → invoke /plan-eng-review
- Design system/plan review → invoke /design-consultation or /plan-design-review
- Full review pipeline → invoke /autoplan
- Bugs/errors → invoke /investigate
- QA/testing site behavior → invoke /qa or /qa-only
- Code review/diff check → invoke /review
- Visual polish → invoke /design-review
- Ship/deploy/PR → invoke /ship or /land-and-deploy
- Save progress → invoke /context-save
- Resume context → invoke /context-restore
- Author a backlog-ready spec/issue → invoke /spec
