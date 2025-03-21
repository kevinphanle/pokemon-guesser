"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { Pokemon, normalizePokemonName, generateHint } from "../utils/pokemon";
import { getGameStats, updateGameStats } from "../utils/storage";
import GameStats from "./GameStats";
import PokemonDetails from "./PokemonDetails";
import CountdownTimer from "./CountdownTimer";

interface PokemonGameProps {
  pokemon: Pokemon | null;
  isLoading: boolean;
  onLoadNewPokemon: () => void;
}

export default function PokemonGame({
  pokemon,
  isLoading,
  onLoadNewPokemon,
}: PokemonGameProps) {
  const [guess, setGuess] = useState("");
  const [score, setScore] = useState(0);
  const [isRevealed, setIsRevealed] = useState(false);
  const [feedback, setFeedback] = useState("");
  const [hintCount, setHintCount] = useState(0);
  const [currentHint, setCurrentHint] = useState("");
  const [stats, setStats] = useState(getGameStats);
  const [streak, setStreak] = useState(0);

  const handleNextPokemon = useCallback(() => {
    resetGameState();
    onLoadNewPokemon();
  }, [onLoadNewPokemon]);

  useEffect(() => {
    // Initialize stats from localStorage
    setStats(getGameStats());
  }, []);

  function resetGameState() {
    setIsRevealed(false);
    setGuess("");
    setFeedback("");
    setHintCount(0);
    setCurrentHint("");
  }

  function handleGetHint() {
    if (!pokemon || hintCount >= 3) return;
    const newHintCount = hintCount + 1;
    setHintCount(newHintCount);
    setCurrentHint(generateHint(pokemon, newHintCount));

    // Update hints used stat
    const newStats = updateGameStats({
      ...stats,
      hintsUsed: stats.hintsUsed + 1,
    });
    setStats(newStats);
  }

  function handleGuess(e: React.FormEvent) {
    e.preventDefault();
    if (!pokemon) return;

    const normalizedGuess = normalizePokemonName(guess);
    const normalizedAnswer = normalizePokemonName(pokemon.name);

    if (normalizedGuess === normalizedAnswer) {
      const newStreak = streak + 1;
      setStreak(newStreak);
      const streakBonus = Math.floor(newStreak / 5);
      const points = Math.max(1, 4 - hintCount) + streakBonus;
      const newScore = score + points;
      setScore(newScore);

      const newStats = updateGameStats({
        ...stats,
        highScore: newScore,
        gamesPlayed: stats.gamesPlayed + 1,
        correctGuesses: stats.correctGuesses + 1,
      });
      setStats(newStats);

      setFeedback(
        `Correct! 🎉 +${points} points${
          streakBonus > 0 ? ` (includes ${streakBonus} streak bonus!)` : ""
        }`
      );
      setIsRevealed(true);
    } else {
      setStreak(0);
      setScore(Math.max(0, score - 1));
      setFeedback("Wrong! Try again 😅");

      // Update stats
      const newStats = updateGameStats({
        ...stats,
        gamesPlayed: stats.gamesPlayed + 1,
      });
      setStats(newStats);
    }
  }

  function handleSkip() {
    setStreak(0);
    setFeedback(`It was ${pokemon?.name}!`);
    setIsRevealed(true);
  }

  if (isLoading || !pokemon) {
    return (
      <div className="flex justify-center items-center h-[600px]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8">
      <GameStats
        currentScore={score}
        highScore={stats.highScore}
        gamesPlayed={stats.gamesPlayed}
        correctGuesses={stats.correctGuesses}
        hintsUsed={stats.hintsUsed}
      />

      <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl mt-8">
        <div className="p-8">
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              Who&apos;s That Pokémon?
            </h1>
            {streak >= 5 && (
              <p className="text-sm text-orange-500 mb-2">
                🔥 {streak} correct in a row!
              </p>
            )}
          </div>

          <div className="relative mb-8">
            <Image
              src={pokemon.imageUrl}
              alt="Pokemon silhouette"
              width={256}
              height={256}
              className={`mx-auto select-none ${
                !isRevealed ? "brightness-0" : ""
              }`}
              style={{ filter: !isRevealed ? "contrast(0%)" : "none" }}
              draggable={false}
            />
            {isRevealed && (
              <div className="">
                <CountdownTimer duration={5} onComplete={handleNextPokemon} />
                <PokemonDetails pokemon={pokemon} />
              </div>
            )}
          </div>

          {!isRevealed && currentHint && (
            <div className="mb-4 p-4 bg-blue-50 rounded-lg">
              <p className="text-blue-700">{currentHint}</p>
            </div>
          )}

          <form onSubmit={handleGuess} className="space-y-4">
            <div>
              <input
                type="text"
                value={guess}
                onChange={(e) => setGuess(e.target.value)}
                placeholder="Enter Pokemon name..."
                className="w-full px-4 py-2 border text-black border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                disabled={isRevealed}
                autoComplete="off"
              />
            </div>

            {feedback && (
              <p
                className={`text-center text-lg ${
                  feedback.includes("Correct")
                    ? "text-green-600"
                    : "text-red-600"
                }`}
              >
                {feedback}
              </p>
            )}

            <div className="flex gap-2">
              {!isRevealed && (
                <>
                  <button
                    type="submit"
                    className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                  >
                    Guess!
                  </button>
                  <button
                    type="button"
                    onClick={handleGetHint}
                    disabled={hintCount >= 3}
                    className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Hint ({3 - hintCount} left)
                  </button>
                  <button
                    type="button"
                    onClick={handleSkip}
                    className="px-4 py-2 bg-red-100 text-red-700 rounded-md hover:bg-red-200 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                  >
                    Skip
                  </button>
                </>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
