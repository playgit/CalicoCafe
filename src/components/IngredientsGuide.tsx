import React from 'react';
import { X, Book } from 'lucide-react';
import { INGREDIENTS, INGREDIENT_CATEGORIES } from '../data/recipes';

interface IngredientsGuideProps {
  onClose: () => void;
}

export default function IngredientsGuide({ onClose }: IngredientsGuideProps) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl max-w-4xl w-full h-[80vh] relative overflow-hidden flex flex-col">
        {/* Header */}
        <div className="p-4 border-b flex items-center justify-between bg-orange-50">
          <div className="flex items-center gap-2">
            <Book className="w-6 h-6 text-orange-600" />
            <h2 className="text-xl font-bold">Ingredients Guide</h2>
          </div>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 transition"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          <div className="grid gap-8">
            {INGREDIENT_CATEGORIES.map((category) => (
              <div key={category.id}>
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-2xl">{category.icon}</span>
                  <h3 className="text-lg font-semibold">{category.name}</h3>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                  {INGREDIENTS.filter(ing => ing.category === category.id).map((ingredient) => (
                    <div
                      key={ingredient.id}
                      className={`${ingredient.color} p-3 rounded-lg shadow flex items-center justify-center`}
                    >
                      <span>{ingredient.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t bg-gray-50">
          <p className="text-sm text-gray-600 text-center">
            Click outside or press the X to close and resume the game
          </p>
        </div>
      </div>
    </div>
  );
}