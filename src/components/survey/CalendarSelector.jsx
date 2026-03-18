import { useState } from 'react'
import { sfPro, cardStyle, QuestionLabel, ctaStyle } from './shared'

const DAYS = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa']
const MONTHS = ['January','February','March','April','May','June','July','August','September','October','November','December']

function daysInMonth(year, month) {
  return new Date(year, month + 1, 0).getDate()
}
function firstDayOfMonth(year, month) {
  return new Date(year, month, 1).getDay()
}

export default function CalendarSelector({ question, onSubmit, answer, required }) {
  const today = new Date()
  const initialSelected = answer ? (() => { const d = new Date(answer); return isNaN(d) ? null : { day: d.getDate(), month: d.getMonth(), year: d.getFullYear() } })() : null
  const [viewYear, setViewYear] = useState(initialSelected?.year ?? today.getFullYear())
  const [viewMonth, setViewMonth] = useState(initialSelected?.month ?? today.getMonth())
  const [selected, setSelected] = useState(initialSelected)

  const prevMonth = () => {
    if (viewMonth === 0) { setViewMonth(11); setViewYear(y => y - 1) }
    else setViewMonth(m => m - 1)
  }
  const nextMonth = () => {
    if (viewMonth === 11) { setViewMonth(0); setViewYear(y => y + 1) }
    else setViewMonth(m => m + 1)
  }

  const totalDays = daysInMonth(viewYear, viewMonth)
  const startDay = firstDayOfMonth(viewYear, viewMonth)
  const cells = []
  for (let i = 0; i < startDay; i++) cells.push(null)
  for (let d = 1; d <= totalDays; d++) cells.push(d)

  const isToday = (d) =>
    d === today.getDate() && viewMonth === today.getMonth() && viewYear === today.getFullYear()

  const isSelected = (d) =>
    selected && d === selected.day && viewMonth === selected.month && viewYear === selected.year

  const selectDay = (d) => {
    if (!d) return
    setSelected({ day: d, month: viewMonth, year: viewYear })
  }

  const selectedLabel = selected
    ? `${MONTHS[selected.month]} ${selected.day}, ${selected.year}`
    : null

  return (
    <div style={cardStyle}>
      <QuestionLabel text={question} required={required} />

      {/* Month navigation */}
      <div className="flex items-center justify-between mb-4">
        <button onClick={prevMonth} style={{ color: '#0080A3', background: 'none', border: 'none', cursor: 'pointer', padding: '4px 8px' }}>
          <svg width="8" height="14" viewBox="0 0 8 14" fill="none">
            <path d="M7 1L1 7L7 13" stroke="#0080A3" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
        <span style={{ fontFamily: sfPro, fontSize: 16, fontWeight: 500, color: '#282F35', letterSpacing: '-0.32px' }}>
          {MONTHS[viewMonth]} {viewYear}
        </span>
        <button onClick={nextMonth} style={{ color: '#0080A3', background: 'none', border: 'none', cursor: 'pointer', padding: '4px 8px' }}>
          <svg width="8" height="14" viewBox="0 0 8 14" fill="none">
            <path d="M1 1L7 7L1 13" stroke="#0080A3" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      </div>

      {/* Day headers */}
      <div className="grid grid-cols-7 mb-1">
        {DAYS.map(d => (
          <div key={d} style={{ fontFamily: sfPro, fontSize: 13, color: '#78868E', textAlign: 'center', paddingBottom: 6 }}>
            {d}
          </div>
        ))}
      </div>

      {/* Day cells */}
      <div className="grid grid-cols-7 gap-y-1 mb-5">
        {cells.map((d, i) => {
          const sel = isSelected(d)
          const tod = isToday(d)
          return (
            <button
              key={i}
              onClick={() => selectDay(d)}
              disabled={!d}
              style={{
                fontFamily: sfPro,
                fontSize: 15,
                fontWeight: sel ? 500 : 400,
                color: sel ? '#FFFFFF' : tod ? '#0E98BE' : d ? '#282F35' : 'transparent',
                background: sel ? '#0E98BE' : 'transparent',
                border: tod && !sel ? '1.5px solid #0E98BE' : 'none',
                borderRadius: '50%',
                width: 36,
                height: 36,
                margin: '0 auto',
                cursor: d ? 'pointer' : 'default',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              {d || ''}
            </button>
          )
        })}
      </div>

      <button
        style={ctaStyle(!!selected)}
        onClick={() => selected && onSubmit?.(selectedLabel)}
      >
        {selected ? `Confirm — ${selectedLabel}` : 'Select a date'}
      </button>
    </div>
  )
}
