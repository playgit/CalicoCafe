import React, { useEffect } from 'react';
import { Timer, Crown } from 'lucide-react';
import { Order as OrderType } from '../types/game';
import { INGREDIENTS } from '../data/recipes';

interface OrderProps {
  order: OrderType;
  onComplete: (points: number) => void;
  onTimeout: () => void;
}

export default function Order({ order, onComplete, onTimeout }: OrderProps) {
  useEffect(() => {
    if (order.timeLeft <= 0) {
      onTimeout();
    }
  }, [order.timeLeft, onTimeout]);

  return (
    <div className={`border border-gray-200 rounded-lg p-4 hover:shadow-md transition ${
      order.customer.isVIP ? 'border-2 border-yellow-400 bg-gradient-to-r from-yellow-50 to-amber-50' : order.customer.color
    }`}>
      <div className="flex items-start gap-3">
        <div className="relative">
          <img
            src={order.customer.image}
            alt={order.customer.name}
            className="w-12 h-12 rounded-full object-cover"
          />
          <div className="absolute -bottom-1 -right-1 bg-white text-xs px-1 py-0.5 rounded-full shadow-sm border border-gray-200">
            {order.customer.isVIP ? '👑' : '😺'}
          </div>
        </div>
        <div className="flex-1">
          <div className="flex justify-between items-start mb-1">
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-medium">{order.customer.name}</h3>
                {order.customer.isVIP && (
                  <Crown className="w-4 h-4 text-yellow-500" />
                )}
              </div>
              <p className="text-xs text-gray-600">{order.customer.personality}</p>
              {order.customer.description && (
                <p className="text-xs text-amber-600 mt-1">{order.customer.description}</p>
              )}
            </div>
            <div className="flex items-center text-sm text-gray-600">
              <Timer className="w-4 h-4 mr-1" />
              <span>{Math.max(0, order.timeLeft)}s</span>
            </div>
          </div>
          <div className="mt-3">
            <p className="text-sm font-medium">Ordered: {order.recipe.name}</p>
            <div className="flex gap-1 mt-1">
              {order.recipe.ingredients.map((ingredientId) => {
                const ingredient = INGREDIENTS.find(i => i.id === ingredientId);
                return (
                  <span
                    key={ingredientId}
                    className={`inline-block w-6 h-6 rounded-full ${ingredient?.color} border border-gray-200`}
                    title={ingredient?.name}
                  />
                );
              })}
            </div>
            {order.customer.isVIP && (
              <p className="text-xs text-yellow-600 mt-2">
                Double points available! ✨
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}