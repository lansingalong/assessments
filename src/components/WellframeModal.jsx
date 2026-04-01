import { useEffect, useRef, useId } from 'react'
import { sfPro } from './survey/shared'

const fonts = {
  title:  "Merriweather, Georgia, serif",
  body:   "Roboto, system-ui, sans-serif",
  button: sfPro,
}

function WarningIcon() {
  return (
    <svg aria-hidden="true" width="38" height="38" viewBox="0 0 38 38" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M19 3L35.5 32H2.5L19 3Z"
        stroke="var(--color-error-light)"
        strokeWidth="2"
        strokeLinejoin="round"
        fill="none"
      />
      <line x1="19" y1="15" x2="19" y2="24" stroke="var(--color-error-light)" strokeWidth="2.2" strokeLinecap="round" />
      <circle cx="19" cy="28.5" r="1.2" fill="var(--color-error-light)" />
    </svg>
  )
}

function CloseIcon() {
  return (
    <svg aria-hidden="true" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M18 6L6 18M6 6L18 18" stroke="var(--color-text-mid)" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  )
}

const FOCUSABLE = 'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'

export function WellframeModal({
  visible,
  title,
  body,
  primaryLabel,
  onPrimaryPress,
  onClose,
  secondaryLabel,
  onSecondaryPress,
  linkText,
  onLinkPress,
}) {
  const titleId = useId()
  const modalRef = useRef(null)
  const triggerRef = useRef(null)

  // Store the element that triggered the modal so we can return focus on close
  useEffect(() => {
    if (visible) {
      triggerRef.current = document.activeElement
      // Move focus into the modal on next frame
      requestAnimationFrame(() => {
        const focusable = modalRef.current?.querySelectorAll(FOCUSABLE)
        focusable?.[0]?.focus()
      })
    } else {
      // Return focus to the trigger element
      triggerRef.current?.focus()
    }
  }, [visible])

  // Trap focus and handle Escape
  useEffect(() => {
    if (!visible) return
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose?.()
        return
      }
      if (e.key !== 'Tab') return
      const focusable = Array.from(modalRef.current?.querySelectorAll(FOCUSABLE) ?? [])
      if (focusable.length === 0) return
      const first = focusable[0]
      const last = focusable[focusable.length - 1]
      if (e.shiftKey) {
        if (document.activeElement === first) {
          e.preventDefault()
          last.focus()
        }
      } else {
        if (document.activeElement === last) {
          e.preventDefault()
          first.focus()
        }
      }
    }
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [visible, onClose])

  if (!visible) return null

  return (
    <div
      onClick={onClose}
      aria-hidden="true"
      style={{
        position: 'fixed',
        inset: 0,
        background: 'var(--color-overlay)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1000,
      }}
    >
      <div
        ref={modalRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        onClick={e => e.stopPropagation()}
        style={{
          width: 328,
          background: 'var(--color-white)',
          borderRadius: 4,
          boxShadow: '0 11px 15px rgba(0,0,0,.2), 0 9px 46px rgba(0,0,0,.12), 0 24px 38px rgba(0,0,0,.14)',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {/* Top bar */}
        <div style={{ height: 50, padding: '0 24px', display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
          <button
            aria-label="Close dialog"
            onClick={onClose}
            style={{ background: 'none', border: 'none', padding: 10, cursor: 'pointer', lineHeight: 0, minWidth: 44, minHeight: 44, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
          >
            <CloseIcon />
          </button>
        </div>

        {/* Icon zone */}
        <div style={{ padding: '8px 24px 0', display: 'flex', justifyContent: 'center' }}>
          <WarningIcon />
        </div>

        {/* Body zone */}
        <div style={{ padding: '16px 24px 20px', display: 'flex', flexDirection: 'column', gap: 16 }}>
          <p
            id={titleId}
            style={{
              fontFamily: fonts.title,
              fontSize: 20,
              fontWeight: 300,
              lineHeight: '25px',
              color: 'var(--color-brand)',
              margin: 0,
            }}
          >
            {title}
          </p>
          <p
            style={{
              fontFamily: fonts.body,
              fontSize: 16,
              fontWeight: 400,
              lineHeight: '21px',
              color: 'var(--color-text-mid)',
              margin: 0,
            }}
          >
            {body}
          </p>
          {linkText && (
            <button
              onClick={onLinkPress}
              style={{
                fontFamily: fonts.body,
                fontSize: 15,
                fontWeight: 500,
                lineHeight: '20px',
                color: 'var(--color-brand)',
                background: 'none',
                border: 'none',
                padding: 0,
                cursor: 'pointer',
                textAlign: 'left',
              }}
            >
              {linkText}
            </button>
          )}
        </div>

        {/* Footer zone */}
        <div style={{ padding: '0 24px 17px', display: 'flex', flexDirection: 'column', gap: 16 }}>
          <button
            onClick={onPrimaryPress}
            style={{
              fontFamily: fonts.button,
              fontSize: 16,
              fontWeight: 500,
              letterSpacing: '-0.32px',
              color: 'var(--color-white)',
              background: 'var(--color-brand-accent)',
              border: 'none',
              borderRadius: 30,
              height: 56,
              width: '100%',
              cursor: 'pointer',
            }}
          >
            {primaryLabel}
          </button>
          {secondaryLabel && (
            <button
              onClick={onSecondaryPress}
              style={{
                fontFamily: fonts.button,
                fontSize: 16,
                fontWeight: 500,
                letterSpacing: '-0.32px',
                color: 'var(--color-brand-accent)',
                background: 'transparent',
                border: '1px solid var(--color-brand-accent)',
                borderRadius: 30,
                height: 56,
                width: '100%',
                cursor: 'pointer',
              }}
            >
              {secondaryLabel}
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
