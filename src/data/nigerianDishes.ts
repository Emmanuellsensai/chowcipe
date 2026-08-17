/**
 * Curated registry of authentic Nigerian dishes.
 *
 * Every entry is a dish that actually exists in Nigerian kitchens.
 * The AI recipe generator is constrained to this list so it cannot
 * hallucinate fake combinations like "Yam Egusi Wrap" or "Plantain
 * Pepper Stir-fry".
 *
 * Categories follow the way Nigerians talk about food:
 *   soup      – anything served with a swallow or rice
 *   rice      – jollof, fried rice, ofada, coconut rice, etc.
 *   swallow   – pounded yam, amala, eba, fufu, tuwo
 *   porridge  – yam porridge, beans porridge, plantain porridge
 *   beans     – ewa agoyin, moi moi, akara, gbegiri
 *   stew      – tomato stew, ofada stew (ayamase), buka stew
 *   pepper-soup – goat, catfish, chicken, assorted
 *   snack     – puff puff, chin chin, boli, dundun
 *   breakfast – akamu/ogi, custard with akara, bread and egg
 *   grilled   – suya, kilishi, grilled fish
 *   one-pot   – abacha, ugba, nkwobi, isi ewu
 *   drink     – zobo, kunu, fura da nono, tiger nut
 */

export interface NigerianDish {
  /** Canonical name, title-cased */
  name: string
  /** Aliases people actually search or type */
  aliases: string[]
  /** Cultural origin */
  tribe: 'Yoruba' | 'Igbo' | 'Hausa' | 'Delta' | 'Edo' | 'Efik/Ibibio' | 'Calabar' | 'Cross River' | 'Tiv' | 'General Nigerian'
  category: DishCategory
  /** The 1-3 ingredients without which the dish simply cannot exist.
   *  A dish is only suggested when the user has ALL of these. */
  requiredIngredients: string[]
  /** Ingredients that define this dish (not every ingredient, just the ones
   *  that make it what it is). Used for ranking, not gating. */
  coreIngredients: string[]
  /** Common proteins or sides served with it */
  pairings: string[]
  /** Rough cook time range in minutes */
  cookTimeRange: [number, number]
  difficulty: 'Easy' | 'Medium' | 'Hard'
}

export type DishCategory =
  | 'soup'
  | 'rice'
  | 'swallow'
  | 'porridge'
  | 'beans'
  | 'stew'
  | 'pepper-soup'
  | 'snack'
  | 'breakfast'
  | 'grilled'
  | 'one-pot'
  | 'drink'
  | 'side'
  | 'sauce'

export const NIGERIAN_DISHES: NigerianDish[] = [
  // ── SOUPS ──────────────────────────────────────────────────────────────
  {
    name: 'Egusi Soup',
    aliases: ['egusi', 'melon seed soup'],
    tribe: 'General Nigerian',
    category: 'soup',
    coreIngredients: ['egusi', 'palm oil', 'leafy vegetables', 'crayfish', 'pepper', 'onions'],
    requiredIngredients: ['egusi'],
    pairings: ['pounded yam', 'eba', 'fufu', 'amala', 'semolina'],
    cookTimeRange: [40, 60],
    difficulty: 'Medium',
  },
  {
    name: 'Ogbono Soup',
    aliases: ['ogbono', 'draw soup', 'apon'],
    tribe: 'General Nigerian',
    category: 'soup',
    coreIngredients: ['ogbono seeds', 'palm oil', 'crayfish', 'pepper', 'leafy vegetables'],
    requiredIngredients: ['ogbono seeds'],
    pairings: ['pounded yam', 'eba', 'fufu', 'amala'],
    cookTimeRange: [30, 45],
    difficulty: 'Easy',
  },
  {
    name: 'Efo Riro',
    aliases: ['efo', 'vegetable soup', 'efo riro'],
    tribe: 'Yoruba',
    category: 'soup',
    coreIngredients: ['spinach', 'palm oil', 'locust beans', 'crayfish', 'pepper', 'assorted meat'],
    requiredIngredients: ['spinach'],
    pairings: ['pounded yam', 'amala', 'eba'],
    cookTimeRange: [35, 50],
    difficulty: 'Medium',
  },
  {
    name: 'Edikang Ikong',
    aliases: ['edikaikong', 'edikan ikong', 'vegetable soup efik'],
    tribe: 'Efik/Ibibio',
    category: 'soup',
    coreIngredients: ['ugu leaves', 'water leaves', 'palm oil', 'crayfish', 'periwinkle', 'stockfish'],
    requiredIngredients: ['ugu leaves', 'water leaves'],
    pairings: ['pounded yam', 'fufu', 'eba'],
    cookTimeRange: [40, 55],
    difficulty: 'Medium',
  },
  {
    name: 'Afang Soup',
    aliases: ['afang', 'okazi soup'],
    tribe: 'Efik/Ibibio',
    category: 'soup',
    coreIngredients: ['afang leaves', 'water leaves', 'palm oil', 'crayfish', 'periwinkle'],
    requiredIngredients: ['afang leaves'],
    pairings: ['pounded yam', 'fufu', 'eba'],
    cookTimeRange: [45, 60],
    difficulty: 'Medium',
  },
  {
    name: 'Banga Soup',
    aliases: ['banga', 'ofe akwu', 'palm fruit soup'],
    tribe: 'Delta',
    category: 'soup',
    coreIngredients: ['palm fruit extract', 'banga spice', 'fresh fish', 'crayfish'],
    requiredIngredients: ['palm fruit extract'],
    pairings: ['starch', 'pounded yam', 'eba'],
    cookTimeRange: [50, 75],
    difficulty: 'Hard',
  },
  {
    name: 'Oha Soup',
    aliases: ['oha', 'ora soup'],
    tribe: 'Igbo',
    category: 'soup',
    coreIngredients: ['oha leaves', 'cocoyam', 'palm oil', 'crayfish', 'ogiri'],
    requiredIngredients: ['oha leaves'],
    pairings: ['pounded yam', 'fufu', 'eba'],
    cookTimeRange: [45, 60],
    difficulty: 'Medium',
  },
  {
    name: 'Ofe Nsala',
    aliases: ['nsala', 'white soup'],
    tribe: 'Igbo',
    category: 'soup',
    coreIngredients: ['catfish', 'yam', 'utazi leaves', 'crayfish', 'ogiri'],
    requiredIngredients: ['catfish'],
    pairings: ['pounded yam', 'fufu'],
    cookTimeRange: [40, 55],
    difficulty: 'Medium',
  },
  {
    name: 'Ofe Onugbu',
    aliases: ['bitter leaf soup', 'onugbu soup'],
    tribe: 'Igbo',
    category: 'soup',
    coreIngredients: ['bitter leaves', 'cocoyam', 'palm oil', 'crayfish', 'ogiri'],
    requiredIngredients: ['bitter leaves'],
    pairings: ['pounded yam', 'fufu', 'eba'],
    cookTimeRange: [50, 70],
    difficulty: 'Hard',
  },
  {
    name: 'Okro Soup',
    aliases: ['okra soup', 'lady finger soup', 'ila alasepo'],
    tribe: 'General Nigerian',
    category: 'soup',
    coreIngredients: ['okra', 'palm oil', 'crayfish', 'pepper', 'meat or fish'],
    requiredIngredients: ['okra'],
    pairings: ['eba', 'amala', 'pounded yam', 'fufu'],
    cookTimeRange: [30, 45],
    difficulty: 'Easy',
  },
  {
    name: 'Groundnut Soup',
    aliases: ['peanut soup', 'miyan gyada'],
    tribe: 'Hausa',
    category: 'soup',
    coreIngredients: ['groundnut paste', 'tomatoes', 'pepper', 'onions', 'meat'],
    requiredIngredients: ['groundnut paste'],
    pairings: ['tuwo shinkafa', 'tuwo masara', 'rice'],
    cookTimeRange: [40, 55],
    difficulty: 'Medium',
  },
  {
    name: 'Miyan Kuka',
    aliases: ['kuka soup', 'baobab soup'],
    tribe: 'Hausa',
    category: 'soup',
    coreIngredients: ['kuka powder', 'dawadawa', 'potash', 'dried fish', 'pepper'],
    requiredIngredients: ['kuka powder'],
    pairings: ['tuwo shinkafa', 'tuwo masara'],
    cookTimeRange: [25, 40],
    difficulty: 'Easy',
  },
  {
    name: 'Miyan Taushe',
    aliases: ['taushe', 'pumpkin soup hausa'],
    tribe: 'Hausa',
    category: 'soup',
    coreIngredients: ['pumpkin', 'spinach', 'groundnut paste', 'tomatoes', 'pepper'],
    requiredIngredients: ['pumpkin'],
    pairings: ['tuwo shinkafa', 'tuwo masara'],
    cookTimeRange: [40, 55],
    difficulty: 'Medium',
  },
  {
    name: 'Gbegiri',
    aliases: ['beans soup', 'gbegiri soup'],
    tribe: 'Yoruba',
    category: 'soup',
    coreIngredients: ['peeled beans', 'palm oil', 'crayfish', 'pepper', 'onions'],
    requiredIngredients: ['peeled beans'],
    pairings: ['amala', 'ewedu'],
    cookTimeRange: [35, 50],
    difficulty: 'Medium',
  },
  {
    name: 'Ewedu Soup',
    aliases: ['ewedu', 'jute leaf soup'],
    tribe: 'Yoruba',
    category: 'soup',
    coreIngredients: ['ewedu leaves', 'locust beans', 'potash'],
    requiredIngredients: ['ewedu leaves'],
    pairings: ['amala', 'gbegiri'],
    cookTimeRange: [15, 25],
    difficulty: 'Easy',
  },
  {
    name: 'Seafood Okro',
    aliases: ['seafood okra', 'okro with seafood'],
    tribe: 'General Nigerian',
    category: 'soup',
    coreIngredients: ['okra', 'prawns', 'crab', 'fish', 'palm oil', 'crayfish'],
    requiredIngredients: ['okra'],
    pairings: ['eba', 'pounded yam', 'fufu'],
    cookTimeRange: [35, 50],
    difficulty: 'Medium',
  },
  {
    name: 'Obe Ata Dindin',
    aliases: ['fried pepper stew', 'ata dindin'],
    tribe: 'Yoruba',
    category: 'stew',
    coreIngredients: ['bell peppers', 'scotch bonnet', 'tomatoes', 'palm oil', 'onions', 'locust beans'],
    requiredIngredients: ['bell peppers'],
    pairings: ['rice', 'yam', 'bread', 'plantain'],
    cookTimeRange: [30, 45],
    difficulty: 'Easy',
  },
  {
    name: 'Ofe Owerri',
    aliases: ['owerri soup'],
    tribe: 'Igbo',
    category: 'soup',
    coreIngredients: ['cocoyam', 'ugu leaves', 'palm oil', 'assorted meat', 'stockfish', 'crayfish'],
    requiredIngredients: ['cocoyam', 'ugu leaves'],
    pairings: ['pounded yam', 'fufu', 'eba'],
    cookTimeRange: [60, 90],
    difficulty: 'Hard',
  },

  // ── RICE DISHES ────────────────────────────────────────────────────────
  {
    name: 'Jollof Rice',
    aliases: ['jollof', 'party jollof', 'smoky jollof'],
    tribe: 'General Nigerian',
    category: 'rice',
    coreIngredients: ['rice', 'tomatoes', 'pepper', 'onions', 'tomato paste', 'vegetable oil'],
    requiredIngredients: ['rice'],
    pairings: ['fried plantain', 'coleslaw', 'moi moi', 'chicken', 'beef'],
    cookTimeRange: [45, 75],
    difficulty: 'Medium',
  },
  {
    name: 'Fried Rice',
    aliases: ['nigerian fried rice', 'party fried rice'],
    tribe: 'General Nigerian',
    category: 'rice',
    coreIngredients: ['rice', 'mixed vegetables', 'soy sauce', 'curry powder', 'thyme', 'vegetable oil'],
    requiredIngredients: ['rice'],
    pairings: ['chicken', 'beef', 'salad', 'moi moi'],
    cookTimeRange: [40, 60],
    difficulty: 'Medium',
  },
  {
    name: 'Ofada Rice with Ayamase',
    aliases: ['ofada rice', 'ofada', 'ayamase rice', 'designer stew'],
    tribe: 'Yoruba',
    category: 'rice',
    coreIngredients: ['ofada rice', 'green bell peppers', 'scotch bonnet', 'locust beans', 'palm oil', 'assorted meat'],
    requiredIngredients: ['rice', 'green bell peppers'],
    pairings: ['fried plantain', 'ponmo'],
    cookTimeRange: [50, 70],
    difficulty: 'Medium',
  },
  {
    name: 'Coconut Rice',
    aliases: ['coconut jollof'],
    tribe: 'General Nigerian',
    category: 'rice',
    coreIngredients: ['rice', 'coconut milk', 'tomatoes', 'pepper', 'onions'],
    requiredIngredients: ['rice', 'coconut milk'],
    pairings: ['fried plantain', 'chicken', 'fish'],
    cookTimeRange: [40, 60],
    difficulty: 'Easy',
  },
  {
    name: 'Native Jollof Rice',
    aliases: ['native jollof', 'palm oil jollof', 'concoction rice'],
    tribe: 'General Nigerian',
    category: 'rice',
    coreIngredients: ['rice', 'palm oil', 'crayfish', 'pepper', 'leafy vegetables', 'stockfish'],
    requiredIngredients: ['rice'],
    pairings: ['fried plantain', 'ponmo'],
    cookTimeRange: [40, 60],
    difficulty: 'Medium',
  },
  {
    name: 'Tuwo Shinkafa',
    aliases: ['tuwo', 'rice swallow'],
    tribe: 'Hausa',
    category: 'swallow',
    coreIngredients: ['rice flour', 'water'],
    requiredIngredients: ['rice flour'],
    pairings: ['miyan kuka', 'miyan taushe', 'groundnut soup'],
    cookTimeRange: [15, 25],
    difficulty: 'Easy',
  },
  {
    name: 'Tuwo Masara',
    aliases: ['corn tuwo', 'corn swallow'],
    tribe: 'Hausa',
    category: 'swallow',
    coreIngredients: ['corn flour', 'water'],
    requiredIngredients: ['corn flour'],
    pairings: ['miyan kuka', 'miyan taushe', 'groundnut soup'],
    cookTimeRange: [15, 25],
    difficulty: 'Easy',
  },

  // ── SWALLOWS ───────────────────────────────────────────────────────────
  {
    name: 'Pounded Yam',
    aliases: ['iyan', 'poundy'],
    tribe: 'General Nigerian',
    category: 'swallow',
    coreIngredients: ['yam'],
    requiredIngredients: ['yam'],
    pairings: ['egusi soup', 'ogbono soup', 'efo riro', 'oha soup', 'bitter leaf soup'],
    cookTimeRange: [25, 40],
    difficulty: 'Medium',
  },
  {
    name: 'Amala',
    aliases: ['amala', 'yam flour swallow'],
    tribe: 'Yoruba',
    category: 'swallow',
    coreIngredients: ['yam flour'],
    requiredIngredients: ['yam flour'],
    pairings: ['ewedu', 'gbegiri', 'ogbono soup', 'okro soup'],
    cookTimeRange: [10, 15],
    difficulty: 'Easy',
  },
  {
    name: 'Eba',
    aliases: ['garri', 'eba'],
    tribe: 'General Nigerian',
    category: 'swallow',
    coreIngredients: ['garri'],
    requiredIngredients: ['garri'],
    pairings: ['egusi soup', 'ogbono soup', 'okro soup', 'afang soup', 'vegetable soup'],
    cookTimeRange: [5, 10],
    difficulty: 'Easy',
  },
  {
    name: 'Fufu',
    aliases: ['akpu', 'cassava fufu', 'santana'],
    tribe: 'General Nigerian',
    category: 'swallow',
    coreIngredients: ['cassava'],
    requiredIngredients: ['cassava'],
    pairings: ['egusi soup', 'ogbono soup', 'oha soup', 'bitter leaf soup'],
    cookTimeRange: [5, 10],
    difficulty: 'Easy',
  },
  {
    name: 'Semolina',
    aliases: ['semovita', 'semo'],
    tribe: 'General Nigerian',
    category: 'swallow',
    coreIngredients: ['semolina flour'],
    requiredIngredients: ['semolina flour'],
    pairings: ['egusi soup', 'ogbono soup', 'efo riro', 'okro soup'],
    cookTimeRange: [5, 10],
    difficulty: 'Easy',
  },
  {
    name: 'Wheat',
    aliases: ['wheat fufu', 'wheat meal'],
    tribe: 'General Nigerian',
    category: 'swallow',
    coreIngredients: ['wheat flour'],
    requiredIngredients: ['wheat flour'],
    pairings: ['egusi soup', 'ogbono soup', 'vegetable soup'],
    cookTimeRange: [5, 10],
    difficulty: 'Easy',
  },
  {
    name: 'Starch',
    aliases: ['usi', 'cassava starch'],
    tribe: 'Delta',
    category: 'swallow',
    coreIngredients: ['cassava starch'],
    requiredIngredients: ['cassava starch'],
    pairings: ['banga soup', 'ogbono soup'],
    cookTimeRange: [5, 10],
    difficulty: 'Easy',
  },
  {
    name: 'Oatmeal Swallow',
    aliases: ['oat fufu', 'oat swallow'],
    tribe: 'General Nigerian',
    category: 'swallow',
    coreIngredients: ['oat flour'],
    requiredIngredients: ['oat flour'],
    pairings: ['egusi soup', 'okro soup', 'vegetable soup'],
    cookTimeRange: [5, 10],
    difficulty: 'Easy',
  },
  {
    name: 'Plantain Fufu',
    aliases: ['plantain swallow'],
    tribe: 'General Nigerian',
    category: 'swallow',
    coreIngredients: ['unripe plantain'],
    requiredIngredients: ['unripe plantain'],
    pairings: ['egusi soup', 'vegetable soup', 'okro soup'],
    cookTimeRange: [15, 20],
    difficulty: 'Easy',
  },

  // ── PORRIDGE ───────────────────────────────────────────────────────────
  {
    name: 'Yam Porridge',
    aliases: ['yam pottage', 'asaro', 'ji mmiri oku'],
    tribe: 'General Nigerian',
    category: 'porridge',
    coreIngredients: ['yam', 'palm oil', 'pepper', 'onions', 'crayfish'],
    requiredIngredients: ['yam'],
    pairings: ['fried fish', 'egg'],
    cookTimeRange: [30, 45],
    difficulty: 'Easy',
  },
  {
    name: 'Beans Porridge',
    aliases: ['beans pottage', 'ewa oloyin porridge'],
    tribe: 'General Nigerian',
    category: 'porridge',
    coreIngredients: ['beans', 'palm oil', 'pepper', 'onions', 'crayfish'],
    requiredIngredients: ['beans'],
    pairings: ['fried plantain', 'garri', 'bread'],
    cookTimeRange: [40, 60],
    difficulty: 'Easy',
  },
  {
    name: 'Plantain Porridge',
    aliases: ['plantain pottage', 'unripe plantain porridge'],
    tribe: 'General Nigerian',
    category: 'porridge',
    coreIngredients: ['unripe plantain', 'palm oil', 'pepper', 'crayfish', 'vegetables'],
    requiredIngredients: ['unripe plantain'],
    pairings: ['fried fish', 'ponmo'],
    cookTimeRange: [25, 40],
    difficulty: 'Easy',
  },
  {
    name: 'Sweet Potato Porridge',
    aliases: ['sweet potato pottage'],
    tribe: 'General Nigerian',
    category: 'porridge',
    coreIngredients: ['sweet potato', 'palm oil', 'pepper', 'onions', 'crayfish'],
    requiredIngredients: ['sweet potato'],
    pairings: ['fried fish'],
    cookTimeRange: [25, 40],
    difficulty: 'Easy',
  },
  {
    name: 'Yam and Egg Sauce',
    aliases: ['boiled yam and egg', 'yam and egg'],
    tribe: 'General Nigerian',
    category: 'porridge',
    coreIngredients: ['yam', 'eggs', 'tomatoes', 'pepper', 'onions', 'vegetable oil'],
    requiredIngredients: ['yam', 'eggs'],
    pairings: ['fried plantain'],
    cookTimeRange: [25, 35],
    difficulty: 'Easy',
  },

  // ── BEANS ──────────────────────────────────────────────────────────────
  {
    name: 'Ewa Agoyin',
    aliases: ['ewa aganyin', 'agoyin beans'],
    tribe: 'Yoruba',
    category: 'beans',
    coreIngredients: ['beans', 'palm oil', 'dried pepper', 'onions', 'locust beans'],
    requiredIngredients: ['beans'],
    pairings: ['bread', 'fried plantain', 'garri'],
    cookTimeRange: [60, 90],
    difficulty: 'Medium',
  },
  {
    name: 'Moi Moi',
    aliases: ['moin moin', 'bean pudding'],
    tribe: 'General Nigerian',
    category: 'beans',
    coreIngredients: ['beans', 'pepper', 'onions', 'palm oil', 'crayfish'],
    requiredIngredients: ['beans'],
    pairings: ['jollof rice', 'custard', 'pap', 'bread'],
    cookTimeRange: [45, 70],
    difficulty: 'Medium',
  },
  {
    name: 'Akara',
    aliases: ['bean cake', 'kosai'],
    tribe: 'General Nigerian',
    category: 'beans',
    coreIngredients: ['beans', 'pepper', 'onions', 'vegetable oil'],
    requiredIngredients: ['beans'],
    pairings: ['pap', 'custard', 'bread', 'garri'],
    cookTimeRange: [20, 35],
    difficulty: 'Easy',
  },
  {
    name: 'Ekuru',
    aliases: ['white moi moi'],
    tribe: 'Yoruba',
    category: 'beans',
    coreIngredients: ['beans', 'onions'],
    requiredIngredients: ['beans'],
    pairings: ['ata dindin', 'palm oil stew'],
    cookTimeRange: [40, 60],
    difficulty: 'Easy',
  },

  // ── STEWS & SAUCES ─────────────────────────────────────────────────────
  {
    name: 'Nigerian Tomato Stew',
    aliases: ['tomato stew', 'obe ata', 'basic stew'],
    tribe: 'General Nigerian',
    category: 'stew',
    coreIngredients: ['tomatoes', 'scotch bonnet', 'bell peppers', 'onions', 'vegetable oil'],
    requiredIngredients: ['tomatoes'],
    pairings: ['rice', 'yam', 'bread', 'spaghetti', 'plantain'],
    cookTimeRange: [35, 50],
    difficulty: 'Easy',
  },
  {
    name: 'Ayamase',
    aliases: ['ofada stew', 'designer stew', 'green pepper stew'],
    tribe: 'Yoruba',
    category: 'stew',
    coreIngredients: ['green bell peppers', 'scotch bonnet', 'locust beans', 'palm oil', 'assorted meat'],
    requiredIngredients: ['green bell peppers'],
    pairings: ['ofada rice', 'white rice', 'fried plantain'],
    cookTimeRange: [40, 55],
    difficulty: 'Medium',
  },
  {
    name: 'Buka Stew',
    aliases: ['local stew', 'mama put stew', 'palm oil stew'],
    tribe: 'General Nigerian',
    category: 'stew',
    coreIngredients: ['palm oil', 'pepper', 'locust beans', 'crayfish', 'onions'],
    requiredIngredients: ['palm oil', 'locust beans'],
    pairings: ['rice', 'yam', 'plantain', 'bread'],
    cookTimeRange: [30, 45],
    difficulty: 'Easy',
  },
  {
    name: 'Garden Egg Sauce',
    aliases: ['garden egg stew'],
    tribe: 'Igbo',
    category: 'sauce',
    coreIngredients: ['garden eggs', 'palm oil', 'crayfish', 'onions', 'pepper'],
    requiredIngredients: ['garden eggs'],
    pairings: ['boiled yam', 'plantain'],
    cookTimeRange: [20, 30],
    difficulty: 'Easy',
  },

  // ── PEPPER SOUP ────────────────────────────────────────────────────────
  {
    name: 'Goat Meat Pepper Soup',
    aliases: ['goat pepper soup', 'point and kill goat'],
    tribe: 'General Nigerian',
    category: 'pepper-soup',
    coreIngredients: ['goat meat', 'pepper soup spice', 'scent leaves', 'onions'],
    requiredIngredients: ['goat meat'],
    pairings: ['boiled yam', 'boiled plantain', 'white rice'],
    cookTimeRange: [50, 70],
    difficulty: 'Medium',
  },
  {
    name: 'Catfish Pepper Soup',
    aliases: ['catfish peppersoup', 'point and kill'],
    tribe: 'General Nigerian',
    category: 'pepper-soup',
    coreIngredients: ['catfish', 'pepper soup spice', 'scent leaves', 'onions'],
    requiredIngredients: ['catfish'],
    pairings: ['boiled yam', 'boiled plantain', 'white rice'],
    cookTimeRange: [25, 40],
    difficulty: 'Easy',
  },
  {
    name: 'Chicken Pepper Soup',
    aliases: ['chicken peppersoup'],
    tribe: 'General Nigerian',
    category: 'pepper-soup',
    coreIngredients: ['chicken', 'pepper soup spice', 'scent leaves', 'onions'],
    requiredIngredients: ['chicken'],
    pairings: ['boiled yam', 'boiled plantain'],
    cookTimeRange: [35, 50],
    difficulty: 'Easy',
  },
  {
    name: 'Assorted Pepper Soup',
    aliases: ['assorted peppersoup', 'mixed meat pepper soup'],
    tribe: 'General Nigerian',
    category: 'pepper-soup',
    coreIngredients: ['assorted meat', 'pepper soup spice', 'scent leaves', 'onions', 'tripe', 'cow foot'],
    requiredIngredients: ['assorted meat'],
    pairings: ['boiled yam', 'boiled plantain'],
    cookTimeRange: [50, 70],
    difficulty: 'Medium',
  },

  // ── SNACKS & SIDES ────────────────────────────────────────────────────
  {
    name: 'Puff Puff',
    aliases: ['puff-puff', 'bofrot'],
    tribe: 'General Nigerian',
    category: 'snack',
    coreIngredients: ['flour', 'sugar', 'yeast', 'vegetable oil', 'water'],
    requiredIngredients: ['flour', 'yeast'],
    pairings: [],
    cookTimeRange: [30, 45],
    difficulty: 'Easy',
  },
  {
    name: 'Chin Chin',
    aliases: ['chinchin'],
    tribe: 'General Nigerian',
    category: 'snack',
    coreIngredients: ['flour', 'sugar', 'butter', 'eggs', 'nutmeg', 'vegetable oil'],
    requiredIngredients: ['flour'],
    pairings: [],
    cookTimeRange: [30, 50],
    difficulty: 'Easy',
  },
  {
    name: 'Boli',
    aliases: ['roasted plantain', 'bole'],
    tribe: 'General Nigerian',
    category: 'snack',
    coreIngredients: ['ripe plantain'],
    requiredIngredients: ['ripe plantain'],
    pairings: ['groundnut', 'palm oil sauce', 'pepper sauce', 'fish'],
    cookTimeRange: [15, 25],
    difficulty: 'Easy',
  },
  {
    name: 'Dundun',
    aliases: ['fried yam', 'dun dun'],
    tribe: 'Yoruba',
    category: 'snack',
    coreIngredients: ['yam', 'vegetable oil', 'salt'],
    requiredIngredients: ['yam'],
    pairings: ['egg sauce', 'pepper sauce', 'fried eggs'],
    cookTimeRange: [15, 25],
    difficulty: 'Easy',
  },
  {
    name: 'Fried Plantain',
    aliases: ['dodo', 'fried ripe plantain'],
    tribe: 'General Nigerian',
    category: 'side',
    coreIngredients: ['ripe plantain', 'vegetable oil'],
    requiredIngredients: ['ripe plantain'],
    pairings: ['rice', 'beans', 'stew', 'eggs'],
    cookTimeRange: [10, 15],
    difficulty: 'Easy',
  },
  {
    name: 'Gizdodo',
    aliases: ['gizzard and plantain', 'giz dodo'],
    tribe: 'Yoruba',
    category: 'side',
    coreIngredients: ['gizzard', 'ripe plantain', 'bell peppers', 'onions', 'tomatoes'],
    requiredIngredients: ['gizzard', 'ripe plantain'],
    pairings: ['jollof rice', 'fried rice'],
    cookTimeRange: [30, 45],
    difficulty: 'Easy',
  },
  {
    name: 'Peppered Snail',
    aliases: ['snail stew', 'peppered snails'],
    tribe: 'General Nigerian',
    category: 'side',
    coreIngredients: ['snails', 'bell peppers', 'scotch bonnet', 'onions', 'palm oil'],
    requiredIngredients: ['snails'],
    pairings: ['rice', 'drinks'],
    cookTimeRange: [25, 40],
    difficulty: 'Medium',
  },
  {
    name: 'Asun',
    aliases: ['peppered goat meat', 'spicy goat'],
    tribe: 'Yoruba',
    category: 'side',
    coreIngredients: ['goat meat', 'scotch bonnet', 'onions', 'bell peppers'],
    requiredIngredients: ['goat meat'],
    pairings: ['drinks', 'jollof rice', 'fried plantain'],
    cookTimeRange: [40, 60],
    difficulty: 'Medium',
  },
  {
    name: 'Peppered Gizzard',
    aliases: ['gizdodo base', 'spicy gizzard'],
    tribe: 'General Nigerian',
    category: 'side',
    coreIngredients: ['gizzard', 'bell peppers', 'scotch bonnet', 'onions'],
    requiredIngredients: ['gizzard'],
    pairings: ['drinks', 'jollof rice'],
    cookTimeRange: [30, 45],
    difficulty: 'Easy',
  },
  {
    name: 'Meat Pie',
    aliases: ['nigerian meat pie'],
    tribe: 'General Nigerian',
    category: 'snack',
    coreIngredients: ['flour', 'butter', 'minced meat', 'potatoes', 'carrots'],
    requiredIngredients: ['flour', 'minced meat'],
    pairings: ['drinks'],
    cookTimeRange: [60, 90],
    difficulty: 'Hard',
  },
  {
    name: 'Egg Roll',
    aliases: ['nigerian egg roll', 'scotch egg nigerian style'],
    tribe: 'General Nigerian',
    category: 'snack',
    coreIngredients: ['flour', 'eggs', 'sugar', 'vegetable oil', 'baking powder'],
    requiredIngredients: ['flour', 'eggs'],
    pairings: ['drinks'],
    cookTimeRange: [30, 45],
    difficulty: 'Medium',
  },
  {
    name: 'Spring Roll',
    aliases: ['nigerian spring roll'],
    tribe: 'General Nigerian',
    category: 'snack',
    coreIngredients: ['spring roll wrapper', 'cabbage', 'carrots', 'minced meat', 'vegetable oil'],
    requiredIngredients: ['spring roll wrapper'],
    pairings: ['sweet chili sauce'],
    cookTimeRange: [30, 45],
    difficulty: 'Medium',
  },
  {
    name: 'Suya',
    aliases: ['beef suya', 'yaji meat'],
    tribe: 'Hausa',
    category: 'grilled',
    coreIngredients: ['beef', 'suya spice', 'groundnut powder', 'onions'],
    requiredIngredients: ['beef', 'suya spice'],
    pairings: ['sliced onions', 'tomatoes', 'cabbage', 'bread'],
    cookTimeRange: [30, 50],
    difficulty: 'Medium',
  },
  {
    name: 'Chicken Suya',
    aliases: ['suya chicken'],
    tribe: 'Hausa',
    category: 'grilled',
    coreIngredients: ['chicken', 'suya spice', 'groundnut powder', 'onions'],
    requiredIngredients: ['chicken', 'suya spice'],
    pairings: ['sliced onions', 'tomatoes', 'cabbage'],
    cookTimeRange: [30, 50],
    difficulty: 'Medium',
  },
  {
    name: 'Kilishi',
    aliases: ['dried suya', 'nigerian jerky'],
    tribe: 'Hausa',
    category: 'grilled',
    coreIngredients: ['beef', 'groundnut paste', 'suya spice', 'ginger', 'onions'],
    requiredIngredients: ['beef', 'suya spice'],
    pairings: [],
    cookTimeRange: [120, 180],
    difficulty: 'Hard',
  },
  {
    name: 'Grilled Fish',
    aliases: ['bole fish', 'barbecue fish', 'croaker fish grilled'],
    tribe: 'General Nigerian',
    category: 'grilled',
    coreIngredients: ['whole fish', 'pepper', 'onions', 'vegetable oil'],
    requiredIngredients: ['whole fish'],
    pairings: ['fried plantain', 'yam', 'jollof rice'],
    cookTimeRange: [25, 40],
    difficulty: 'Easy',
  },

  // ── BREAKFAST ──────────────────────────────────────────────────────────
  {
    name: 'Pap',
    aliases: ['akamu', 'ogi', 'corn pap'],
    tribe: 'General Nigerian',
    category: 'breakfast',
    coreIngredients: ['corn starch', 'water', 'sugar'],
    requiredIngredients: ['corn starch'],
    pairings: ['akara', 'moi moi', 'bread'],
    cookTimeRange: [5, 10],
    difficulty: 'Easy',
  },
  {
    name: 'Bread and Egg',
    aliases: ['egg sandwich', 'nigerian bread and egg'],
    tribe: 'General Nigerian',
    category: 'breakfast',
    coreIngredients: ['bread', 'eggs', 'tomatoes', 'onions', 'vegetable oil'],
    requiredIngredients: ['bread', 'eggs'],
    pairings: ['tea', 'pap'],
    cookTimeRange: [10, 15],
    difficulty: 'Easy',
  },
  {
    name: 'Yam and Egg',
    aliases: ['boiled yam with egg sauce'],
    tribe: 'General Nigerian',
    category: 'breakfast',
    coreIngredients: ['yam', 'eggs', 'tomatoes', 'pepper', 'onions'],
    requiredIngredients: ['yam', 'eggs'],
    pairings: ['tea'],
    cookTimeRange: [20, 30],
    difficulty: 'Easy',
  },
  {
    name: 'Hausa Koko',
    aliases: ['millet porridge', 'fura porridge'],
    tribe: 'Hausa',
    category: 'breakfast',
    coreIngredients: ['millet', 'ginger', 'cloves', 'pepper'],
    requiredIngredients: ['millet'],
    pairings: ['kosai', 'sugar'],
    cookTimeRange: [20, 30],
    difficulty: 'Easy',
  },
  {
    name: 'Masa',
    aliases: ['waina', 'rice cake hausa'],
    tribe: 'Hausa',
    category: 'breakfast',
    coreIngredients: ['rice', 'yeast', 'sugar', 'water'],
    requiredIngredients: ['rice'],
    pairings: ['sugar', 'honey', 'pepper sauce'],
    cookTimeRange: [30, 45],
    difficulty: 'Medium',
  },

  // ── ONE-POT / COLD DISHES ─────────────────────────────────────────────
  {
    name: 'Abacha',
    aliases: ['african salad', 'abacha ncha'],
    tribe: 'Igbo',
    category: 'one-pot',
    coreIngredients: ['abacha', 'palm oil', 'potash', 'garden eggs', 'onions', 'crayfish', 'ugba'],
    requiredIngredients: ['abacha'],
    pairings: [],
    cookTimeRange: [20, 35],
    difficulty: 'Medium',
  },
  {
    name: 'Nkwobi',
    aliases: ['spicy cow foot', 'nkwobi igbo'],
    tribe: 'Igbo',
    category: 'one-pot',
    coreIngredients: ['cow foot', 'palm oil', 'potash', 'utazi leaves', 'pepper'],
    requiredIngredients: ['cow foot'],
    pairings: ['drinks'],
    cookTimeRange: [60, 90],
    difficulty: 'Hard',
  },
  {
    name: 'Isi Ewu',
    aliases: ['goat head', 'isi ewu igbo'],
    tribe: 'Igbo',
    category: 'one-pot',
    coreIngredients: ['goat head', 'palm oil', 'potash', 'utazi leaves', 'pepper', 'ehuru'],
    requiredIngredients: ['goat head'],
    pairings: ['drinks'],
    cookTimeRange: [60, 90],
    difficulty: 'Hard',
  },
  {
    name: 'Ugba',
    aliases: ['ukpaka', 'oil bean salad'],
    tribe: 'Igbo',
    category: 'one-pot',
    coreIngredients: ['ugba', 'palm oil', 'crayfish', 'onions', 'potash', 'garden egg'],
    requiredIngredients: ['ugba'],
    pairings: ['abacha'],
    cookTimeRange: [15, 25],
    difficulty: 'Easy',
  },
  {
    name: 'Nigerian Salad',
    aliases: ['party salad', 'coleslaw nigerian'],
    tribe: 'General Nigerian',
    category: 'side',
    coreIngredients: ['cabbage', 'carrots', 'green peas', 'baked beans', 'salad cream', 'boiled eggs'],
    requiredIngredients: ['cabbage', 'carrots'],
    pairings: ['jollof rice', 'fried rice'],
    cookTimeRange: [20, 30],
    difficulty: 'Easy',
  },
  {
    name: 'Nigerian Coleslaw',
    aliases: ['coleslaw'],
    tribe: 'General Nigerian',
    category: 'side',
    coreIngredients: ['cabbage', 'carrots', 'salad cream', 'sugar'],
    requiredIngredients: ['cabbage', 'carrots'],
    pairings: ['jollof rice', 'fried rice', 'fried chicken'],
    cookTimeRange: [10, 15],
    difficulty: 'Easy',
  },
  {
    name: 'Pepper Chicken',
    aliases: ['peppered chicken', 'fried chicken nigerian'],
    tribe: 'General Nigerian',
    category: 'side',
    coreIngredients: ['chicken', 'scotch bonnet', 'bell peppers', 'onions', 'vegetable oil'],
    requiredIngredients: ['chicken'],
    pairings: ['jollof rice', 'fried rice', 'drinks'],
    cookTimeRange: [40, 60],
    difficulty: 'Medium',
  },
  {
    name: 'Peppered Turkey',
    aliases: ['fried turkey', 'spicy turkey'],
    tribe: 'General Nigerian',
    category: 'side',
    coreIngredients: ['turkey', 'scotch bonnet', 'bell peppers', 'onions', 'vegetable oil'],
    requiredIngredients: ['turkey'],
    pairings: ['jollof rice', 'fried rice'],
    cookTimeRange: [40, 60],
    difficulty: 'Medium',
  },

  // ── PASTA ──────────────────────────────────────────────────────────────
  {
    name: 'Jollof Spaghetti',
    aliases: ['spaghetti jollof', 'nigerian pasta'],
    tribe: 'General Nigerian',
    category: 'one-pot',
    coreIngredients: ['spaghetti', 'tomatoes', 'pepper', 'onions', 'vegetable oil'],
    requiredIngredients: ['spaghetti'],
    pairings: ['fried plantain', 'chicken', 'boiled egg'],
    cookTimeRange: [25, 40],
    difficulty: 'Easy',
  },
  {
    name: 'Nigerian Macaroni',
    aliases: ['macaroni and stew', 'nigerian mac'],
    tribe: 'General Nigerian',
    category: 'one-pot',
    coreIngredients: ['macaroni', 'tomato stew', 'onions', 'vegetable oil'],
    requiredIngredients: ['macaroni'],
    pairings: ['fried plantain', 'chicken', 'boiled egg'],
    cookTimeRange: [20, 35],
    difficulty: 'Easy',
  },

  // ── DRINKS ─────────────────────────────────────────────────────────────
  {
    name: 'Zobo',
    aliases: ['hibiscus drink', 'zobo drink'],
    tribe: 'General Nigerian',
    category: 'drink',
    coreIngredients: ['zobo leaves', 'ginger', 'pineapple', 'sugar', 'cloves'],
    requiredIngredients: ['zobo leaves'],
    pairings: [],
    cookTimeRange: [30, 45],
    difficulty: 'Easy',
  },
  {
    name: 'Kunu',
    aliases: ['kunu zaki', 'millet drink'],
    tribe: 'Hausa',
    category: 'drink',
    coreIngredients: ['millet', 'ginger', 'cloves', 'sugar', 'sweet potato'],
    requiredIngredients: ['millet'],
    pairings: [],
    cookTimeRange: [30, 45],
    difficulty: 'Medium',
  },
  {
    name: 'Fura da Nono',
    aliases: ['fura', 'millet balls and yogurt'],
    tribe: 'Hausa',
    category: 'drink',
    coreIngredients: ['millet', 'nono', 'ginger', 'cloves', 'sugar'],
    requiredIngredients: ['millet', 'nono'],
    pairings: [],
    cookTimeRange: [30, 45],
    difficulty: 'Medium',
  },
  {
    name: 'Tiger Nut Drink',
    aliases: ['kunun aya', 'tiger nut milk'],
    tribe: 'Hausa',
    category: 'drink',
    coreIngredients: ['tiger nuts', 'dates', 'coconut', 'ginger'],
    requiredIngredients: ['tiger nuts'],
    pairings: [],
    cookTimeRange: [20, 35],
    difficulty: 'Easy',
  },

  // ── MORE SOUPS / REGIONAL ─────────────────────────────────────────────
  {
    name: 'Fisherman Soup',
    aliases: ['efere ndek ikon', 'calabar fisherman soup'],
    tribe: 'Calabar',
    category: 'soup',
    coreIngredients: ['assorted fresh fish', 'periwinkle', 'palm oil', 'crayfish', 'yam'],
    requiredIngredients: ['assorted fresh fish'],
    pairings: ['eba', 'fufu', 'pounded yam'],
    cookTimeRange: [40, 60],
    difficulty: 'Medium',
  },
  {
    name: 'Black Soup',
    aliases: ['marugbo soup'],
    tribe: 'Delta',
    category: 'soup',
    coreIngredients: ['marugbo leaves', 'palm oil', 'crayfish', 'stockfish', 'pepper'],
    requiredIngredients: ['marugbo leaves'],
    pairings: ['starch', 'eba', 'pounded yam'],
    cookTimeRange: [40, 55],
    difficulty: 'Medium',
  },
  {
    name: 'Ikokore',
    aliases: ['water yam porridge', 'ifokore'],
    tribe: 'Yoruba',
    category: 'porridge',
    coreIngredients: ['water yam', 'palm oil', 'crayfish', 'pepper', 'smoked fish'],
    requiredIngredients: ['water yam'],
    pairings: [],
    cookTimeRange: [35, 50],
    difficulty: 'Medium',
  },
  {
    name: 'Efo Elegusi',
    aliases: ['elegusi', 'egusi and efo combo'],
    tribe: 'Yoruba',
    category: 'soup',
    coreIngredients: ['egusi', 'spinach', 'palm oil', 'crayfish', 'assorted meat'],
    requiredIngredients: ['egusi', 'spinach'],
    pairings: ['amala', 'pounded yam', 'eba'],
    cookTimeRange: [40, 55],
    difficulty: 'Medium',
  },
  {
    name: 'White Rice and Stew',
    aliases: ['rice and stew', 'plain rice and stew'],
    tribe: 'General Nigerian',
    category: 'rice',
    coreIngredients: ['rice', 'tomato stew'],
    requiredIngredients: ['rice'],
    pairings: ['fried plantain', 'chicken', 'beef', 'salad'],
    cookTimeRange: [30, 45],
    difficulty: 'Easy',
  },
  {
    name: 'Beans and Plantain',
    aliases: ['beans and dodo', 'ewa and dodo'],
    tribe: 'General Nigerian',
    category: 'beans',
    coreIngredients: ['beans', 'ripe plantain', 'palm oil', 'pepper', 'onions'],
    requiredIngredients: ['beans', 'ripe plantain'],
    pairings: ['garri'],
    cookTimeRange: [45, 65],
    difficulty: 'Easy',
  },
  {
    name: 'Peppered Ponmo',
    aliases: ['ponmo stew', 'kpomo pepper'],
    tribe: 'General Nigerian',
    category: 'side',
    coreIngredients: ['ponmo', 'bell peppers', 'scotch bonnet', 'onions', 'palm oil'],
    requiredIngredients: ['ponmo'],
    pairings: ['rice', 'drinks'],
    cookTimeRange: [25, 40],
    difficulty: 'Easy',
  },
  {
    name: 'Indomie Jollof',
    aliases: ['jollof indomie', 'indomie bellefull'],
    tribe: 'General Nigerian',
    category: 'one-pot',
    coreIngredients: ['indomie noodles', 'tomatoes', 'pepper', 'onions', 'vegetables', 'eggs'],
    requiredIngredients: ['indomie noodles'],
    pairings: ['fried plantain', 'sausage'],
    cookTimeRange: [10, 20],
    difficulty: 'Easy',
  },
  {
    name: 'Noodles and Egg',
    aliases: ['indomie and egg', 'quick noodles'],
    tribe: 'General Nigerian',
    category: 'one-pot',
    coreIngredients: ['indomie noodles', 'eggs', 'vegetables', 'onions'],
    requiredIngredients: ['indomie noodles', 'eggs'],
    pairings: [],
    cookTimeRange: [10, 15],
    difficulty: 'Easy',
  },
]

/**
 * Flat set of all canonical dish names + aliases, lowercased, for fast
 * validation of AI outputs.
 */
export const VALID_DISH_NAMES: Set<string> = new Set(
  NIGERIAN_DISHES.flatMap((d) => [d.name.toLowerCase(), ...d.aliases.map((a) => a.toLowerCase())])
)

/**
 * Given user ingredients, return dishes ranked by how many core ingredients
 * match. This is used both for prompt-building (tell the AI which dishes
 * are plausible) and for post-validation (cross-check AI output).
 */
export function matchDishes(userIngredients: string[]): NigerianDish[] {
  const lower = userIngredients.map((i) => i.toLowerCase())

  const has = (ingredient: string) =>
    lower.some((ui) => ui.includes(ingredient.toLowerCase()) || ingredient.toLowerCase().includes(ui))

  const scored = NIGERIAN_DISHES
    // Hard gate: every required ingredient must be present. No rice, no Jollof
    // Rice — matching tomatoes and onions is not enough to suggest a rice dish.
    .filter((dish) => dish.requiredIngredients.every(has))
    .map((dish) => {
      // Ranking still uses the full coreIngredients set.
      const hits = dish.coreIngredients.filter(has)
      return { dish, score: hits.length / dish.coreIngredients.length }
    })

  return scored
    .filter((s) => s.score > 0)
    .sort((a, b) => b.score - a.score)
    .map((s) => s.dish)
}

/**
 * Checks whether a dish name from AI output is a known Nigerian dish.
 * Exact-set matching only, plus two narrow normalisations. There is
 * deliberately no substring fallback: it would let invented fusions
 * ("Egusi Yam Porridge", "Jollof Pasta Fusion") through on the strength
 * of one recognised word.
 */
export function isKnownDish(name: string): boolean {
  const normalised = name
    .toLowerCase()
    .replace(/\s*\(.*\)/, '')
    .replace(/nigerian\s+/i, '')
    .trim()

  if (VALID_DISH_NAMES.has(normalised)) return true

  // Try without trailing qualifiers like "with Ayamase", "with Egg Sauce"
  const withoutWith = normalised.replace(/\s+with\s+.*$/, '').trim()
  if (VALID_DISH_NAMES.has(withoutWith)) return true

  // Try without leading protein qualifier: "Catfish Pepper Soup" -> "pepper soup"
  const LEADING_QUALIFIERS = new Set([
    'goat', 'meat', 'goat meat', 'catfish', 'chicken', 'assorted', 'beef',
    'fish', 'turkey', 'snail', 'ponmo', 'cow leg', 'point and kill',
    'seafood', 'fried', 'boiled', 'peppered', 'spicy', 'smoked',
  ])

  const words = normalised.split(/\s+/)
  for (let i = 1; i < words.length; i++) {
    const prefix = words.slice(0, i).join(' ')
    if (!LEADING_QUALIFIERS.has(prefix)) continue
    const tail = words.slice(i).join(' ')
    if (VALID_DISH_NAMES.has(tail)) return true
  }

  return false
}
