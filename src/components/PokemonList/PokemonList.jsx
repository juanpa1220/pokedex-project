import { useEffect, useState } from "react";
import { getPokemonList } from "../../services/pokeapi";

export default function PokemonList({ onSelect }) {
  const [pokemons, setPokemons] = useState([]);

  useEffect(() => {
    getPokemonList(0, 20).then(setPokemons);
  }, []);

  return (
    <div className="bg-red-800 rounded-xl h-full overflow-y-auto p-2">
      {pokemons.map((pokemon, idx) => (
        <button
          key={pokemon.name}
          className="flex items-center justify-between w-full px-4 py-3 mb-2 rounded-lg bg-red-700 hover:bg-red-600 text-white"
          onClick={() => onSelect(pokemon)}
        >
          <span className="capitalize">{pokemon.name}</span>
          <span>#{String(idx + 1).padStart(3, "0")}</span>
        </button>
      ))}
    </div>
  );
}
