"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Pokemon, getAllPokemon } from "../utils/pokemon";

export default function PokemonList() {
  const [pokemon, setPokemon] = useState<Pokemon[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadPokemon() {
      const allPokemon = await getAllPokemon();
      setPokemon(allPokemon);
      setIsLoading(false);
    }
    loadPokemon();
  }, []);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[200px]">
        Loading Pokédex...
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold text-black text-center mb-8">
        Pokédex
      </h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {pokemon.map((p) => (
          <div
            key={p.id}
            className="bg-white rounded-lg shadow-md p-4 text-center"
          >
            <Image
              src={p.imageUrl}
              alt={p.name}
              width={96}
              height={96}
              className="mx-auto"
            />
            <p className="mt-2 text-sm text-black font-medium capitalize">
              {p.name}
            </p>
            <p className="text-xs text-gray-500">
              #{p.id.toString().padStart(3, "0")}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
