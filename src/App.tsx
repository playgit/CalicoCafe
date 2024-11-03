import React, { useState, useEffect } from 'react';
import { Cat, Coffee } from 'lucide-react';
import Kitchen from './components/Kitchen';
import Order from './components/Order';
import Timer from './components/Timer';
import ScoreBoard from './components/ScoreBoard';
import { RECIPES } from './data/recipes';
import { CAT_CUSTOMERS } from './data/customers';
import { Order as OrderType, Recipe } from './types/game';

function App() {
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(180); // 3 minutes
  const [orders, setOrders] = useState<OrderType[]>([]);
  const [gameOver, setGameOver] = useState(false);
  const [firstOrderCompleted, setFirstOrderCompleted] = useState(false);
  const [feedback, setFeedback] = useState<{ message: string; isError: boolean } | null>(null);

  // Generate new orders periodically
  useEffect(() => {
    if (timeLeft <= 0 || gameOver) return;

    const generateOrder = () => {
      if (orders.length >= 5) return;
      
      // Get available customers (not currently ordering)
      const busyCustomerIds = orders.map(order => order.customer.id);
      const availableCustomers = CAT_CUSTOMERS.filter(
        customer => !busyCustomerIds.includes(customer.id)
      );
      
      if (availableCustomers.length === 0) return;
      
      const customer = availableCustomers[Math.floor(Math.random() * availableCustomers.length)];
      
      // Get recipes based on customer VIP status
      const availableRecipes = RECIPES.filter(recipe => 
        customer.isVIP ? recipe.vipOnly : !recipe.vipOnly
      );
      
      if (availableRecipes.length === 0) return;
      
      const recipe = availableRecipes[Math.floor(Math.random() * availableRecipes.length)];
      const timeLimit = customer.isVIP ? Math.floor(recipe.timeLimit / 2) : recipe.timeLimit;
      
      const newOrder: OrderType = {
        id: Math.random().toString(36).substr(2, 9),
        recipe: {
          ...recipe,
          timeLimit
        },
        timeLeft: timeLimit,
        completed: false,
        customer,
        isVIP: customer.isVIP
      };
      
      setOrders(prev => [...prev, newOrder]);
    };

    // Generate initial orders
    if (orders.length === 0) {
      generateOrder(); // First order
      setTimeout(generateOrder, 100); // Second order
    }

    // Only start the interval for new orders after first order is completed
    let orderInterval: NodeJS.Timeout | null = null;
    if (firstOrderCompleted) {
      orderInterval = setInterval(generateOrder, 4000);
    }

    return () => {
      if (orderInterval) clearInterval(orderInterval);
    };
  }, [timeLeft, gameOver, firstOrderCompleted]);

  // Update order timers
  useEffect(() => {
    if (timeLeft <= 0 || gameOver) return;

    const timer = setInterval(() => {
      setTimeLeft(prev => prev - 1);
      setOrders(prev => {
        const updatedOrders = prev.map(order => ({
          ...order,
          timeLeft: order.timeLeft - 1
        }));
        
        // Check for timed out orders
        const timedOutOrders = updatedOrders.filter(order => order.timeLeft === 0);
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
  }, [timeLeft, gameOver]);

  // Check game over
  useEffect(() => {
    if (timeLeft <= 0) {
      setGameOver(true);
    }
  }, [timeLeft]);

  const handleOrderComplete = (orderId: string, points: number) => {
    const order = orders.find(o => o.id === orderId);
    const finalPoints = order?.isVIP ? points * 2 : points;
    setScore(prev => prev + finalPoints);
    setOrders(prev => prev.filter(order => order.id !== orderId));
    
    setFeedback({
      message: `Order completed! +${finalPoints} points!`,
      isError: false
    });
    setTimeout(() => setFeedback(null), 3000);
    
    // Set firstOrderCompleted to true when the first order is completed
    if (!firstOrderCompleted) {
      setFirstOrderCompleted(true);
    }
  };

  const handleOrderTimeout = (orderId: string) => {
    setOrders(prev => prev.filter(order => order.id !== orderId));
    // Also count a timeout as completion for starting new orders
    if (!firstOrderCompleted) {
      setFirstOrderCompleted(true);
    }
  };

  const handleWrongOrder = (penalty: number) => {
    setScore(prev => Math.max(0, prev - penalty));
    setTimeLeft(prev => Math.max(0, prev - 5)); // 5-second time penalty
    setFeedback({
      message: `Wrong order! -${penalty} points!`,
      isError: true
    });
    setTimeout(() => setFeedback(null), 3000);
  };

  return (
    <div className="min-h-screen bg-amber-50">
      {/* Header */}
      <header className="bg-orange-600 text-white p-4 shadow-lg">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Cat className="w-8 h-8" />
            <h1 className="text-2xl font-bold">Calico Café</h1>
          </div>
          <div className="flex items-center gap-4">
            <Timer timeLeft={timeLeft} />
            <ScoreBoard score={score} />
          </div>
        </div>
      </header>

      {/* Feedback Message */}
      {feedback && (
        <div className={`fixed top-20 left-1/2 transform -translate-x-1/2 px-6 py-3 rounded-lg shadow-lg transition-all ${
          feedback.isError ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'
        }`}>
          {feedback.message}
        </div>
      )}

      {/* Main Game Area */}
      <main className="container mx-auto p-4 grid grid-cols-1 lg:grid-cols-3 gap-6 mt-8">
        {/* Orders Panel */}
        <div className="lg:col-span-1 bg-white rounded-xl shadow-md p-4">
          <div className="flex items-center gap-2 mb-4">
            <Coffee className="text-orange-600" />
            <h2 className="text-xl font-semibold">Orders ({orders.length}/5)</h2>
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

      {/* Game Over Modal */}
      {gameOver && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white rounded-xl p-8 max-w-md w-full mx-4">
            <h2 className="text-2xl font-bold text-center mb-4">Game Over!</h2>
            <p className="text-lg text-center mb-4">Final Score: {score}</p>
            <button
              onClick={() => window.location.reload()}
              className="w-full bg-orange-600 text-white py-2 px-4 rounded-lg hover:bg-orange-700 transition"
            >
              Play Again
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;