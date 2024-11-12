import express from "express";
import cors from "cors";
import pokedexRoutes from './routes/pokedexRoutes.js';
import teamRoutes from './routes/teamRoutes.js';
import fightRoutes from './routes/fightRoutes.js';

const app = express();

app.use(cors());
app.use(express.json());

app.use("/pokedex", pokedexRoutes);
app.use("/team", teamRoutes);
app.use("/fight", fightRoutes);

export default app;
