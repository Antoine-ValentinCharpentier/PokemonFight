import { Router } from 'express';
import { teamController } from '../controllers/teamController.js';

const router = Router();

router.post('/', (req, res) => teamController.postTeam(req, res));

export default router;
