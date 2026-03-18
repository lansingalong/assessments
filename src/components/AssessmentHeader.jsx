import { sfPro } from './survey/shared'
import AutosaveIndicator from './AutosaveIndicator'

/**
 * AssessmentHeader
 *
 * Props:
 *   currentPage     {number}   1-indexed current page number
 *   totalPages      {number}   total number of pages
 *   pageProgress    {number[]} 0–100 completion % per page, length === totalPages
 *   onSaveAndClose  {fn}       called when "Save and Close" is clicked
 *   onSubmit        {fn}       called when "Submit" is clicked
 *   submitDisabled  {boolean}  disables the Submit button (default false)
 */

// ─── Circle indicators ──────────────────────────────────────────────────────

const SIZE = 40       // circle diameter
const C = SIZE / 2    // center point
const R = 17          // arc radius (leaves ~3px for stroke on each side)
const CIRC = 2 * Math.PI * R

function CompletedCircle() {
  return (
    <svg width={SIZE} height={SIZE} viewBox={`0 0 ${SIZE} ${SIZE}`} fill="none">
      <circle cx={C} cy={C} r={C} fill="#73BE5E" />
      <path
        d="M13 21L17.5 25.5L27 15"
        stroke="white"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function CurrentCircle({ pageNum }) {
  return (
    <svg width={SIZE} height={SIZE} viewBox={`0 0 ${SIZE} ${SIZE}`} fill="none">
      <circle cx={C} cy={C} r={C} fill="#0E98BE" />
      <text x={C} y={C + 5} textAnchor="middle" fill="white" fontSize="15" fontWeight="500" fontFamily="system-ui, sans-serif">{pageNum}</text>
    </svg>
  )
}

function FutureCircle({ pageNum }) {
  return (
    <svg width={SIZE} height={SIZE} viewBox={`0 0 ${SIZE} ${SIZE}`} fill="none">
      <circle cx={C} cy={C} r={C} fill="#D9E3E7" />
      <text x={C} y={C + 5} textAnchor="middle" fill="#78868E" fontSize="15" fontWeight="500" fontFamily="system-ui, sans-serif">{pageNum}</text>
    </svg>
  )
}

function PartialCircle({ pageNum, pct }) {
  const offset = CIRC * (1 - Math.min(Math.max(pct, 0), 100) / 100)
  return (
    <svg width={SIZE} height={SIZE} viewBox={`0 0 ${SIZE} ${SIZE}`} fill="none">
      {/* filled background */}
      <circle cx={C} cy={C} r={C} fill="#EEF5F7" />
      {/* track */}
      <circle cx={C} cy={C} r={R} stroke="#D9E3E7" strokeWidth="3" fill="none" />
      {/* progress arc */}
      <circle
        cx={C} cy={C} r={R}
        stroke="#0E98BE"
        strokeWidth="3"
        strokeLinecap="round"
        fill="none"
        strokeDasharray={CIRC}
        strokeDashoffset={offset}
        transform={`rotate(-90 ${C} ${C})`}
      />
      <text x={C} y={C + 5} textAnchor="middle" fill="#0E98BE" fontSize="15" fontWeight="500" fontFamily="system-ui, sans-serif">{pageNum}</text>
    </svg>
  )
}

function PageCircle({ index, currentPage, pageProgress }) {
  const pageNum = index + 1
  const pct = pageProgress?.[index] ?? 0

  if (pct === 100) return <CompletedCircle />
  if (pageNum === currentPage) return <CurrentCircle pageNum={pageNum} />
  if (pct > 0) return <PartialCircle pageNum={pageNum} pct={pct} />
  return <FutureCircle pageNum={pageNum} />
}

// ─── Buttons ────────────────────────────────────────────────────────────────

const btnBase = {
  fontFamily: sfPro,
  fontSize: 16,
  fontWeight: 500,
  letterSpacing: '-0.32px',
  borderRadius: 30,
  height: 51,
  padding: '15px 24px',
  border: 'none',
  cursor: 'pointer',
  whiteSpace: 'nowrap',
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
}

// ─── Component ──────────────────────────────────────────────────────────────

export default function AssessmentHeader({
  currentPage = 1,
  totalPages = 1,
  pageProgress = [],
  onSaveAndClose,
  onSubmit,
  submitDisabled = false,
  onPageSelect,
  autosaveVisible = false,
}) {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        width: '100%',
        padding: '12px 16px',
        background: '#FFFFFF',
        borderBottom: '1px solid #E8EDF0',
      }}
    >
      {/* LEFT — autosave + book icon + page label */}
      <div style={{ flex: 1, display: 'flex', alignItems: 'center', gap: 12 }}>
        <AutosaveIndicator visible={autosaveVisible} />
        <svg width="18" height="16" viewBox="0 0 18 16" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M1 1.5C1 1.5 4 0.5 9 2.5C14 0.5 17 1.5 17 1.5V14.5C17 14.5 14 13.5 9 15.5C4 13.5 1 14.5 1 14.5V1.5Z" stroke="#4E5961" strokeWidth="1.4" strokeLinejoin="round"/>
          <line x1="9" y1="2.5" x2="9" y2="15.5" stroke="#4E5961" strokeWidth="1.4"/>
        </svg>
        <span
          style={{
            fontFamily: sfPro,
            fontSize: 13,
            fontWeight: 500,
            color: '#282F35',
            letterSpacing: '-0.1px',
          }}
        >
          Page {currentPage} of {totalPages}
        </span>
      </div>

      {/* CENTER — progress circles */}
      <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
        {Array.from({ length: totalPages }).map((_, i) => (
          <button
            key={i}
            onClick={() => onPageSelect?.(i + 1)}
            style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer', lineHeight: 0 }}
          >
            <PageCircle
              index={i}
              currentPage={currentPage}
              pageProgress={pageProgress}
            />
          </button>
        ))}
      </div>

      {/* RIGHT — buttons */}
      <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: 12 }}>
        <button
          onClick={onSaveAndClose}
          style={{
            ...btnBase,
            color: '#0E98BE',
            background: 'transparent',
            border: '1px solid #0E98BE',
          }}
        >
          Save and Close
        </button>
        <button
          onClick={onSubmit}
          disabled={submitDisabled}
          style={{
            ...btnBase,
            color: '#FFFFFF',
            background: '#0E98BE',
            opacity: submitDisabled ? 0.4 : 1,
            cursor: submitDisabled ? 'not-allowed' : 'pointer',
          }}
        >
          Submit
        </button>
      </div>
    </div>
  )
}
