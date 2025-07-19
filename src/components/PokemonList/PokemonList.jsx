import { useEffect, useState, useRef } from "react";
import {
  getPokemonList,
  getSpriteUrl,
  getTotalPokemonCount,
} from "../../services/pokeapi";
import "./PokemonList.css";

const BATCH_SIZE = 40;

export default function PokemonList({ onSelect, selected, search }) {
  const [pokemons, setPokemons] = useState([]);
  const [offset, setOffset] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const [allPokemons, setAllPokemons] = useState(null);
  const [totalPokemonCount, setTotalPokemonCount] = useState(null);
  const listRef = useRef();

  // Fetch total count of Pokémon
  useEffect(() => {
    getTotalPokemonCount().then(setTotalPokemonCount);
  }, []);

  // Load initial batch
  useEffect(() => {
    if (!search && totalPokemonCount) {
      setPokemons([]);
      setOffset(0);
      setHasMore(true);
      setAllPokemons(null);
      loadMore(0);
    }
  }, [search, totalPokemonCount]);

  // Load all Pokemons for search
  useEffect(() => {
    if (search && totalPokemonCount && !allPokemons) {
      setLoading(true);
      getPokemonList(0, totalPokemonCount).then((results) => {
        setAllPokemons(results);
        setLoading(false);
      });
    }
  }, [search, allPokemons, totalPokemonCount]);

  // Infinite scroll handler (disabled in search mode)
  useEffect(() => {
    if (search) return;
    const list = listRef.current;
    if (!list) return;

    const onScroll = () => {
      if (
        !loading &&
        hasMore &&
        list.scrollTop + list.clientHeight >= list.scrollHeight - 60
      ) {
        loadMore(offset);
      }
    };
    list.addEventListener("scroll", onScroll);
    return () => list.removeEventListener("scroll", onScroll);
  }, [loading, hasMore, pokemons, offset, search]);

  const loadMore = (currentOffset) => {
    setLoading(true);
    getPokemonList(currentOffset, BATCH_SIZE).then((batch) => {
      if (batch.length < BATCH_SIZE) setHasMore(false);
      setPokemons((prev) => [...prev, ...batch]);
      setOffset((prev) => prev + BATCH_SIZE);
      setLoading(false);
    });
  };

  let listToShow = [];
  let getIndex = (i) => i + 1; // For search mode

  if (!search) {
    listToShow = pokemons;
    // For infinite scroll
    getIndex = (i) => offset - pokemons.length + i + 1;
  } else if (allPokemons) {
    listToShow = allPokemons.filter((pokemon, i) => {
      const nameMatch = pokemon.name
        .toLowerCase()
        .includes(search.toLowerCase());
      return nameMatch;
    });
  }

  return (
    <div className="pokemon-list" ref={listRef}>
      {loading && <div className="pokemon-list-msg">Loading...</div>}
      {listToShow.length === 0 && !loading && (
        <div className="pokemon-list-msg">No results</div>
      )}
      {listToShow.map((pokemon, i) => (
        <div
          key={pokemon.name}
          className={`pokemon-list-item ${
            selected && selected.name === pokemon.name ? "selected" : ""
          }`}
          onClick={() => onSelect(pokemon)}
        >
          <span className="pokemon-name">
            <img
              src={getSpriteUrl(getIndex(i))}
              className="pokemon-icon"
              alt={pokemon.name}
              loading="lazy"
            />
            {pokemon.name}
          </span>
          <span className="pokemon-number">
            #{String(getIndex(i)).padStart(3, "0")}
          </span>
        </div>
      ))}
      {!hasMore && !search && (
        <div className="pokemon-list-msg">End of list</div>
      )}
    </div>
  );
}
