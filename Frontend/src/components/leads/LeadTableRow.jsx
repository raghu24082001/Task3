import StatusBadge from "../common/StatusBadge.jsx";
import Button from "../common/Button.jsx";
import { formatDate } from "../../utils/formatDate.js";

export default function LeadTableRow({ lead, onView, onEdit }) {
  return (
    <tr className="hover:bg-indigo-50/40 transition-colors group">
      {/* Name */}
      <td className="px-4 py-3 whitespace-nowrap">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-400 to-purple-500 flex items-center justify-center text-white text-xs font-bold shrink-0">
            {lead.name?.charAt(0)?.toUpperCase()}
          </div>
          <span className="text-sm font-medium text-slate-800">{lead.name}</span>
        </div>
      </td>

      {/* Mobile */}
      <td className="px-4 py-3 whitespace-nowrap text-sm text-slate-600">{lead.mobile}</td>

      {/* Email */}
      <td className="px-4 py-3 whitespace-nowrap">
        <span className="text-sm text-slate-600 truncate max-w-[180px] block">{lead.email}</span>
      </td>

      {/* Status */}
      <td className="px-4 py-3 whitespace-nowrap">
        <StatusBadge status={lead.status} />
      </td>

      {/* Assigned Employee */}
      <td className="px-4 py-3 whitespace-nowrap text-sm text-slate-600">{lead.assignedEmployee}</td>

      {/* Created Date */}
      <td className="px-4 py-3 whitespace-nowrap text-sm text-slate-500">{formatDate(lead.createdDate)}</td>

      {/* Actions */}
      <td className="px-4 py-3 whitespace-nowrap">
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onView(lead)}
            className="text-indigo-600 hover:bg-indigo-100"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
              />
            </svg>
            View
          </Button>
          <Button
            variant="secondary"
            size="sm"
            onClick={() => onEdit(lead)}
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
              />
            </svg>
            Edit
          </Button>
        </div>
      </td>
    </tr>
  );
}
