import { Request, Response } from "express";
import College from "../models/College";

export const getAllColleges = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    // Fetch all colleges from collection
    const colleges = await College.find();
    res.json(colleges);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

export const getCollegeById = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    // Get college by MongoDB ID from URL params
    const college = await College.findById(req.params.id);

    if (!college) {
      res.status(404).json({ message: "College not found" });
      return;
    }

    res.json(college);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
