import { useState } from 'react'
import { sfPro, cardStyle, QuestionLabel, ctaStyle } from './shared'

export default function CalendarSelector({ question, onSubmit, answer, required, hideSubmit = false, onSelect }) {
  const [value, setValue] = useState(answer || '')
  const [error, setError] = useState(null)

  const handleChange = (raw) => {
    const digits = raw.replace(/\D/g, '').slice(0, 8)
    let formatted = digits
    if (digits.length > 4) formatted = digits.slice(0, 2) + '/' + digits.slice(2, 4) + '/' + digits.slice(4)
    else if (digits.length > 2) formatted = digits.slice(0, 2) + '/' + digits.slice(2)
    setValue(formatted)
    if (error) setError(null)
    // In review mode, track valid dates via onSelect
    if (hideSubmit && /^\d{2}\/\d{2}\/\d{4}$/.test(formatted)) {
      const [mm, dd, yyyy] = formatted.split('/').map(Number)
      const d = new Date(yyyy, mm - 1, dd)
      if (d.getFullYear() === yyyy && d.getMonth() === mm - 1 && d.getDate() === dd && d <= new Date()) {
        onSelect?.(`${yyyy}-${String(mm).padStart(2,'0')}-${String(dd).padStart(2,'0')}`)
      }
    }
  }

  const validate = () => {
    if (!value.trim()) { setError('Date is required'); return false }
    if (!/^\d{2}\/\d{2}\/\d{4}$/.test(value)) { setError('Enter a valid date (MM/DD/YYYY)'); return false }
    const [mm, dd, yyyy] = value.split('/').map(Number)
    const d = new Date(yyyy, mm - 1, dd)
    if (d.getFullYear() !== yyyy || d.getMonth() !== mm - 1 || d.getDate() !== dd) {
      setError('Enter a valid calendar date'); return false
    }
    if (d > new Date()) { setError('Date cannot be in the future'); return false }
    return true
  }

  const handleSubmit = () => {
    if (validate()) {
      const [mm, dd, yyyy] = value.split('/')
      onSubmit?.(`${yyyy}-${mm}-${dd}`)
    }
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') handleSubmit()
  }

  return (
    <div style={cardStyle}>
      <QuestionLabel text={question} required={required} />

      <input
        type="text"
        value={value}
        onChange={e => handleChange(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="MM/DD/YYYY"
        style={{
          display: 'block',
          width: '100%',
          height: 48,
          padding: '0 14px',
          fontSize: 16,
          color: '#282F35',
          fontFamily: sfPro,
          background: '#fff',
          border: `1px solid ${error ? '#923133' : '#B8CDD4'}`,
          borderRadius: 4,
          outline: 'none',
          boxSizing: 'border-box',
          marginBottom: 8,
        }}
      />

      {error && (
        <p style={{ margin: '0 0 8px', fontSize: 12, color: '#923133', fontFamily: sfPro }}>
          {error}
        </p>
      )}

      {!hideSubmit && (
        <button
          disabled={!value.trim()}
          style={ctaStyle(!!value.trim())}
          onClick={handleSubmit}
        >
          Next
        </button>
      )}
    </div>
  )
}
