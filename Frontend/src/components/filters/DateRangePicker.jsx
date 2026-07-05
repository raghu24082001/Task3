export default function DateRangePicker({ startDate, endDate, onStartChange, onEndChange }) {
  return (
    <div className="flex flex-col sm:flex-row gap-2">
      <div className="flex flex-col gap-1">
        <label className="text-xs font-medium text-slate-500">From</label>
        <input
          type="date"
          value={startDate}
          onChange={(e) => onStartChange(e.target.value)}
          max={endDate || undefined}
          className="
            px-3 py-2 text-sm border border-slate-300 rounded-xl bg-white text-slate-800
            focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500
            transition-all
          "
        />
      </div>
      <div className="flex flex-col gap-1">
        <label className="text-xs font-medium text-slate-500">To</label>
        <input
          type="date"
          value={endDate}
          onChange={(e) => onEndChange(e.target.value)}
          min={startDate || undefined}
          className="
            px-3 py-2 text-sm border border-slate-300 rounded-xl bg-white text-slate-800
            focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500
            transition-all
          "
        />
      </div>
    </div>
  );
}
