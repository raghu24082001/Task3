import LeadTableRow from "./LeadTableRow.jsx";
import EmptyState from "../common/EmptyState.jsx";

const COLUMNS = [
  { label: "Lead Name", className: "w-52" },
  { label: "Mobile" },
  { label: "Email", className: "w-52" },
  { label: "Status" },
  { label: "Assigned Employee" },
  { label: "Created Date" },
  { label: "Actions" },
];

export default function LeadTable({ leads, onView, onEdit }) {
  return (
    <div className="w-full overflow-x-auto rounded-2xl border border-slate-200 bg-white shadow-sm scrollbar-thin">
      <table className="min-w-full divide-y divide-slate-100">
        <thead>
          <tr className="bg-slate-50">
            {COLUMNS.map((col) => (
              <th
                key={col.label}
                className={`px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider ${col.className ?? ""}`}
              >
                {col.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100">
          {leads.length === 0 ? (
            <tr>
              <td colSpan={COLUMNS.length}>
                <EmptyState />
              </td>
            </tr>
          ) : (
            leads.map((lead) => (
              <LeadTableRow
                key={lead._id}
                lead={lead}
                onView={onView}
                onEdit={onEdit}
              />
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
