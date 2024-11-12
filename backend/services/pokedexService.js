import fs from "fs/promises";
import { pathPokedex } from "../config.js";

export class PokedexService {
  constructor() {
    this.pokedex = [];
  }

  async initialize(pathPokedex) {
    try {
      const dataPokedex = await fs.readFile(pathPokedex, "utf-8");
      this.pokedex = JSON.parse(dataPokedex); 
    } catch (error) {
      console.error("Error loading Pokédex data:", error);
      this.pokedex = []; 
    }
  }

  getPokedex() {
    return this.pokedex;
  }

  getPokemonById(id) {
    if (id < 0 || id >= this.pokedex.length) {
      throw new Error("Invalid Pokémon ID");
    }
    return this.pokedex[id];
  }

  getRandomPokemon() {
    if (this.pokedex.length === 0) {
      throw new Error("The Pokédex is empty");
    }
    const randomIndex = Math.floor(Math.random() * this.pokedex.length);
    return this.pokedex[randomIndex];
  }
}

export const pokedexService = new PokedexService();
await pokedexService.initialize(pathPokedex);
