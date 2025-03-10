import React, { useState } from 'react';
import { 
  ChevronRight, 
  ChevronLeft, 
  X, 
  Coffee, 
  Utensils, 
  Timer, 
  Crown, 
  Heart, 
  Cat, 
  Star, 
  Clock, 
  Info, 
  Book,
  Trash2,
  Leaf,
  Beef
} from 'lucide-react';
import { INGREDIENTS } from '../data/recipes';

interface TutorialStep {
  title: string;
  content: string;
  image?: string;
  icon?: React.ReactNode;
  tips?: string[];
  controls?: { icon: React.ReactNode; name: string; description: string }[];
  practice?: {
    character: {
      id: string;
      name: string;
      icon: React.ReactNode;
      description: string;
      color: string;
    };
    ingredients: {
      allowed: string[];
      forbidden: string[];
    };
  };
}

interface TutorialProps {
  onComplete: () => void;
}

export default function Tutorial({ onComplete }: TutorialProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedIngredients, setSelectedIngredients] = useState<string[]>([]);
  const [practiceAttempts, setPracticeAttempts] = useState(0);
  const [feedback, setFeedback] = useState<{ message: string; success: boolean } | null>(null);

  const steps: TutorialStep[] = [
    {
      title: "Welcome to Calico Café!",
      content: "Learn how to run your very own cat café! Follow this quick tutorial to master the basics of serving our adorable cat customers.",
      icon: <Cat className="w-12 h-12 text-orange-500" />,
      image: "https://images.unsplash.com/photo-1495360010541-f48722b34f7d?auto=format&fit=crop&w=800",
      tips: [
        "Each game lasts 3 minutes",
        "Complete orders to earn points",
        "Watch the time limits carefully!"
      ],
      controls: [
        {
          icon: <Book className="w-5 h-5" />,
          name: "Ingredients Guide",
          description: "View all available ingredients sorted by category"
        },
        {
          icon: <Book className="w-5 h-5" />,
          name: "Cookbook",
          description: "Browse all recipes and their requirements"
        }
      ]
    },
    {
      title: "Game Controls",
      content: "Learn about the essential buttons and controls that will help you manage your café efficiently.",
      icon: <Utensils className="w-12 h-12 text-orange-500" />,
      tips: [
        "Use the Ingredients guide to learn about ingredient categories",
        "Check the Cookbook for recipe details",
        "The timer pauses when viewing guides"
      ],
      controls: [
        {
          icon: <Timer className="w-5 h-5" />,
          name: "Timer",
          description: "Shows remaining game time (pauses during guides)"
        },
        {
          icon: <Crown className="w-5 h-5" />,
          name: "Score",
          description: "Displays current score and high score"
        },
        {
          icon: <Trash2 className="w-5 h-5" />,
          name: "Clear",
          description: "Clear all selected ingredients"
        }
      ]
    },
    {
      title: "Taking Orders",
      content: "Watch the orders panel on the left. Each cat customer has unique preferences and time limits. Pay attention to special customers!",
      icon: <Coffee className="w-12 h-12 text-orange-500" />,
      image: "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&w=800",
      tips: [
        "VIP customers (👑) give double points",
        "Inspector Pawsworth only accepts drinks and desserts",
        "Neko loves pink and red ingredients"
      ],
      controls: [
        {
          icon: <Clock className="w-5 h-5" />,
          name: "Order Timer",
          description: "Each order has its own time limit"
        },
        {
          icon: <Crown className="w-5 h-5" />,
          name: "VIP Badge",
          description: "Indicates VIP customers (double points)"
        }
      ]
    },
    {
      title: "Using the Kitchen",
      content: "Select ingredients in the correct order to create dishes. Use the category tabs to find ingredients quickly!",
      icon: <Utensils className="w-12 h-12 text-orange-500" />,
      image: "https://images.unsplash.com/photo-1495360010541-f48722b34f7d?auto=format&fit=crop&w=800",
      tips: [
        "Regular orders use up to 3 ingredients",
        "VIP orders can use up to 4 ingredients",
        "Wrong combinations cost points and time!"
      ],
      controls: [
        {
          icon: <Coffee className="w-5 h-5" />,
          name: "Category Tabs",
          description: "Switch between ingredient categories"
        },
        {
          icon: <Utensils className="w-5 h-5" />,
          name: "Cook Button",
          description: "Create dish with selected ingredients"
        }
      ]
    },
    {
      title: "Special Customers",
      content: "Keep an eye out for our special customers! Each has unique preferences and rewards.",
      icon: <Crown className="w-12 h-12 text-yellow-500" />,
      image: "https://images.unsplash.com/photo-1573865526739-10659fec78a5?auto=format&fit=crop&w=800",
      tips: [
        "Emperor Meowximilian only accepts golden drinks",
        "The Duchess offers double points for special dishes",
        "Inspector Pawsworth is very particular about drinks and desserts"
      ]
    },
    {
      title: "Meet Our Newest Customers!",
      content: "We have two new special customers with unique dietary preferences!",
      icon: <Cat className="w-12 h-12 text-green-500" />,
      tips: [
        "Sprout is our vegan foodie - no animal products!",
        "Rex the Catosaurus only eats meat dishes",
        "Both customers offer bonus points for their special orders!"
      ],
      controls: [
        {
          icon: <Leaf className="w-5 h-5 text-green-500" />,
          name: "Sprout",
          description: "🌱 Vegan dishes only (200 points)"
        },
        {
          icon: <Beef className="w-5 h-5 text-red-500" />,
          name: "Rex",
          description: "🦖 Meat dishes only (250 points)"
        }
      ]
    },
    {
      title: "Practice with Sprout",
      content: "Let's practice making a vegan dish for Sprout! Choose plant-based ingredients to create a delicious meal.",
      icon: <Leaf className="w-12 h-12 text-green-500" />,
      practice: {
        character: {
          id: 'sprout',
          name: 'Sprout',
          icon: <Leaf className="w-5 h-5" />,
          description: "🌱 Only accepts vegan dishes! No animal products allowed.",
          color: "bg-green-100"
        },
        ingredients: {
          allowed: ['quinoa', 'brown-rice', 'vegetables', 'tofu', 'kale', 'avocado', 'mushroom'],
          forbidden: ['chicken', 'fish', 'egg', 'cream', 'cheese']
        }
      },
      tips: [
        "Use vegetables, tofu, and grains",
        "Avoid any animal products",
        "Try to make the Garden Power Bowl!"
      ]
    },
    {
      title: "Practice with Rex",
      content: "Time to feed our hungry dinosaur cat! Rex loves meat-heavy dishes with lots of protein.",
      icon: <Beef className="w-12 h-12 text-red-500" />,
      practice: {
        character: {
          id: 'rex',
          name: 'Rex',
          icon: <Beef className="w-5 h-5" />,
          description: "🦖 RAWR! Only accepts meat dishes!",
          color: "bg-red-100"
        },
        ingredients: {
          allowed: ['beef', 'chicken', 'pork', 'duck', 'lamb', 'rice', 'noodles'],
          forbidden: ['vegetables', 'tofu', 'mushroom']
        }
      },
      tips: [
        "Include at least one meat ingredient",
        "Try combining different proteins",
        "Make the Prehistoric Feast!"
      ]
    }
  ];

  const handleIngredientClick = (ingredient: string) => {
    if (selectedIngredients.length < 4) {
      setSelectedIngredients([...selectedIngredients, ingredient]);
    }
  };

  const clearIngredients = () => {
    setSelectedIngredients([]);
  };

  const checkDish = () => {
    const currentPractice = steps[currentStep].practice;
    if (!currentPractice) return;

    const hasAllowedIngredient = selectedIngredients.some(ing => 
      currentPractice.ingredients.allowed.includes(ing)
    );
    const hasForbiddenIngredient = selectedIngredients.some(ing => 
      currentPractice.ingredients.forbidden.includes(ing)
    );

    if (currentPractice.character.id === 'sprout') {
      if (hasAllowedIngredient && !hasForbiddenIngredient) {
        setFeedback({
          message: "Purr-fect! A delicious vegan dish that Sprout will love! 🌱",
          success: true
        });
        setPracticeAttempts(prev => prev + 1);
      } else {
        setFeedback({
          message: "Oops! Sprout only eats plant-based ingredients. Try again! 🥬",
          success: false
        });
      }
    } else if (currentPractice.character.id === 'rex') {
      if (hasAllowedIngredient && selectedIngredients.some(ing => 
        ['beef', 'chicken', 'pork', 'duck', 'lamb'].includes(ing)
      )) {
        setFeedback({
          message: "RAWR! Rex loves this meaty dish! 🦖",
          success: true
        });
        setPracticeAttempts(prev => prev + 1);
      } else {
        setFeedback({
          message: "Not enough meat! Rex needs protein! 🍖",
          success: false
        });
      }
    }

    setTimeout(() => {
      setFeedback(null);
      setSelectedIngredients([]);
    }, 2000);
  };

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
      setSelectedIngredients([]);
      setFeedback(null);
      setPracticeAttempts(0);
    } else {
      onComplete();
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
      setSelectedIngredients([]);
      setFeedback(null);
      setPracticeAttempts(0);
    }
  };

  const currentPractice = steps[currentStep].practice;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl max-w-2xl w-full relative overflow-hidden">
        {/* Progress bar */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gray-200">
          <div 
            className="h-full bg-orange-500 transition-all duration-300"
            style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
          />
        </div>

        {/* Close button */}
        <button
          onClick={onComplete}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 transition z-10"
        >
          <X className="w-6 h-6" />
        </button>

        <div className="p-8">
          {/* Icon */}
          <div className="flex justify-center mb-6">
            <div className="p-4 bg-orange-100 rounded-full">
              {steps[currentStep].icon}
            </div>
          </div>

          {/* Content */}
          <h2 className="text-2xl font-bold text-center mb-4">
            {steps[currentStep].title}
          </h2>
          <p className="text-gray-600 text-center mb-6">
            {steps[currentStep].content}
          </p>

          {/* Practice Mode */}
          {currentPractice && (
            <div className="mb-6">
              <div className={`${currentPractice.character.color} rounded-lg p-4 mb-4`}>
                <div className="flex items-center gap-2 mb-2">
                  {currentPractice.character.icon}
                  <span className="font-medium">{currentPractice.character.name}</span>
                </div>
                <p className="text-sm">{currentPractice.character.description}</p>
              </div>

              <div className="space-y-4">
                <div>
                  <h3 className="font-medium mb-2">Selected Ingredients:</h3>
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
                  <h3 className="font-medium mb-2">Available Ingredients:</h3>
                  <div className="grid grid-cols-3 gap-2">
                    {[...currentPractice.ingredients.allowed, ...currentPractice.ingredients.forbidden]
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

                {practiceAttempts >= 3 && (
                  <div className="text-center text-green-600">
                    Great practice! Ready to move on?
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Tips */}
          {steps[currentStep].tips && (
            <div className="bg-orange-50 rounded-lg p-4 mb-6">
              <div className="flex items-center gap-2 mb-2 text-orange-600">
                <Info className="w-5 h-5" />
                <span className="font-medium">Pro Tips:</span>
              </div>
              <ul className="space-y-2">
                {steps[currentStep].tips.map((tip, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <Star className="w-4 h-4 text-orange-400 mt-1 flex-shrink-0" />
                    <span className="text-sm text-gray-600">{tip}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Image */}
          {steps[currentStep].image && (
            <div className="relative h-48 mb-6 rounded-lg overflow-hidden">
              <img
                src={steps[currentStep].image}
                alt={steps[currentStep].title}
                className="absolute inset-0 w-full h-full object-cover"
              />
            </div>
          )}

          {/* Navigation */}
          <div className="flex justify-between items-center">
            <button
              onClick={handlePrevious}
              disabled={currentStep === 0}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition ${
                currentStep === 0
                  ? 'text-gray-400 cursor-not-allowed'
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              <ChevronLeft className="w-5 h-5" />
              Previous
            </button>

            <div className="flex gap-2">
              {steps.map((_, index) => (
                <div
                  key={index}
                  className={`w-2 h-2 rounded-full transition-all ${
                    index === currentStep
                      ? 'bg-orange-500 scale-125'
                      : 'bg-gray-300'
                  }`}
                />
              ))}
            </div>

            <button
              onClick={handleNext}
              className="flex items-center gap-2 px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition"
            >
              {currentStep === steps.length - 1 ? 'Start Playing' : 'Next'}
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}