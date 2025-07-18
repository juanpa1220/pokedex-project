import { useEffect, useState } from "react";
import { getPokemonList } from "../../services/pokeapi";
import "./PokemonList.css";

function getSpriteUrl(idx) {
  return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${idx}.png`;
}

export default function PokemonList({ onSelect, selected }) {
  const [pokemons, setPokemons] = useState([]);

  useEffect(() => {
    getPokemonList(0, 200).then(setPokemons);
  }, []);

  return (
    <div className="pokemon-list">
      {pokemons.map((pokemon, id) => (
        <div
          key={pokemon.name}
          className={`pokemon-list-item ${
            selected && selected.name === pokemon.name ? "selected" : ""
          }`}
          onClick={() => onSelect(pokemon)}
        >
          <span className="pokemon-name">
            <img
              src={getSpriteUrl(id + 1)}
              className="pokemon-icon"
              alt={pokemon.name}
              loading="lazy"
            />
            {pokemon.name}
          </span>
          <span className="pokemon-number">
            #{String(id + 1).padStart(3, "0")}
          </span>
        </div>
      ))}
    </div>
  );
}
