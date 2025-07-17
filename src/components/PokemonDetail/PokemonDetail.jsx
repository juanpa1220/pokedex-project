import { useEffect, useState } from "react";
import axios from "axios";
import EvolutionChain from "../EvolutionChain/EvolutionChain";

export default function PokemonDetail({ pokemon }) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!pokemon) {
      setData(null);
      return;
    }
    setLoading(true);
    axios.get(pokemon.url).then((res) => {
      setData(res.data);
      setLoading(false);
    });
  }, [pokemon]);

  if (!pokemon) {
    return (
      <div className="h-full flex items-center justify-center text-gray-500">
        Select a Pokemon from the list
      </div>
    );
  }
  if (loading) return <div>Loading...</div>;
  if (!data) return null;

  return (
    <div className="bg-white rounded-xl h-full p-6 shadow flex flex-col items-center">
      <img
        src={data.sprites.front_default}
        alt={data.name}
        className="w-40 h-40"
      />
      <h2 className="text-3xl font-bold mb-4 capitalize">{data.name}</h2>
      <div className="flex gap-2 mb-4">
        {data.types.map(({ type }) => (
          <span
            key={type.name}
            className="bg-red-100 text-red-800 px-4 py-1 rounded-full capitalize"
          >
            {type.name}
          </span>
        ))}
      </div>
      <div className="text-left w-full max-w-md mb-8">
        <h3 className="font-bold text-lg mb-2">Information</h3>
        <p>
          <b>Weight:</b> {data.weight / 10} kg
        </p>
        <p>
          <b>Height:</b> {data.height / 10} m
        </p>
        <p>
          <b>Abilities:</b>{" "}
          {data.abilities.map((a) => a.ability.name).join(", ")}
        </p>
      </div>
      <EvolutionChain speciesUrl={data.species.url} />
    </div>
  );
}
