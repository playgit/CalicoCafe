import React, { useState } from 'react';
import { Utensils, Trash2 } from 'lucide-react';
import { INGREDIENTS } from '../data/recipes';
import { Order } from '../types/game';
import { getFeedback } from '../utils/feedback';

interface KitchenProps {
  currentOrders: Order[];
  onOrderComplete: (orderId: string, points: number) => void;
  onWrongOrder: (penalty: number) => void;
}

export default function Kitchen({ currentOrders, onOrderComplete, onWrongOrder }: KitchenProps) {
  const [selectedIngredients, setSelectedIngredients] = useState<string[]>([]);
  const [feedback, setFeedback] = useState<{ message: string; isSuccess: boolean } | null>(null);

  const handleIngredientClick = (ingredientId: string) => {
    setSelectedIngredients(prev => [...prev, ingredientId]);
  };

  const handleCook = () => {
    // Check if current ingredients match any active order
    const matchedOrder = currentOrders.find(order => 
      order.recipe.ingredients.length === selectedIngredients.length &&
      order.recipe.ingredients.every(ing => selectedIngredients.includes(ing))
    );

    if (matchedOrder) {
      const { message } = getFeedback(matchedOrder.recipe.name, true);
      setFeedback({ message, isSuccess: true });
      onOrderComplete(matchedOrder.id, matchedOrder.recipe.points);
    } else {
      // Wrong order penalty
      const penalty = Math.min(50, selectedIngredients.length * 10);
      const { message } = getFeedback(selectedIngredients, false);
      setFeedback({ message, isSuccess: false });
      onWrongOrder(penalty);
    }

    // Clear feedback after 3 seconds
    setTimeout(() => setFeedback(null), 3000);
    setSelectedIngredients([]);
  };

  const clearIngredients = () => {
    setSelectedIngredients([]);
  };

  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <Utensils className="text-orange-600" />
          <h2 className="text-xl font-semibold">Kitchen</h2>
        </div>
        {selectedIngredients.length > 0 && (
          <button
            onClick={clearIngredients}
            className="text-gray-500 hover:text-red-500 transition"
            title="Clear ingredients"
          >
            <Trash2 className="w-5 h-5" />
          </button>
        )}
      </div>

      {/* Feedback Message */}
      {feedback && (
        <div className={`mb-4 p-3 rounded-lg text-center transition-all ${
          feedback.isSuccess ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
        }`}>
          {feedback.message}
        </div>
      )}

      {/* Cooking Area */}
      <div className="grid grid-cols-2 gap-6">
        {/* Ingredients */}
        <div className="space-y-4">
          <h3 className="font-medium">Ingredients</h3>
          <div className="grid grid-cols-2 gap-3">
            {INGREDIENTS.map((ingredient) => (
              <button
                key={ingredient.id}
                onClick={() => handleIngredientClick(ingredient.id)}
                className={`${ingredient.color} p-3 rounded-lg shadow hover:shadow-md transition flex items-center justify-center`}
              >
                {ingredient.name}
              </button>
            ))}
          </div>
        </div>

        {/* Cooking Station */}
        <div className="border-2 border-dashed border-gray-300 rounded-xl p-4">
          <h3 className="font-medium mb-4">Cooking Station</h3>
          <div className="min-h-[200px] flex flex-wrap gap-2 mb-4">
            {selectedIngredients.map((ingredientId, index) => {
              const ingredient = INGREDIENTS.find(i => i.id === ingredientId);
              return (
                <div
                  key={index}
                  className={`${ingredient?.color} p-2 rounded`}
                >
                  {ingredient?.name}
                </div>
              );
            })}
          </div>
          <button
            onClick={handleCook}
            disabled={selectedIngredients.length === 0}
            className="w-full bg-orange-600 text-white py-2 rounded-lg hover:bg-orange-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Cook!
          </button>
        </div>
      </div>

      {/* Cat Characters */}
      <div className="mt-8 flex justify-center gap-4">
        <div className="relative w-20 h-20">
          <img
            src="https://images.unsplash.com/photo-1533738363-b7f9aef128ce?auto=format&fit=crop&w=100&h=100"
            alt="Calico Cat Chef"
            className="rounded-full object-cover"
          />
          <div className="absolute -top-2 -right-2 bg-green-500 text-white text-xs px-2 py-1 rounded-full">
            Get Cooking!
          </div>
        </div>
      </div>
    </div>
  );
}