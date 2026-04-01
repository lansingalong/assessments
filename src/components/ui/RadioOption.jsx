export default function RadioOption({ label, selected, onClick, size = 'md' }) {
  const isSmall = size === 'sm'
  return (
    <button
      role="radio"
      aria-checked={selected}
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
      className={`flex items-center gap-3 text-left rounded-xl bg-white ${isSmall ? 'py-[5px] px-3' : 'py-[7px] px-4'}`}
    >
      <div
        aria-hidden="true"
        className={`flex-shrink-0 rounded-full border-2 flex items-center justify-center ${isSmall ? 'w-[18px] h-[18px]' : 'w-5 h-5'}`}
        style={{ borderColor: 'var(--color-brand)' }}
      >
        {selected && (
          <div
            className={`rounded-full ${isSmall ? 'w-2 h-2' : 'w-2.5 h-2.5'}`}
            style={{ background: 'var(--color-brand)' }}
          />
        )}
      </div>
      <span style={{ fontSize: 16, fontWeight: 400, color: 'var(--color-text)' }}>{label}</span>
    </button>
  )
}
