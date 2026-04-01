import { useState, useEffect, useRef } from 'react'
import { sfPro } from './survey/shared'
import AutosaveIndicator from './AutosaveIndicator'

const SIZE = 51
const C = 25.5
const FILL_R = 20
const RING_R = 23
const RING_STROKE = 3.5
const CIRC = 2 * Math.PI * RING_R

const NUM_STYLE = { fontFamily: 'Roboto, system-ui, sans-serif', fontSize: '20', fontWeight: '500' }

function Arc({ pct, color }) {
  const offset = CIRC * (1 - Math.min(Math.max(pct, 0), 100) / 100)
  return (
    <circle cx={C} cy={C} r={RING_R} stroke={color} strokeWidth={RING_STROKE}
      strokeLinecap="round" fill="none"
      strokeDasharray={CIRC} strokeDashoffset={offset}
      transform={`rotate(-90 ${C} ${C})`} />
  )
}

function Completed({ pageNum }) {
  return (
    <svg width={SIZE} height={SIZE} viewBox={`0 0 ${SIZE} ${SIZE}`} fill="none"
      aria-label={`Page ${pageNum}, complete`} role="img">
      <circle cx={C} cy={C} r={FILL_R} fill="var(--color-success)" />
      <circle cx={C} cy={C} r={RING_R} stroke="var(--color-brand-accent)" strokeWidth={RING_STROKE} fill="none" />
      <path d="M17.5 26.5L22.5 31.5L33 20" stroke="white" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function FullRing({ pageNum }) {
  return (
    <svg width={SIZE} height={SIZE} viewBox={`0 0 ${SIZE} ${SIZE}`} fill="none"
      aria-label={`Page ${pageNum}, complete`} role="img">
      <circle cx={C} cy={C} r={FILL_R} fill="white" />
      <circle cx={C} cy={C} r={RING_R} stroke="var(--color-brand-accent)" strokeWidth={RING_STROKE} fill="none" />
      <text x={C} y={C + 5.5} textAnchor="middle" fill="var(--color-text-sub)" {...NUM_STYLE}>{pageNum}</text>
    </svg>
  )
}

function ProgressCircle({ pageNum, pct, selected }) {
  const label = pct > 0 ? `Page ${pageNum}, ${pct}% complete` : `Page ${pageNum}, not started`
  return (
    <svg width={SIZE} height={SIZE} viewBox={`0 0 ${SIZE} ${SIZE}`} fill="none"
      aria-label={label} role="img">
      <circle cx={C} cy={C} r={FILL_R} fill="white" />
      <circle cx={C} cy={C} r={RING_R} stroke="var(--color-brand-disabled)" strokeWidth={RING_STROKE} fill="none" />
      {pct > 0 && <Arc pct={pct} color="var(--color-brand-accent)" />}
      <text x={C} y={C + 5.5} textAnchor="middle"
        fill={selected ? 'var(--color-text-sub)' : 'var(--color-text)'} {...NUM_STYLE}>{pageNum}</text>
    </svg>
  )
}

function PageCircle({ index, currentPage, pageProgress, justCompleted }) {
  const pageNum = index + 1
  const pct = pageProgress?.[index] ?? 0

  if (justCompleted.has(index)) return <FullRing pageNum={pageNum} />
  if (pct === 100)              return <Completed pageNum={pageNum} />
  return <ProgressCircle pageNum={pageNum} pct={pct} selected={pageNum === currentPage} />
}

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
  const hasMounted = useRef(false)

  useEffect(() => {
    // On first mount, record current state without animating — pages already at 100%
    // (e.g. restored from saved progress) should show Completed immediately.
    if (!hasMounted.current) {
      hasMounted.current = true
      prevProgress.current = pageProgress
      return
    }
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
    <header
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 10,
        display: 'flex',
        alignItems: 'center',
        width: '100%',
        padding: '12px 16px',
        background: 'var(--color-white)',
        borderBottom: '1px solid var(--color-border)',
      }}
    >
      {/* LEFT — autosave + book icon + page label */}
      <div style={{ flex: 1, display: 'flex', alignItems: 'center', gap: 12 }}>
        <AutosaveIndicator visible={autosaveVisible} />
        <svg aria-hidden="true" width="18" height="16" viewBox="0 0 18 16" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M1 1.5C1 1.5 4 0.5 9 2.5C14 0.5 17 1.5 17 1.5V14.5C17 14.5 14 13.5 9 15.5C4 13.5 1 14.5 1 14.5V1.5Z" stroke="var(--color-text-mid)" strokeWidth="1.4" strokeLinejoin="round"/>
          <line x1="9" y1="2.5" x2="9" y2="15.5" stroke="var(--color-text-mid)" strokeWidth="1.4"/>
        </svg>
        <span
          style={{
            fontFamily: sfPro,
            fontSize: 13,
            fontWeight: 500,
            color: 'var(--color-text)',
            letterSpacing: '-0.1px',
          }}
        >
          Page {currentPage} of {totalPages}
        </span>
      </div>

      {/* CENTER — progress circles */}
      <nav aria-label="Assessment pages" style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
        {Array.from({ length: totalPages }).map((_, i) => (
          <button
            key={i}
            aria-label={`Go to page ${i + 1}`}
            aria-current={i + 1 === currentPage ? 'page' : undefined}
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
      </nav>

      {/* RIGHT — buttons */}
      <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: 12 }}>
        <button
          onClick={onSaveAndClose}
          style={{
            ...btnBase,
            color: 'var(--color-brand-accent)',
            background: 'transparent',
            border: '1px solid var(--color-brand-accent)',
          }}
        >
          Save and Close
        </button>
        <button
          onClick={onSubmit}
          disabled={submitDisabled}
          aria-disabled={submitDisabled}
          style={{
            ...btnBase,
            color: 'var(--color-white)',
            background: 'var(--color-brand-accent)',
            opacity: submitDisabled ? 0.4 : 1,
            cursor: submitDisabled ? 'not-allowed' : 'pointer',
          }}
        >
          Submit
        </button>
      </div>
    </header>
  )
}
