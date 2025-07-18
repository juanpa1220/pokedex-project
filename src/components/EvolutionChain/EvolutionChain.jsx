import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './EvolutionChain.css';

function getEvolutionArray(chain) {
  const evoArray = [];
  let current = chain;
  while (current) {
    evoArray.push({
      name: current.species.name,
      url: current.species.url,
    });
    if (current.evolves_to && Array.isArray(current.evolves_to) && current.evolves_to.length > 0) {
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
    axios.get(speciesUrl)
      .then(res => res.data.evolution_chain.url)
      .then(chainUrl => axios.get(chainUrl))
      .then(res => {
        const evoArr = getEvolutionArray(res.data.chain);
        setEvolution(evoArr);
        return Promise.all(
          evoArr.map(evo =>
            axios.get(`https://pokeapi.co/api/v2/pokemon/${evo.name}`)
              .then(r => [evo.name, r.data.sprites.front_default])
          )
        );
      })
      .then(results => {
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
  if (loading) return <div className="evolution-chain-container">Loading Evolution Chain...</div>;
  if (!evolution.length) return <div className="evolution-chain-container">No evolution data available.</div>;

  return (
    <div className="evolution-chain-container">
      <div className="evolution-chain-title">Evolution Chain</div>
      <div className="evolution-chain-list">
        {evolution.map((evo, idx) => (
          <React.Fragment key={evo.name}>
            <div className="evolution-pokemon">
              <img
                src={images[evo.name]}
                alt={evo.name}
                className="evolution-pokemon-img"
              />
              <span className="evolution-pokemon-name">{evo.name}</span>
            </div>
            {idx !== evolution.length - 1 && (
              <span className="evolution-arrow">→</span>
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}