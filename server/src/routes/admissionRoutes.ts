import { Router } from 'express';
import { createAdmission, getAdmissionByEmail } from '../controllers/admissionController';
import { authMiddleware } from '../middleware/auth';

const router = Router();

// POST /admissions - Create new admission (requires auth)
router.post('/', authMiddleware, createAdmission);

// GET /admissions/:email - Get admissions by email (requires auth)
router.get('/:email', authMiddleware, getAdmissionByEmail);

export default router;