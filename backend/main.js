import express from "express";
import cors from "cors";

import { teamController } from "./controllers/teamController.js";
import { pokedexController } from "./controllers/pokedexController.js";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.get("/pokedex", (req, res) => pokedexController.getPokedex(req, res));

app.post("/team", (req, res) => teamController.postTeam(req, res));

app.listen(PORT, () => {
  console.log(`Serveur en cours d'exécution sur http://localhost:${PORT}`);
});
