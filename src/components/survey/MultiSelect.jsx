import { useState, useId } from 'react'
import { cardStyle, QuestionLabel, ctaStyle } from './shared'
import CheckOption from '../ui/CheckOption'

export default function MultiSelect({ question, options = [], onSubmit, answer, required, hideSubmit = false, onSelect }) {
  const [selected, setSelected] = useState(() => answer ? new Set(answer) : new Set())
  const groupId = useId()

  const toggle = (opt) => {
    setSelected(prev => {
      const next = new Set(prev)
      next.has(opt) ? next.delete(opt) : next.add(opt)
      if (hideSubmit && next.size > 0) onSelect?.([...next])
      return next
    })
  }

  return (
    <div style={cardStyle}>
      <QuestionLabel text={question} required={required} id={groupId} />
      <div role="group" aria-labelledby={groupId} className="flex flex-col gap-[6px] mb-5">
        {options.map(opt => (
          <CheckOption key={opt} label={opt} checked={selected.has(opt)} onClick={() => toggle(opt)} />
        ))}
      </div>
      {!hideSubmit && (
        <button
          disabled={selected.size === 0}
          aria-disabled={selected.size === 0}
          style={ctaStyle(selected.size > 0)}
          onClick={() => selected.size > 0 && onSubmit?.([...selected])}
        >
          Next
        </button>
      )}
    </div>
  )
}
