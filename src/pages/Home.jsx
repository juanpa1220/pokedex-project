import React from "react";
import PokemonList from "../components/PokemonList/PokemonList";
import PokemonDetail from "../components/PokemonDetail/PokemonDetail";

export default function Home() {
  const [selectedPokemon, setSelectedPokemon] = React.useState(null);

  return (
    <div className="flex h-screen p-4 gap-4">
      <div className="w-1/3">
        <PokemonList onSelect={setSelectedPokemon} />
      </div>
      <div className="flex-1">
        <PokemonDetail pokemon={selectedPokemon} />
      </div>
    </div>
  );
}
