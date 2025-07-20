import { render, screen, waitFor } from "@testing-library/react";
import { vi } from "vitest";
import axios from "axios";
import PokemonDetail from "./PokemonDetail";

const bulbasaurData = {
  name: "bulbasaur",
  sprites: { front_default: "bulbasaur.png" },
  types: [{ type: { name: "grass" } }, { type: { name: "poison" } }],
  abilities: [
    { ability: { name: "overgrow" } },
    { ability: { name: "chlorophyll" } },
  ],
  weight: 152,
  height: 24,
  species: { url: "/species-url" },
};

const speciesData = {
  egg_groups: [{ name: "monster" }, { name: "grass" }],
  genera: [{ genus: "Seed", language: { name: "en" } }],
};

describe("PokemonDetail", () => {
  beforeEach(() => {
    vi.spyOn(axios, "get").mockImplementation((url) => {
      if (url === "https://pokeapi.co/api/v2/pokemon/1/") {
        return Promise.resolve({ data: bulbasaurData });
      }
      if (url === "/species-url") {
        return Promise.resolve({ data: speciesData });
      }

      return Promise.resolve({ data: speciesData });
    });
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("shows warning if no pokemon selected", () => {
    render(<PokemonDetail pokemon={null} />);
    expect(screen.getByText(/select a pokémon/i)).toBeInTheDocument();
  });

  it("renders pokemon details", async () => {
    render(
      <PokemonDetail
        pokemon={{
          name: "bulbasaur",
          url: "https://pokeapi.co/api/v2/pokemon/1/",
        }}
      />
    );
    await waitFor(() => {
      expect(screen.getByText(/bulbasaur/i)).toBeInTheDocument();
      expect(screen.getAllByText(/grass/i).length).toBeGreaterThan(0);
      expect(screen.getByText(/poison/i)).toBeInTheDocument();
      expect(screen.getByText(/monster, grass/i)).toBeInTheDocument();
      expect(screen.getByText(/seed/i)).toBeInTheDocument();
      expect(screen.getByText(/overgrow, chlorophyll/i)).toBeInTheDocument();
    });
  });
});
