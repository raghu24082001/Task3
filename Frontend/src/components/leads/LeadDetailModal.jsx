import { useState, useEffect, useCallback } from "react";
import Modal from "../common/Modal.jsx";
import StatusBadge from "../common/StatusBadge.jsx";
import NoteCard from "../notes/NoteCard.jsx";
import AddNoteForm from "../notes/AddNoteForm.jsx";
import ConfirmDialog from "../common/ConfirmDialog.jsx";
import Loader from "../common/Loader.jsx";
import { getLead, addNote, editNote, deleteNote } from "../../api/leads.js";
import { formatDate } from "../../utils/formatDate.js";

function DetailRow({ label, value }) {
  return (
    <div className="flex flex-col gap-0.5">
      <span className="text-xs font-medium text-slate-400 uppercase tracking-wider">{label}</span>
      <span className="text-sm text-slate-800 font-medium">{value || "—"}</span>
    </div>
  );
}

export default function LeadDetailModal({ leadId, isOpen, onClose }) {
  const [lead, setLead] = useState(null);
  const [loading, setLoading] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(null); // noteId
  const [deleting, setDeleting] = useState(false);

  const fetchLead = useCallback(async () => {
    if (!leadId) return;
    setLoading(true);
    try {
      const { data } = await getLead(leadId);
      setLead(data);
    } catch {
      setLead(null);
    } finally {
      setLoading(false);
    }
  }, [leadId]);

  useEffect(() => {
    if (isOpen) fetchLead();
  }, [isOpen, fetchLead]);

  const handleAddNote = useCallback(async (noteText, createdBy) => {
    const { data } = await addNote(leadId, { note: noteText, createdBy });
    setLead((prev) => ({ ...prev, notes: [...prev.notes, data] }));
  }, [leadId]);

  const handleEditNote = useCallback(async (noteId, noteText) => {
    const { data } = await editNote(leadId, noteId, { note: noteText });
    setLead((prev) => ({
      ...prev,
      notes: prev.notes.map((n) => (n._id === noteId ? data : n)),
    }));
  }, [leadId]);

  const handleDeleteNote = useCallback((noteId) => {
    setConfirmDelete(noteId);
  }, []);

  const confirmDeleteNote = useCallback(async () => {
    if (!confirmDelete) return;
    setDeleting(true);
    try {
      await deleteNote(leadId, confirmDelete);
      setLead((prev) => ({
        ...prev,
        notes: prev.notes.filter((n) => n._id !== confirmDelete),
      }));
    } finally {
      setDeleting(false);
      setConfirmDelete(null);
    }
  }, [leadId, confirmDelete]);

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose} title="Lead Details" maxWidth="max-w-2xl">
        {loading ? (
          <div className="p-6"><Loader /></div>
        ) : !lead ? (
          <div className="p-6 text-center text-slate-500">Lead not found.</div>
        ) : (
          <div className="flex flex-col gap-0">
            {/* Header banner */}
            <div className="px-6 py-5 bg-gradient-to-r from-indigo-50 to-purple-50 border-b border-slate-100">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white text-xl font-bold shadow-lg">
                  {lead.name?.charAt(0)?.toUpperCase()}
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-800">{lead.name}</h3>
                  <p className="text-sm text-slate-500">{lead.email}</p>
                  <div className="mt-1">
                    <StatusBadge status={lead.status} />
                  </div>
                </div>
              </div>
            </div>

            {/* Details grid */}
            <div className="px-6 py-5 grid grid-cols-1 sm:grid-cols-2 gap-5 border-b border-slate-100">
              <DetailRow label="Mobile" value={lead.mobile} />
              <DetailRow label="Email" value={lead.email} />
              <DetailRow label="Address" value={lead.address} />
              <DetailRow label="Course Interested" value={lead.courseInterested} />
              <DetailRow label="Lead Source" value={lead.leadSource} />
              <DetailRow label="Assigned Employee" value={lead.assignedEmployee} />
              <DetailRow label="Created Date" value={formatDate(lead.createdDate)} />
              <DetailRow label="Current Status" value={
                <StatusBadge status={lead.status} />
              } />
            </div>

            {/* Notes section */}
            <div className="px-6 py-5">
              <div className="flex items-center justify-between mb-4">
                <h4 className="text-sm font-semibold text-slate-700">
                  Notes
                  {lead.notes?.length > 0 && (
                    <span className="ml-2 bg-indigo-100 text-indigo-600 text-xs px-2 py-0.5 rounded-full font-medium">
                      {lead.notes.length}
                    </span>
                  )}
                </h4>
              </div>

              {/* Add note */}
              <div className="mb-4">
                <AddNoteForm onAdd={handleAddNote} />
              </div>

              {/* Notes list */}
              <div className="flex flex-col gap-3">
                {lead.notes?.length === 0 ? (
                  <p className="text-sm text-slate-400 text-center py-4">No notes yet. Add the first one above.</p>
                ) : (
                  [...lead.notes].reverse().map((note) => (
                    <NoteCard
                      key={note._id}
                      note={note}
                      onEdit={handleEditNote}
                      onDelete={handleDeleteNote}
                    />
                  ))
                )}
              </div>
            </div>
          </div>
        )}
      </Modal>

      <ConfirmDialog
        isOpen={!!confirmDelete}
        message="This note will be permanently deleted."
        onConfirm={confirmDeleteNote}
        onCancel={() => setConfirmDelete(null)}
        loading={deleting}
      />
    </>
  );
}
