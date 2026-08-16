export interface Dish {
  id: number;
  name: string;
  tribe: string;
  videoSrc: string;
  poster: string;
  fallbackColor: string;
  tagline: string;
}

export const DISHES: Dish[] = [
  { id: 1, name: 'Jollof Rice', tribe: 'General Nigerian', videoSrc: '/videos/jollof.mp4', poster: '/videos/jollof-poster.jpg', fallbackColor: '#8B2500', tagline: 'The dish that unites Nigeria' },
  { id: 2, name: 'Egusi Soup', tribe: 'Igbo / Yoruba', videoSrc: '/videos/egusi.mp4', poster: '/videos/egusi-poster.jpg', fallbackColor: '#5C3D00', tagline: 'Rich, nutty, deeply satisfying' },
  { id: 3, name: 'Ewa Agoyin', tribe: 'Yoruba', videoSrc: '/videos/ewa-agoyin.mp4', poster: '/videos/ewa-agoyin-poster.jpg', fallbackColor: '#3B1F00', tagline: 'Lagos street food at its finest' },
  { id: 4, name: 'Suya', tribe: 'Hausa', videoSrc: '/videos/suya.mp4', poster: '/videos/suya-poster.jpg', fallbackColor: '#6B2800', tagline: 'Smoky, spiced, legendary' },
  { id: 5, name: 'Pounded Yam', tribe: 'General Nigerian', videoSrc: '/videos/pounded-yam.mp4', poster: '/videos/pounded-yam-poster.jpg', fallbackColor: '#7A5C00', tagline: 'The ultimate swallow' },
  { id: 6, name: 'Akara', tribe: 'Yoruba', videoSrc: '/videos/akara.mp4', poster: '/videos/akara-poster.jpg', fallbackColor: '#8B3A00', tagline: 'Crispy morning perfection' },
  { id: 7, name: 'Banga Soup', tribe: 'Delta / Ijaw', videoSrc: '/videos/banga.mp4', poster: '/videos/banga-poster.jpg', fallbackColor: '#6B1A00', tagline: 'Deep south comfort in a pot' },
  { id: 8, name: 'Moi Moi', tribe: 'General Nigerian', videoSrc: '/videos/moi-moi.mp4', poster: '/videos/moi-moi-poster.jpg', fallbackColor: '#4A3000', tagline: 'Silky, protein-packed, beloved' },
  { id: 9, name: 'Ofada Rice', tribe: 'Yoruba', videoSrc: '/videos/ofada.mp4', poster: '/videos/ofada-poster.jpg', fallbackColor: '#2D4A00', tagline: 'Local rice, killer Ayamase' },
  { id: 10, name: 'Pepper Soup', tribe: 'General Nigerian', videoSrc: '/videos/pepper-soup.mp4', poster: '/videos/pepper-soup-poster.jpg', fallbackColor: '#7A1A00', tagline: 'Nigeria\'s answer to everything' },
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
