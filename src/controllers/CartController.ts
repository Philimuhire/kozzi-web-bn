import { Request, Response } from 'express';
import Cart from '../models/Cart';
import CartItem from '../models/CartItem';
import Product from '../models/Product';

class CartController {
    static async createCart(req: Request, res: Response): Promise<void> {
        const { userId } = req.body;

        try {
            const cart = await Cart.create({ userId });
            res.status(201).json({ message: 'Cart created', cart });
        } catch (error: any) {
            res.status(500).json({ error: error.message || 'Failed to create cart' });
        }
    }

    static async addItemToCart(req: Request, res: Response): Promise<Response> {
        const { cartId, productId, quantity, userId } = req.body;
    
        try {
            if (!userId) {
                return res.status(400).json({ message: 'UserId is required' });
            }
    
            const product = await Product.findByPk(productId);
            if (!product) {
                return res.status(404).json({ message: 'Product not found' });
            }
    
            const cart = await Cart.findOne({ where: { id: cartId, userId } });
            if (!cart) {
                return res.status(404).json({ message: 'Cart not found or user does not own the cart' });
            }
    
            const [cartItem, created] = await CartItem.findOrCreate({
                where: { cartId, productId },
                defaults: { quantity, price: product.price },
            });
    
            if (!created) {
                cartItem.quantity += quantity;
                await cartItem.save();
            }
    
            return res.status(200).json({ message: 'Item added to cart', cartItem });
        } catch (error: any) {
            return res.status(500).json({ error: error.message || 'Failed to add item to cart' });
        }
    }
    

    static async viewCart(req: Request, res: Response): Promise<void> {
        const { userId } = req.params;

        try {
            const cart = await Cart.findOne({
                where: { userId },
                include: [{ model: CartItem, include: [Product] }],
            });

            if (!cart) {
                res.status(404).json({ message: 'Cart not found' });
                return;
            }

            res.status(200).json(cart);
        } catch (error: any) {
            res.status(500).json({ error: error.message || 'Failed to retrieve cart' });
        }
    }

    static async updateCartItem(req: Request, res: Response): Promise<void> {
        const { cartItemId } = req.params;
        const { quantity } = req.body;

        try {
            const cartItem = await CartItem.findByPk(cartItemId);
            if (!cartItem) {
                res.status(404).json({ message: 'Cart item not found' });
                return;
            }

            cartItem.quantity = quantity;
            await cartItem.save();
            res.status(200).json({ message: 'Cart item updated', cartItem });
        } catch (error: any) {
            res.status(500).json({ error: error.message || 'Failed to update cart item' });
        }
    }

    static async removeCartItem(req: Request, res: Response): Promise<void> {
        const { cartItemId } = req.params;

        try {
            const cartItem = await CartItem.findByPk(cartItemId);
            if (!cartItem) {
                res.status(404).json({ message: 'Cart item not found' });
                return;
            }

            await cartItem.destroy();
            res.status(200).json({ message: 'Item removed from cart' });
        } catch (error: any) {
            res.status(500).json({ error: error.message || 'Failed to remove item from cart' });
        }
    }
}

export default CartController;
