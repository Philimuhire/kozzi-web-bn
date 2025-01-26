import { Router } from 'express';
import { createReview, getReviewsByProduct } from '../controllers/ReviewController'; 
import { authenticateUser } from '../middleware/authMiddleware';

const router = Router();

router.post('/createReview', createReview);

router.get('/:productId', getReviewsByProduct);

export default router;