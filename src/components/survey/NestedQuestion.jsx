import { useId } from 'react'
import { cardStyle, QuestionLabel } from './shared'
import RadioOption from '../ui/RadioOption'
import CheckOption from '../ui/CheckOption'

function SubCard({ sq, answer, onAnswer }) {
  const groupId = useId()

  if (sq.type === 'multi') {
    const selected = new Set(Array.isArray(answer) ? answer : [])
    const toggle = (opt) => {
      const next = new Set(selected)
      next.has(opt) ? next.delete(opt) : next.add(opt)
      onAnswer([...next])
    }
    return (
      <div style={{
        border: '1px solid var(--color-border-mid)',
        borderRadius: 10,
        padding: '14px 16px',
        background: 'var(--color-white)',
      }}>
        <p id={groupId} style={{
          fontFamily: 'Roboto, system-ui, sans-serif',
          fontSize: 15,
          fontWeight: 400,
          color: 'var(--color-text)',
          margin: '0 0 10px',
          lineHeight: 1.4,
        }}>
          {sq.question}
          {sq.required && <span aria-hidden="true" style={{ color: 'var(--color-error-light)' }}> *</span>}
          {sq.required && <span className="sr-only"> (required)</span>}
        </p>
        <div role="group" aria-labelledby={groupId} className="flex flex-col">
          {sq.options.map(opt => (
            <CheckOption key={opt} label={opt} checked={selected.has(opt)} onClick={() => toggle(opt)} />
          ))}
        </div>
      </div>
    )
  }

  return (
    <div style={{
      border: '1px solid var(--color-border-mid)',
      borderRadius: 10,
      padding: '14px 16px',
      background: 'var(--color-white)',
    }}>
      <p id={groupId} style={{
        fontFamily: 'Roboto, system-ui, sans-serif',
        fontSize: 15,
        fontWeight: 400,
        color: 'var(--color-text)',
        margin: '0 0 6px',
        lineHeight: 1.4,
      }}>
        {sq.question}
        {sq.required && <span aria-hidden="true" style={{ color: 'var(--color-error-light)' }}> *</span>}
        {sq.required && <span className="sr-only"> (required)</span>}
      </p>
      <div role="radiogroup" aria-labelledby={groupId} className="flex flex-col">
        {sq.options.map(opt => (
          <RadioOption key={opt} label={opt} selected={answer === opt} onClick={() => onAnswer(opt)} />
        ))}
      </div>
    </div>
  )
}

export default function NestedQuestion({ q, answer = {}, onSubmit, nextId }) {
  const triggerAnswer = answer.trigger ?? null
  const subAnswers = answer.sub ?? {}
  const expanded = triggerAnswer === q.expandValue
  const expandIdx = q.options.indexOf(q.expandValue)
  const headingId = useId()

  const requiredSubsDone = !expanded || q.subQuestions
    .filter(sq => sq.required)
    .every(sq => {
      const a = subAnswers[sq.id]
      return sq.type === 'multi' ? Array.isArray(a) && a.length > 0 : a != null
    })
  const canProceed = triggerAnswer !== null && requiredSubsDone

  const handleTrigger = (opt) => {
    onSubmit?.({ trigger: opt, sub: subAnswers })
    if (opt !== q.expandValue && nextId) {
      setTimeout(() => {
        const el = document.getElementById(`question-${nextId}`)
        if (el) {
          const top = el.getBoundingClientRect().top + window.scrollY - 20
          window.scrollTo({ top, behavior: 'smooth' })
        }
      }, 300)
    }
  }

  const handleSub = (id, val) => {
    onSubmit?.({ trigger: triggerAnswer, sub: { ...subAnswers, [id]: val } })
  }

  const handleNext = () => {
    if (!canProceed || !nextId) return
    const el = document.getElementById(`question-${nextId}`)
    if (el) {
      const top = el.getBoundingClientRect().top + window.scrollY - 20
      window.scrollTo({ top, behavior: 'smooth' })
    }
  }

  return (
    <div style={cardStyle}>
      <QuestionLabel text={`${q.number}. ${q.question}`} required={q.required} id={headingId} />

      <div role="radiogroup" aria-labelledby={headingId} style={{ display: 'flex', flexDirection: 'column' }}>
        {q.options.map((opt, idx) => (
          <div key={opt}>
            <RadioOption
              label={opt}
              selected={triggerAnswer === opt}
              onClick={() => handleTrigger(opt)}
            />

            {idx === expandIdx && (
              <div
                aria-hidden={!expanded}
                style={{
                  marginLeft: 32,
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 10,
                  overflow: 'hidden',
                  maxHeight: expanded ? 9999 : 0,
                  opacity: expanded ? 1 : 0,
                  marginTop: expanded ? 10 : 0,
                  marginBottom: expanded ? 10 : 0,
                  pointerEvents: expanded ? 'auto' : 'none',
                  transition: 'max-height 0.4s ease, opacity 0.25s ease, margin 0.3s ease',
                }}
              >
                {q.subQuestions.map(sq => (
                  <SubCard
                    key={sq.id}
                    sq={sq}
                    answer={subAnswers[sq.id]}
                    onAnswer={(val) => handleSub(sq.id, val)}
                  />
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      <button
        onClick={handleNext}
        disabled={!canProceed}
        aria-disabled={!canProceed}
        style={{
          marginTop: 20,
          width: '100%',
          height: 48,
          borderRadius: 30,
          border: 'none',
          fontSize: 16,
          fontWeight: 500,
          fontFamily: 'Roboto, system-ui, sans-serif',
          color: 'var(--color-white)',
          background: canProceed ? 'var(--color-brand-accent)' : 'var(--color-brand-disabled)',
          cursor: canProceed ? 'pointer' : 'not-allowed',
          transition: 'background 0.2s',
        }}
      >
        Next
      </button>
    </div>
  )
}
