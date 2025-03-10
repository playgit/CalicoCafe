import { Recipe, Ingredient } from '../types/game';

export const INGREDIENT_CATEGORIES = [
  { id: 'basics', name: 'Basics', icon: '🍚' },
  { id: 'proteins', name: 'Proteins', icon: '🍗' },
  { id: 'vegetables', name: 'Vegetables', icon: '🥬' },
  { id: 'toppings', name: 'Toppings', icon: '🌿' },
  { id: 'sweets', name: 'Sweets', icon: '🍯' },
  { id: 'boba', name: 'Boba', icon: '🧋' },
  { id: 'vip', name: 'Special', icon: '👑' }
];

export const INGREDIENTS: Ingredient[] = [
  // Basics
  { id: 'rice', name: 'Rice', color: 'bg-white border border-gray-200', category: 'basics' },
  { id: 'noodles', name: 'Noodles', color: 'bg-yellow-100', category: 'basics' },
  { id: 'mochi-flour', name: 'Mochi Flour', color: 'bg-gray-200', category: 'basics' },
  { id: 'tea', name: 'Black Tea', color: 'bg-amber-900', category: 'basics' },
  { id: 'dough', name: 'Dumpling Dough', color: 'bg-yellow-50', category: 'basics' },
  { id: 'tempura-batter', name: 'Tempura Batter', color: 'bg-yellow-100', category: 'basics' },
  { id: 'quinoa', name: 'Quinoa', color: 'bg-yellow-50', category: 'basics' },
  { id: 'brown-rice', name: 'Brown Rice', color: 'bg-amber-100', category: 'basics' },
  
  // Proteins
  { id: 'fish', name: 'Fish', color: 'bg-blue-200', category: 'proteins' },
  { id: 'chicken', name: 'Chicken', color: 'bg-orange-200', category: 'proteins' },
  { id: 'shrimp', name: 'Shrimp', color: 'bg-pink-200', category: 'proteins' },
  { id: 'tofu', name: 'Tofu', color: 'bg-gray-100', category: 'proteins' },
  { id: 'egg', name: 'Egg', color: 'bg-yellow-200', category: 'proteins' },
  { id: 'pork', name: 'Ground Pork', color: 'bg-red-200', category: 'proteins' },
  { id: 'crab', name: 'Crab Meat', color: 'bg-orange-100', category: 'proteins' },
  { id: 'beef', name: 'Premium Beef', color: 'bg-red-300', category: 'proteins' },
  { id: 'duck', name: 'Roasted Duck', color: 'bg-orange-300', category: 'proteins' },
  { id: 'lamb', name: 'Lamb', color: 'bg-red-400', category: 'proteins' },
  
  // Vegetables
  { id: 'vegetables', name: 'Vegetables', color: 'bg-green-300', category: 'vegetables' },
  { id: 'mushroom', name: 'Mushroom', color: 'bg-stone-200', category: 'vegetables' },
  { id: 'nori', name: 'Nori', color: 'bg-green-800', category: 'vegetables' },
  { id: 'cabbage', name: 'Cabbage', color: 'bg-green-200', category: 'vegetables' },
  { id: 'chives', name: 'Chives', color: 'bg-green-400', category: 'vegetables' },
  { id: 'bamboo', name: 'Bamboo Shoots', color: 'bg-yellow-100', category: 'vegetables' },
  { id: 'kale', name: 'Kale', color: 'bg-green-600', category: 'vegetables' },
  { id: 'spinach', name: 'Spinach', color: 'bg-green-500', category: 'vegetables' },
  { id: 'avocado', name: 'Avocado', color: 'bg-green-300', category: 'vegetables' },
  { id: 'sweet-potato', name: 'Sweet Potato', color: 'bg-orange-400', category: 'vegetables' },
  { id: 'carrot', name: 'Carrot', color: 'bg-orange-500', category: 'vegetables' },
  { id: 'broccoli', name: 'Broccoli', color: 'bg-green-400', category: 'vegetables' },
  
  // Toppings
  { id: 'sauce', name: 'Sauce', color: 'bg-red-400', category: 'toppings' },
  { id: 'bonito', name: 'Bonito Flakes', color: 'bg-orange-300', category: 'toppings' },
  { id: 'cheese', name: 'Cheese', color: 'bg-yellow-300', category: 'toppings' },
  { id: 'miso', name: 'Miso', color: 'bg-amber-600', category: 'toppings' },
  { id: 'matcha', name: 'Matcha', color: 'bg-green-500', category: 'toppings' },
  { id: 'sesame', name: 'Sesame Seeds', color: 'bg-stone-200', category: 'toppings' },
  { id: 'mint', name: 'Fresh Mint', color: 'bg-emerald-400', category: 'toppings' },
  { id: 'ginger', name: 'Pickled Ginger', color: 'bg-pink-300', category: 'toppings' },
  { id: 'nutritional-yeast', name: 'Nutritional Yeast', color: 'bg-yellow-200', category: 'toppings' },
  { id: 'tahini', name: 'Tahini', color: 'bg-amber-100', category: 'toppings' },
  { id: 'hot-sauce', name: 'Hot Sauce', color: 'bg-red-500', category: 'toppings' },
  
  // Sweets
  { id: 'red-bean', name: 'Red Bean', color: 'bg-red-700', category: 'sweets' },
  { id: 'cream', name: 'Cream', color: 'bg-cream-50 border border-gray-200', category: 'sweets' },
  { id: 'fruit', name: 'Fresh Fruit', color: 'bg-rose-300', category: 'sweets' },
  { id: 'lychee', name: 'Lychee', color: 'bg-pink-50', category: 'sweets' },
  { id: 'coconut', name: 'Coconut', color: 'bg-gray-50', category: 'sweets' },
  { id: 'honey', name: 'Honey', color: 'bg-amber-300', category: 'sweets' },
  { id: 'brown-sugar', name: 'Brown Sugar', color: 'bg-amber-700', category: 'sweets' },
  { id: 'maple-syrup', name: 'Maple Syrup', color: 'bg-amber-500', category: 'sweets' },
  { id: 'agave', name: 'Agave Nectar', color: 'bg-amber-200', category: 'sweets' },

  // Boba Ingredients
  { id: 'green-tea', name: 'Green Tea', color: 'bg-green-700', category: 'boba' },
  { id: 'oolong-tea', name: 'Oolong Tea', color: 'bg-amber-800', category: 'boba' },
  { id: 'taro', name: 'Taro', color: 'bg-purple-400', category: 'boba' },
  { id: 'grass-jelly', name: 'Grass Jelly', color: 'bg-stone-900 text-white', category: 'boba' },
  { id: 'almond', name: 'Almond', color: 'bg-amber-50', category: 'boba' },
  { id: 'pudding', name: 'Egg Pudding', color: 'bg-yellow-400', category: 'boba' },
  { id: 'coffee-jelly', name: 'Coffee Jelly', color: 'bg-brown-900 text-white', category: 'boba' },
  { id: 'popping-boba', name: 'Popping Boba', color: 'bg-pink-400', category: 'boba' },
  { id: 'crystal-boba', name: 'Crystal Boba', color: 'bg-blue-200', category: 'boba' },
  { id: 'tapioca', name: 'Tapioca Pearls', color: 'bg-stone-800 text-white', category: 'boba' },
  { id: 'oat-milk', name: 'Oat Milk', color: 'bg-cream-50', category: 'boba' },
  { id: 'soy-milk', name: 'Soy Milk', color: 'bg-yellow-50', category: 'boba' },
  
  // VIP Ingredients
  { id: 'gold-leaf', name: 'Gold Leaf', color: 'bg-yellow-400', category: 'vip' },
  { id: 'truffle', name: 'Black Truffle', color: 'bg-stone-800 text-white', category: 'vip' },
  { id: 'wagyu', name: 'Wagyu Beef', color: 'bg-red-500', category: 'vip' }
];

export const RECIPES: Recipe[] = [
  // Regular Dishes
  {
    id: 'sushi',
    name: 'Classic Sushi Roll',
    ingredients: ['rice', 'fish', 'nori'],
    points: 100,
    timeLimit: 30
  },
  {
    id: 'spicy-roll',
    name: 'Spicy Tuna Roll',
    ingredients: ['rice', 'fish', 'sauce'],
    points: 120,
    timeLimit: 35
  },
  {
    id: 'california',
    name: 'California Roll',
    ingredients: ['rice', 'nori', 'shrimp'],
    points: 110,
    timeLimit: 30
  },
  {
    id: 'veggie-roll',
    name: 'Vegetable Roll',
    ingredients: ['rice', 'nori', 'vegetables'],
    points: 90,
    timeLimit: 25
  },
  {
    id: 'cheese-roll',
    name: 'Cheese Roll',
    ingredients: ['rice', 'nori', 'cheese'],
    points: 100,
    timeLimit: 30
  },
  {
    id: 'ramen',
    name: 'Classic Ramen',
    ingredients: ['noodles', 'egg', 'sauce'],
    points: 150,
    timeLimit: 40
  },
  {
    id: 'miso-ramen',
    name: 'Miso Ramen',
    ingredients: ['noodles', 'miso', 'vegetables'],
    points: 160,
    timeLimit: 45
  },
  {
    id: 'shrimp-ramen',
    name: 'Shrimp Ramen',
    ingredients: ['noodles', 'shrimp', 'sauce'],
    points: 170,
    timeLimit: 45
  },
  {
    id: 'veggie-ramen',
    name: 'Vegetable Ramen',
    ingredients: ['noodles', 'vegetables', 'tofu'],
    points: 140,
    timeLimit: 35
  },

  // Tempura Dishes
  {
    id: 'shrimp-tempura',
    name: 'Shrimp Tempura',
    ingredients: ['tempura-batter', 'shrimp', 'sauce'],
    points: 160,
    timeLimit: 40
  },
  {
    id: 'veggie-tempura',
    name: 'Vegetable Tempura',
    ingredients: ['tempura-batter', 'vegetables', 'sauce'],
    points: 140,
    timeLimit: 35
  },
  {
    id: 'mixed-tempura',
    name: 'Mixed Tempura Platter',
    ingredients: ['tempura-batter', 'shrimp', 'vegetables'],
    points: 180,
    timeLimit: 45
  },
  {
    id: 'mushroom-tempura',
    name: 'Mushroom Tempura',
    ingredients: ['tempura-batter', 'mushroom', 'sauce'],
    points: 150,
    timeLimit: 35
  },

  // Gyoza & Dumplings
  {
    id: 'pork-gyoza',
    name: 'Classic Pork Gyoza',
    ingredients: ['dough', 'pork', 'cabbage'],
    points: 160,
    timeLimit: 45
  },
  {
    id: 'shrimp-gyoza',
    name: 'Shrimp & Chive Gyoza',
    ingredients: ['dough', 'shrimp', 'chives'],
    points: 170,
    timeLimit: 45
  },
  {
    id: 'veggie-gyoza',
    name: 'Vegetable Gyoza',
    ingredients: ['dough', 'vegetables', 'mushroom'],
    points: 150,
    timeLimit: 40
  },
  {
    id: 'crab-dumplings',
    name: 'Crab Dumplings',
    ingredients: ['dough', 'crab', 'chives'],
    points: 180,
    timeLimit: 45
  },

  // Rice Bowls
  {
    id: 'rice-bowl',
    name: 'Classic Rice Bowl',
    ingredients: ['rice', 'egg', 'sauce'],
    points: 80,
    timeLimit: 25
  },
  {
    id: 'chicken-bowl',
    name: 'Chicken Rice Bowl',
    ingredients: ['rice', 'chicken', 'sauce'],
    points: 100,
    timeLimit: 30
  },
  {
    id: 'tofu-bowl',
    name: 'Tofu Rice Bowl',
    ingredients: ['rice', 'tofu', 'vegetables'],
    points: 90,
    timeLimit: 25
  },

  // Noodle Dishes
  {
    id: 'udon',
    name: 'Classic Udon',
    ingredients: ['noodles', 'vegetables', 'tofu'],
    points: 110,
    timeLimit: 35
  },
  {
    id: 'yakisoba',
    name: 'Yakisoba',
    ingredients: ['noodles', 'vegetables', 'chicken'],
    points: 120,
    timeLimit: 40
  },

  // Sweet Dishes
  {
    id: 'matcha-mochi',
    name: 'Matcha Mochi',
    ingredients: ['matcha', 'mochi-flour', 'red-bean'],
    points: 180,
    timeLimit: 50
  },
  {
    id: 'fruit-mochi',
    name: 'Fruit Mochi',
    ingredients: ['mochi-flour', 'cream', 'fruit'],
    points: 160,
    timeLimit: 45
  },
  {
    id: 'sweet-potato-mochi',
    name: 'Sweet Potato Mochi',
    ingredients: ['mochi-flour', 'sweet-potato', 'brown-sugar'],
    points: 170,
    timeLimit: 45
  },
  {
    id: 'coconut-mochi',
    name: 'Coconut Mochi',
    ingredients: ['mochi-flour', 'coconut', 'cream'],
    points: 170,
    timeLimit: 45
  },
  {
    id: 'red-bean-mochi',
    name: 'Red Bean Mochi',
    ingredients: ['mochi-flour', 'red-bean', 'brown-sugar'],
    points: 165,
    timeLimit: 45
  },

  // Boba Tea Recipes
  {
    id: 'classic-milk-tea',
    name: 'Classic Milk Tea',
    ingredients: ['tea', 'tapioca', 'cream'],
    points: 130,
    timeLimit: 35
  },
  {
    id: 'brown-sugar-boba',
    name: 'Brown Sugar Boba',
    ingredients: ['tea', 'tapioca', 'brown-sugar'],
    points: 140,
    timeLimit: 35
  },
  {
    id: 'taro-milk-tea',
    name: 'Taro Milk Tea',
    ingredients: ['taro', 'tapioca', 'cream'],
    points: 150,
    timeLimit: 40
  },
  {
    id: 'matcha-boba',
    name: 'Matcha Boba Tea',
    ingredients: ['matcha', 'tapioca', 'cream'],
    points: 145,
    timeLimit: 35
  },
  {
    id: 'grass-jelly-tea',
    name: 'Grass Jelly Milk Tea',
    ingredients: ['tea', 'grass-jelly', 'cream'],
    points: 160,
    timeLimit: 40
  },
  {
    id: 'pudding-milk-tea',
    name: 'Pudding Milk Tea',
    ingredients: ['tea', 'pudding', 'cream'],
    points: 155,
    timeLimit: 40
  },
  {
    id: 'almond-boba',
    name: 'Almond Milk Tea',
    ingredients: ['tea', 'almond', 'tapioca'],
    points: 145,
    timeLimit: 35
  },
  {
    id: 'fruit-pop-tea',
    name: 'Fruit Popping Boba Tea',
    ingredients: ['green-tea', 'popping-boba', 'fruit'],
    points: 170,
    timeLimit: 45
  },
  {
    id: 'lychee-crystal',
    name: 'Lychee Crystal Boba',
    ingredients: ['green-tea', 'crystal-boba', 'lychee'],
    points: 165,
    timeLimit: 40
  },

  // VIP Recipes
  {
    id: 'truffle-sushi',
    name: 'Truffle Sushi Deluxe',
    ingredients: ['rice', 'fish', 'truffle'],
    points: 250,
    timeLimit: 45,
    vipOnly: true
  },
  {
    id: 'wagyu-gyoza',
    name: 'Wagyu Beef Gyoza',
    ingredients: ['dough', 'wagyu', 'truffle'],
    points: 300,
    timeLimit: 50,
    vipOnly: true
  },
  {
    id: 'golden-tempura',
    name: 'Golden Leaf Tempura',
    ingredients: ['tempura-batter', 'shrimp', 'gold-leaf'],
    points: 280,
    timeLimit: 45,
    vipOnly: true
  },
  {
    id: 'golden-boba',
    name: '👑 Golden Boba Supreme',
    ingredients: ['tea', 'tapioca', 'gold-leaf', 'honey'],
    points: 300,
    timeLimit: 45,
    vipOnly: true
  },
  {
    id: 'royal-crystal',
    name: '👑 Royal Crystal Dream',
    ingredients: ['green-tea', 'crystal-boba', 'gold-leaf', 'cream'],
    points: 320,
    timeLimit: 50,
    vipOnly: true
  },

  // New Vegan Recipes
  {
    id: 'garden-bowl',
    name: '🌱 Garden Power Bowl',
    ingredients: ['quinoa', 'kale', 'avocado', 'nutritional-yeast'],
    points: 200,
    timeLimit: 40
  },
  {
    id: 'rainbow-roll',
    name: '🌱 Rainbow Veggie Roll',
    ingredients: ['brown-rice', 'avocado', 'vegetables', 'nori'],
    points: 180,
    timeLimit: 35
  },
  {
    id: 'buddha-bowl',
    name: '🌱 Buddha Bowl',
    ingredients: ['brown-rice', 'tofu', 'vegetables', 'tahini'],
    points: 190,
    timeLimit: 40
  },
  {
    id: 'vegan-ramen',
    name: '🌱 Zen Ramen',
    ingredients: ['noodles', 'mushroom', 'vegetables', 'miso'],
    points: 185,
    timeLimit: 45
  },
  {
    id: 'plant-milk-tea',
    name: '🌱 Plant-Based Milk Tea',
    ingredients: ['tea', 'oat-milk', 'tapioca', 'agave'],
    points: 160,
    timeLimit: 35
  },

  // New Carnivore Recipes
  {
    id: 'meat-feast',
    name: '🦖 Prehistoric Feast',
    ingredients: ['rice', 'beef', 'chicken', 'hot-sauce'],
    points: 250,
    timeLimit: 45
  },
  {
    id: 'triple-meat-bowl',
    name: '🦖 Triple Meat Bowl',
    ingredients: ['rice', 'pork', 'chicken', 'beef'],
    points: 280,
    timeLimit: 50
  },
  {
    id: 'carnivore-ramen',
    name: '🦖 Carnivore\'s Ramen',
    ingredients: ['noodles', 'pork', 'egg', 'duck'],
    points: 260,
    timeLimit: 45
  },
  {
    id: 'meat-lovers-gyoza',
    name: '🦖 Meat Lover\'s Gyoza',
    ingredients: ['dough', 'beef', 'pork', 'lamb'],
    points: 270,
    timeLimit: 50
  }
];