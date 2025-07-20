# Pokédex App

A functional Pokédex built with React, designed to replicate a provided design and take advantage of the PokéAPI to obtain dynamic data for each Pokémon, including attributes, sprite images and evolutionary tree.

---

## Features

- **Pokémon List:** Scrollable left panel with Pokémon icons, names, and numbers.
- **Infinite Scroll:** Loads Pokémon in batches.
- **Search Functionality:** Search bar filters the Pokémon list.
- **Pokémon Detail:** Shows image, name, types, weight, height, species, egg groups, abilities, and evolution chart.
- **Evolution Chart:** Visualizes the evolution chart of each Pokémon.
- **API Integration:** Uses PokéAPI for all data and images.

---

## Getting Started

### Prerequisites

- **Node.js** (v18+ recommended)
- **npm**

### Installation

1. **Clone the repository:**
   ```sh
   git clone https://github.com/juanpa1220/pokedex-project.git
   cd pokedex-project
   ```

2. **Install dependencies:**
   ```sh
   npm install
   ```

3. **Start development server:**
   ```sh
   npm run dev
   ```

   The app will be available at [http://localhost:5173](http://localhost:5173).

3. **Run tests:**
   ```sh
   npm test

---

## Possible improvements

- **Add error handling** for API/network failures.
- **Accesibility** Implement accesibility measures.
- **Unit testing** Implement unit testing for each component and API requests.
- **Scrolling** Improve scrolling in right pane.
- **Unique number** Maintian a unique number for each Pokemon even when searching.

---

## Credits

- Design and instructions provided by Midware.
- Data and sprites by [PokéAPI](https://pokeapi.co/).
- Developed by Juan Pablo Martínez Brenes.
