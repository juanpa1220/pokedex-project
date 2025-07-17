import React, { useEffect, useState } from "react";
import axios from "axios";

function getEvolutionArray(chain) {
  const evoArray = [];
  let current = chain;
  while (current) {
    evoArray.push({
      name: current.species.name,
      url: current.species.url,
    });
    if (
      current.evolves_to &&
      Array.isArray(current.evolves_to) &&
      current.evolves_to.length > 0
    ) {
      current = current.evolves_to[0];
    } else {
      current = null;
    }
  }
  return evoArray;
}

export default function EvolutionChain({ speciesUrl }) {
  const [evolution, setEvolution] = useState([]);
  const [images, setImages] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!speciesUrl) return;
    setLoading(true);
    // Get species data to find the evolution_chain URL
    axios
      .get(speciesUrl)
      .then((res) => res.data.evolution_chain.url)
      // Fetch the evolution chain
      .then((chainUrl) => axios.get(chainUrl))
      .then((res) => {
        const evoArr = getEvolutionArray(res.data.chain);
        setEvolution(evoArr);
        return Promise.all(
          evoArr.map((evo) =>
            axios
              .get(`https://pokeapi.co/api/v2/pokemon/${evo.name}`)
              .then((r) => [evo.name, r.data.sprites.front_default])
          )
        );
      })
      .then((results) => {
        const imgs = {};
        results.forEach(([name, img]) => {
          imgs[name] = img;
        });
        setImages(imgs);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [speciesUrl]);

  if (!speciesUrl) return null;
  if (loading) return <div>Loading Evolution Chain...</div>;
  if (!evolution.length) return <div>No evolution data available.</div>;

  return (
    <div className="mt-8">
      <h3 className="text-xl font-bold mb-4 text-center">Evolution Chain</h3>
      <div className="flex items-center justify-center gap-4">
        {evolution.map((evo, idx) => (
          <React.Fragment key={evo.name}>
            <div className="flex flex-col items-center">
              <img
                src={images[evo.name]}
                alt={evo.name}
                className="w-24 h-24 mb-2"
              />
              <span className="capitalize font-medium">{evo.name}</span>
            </div>
            {idx !== evolution.length - 1 && (
              <span className="text-2xl mx-2">→</span>
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}
