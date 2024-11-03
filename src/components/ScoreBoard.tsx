import React from 'react';

export default function ScoreBoard({ score }) {
  return (
    <div className="bg-orange-700 px-4 py-2 rounded-lg">
      <span className="font-bold">Score: {score}</span>
    </div>
  );
}