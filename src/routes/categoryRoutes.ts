import { Router } from 'express';
import CategoryController from '../controllers/CategoryController';

const router = Router();

router.post('/', CategoryController.createCategory); 
router.get('/getAllCategories', CategoryController.getAllCategories);
router.get('/:id', CategoryController.getCategoryById); 
router.put('/:id', CategoryController.updateCategory); 
router.delete('/:id', CategoryController.deleteCategory);

export default router;