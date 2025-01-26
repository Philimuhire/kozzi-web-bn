import { Router } from 'express';
import ContactController from '../controllers/ContactController';

const router = Router();

router.post('/sendMessage', ContactController.sendMessage);

export default router;