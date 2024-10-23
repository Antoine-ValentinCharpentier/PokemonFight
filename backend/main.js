import express from "express";
import cors from "cors";
import fs from "fs/promises";
import { pathPokedex } from "./config.js";
import { teamController } from "./controllers/teamController.js";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.get("/pokedex", async (req, res) => {
  try {
    const dataPokedex = await fs.readFile(pathPokedex, "utf-8");
    res.status(200).json(JSON.parse(dataPokedex));
  } catch (error) {
    console.error("Error reading the pokedex:", error);
    res.status(500).json({ message: "Error reading the pokedex" });
  }
});

app.post("/team", (req, res) => teamController.postTeam(req, res));

app.listen(PORT, () => {
  console.log(`Serveur en cours d'exécution sur http://localhost:${PORT}`);
});
