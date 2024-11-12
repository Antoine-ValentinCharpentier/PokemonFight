import { pokedexService } from "../services/pokedexService.js";

export class PokedexController {
  getPokedex(req, res) {
    const dataPokedex = pokedexService.getPokedex();
    return res.status(200).json(dataPokedex);
  }
}

export const pokedexController = new PokedexController();
