import React, { useState } from 'react';
import { Book, X, Search, Coffee, Utensils, Crown } from 'lucide-react';
import { RECIPES, INGREDIENTS } from '../data/recipes';
import { Recipe } from '../types/game';

interface CookbookProps {
  onClose: () => void;
}

export default function Cookbook({ onClose }: CookbookProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState<'all' | 'regular' | 'vip' | 'drinks' | 'desserts'>('all');

  const filteredRecipes = RECIPES.filter(recipe => {
    const matchesSearch = recipe.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filter === 'all' ||
      (filter === 'vip' && recipe.vipOnly) ||
      (filter === 'regular' && !recipe.vipOnly) ||
      (filter === 'drinks' && (
        recipe.name.toLowerCase().includes('tea') ||
        recipe.name.toLowerCase().includes('latte')
      )) ||
      (filter === 'desserts' && (
        recipe.name.toLowerCase().includes('mochi') ||
        recipe.name.toLowerCase().includes('parfait')
      ));
    return matchesSearch && matchesFilter;
  });

  const categories = [
    { id: 'all', name: 'All Recipes', icon: <Utensils className="w-4 h-4" /> },
    { id: 'regular', name: 'Regular', icon: <Coffee className="w-4 h-4" /> },
    { id: 'vip', name: 'VIP Only', icon: <Crown className="w-4 h-4" /> },
    { id: 'drinks', name: 'Drinks', icon: <Coffee className="w-4 h-4" /> },
    { id: 'desserts', name: 'Desserts', icon: <Coffee className="w-4 h-4" /> }
  ];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl max-w-4xl w-full h-[80vh] relative overflow-hidden flex flex-col">
        {/* Header */}
        <div className="p-4 border-b flex items-center justify-between bg-orange-50">
          <div className="flex items-center gap-2">
            <Book className="w-6 h-6 text-orange-600" />
            <h2 className="text-xl font-bold">Calico Café Cookbook</h2>
          </div>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 transition"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Search and Filters */}
        <div className="p-4 border-b bg-white">
          <div className="flex gap-4 flex-col sm:flex-row">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search recipes..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
            </div>
            <div className="flex gap-2 overflow-x-auto pb-2 sm:pb-0">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setFilter(category.id as any)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg whitespace-nowrap transition ${
                    filter === category.id
                      ? 'bg-orange-500 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {category.icon}
                  {category.name}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Recipe Grid */}
        <div className="flex-1 overflow-y-auto p-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredRecipes.map((recipe) => (
              <RecipeCard key={recipe.id} recipe={recipe} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function RecipeCard({ recipe }: { recipe: Recipe }) {
  return (
    <div className={`border rounded-lg p-4 ${
      recipe.vipOnly ? 'bg-gradient-to-r from-yellow-50 to-amber-50 border-yellow-200' : 'bg-white'
    }`}>
      <div className="flex items-start justify-between mb-2">
        <h3 className="font-semibold">{recipe.name}</h3>
        {recipe.vipOnly && <Crown className="w-5 h-5 text-yellow-500" />}
      </div>
      
      <div className="space-y-2">
        <div className="text-sm text-gray-600">
          <span className="font-medium">Points:</span> {recipe.points}
          {recipe.vipOnly && ' (x2 for VIP customers)'}
        </div>
        <div className="text-sm text-gray-600">
          <span className="font-medium">Time Limit:</span> {recipe.timeLimit}s
        </div>
        
        <div className="mt-3">
          <p className="text-sm font-medium mb-2">Ingredients:</p>
          <div className="flex flex-wrap gap-2">
            {recipe.ingredients.map((ingredientId, index) => {
              const ingredient = INGREDIENTS.find(i => i.id === ingredientId);
              return (
                <div
                  key={index}
                  className={`${ingredient?.color} px-2 py-1 rounded text-sm flex items-center gap-1`}
                >
                  <span>{ingredient?.name}</span>
                  <span className="text-gray-500 text-xs">#{index + 1}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}