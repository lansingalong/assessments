import { useState, useId } from 'react'
import { cardStyle, questionStyle, QuestionLabel, ctaStyle } from './shared'
import RadioOption from '../ui/RadioOption'

export default function SubQuestions({ question, questions = [], onSubmit, answer, required }) {
  const [answers, setAnswers] = useState(answer ?? {})
  const headingId = useId()

  const allAnswered = questions.length > 0 && questions.every(q => answers[q.id] !== undefined)

  const setAnswer = (id, value) => setAnswers(prev => ({ ...prev, [id]: value }))

  return (
    <div style={cardStyle}>
      <QuestionLabel text={question} required={required} id={headingId} />

      <div className="flex flex-col gap-4 mb-5">
        {questions.map((q, idx) => {
          const subId = `${headingId}-sub-${q.id}`
          return (
            <div key={q.id}>
              <div className="flex items-baseline gap-2 mb-2">
                <span style={{ ...questionStyle, minWidth: 20, flexShrink: 0, marginBottom: 0 }}>
                  {idx + 1}.
                </span>
                <p id={subId} style={questionStyle}>{q.label}</p>
              </div>
              <div role="radiogroup" aria-labelledby={subId} className="flex flex-col gap-1.5 pl-7">
                {q.options.map(opt => (
                  <RadioOption
                    key={opt}
                    label={opt}
                    selected={answers[q.id] === opt}
                    onClick={() => setAnswer(q.id, opt)}
                    size="sm"
                  />
                ))}
              </div>
            </div>
          )
        })}
      </div>

      <button
        disabled={!allAnswered}
        aria-disabled={!allAnswered}
        style={ctaStyle(allAnswered)}
        onClick={() => allAnswered && onSubmit?.(answers)}
      >
        Next
      </button>
    </div>
  )
}
