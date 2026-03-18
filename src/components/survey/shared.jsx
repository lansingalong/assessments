export const sfPro = "-apple-system, BlinkMacSystemFont, 'SF Pro Text', system-ui, sans-serif"

export const cardStyle = {
  background: '#FFFFFF',
  borderRadius: 10,
  boxShadow: '0 1px 4px #D9E3E7',
  padding: '20px 16px 16px',
}

export const questionStyle = {
  fontFamily: "Roboto, system-ui, sans-serif",
  fontSize: 16,
  fontWeight: 400,
  color: '#282F35',
  letterSpacing: 0,
  lineHeight: 1.4,
  marginBottom: 16,
}

export function QuestionLabel({ text, required }) {
  return (
    <p style={questionStyle}>
      {text}
      {required && <span style={{ color: '#F05B60' }}> *</span>}
    </p>
  )
}

export const ctaStyle = (enabled) => ({
  fontFamily: sfPro,
  fontSize: 16,
  fontWeight: 500,
  color: '#FFFFFF',
  background: '#0E98BE',
  borderRadius: 30,
  height: 51,
  width: '100%',
  border: 'none',
  cursor: enabled ? 'pointer' : 'not-allowed',
  opacity: enabled ? 1 : 0.4,
  letterSpacing: '-0.32px',
})
