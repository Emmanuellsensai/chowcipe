export interface Dish {
  id: number;
  name: string;
  tribe: string;
  imageSrc: string;
  videoSrc: string;
  fallbackColor: string;
  tagline: string;
}

export const DISHES: Dish[] = [
  { id: 1, name: 'Jollof Rice', tribe: 'General Nigerian', imageSrc: '/images/jollof-poster.jpg', videoSrc: '/videos/jollof.mp4', fallbackColor: '#8B2500', tagline: 'The dish that unites Nigeria' },
  { id: 2, name: 'Egusi Soup', tribe: 'Igbo / Yoruba', imageSrc: '/images/egusi-poster.jpg', videoSrc: '/videos/egusi.mp4', fallbackColor: '#5C3D00', tagline: 'Rich, nutty, deeply satisfying' },
  { id: 3, name: 'Ewa Agoyin', tribe: 'Yoruba', imageSrc: '/images/ewa-agoyin-poster.jpg', videoSrc: '/videos/ewa-agoyin.mp4', fallbackColor: '#3B1F00', tagline: 'Lagos street food at its finest' },
  { id: 4, name: 'Suya', tribe: 'Hausa', imageSrc: '/images/suya-poster.jpg', videoSrc: '/videos/suya.mp4', fallbackColor: '#6B2800', tagline: 'Smoky, spiced, legendary' },
  { id: 5, name: 'Pounded Yam', tribe: 'General Nigerian', imageSrc: '/images/pounded-yam-poster.jpg', videoSrc: '/videos/pounded-yam.mp4', fallbackColor: '#7A5C00', tagline: 'The ultimate swallow' },
  { id: 6, name: 'Akara', tribe: 'Yoruba', imageSrc: '/images/akara-poster.jpg', videoSrc: '/videos/akara.mp4', fallbackColor: '#8B3A00', tagline: 'Crispy morning perfection' },
  { id: 7, name: 'Banga Soup', tribe: 'Delta / Ijaw', imageSrc: '/images/banga-poster.jpg', videoSrc: '/videos/banga.mp4', fallbackColor: '#6B1A00', tagline: 'Deep south comfort in a pot' },
  { id: 8, name: 'Moi Moi', tribe: 'General Nigerian', imageSrc: '/images/moi-moi-poster.jpg', videoSrc: '/videos/moi-moi.mp4', fallbackColor: '#4A3000', tagline: 'Silky, protein-packed, beloved' },
  { id: 9, name: 'Ofada Rice', tribe: 'Yoruba', imageSrc: '/images/ofada-poster.jpg', videoSrc: '/videos/ofada.mp4', fallbackColor: '#2D4A00', tagline: 'Local rice, killer Ayamase' },
  { id: 10, name: 'Pepper Soup', tribe: 'General Nigerian', imageSrc: '/images/pepper-soup-poster.jpg', videoSrc: '/videos/pepper-soup.mp4', fallbackColor: '#7A1A00', tagline: 'Nigeria\'s answer to everything' },
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
