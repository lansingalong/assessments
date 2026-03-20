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

export default function NestedQuestion({ q, answer = {}, onSubmit }) {
  const triggerAnswer = answer.trigger ?? null
  const subAnswers = answer.sub ?? {}
  const expanded = triggerAnswer === q.expandValue

  const expandIdx = q.options.indexOf(q.expandValue)

  const handleTrigger = (opt) => {
    onSubmit?.({ trigger: opt, sub: subAnswers })
  }

  const handleSub = (id, val) => {
    onSubmit?.({ trigger: triggerAnswer, sub: { ...subAnswers, [id]: val } })
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
    </div>
  )
}
