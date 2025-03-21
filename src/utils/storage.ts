interface GameStats {
  highScore: number;
  gamesPlayed: number;
  correctGuesses: number;
  hintsUsed: number;
}

const STORAGE_KEY = "pokemon-guesser-stats";

export function getGameStats(): GameStats {
  if (typeof window === "undefined") return defaultStats();

  const stored = localStorage.getItem(STORAGE_KEY);
  if (!stored) return defaultStats();

  try {
    return JSON.parse(stored);
  } catch {
    return defaultStats();
  }
}

export function updateGameStats(update: Partial<GameStats>): GameStats {
  if (typeof window === "undefined") return defaultStats();

  const current = getGameStats();
  const newStats = {
    ...current,
    ...update,
    highScore: Math.max(current.highScore, update.highScore || 0),
  };

  localStorage.setItem(STORAGE_KEY, JSON.stringify(newStats));
  return newStats;
}

function defaultStats(): GameStats {
  return {
    highScore: 0,
    gamesPlayed: 0,
    correctGuesses: 0,
    hintsUsed: 0,
  };
}
