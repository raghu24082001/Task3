import { useState, useCallback } from "react";
import Button from "../common/Button.jsx";
import { formatDate } from "../../utils/formatDate.js";

export default function NoteCard({ note, onEdit, onDelete }) {
  const [editing, setEditing] = useState(false);
  const [editText, setEditText] = useState(note.note);
  const [saving, setSaving] = useState(false);

  const handleSave = useCallback(async () => {
    if (!editText.trim()) return;
    setSaving(true);
    await onEdit(note._id, editText.trim());
    setSaving(false);
    setEditing(false);
  }, [editText, note._id, onEdit]);

  const handleCancel = useCallback(() => {
    setEditText(note.note);
    setEditing(false);
  }, [note.note]);

  return (
    <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 hover:border-indigo-200 transition-colors group">
      {editing ? (
        <div className="flex flex-col gap-2">
          <textarea
            className="w-full text-sm border border-slate-300 rounded-lg px-3 py-2 resize-none focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white"
            rows={3}
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
            autoFocus
          />
          <div className="flex gap-2">
            <Button size="sm" onClick={handleSave} disabled={saving || !editText.trim()}>
              {saving ? "Saving..." : "Save"}
            </Button>
            <Button size="sm" variant="secondary" onClick={handleCancel} disabled={saving}>
              Cancel
            </Button>
          </div>
        </div>
      ) : (
        <>
          <p className="text-sm text-slate-700 leading-relaxed">{note.note}</p>
          <div className="flex items-center justify-between mt-3">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 text-[10px] font-bold">
                {note.createdBy?.charAt(0)?.toUpperCase()}
              </div>
              <span className="text-xs text-slate-500">
                <span className="font-medium text-slate-600">{note.createdBy}</span>
                {" · "}{formatDate(note.createdDate)}
              </span>
            </div>
            <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
              <button
                onClick={() => setEditing(true)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 transition-colors"
                title="Edit note"
              >
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                    d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                  />
                </svg>
              </button>
              <button
                onClick={() => onDelete(note._id)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-red-600 hover:bg-red-50 transition-colors"
                title="Delete note"
              >
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                  />
                </svg>
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
