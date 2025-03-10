import React, { useState, useEffect } from 'react';
import { Cat, Coffee, Book } from 'lucide-react';
import Kitchen from './components/Kitchen';
import Order from './components/Order';
import Timer from './components/Timer';
import ScoreBoard from './components/ScoreBoard';
import HomeScreen from './components/HomeScreen';
import Tutorial from './components/Tutorial';
import Cookbook from './components/Cookbook';
import IngredientsGuide from './components/IngredientsGuide';
import SpecialTutorial from './components/SpecialTutorial';
import { RECIPES } from './data/recipes';
import { CAT_CUSTOMERS } from './data/customers';
import { Order as OrderType } from './types/game';

function App() {
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(180); // 3 minutes
  const [orders, setOrders] = useState<OrderType[]>([]);
  const [gameOver, setGameOver] = useState(false);
  const [firstOrderCompleted, setFirstOrderCompleted] = useState(false);
  const [feedback, setFeedback] = useState<{ message: string; isError: boolean } | null>(null);
  const [showHome, setShowHome] = useState(true);
  const [showAbout, setShowAbout] = useState(false);
  const [showTutorial, setShowTutorial] = useState(false);
  const [showSpecialTutorial, setShowSpecialTutorial] = useState(false);
  const [showCookbook, setShowCookbook] = useState(false);
  const [showIngredients, setShowIngredients] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [highScore, setHighScore] = useState(() => {
    const saved = localStorage.getItem('highScore');
    return saved ? parseInt(saved, 10) : 0;
  });
  const [hardModeUnlocked, setHardModeUnlocked] = useState(() => {
    const saved = localStorage.getItem('hardModeUnlocked');
    return saved ? JSON.parse(saved) : false;
  });
  const [isHardMode, setIsHardMode] = useState(false);

  useEffect(() => {
    localStorage.setItem('highScore', highScore.toString());
  }, [highScore]);

  useEffect(() => {
    localStorage.setItem('hardModeUnlocked', JSON.stringify(hardModeUnlocked));
  }, [hardModeUnlocked]);

  // Generate new orders periodically
  useEffect(() => {
    if (timeLeft <= 0 || gameOver || isPaused) return;

    const generateOrder = () => {
      if (orders.length >= 3) return;
      
      // Get available customers (not currently ordering)
      const busyCustomerIds = orders.map(order => order.customer.id);
      const availableCustomers = CAT_CUSTOMERS.filter(
        customer => !busyCustomerIds.includes(customer.id)
      );
      
      if (availableCustomers.length === 0) return;
      
      const customer = availableCustomers[Math.floor(Math.random() * availableCustomers.length)];
      
      // Get recipes based on customer type
      const availableRecipes = RECIPES.filter(recipe => {
        if (customer.id === 'inspector') {
          // Inspector only gets drinks and desserts
          return recipe.name.toLowerCase().includes('tea') || 
                 recipe.name.toLowerCase().includes('parfait') ||
                 recipe.name.toLowerCase().includes('mochi');
        }
        if (customer.isVIP) {
          // VIP customers can order any VIP or regular recipe
          return recipe.vipOnly || !recipe.vipOnly;
        }
        // Regular customers only get regular recipes
        return !recipe.vipOnly;
      });
      
      if (availableRecipes.length === 0) return;
      
      const recipe = availableRecipes[Math.floor(Math.random() * availableRecipes.length)];
      const timeLimit = customer.isVIP ? Math.floor(recipe.timeLimit * 0.8) : recipe.timeLimit;
      
      // In hard mode, reduce time limits by 25%
      const finalTimeLimit = isHardMode ? Math.floor(timeLimit * 0.75) : timeLimit;
      
      const newOrder: OrderType = {
        id: Math.random().toString(36).substr(2, 9),
        recipe: {
          ...recipe,
          timeLimit: finalTimeLimit
        },
        timeLeft: finalTimeLimit,
        completed: false,
        customer,
        isVIP: customer.isVIP
      };
      
      setOrders(prev => [...prev, newOrder]);
    };

    // Generate initial orders
    if (orders.length === 0) {
      generateOrder();
    }

    // Only start the interval for new orders after first order is completed
    let orderInterval: NodeJS.Timeout | null = null;
    if (firstOrderCompleted) {
      // In hard mode, orders come 20% faster
      const intervalTime = isHardMode ? 3200 : 4000;
      orderInterval = setInterval(generateOrder, intervalTime);
    }

    return () => {
      if (orderInterval) clearInterval(orderInterval);
    };
  }, [timeLeft, gameOver, firstOrderCompleted, orders, isPaused, isHardMode]);

  // Update order timers
  useEffect(() => {
    if (timeLeft <= 0) {
      handleGameOver();
      return;
    }

    if (gameOver || isPaused) return;

    const timer = setInterval(() => {
      setTimeLeft(prev => prev - 1);
      setOrders(prev => {
        const updatedOrders = prev.map(order => ({
          ...order,
          timeLeft: order.timeLeft - 1
        }));
        
        // Check for timed out orders
        const timedOutOrders = updatedOrders.filter(order => order.timeLeft <= 0);
        if (timedOutOrders.length > 0) {
          timedOutOrders.forEach(order => {
            const penalty = order.isVIP ? -100 : -50;
            setScore(current => Math.max(0, current + penalty));
            setFeedback({
              message: `${order.customer.name}'s ${order.recipe.name} was not completed! ${penalty} points!`,
              isError: true
            });
            setTimeout(() => setFeedback(null), 3000);
          });
        }
        
        return updatedOrders.filter(order => order.timeLeft > 0);
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, gameOver, isPaused]);

  const handleGameOver = () => {
    if (score > highScore) {
      setHighScore(score);
    }
    
    // Unlock hard mode after completing a game
    if (!hardModeUnlocked) {
      setHardModeUnlocked(true);
    }
    
    setGameOver(true);
  };

  const handleOrderComplete = (orderId: string, points: number) => {
    const order = orders.find(o => o.id === orderId);
    const finalPoints = order?.isVIP ? points * 2 : points;
    
    // In hard mode, earn 50% more points
    const hardModePoints = isHardMode ? Math.floor(finalPoints * 1.5) : finalPoints;
    
    setScore(prev => prev + hardModePoints);
    setOrders(prev => prev.filter(order => order.id !== orderId));
    
    setFeedback({
      message: `Order completed! +${hardModePoints} points!`,
      isError: false
    });
    setTimeout(() => setFeedback(null), 3000);
    
    if (!firstOrderCompleted) {
      setFirstOrderCompleted(true);
    }
  };

  const handleOrderTimeout = (orderId: string) => {
    setOrders(prev => prev.filter(order => order.id !== orderId));
    if (!firstOrderCompleted) {
      setFirstOrderCompleted(true);
    }
  };

  const handleWrongOrder = (penalty: number) => {
    // In hard mode, penalties are 50% higher
    const finalPenalty = isHardMode ? Math.floor(penalty * 1.5) : penalty;
    
    setScore(prev => Math.max(0, prev - finalPenalty));
    setTimeLeft(prev => Math.max(0, prev - 5)); // 5-second time penalty
    setFeedback({
      message: `Wrong order! -${finalPenalty} points!`,
      isError: true
    });
    setTimeout(() => setFeedback(null), 3000);
  };

  const startNewGame = (hardMode: boolean = false) => {
    setScore(0);
    setTimeLeft(hardMode ? 150 : 180); // 2.5 minutes in hard mode
    setOrders([]);
    setGameOver(false);
    setFirstOrderCompleted(false);
    setFeedback(null);
    setShowCookbook(false);
    setShowIngredients(false);
    setIsPaused(true); // Always pause when starting
    setShowHome(false);
    setShowAbout(false);
    setIsHardMode(hardMode);
    setShowTutorial(true); // Always show tutorial
  };

  const handleTutorialComplete = () => {
    setShowTutorial(false);
    setIsPaused(false);
  };

  const goToHome = () => {
    // Reset all game states
    setScore(0);
    setTimeLeft(180);
    setOrders([]);
    setGameOver(false);
    setFirstOrderCompleted(false);
    setFeedback(null);
    setShowCookbook(false);
    setShowIngredients(false);
    setIsPaused(false);
    setShowTutorial(false);
    setIsHardMode(false);
    
    // Show home screen
    setShowHome(true);
    setShowAbout(false);
  };

  const toggleCookbook = () => {
    if (!isHardMode) {
      setShowCookbook(!showCookbook);
      setIsPaused(!showCookbook);
    } else {
      setFeedback({
        message: "Cookbook not available in hard mode!",
        isError: true
      });
      setTimeout(() => setFeedback(null), 3000);
    }
  };

  const toggleIngredients = () => {
    if (!isHardMode) {
      setShowIngredients(!showIngredients);
      setIsPaused(!showIngredients);
    } else {
      setFeedback({
        message: "Ingredients guide not available in hard mode!",
        isError: true
      });
      setTimeout(() => setFeedback(null), 3000);
    }
  };

  if (showHome) {
    return (
      <div className="min-h-screen starry-sunset">
        <HomeScreen
          onPlay={() => startNewGame(false)}
          onPlayHard={() => startNewGame(true)}
          onAbout={() => setShowAbout(true)}
          onBack={() => setShowAbout(false)}
          showAbout={showAbout}
          highScore={highScore}
          hardModeUnlocked={hardModeUnlocked}
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen starry-sunset">
      {showTutorial && (
        <Tutorial 
          onComplete={() => {
            setShowTutorial(false);
            setShowSpecialTutorial(true);
          }} 
        />
      )}
      
      {showSpecialTutorial && (
        <SpecialTutorial
          onComplete={() => {
            setShowSpecialTutorial(false);
            setIsPaused(false);
          }}
        />
      )}

      {showCookbook && <Cookbook onClose={toggleCookbook} />}
      {showIngredients && <IngredientsGuide onClose={toggleIngredients} />}
      
      {/* Header */}
      <header className="bg-orange-600 bg-opacity-90 text-white p-4 shadow-lg relative z-10">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Cat className="w-8 h-8" />
            <div>
              <h1 className="text-2xl font-bold">Calico Café</h1>
              {isHardMode && (
                <div className="text-xs font-medium text-orange-200">Hard Mode</div>
              )}
            </div>
          </div>
          <div className="flex items-center gap-4">
            <button
              onClick={toggleIngredients}
              className={`bg-orange-700 bg-opacity-90 px-4 py-2 rounded-lg transition flex items-center gap-2 ${
                isHardMode ? 'opacity-50 cursor-not-allowed' : 'hover:bg-orange-800'
              }`}
              disabled={isHardMode}
            >
              <Book className="w-5 h-5" />
              Ingredients
            </button>
            <button
              onClick={toggleCookbook}
              className={`bg-orange-700 bg-opacity-90 px-4 py-2 rounded-lg transition flex items-center gap-2 ${
                isHardMode ? 'opacity-50 cursor-not-allowed' : 'hover:bg-orange-800'
              }`}
              disabled={isHardMode}
            >
              <Book className="w-5 h-5" />
              Cookbook
            </button>
            <button
              onClick={goToHome}
              className="bg-orange-700 bg-opacity-90 px-4 py-2 rounded-lg hover:bg-orange-800 transition"
            >
              Home
            </button>
            <Timer timeLeft={timeLeft} />
            <ScoreBoard score={score} highScore={highScore} />
          </div>
        </div>
      </header>

      {/* Background Pattern */}
      <div className="fixed inset-0 game-bg pointer-events-none"></div>

      {/* Feedback Message */}
      {feedback && (
        <div className={`fixed top-20 left-1/2 transform -translate-x-1/2 px-6 py-3 rounded-lg shadow-lg transition-all z-20 ${
          feedback.isError ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'
        }`}>
          {feedback.message}
        </div>
      )}

      {/* Game Over Modal */}
      {gameOver && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-30">
          <div className="bg-white rounded-xl p-8 max-w-md w-full mx-4">
            <h2 className="text-2xl font-bold text-center mb-4">Game Over!</h2>
            <p className="text-lg text-center mb-4">Final Score: {score}</p>
            {!hardModeUnlocked && score >= 500 && (
              <div className="bg-yellow-100 text-yellow-800 p-4 rounded-lg mb-4">
                🎉 Hard Mode Unlocked! 
                <p className="text-sm mt-1">Can you handle shorter time limits and no recipe guides?</p>
              </div>
            )}
            <div className="grid grid-cols-2 gap-4">
              <button
                onClick={() => startNewGame(isHardMode)}
                className="bg-orange-600 text-white py-2 px-4 rounded-lg hover:bg-orange-700 transition"
              >
                Play Again
              </button>
              <button
                onClick={goToHome}
                className="bg-gray-600 text-white py-2 px-4 rounded-lg hover:bg-gray-700 transition"
              >
                Quit
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Main Game Area */}
      <main className="container mx-auto p-4 grid grid-cols-1 lg:grid-cols-3 gap-6 mt-8 relative z-10">
        {/* Orders Panel */}
        <div className="lg:col-span-1 bg-white bg-opacity-90 rounded-xl shadow-md p-4">
          <div className="flex items-center gap-2 mb-4">
            <Coffee className="text-orange-600" />
            <h2 className="text-xl font-semibold">Orders ({orders.length}/3)</h2>
          </div>
          <div className="space-y-4">
            {orders.map((order) => (
              <Order
                key={order.id}
                order={order}
                onComplete={(points) => handleOrderComplete(order.id, points)}
                onTimeout={() => handleOrderTimeout(order.id)}
              />
            ))}
            {orders.length === 0 && (
              <p className="text-gray-500 text-center py-4">Waiting for orders...</p>
            )}
          </div>
        </div>

        {/* Kitchen Area */}
        <div className="lg:col-span-2">
          <Kitchen
            currentOrders={orders}
            onOrderComplete={handleOrderComplete}
            onWrongOrder={handleWrongOrder}
          />
        </div>
      </main>
    </div>
  );
}

export default App;