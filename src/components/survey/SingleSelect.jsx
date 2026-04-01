import { useState, useId } from 'react'
import { cardStyle, QuestionLabel } from './shared'
import RadioOption from '../ui/RadioOption'

export default function SingleSelect({ question, options = [], onSubmit, answer = null, required, hideSubmit = false, onSelect }) {
  const [selected, setSelected] = useState(answer)
  const groupId = useId()

  const handleSelect = (opt) => {
    setSelected(opt)
    if (hideSubmit) {
      onSelect?.(opt)
    } else {
      onSubmit?.(opt)
    }
  }

  return (
    <div style={cardStyle}>
      <QuestionLabel text={question} required={required} id={groupId} />
      <div role="radiogroup" aria-labelledby={groupId} className="flex flex-col gap-[6px]">
        {options.map(opt => (
          <RadioOption key={opt} label={opt} selected={selected === opt} onClick={() => handleSelect(opt)} />
        ))}
      </div>
    </div>
  )
}
