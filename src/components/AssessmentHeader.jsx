import { useState, useEffect, useRef } from 'react'
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

// All circles share the same SVG canvas so layout never shifts
const SIZE = 46        // outer SVG size (includes space for selection ring)
const C = 23           // center point
const SEL_R = 21       // selection ring radius
const FILL_R = 18      // inner fill circle radius
const ARC_R = 14       // progress arc radius
const ARC_STROKE = 3
const CIRC = 2 * Math.PI * ARC_R

const NUM_STYLE = { fontFamily: 'Roboto, system-ui, sans-serif', fontSize: '13', fontWeight: '500' }

// Green circle + checkmark + blue outer ring (current page, 100% complete)
function CompletedSelected() {
  return (
    <svg width={SIZE} height={SIZE} viewBox={`0 0 ${SIZE} ${SIZE}`} fill="none">
      <circle cx={C} cy={C} r={SEL_R} stroke="#0080A3" strokeWidth="2.5" fill="none" />
      <circle cx={C} cy={C} r={FILL_R} fill="#73BE5E" />
      <path d="M16 24L21 29L30 18" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

// Green circle + checkmark, no outer ring (not current, 100% complete)
function Completed() {
  return (
    <svg width={SIZE} height={SIZE} viewBox={`0 0 ${SIZE} ${SIZE}`} fill="none">
      <circle cx={C} cy={C} r={FILL_R} fill="#73BE5E" />
      <path d="M16 24L21 29L30 18" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

// White circle + gray number + partial arc + blue outer ring (current page, partial)
function PartialSelected({ pageNum, pct }) {
  const offset = CIRC * (1 - Math.min(Math.max(pct, 0), 100) / 100)
  return (
    <svg width={SIZE} height={SIZE} viewBox={`0 0 ${SIZE} ${SIZE}`} fill="none">
      <circle cx={C} cy={C} r={SEL_R} stroke="#0080A3" strokeWidth="2.5" fill="none" />
      <circle cx={C} cy={C} r={FILL_R} fill="white" />
      <circle cx={C} cy={C} r={ARC_R} stroke="#B0DEEA" strokeWidth={ARC_STROKE} fill="none" />
      <circle cx={C} cy={C} r={ARC_R} stroke="#0E98BE" strokeWidth={ARC_STROKE} strokeLinecap="round"
        fill="none" strokeDasharray={CIRC} strokeDashoffset={offset}
        transform={`rotate(-90 ${C} ${C})`} />
      <text x={C} y={C + 5} textAnchor="middle" fill="#78868E" {...NUM_STYLE}>{pageNum}</text>
    </svg>
  )
}

// White circle + dark number + partial arc, no outer ring (not current, partial)
function Partial({ pageNum, pct }) {
  const offset = CIRC * (1 - Math.min(Math.max(pct, 0), 100) / 100)
  return (
    <svg width={SIZE} height={SIZE} viewBox={`0 0 ${SIZE} ${SIZE}`} fill="none">
      <circle cx={C} cy={C} r={FILL_R} fill="white" />
      <circle cx={C} cy={C} r={ARC_R} stroke="#B0DEEA" strokeWidth={ARC_STROKE} fill="none" />
      <circle cx={C} cy={C} r={ARC_R} stroke="#0E98BE" strokeWidth={ARC_STROKE} strokeLinecap="round"
        fill="none" strokeDasharray={CIRC} strokeDashoffset={offset}
        transform={`rotate(-90 ${C} ${C})`} />
      <text x={C} y={C + 5} textAnchor="middle" fill="#282F35" {...NUM_STYLE}>{pageNum}</text>
    </svg>
  )
}

// Full solid blue ring — shown momentarily when a page just hits 100%
function FullRing({ pageNum }) {
  return (
    <svg width={SIZE} height={SIZE} viewBox={`0 0 ${SIZE} ${SIZE}`} fill="none">
      <circle cx={C} cy={C} r={FILL_R} fill="white" />
      <circle cx={C} cy={C} r={FILL_R} stroke="#0E98BE" strokeWidth="3" fill="none" />
      <text x={C} y={C + 5} textAnchor="middle" fill="#78868E" {...NUM_STYLE}>{pageNum}</text>
    </svg>
  )
}

// Light ring + gray number (not current, 0% / not started)
function Future({ pageNum }) {
  return (
    <svg width={SIZE} height={SIZE} viewBox={`0 0 ${SIZE} ${SIZE}`} fill="none">
      <circle cx={C} cy={C} r={FILL_R} fill="white" />
      <circle cx={C} cy={C} r={FILL_R} stroke="#B0DEEA" strokeWidth="2" fill="none" />
      <text x={C} y={C + 5} textAnchor="middle" fill="#78868E" {...NUM_STYLE}>{pageNum}</text>
    </svg>
  )
}

function PageCircle({ index, currentPage, pageProgress, justCompleted }) {
  const pageNum = index + 1
  const pct = pageProgress?.[index] ?? 0
  const isCurrent = pageNum === currentPage

  if (justCompleted.has(index))  return <FullRing pageNum={pageNum} />
  if (pct === 100 && isCurrent)  return <CompletedSelected />
  if (pct === 100)               return <Completed />
  if (isCurrent)                 return <PartialSelected pageNum={pageNum} pct={pct} />
  if (pct > 0)                   return <Partial pageNum={pageNum} pct={pct} />
  return <Future pageNum={pageNum} />
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
  const [justCompleted, setJustCompleted] = useState(new Set())
  const prevProgress = useRef([])

  useEffect(() => {
    pageProgress.forEach((pct, i) => {
      if (pct === 100 && (prevProgress.current[i] ?? 0) < 100) {
        setJustCompleted(prev => new Set([...prev, i]))
        setTimeout(() => {
          setJustCompleted(prev => {
            const next = new Set(prev)
            next.delete(i)
            return next
          })
        }, 700)
      }
    })
    prevProgress.current = pageProgress
  }, [pageProgress])

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
              justCompleted={justCompleted}
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
