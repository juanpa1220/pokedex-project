import { useEffect, useState } from "react";
import axios from "axios";
import EvolutionChain from "../EvolutionChain/EvolutionChain";
import "./PokemonDetail.css";

async function getEggGroups(speciesUrl) {
  try {
    const response = await axios.get(speciesUrl);
    const eggGroups = response.data.egg_groups;
    return eggGroups.map((group) => group.name).join(", ");
  } catch (error) {
    console.error("Error fetching egg groups:", error);
    return "Unknown";
  }
}

async function getGenera(speciesUrl) {
  try {
    const response = await axios.get(speciesUrl);
    const genera = response.data.genera;
    // Find English genus or return "Unknown" if not found
    const englishGenus = genera.find((genus) => genus.language.name === "en");
    return englishGenus ? englishGenus.genus : "Unknown";
  } catch (error) {
    console.error("Error fetching genera:", error);
    return "Unknown";
  }
}

export default function PokemonDetail({ pokemon }) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [eggGroups, setEggGroups] = useState("Loading...");
  const [species, setSpecies] = useState("Loading...");

  useEffect(() => {
    if (!pokemon) {
      setData(null);
      setEggGroups("Loading...");
      setSpecies("Loading...");
      return;
    }
    setLoading(true);
    axios.get(pokemon.url).then((res) => {
      setData(res.data);
      setLoading(false);
      getEggGroups(res.data.species.url).then(setEggGroups);
      getGenera(res.data.species.url).then(setSpecies);
    });
  }, [pokemon]);

  if (!pokemon) {
    return (
      <div className="pokemon-detail">
        <div className="pokemon-detail-warning-msg">
          Select a Pokémon from the list
        </div>
      </div>
    );
  }
  if (loading)
    return (
      <div className="pokemon-detail">
        <div className="pokemon-detail-warning-msg">Loading...</div>
      </div>
    );
  if (!data) return null;

  return (
    <div className="pokemon-detail">
      <img
        src={data.sprites.front_default}
        alt={data.name}
        className="pokemon-main-img"
      />
      <div className="pokemon-info-title">{data.name}</div>
      <div className="pokemon-types">
        {data.types.map(({ type }) => (
          <span key={type.name} className="pokemon-type">
            {type.name}
          </span>
        ))}
      </div>
      <div className="pokemon-info">
        <div className="pokemon-info-title">Information</div>
        <div className="pokemon-info-list">
          <p>
            <b>Weight:</b> {data.weight / 10} kg
          </p>
          <p>
            <b>Height:</b> {data.height / 10} m
          </p>
          <p>
            <b>Species:</b> {species}
          </p>
          <p>
            <b>Egg Groups:</b> {eggGroups}
          </p>
          <p>
            <b>Abilities:</b>{" "}
            {data.abilities.map((a) => a.ability.name).join(", ")}
          </p>
        </div>
      </div>
      <div className="pokemon-detail-separator"></div>
      <EvolutionChain speciesUrl={data.species.url} />
    </div>
  );
}
