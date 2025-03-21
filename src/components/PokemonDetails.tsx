"use client";

import { Pokemon } from "../utils/pokemon";

interface PokemonDetailsProps {
  pokemon: Pokemon;
}

export default function PokemonDetails({ pokemon }: PokemonDetailsProps) {
  return (
    <div className="mt-4 mb-4 p-4 bg-blue-50 rounded-lg">
      <div className="flex flex-col gap-2">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-semibold text-black capitalize">
            {pokemon.name}
          </h3>
          <span className="text-sm text-gray-500">
            #{pokemon.id.toString().padStart(3, "0")}
          </span>
        </div>

        <div className="flex gap-2">
          {pokemon.types.map((type) => (
            <span
              key={type}
              className="px-2 py-1 rounded-full text-xs font-medium capitalize"
              style={{
                backgroundColor: getTypeColor(type),
                color: "white",
              }}
            >
              {type}
            </span>
          ))}
        </div>

        <div className="mt-2 text-sm text-gray-600">
          <p>{pokemon.description}</p>
        </div>

        <div className="mt-2 grid grid-cols-2 gap-4 text-sm">
          <div>
            <span className="text-gray-500">Height:</span>{" "}
            <span className="font-medium text-gray-800">{pokemon.height}m</span>
          </div>
          <div>
            <span className="text-gray-500">Weight:</span>{" "}
            <span className="font-medium text-gray-800">
              {pokemon.weight}kg
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

// Pokemon type colors
function getTypeColor(type: string): string {
  const colors: { [key: string]: string } = {
    normal: "#A8A878",
    fire: "#F08030",
    water: "#6890F0",
    electric: "#F8D030",
    grass: "#78C850",
    ice: "#98D8D8",
    fighting: "#C03028",
    poison: "#A040A0",
    ground: "#E0C068",
    flying: "#A890F0",
    psychic: "#F85888",
    bug: "#A8B820",
    rock: "#B8A038",
    ghost: "#705898",
    dragon: "#7038F8",
    dark: "#705848",
    steel: "#B8B8D0",
    fairy: "#EE99AC",
  };

  return colors[type.toLowerCase()] || "#777777";
}
