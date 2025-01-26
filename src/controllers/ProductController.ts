import { Request, Response } from 'express';
import Product from '../models/Product';
import cloudinary from '../config/cloudinaryConfig';
import multer from 'multer';

const storage = multer.memoryStorage(); 
const upload = multer({ storage: storage });

class ProductController {
    static async createProduct(req: Request, res: Response) {
        try {
            const file = req.file; 
            let imageUrl = '';

            if (file) {
                const result = await new Promise((resolve, reject) => {
                    const stream = cloudinary.v2.uploader.upload_stream(
                        { resource_type: 'auto' },
                        (error, result) => {
                            if (error) {
                                return reject(error);
                            }
                            resolve(result);
                        }
                    );
                    stream.end(file.buffer); 
                });

                imageUrl = (result as any).secure_url; 
            }

            const productData = {
                ...req.body,
                imageUrl, 
            };

            const product = await Product.create(productData);
            res.status(201).json(product);
        } catch (error: any) {
            res.status(400).json({ error: error.message });
        }
    }

    static async getAllProducts(req: Request, res: Response) {
        try {
            const products = await Product.findAll();
            res.status(200).json(products);
        } catch (error: any) {
            res.status(500).json({ error: error.message });
        }
    }

    static async getProductById(req: Request, res: Response) {
        try {
            const product = await Product.findByPk(req.params.id);
            if (product) {
                res.status(200).json(product);
            } else {
                res.status(404).json({ error: 'Product not found' });
            }
        } catch (error: any) {
            res.status(500).json({ error: error.message });
        }
    }

    static async updateProduct(req: Request, res: Response) {
        try {
            const file = req.file; 
            let imageUrl = '';

            if (file) {
                const result = await new Promise((resolve, reject) => {
                    const stream = cloudinary.v2.uploader.upload_stream(
                        { resource_type: 'auto' },
                        (error, result) => {
                            if (error) {
                                return reject(error);
                            }
                            resolve(result);
                        }
                    );
                    stream.end(file.buffer); 
                });

                imageUrl = (result as any).secure_url;
            }

            const productData = {
                ...req.body,
                ...(imageUrl && { imageUrl }), 
            };

            const [updated] = await Product.update(productData, {
                where: { id: req.params.id },
            });

            if (updated) {
                const updatedProduct = await Product.findByPk(req.params.id);
                res.status(200).json(updatedProduct);
            } else {
                res.status(404).json({ error: 'Product not found' });
            }
        } catch (error: any) {
            res.status(400).json({ error: error.message });
        }
    }

    static async deleteProduct(req: Request, res: Response) {
        try {
            const deleted = await Product.destroy({
                where: { id: req.params.id },
            });
            if (deleted) {
                res.status(204).send();
            } else {
                res.status(404).json({ error: 'Product not found' });
            }
        } catch (error: any) {
            res.status(500).json({ error: error.message });
        }
    }
}

export default ProductController;