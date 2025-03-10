import React, { useState } from 'react';
import { X, Leaf, Beef, Timer, Info, Star } from 'lucide-react';
import { INGREDIENTS } from '../data/recipes';

interface SpecialTutorialProps {
  onComplete: () => void;
}

export default function SpecialTutorial({ onComplete }: SpecialTutorialProps) {
  const [currentCharacter, setCurrentCharacter] = useState<'sprout' | 'rex' | null>(null);
  const [selectedIngredients, setSelectedIngredients] = useState<string[]>([]);
  const [feedback, setFeedback] = useState<{ message: string; success: boolean } | null>(null);
  const [successCount, setSuccessCount] = useState({ sprout: 0, rex: 0 });

  const characters = {
    sprout: {
      name: 'Sprout',
      icon: <Leaf className="w-12 h-12 text-green-500" />,
      description: "🌱 Only accepts vegan dishes! No animal products allowed!",
      color: "bg-green-50",
      allowedIngredients: ['quinoa', 'brown-rice', 'vegetables', 'tofu', 'kale', 'avocado', 'mushroom', 'broccoli', 'carrot'],
      forbiddenIngredients: ['chicken', 'fish', 'egg', 'cream', 'cheese']
    },
    rex: {
      name: 'Rex the Catosaurus',
      icon: <Beef className="w-12 h-12 text-red-500" />,
      description: "🦖 RAWR! Only accepts meat dishes! The more protein, the better!",
      color: "bg-red-50",
      allowedIngredients: ['beef', 'chicken', 'pork', 'duck', 'lamb', 'rice', 'noodles'],
      forbiddenIngredients: ['vegetables', 'tofu', 'mushroom']
    }
  };

  const handleIngredientClick = (ingredient: string) => {
    if (selectedIngredients.length < 4) {
      setSelectedIngredients([...selectedIngredients, ingredient]);
    }
  };

  const clearIngredients = () => {
    setSelectedIngredients([]);
    setFeedback(null);
  };

  const checkDish = () => {
    if (!currentCharacter) return;

    const char = characters[currentCharacter];
    const hasAllowedIngredient = selectedIngredients.some(ing => 
      char.allowedIngredients.includes(ing)
    );
    const hasForbiddenIngredient = selectedIngredients.some(ing => 
      char.forbiddenIngredients.includes(ing)
    );

    if (hasAllowedIngredient && !hasForbiddenIngredient) {
      setFeedback({
        message: currentCharacter === 'sprout' 
          ? "Perfect! A delicious vegan dish that Sprout will love! 🌱"
          : "RAWR! Rex loves this meaty feast! 🦖",
        success: true
      });
      setSuccessCount(prev => ({
        ...prev,
        [currentCharacter]: prev[currentCharacter] + 1
      }));
    } else {
      setFeedback({
        message: currentCharacter === 'sprout'
          ? "Oops! Sprout only eats plant-based ingredients! 🥬"
          : "Not enough meat! Rex needs protein! 🍖",
        success: false
      });
    }

    setTimeout(() => {
      setSelectedIngredients([]);
      setFeedback(null);
    }, 2000);
  };

  const renderCharacterSelection = () => (
    <div className="grid grid-cols-2 gap-4">
      <button
        onClick={() => setCurrentCharacter('sprout')}
        className="p-6 rounded-xl bg-green-50 hover:bg-green-100 transition text-center"
      >
        <Leaf className="w-16 h-16 text-green-500 mx-auto mb-4" />
        <h3 className="text-xl font-bold mb-2">Practice with Sprout</h3>
        <p className="text-sm text-gray-600">Learn to make vegan dishes!</p>
      </button>
      <button
        onClick={() => setCurrentCharacter('rex')}
        className="p-6 rounded-xl bg-red-50 hover:bg-red-100 transition text-center"
      >
        <Beef className="w-16 h-16 text-red-500 mx-auto mb-4" />
        <h3 className="text-xl font-bold mb-2">Practice with Rex</h3>
        <p className="text-sm text-gray-600">Master meaty recipes!</p>
      </button>
    </div>
  );

  const renderPracticeArea = () => {
    if (!currentCharacter) return null;
    const char = characters[currentCharacter];

    return (
      <div className="space-y-6">
        <button
          onClick={() => setCurrentCharacter(null)}
          className="text-gray-600 hover:text-gray-800 transition flex items-center gap-2"
        >
          ← Back to character selection
        </button>

        <div className={`${char.color} rounded-xl p-6`}>
          <div className="flex items-center gap-4 mb-4">
            {char.icon}
            <div>
              <h3 className="text-xl font-bold">{char.name}</h3>
              <p className="text-gray-600">{char.description}</p>
            </div>
          </div>

          <div className="bg-white bg-opacity-50 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-2">
              <Star className="w-5 h-5 text-yellow-500" />
              <span className="font-medium">Progress: {successCount[currentCharacter]}/3 successful dishes</span>
            </div>
            <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
              <div 
                className="h-full bg-yellow-500 transition-all duration-300"
                style={{ width: `${(successCount[currentCharacter] / 3) * 100}%` }}
              />
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <h4 className="font-medium mb-2">Selected Ingredients:</h4>
            <div className="min-h-[60px] border-2 border-dashed border-gray-200 rounded-lg p-2 flex flex-wrap gap-2">
              {selectedIngredients.map((ing, index) => {
                const ingredient = INGREDIENTS.find(i => i.id === ing);
                return (
                  <div
                    key={index}
                    className={`${ingredient?.color} px-2 py-1 rounded text-sm`}
                  >
                    {ingredient?.name}
                  </div>
                );
              })}
            </div>
          </div>

          <div>
            <h4 className="font-medium mb-2">Available Ingredients:</h4>
            <div className="grid grid-cols-3 gap-2">
              {[...char.allowedIngredients, ...char.forbiddenIngredients]
                .map(ing => INGREDIENTS.find(i => i.id === ing))
                .filter(Boolean)
                .map(ingredient => (
                  <button
                    key={ingredient!.id}
                    onClick={() => handleIngredientClick(ingredient!.id)}
                    disabled={selectedIngredients.length >= 4}
                    className={`${ingredient!.color} px-2 py-1 rounded text-sm hover:opacity-80 transition disabled:opacity-50`}
                  >
                    {ingredient!.name}
                  </button>
                ))}
            </div>
          </div>

          <div className="flex gap-2">
            <button
              onClick={clearIngredients}
              className="flex-1 bg-gray-200 text-gray-700 py-2 rounded hover:bg-gray-300 transition"
            >
              Clear
            </button>
            <button
              onClick={checkDish}
              disabled={selectedIngredients.length === 0}
              className="flex-1 bg-orange-500 text-white py-2 rounded hover:bg-orange-600 transition disabled:opacity-50"
            >
              Cook!
            </button>
          </div>

          {feedback && (
            <div className={`text-center p-3 rounded-lg ${
              feedback.success ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
            }`}>
              {feedback.message}
            </div>
          )}
        </div>

        {successCount[currentCharacter] >= 3 && (
          <div className="text-center">
            <p className="text-green-600 font-medium mb-4">
              Great job! You've mastered cooking for {char.name}!
            </p>
            <button
              onClick={() => setCurrentCharacter(null)}
              className="bg-green-500 text-white px-6 py-2 rounded-lg hover:bg-green-600 transition"
            >
              Try Another Character
            </button>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl max-w-2xl w-full relative overflow-hidden">
        <div className="absolute top-4 right-4">
          <button
            onClick={onComplete}
            className="text-gray-500 hover:text-gray-700 transition"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="p-8">
          <h2 className="text-3xl font-bold text-center mb-2">Special Character Practice</h2>
          <p className="text-gray-600 text-center mb-8">
            Learn how to cook for our unique customers with special dietary preferences!
          </p>

          {currentCharacter ? renderPracticeArea() : renderCharacterSelection()}

          {successCount.sprout >= 3 && successCount.rex >= 3 && (
            <div className="mt-8 text-center">
              <p className="text-green-600 font-medium mb-4">
                Congratulations! You've mastered cooking for both special characters!
              </p>
              <button
                onClick={onComplete}
                className="bg-orange-500 text-white px-8 py-3 rounded-lg hover:bg-orange-600 transition"
              >
                Start Playing!
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}