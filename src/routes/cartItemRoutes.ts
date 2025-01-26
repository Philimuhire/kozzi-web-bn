import express from 'express';
import CartItemController from '../controllers/CartItemController';

const router = express.Router();

router.post('/addItemToCart', CartItemController.addItemToCart);
router.get('/viewCartItems/:cartId', CartItemController.viewCartItems);
router.put('/updateCartItem/:cartItemId', CartItemController.updateCartItem);
router.delete('/removeCartItem/:cartItemId', CartItemController.removeCartItem);

export default router;
