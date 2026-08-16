# Chowcipe

**Nigerian food, decided.** An AI-powered Nigerian meal planner: tell Chowcipe what is in your kitchen and it returns Nigerian dishes you can cook right now, with exact quantities, local ingredient names and community-sourced market prices.

Built for the WEMA Hackaholics 7.0 hackathon.

## Stack

- Vite + React 18 + TypeScript
- Tailwind CSS 3
- TanStack Query, Axios
- Local MP4 clips in `public/videos/` for the hero background and recipe cards

## Getting started

```bash
npm install
```

Create a `.env` in the project root:

```
VITE_GEMINI_API_KEY=your_gemini_api_key_here
GEMINI_API_KEY=your_gemini_api_key_here
```

Same key, two names. `VITE_GEMINI_API_KEY` is readable by the browser and is used only by `npm run dev`, which calls Gemini directly. `GEMINI_API_KEY` has no `VITE_` prefix, so it stays server-side and is the one the production proxy uses — it is also the only one to set in Vercel.

Media lives in `public/videos/` — one `<slug>.mp4` and one `<slug>-poster.jpg` per dish (`jollof`, `egusi`, `ewa-agoyin`, `suya`, `pounded-yam`, `akara`, `banga`, `moi-moi`, `ofada`, `pepper-soup`, plus `plantain`, `beans`, `chicken`, `rice` for recipe cards).

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
  hooks/        useRecipes, useMealHistory
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

Deployed on Vercel. Set `GEMINI_API_KEY` in the Vercel project settings under Environment Variables, then:

```bash
vercel --prod
```

## Notes

- Meal history and submitted market prices are stored in the browser's `localStorage`; there is no backend yet.
- Recipe generation goes through the serverless proxy at [api/recipes.ts](api/recipes.ts), which calls the Gemini API (`gemini-2.5-flash`) server-side. The browser only ever talks to `/api/recipes`, so `GEMINI_API_KEY` never reaches the client bundle and there is no CORS problem.
- `/api/recipes` is a Vercel serverless function, so it does not exist under plain `npm run dev`. To exercise recipe generation locally, run `npx vercel dev` instead (it serves the Vite app and the `api/` functions together).
