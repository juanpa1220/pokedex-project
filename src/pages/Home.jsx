import { useState } from "react";
import PokemonList from "../components/PokemonList/PokemonList";
import PokemonDetail from "../components/PokemonDetail/PokemonDetail";
import "../styles/main.css";

export default function Home() {
  const [selectedPokemon, setSelectedPokemon] = useState(null);
  const [search, setSearch] = useState("");

  return (
    <div className="main-panels">
      <div className="panel left-panel">
        <PokemonList
          onSelect={setSelectedPokemon}
          selected={selectedPokemon}
          search={search}
        />
      </div>
      <div className="panel right-panel">
        <div className="pokemon-search-bar">
          <span className="pokemon-search-icon">&#128269;</span>
          <input
            type="text"
            placeholder="Search"
            className="pokemon-search-input"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <PokemonDetail pokemon={selectedPokemon} />
      </div>
    </div>
  );
}
