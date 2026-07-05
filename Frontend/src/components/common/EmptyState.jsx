export default function EmptyState({
  title = "No results found",
  message = "Try adjusting your search or filters.",
  icon,
}) {
  return (
    <div className="flex flex-col items-center justify-center py-20 gap-4 animate-fade-in">
      <div className="w-20 h-20 rounded-full bg-indigo-50 flex items-center justify-center">
        {icon ?? (
          <svg className="w-10 h-10 text-indigo-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
              d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414A1 1 0 0119 9.414V19a2 2 0 01-2 2z"
            />
          </svg>
        )}
      </div>
      <div className="text-center">
        <p className="text-slate-700 font-semibold text-base">{title}</p>
        <p className="text-slate-400 text-sm mt-1 max-w-xs">{message}</p>
      </div>
    </div>
  );
}
