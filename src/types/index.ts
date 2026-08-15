export interface Recipe {
  name: string;
  tribe: string;
  cookTime: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  availableIngredients: string[];
  missingIngredients: MissingIngredient[];
  whyCook: string;
  steps: string[];
  tips: string;
  servings: string;
  imageUrl?: string;
}

export interface MissingIngredient {
  local: string;
  common: string;
  estimatedCost: string;
  quantity: string;
}

export interface MealHistory {
  name: string;
  date: string;
}

export interface PriceEntry {
  id: number;
  item: string;
  price: string;
  quantity: string;
  market: string;
  date: string;
}
