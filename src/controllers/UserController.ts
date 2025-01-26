import { Request, Response } from 'express';
import User from '../models/User'; 
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export const registerUser  = async (req: Request, res: Response): Promise<void> => {
    const { username, email, password } = req.body;
    try {
      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser  = await User.create({ username, email, password: hashedPassword });
      res.status(201).json({ message: 'User  registered successfully', userId: newUser .id, role: newUser .role });
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
};

export const loginUser = async (req: Request, res: Response): Promise<void> => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ where: { email } });
    if (!user) {
      res.status(400).json({ message: 'Invalid credentials' });
      return;
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      res.status(400).json({ message: 'Invalid credentials' });
      return;
    }

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET || 'secretkey12345', { expiresIn: '1h' });
    res.json({ token });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const getUserProfile = async (req: Request, res: Response): Promise<void> => {
    const { user } = req; 
    if (!user) {
      res.status(401).json({ message: 'Unauthorized' });
      return;
    }
  
    try {
      const foundUser = await User.findByPk(user.id, { attributes: { exclude: ['password'] } });
      if (!foundUser) {
        res.status(404).json({ message: 'User not found' });
        return;
      }
      res.json(foundUser);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  };
  

export const getUserById = async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
  
    try {
      const user = await User.findByPk(id, { attributes: { exclude: ['password'] } }); 
      if (!user) {
        res.status(404).json({ message: 'User  not found' });
        return;
      }
      res.json(user);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  };

export const getAllUsers = async (req: Request, res: Response): Promise<void> => {
  try {
    const users = await User.findAll({ attributes: { exclude: ['password'] } }); 
    res.json(users);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const updateUser = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  const { username, email, password } = req.body;

  try {
    const user = await User.findByPk(id);
    if (!user) {
      res.status(404).json({ message: 'User not found' });
      return;
    }

    if (password) {
      user.password = await bcrypt.hash(password, 10); 
    }
    user.username = username || user.username; 
    user.email = email || user.email; 

    await user.save();
    res.json({ message: 'User updated successfully' });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteUser = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;

  try {
    const user = await User.findByPk(id);
    if (!user) {
      res.status(404).json({ message: 'User not found' });
      return;
    }

    await user.destroy();
    res.json({ message: 'User deleted successfully' });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};
