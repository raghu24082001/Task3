import Lead from "../modal/LeadModal.js";

// GET /api/leads — All leads with search, filter, pagination
export const getAllLeads = async (req, res) => {
  try {
    const {
      search = "",
      status = "",
      employee = "",
      startDate = "",
      endDate = "",
      page = 1,
      limit = 10,
    } = req.query;

    const query = {};

    // Search by name, mobile, or email
    if (search.trim()) {
      query.$or = [
        { name: { $regex: search.trim(), $options: "i" } },
        { mobile: { $regex: search.trim(), $options: "i" } },
        { email: { $regex: search.trim(), $options: "i" } },
      ];
    }

    // Filter by status
    if (status.trim()) {
      query.status = status.trim();
    }

    // Filter by assigned employee
    if (employee.trim()) {
      query.assignedEmployee = { $regex: employee.trim(), $options: "i" };
    }

    // Filter by date range
    if (startDate || endDate) {
      query.createdDate = {};
      if (startDate) query.createdDate.$gte = new Date(startDate);
      if (endDate) {
        const end = new Date(endDate);
        end.setHours(23, 59, 59, 999);
        query.createdDate.$lte = end;
      }
    }

    const pageNum = Math.max(1, parseInt(page, 10));
    const limitNum = Math.min(100, Math.max(1, parseInt(limit, 10)));
    const skip = (pageNum - 1) * limitNum;

    const [leads, total] = await Promise.all([
      Lead.find(query).sort({ createdDate: -1 }).skip(skip).limit(limitNum),
      Lead.countDocuments(query),
    ]);

    res.status(200).json({
      leads,
      total,
      page: pageNum,
      limit: limitNum,
      totalPages: Math.ceil(total / limitNum),
    });
  } catch (error) {
    console.error("getAllLeads error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// GET /api/leads/:id — Single lead
export const getLeadById = async (req, res) => {
  try {
    const lead = await Lead.findById(req.params.id);
    if (!lead) return res.status(404).json({ message: "Lead not found." });
    res.status(200).json(lead);
  } catch (error) {
    console.error("getLeadById error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// PUT /api/leads/:id — Update lead
export const updateLead = async (req, res) => {
  try {
    const { name, mobile, email, status, assignedEmployee } = req.body;

    if (!name || !email || !mobile || !status || !assignedEmployee) {
      return res.status(400).json({ message: "All fields are required." });
    }

    const updated = await Lead.findByIdAndUpdate(
      req.params.id,
      { name, mobile, email, status, assignedEmployee },
      { new: true, runValidators: true }
    );

    if (!updated) return res.status(404).json({ message: "Lead not found." });

    res.status(200).json(updated);
  } catch (error) {
    console.error("updateLead error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// POST /api/leads/:id/notes — Add note
export const addNote = async (req, res) => {
  try {
    const { note, createdBy } = req.body;

    if (!note || !createdBy) {
      return res.status(400).json({ message: "note and createdBy are required." });
    }

    const lead = await Lead.findById(req.params.id);
    if (!lead) return res.status(404).json({ message: "Lead not found." });

    lead.notes.push({ note, createdBy });
    await lead.save();

    const addedNote = lead.notes[lead.notes.length - 1];
    res.status(201).json(addedNote);
  } catch (error) {
    console.error("addNote error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// PUT /api/leads/:id/notes/:noteId — Edit note
export const editNote = async (req, res) => {
  try {
    const { note } = req.body;

    if (!note) {
      return res.status(400).json({ message: "note text is required." });
    }

    const lead = await Lead.findById(req.params.id);
    if (!lead) return res.status(404).json({ message: "Lead not found." });

    const noteDoc = lead.notes.id(req.params.noteId);
    if (!noteDoc) return res.status(404).json({ message: "Note not found." });

    noteDoc.note = note;
    await lead.save();

    res.status(200).json(noteDoc);
  } catch (error) {
    console.error("editNote error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// DELETE /api/leads/:id/notes/:noteId — Delete note
export const deleteNote = async (req, res) => {
  try {
    const lead = await Lead.findById(req.params.id);
    if (!lead) return res.status(404).json({ message: "Lead not found." });

    const noteDoc = lead.notes.id(req.params.noteId);
    if (!noteDoc) return res.status(404).json({ message: "Note not found." });

    noteDoc.deleteOne();
    await lead.save();

    res.status(200).json({ message: "Note deleted successfully." });
  } catch (error) {
    console.error("deleteNote error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
