import { useState, useRef, useMemo, useEffect } from 'react'
import { PAGES } from '../data/questions'
import AssessmentHeader from './AssessmentHeader'
import SingleSelect from './survey/SingleSelect'
import MultiSelect from './survey/MultiSelect'
import TextField from './survey/TextField'
import CalendarSelector from './survey/CalendarSelector'
import SubQuestions from './survey/SubQuestions'
import { sfPro } from './survey/shared'
import { WellframeModal } from './WellframeModal'
import ConditionalGroup from './survey/ConditionalGroup'
import NestedQuestion from './survey/NestedQuestion'

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
  const sharedProps = { onSubmit: handleSubmit, required: q.required }

  const questionWithNum = `${q.number}. ${q.question}`

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
    case 'conditional':
      return <ConditionalGroup q={q} answer={answer} onSubmit={(val) => onAnswer(q.id, val)} />
    case 'nested':
      return <NestedQuestion q={q} answer={answer} onSubmit={(val) => onAnswer(q.id, val)} nextId={nextId} />
    default:
      return null
  }
}

function SuccessIllustration() {
  return (
    <svg viewBox="0 0 820 430" fill="none" xmlns="http://www.w3.org/2000/svg"
      style={{ width: '100%', maxWidth: 720, marginTop: 40 }}>
      <defs>
        <linearGradient id="arcPurple" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#C8A8E8" stopOpacity="0.7"/>
          <stop offset="100%" stopColor="#C8A8E8" stopOpacity="0"/>
        </linearGradient>
        <linearGradient id="arcOrange" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#F5B87A" stopOpacity="0.7"/>
          <stop offset="100%" stopColor="#F5B87A" stopOpacity="0"/>
        </linearGradient>
        <linearGradient id="arcGreen" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#A8D878" stopOpacity="0.6"/>
          <stop offset="100%" stopColor="#A8D878" stopOpacity="0"/>
        </linearGradient>
        <linearGradient id="arcTeal" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#70C8D8" stopOpacity="0.5"/>
          <stop offset="100%" stopColor="#70C8D8" stopOpacity="0"/>
        </linearGradient>
      </defs>

      {/* ── Scattered teal squares ── */}
      <rect x="342" y="44"  width="13" height="13" fill="#0E98BE" opacity="0.85"/>
      <rect x="364" y="68"  width="18" height="18" fill="#0E98BE" opacity="0.7"/>
      <rect x="290" y="130" width="13" height="13" fill="#0E98BE" opacity="0.8"/>
      <rect x="432" y="54"  width="10" height="10" fill="#0E98BE" opacity="0.7"/>
      <rect x="268" y="350" width="14" height="14" fill="#0E98BE" opacity="0.8"/>
      <rect x="305" y="390" width="10" height="10" fill="#0E98BE" opacity="0.65"/>
      <rect x="500" y="38"  width="12" height="12" fill="#0E98BE" opacity="0.75"/>
      <rect x="520" y="168" width="15" height="15" fill="#0E98BE" opacity="0.7"/>
      <rect x="745" y="175" width="12" height="12" fill="#0E98BE" opacity="0.6"/>
      <rect x="762" y="295" width="16" height="16" fill="#0E98BE" opacity="0.5"/>

      {/* ── Rainbow arc bands ── */}
      <path d="M 215 415 C 360 255 530 230 700 315" stroke="url(#arcPurple)"  strokeWidth="80" strokeLinecap="round"/>
      <path d="M 222 385 C 368 225 538 205 705 290" stroke="url(#arcOrange)" strokeWidth="65" strokeLinecap="round"/>
      <path d="M 230 368 C 378 208 548 190 710 275" stroke="url(#arcGreen)"  strokeWidth="48" strokeLinecap="round"/>
      <path d="M 238 354 C 388 194 558 178 716 264" stroke="url(#arcTeal)"   strokeWidth="32" strokeLinecap="round"/>

      {/* ── Phone ── */}
      <rect x="574" y="82" width="138" height="242" rx="14" fill="#1B3A4A"/>
      <circle cx="643" cy="95"  r="5"  fill="#2D5A70"/>
      {/* tiles */}
      <rect x="588" y="110" width="55" height="50" rx="7" fill="#2A5E78"/>
      <rect x="648" y="110" width="50" height="50" rx="7" fill="#2A5E78"/>
      <rect x="588" y="165" width="55" height="50" rx="7" fill="#2A5E78"/>
      <rect x="648" y="165" width="50" height="50" rx="7" fill="#2A5E78"/>
      {/* text rows at bottom */}
      <rect x="588" y="222" width="110" height="7" rx="3" fill="#2A5E78"/>
      <rect x="588" y="234" width="82"  height="7" rx="3" fill="#2A5E78"/>
      <rect x="588" y="252" width="110" height="7" rx="3" fill="#2A5E78"/>
      <rect x="588" y="264" width="65"  height="7" rx="3" fill="#2A5E78"/>
      {/* EKG icon in tile 1 */}
      <path d="M594 136 L604 136 L608 125 L614 148 L619 132 L624 136 L634 136" stroke="#6DC8D8" strokeWidth="2" strokeLinecap="round" fill="none"/>
      {/* text lines in tile 2 */}
      <rect x="652" y="122" width="36" height="4" rx="2" fill="#6DC8D8" opacity="0.7"/>
      <rect x="652" y="130" width="26" height="4" rx="2" fill="#6DC8D8" opacity="0.5"/>
      <rect x="652" y="138" width="32" height="4" rx="2" fill="#6DC8D8" opacity="0.5"/>
      {/* ? in tile 3 */}
      <text x="615" y="198" fontSize="26" fill="#6DC8D8" textAnchor="middle" fontFamily="Roboto, sans-serif" fontWeight="500">?</text>
      {/* shield in tile 4 */}
      <path d="M668 178 L680 182 L680 196 C680 203 668 207 668 207 C668 207 656 203 656 196 L656 182 Z" fill="#6DC8D8" opacity="0.7"/>
      <path d="M663 193 L667 197 L675 189" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" fill="none"/>

      {/* ── Person 1 — left, short, pink Wellframe shirt, arms raised ── */}
      {/* head */}
      <circle cx="264" cy="218" r="27" fill="#F4C5A3"/>
      {/* hair */}
      <path d="M242 212 Q248 192 274 196 Q282 206 276 202 Q266 192 252 195 Z" fill="#3A2010"/>
      {/* body */}
      <path d="M244 242 Q242 295 234 345 L294 345 Q288 295 286 242 Q275 250 264 250 Q253 250 244 242Z" fill="#E0509A"/>
      {/* left arm up */}
      <path d="M246 252 C232 230 220 210 210 198" stroke="#E0509A" strokeWidth="18" strokeLinecap="round"/>
      {/* right arm up */}
      <path d="M282 252 C298 232 310 214 318 200" stroke="#E0509A" strokeWidth="18" strokeLinecap="round"/>
      <circle cx="208" cy="195" r="11" fill="#F4C5A3"/>
      <circle cx="320" cy="197" r="11" fill="#F4C5A3"/>
      {/* legs */}
      <path d="M250 345 L244 420 L260 420 L264 368 L268 368 L272 420 L288 420 L282 345Z" fill="#2A7A9A"/>
      <ellipse cx="250" cy="422" rx="14" ry="6" fill="#1A2535"/>
      <ellipse cx="278" cy="422" rx="14" ry="6" fill="#1A2535"/>
      {/* Wellframe logo */}
      <circle cx="264" cy="288" r="15" fill="white" opacity="0.25"/>
      <path d="M257 288 L261 298 L264 290 L267 298 L271 288" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" fill="none"/>

      {/* ── Person 2 — middle, tall, purple, pointing right ── */}
      {/* head */}
      <circle cx="400" cy="200" r="29" fill="#F4C5A3"/>
      {/* hair */}
      <path d="M376 196 Q380 174 408 178 Q420 190 412 196 Q406 180 388 182 Z" fill="#2A1A0A"/>
      {/* glasses */}
      <circle cx="392" cy="200" r="9" fill="none" stroke="#5A3A1A" strokeWidth="2"/>
      <circle cx="410" cy="200" r="9" fill="none" stroke="#5A3A1A" strokeWidth="2"/>
      <line x1="401" y1="200" x2="401" y2="200" stroke="#5A3A1A" strokeWidth="2"/>
      {/* body */}
      <path d="M375 228 Q373 290 366 355 L434 355 Q430 290 428 228 Q414 238 400 238 Q386 238 375 228Z" fill="#A855C8"/>
      {/* right arm pointing at phone */}
      <path d="M424 242 C455 234 488 232 514 234" stroke="#A855C8" strokeWidth="18" strokeLinecap="round"/>
      <circle cx="516" cy="234" r="11" fill="#F4C5A3"/>
      {/* left arm */}
      <path d="M378 242 C366 258 360 272 356 282" stroke="#A855C8" strokeWidth="18" strokeLinecap="round"/>
      {/* legs */}
      <path d="M384 355 L376 435 L394 435 L398 378 L402 378 L406 435 L424 435 L416 355Z" fill="#2A3A5A"/>
      <ellipse cx="382" cy="437" rx="15" ry="6" fill="#CC3A30"/>
      <ellipse cx="419" cy="437" rx="15" ry="6" fill="#CC3A30"/>
      {/* Wellframe logo */}
      <circle cx="400" cy="300" r="16" fill="white" opacity="0.25"/>
      <path d="M393 300 L397 311 L400 302 L403 311 L407 300" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" fill="none"/>

      {/* ── Person 3 — right of phone, teal, arm reaching left ── */}
      {/* head */}
      <circle cx="778" cy="196" r="27" fill="#F4C5A3"/>
      {/* hair */}
      <path d="M756 192 Q762 170 796 174 Q808 186 800 192 Q794 176 768 178 Z" fill="#2A1008"/>
      {/* body */}
      <path d="M758 224 Q756 278 748 338 L808 338 Q804 278 800 224 Q789 234 778 234 Q767 234 758 224Z" fill="#1A9A88"/>
      {/* left arm reaching to phone */}
      <path d="M760 236 C740 242 722 248 712 252" stroke="#1A9A88" strokeWidth="18" strokeLinecap="round"/>
      <circle cx="710" cy="253" r="11" fill="#F4C5A3"/>
      {/* right arm */}
      <path d="M800 236 C815 252 820 264 822 276" stroke="#1A9A88" strokeWidth="18" strokeLinecap="round"/>
      {/* legs */}
      <path d="M764 338 L758 418 L776 418 L779 360 L781 360 L784 418 L800 418 L794 338Z" fill="#2A2A2A"/>
      <ellipse cx="764" cy="420" rx="14" ry="6" fill="#E08020"/>
      <ellipse cx="792" cy="420" rx="14" ry="6" fill="#E08020"/>

      {/* ── Floating health icons ── */}
      {/* Calendar (top-left area) */}
      <rect x="316" y="60" width="54" height="50" rx="6" fill="#EEEEF8"/>
      <rect x="316" y="60" width="54" height="15" rx="6" fill="#9898B8"/>
      <rect x="323" y="82" width="7" height="7" rx="1" fill="#9898B8" opacity="0.6"/>
      <rect x="336" y="82" width="7" height="7" rx="1" fill="#9898B8" opacity="0.6"/>
      <rect x="349" y="82" width="7" height="7" rx="1" fill="#9898B8" opacity="0.6"/>
      <rect x="323" y="94" width="7" height="7" rx="1" fill="#9898B8" opacity="0.6"/>
      <rect x="336" y="94" width="7" height="7" rx="1" fill="#9898B8" opacity="0.6"/>
      <circle cx="366" cy="66" r="8" fill="#9898B8" opacity="0.5"/>
      {/* Smartwatch */}
      <rect x="448" y="102" width="34" height="44" rx="10" fill="#2A2A3A"/>
      <rect x="453" y="80"  width="24" height="28" rx="5" fill="#3A3A4A"/>
      <path d="M454 118 L460 114 L465 122 L471 108 L476 118" stroke="#00C8A8" strokeWidth="1.8" fill="none" strokeLinecap="round"/>
      <rect x="454" y="140" width="22" height="8"  rx="4" fill="#3A3A4A"/>
      {/* Blood glucose */}
      <rect x="506" y="112" width="44" height="58" rx="8" fill="#E8E8EE"/>
      <circle cx="528" cy="130" r="11" fill="#F5F5F8"/>
      <text x="527" y="134" fontSize="10" fill="#4488CC" textAnchor="middle" fontFamily="Roboto,sans-serif" fontWeight="700">135</text>
      <rect x="512" y="148" width="32" height="5" rx="2" fill="#CACAD8"/>
      <rect x="512" y="158" width="22" height="5" rx="2" fill="#CACAD8"/>
      {/* Heart + EKG */}
      <circle cx="614" cy="266" r="30" fill="#F84060" opacity="0.12"/>
      <path d="M590 268 L600 268 L606 254 L612 282 L618 262 L624 268 L638 268" stroke="#F84060" strokeWidth="2.2" strokeLinecap="round" fill="none"/>
      {/* Footsteps circle */}
      <circle cx="182" cy="334" r="32" fill="none" stroke="#CC44BB" strokeWidth="2.5" opacity="0.6"/>
      <ellipse cx="174" cy="336" rx="5" ry="8" fill="#CC44BB" opacity="0.7" transform="rotate(-15 174 336)"/>
      <ellipse cx="190" cy="330" rx="5" ry="8" fill="#CC44BB" opacity="0.7" transform="rotate(15 190 330)"/>
      {/* Rx bell */}
      <path d="M192 405 Q192 385 210 382 Q228 385 228 405 L228 415 L192 415 Z" fill="#F5A030"/>
      <text x="210" y="410" fontSize="13" fill="white" textAnchor="middle" fontFamily="Roboto,sans-serif" fontWeight="700">Rx</text>
      <circle cx="210" cy="418" r="5" fill="#F5A030"/>
    </svg>
  )
}

export default function Assessment({ onBackToEmail }) {
  const [currentPage, setCurrentPage] = useState(1)
  const [answers, setAnswers] = useState({})
  const [submitted, setSubmitted] = useState(false)
  const [autosaveVisible, setAutosaveVisible] = useState(false)
  const autosaveHide = useRef(null)
  const [activeModal, setActiveModal] = useState(null) // 'saveClose' | 'submit'

  const totalPages = PAGES.length
  const page = PAGES[currentPage - 1]

  const allPageProgress = useMemo(
    () => PAGES.map(p => pageProgress(p.questions, answers)),
    [answers]
  )

  // Clear autosave timer on unmount
  useEffect(() => () => clearTimeout(autosaveHide.current), [])

  const setAnswer = (qId, val) => {
    setAnswers(prev => ({ ...prev, [qId]: val }))
    clearTimeout(autosaveHide.current)
    setAutosaveVisible(true)
    autosaveHide.current = setTimeout(() => setAutosaveVisible(false), 2000)
  }

  const goNext = () => { if (currentPage < totalPages) { setCurrentPage(p => p + 1); window.scrollTo(0, 0) } }
  const goPrev = () => { if (currentPage > 1) { setCurrentPage(p => p - 1); window.scrollTo(0, 0) } }

  if (submitted) {
    return (
      <div style={{ minHeight: '100vh', background: '#fff', display: 'flex', flexDirection: 'column', alignItems: 'center', paddingTop: 64, paddingBottom: 40, paddingLeft: 24, paddingRight: 24 }}>

        {/* Green checkmark */}
        <div style={{ width: 56, height: 56, borderRadius: '50%', background: '#73BE5E', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 24, flexShrink: 0 }}>
          <svg width="26" height="20" viewBox="0 0 26 20" fill="none">
            <path d="M2 10L9 17L24 2" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>

        {/* Title */}
        <h1 style={{ fontFamily: sfPro, fontSize: 26, fontWeight: 700, color: '#0E98BE', textAlign: 'center', margin: '0 0 16px', maxWidth: 440, lineHeight: 1.3 }}>
          Thank you for completing your<br />Comprehensive Assessment!
        </h1>

        {/* Subtitle */}
        <p style={{ fontFamily: 'Roboto, system-ui, sans-serif', fontSize: 15, color: '#4E5961', textAlign: 'center', margin: 0, maxWidth: 360, lineHeight: 1.7 }}>
          Your responses have been recorded and will help<br />us better support your care and next steps.
        </p>

        {/* Illustration */}
        <SuccessIllustration />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#F2F8FA] flex flex-col">
      <AssessmentHeader
        currentPage={currentPage}
        totalPages={totalPages}
        pageProgress={allPageProgress}
        onSaveAndClose={() => setActiveModal('saveClose')}
        onSubmit={() => setActiveModal('submit')}
        submitDisabled={false}
        autosaveVisible={autosaveVisible}
        onPageSelect={(page) => { setCurrentPage(page); window.scrollTo(0, 0) }}
        onBackToEmail={onBackToEmail}
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
                onClick={() => setActiveModal('submit')}
                style={{
                  fontFamily: sfPro, fontSize: 16, fontWeight: 500,
                  color: '#FFFFFF', background: '#0E98BE',
                  border: 'none', borderRadius: 30,
                  height: 51, flex: 1, letterSpacing: '-0.32px',
                  opacity: 1,
                  cursor: 'pointer',
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
        onSecondaryPress={() => { setActiveModal(null); window.history.back() }}
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
