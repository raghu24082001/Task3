import { useState, useCallback } from "react";
import Button from "../common/Button.jsx";

const DEFAULT_AUTHOR = "Admin";

export default function AddNoteForm({ onAdd }) {
  const [noteText, setNoteText] = useState("");
  const [adding, setAdding] = useState(false);

  const handleSubmit = useCallback(async (e) => {
    e.preventDefault();
    if (!noteText.trim()) return;
    setAdding(true);
    await onAdd(noteText.trim(), DEFAULT_AUTHOR);
    setNoteText("");
    setAdding(false);
  }, [noteText, onAdd]);

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-2">
      <textarea
        className="
          w-full text-sm border border-slate-300 rounded-xl px-3 py-2.5 resize-none
          focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500
          bg-white placeholder:text-slate-400 transition-all
        "
        rows={3}
        placeholder="Add a note..."
        value={noteText}
        onChange={(e) => setNoteText(e.target.value)}
      />
      <div className="flex justify-end">
        <Button
          type="submit"
          size="sm"
          disabled={adding || !noteText.trim()}
        >
          {adding ? (
            <>
              <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
              </svg>
              Adding...
            </>
          ) : (
            <>
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              Add Note
            </>
          )}
        </Button>
      </div>
    </form>
  );
}
