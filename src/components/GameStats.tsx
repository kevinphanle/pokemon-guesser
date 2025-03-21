"use client";

interface GameStatsProps {
  currentScore: number;
  highScore: number;
  gamesPlayed: number;
  correctGuesses: number;
  hintsUsed: number;
}

export default function GameStats({
  currentScore,
  highScore,
  gamesPlayed,
  correctGuesses,
  hintsUsed,
}: GameStatsProps) {
  const accuracy =
    gamesPlayed > 0 ? Math.round((correctGuesses / gamesPlayed) * 100) : 0;

  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 bg-white rounded-lg shadow-sm">
      <div className="text-center">
        <p className="text-sm text-gray-500">Current Score</p>
        <p className="text-2xl font-bold text-blue-600">{currentScore}</p>
      </div>
      <div className="text-center">
        <p className="text-sm text-gray-500">High Score</p>
        <p className="text-2xl font-bold text-purple-600">{highScore}</p>
      </div>
      <div className="text-center">
        <p className="text-sm text-gray-500">Accuracy</p>
        <p className="text-2xl font-bold text-green-600">{accuracy}%</p>
      </div>
      <div className="text-center">
        <p className="text-sm text-gray-500">Hints Used</p>
        <p className="text-2xl font-bold text-orange-600">{hintsUsed}</p>
      </div>
    </div>
  );
}
