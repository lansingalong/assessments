import { useState, useEffect } from 'react'
import { sfPro, cardStyle, questionStyle, ctaStyle } from './shared'

function RadioOption({ label, selected, onClick }) {
  return (
    <button
      onClick={onClick}
      style={{ fontFamily: 'Roboto, system-ui, sans-serif', minHeight: 44, width: '100%' }}
      className="flex items-center gap-3 text-left py-[5px] px-3 rounded-xl bg-white"
    >
      <div
        className="flex-shrink-0 w-[18px] h-[18px] rounded-full border-2 flex items-center justify-center"
        style={{ borderColor: '#0080A3' }}
      >
        {selected && <div className="w-2 h-2 rounded-full" style={{ background: '#0080A3' }} />}
      </div>
      <span style={{ fontSize: 16, fontWeight: 400, color: '#282F35' }}>{label}</span>
    </button>
  )
}

/**
 * SubQuestions
 *
 * questions: Array of { id, label, options }
 * Each sub-question is a single-select inside the parent card.
 * The CTA unlocks once all sub-questions are answered.
 */
export default function SubQuestions({ question, questions = [], onSubmit, answer }) {
  const [answers, setAnswers] = useState(answer ?? {})

  const allAnswered = questions.length > 0 && questions.every(q => answers[q.id] !== undefined)

  const setAnswer = (id, value) => setAnswers(prev => ({ ...prev, [id]: value }))


  return (
    <div style={cardStyle}>
      {/* Parent question */}
      <p style={questionStyle}>{question}</p>

      {/* Sub-questions */}
      <div className="flex flex-col gap-4 mb-5">
        {questions.map((q, idx) => (
          <div key={q.id}>
            {/* Label */}
            <div className="flex items-baseline gap-2 mb-2">
              <span style={{ ...questionStyle, minWidth: 20, flexShrink: 0, marginBottom: 0 }}>
                {idx + 1}.
              </span>
              <p style={questionStyle}>{q.label}</p>
            </div>

            {/* Options */}
            <div className="flex flex-col gap-1.5 pl-7">
              {q.options.map(opt => (
                <RadioOption
                  key={opt}
                  label={opt}
                  selected={answers[q.id] === opt}
                  onClick={() => setAnswer(q.id, opt)}
                />
              ))}
            </div>
          </div>
        ))}
      </div>

      <button
        style={ctaStyle(allAnswered)}
        onClick={() => allAnswered && onSubmit?.(answers)}
      >
        Submit Answer
      </button>
    </div>
  )
}
