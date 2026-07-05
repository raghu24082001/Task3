import Select from "../common/Select.jsx";
import { ROWS_PER_PAGE_OPTIONS } from "../../constants/index.js";

export default function Pagination({ page, totalPages, total, limit, onPageChange, onLimitChange }) {
  const pageNumbers = () => {
    const pages = [];
    const delta = 2;
    const left = Math.max(2, page - delta);
    const right = Math.min(totalPages - 1, page + delta);

    pages.push(1);
    if (left > 2) pages.push("...");
    for (let i = left; i <= right; i++) pages.push(i);
    if (right < totalPages - 1) pages.push("...");
    if (totalPages > 1) pages.push(totalPages);

    return pages;
  };

  const startItem = total === 0 ? 0 : (page - 1) * limit + 1;
  const endItem = Math.min(page * limit, total);

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white border border-slate-200 rounded-2xl px-4 py-3 shadow-sm">
      {/* Left: rows info + rows per page */}
      <div className="flex items-center gap-4">
        <span className="text-sm text-slate-500">
          Showing <span className="font-semibold text-slate-700">{startItem}–{endItem}</span> of{" "}
          <span className="font-semibold text-slate-700">{total}</span> results
        </span>
        <div className="flex items-center gap-2">
          <span className="text-sm text-slate-500 hidden sm:inline">Rows:</span>
          <Select
            id="rows-per-page"
            value={limit}
            onChange={(e) => {
              onLimitChange(Number(e.target.value));
            }}
            options={ROWS_PER_PAGE_OPTIONS.map((n) => ({ value: n, label: String(n) }))}
            placeholder={null}
            className="py-1.5 !w-20"
          />
        </div>
      </div>

      {/* Right: page numbers */}
      {totalPages > 1 && (
        <div className="flex items-center gap-1">
          {/* Prev */}
          <button
            onClick={() => onPageChange(page - 1)}
            disabled={page === 1}
            className="p-2 rounded-lg text-slate-500 hover:bg-indigo-50 hover:text-indigo-600 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
            aria-label="Previous page"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          {/* Page numbers */}
          {pageNumbers().map((p, idx) =>
            p === "..." ? (
              <span key={`ellipsis-${idx}`} className="px-2 py-1 text-sm text-slate-400">…</span>
            ) : (
              <button
                key={p}
                onClick={() => onPageChange(p)}
                className={`min-w-[36px] h-9 rounded-lg text-sm font-medium transition-all ${
                  p === page
                    ? "bg-indigo-600 text-white shadow-sm"
                    : "text-slate-600 hover:bg-indigo-50 hover:text-indigo-600"
                }`}
              >
                {p}
              </button>
            )
          )}

          {/* Next */}
          <button
            onClick={() => onPageChange(page + 1)}
            disabled={page === totalPages}
            className="p-2 rounded-lg text-slate-500 hover:bg-indigo-50 hover:text-indigo-600 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
            aria-label="Next page"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      )}
    </div>
  );
}
