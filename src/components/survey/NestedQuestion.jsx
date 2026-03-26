import { cardStyle, QuestionLabel } from './shared'

// ── Option renderers ───────────────────────────────────────────────────────

function RadioOption({ label, selected, onClick }) {
  return (
    <button
      onClick={onClick}
      style={{ fontFamily: 'Roboto, system-ui, sans-serif', minHeight: 44, width: '100%' }}
      className="flex items-center gap-3 text-left py-[7px] px-2 rounded-xl"
    >
      <div
        className="flex-shrink-0 w-5 h-5 rounded-full border-2 flex items-center justify-center"
        style={{ borderColor: '#0E98BE' }}
      >
        {selected && <div className="w-2.5 h-2.5 rounded-full" style={{ background: '#0E98BE' }} />}
      </div>
      <span style={{ fontSize: 16, fontWeight: 400, color: '#282F35' }}>{label}</span>
    </button>
  )
}

function CheckOption({ label, checked, onClick }) {
  return (
    <button
      onClick={onClick}
      style={{ fontFamily: 'Roboto, system-ui, sans-serif', minHeight: 40, width: '100%' }}
      className="flex items-center gap-3 text-left py-[6px] px-2 rounded-xl"
    >
      <div
        className="flex-shrink-0 w-5 h-5 flex items-center justify-center border-2"
        style={{
          borderColor: '#0E98BE',
          borderRadius: 4,
          background: checked ? '#0E98BE' : 'transparent',
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

// ── Sub-question card ──────────────────────────────────────────────────────

function SubCard({ sq, answer, onAnswer }) {
  if (sq.type === 'multi') {
    const selected = new Set(Array.isArray(answer) ? answer : [])
    const toggle = (opt) => {
      const next = new Set(selected)
      next.has(opt) ? next.delete(opt) : next.add(opt)
      onAnswer([...next])
    }
    return (
      <div style={{
        border: '1px solid #D4E3E9',
        borderRadius: 10,
        padding: '14px 16px',
        background: '#fff',
      }}>
        <p style={{
          fontFamily: 'Roboto, system-ui, sans-serif',
          fontSize: 15,
          fontWeight: 400,
          color: '#282F35',
          margin: '0 0 10px',
          lineHeight: 1.4,
        }}>
          {sq.question}
          {sq.required && <span style={{ color: '#F05B60' }}> *</span>}
        </p>
        <div className="flex flex-col">
          {sq.options.map(opt => (
            <CheckOption key={opt} label={opt} checked={selected.has(opt)} onClick={() => toggle(opt)} />
          ))}
        </div>
      </div>
    )
  }

  // single-select
  return (
    <div style={{
      border: '1px solid #D4E3E9',
      borderRadius: 10,
      padding: '14px 16px',
      background: '#fff',
    }}>
      <p style={{
        fontFamily: 'Roboto, system-ui, sans-serif',
        fontSize: 15,
        fontWeight: 400,
        color: '#282F35',
        margin: '0 0 6px',
        lineHeight: 1.4,
      }}>
        {sq.question}
        {sq.required && <span style={{ color: '#F05B60' }}> *</span>}
      </p>
      <div className="flex flex-col">
        {sq.options.map(opt => (
          <RadioOption key={opt} label={opt} selected={answer === opt} onClick={() => onAnswer(opt)} />
        ))}
      </div>
    </div>
  )
}

// ── Main component ─────────────────────────────────────────────────────────

export default function NestedQuestion({ q, answer = {}, onSubmit, nextId }) {
  const triggerAnswer = answer.trigger ?? null
  const subAnswers = answer.sub ?? {}
  const expanded = triggerAnswer === q.expandValue

  const expandIdx = q.options.indexOf(q.expandValue)

  // Next is enabled when: trigger is answered AND all required sub-questions
  // (if expanded) have at least one selection
  const requiredSubsDone = !expanded || q.subQuestions
    .filter(sq => sq.required)
    .every(sq => {
      const a = subAnswers[sq.id]
      return sq.type === 'multi' ? Array.isArray(a) && a.length > 0 : a != null
    })
  const canProceed = triggerAnswer !== null && requiredSubsDone

  const handleTrigger = (opt) => {
    onSubmit?.({ trigger: opt, sub: subAnswers })
    // If non-expand value selected (no sub-questions needed), auto-scroll to next
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
      <QuestionLabel text={`${q.number}. ${q.question}`} required={q.required} />

      <div style={{ display: 'flex', flexDirection: 'column' }}>
        {q.options.map((opt, idx) => (
          <div key={opt}>
            <RadioOption
              label={opt}
              selected={triggerAnswer === opt}
              onClick={() => handleTrigger(opt)}
            />

            {/* Sub-questions appear after the expandValue option */}
            {idx === expandIdx && (
              <div
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

      {/* Next button */}
      <button
        onClick={handleNext}
        disabled={!canProceed}
        style={{
          marginTop: 20,
          width: '100%',
          height: 48,
          borderRadius: 30,
          border: 'none',
          fontSize: 16,
          fontWeight: 500,
          fontFamily: 'Roboto, system-ui, sans-serif',
          color: '#fff',
          background: canProceed ? '#0E98BE' : '#86CBDF',
          cursor: canProceed ? 'pointer' : 'not-allowed',
          transition: 'background 0.2s',
        }}
      >
        Next
      </button>
    </div>
  )
}
