# Chowcipe

**Nigerian food, decided.** An AI-powered Nigerian meal planner: tell Chowcipe what is in your kitchen and it returns Nigerian dishes you can cook right now, with exact quantities, local ingredient names and community-sourced market prices.

Built for the WEMA Hackaholics 7.0 hackathon.

## Stack

- Vite + React 18 + TypeScript
- Tailwind CSS 3
- TanStack Query, Axios
- Pexels video API for the hero background

## Getting started

```bash
npm install
```

Create a `.env` in the project root:

```
VITE_PEXELS_API_KEY=your_pexels_api_key_here
```

Then run the dev server:

```bash
npm run dev
```

Other scripts:

```bash
npm run build
```

```bash
npm run preview
```

## Project structure

```
src/
  components/   Hero, HowItWorks, Features, BottomCTA, Navbar, BottomNav, RecipeCard, IngredientInput
  pages/        Landing, AppPage
  hooks/        usePexelsVideo, useRecipes, useMealHistory
  data/         dishes.ts (dishes, markets, sample ingredients)
  types/        shared TypeScript types
```

## How it works

1. **Home** - add the ingredients you have, by typing or from the quick-add list.
2. **Recipes** - Chowcipe asks Claude for five Nigerian dishes, skipping meals you logged recently.
3. **Detail** - numbered steps with exact quantities, missing ingredients with local and common names plus estimated cost, and a kitchen tip.
4. **Markets** - submit and browse community prices per Nigerian market.
5. **History** - what you have cooked, used to keep suggestions varied. Stored in `localStorage`.

## Deployment

Deployed on Vercel. Set `VITE_PEXELS_API_KEY` in the Vercel project settings under Environment Variables, then:

```bash
vercel --prod
```

## Notes

- Meal history and submitted market prices are stored in the browser's `localStorage`; there is no backend yet.
- The recipe request in `src/hooks/useRecipes.ts` posts to `https://api.anthropic.com/v1/messages` without an API key, which works only where the host environment injects credentials. For a public deployment, put a small serverless proxy in front of it and keep the key on the server.
