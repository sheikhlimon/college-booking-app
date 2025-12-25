import { Request, Response } from 'express';
import User from '../models/User';

export const updateUserByEmail = async (req: Request, res: Response): Promise<void> => {
  try {
    // Extract email and update data
    const email = req.params.email;
    const { name, email: newEmail, university, address } = req.body;

    // Build update object with only provided fields
    const updateData: any = { updatedAt: new Date() };
    if (name !== undefined) updateData.name = name;
    if (newEmail !== undefined) updateData.email = newEmail;
    if (university !== undefined) updateData.university = university;
    if (address !== undefined) updateData.address = address;

    // Case-insensitive lookup + update
    const updatedUser = await User.findOneAndUpdate(
      { email: email.toLowerCase() },
      updateData,
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