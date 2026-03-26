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

// Single-ring design: one arc ring shows progress, no separate selection ring
// 10% larger than previous (46 → 51)
const SIZE = 51
const C = 25.5          // center
const FILL_R = 20       // white/green fill radius
const RING_R = 23       // single progress ring radius (sits outside fill)
const RING_STROKE = 3.5
const CIRC = 2 * Math.PI * RING_R

const NUM_STYLE = { fontFamily: 'Roboto, system-ui, sans-serif', fontSize: '20', fontWeight: '500' }

// Shared arc helper
function Arc({ pct, color }) {
  const offset = CIRC * (1 - Math.min(Math.max(pct, 0), 100) / 100)
  return (
    <circle cx={C} cy={C} r={RING_R} stroke={color} strokeWidth={RING_STROKE}
      strokeLinecap="round" fill="none"
      strokeDasharray={CIRC} strokeDashoffset={offset}
      transform={`rotate(-90 ${C} ${C})`} />
  )
}

// Completed (100%): green fill + white checkmark + full blue ring
function Completed() {
  return (
    <svg width={SIZE} height={SIZE} viewBox={`0 0 ${SIZE} ${SIZE}`} fill="none">
      <circle cx={C} cy={C} r={FILL_R} fill="#73BE5E" />
      <circle cx={C} cy={C} r={RING_R} stroke="#0E98BE" strokeWidth={RING_STROKE} fill="none" />
      <path d="M17.5 26.5L22.5 31.5L33 20" stroke="white" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

// Full ring (just-completed animation): complete blue ring + number
function FullRing({ pageNum }) {
  return (
    <svg width={SIZE} height={SIZE} viewBox={`0 0 ${SIZE} ${SIZE}`} fill="none">
      <circle cx={C} cy={C} r={FILL_R} fill="white" />
      <circle cx={C} cy={C} r={RING_R} stroke="#0E98BE" strokeWidth={RING_STROKE} fill="none" />
      <text x={C} y={C + 5.5} textAnchor="middle" fill="#78868E" {...NUM_STYLE}>{pageNum}</text>
    </svg>
  )
}

// Partial progress: track + filled arc + number
// selected (current page) → gray number; unselected → dark number
function ProgressCircle({ pageNum, pct, selected }) {
  return (
    <svg width={SIZE} height={SIZE} viewBox={`0 0 ${SIZE} ${SIZE}`} fill="none">
      <circle cx={C} cy={C} r={FILL_R} fill="white" />
      {/* track */}
      <circle cx={C} cy={C} r={RING_R} stroke="#B0DEEA" strokeWidth={RING_STROKE} fill="none" />
      {/* progress arc */}
      {pct > 0 && <Arc pct={pct} color="#0E98BE" />}
      <text x={C} y={C + 5.5} textAnchor="middle"
        fill={selected ? '#78868E' : '#282F35'} {...NUM_STYLE}>{pageNum}</text>
    </svg>
  )
}

function PageCircle({ index, currentPage, pageProgress, justCompleted }) {
  const pageNum = index + 1
  const pct = pageProgress?.[index] ?? 0
  const isCurrent = pageNum === currentPage

  if (justCompleted.has(index)) return <FullRing pageNum={pageNum} />
  if (pct === 100)              return <Completed />
  return <ProgressCircle pageNum={pageNum} pct={pct} selected={isCurrent} />
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
  onBackToEmail,
}) {
  const [justCompleted, setJustCompleted] = useState(new Set())
  const prevProgress = useRef([])
  const timers = useRef([])

  useEffect(() => {
    pageProgress.forEach((pct, i) => {
      if (pct === 100 && (prevProgress.current[i] ?? 0) < 100) {
        setJustCompleted(prev => new Set([...prev, i]))
        const id = setTimeout(() => {
          setJustCompleted(prev => {
            const next = new Set(prev)
            next.delete(i)
            return next
          })
        }, 700)
        timers.current.push(id)
      }
    })
    prevProgress.current = pageProgress
  }, [pageProgress])

  useEffect(() => () => timers.current.forEach(clearTimeout), [])

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
      {/* LEFT — back to email + autosave + book icon + page label */}
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
