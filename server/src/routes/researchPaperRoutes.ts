import { Router } from 'express';
import {
  createResearchPaper,
  getAllPapers,
  getPapersByCollege,
  getPaperById
} from '../controllers/researchPaperController';

const router = Router();

// POST /papers - Create new research paper
router.post('/', createResearchPaper);

// GET /papers - Get all papers (with optional category/college filters)
router.get('/', getAllPapers);

// GET /papers/college/:collegeId - Get papers by college
router.get('/college/:collegeId', getPapersByCollege);

// GET /papers/:id - Get paper by ID
router.get('/:id', getPaperById);

export default router;
