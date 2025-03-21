import pokemonData from "../data/pokemon.json";

export interface Pokemon {
  id: number;
  name: string;
  imageUrl: string;
  description: string;
  types: string[];
  height: number;
  weight: number;
}

const TOTAL_POKEMON = 151;

export function generateHint(pokemon: Pokemon, attemptNumber: number): string {
  switch (attemptNumber) {
    case 1:
      return `This Pokémon is a ${pokemon.types.join("/")} type.`;
    case 2:
      return `It is ${pokemon.height}m tall and weighs ${pokemon.weight}kg.`;
    case 3:
      return pokemon.description;
    default:
      return "No more hints available!";
  }
}

export async function getAllPokemon(): Promise<Pokemon[]> {
  return pokemonData;
}

export async function getRandomPokemon(): Promise<Pokemon> {
  const id = Math.floor(Math.random() * TOTAL_POKEMON);
  return pokemonData[id];
}

export function normalizePokemonName(name: string): string {
  return name
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]/g, "");
}
