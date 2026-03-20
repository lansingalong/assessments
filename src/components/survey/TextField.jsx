import { useState } from 'react'
import { sfPro, cardStyle, QuestionLabel, ctaStyle } from './shared'

export default function TextField({ question, placeholder = 'Type your answer here…', multiline = true, onSubmit, answer = '', required }) {
  const [value, setValue] = useState(answer)
  const filled = value.trim().length > 0

  const inputStyle = {
    fontFamily: sfPro,
    fontSize: 16,
    color: '#282F35',
    letterSpacing: '-0.32px',
    background: '#FFFFFF',
    border: '1px solid #E8EDF0',
    borderRadius: 10,
    padding: '12px 14px',
    width: '100%',
    outline: 'none',
    resize: 'none',
  }

  return (
    <div style={cardStyle}>
      <QuestionLabel text={question} required={required} />
      {multiline ? (
        <textarea
          rows={4}
          value={value}
          onChange={e => setValue(e.target.value)}
          placeholder={placeholder}
          style={{ ...inputStyle, marginBottom: 20 }}
          onFocus={e => (e.target.style.borderColor = '#0080A3')}
          onBlur={e => (e.target.style.borderColor = '#E8EDF0')}
        />
      ) : (
        <input
          type="text"
          value={value}
          onChange={e => setValue(e.target.value)}
          placeholder={placeholder}
          style={{ ...inputStyle, height: 51, marginBottom: 20 }}
          onFocus={e => (e.target.style.borderColor = '#0080A3')}
          onBlur={e => (e.target.style.borderColor = '#E8EDF0')}
        />
      )}
      <button
        disabled={!filled}
        style={ctaStyle(filled)}
        onClick={() => filled && onSubmit?.(value.trim())}
      >
        Next
      </button>
    </div>
  )
}
