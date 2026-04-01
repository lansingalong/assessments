const roboto = 'Roboto, system-ui, sans-serif'

export default function AutosaveIndicator({ className, visible = false }) {
  return (
    <div
      className={className}
      aria-live="polite"
      aria-atomic="true"
      aria-hidden={!visible}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 4,
        opacity: visible ? 1 : 0,
        transition: 'opacity 0.5s ease',
        pointerEvents: 'none',
      }}
    >
      <svg aria-hidden="true" width="14" height="14" viewBox="0 0 14 14" fill="none">
        <path
          d="M2 7.5L5.5 11L12 4"
          stroke="var(--color-success)"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      <span style={{ fontFamily: roboto, fontSize: 12, fontWeight: 400, lineHeight: '16px', color: 'var(--color-text-mid)' }}>
        Autosaved
      </span>
    </div>
  )
}
