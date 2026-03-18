/**
 * Wellframe button variants:
 *   variant="primary"   — filled teal
 *   variant="secondary" — outlined teal
 *   variant="tertiary"  — small pill on gray bg
 *   variant="destructive" — filled red
 */
export default function Button({ children, variant = 'primary', icon, iconFirst = false, disabled = false, onClick, className = '' }) {
  const base = 'inline-flex items-center justify-center gap-1.5 font-medium transition-opacity disabled:opacity-40 disabled:cursor-not-allowed'

  const variants = {
    primary:     'h-[51px] px-6 rounded-pill bg-brand text-white text-base hover:bg-brand-shade1',
    secondary:   'h-[51px] px-6 rounded-pill border border-brand text-brand text-base bg-transparent hover:bg-brand/5',
    tertiary:    'h-9 px-[15px] rounded-pill bg-wf-bgSecond text-brand-shade1 text-[15px] hover:brightness-95',
    destructive: 'h-[51px] px-6 rounded-pill bg-wf-error text-white text-base hover:opacity-90',
  }

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`${base} ${variants[variant]} ${className}`}
    >
      {icon && iconFirst && <span className="material-icons text-[19px]">{icon}</span>}
      {children}
      {icon && !iconFirst && <span className="material-icons text-[19px]">{icon}</span>}
    </button>
  )
}
