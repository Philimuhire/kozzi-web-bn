import express from 'express';
import asyncHandler from 'express-async-handler';
import CartController from '../controllers/CartController';

const router = express.Router();

router.post(
    '/createCart',
    asyncHandler(async (req, res, next) => {
        await CartController.createCart(req, res);
    })
);

router.post(
    '/addItemToCart',
    asyncHandler(async (req, res, next) => {
        await CartController.addItemToCart(req, res);
    })
);

router.get(
    '/viewCart/:userId',
    asyncHandler(async (req, res, next) => {
        await CartController.viewCart(req, res);
    })
);

router.put(
    '/updateCartItem/:cartItemId',
    asyncHandler(async (req, res, next) => {
        await CartController.updateCartItem(req, res);
    })
);

router.delete(
    '/removeCartItem/:cartItemId',
    asyncHandler(async (req, res, next) => {
        await CartController.removeCartItem(req, res);
    })
);

export default router;
