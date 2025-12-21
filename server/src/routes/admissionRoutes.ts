import { Router } from 'express';
import { createAdmission, getAdmissionByEmail } from '../controllers/admissionController';

const router = Router();

// POST /admissions - Create new admission
router.post('/', createAdmission);

// GET /admissions/:email - Get admissions by email
router.get('/:email', getAdmissionByEmail);

export default router;