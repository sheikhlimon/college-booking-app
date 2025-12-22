import { Request, Response } from 'express';
import ResearchPaper from '../models/ResearchPaper';

export const createResearchPaper = async (req: Request, res: Response): Promise<void> => {
  try {
    const { collegeId, title, authors, abstract, link, category, publishDate, citations } = req.body;

    const paper = new ResearchPaper({
      collegeId,
      title,
      authors,
      abstract,
      link,
      category,
      publishDate,
      citations
    });

    const savedPaper = await paper.save();
    res.status(201).json(savedPaper);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

export const getAllPapers = async (req: Request, res: Response): Promise<void> => {
  try {
    const { category, college } = req.query;

    let query: any = {};

    if (category) {
      query.category = category;
    }

    if (college) {
      query.collegeId = college;
    }

    const papers = await ResearchPaper.find(query)
      .populate('collegeId', 'name image')
      .sort({ publishDate: -1 });

    res.json(papers);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

export const getPapersByCollege = async (req: Request, res: Response): Promise<void> => {
  try {
    const { collegeId } = req.params;

    const papers = await ResearchPaper.find({ collegeId })
      .sort({ publishDate: -1 });

    res.json(papers);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

export const getPaperById = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;

    const paper = await ResearchPaper.findById(id)
      .populate('collegeId', 'name image gallery events sports');

    if (!paper) {
      res.status(404).json({ message: 'Paper not found' });
      return;
    }

    res.json(paper);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};
