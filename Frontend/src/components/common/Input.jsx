export default function Input({
  label,
  id,
  error,
  className = "",
  ...rest
}) {
  return (
    <div className="flex flex-col gap-1">
      {label && (
        <label htmlFor={id} className="text-sm font-medium text-slate-700">
          {label}
        </label>
      )}
      <input
        id={id}
        className={`
          w-full rounded-lg border px-3 py-2 text-sm text-slate-800 placeholder:text-slate-400
          transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500
          ${error ? "border-red-400 bg-red-50" : "border-slate-300 bg-white"}
          ${className}
        `}
        {...rest}
      />
      {error && <p className="text-xs text-red-600 mt-0.5">{error}</p>}
    </div>
  );
}
