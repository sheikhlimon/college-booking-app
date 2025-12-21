import { Request, Response } from 'express';
import Admission from '../models/Admission';

export const createAdmission = async (req: Request, res: Response): Promise<void> => {
  try {
    // Extract admission data from request body
    const {
      candidateName,
      subject,
      email,
      phone,
      address,
      dob,
      image,
      collegeId
    } = req.body;

    // Create and save new admission document
    const admission = new Admission({
      candidateName,
      subject,
      email,
      phone,
      address,
      dob,
      image,
      collegeId
    });

    const savedAdmission = await admission.save();

    // Return created admission with 201 status
    res.status(201).json(savedAdmission);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

export const getAdmissionByEmail = async (req: Request, res: Response): Promise<void> => {
  try {
    // Get email from URL parameters
    const email = req.params.email;

    // Find admissions and populate college details
    const admissions = await Admission.find({ email })
      .populate('collegeId');

    res.json(admissions);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};