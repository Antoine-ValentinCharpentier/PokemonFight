import { Router } from 'express';
import { pokedexController } from '../controllers/pokedexController.js';

const router = Router();

router.get('/', (req, res) => pokedexController.getPokedex(req, res));

export default router;
