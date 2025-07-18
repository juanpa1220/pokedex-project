import React from 'react';
import PokemonList from '../components/PokemonList/PokemonList';
import PokemonDetail from '../components/PokemonDetail/PokemonDetail';
import '../styles/main.css';

export default function Home() {
  const [selectedPokemon, setSelectedPokemon] = React.useState(null);

  return (
    <div className="main-panels">
      <div className="panel left-panel">
        <PokemonList onSelect={setSelectedPokemon} selected={selectedPokemon} />
      </div>
      <div className="panel right-panel">
        <PokemonDetail pokemon={selectedPokemon} />
      </div>
    </div>
  );
}