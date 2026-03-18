/**
 * Wellframe card — white rounded card with subtle shadow.
 * Matches the wf-card base style from the design library.
 */
export default function Card({ children, className = '' }) {
  return (
    <div className={`bg-white rounded-2xl shadow-sm border border-wf-border p-5 ${className}`}>
      {children}
    </div>
  )
}
