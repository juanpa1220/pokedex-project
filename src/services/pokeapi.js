import axios from "axios";

const API_URL = "https://pokeapi.co/api/v2";

export const getPokemonList = async (offset = 0, limit = 20) => {
  const res = await axios.get(
    `${API_URL}/pokemon?offset=${offset}&limit=${limit}`
  );
  return res.data.results;
};

export const getTotalPokemonCount = async () => {
  const res = await axios.get(`${API_URL}/pokemon?limit=1`);
  return res.data.count;
};

export const getSpriteUrl = (idx) => {
  return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${idx}.png`;
};
