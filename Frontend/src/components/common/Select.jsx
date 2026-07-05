export default function Select({
  label,
  id,
  options = [],
  placeholder = "Select...",
  error,
  className = "",
  value,
  onChange,
  ...rest
}) {
  return (
    <div className="flex flex-col gap-1">
      {label && (
        <label htmlFor={id} className="text-sm font-medium text-slate-700">
          {label}
        </label>
      )}
      <select
        id={id}
        value={value}
        onChange={onChange}
        className={`
          w-full rounded-lg border px-3 py-2 text-sm text-slate-800 bg-white
          transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500
          ${error ? "border-red-400 bg-red-50" : "border-slate-300"}
          ${className}
        `}
        {...rest}
      >
        <option value="">{placeholder}</option>
        {options.map((opt) => (
          <option key={opt.value ?? opt} value={opt.value ?? opt}>
            {opt.label ?? opt}
          </option>
        ))}
      </select>
      {error && <p className="text-xs text-red-600 mt-0.5">{error}</p>}
    </div>
  );
}
