export const sfPro = "-apple-system, BlinkMacSystemFont, 'SF Pro Text', system-ui, sans-serif"

export const cardStyle = {
  background: 'var(--color-white)',
  borderRadius: 10,
  boxShadow: '0 1px 4px var(--color-bg-second)',
  padding: 34,
}

export const questionStyle = {
  fontFamily: "Roboto, system-ui, sans-serif",
  fontSize: 16,
  fontWeight: 400,
  color: 'var(--color-text)',
  letterSpacing: 0,
  lineHeight: 1.4,
  marginBottom: 16,
}

export function QuestionLabel({ text, required, id }) {
  return (
    <p id={id} style={questionStyle}>
      {text}
      {required && <span aria-hidden="true" style={{ color: 'var(--color-error-light)' }}> *</span>}
      {required && <span className="sr-only"> (required)</span>}
    </p>
  )
}

export const ctaStyle = (enabled) => ({
  fontFamily: sfPro,
  fontSize: 16,
  fontWeight: 500,
  color: 'var(--color-white)',
  background: enabled ? 'var(--color-brand-accent)' : 'var(--color-brand-disabled)',
  borderRadius: 30,
  height: 51,
  width: '100%',
  border: 'none',
  cursor: enabled ? 'pointer' : 'not-allowed',
  letterSpacing: '-0.32px',
})
