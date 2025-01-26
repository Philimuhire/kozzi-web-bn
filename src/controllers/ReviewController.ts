import { Request, Response } from 'express';
import Review from '../models/Review';
import Product from '../models/Product'; 

export const createReview = async (req: Request, res: Response): Promise<void> => {
  const { productId, userId, rating, comment } = req.body; 

  if (!userId) {
    res.status(400).json({ message: 'User ID is required' });
    return;
  }

  if (rating < 1 || rating > 5) {
    res.status(400).json({ message: 'Rating must be between 1 and 5' });
    return;
  }

  try {
    const product = await Product.findByPk(productId);
    if (!product) {
      res.status(404).json({ message: 'Product not found' });
      return;
    }

    const review = await Review.create({ productId, userId, rating, comment });
    res.status(201).json(review);
  } catch (error: any) {
    res.status(500).json({ message: 'Internal server error', details: error.message });
  }
};

export const getReviewsByProduct = async (req: Request, res: Response): Promise<void> => {
  const { productId } = req.params;

  try {
    const product = await Product.findByPk(productId);
    if (!product) {
      res.status(404).json({ message: 'Product not found' });
      return;
    }

    const reviews = await Review.findAll({ where: { productId } });

    if (!reviews || reviews.length === 0) {
      res.status(404).json({ message: 'No reviews found for this product' });
      return;
    }

    res.json(reviews);
  } catch (error: any) {
    res.status(500).json({ message: 'Internal server error', details: error.message });
  }
};
