import { useState, useRef } from 'react'
import { PAGES } from '../data/questions'
import AssessmentHeader from './AssessmentHeader'
import SingleSelect from './survey/SingleSelect'
import MultiSelect from './survey/MultiSelect'
import TextField from './survey/TextField'
import CalendarSelector from './survey/CalendarSelector'
import SubQuestions from './survey/SubQuestions'
import { sfPro } from './survey/shared'
import { WellframeModal } from './WellframeModal'

// Returns 0–100 for how many questions on a page are answered
function pageProgress(pageQuestions, answers) {
  const answered = pageQuestions.filter(q => answers[q.id] !== undefined).length
  return Math.round((answered / pageQuestions.length) * 100)
}

function QuestionBlock({ q, answer, onAnswer, nextId }) {
  const handleSubmit = (val) => {
    onAnswer(q.id, val)
    if (nextId) {
      setTimeout(() => {
        const el = document.getElementById(`question-${nextId}`)
        if (el) {
          const top = el.getBoundingClientRect().top + window.scrollY - 80
          window.scrollTo({ top, behavior: 'smooth' })
        }
      }, 300)
    }
  }
  const sharedProps = { onSubmit: handleSubmit }

  const label = (
    <div style={{ display: 'flex', alignItems: 'baseline', gap: 8, marginBottom: 0 }}>
      <span style={{ fontFamily: sfPro, fontSize: 12, fontWeight: 600, color: '#0080A3', minWidth: 28, flexShrink: 0 }}>
        Q{q.number}
      </span>
    </div>
  )

  // Inject the question number prefix into the question string for each component
  const questionWithNum = `Q${q.number}. ${q.question}`

  switch (q.type) {
    case 'single':
      return <SingleSelect {...sharedProps} question={questionWithNum} options={q.options} answer={answer} />
    case 'multi':
      return <MultiSelect {...sharedProps} question={questionWithNum} options={q.options} answer={answer} />
    case 'text':
      return <TextField {...sharedProps} question={questionWithNum} answer={answer} />
    case 'calendar':
      return <CalendarSelector {...sharedProps} question={questionWithNum} answer={answer} />
    case 'sub':
      return <SubQuestions {...sharedProps} question={questionWithNum} questions={q.subQuestions} answer={answer} />
    default:
      return null
  }
}

export default function Assessment() {
  const [currentPage, setCurrentPage] = useState(1)
  const [answers, setAnswers] = useState({})
  const [submitted, setSubmitted] = useState(false)
  const [autosaveVisible, setAutosaveVisible] = useState(false)
  const autosaveHide = useRef(null)
  const [activeModal, setActiveModal] = useState(null) // 'saveClose' | 'submit'

  const totalPages = PAGES.length
  const page = PAGES[currentPage - 1]

  const allPageProgress = PAGES.map(p => pageProgress(p.questions, answers))
  const currentPageDone = allPageProgress[currentPage - 1] === 100
  const allDone = allPageProgress.every(p => p === 100)

  const setAnswer = (qId, val) => {
    setAnswers(prev => ({ ...prev, [qId]: val }))
    clearTimeout(autosaveHide.current)
    setAutosaveVisible(true)
    autosaveHide.current = setTimeout(() => setAutosaveVisible(false), 2000)
  }

  const goNext = () => { if (currentPage < totalPages) setCurrentPage(p => p + 1); window.scrollTo(0, 0) }
  const goPrev = () => { if (currentPage > 1) setCurrentPage(p => p - 1); window.scrollTo(0, 0) }

  if (submitted) {
    return (
      <div className="min-h-screen bg-[#F8FAFB] flex items-center justify-center p-6">
        <div style={{ textAlign: 'center', fontFamily: sfPro }}>
          <div style={{ width: 64, height: 64, borderRadius: '50%', background: '#73BE5E', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px' }}>
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
              <path d="M7 17L13 23L25 10" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <p style={{ fontSize: 20, fontWeight: 500, color: '#282F35', marginBottom: 8 }}>Assessment submitted</p>
          <p style={{ fontSize: 15, color: '#4E5961' }}>Thank you. Your care team will review your responses.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#F8FAFB] flex flex-col">
      <AssessmentHeader
        currentPage={currentPage}
        totalPages={totalPages}
        pageProgress={allPageProgress}
        onSaveAndClose={() => setActiveModal('saveClose')}
        onSubmit={() => setActiveModal('submit')}
        submitDisabled={!allDone}
        autosaveVisible={autosaveVisible}
        onPageSelect={(page) => { setCurrentPage(page); window.scrollTo(0, 0) }}
      />

      <div className="flex-1 py-8 px-4 flex flex-col items-center">
        <div className="w-full max-w-lg">

          {/* Questions */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {page.questions.map((q, idx) => (
              <div key={q.id} id={`question-${q.id}`}>
                <QuestionBlock
                  q={q}
                  answer={answers[q.id]}
                  onAnswer={setAnswer}
                  nextId={page.questions[idx + 1]?.id}
                />
              </div>
            ))}
          </div>

          {/* Page navigation */}
          <div style={{ display: 'flex', gap: 12, marginTop: 32, marginBottom: 48 }}>
            {currentPage > 1 && (
              <button
                onClick={goPrev}
                style={{
                  fontFamily: sfPro, fontSize: 16, fontWeight: 500,
                  color: '#0E98BE', background: 'transparent',
                  border: '1px solid #0E98BE', borderRadius: 30,
                  height: 51, flex: 1, cursor: 'pointer', letterSpacing: '-0.32px',
                }}
              >
                ← Previous
              </button>
            )}
            {currentPage < totalPages ? (
              <button
                onClick={goNext}
                style={{
                  fontFamily: sfPro, fontSize: 16, fontWeight: 500,
                  color: '#FFFFFF', background: '#0E98BE',
                  border: 'none', borderRadius: 30,
                  height: 51, flex: 1, cursor: 'pointer', letterSpacing: '-0.32px',
                  opacity: 1,
                }}
              >
                Next →
              </button>
            ) : (
              <button
                onClick={() => setSubmitted(true)}
                disabled={!allDone}
                style={{
                  fontFamily: sfPro, fontSize: 16, fontWeight: 500,
                  color: '#FFFFFF', background: '#0E98BE',
                  border: 'none', borderRadius: 30,
                  height: 51, flex: 1, letterSpacing: '-0.32px',
                  opacity: allDone ? 1 : 0.4,
                  cursor: allDone ? 'pointer' : 'not-allowed',
                }}
              >
                Submit Assessment
              </button>
            )}
          </div>

        </div>
      </div>
      <WellframeModal
        visible={activeModal === 'saveClose'}
        title="Save and close?"
        body="Your progress has been saved. You can return to complete the assessment at any time."
        primaryLabel="Keep going"
        onPrimaryPress={() => setActiveModal(null)}
        secondaryLabel="Close assessment"
        onSecondaryPress={() => setActiveModal(null)}
        onClose={() => setActiveModal(null)}
      />

      <WellframeModal
        visible={activeModal === 'submit'}
        title="Submit assessment?"
        body="Once submitted, you won't be able to make changes to your answers."
        primaryLabel="Submit"
        onPrimaryPress={() => { setActiveModal(null); setSubmitted(true) }}
        secondaryLabel="Go back"
        onSecondaryPress={() => setActiveModal(null)}
        onClose={() => setActiveModal(null)}
      />
    </div>
  )
}
