import { Router } from 'express';
import { fightController } from '../controllers/fightController.js';

const router = Router();

router.get("/pokemon", (req, res) => fightController.getDefensivePokemon(req, res));

export default router;
