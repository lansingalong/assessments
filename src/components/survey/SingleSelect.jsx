import { useState } from 'react'
import { sfPro, cardStyle, QuestionLabel } from './shared'

function RadioOption({ label, selected, onClick }) {
  return (
    <button
      onClick={onClick}
      style={{ fontFamily: 'Roboto, system-ui, sans-serif', minHeight: 44, width: '100%' }}
      className="flex items-center gap-3 text-left py-[7px] px-4 rounded-xl bg-white"
    >
      <div
        className="flex-shrink-0 w-5 h-5 rounded-full border-2 flex items-center justify-center"
        style={{ borderColor: '#0080A3' }}
      >
        {selected && <div className="w-2.5 h-2.5 rounded-full" style={{ background: '#0080A3' }} />}
      </div>
      <span style={{ fontSize: 16, fontWeight: 400, color: '#282F35' }}>{label}</span>
    </button>
  )
}

export default function SingleSelect({ question, options = [], onSubmit, answer = null, required }) {
  const [selected, setSelected] = useState(answer)

  const handleSelect = (opt) => {
    setSelected(opt)
    onSubmit?.(opt)
  }

  return (
    <div style={cardStyle}>
      <QuestionLabel text={question} required={required} />
      <div className="flex flex-col gap-[6px]">
        {options.map(opt => (
          <RadioOption key={opt} label={opt} selected={selected === opt} onClick={() => handleSelect(opt)} />
        ))}
      </div>
    </div>
  )
}
