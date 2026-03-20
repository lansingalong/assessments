import { useState } from 'react'

// SF Pro Text falls back to system-ui which maps to SF Pro on Apple devices
const sfProText = "-apple-system, BlinkMacSystemFont, 'SF Pro Text', system-ui, sans-serif"
const sfProMedium = "-apple-system, BlinkMacSystemFont, 'SF Pro Text', system-ui, sans-serif"

function RadioOption({ label, selected, onClick }) {
  return (
    <button
      onClick={onClick}
      style={{ fontFamily: sfProText }}
      className="flex items-center gap-3 w-full text-left py-3 px-4 rounded-xl border border-[#E8EDF0] bg-white"
    >
      <div
        className="flex-shrink-0 w-5 h-5 rounded-full border-2 flex items-center justify-center"
        style={{ borderColor: '#0080A3' }}
      >
        {selected && (
          <div className="w-2.5 h-2.5 rounded-full" style={{ background: '#0080A3' }} />
        )}
      </div>
      <span style={{ fontSize: 16, color: '#282F35', letterSpacing: '-0.32px' }}>
        {label}
      </span>
    </button>
  )
}

/**
 * SurveyQuestion
 *
 * Props:
 *   question  — string
 *   options   — string[]
 *   onSubmit  — (selectedOption: string) => void
 */
export default function SurveyQuestion({ question, options = [], onSubmit }) {
  const [selected, setSelected] = useState(null)

  return (
    <div
      className="w-full bg-white"
      style={{
        borderRadius: 10,
        boxShadow: '0 1px 4px #D9E3E7',
        padding: '20px 16px 16px',
      }}
    >
      {/* Question title */}
      <p
        style={{
          fontFamily: sfProText,
          fontSize: 16,
          fontWeight: 400,
          color: '#282F35',
          letterSpacing: '-0.32px',
          marginBottom: 16,
          lineHeight: '1.4',
        }}
      >
        {question}
      </p>

      {/* Options */}
      <div className="flex flex-col gap-2 mb-5">
        {options.map(opt => (
          <RadioOption
            key={opt}
            label={opt}
            selected={selected === opt}
            onClick={() => setSelected(opt)}
          />
        ))}
      </div>

      {/* Primary CTA */}
      <button
        onClick={() => selected && onSubmit?.(selected)}
        disabled={!selected}
        style={{
          fontFamily: sfProMedium,
          fontSize: 16,
          fontWeight: 500,
          color: '#FFFFFF',
          background: selected ? '#0E98BE' : '#0E98BE',
          borderRadius: 30,
          height: 51,
          width: '100%',
          border: 'none',
          cursor: selected ? 'pointer' : 'not-allowed',
          opacity: selected ? 1 : 0.4,
          letterSpacing: '-0.32px',
        }}
      >
        Next
      </button>
    </div>
  )
}
