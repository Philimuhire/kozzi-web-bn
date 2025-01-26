import { Request, Response } from 'express';
import Category from '../models/Category';

class CategoryController {
    static async createCategory(req: Request, res: Response) {
        try {
            const category = await Category.create(req.body);
            res.status(201).json(category);
        } catch (error: any) {
            res.status(400).json({ error: error.message });
        }
    }

    static async getAllCategories(req: Request, res: Response) {
        try {
            const categories = await Category.findAll();
            res.status(200).json(categories);
        } catch (error: any) {
            res.status(500).json({ error: error.message });
        }
    }

    static async getCategoryById(req: Request, res: Response) {
        try {
            const category = await Category.findByPk(req.params.id);
            if (category) {
                res.status(200).json(category);
            } else {
                res.status(404).json({ error: 'Category not found' });
            }
        } catch (error: any) {
            res.status(500).json({ error: error.message });
        }
    }

    static async updateCategory(req: Request, res: Response) {
        try {
            const [updated] = await Category.update(req.body, {
                where: { id: req.params.id },
            });
            if (updated) {
                const updatedCategory = await Category.findByPk(req.params.id);
                res.status(200).json(updatedCategory);
            } else {
                res.status(404).json({ error: 'Category not found' });
            }
        } catch (error: any) {
            res.status(400).json({ error: error.message });
        }
    }

    static async deleteCategory(req: Request, res: Response) {
        try {
            const deleted = await Category.destroy({
                where: { id: req.params.id },
            });
            if (deleted) {
                res.status(204).send();
            } else {
                res.status(404).json({ error: 'Category not found' });
            }
        } catch (error: any) {
            res.status(500).json({ error: error.message });
        }
    }
}

export default CategoryController;