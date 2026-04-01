import { useRef, useId } from 'react'
import { cardStyle, QuestionLabel } from './shared'
import RadioOption from '../ui/RadioOption'
import CheckOption from '../ui/CheckOption'

function FollowUpCard({ fq, answer, onAnswer }) {
  const groupId = useId()
  const questionText = `${fq.number}. ${fq.question}`

  if (fq.type === 'multi') {
    const selected = new Set(Array.isArray(answer) ? answer : [])
    const toggle = (opt) => {
      const next = new Set(selected)
      next.has(opt) ? next.delete(opt) : next.add(opt)
      onAnswer([...next])
    }
    return (
      <div style={cardStyle}>
        <QuestionLabel text={questionText} id={groupId} />
        <div role="group" aria-labelledby={groupId} className="flex flex-col gap-[6px]">
          {fq.options.map(opt => (
            <CheckOption key={opt} label={opt} checked={selected.has(opt)} onClick={() => toggle(opt)} />
          ))}
        </div>
      </div>
    )
  }

  return (
    <div style={cardStyle}>
      <QuestionLabel text={questionText} id={groupId} />
      <div role="radiogroup" aria-labelledby={groupId} className="flex flex-col gap-[6px]">
        {fq.options.map(opt => (
          <RadioOption key={opt} label={opt} selected={answer === opt} onClick={() => onAnswer(opt)} />
        ))}
      </div>
    </div>
  )
}

export default function ConditionalGroup({ q, answer = {}, onSubmit, nextId }) {
  const triggerAnswer = answer.trigger ?? null
  const followUpAnswers = answer.followUps ?? {}
  const collapsed = triggerAnswer === q.skipValue
  const triggerId = useId()

  const firstFollowUpRef = useRef(null)

  const scrollToEl = (el) => {
    if (el) {
      const top = el.getBoundingClientRect().top + window.scrollY - 20
      window.scrollTo({ top, behavior: 'smooth' })
    }
  }

  const scrollToNextQuestion = () => {
    if (nextId) {
      const el = document.getElementById(`question-${nextId}`)
      if (el) scrollToEl(el)
    }
  }

  const handleTrigger = (opt) => {
    onSubmit?.({ trigger: opt, followUps: followUpAnswers })
    if (opt === q.skipValue) {
      setTimeout(scrollToNextQuestion, 350)
    } else if (firstFollowUpRef.current) {
      setTimeout(() => scrollToEl(firstFollowUpRef.current), 350)
    }
  }

  const handleFollowUp = (id, val, isLast) => {
    onSubmit?.({ trigger: triggerAnswer, followUps: { ...followUpAnswers, [id]: val } })
    if (isLast) {
      setTimeout(scrollToNextQuestion, 350)
    }
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>

      <div style={cardStyle}>
        <QuestionLabel text={`${q.number}. ${q.question}`} required={q.required} id={triggerId} />
        <div role="radiogroup" aria-labelledby={triggerId} className="flex flex-col gap-[6px]">
          {q.options.map(opt => (
            <RadioOption
              key={opt}
              label={opt}
              selected={triggerAnswer === opt}
              onClick={() => handleTrigger(opt)}
            />
          ))}
        </div>
      </div>

      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: 16,
          transition: 'opacity 0.3s ease',
          opacity: collapsed ? 0.45 : 1,
          pointerEvents: collapsed ? 'none' : 'auto',
        }}
        aria-hidden={collapsed}
      >
        {q.followUps.map((fq, idx) => (
          <div key={fq.id} ref={idx === 0 ? firstFollowUpRef : null}>
            {collapsed ? (
              <div style={{
                ...cardStyle,
                background: 'var(--color-bg-surface)',
                border: '1px solid var(--color-border)',
                cursor: 'not-allowed',
                padding: '14px 20px',
              }}>
                <div style={{
                  fontFamily: 'Roboto, system-ui, sans-serif',
                  fontSize: 16,
                  fontWeight: 500,
                  color: 'var(--color-text-mid)',
                  lineHeight: 1.4,
                }}>
                  {fq.number}. {fq.question}
                </div>
              </div>
            ) : (
              <FollowUpCard
                fq={fq}
                answer={followUpAnswers[fq.id]}
                onAnswer={(val) => handleFollowUp(fq.id, val, idx === q.followUps.length - 1)}
              />
            )}
          </div>
        ))}
      </div>

    </div>
  )
}
