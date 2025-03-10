import React from 'react';
import { Cat, Play, Info, ArrowLeft, Trophy, Coffee, IceCream, Crown, Star, Clock, Heart, Flame } from 'lucide-react';

interface HomeScreenProps {
  onPlay: () => void;
  onPlayHard: () => void;
  onAbout: () => void;
  onBack: () => void;
  showAbout: boolean;
  highScore: number;
  hardModeUnlocked: boolean;
}

export default function HomeScreen({ onPlay, onPlayHard, onAbout, onBack, showAbout, highScore, hardModeUnlocked }: HomeScreenProps) {
  if (showAbout) {
    return (
      <div className="min-h-screen bg-amber-50 flex items-center justify-center p-4">
        <div className="max-w-2xl w-full bg-white rounded-xl shadow-lg p-8">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-800 transition mb-6"
          >
            <ArrowLeft className="w-5 h-5" />
            Back
          </button>
          
          <h1 className="text-3xl font-bold text-center mb-6">About Calico Café</h1>
          
          <div className="space-y-4 text-gray-700">
            <p>
              Welcome to Calico Café, where you'll serve a delightful array of dishes and drinks to our charming cat customers!
            </p>
            
            <h2 className="text-xl font-semibold mt-4">How to Play</h2>
            <ul className="list-disc pl-5 space-y-2">
              <li>Take orders from various cat customers, each with unique preferences</li>
              <li>Combine ingredients in the kitchen to create the perfect dishes</li>
              <li>Complete orders before they time out</li>
              <li>Watch out for VIP customers who offer double points!</li>
              <li>Special customers like Inspector Pawsworth and Emperor Meowximilian have unique requirements</li>
            </ul>
            
            <h2 className="text-xl font-semibold mt-4">Special Customers</h2>
            <ul className="list-disc pl-5 space-y-2">
              <li><strong>Inspector Pawsworth:</strong> Only accepts drinks and desserts</li>
              <li><strong>Emperor Meowximilian:</strong> Only accepts the most luxurious golden drinks</li>
              <li><strong>Duchess:</strong> A VIP customer who offers double points for regular special dishes</li>
              <li><strong>Neko:</strong> Loves anything pink, white, or red!</li>
              <li><strong>Sprout:</strong> Our vegan foodie who only accepts plant-based dishes</li>
              <li><strong>Rex the Catosaurus:</strong> A prehistoric carnivore who demands meaty dishes</li>
            </ul>

            <h2 className="text-xl font-semibold mt-4">Game Modes</h2>
            <ul className="list-disc pl-5 space-y-2">
              <li>
                <strong>Normal Mode:</strong> 3 minutes to serve customers, with access to the cookbook and ingredients guide
              </li>
              {hardModeUnlocked && (
                <li>
                  <strong>Hard Mode:</strong>
                  <ul className="list-disc pl-5 mt-2">
                    <li>2.5 minutes game time</li>
                    <li>25% shorter order time limits</li>
                    <li>No cookbook or ingredients guide</li>
                    <li>Orders come 20% faster</li>
                    <li>50% higher penalties</li>
                    <li>50% more points for successful orders</li>
                  </ul>
                </li>
              )}
            </ul>
            
            <p className="mt-4">
              You have 3 minutes to serve as many customers as possible and achieve the highest score!
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-amber-50 relative overflow-hidden">
      {/* Animated floating elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-10 left-10 text-orange-200 transform -rotate-12 animate-bounce">
          <Cat className="w-32 h-32 opacity-20" />
        </div>
        <div className="absolute bottom-10 right-10 text-orange-200 transform rotate-12 animate-pulse">
          <Coffee className="w-32 h-32 opacity-20" />
        </div>
        <div className="absolute top-1/4 right-1/4 text-orange-200 transform rotate-45 animate-bounce">
          <IceCream className="w-24 h-24 opacity-20" />
        </div>
        <div className="absolute bottom-1/4 left-1/4 text-orange-200 transform -rotate-45 animate-pulse">
          <Crown className="w-24 h-24 opacity-20" />
        </div>
        <div className="absolute top-1/3 left-1/3 text-orange-200 transform rotate-90 animate-bounce delay-150">
          <Star className="w-16 h-16 opacity-20" />
        </div>
        <div className="absolute bottom-1/3 right-1/3 text-orange-200 transform -rotate-90 animate-pulse delay-150">
          <Heart className="w-16 h-16 opacity-20" />
        </div>
        <div className="absolute top-2/3 right-1/3 text-orange-200 transform rotate-180 animate-bounce delay-300">
          <Clock className="w-20 h-20 opacity-20" />
        </div>
      </div>

      {/* Main content */}
      <div className="relative flex items-center justify-center min-h-screen">
        <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8 m-4 relative">
          {/* Cute cat ears */}
          <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
            <div className="flex gap-16">
              <div className="w-8 h-8 bg-orange-600 rounded-full transform -rotate-45"></div>
              <div className="w-8 h-8 bg-orange-600 rounded-full transform rotate-45"></div>
            </div>
          </div>

          {/* Whiskers */}
          <div className="absolute top-12 left-1/2 transform -translate-x-1/2">
            <div className="flex gap-32">
              <div className="space-y-2">
                <div className="w-8 h-0.5 bg-orange-200 transform rotate-12"></div>
                <div className="w-8 h-0.5 bg-orange-200"></div>
                <div className="w-8 h-0.5 bg-orange-200 transform -rotate-12"></div>
              </div>
              <div className="space-y-2">
                <div className="w-8 h-0.5 bg-orange-200 transform -rotate-12"></div>
                <div className="w-8 h-0.5 bg-orange-200"></div>
                <div className="w-8 h-0.5 bg-orange-200 transform rotate-12"></div>
              </div>
            </div>
          </div>

          <div className="flex flex-col items-center">
            <div className="flex justify-center mb-6">
              <div className="relative">
                <Cat className="w-24 h-24 text-orange-600" />
                <div className="absolute -right-2 -bottom-2">
                  <Coffee className="w-8 h-8 text-orange-500 animate-bounce" />
                </div>
              </div>
            </div>
            
            <h1 className="text-4xl font-bold text-center text-gray-800 mb-2">Calico Café</h1>
            <p className="text-center text-gray-600 mb-8">Serve delightful dishes to charming cats!</p>
            
            <div className="bg-gradient-to-r from-yellow-50 to-amber-50 rounded-lg p-4 mb-8 w-full">
              <div className="flex items-center justify-center gap-3">
                <Trophy className="w-6 h-6 text-yellow-500 animate-pulse" />
                <div>
                  <div className="text-sm text-gray-600">Best Score</div>
                  <div className="font-bold text-2xl text-gray-800">{highScore}</div>
                </div>
              </div>
            </div>
            
            <div className="space-y-4 w-full">
              <button
                onClick={onPlay}
                className="w-full bg-gradient-to-r from-orange-500 to-orange-600 text-white py-4 px-6 rounded-lg hover:from-orange-600 hover:to-orange-700 transition transform hover:scale-105 hover:shadow-xl shadow-lg flex items-center justify-center gap-2 font-bold text-lg group"
              >
                <Play className="w-6 h-6 group-hover:animate-bounce" />
                <span className="group-hover:animate-pulse">Start Cooking!</span>
              </button>

              {hardModeUnlocked && (
                <button
                  onClick={onPlayHard}
                  className="w-full bg-gradient-to-r from-red-500 to-red-600 text-white py-4 px-6 rounded-lg hover:from-red-600 hover:to-red-700 transition transform hover:scale-105 hover:shadow-xl shadow-lg flex items-center justify-center gap-2 font-bold text-lg group"
                >
                  <Flame className="w-6 h-6 group-hover:animate-bounce" />
                  <span className="group-hover:animate-pulse">Hard Mode</span>
                </button>
              )}
              
              <button
                onClick={onAbout}
                className="w-full bg-gray-600 text-white py-3 px-6 rounded-lg hover:bg-gray-700 transition flex items-center justify-center gap-2 group"
              >
                <Info className="w-5 h-5 group-hover:rotate-12 transition-transform" />
                How to Play
              </button>
            </div>
          </div>

          {/* Cute paw prints */}
          <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2">
            <div className="flex gap-4">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="w-4 h-4 bg-orange-200 rounded-full transform rotate-45 animate-bounce" style={{ animationDelay: `${i * 200}ms` }} />
              ))}
            </div>
          </div>

          {/* Decorative corner elements */}
          <div className="absolute -top-2 -left-2 w-12 h-12 text-orange-300">
            <Star className="w-full h-full animate-spin-slow" />
          </div>
          <div className="absolute -bottom-2 -right-2 w-12 h-12 text-orange-300">
            <Heart className="w-full h-full animate-pulse" />
          </div>
        </div>
      </div>
    </div>
  );
}