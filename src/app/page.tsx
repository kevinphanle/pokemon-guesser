"use client";

import { useState, useEffect } from "react";
import PokemonGame from "../components/PokemonGame";
import PokemonList from "../components/PokemonList";
import Tabs from "../components/Tabs";
import { Pokemon, getRandomPokemon } from "../utils/pokemon";

const tabs = [
  { id: "game", label: "Guess Game" },
  { id: "pokedex", label: "Pokédex" },
];

export default function Home() {
  const [activeTab, setActiveTab] = useState("game");
  const [currentPokemon, setCurrentPokemon] = useState<Pokemon | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadInitialPokemon() {
      const newPokemon = await getRandomPokemon();
      setCurrentPokemon(newPokemon);
      setIsLoading(false);
    }
    loadInitialPokemon();
  }, []);

  const handleLoadNewPokemon = async () => {
    setIsLoading(true);
    const newPokemon = await getRandomPokemon();
    setCurrentPokemon(newPokemon);
    setIsLoading(false);
  };

  return (
    <main className="min-h-screen bg-gray-100">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white shadow">
          <Tabs tabs={tabs} activeTab={activeTab} onTabChange={setActiveTab} />
        </div>
        <div className="mt-4">
          {activeTab === "game" ? (
            <PokemonGame
              pokemon={currentPokemon}
              isLoading={isLoading}
              onLoadNewPokemon={handleLoadNewPokemon}
            />
          ) : (
            <PokemonList />
          )}
        </div>
      </div>
    </main>
  );
}
