import Select from "../common/Select.jsx";
import DateRangePicker from "./DateRangePicker.jsx";
import Button from "../common/Button.jsx";
import { LEAD_STATUSES, EMPLOYEES } from "../../constants/index.js";

export default function FilterPanel({ filters, onFilterChange, onReset }) {
  const hasActiveFilters =
    filters.status || filters.employee || filters.startDate || filters.endDate;

  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm">
      <div className="flex flex-wrap items-end gap-4">
        {/* Status filter */}
        <div className="min-w-[160px]">
          <Select
            label="Status"
            id="filter-status"
            value={filters.status}
            onChange={(e) => onFilterChange("status", e.target.value)}
            options={LEAD_STATUSES}
            placeholder="All Statuses"
          />
        </div>

        {/* Employee filter */}
        <div className="min-w-[180px]">
          <Select
            label="Assigned Employee"
            id="filter-employee"
            value={filters.employee}
            onChange={(e) => onFilterChange("employee", e.target.value)}
            options={EMPLOYEES}
            placeholder="All Employees"
          />
        </div>

        {/* Date range */}
        <div>
          <p className="text-sm font-medium text-slate-700 mb-1">Date Range</p>
          <DateRangePicker
            startDate={filters.startDate}
            endDate={filters.endDate}
            onStartChange={(v) => onFilterChange("startDate", v)}
            onEndChange={(v) => onFilterChange("endDate", v)}
          />
        </div>

        {/* Reset button */}
        {hasActiveFilters && (
          <Button variant="ghost" size="sm" onClick={onReset} className="self-end mb-0.5">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
              />
            </svg>
            Reset Filters
          </Button>
        )}
      </div>
    </div>
  );
}
