import { Request, Response } from 'express';
import User from '../models/User';

export const updateUserByEmail = async (req: Request, res: Response): Promise<void> => {
  try {
    // Extract email and update data
    const email = req.params.email;
    const { name, university, address } = req.body;

    // Case-insensitive lookup + update
    const updatedUser = await User.findOneAndUpdate(
      { email: email.toLowerCase() },
      { name, university, address, updatedAt: new Date() },
      { new: true, runValidators: true }
    );

    // Check if user exists
    if (!updatedUser) {
      res.status(404).json({ message: 'User not found' });
      return;
    }

    // Return updated document
    res.json(updatedUser);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};