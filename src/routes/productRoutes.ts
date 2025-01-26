import { Router } from 'express';
import ProductController from '../controllers/ProductController';
import multer from 'multer';

const router = Router();
const upload = multer();

router.post('/addProduct', upload.single('image'), ProductController.createProduct); 
router.get('/getProduct/:id', ProductController.getProductById); 
router.put('/updateProduct/:id', upload.single('image'), ProductController.createProduct); 
router.delete('/deleteProduct/:id', ProductController.deleteProduct); 

export default router;