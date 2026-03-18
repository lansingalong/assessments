const roboto = 'Roboto, system-ui, sans-serif'

export default function AutosaveIndicator({ className, visible = false }) {
  return (
    <div
      className={className}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 4,
        opacity: visible ? 1 : 0,
        transition: 'opacity 0.5s ease',
        pointerEvents: 'none',
      }}
    >
      <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
        <path
          d="M2 7.5L5.5 11L12 4"
          stroke="#73BE5E"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      <span style={{ fontFamily: roboto, fontSize: 12, fontWeight: 400, lineHeight: '16px', color: '#4E5961' }}>
        Autosaved
      </span>
    </div>
  )
}
