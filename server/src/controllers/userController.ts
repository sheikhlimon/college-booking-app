import { Request, Response } from "express";
import User from "../models/User";

// GET user by email
export const getUserByEmail = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const email = req.params.email;

    // Case-insensitive lookup
    const user = await User.findOne({ email: email.toLowerCase() });

    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    res.json(user);
  } catch (error) {
    console.error("Error fetching user:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// UPDATE or CREATE user by email (upsert)
export const updateUserByEmail = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    // Extract email and update data
    const email = req.params.email;
    const { name, email: newEmail, university, address } = req.body;

    // Build update object with only provided fields
    const updateData: Partial<{
      name: string;
      email: string;
      university: string;
      address: string;
      updatedAt: Date;
    }> = { updatedAt: new Date() };

    if (name !== undefined) updateData.name = name;
    if (newEmail !== undefined) updateData.email = newEmail;
    if (university !== undefined) updateData.university = university;
    if (address !== undefined) updateData.address = address;

    // Case-insensitive lookup + upsert (create if not exists)
    const updatedUser = await User.findOneAndUpdate(
      { email: email.toLowerCase() },
      {
        $set: updateData,
        $setOnInsert: {
          // Set defaults for required fields if creating new user
          name: name || "User",
          email: email.toLowerCase(),
          university: university || "Not specified",
          address: address || "Not specified",
        },
      },
      { new: true, runValidators: true, upsert: true }
    );

    // Return updated/created document
    res.json(updatedUser);
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).json({ message: "Server error" });
  }
};
