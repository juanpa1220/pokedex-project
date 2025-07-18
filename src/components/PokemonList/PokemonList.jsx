import { useEffect, useState, useRef } from "react";
import { getPokemonList } from "../../services/pokeapi";
import "./PokemonList.css";

const BATCH_SIZE = 40;

function getSpriteUrl(idx) {
  return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${idx}.png`;
}

export default function PokemonList({ onSelect, selected, search }) {
  const [pokemons, setPokemons] = useState([]);
  const [offset, setOffset] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const listRef = useRef();

  useEffect(() => {
    loadMore();
  }, []);

  useEffect(() => {
    const list = listRef.current;
    if (!list) return;

    function onScroll() {
      if (
        !loading &&
        hasMore &&
        list.scrollTop + list.clientHeight >= list.scrollHeight - 60 &&
        search === ""
      ) {
        loadMore();
      }
    }
    list.addEventListener("scroll", onScroll);
    return () => list.removeEventListener("scroll", onScroll);
  }, [loading, hasMore, pokemons, search]);

  function loadMore() {
    setLoading(true);
    getPokemonList(offset, BATCH_SIZE).then((newBatch) => {
      if (newBatch.length < BATCH_SIZE) setHasMore(false);
      setPokemons((prev) => [...prev, ...newBatch]);
      setOffset((prev) => prev + BATCH_SIZE);
      setLoading(false);
    });
  }

  // Filter loaded pokemons by search query
  const filteredPokemons = pokemons.filter((pokemon) => {
    const nameMatch = pokemon.name.toLowerCase().includes(search.toLowerCase());
    return nameMatch;
  });

  return (
    <div className="pokemon-list" ref={listRef}>
      {filteredPokemons.length === 0 && (
        <div className="pokemon-list-msg">No results</div>
      )}
      {filteredPokemons.map((pokemon, id) => (
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
      {loading && <div className="pokemon-list-msg">Loading...</div>}
      {!hasMore && search === "" && (
        <div className="pokemon-list-msg">End of list</div>
      )}
    </div>
  );
}
