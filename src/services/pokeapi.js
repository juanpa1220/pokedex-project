import axios from "axios";

const API_URL = "https://pokeapi.co/api/v2";

export function getPokemonList(offset = 0, limit = 20) {
  return axios
    .get(`${API_URL}/pokemon?offset=${offset}&limit=${limit}`)
    .then((res) => res.data.results);
}
