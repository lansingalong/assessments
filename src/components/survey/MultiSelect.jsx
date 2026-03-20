import { useState } from 'react'
import { sfPro, cardStyle, QuestionLabel, ctaStyle } from './shared'

function CheckOption({ label, checked, onClick }) {
  return (
    <button
      onClick={onClick}
      style={{ fontFamily: 'Roboto, system-ui, sans-serif', minHeight: 44, width: '100%' }}
      className="flex items-center gap-3 text-left py-[7px] px-4 rounded-xl bg-white"
    >
      <div
        className="flex-shrink-0 w-5 h-5 rounded flex items-center justify-center border-2"
        style={{
          borderColor: '#0080A3',
          background: checked ? '#0080A3' : 'transparent',
          borderRadius: 5,
        }}
      >
        {checked && (
          <svg width="11" height="8" viewBox="0 0 11 8" fill="none">
            <path d="M1 4L4 7L10 1" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        )}
      </div>
      <span style={{ fontSize: 16, fontWeight: 400, color: '#282F35' }}>{label}</span>
    </button>
  )
}

export default function MultiSelect({ question, options = [], onSubmit, answer, required }) {
  const [selected, setSelected] = useState(() => answer ? new Set(answer) : new Set())

  const toggle = (opt) => {
    setSelected(prev => {
      const next = new Set(prev)
      next.has(opt) ? next.delete(opt) : next.add(opt)
      return next
    })
  }

  return (
    <div style={cardStyle}>
      <QuestionLabel text={question} required={required} />
      <div className="flex flex-col gap-[6px] mb-5">
        {options.map(opt => (
          <CheckOption key={opt} label={opt} checked={selected.has(opt)} onClick={() => toggle(opt)} />
        ))}
      </div>
      <button
        disabled={selected.size === 0}
        style={ctaStyle(selected.size > 0)}
        onClick={() => selected.size > 0 && onSubmit?.([...selected])}
      >
        Next
      </button>
    </div>
  )
}
