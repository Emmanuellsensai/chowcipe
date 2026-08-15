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
GEMINI_API_KEY=your_gemini_api_key_here
```

`VITE_PEXELS_API_KEY` is bundled into the client. `GEMINI_API_KEY` is read only by the serverless proxy — do not prefix it with `VITE_`.

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
2. **Recipes** - Chowcipe asks Gemini for five Nigerian dishes, skipping meals you logged recently.
3. **Detail** - numbered steps with exact quantities, missing ingredients with local and common names plus estimated cost, and a kitchen tip.
4. **Markets** - submit and browse community prices per Nigerian market.
5. **History** - what you have cooked, used to keep suggestions varied. Stored in `localStorage`.

## Deployment

Deployed on Vercel. Set both `VITE_PEXELS_API_KEY` and `GEMINI_API_KEY` in the Vercel project settings under Environment Variables, then:

```bash
vercel --prod
```

## Notes

- Meal history and submitted market prices are stored in the browser's `localStorage`; there is no backend yet.
- Recipe generation goes through the serverless proxy at [api/recipes.ts](api/recipes.ts), which calls the Gemini API (`gemini-2.0-flash`) server-side. The browser only ever talks to `/api/recipes`, so `GEMINI_API_KEY` never reaches the client bundle and there is no CORS problem.
- `/api/recipes` is a Vercel serverless function, so it does not exist under plain `npm run dev`. To exercise recipe generation locally, run `npx vercel dev` instead (it serves the Vite app and the `api/` functions together).
