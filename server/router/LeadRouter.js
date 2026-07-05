import express from "express";
import {
  getAllLeads,
  getLeadById,
  updateLead,
  addNote,
  editNote,
  deleteNote,
} from "../controller/LeadControl.js";

const LeadRouter = express.Router();

// GET /api/leads?search=&status=&employee=&startDate=&endDate=&page=1&limit=10
LeadRouter.get("/", getAllLeads);

// GET /api/leads/:id
LeadRouter.get("/:id", getLeadById);

// PUT /api/leads/:id
LeadRouter.put("/:id", updateLead);

// POST /api/leads/:id/notes
LeadRouter.post("/:id/notes", addNote);

// PUT /api/leads/:id/notes/:noteId
LeadRouter.put("/:id/notes/:noteId", editNote);

// DELETE /api/leads/:id/notes/:noteId
LeadRouter.delete("/:id/notes/:noteId", deleteNote);

export default LeadRouter;
