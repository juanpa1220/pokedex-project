import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { vi } from "vitest";
import * as pokeapi from "../../services/pokeapi";
import PokemonList from "./PokemonList";

const mockPokemons = [
  { name: "bulbasaur", url: "https://pokeapi.co/api/v2/pokemon/1/" },
  { name: "ivysaur", url: "https://pokeapi.co/api/v2/pokemon/2/" },
];

describe("PokemonList", () => {
  beforeEach(() => {
    vi.spyOn(pokeapi, "getPokemonList").mockResolvedValue(mockPokemons);
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("renders pokemons list", async () => {
    render(<PokemonList onSelect={() => {}} selected={null} search="" />);
    await waitFor(() => {
      expect(screen.getByText(/bulbasaur/i)).toBeInTheDocument();
      expect(screen.getByText(/ivysaur/i)).toBeInTheDocument();
    });
  });

  it("calls onSelect when a pokemon is clicked", async () => {
    const onSelect = vi.fn();
    render(<PokemonList onSelect={onSelect} selected={null} search="" />);
    await waitFor(() => screen.getByText(/bulbasaur/i));
    fireEvent.click(screen.getByText(/bulbasaur/i));
    expect(onSelect).toHaveBeenCalledWith(mockPokemons[0]);
  });
});
