import { Router } from 'express';
import { getAllColleges, getCollegeById } from '../controllers/collegeController';

// Create router instance
const router = Router();

// Map HTTP routes to controller functions
router.get('/', getAllColleges);
router.get('/:id', getCollegeById);

export default router;