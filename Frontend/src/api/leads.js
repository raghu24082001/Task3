import api from "./axios.js";

/**
 * Fetch paginated, filtered leads.
 * @param {Object} params - { search, status, employee, startDate, endDate, page, limit }
 */
export const getLeads = (params = {}) => {
  return api.get("/leads", { params });
};

/**
 * Fetch a single lead by ID.
 * @param {string} id
 */
export const getLead = (id) => {
  return api.get(`/leads/${id}`);
};

/**
 * Update a lead by ID.
 * @param {string} id
 * @param {Object} data - { name, mobile, email, status, assignedEmployee }
 */
export const updateLead = (id, data) => {
  return api.put(`/leads/${id}`, data);
};

/**
 * Add a note to a lead.
 * @param {string} leadId
 * @param {Object} data - { note, createdBy }
 */
export const addNote = (leadId, data) => {
  return api.post(`/leads/${leadId}/notes`, data);
};

/**
 * Edit a note on a lead.
 * @param {string} leadId
 * @param {string} noteId
 * @param {Object} data - { note }
 */
export const editNote = (leadId, noteId, data) => {
  return api.put(`/leads/${leadId}/notes/${noteId}`, data);
};

/**
 * Delete a note from a lead.
 * @param {string} leadId
 * @param {string} noteId
 */
export const deleteNote = (leadId, noteId) => {
  return api.delete(`/leads/${leadId}/notes/${noteId}`);
};
