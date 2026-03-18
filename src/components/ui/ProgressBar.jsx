/**
 * Thin linear progress bar — shows how far through the assessment the member is.
 * pct: 0–100
 */
export default function ProgressBar({ pct, label }) {
  return (
    <div className="w-full">
      {label && (
        <div className="flex justify-between mb-1.5 text-xs text-wf-textSub">
          <span>{label}</span>
          <span>{Math.round(pct)}%</span>
        </div>
      )}
      <div className="w-full h-1.5 bg-wf-bgSecond rounded-full overflow-hidden">
        <div
          className="h-full bg-brand rounded-full transition-all duration-300"
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  )
}
