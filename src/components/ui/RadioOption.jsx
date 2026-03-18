/**
 * Wellframe radio option — matches the survey card radio style.
 */
export default function RadioOption({ label, selected, onClick }) {
  return (
    <button
      onClick={onClick}
      className="flex items-center gap-3 w-full text-left py-3 px-4 rounded-xl border border-wf-border bg-white hover:border-brand transition-colors"
    >
      {/* Radio circle */}
      <div className="flex-shrink-0 w-5 h-5 rounded-full border-2 border-brand flex items-center justify-center">
        {selected && <div className="w-2.5 h-2.5 rounded-full bg-brand" />}
      </div>
      <span className="text-wf-text text-[15px] font-normal">{label}</span>
    </button>
  )
}
