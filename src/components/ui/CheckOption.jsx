export default function CheckOption({ label, checked, onClick }) {
  return (
    <button
      role="checkbox"
      aria-checked={checked}
      onClick={onClick}
      style={{
        fontFamily: 'Roboto, system-ui, sans-serif',
        minHeight: 44,
        width: '100%',
        background: 'none',
        border: 'none',
        cursor: 'pointer',
        padding: 0,
      }}
      className="flex items-center gap-3 text-left py-[7px] px-4 rounded-xl bg-white"
    >
      <div
        aria-hidden="true"
        className="flex-shrink-0 w-5 h-5 rounded flex items-center justify-center border-2"
        style={{
          borderColor: 'var(--color-brand)',
          background: checked ? 'var(--color-brand)' : 'transparent',
          borderRadius: 5,
        }}
      >
        {checked && (
          <svg width="11" height="8" viewBox="0 0 11 8" fill="none" aria-hidden="true">
            <path d="M1 4L4 7L10 1" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        )}
      </div>
      <span style={{ fontSize: 16, fontWeight: 400, color: 'var(--color-text)' }}>{label}</span>
    </button>
  )
}
