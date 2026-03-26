import { useRef } from 'react'
import { cardStyle, QuestionLabel } from './shared'

// ── Shared option renderers ────────────────────────────────────────────────

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

function CheckOption({ label, checked, onClick }) {
  return (
    <button
      onClick={onClick}
      style={{ fontFamily: 'Roboto, system-ui, sans-serif', minHeight: 44, width: '100%' }}
      className="flex items-center gap-3 text-left py-[7px] px-4 rounded-xl bg-white"
    >
      <div
        className="flex-shrink-0 w-5 h-5 rounded flex items-center justify-center border-2"
        style={{ borderColor: '#0080A3', background: checked ? '#0080A3' : 'transparent', borderRadius: 5 }}
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

// ── Follow-up card ─────────────────────────────────────────────────────────

function FollowUpCard({ fq, answer, onAnswer }) {
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
        <QuestionLabel text={questionText} />
        <div className="flex flex-col gap-[6px]">
          {fq.options.map(opt => (
            <CheckOption key={opt} label={opt} checked={selected.has(opt)} onClick={() => toggle(opt)} />
          ))}
        </div>
      </div>
    )
  }

  // default: single
  return (
    <div style={cardStyle}>
      <QuestionLabel text={questionText} />
      <div className="flex flex-col gap-[6px]">
        {fq.options.map(opt => (
          <RadioOption key={opt} label={opt} selected={answer === opt} onClick={() => onAnswer(opt)} />
        ))}
      </div>
    </div>
  )
}

// ── Main component ─────────────────────────────────────────────────────────

export default function ConditionalGroup({ q, answer = {}, onSubmit, nextId }) {
  const triggerAnswer = answer.trigger ?? null
  const followUpAnswers = answer.followUps ?? {}
  const collapsed = triggerAnswer === q.skipValue

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
      // Skip value selected — scroll to next question
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

      {/* Trigger question */}
      <div style={cardStyle}>
        <QuestionLabel text={`${q.number}. ${q.question}`} required={q.required} />
        <div className="flex flex-col gap-[6px]">
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

      {/* Follow-up questions — disabled & collapsed when skipValue is selected */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: 16,
          transition: 'opacity 0.3s ease',
          opacity: collapsed ? 0.45 : 1,
          pointerEvents: collapsed ? 'none' : 'auto',
        }}
      >
        {q.followUps.map((fq, idx) => (
          <div key={fq.id} ref={idx === 0 ? firstFollowUpRef : null}>
            {collapsed ? (
              <div style={{
                ...cardStyle,
                background: '#F5F7F8',
                border: '1px solid #E0E4E7',
                cursor: 'not-allowed',
                padding: '14px 20px',
              }}>
                <div style={{
                  fontFamily: 'Roboto, system-ui, sans-serif',
                  fontSize: 16,
                  fontWeight: 500,
                  color: '#9AA5AD',
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
