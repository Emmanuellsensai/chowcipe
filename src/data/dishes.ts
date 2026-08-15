export interface Dish {
  id: number;
  name: string;
  tribe: string;
  pexelsQuery: string;
  fallbackVideoId: string;
  fallbackColor: string;
  tagline: string;
}

export const DISHES: Dish[] = [
  { id: 1, name: 'Jollof Rice', tribe: 'General Nigerian', pexelsQuery: 'jollof rice', fallbackVideoId: '3209828', fallbackColor: '#8B2500', tagline: 'The dish that unites Nigeria' },
  { id: 2, name: 'Egusi Soup', tribe: 'Igbo / Yoruba', pexelsQuery: 'african soup bowl', fallbackVideoId: '3571264', fallbackColor: '#5C3D00', tagline: 'Rich, nutty, deeply satisfying' },
  { id: 3, name: 'Ewa Agoyin', tribe: 'Yoruba', pexelsQuery: 'beans stew', fallbackVideoId: '3175566', fallbackColor: '#3B1F00', tagline: 'Lagos street food at its finest' },
  { id: 4, name: 'Suya', tribe: 'Hausa', pexelsQuery: 'grilled beef skewers', fallbackVideoId: '3296283', fallbackColor: '#6B2800', tagline: 'Smoky, spiced, legendary' },
  { id: 5, name: 'Pounded Yam', tribe: 'General Nigerian', pexelsQuery: 'yam food africa', fallbackVideoId: '3209828', fallbackColor: '#7A5C00', tagline: 'The ultimate swallow' },
  { id: 6, name: 'Akara', tribe: 'Yoruba', pexelsQuery: 'fried bean cakes', fallbackVideoId: '3571264', fallbackColor: '#8B3A00', tagline: 'Crispy morning perfection' },
  { id: 7, name: 'Banga Soup', tribe: 'Delta / Ijaw', pexelsQuery: 'palm fruit soup', fallbackVideoId: '3175566', fallbackColor: '#6B1A00', tagline: 'Deep south comfort in a pot' },
  { id: 8, name: 'Moi Moi', tribe: 'General Nigerian', pexelsQuery: 'steamed bean pudding', fallbackVideoId: '3296283', fallbackColor: '#4A3000', tagline: 'Silky, protein-packed, beloved' },
  { id: 9, name: 'Ofada Rice', tribe: 'Yoruba', pexelsQuery: 'rice stew green sauce', fallbackVideoId: '3209828', fallbackColor: '#2D4A00', tagline: 'Local rice, killer Ayamase' },
  { id: 10, name: 'Pepper Soup', tribe: 'General Nigerian', pexelsQuery: 'spicy soup broth bowl', fallbackVideoId: '3571264', fallbackColor: '#7A1A00', tagline: 'Nigeria\'s answer to everything' },
]

export const MARKETS = [
  'Mile 12, Lagos', 'Oyingbo Market, Lagos', 'Bodija Market, Ibadan',
  'Wuse Market, Abuja', 'Eke Awka Market, Anambra', 'Relief Market, Owerri',
  'Sabongari Market, Kano', 'Dugbe Market, Ibadan', 'Other',
]

export const SAMPLE_INGREDIENTS = [
  'tomatoes', 'onions', 'pepper', 'palm oil', 'crayfish', 'stockfish',
  'beef', 'chicken', 'egusi', 'ugu leaves', 'yam', 'plantain', 'rice',
  'beans', 'groundnut oil', 'garlic', 'ginger', 'scotch bonnet', 'ponmo',
  'dried fish', 'ofor', 'ogiri', 'uziza', 'scent leaf', 'cooking oil',
]
