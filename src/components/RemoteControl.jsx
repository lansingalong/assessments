import { useState } from 'react'

const sfPro = "'SF Pro Display', 'SF Pro', system-ui, -apple-system, sans-serif"

export default function RemoteControl({ onGoEmail, onGoAssessment, onGoLogin, onReset }) {
  const [open, setOpen] = useState(false)

  return (
    <div style={{ position: 'fixed', bottom: 20, right: 20, zIndex: 9999 }}>
      {/* Panel */}
      <div
        role="dialog"
        aria-label="Demo Controls"
        aria-hidden={!open}
        style={{
          position: 'absolute', bottom: 54, right: 0, width: 220,
          background: '#1a1a1a', borderRadius: 10,
          boxShadow: '0 8px 32px rgba(0,0,0,0.35)', overflow: 'hidden',
          transform: open ? 'scale(1) translateY(0)' : 'scale(0.9) translateY(10px)',
          opacity: open ? 1 : 0,
          pointerEvents: open ? 'auto' : 'none',
          transition: 'transform 0.2s ease, opacity 0.15s ease',
          transformOrigin: 'bottom right',
        }}
      >
        <div style={{
          padding: '10px 16px 6px', fontSize: 10, fontWeight: 700,
          letterSpacing: 1, textTransform: 'uppercase', color: '#aaa',
          borderBottom: '1px solid #333', fontFamily: sfPro,
        }}>
          Demo Controls
        </div>

        <button onClick={() => { onGoEmail(); setOpen(false) }} style={itemStyle}>
          <svg aria-hidden="true" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#aaa" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="2" y="4" width="20" height="16" rx="2"/><path d="M22 4L12 13 2 4"/>
          </svg>
          Email
        </button>

        <button onClick={() => { onGoAssessment(); setOpen(false) }} style={itemStyle}>
          <svg aria-hidden="true" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#aaa" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M9 11l3 3L22 4"/><path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11"/>
          </svg>
          Assessment
        </button>

        <button onClick={() => { onGoLogin(); setOpen(false) }} style={itemStyle}>
          <svg aria-hidden="true" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#aaa" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M15 3h4a2 2 0 012 2v14a2 2 0 01-2 2h-4"/><path d="M10 17l5-5-5-5"/><path d="M15 12H3"/>
          </svg>
          Login
        </button>

        <button onClick={() => { window.dispatchEvent(new CustomEvent('demoFillAll')); setOpen(false) }} style={itemStyle}>
          <svg aria-hidden="true" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#aaa" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M9 11l3 3L22 4"/><rect x="3" y="3" width="18" height="18" rx="2"/>
          </svg>
          Fill All Questions
        </button>

        <button onClick={() => { window.dispatchEvent(new CustomEvent('demoClearAll')); setOpen(false) }} style={itemStyle}>
          <svg aria-hidden="true" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#aaa" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M4 4l16 16M4 20L20 4"/>
          </svg>
          Clear All Questions
        </button>

        <button onClick={() => { onReset(); setOpen(false) }} style={{...itemStyle, borderBottom: 'none', color: '#f87171'}}>
          <svg aria-hidden="true" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#f87171" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M3 6h18M8 6V4h8v2M19 6l-1 14H6L5 6"/>
          </svg>
          Reset Demo Data
        </button>
      </div>

      {/* FAB */}
      <button
        aria-label={open ? 'Close demo controls' : 'Open demo controls'}
        aria-expanded={open}
        onClick={() => setOpen(o => !o)}
        style={{
          width: 44, height: 44, borderRadius: '50%',
          background: 'var(--color-brand-accent)', color: 'white', border: 'none',
          cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
          boxShadow: '0 3px 12px rgba(0,0,0,0.25)',
          transition: 'transform 0.2s, background 0.2s',
        }}
        onMouseEnter={e => { e.currentTarget.style.transform = 'scale(1.08)' }}
        onMouseLeave={e => { e.currentTarget.style.transform = 'scale(1)' }}
        onFocus={e => { e.currentTarget.style.transform = 'scale(1.08)' }}
        onBlur={e => { e.currentTarget.style.transform = 'scale(1)' }}
      >
        <svg aria-hidden="true" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round">
          <path d="M4 21v-7M4 10V3M12 21v-9M12 8V3M20 21v-5M20 12V3M1 14h6M9 8h6M17 16h6"/>
        </svg>
      </button>
    </div>
  )
}

const itemStyle = {
  display: 'flex', alignItems: 'center', gap: 10,
  width: '100%', minHeight: 44, padding: '11px 16px',
  background: 'none', border: 'none', borderBottom: '1px solid #2a2a2a',
  color: '#ddd', fontSize: 12, fontWeight: 600,
  fontFamily: "'SF Pro Display', system-ui, sans-serif",
  cursor: 'pointer', textAlign: 'left',
  transition: 'background 0.12s',
}
