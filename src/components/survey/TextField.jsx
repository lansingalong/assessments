import { useState, useId } from 'react'
import { sfPro, cardStyle, QuestionLabel, ctaStyle } from './shared'

export default function TextField({ question, placeholder = 'Type your answer here…', multiline = true, onSubmit, answer = '', required, hideSubmit = false, onSelect }) {
  const [value, setValue] = useState(answer)
  const [focused, setFocused] = useState(false)
  const inputId = useId()
  const filled = value.trim().length > 0

  const handleChange = (e) => {
    setValue(e.target.value)
    if (hideSubmit) onSelect?.(e.target.value.trim() || undefined)
  }

  const inputStyle = {
    fontFamily: sfPro,
    fontSize: 16,
    color: 'var(--color-text)',
    letterSpacing: '-0.32px',
    background: 'var(--color-white)',
    border: `1px solid ${focused ? 'var(--color-brand)' : 'var(--color-border)'}`,
    borderRadius: 10,
    padding: '12px 14px',
    width: '100%',
    outline: focused ? '2px solid var(--color-brand-accent)' : 'none',
    outlineOffset: 2,
    resize: 'none',
  }

  return (
    <div style={cardStyle}>
      <QuestionLabel text={question} required={required} id={inputId} />
      {multiline ? (
        <textarea
          id={inputId}
          rows={4}
          value={value}
          onChange={handleChange}
          placeholder={placeholder}
          aria-required={required}
          style={{ ...inputStyle, marginBottom: 20 }}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
        />
      ) : (
        <input
          id={inputId}
          type="text"
          value={value}
          onChange={handleChange}
          placeholder={placeholder}
          aria-required={required}
          style={{ ...inputStyle, height: 51, marginBottom: 20 }}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
        />
      )}
      {!hideSubmit && (
        <button
          disabled={!filled}
          aria-disabled={!filled}
          style={ctaStyle(filled)}
          onClick={() => filled && onSubmit?.(value.trim())}
        >
          Next
        </button>
      )}
    </div>
  )
}
