import { Recipe, Ingredient } from '../types/game';

export const INGREDIENTS: Ingredient[] = [
  { id: 'fish', name: 'Fish', color: 'bg-blue-200' },
  { id: 'rice', name: 'Rice', color: 'bg-white border border-gray-200' },
  { id: 'nori', name: 'Nori', color: 'bg-green-800' },
  { id: 'egg', name: 'Egg', color: 'bg-yellow-200' },
  { id: 'sauce', name: 'Sauce', color: 'bg-red-400' },
  { id: 'noodles', name: 'Noodles', color: 'bg-yellow-100' },
  { id: 'tofu', name: 'Tofu', color: 'bg-gray-100' },
  { id: 'chicken', name: 'Chicken', color: 'bg-orange-200' },
  { id: 'vegetables', name: 'Vegetables', color: 'bg-green-300' },
  { id: 'cheese', name: 'Cheese', color: 'bg-yellow-300' },
  { id: 'shrimp', name: 'Shrimp', color: 'bg-pink-200' },
  { id: 'miso', name: 'Miso', color: 'bg-amber-600' },
  { id: 'matcha', name: 'Matcha', color: 'bg-green-500' },
  { id: 'mochi-flour', name: 'Mochi Flour', color: 'bg-gray-200' },
  { id: 'red-bean', name: 'Red Bean', color: 'bg-red-700' },
  { id: 'cream', name: 'Cream', color: 'bg-cream-50 border border-gray-200' },
  { id: 'fruit', name: 'Fresh Fruit', color: 'bg-rose-300' },
  { id: 'gold-leaf', name: 'Gold Leaf', color: 'bg-yellow-400' },
  { id: 'truffle', name: 'Black Truffle', color: 'bg-stone-800' },
  { id: 'tapioca', name: 'Tapioca Pearls', color: 'bg-stone-900' },
  { id: 'tea', name: 'Black Tea', color: 'bg-amber-900' },
  { id: 'brown-sugar', name: 'Brown Sugar', color: 'bg-amber-700' }
];

export const RECIPES: Recipe[] = [
  {
    id: 'sushi',
    name: 'Sushi Roll',
    ingredients: ['rice', 'fish', 'nori'],
    points: 100,
    timeLimit: 30
  },
  {
    id: 'ramen',
    name: 'Ramen Bowl',
    ingredients: ['noodles', 'egg', 'sauce'],
    points: 150,
    timeLimit: 40
  },
  {
    id: 'rice-bowl',
    name: 'Rice Bowl',
    ingredients: ['rice', 'egg', 'sauce'],
    points: 80,
    timeLimit: 25
  },
  {
    id: 'miso-soup',
    name: 'Miso Soup',
    ingredients: ['miso', 'tofu', 'vegetables'],
    points: 120,
    timeLimit: 35
  },
  {
    id: 'katsu',
    name: 'Chicken Katsu',
    ingredients: ['chicken', 'sauce', 'rice'],
    points: 160,
    timeLimit: 45
  },
  {
    id: 'tempura',
    name: 'Shrimp Tempura',
    ingredients: ['shrimp', 'vegetables', 'sauce'],
    points: 140,
    timeLimit: 40
  },
  {
    id: 'udon',
    name: 'Udon Noodles',
    ingredients: ['noodles', 'vegetables', 'tofu'],
    points: 110,
    timeLimit: 35
  },
  {
    id: 'poke',
    name: 'Poke Bowl',
    ingredients: ['rice', 'fish', 'vegetables'],
    points: 130,
    timeLimit: 30
  },
  {
    id: 'okonomiyaki',
    name: 'Okonomiyaki',
    ingredients: ['egg', 'vegetables', 'sauce'],
    points: 140,
    timeLimit: 45
  },
  {
    id: 'yakisoba',
    name: 'Yakisoba',
    ingredients: ['noodles', 'vegetables', 'chicken'],
    points: 120,
    timeLimit: 40
  },
  // Dessert recipes
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
    id: 'matcha-parfait',
    name: 'Matcha Parfait',
    ingredients: ['matcha', 'cream', 'fruit'],
    points: 170,
    timeLimit: 35
  },
  {
    id: 'red-bean-parfait',
    name: 'Red Bean Parfait',
    ingredients: ['red-bean', 'cream', 'matcha'],
    points: 150,
    timeLimit: 40
  },
  // Drinks
  {
    id: 'boba-tea',
    name: 'Brown Sugar Boba Tea',
    ingredients: ['tapioca', 'tea', 'brown-sugar'],
    points: 140,
    timeLimit: 45
  },
  // VIP-exclusive golden recipes
  {
    id: 'golden-sushi',
    name: '✨ Royal Golden Sushi',
    ingredients: ['fish', 'rice', 'gold-leaf'],
    points: 300,
    timeLimit: 40,
    vipOnly: true
  },
  {
    id: 'truffle-ramen',
    name: '✨ Truffle Ramen Royale',
    ingredients: ['noodles', 'truffle', 'gold-leaf'],
    points: 350,
    timeLimit: 45,
    vipOnly: true
  },
  {
    id: 'golden-parfait',
    name: '✨ Golden Matcha Dream',
    ingredients: ['matcha', 'cream', 'gold-leaf'],
    points: 400,
    timeLimit: 35,
    vipOnly: true
  }
];