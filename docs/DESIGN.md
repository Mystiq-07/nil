---
version: alpha
name: Nil-design-system
description: A calm, restrained food-app interface built on Sushi-style atomic structure and Airtable-style editorial restraint. Nil clones the food-ordering ritual (browse, cart, "pay," track) but nothing is ever ordered. The chrome stays quiet and muted; food photography is the only saturated element. Ships in two themes — dark (default, built for the 2am moment) and light (editorial) — selectable by the user. Every measure of progress is money kept and orders not placed; never calories, weight, or any body metric.

themes: [dark, light]
default-theme: dark

colors:
  dark:
    bg: "#201C18"
    surface: "#2A2521"
    surface-alt: "#332D28"
    text: "#ECE6DD"
    muted: "#A89E92"
    hairline: "rgba(255,255,255,0.10)"
    accent: "#BC7558"
    cta: "#BC7558"
    on-cta: "#2A1B12"
    money: "#8FB39A"
    danger: "#C77A5E"
  light:
    bg: "#FAF8F4"
    surface: "#FFFFFF"
    surface-alt: "#F2EEE7"
    text: "#1C1A17"
    muted: "#8A847A"
    hairline: "#ECE7DF"
    accent: "#BC7558"
    cta: "#1C1A17"
    on-cta: "#FAF8F4"
    money: "#3E6B4E"
    danger: "#A8452A"

typography:
  display:
    fontFamily: "Nil Display, 'Hanken Grotesk', Inter, sans-serif"
    fontSize: 28px
    fontWeight: 500
    lineHeight: 1.15
    letterSpacing: -0.5px
  heading:
    fontFamily: "Inter, sans-serif"
    fontSize: 18px
    fontWeight: 500
    lineHeight: 1.35
  title:
    fontFamily: "Inter, sans-serif"
    fontSize: 16px
    fontWeight: 500
    lineHeight: 1.4
  body:
    fontFamily: "Inter, sans-serif"
    fontSize: 14px
    fontWeight: 400
    lineHeight: 1.5
  price:
    fontFamily: "Inter, sans-serif"
    fontSize: 13px
    fontWeight: 500
    lineHeight: 1.3
  label:
    fontFamily: "Inter, sans-serif"
    fontSize: 12px
    fontWeight: 400
    lineHeight: 1.35
  caption:
    fontFamily: "Inter, sans-serif"
    fontSize: 11px
    fontWeight: 400
    lineHeight: 1.4

rounded:
  xs: 4px
  sm: 8px
  md: 11px
  lg: 14px
  pill: 9999px
  full: 9999px

spacing:
  xxs: 4px
  xs: 8px
  sm: 12px
  md: 16px
  lg: 24px
  xl: 32px

shadow:
  none: "none"
  soft: "0 1px 3px rgba(0,0,0,0.06)"

components:
  button-primary:
    backgroundColor: "{colors.cta}"
    textColor: "{colors.on-cta}"
    typography: "{typography.title}"
    rounded: "{rounded.lg}"
    padding: 12px 16px
  button-text:
    backgroundColor: transparent
    textColor: "{colors.muted}"
    typography: "{typography.label}"
  search-input:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.text}"
    typography: "{typography.body}"
    rounded: "{rounded.sm}"
    height: 32px
  message-chip:
    backgroundColor: "{colors.surface-alt}"
    textColor: "{colors.text}"
    typography: "{typography.title}"
    rounded: "{rounded.md}"
    padding: 11px
  food-card:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.text}"
    typography: "{typography.title}"
    rounded: "{rounded.md}"
  cart-line-item:
    textColor: "{colors.text}"
    typography: "{typography.body}"
  metric-card:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.text}"
    typography: "{typography.display}"
    rounded: "{rounded.md}"
    padding: 11px
  ledger-row:
    textColor: "{colors.muted}"
    typography: "{typography.label}"
  notification-card:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.text}"
    typography: "{typography.title}"
    rounded: "{rounded.lg}"
    padding: 10px
  tab-bar:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.muted}"
    height: 56px
  tracking-step:
    textColor: "{colors.text}"
    typography: "{typography.body}"
---

## Overview

Nil is a food-delivery app where no food is ever delivered. It reproduces the ordering ritual — browse menus, linger on the photos, fill a cart, "pay," watch the courier — and then nothing arrives, which is the point. The interface borrows its bones from Zomato's Sushi system (atomic structure, food-app component vocabulary) and its manners from Airtable's marketing system (editorial restraint, modest type weights, whitespace, a confident single CTA).

The atmosphere is deliberately quiet. The chrome — backgrounds, cards, controls — stays muted and low-contrast. **Food photography is the only fully saturated element in the product**: it carries the ritual while everything around it stays calm. This is the rule that keeps Nil from looking like a real delivery app even though it shares the same skeleton.

Nil ships in two themes. **Dark is the default** — the app is opened at 2am, in bed, in a dark room, and a dim screen is kinder there. **Light** is an editorial alternative for daytime and for users who prefer it. The two are one system, not two: components reference semantic token roles (`bg`, `surface`, `text`, `muted`, `accent`, `cta`, `money`), and each role carries a value per theme.

**Key characteristics:**
- Quiet UI, dry voice. Personality lives in the copy, never in loud visuals.
- Familiar structure (a delivery app), unfamiliar calm skin (muted, editorial).
- One accent (`{colors.accent}` clay), used sparingly. One positive tone (`{colors.money}`) reserved strictly for money kept.
- Agency, not guilt. The real option ("order it for real") is always present and never hidden.
- Money and count only. No calorie, weight, or body metric appears anywhere in the product. This is a hard rule.

## Theming

Token-first. Define the role once; give it two values.

- **Roles:** `bg`, `surface`, `surface-alt`, `text`, `muted`, `hairline`, `accent`, `cta`, `on-cta`, `money`, `danger`.
- **Default:** dark. Follow the device's system setting on first launch, then honor a manual toggle.
- **The CTA is the one theme-divergent token by design.** On light it is near-black (`#1C1A17`) — Airtable's confident, final primary. On dark, near-black would vanish, so the CTA becomes clay (`{colors.accent}`), which glows warmly against the dim. Same role, two readings.

## Colors

### Dark (default)
- **bg** `#201C18` — warm charcoal app background.
- **surface** `#2A2521` — cards, sheets, the cart.
- **text** `#ECE6DD` — soft off-white, never pure white (too harsh at night).
- **muted** `#A89E92` — secondary text, labels, the "order for real" link.
- **accent / cta** `#BC7558` — clay; the primary action and the only accent.
- **money** `#8FB39A` — sage; the money-kept total only.

### Light (editorial)
- **bg** `#FAF8F4` — warm white canvas.
- **surface** `#FFFFFF` — cards; **surface-alt** `#F2EEE7` for the message chip and soft blocks.
- **text** `#1C1A17` — near-black ink.
- **muted** `#8A847A` — secondary text and the "order for real" link.
- **cta** `#1C1A17` — near-black primary button (white text).
- **accent** `#BC7558` — clay, sparing highlights. **money** `#3E6B4E` — forest, money-kept only.

### The food exception
Food photography is intentionally outside the token table. It is the only saturated content in the product and lives against the muted surfaces so it pops without the chrome competing. In both themes the chrome does the calming; the food does the satisfying.

## Typography

A neutral, highly legible grotesque (Inter, or similar) for the entire interface, and a single characterful **display** face reserved for the `nil.` wordmark and the largest moments. Two weights only — 400 and 500. Emphasis comes from size and color, never from heavy weight (the Airtable principle). There is no bold-for-its-own-sake anywhere.

| Token | Size | Weight | Use |
|---|---|---|---|
| `{typography.display}` | 28 | 500 | Wordmark, the let-it-go headline, ledger hero numbers |
| `{typography.heading}` | 18 | 500 | Screen titles |
| `{typography.title}` | 16 | 500 | Card titles, button labels |
| `{typography.body}` | 14 | 400 | Default running text |
| `{typography.price}` | 13 | 500 | Prices |
| `{typography.label}` | 12 | 400 | Labels, the "order for real" link |
| `{typography.caption}` | 11 | 400 | Captions, meta lines |

## Layout

- **Mobile-first, single column.** Built for a PWA on a phone, one-handed, at night.
- **Spacing:** 4px base. `{spacing.xs}` 8 · `{spacing.sm}` 12 · `{spacing.md}` 16 · `{spacing.lg}` 24 · `{spacing.xl}` 32.
- **Card padding:** `{spacing.sm}`–`{spacing.md}`. Generous whitespace for calm.
- **Touch targets ≥ 44px.** Primary actions sit in the lower, thumb-reachable zone. Bottom tab navigation.

## Elevation

Color-block first, shadow second. Dark theme relies almost entirely on surface contrast (`bg` vs `surface`) — no shadows. Light theme may use `{shadow.soft}` on cards for gentle separation. No glow, no heavy elevation, nothing that reads as "snappy" or rewarding.

## Shapes

| Token | Value | Use |
|---|---|---|
| `{rounded.xs}` | 4 | Small inline elements |
| `{rounded.sm}` | 8 | Inputs, food thumbnails |
| `{rounded.md}` | 11 | Cards, chips, metric blocks |
| `{rounded.lg}` | 14 | Primary button, notification card, sheets |
| `{rounded.full}` | 9999 | Avatars, circular controls |

## Components

**`button-primary`** — The one confident action per screen ("Order nothing", "Show me"). `{colors.cta}` background, `{colors.on-cta}` text, `{rounded.lg}`, full-width at the bottom of action screens. Used sparingly — one per viewport.

**`button-text`** — The muted "order it for real" link. `{colors.muted}`, `{typography.label}`, no background. **Always present, never hidden** — this is the agency guardrail expressed as a component.

**`search-input`** — `{colors.surface}` field, leading search icon, `{typography.body}` placeholder in `{colors.muted}`, `{rounded.sm}`, 32px.

**`food-card`** — Browse row: food thumbnail (the only color), name in `{typography.title}`, price in `{colors.muted}`, a trailing add (`+`) in `{colors.accent}`. No calorie or nutrition line — ever.

**`cart-line-item`** — Item name × qty on the left, price and a remove control on the right. `{typography.body}`.

**`message-chip`** — The "You can have this. Just not right now." block. `{colors.surface-alt}`, `{rounded.md}`, centered. The product's core line, given a calm home.

**`metric-card`** — The ledger stat blocks: a muted caption above, a large `{typography.display}` number below. "Money kept" uses `{colors.money}`; "nothing ordered" uses `{colors.text}`. Never a calorie or weight metric.

**`ledger-row`** — A past let-go: a small moon icon in `{colors.accent}` + a muted line ("Tonight · let go of biryani"). Framed as a quiet record, not a streak or a score.

**`notification-card`** — The night nudge. `{colors.surface}`, `{rounded.lg}`, the `nil` mark, a title, and one calm line ("Scroll it, don't order it."). Rare and gentle by policy.

**`tracking-step`** — The order-tracking states (Preparing → On its way → Almost there), shown as filled/outlined dots with `{typography.body}` labels. Unhurried.

**`tab-bar`** — `{colors.surface}` bottom bar, three items (browse, tracking, you), active in `{colors.accent}`, inactive in `{colors.muted}`.

## Patterns

**Order flow:** onboarding → browse → cart → fake checkout → "order on its way" tracking → the let-it-go screen. One sitting, no held orders, no morning anything.

**The let-it-go moment:** as the "order" reaches delivery, no food arrives. The screen resolves to a check, the deadpan headline ("Delivered."), one dry line ("You wanted the ritual, not the rice."), and the money-kept total ticking up in `{colors.money}`. Arc: anticipation → gentle anticlimax → a knowing half-smile → calm + a small sense of agency. **Tone guardrail (non-negotiable): never congratulatory about not eating, never about willpower or restriction. The payoff is the completed ritual and the money kept — a shared joke, not an achievement of denial.** This is the screen most capable of harm, so its framing matters most.

**Empty states:** empty cart and fresh ledger are calm and wordless-leaning, never nagging.

## Do's and Don'ts

### Do
- Keep the chrome muted and let food be the only color.
- Reserve `{colors.money}` strictly for money kept.
- Keep `{component.button-text}` ("order it for real") visible on every checkout — agency over restriction.
- Default to dark; treat light as a true alternative, not an afterthought.
- Trust whitespace and size for emphasis, not bold weight.

### Don't
- **Don't show calories, weight, macros, or any body metric anywhere.** Prices and counts only. Hard rule.
- Don't frame the let-it-go moment as beating hunger or winning at restraint.
- Don't borrow Zomato/Sushi's bright red energy — that makes Nil look like the real thing and kills the "this is something else" signal.
- Don't add streaks, scores, or guilt mechanics. Returning is driven by the craving, not by obligation.
- Don't introduce accent colors beyond `{colors.accent}` and `{colors.money}`.
- Don't block the real order. Nil offers; it never restricts.

## Responsive

Single mobile column is the canonical target (PWA). If a wider viewport is ever supported, center the column at a comfortable reading width and add outer margin rather than stretching cards. Card grids reduce columns rather than scaling cards.

## Known gaps / out of scope (this sprint)

- Co-presence components (live "others riding out a craving") — v2.
- The real-money savings vault — v2 premium tier.
- Animation/transition timing tokens — to be defined in the developer handoff.
- Form validation states beyond the basics.
