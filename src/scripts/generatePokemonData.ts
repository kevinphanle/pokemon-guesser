import fs from "fs";
import path from "path";

const TOTAL_POKEMON = 151;

interface FlavorTextEntry {
  flavor_text: string;
  language: {
    name: string;
  };
}

interface PokemonType {
  type: {
    name: string;
  };
}

async function generatePokemonData() {
  console.log("Fetching Pokemon data...");
  const pokemon = [];

  for (let id = 1; id <= TOTAL_POKEMON; id++) {
    console.log(`Fetching Pokemon #${id}...`);
    const [pokemonResponse, speciesResponse] = await Promise.all([
      fetch(`https://pokeapi.co/api/v2/pokemon/${id}`),
      fetch(`https://pokeapi.co/api/v2/pokemon-species/${id}`),
    ]);

    const [pokemonData, speciesData] = await Promise.all([
      pokemonResponse.json(),
      speciesResponse.json(),
    ]);

    // Get English flavor text entries
    const englishEntries = speciesData.flavor_text_entries
      .filter((entry: FlavorTextEntry) => entry.language.name === "en")
      .map((entry: FlavorTextEntry) =>
        entry.flavor_text.replace(/\f|\n|\r/g, " ")
      );

    pokemon.push({
      id: pokemonData.id,
      name: pokemonData.name,
      imageUrl: pokemonData.sprites.other["official-artwork"].front_default,
      description: englishEntries[0] || "",
      types: pokemonData.types.map((t: PokemonType) => t.type.name),
      height: pokemonData.height / 10, // convert to meters
      weight: pokemonData.weight / 10, // convert to kg
    });
  }

  const outputPath = path.join(process.cwd(), "src/data/pokemon.json");
  fs.mkdirSync(path.dirname(outputPath), { recursive: true });
  fs.writeFileSync(outputPath, JSON.stringify(pokemon, null, 2));
  console.log("Pokemon data generated successfully!");
}

generatePokemonData().catch(console.error);
