import { Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import CartItem from '../models/CartItem';
import Product from '../models/Product';

class CartItemController {
    static addItemToCart = asyncHandler(async (req: Request, res: Response) => {
        const { cartId, productId, quantity } = req.body;

        const product = await Product.findByPk(productId);
        if (!product) {
            res.status(404).json({ message: 'Product not found' });
            return;
        }

        const [cartItem, created] = await CartItem.findOrCreate({
            where: { cartId, productId },
            defaults: { quantity, price: product.price },
        });

        if (!created) {
            cartItem.quantity += quantity;
            await cartItem.save();
        }

        res.status(200).json({ message: 'Item added to cart', cartItem });
    });

    static viewCartItems = asyncHandler(async (req: Request, res: Response) => {
        const { cartId } = req.params;

        const cartItems = await CartItem.findAll({
            where: { cartId },
            include: [Product],
        });

        if (!cartItems.length) {
            res.status(404).json({ message: 'No items found in the cart' });
            return;
        }

        res.status(200).json(cartItems);
    });

    static updateCartItem = asyncHandler(async (req: Request, res: Response) => {
        const { cartItemId } = req.params;
        const { quantity } = req.body;

        const cartItem = await CartItem.findByPk(cartItemId);
        if (!cartItem) {
            res.status(404).json({ message: 'Cart item not found' });
            return;
        }

        cartItem.quantity = quantity;
        await cartItem.save();

        res.status(200).json({ message: 'Cart item updated', cartItem });
    });

    static removeCartItem = asyncHandler(async (req: Request, res: Response) => {
        const { cartItemId } = req.params;

        const cartItem = await CartItem.findByPk(cartItemId);
        if (!cartItem) {
            res.status(404).json({ message: 'Cart item not found' });
            return;
        }

        await cartItem.destroy();
        res.status(200).json({ message: 'Item removed from cart' });
    });
}

export default CartItemController;
