import { useState } from 'react'

const BCBS_BLUE = '#003087'
const GMAIL_GRAY = '#f6f8fc'

function StarIcon({ filled }) {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill={filled ? '#f4b400' : 'none'} stroke={filled ? '#f4b400' : '#bdc1c6'} strokeWidth="2">
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  )
}

function ComposeIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
      <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
    </svg>
  )
}

function SidebarItem({ icon, label, count, active }) {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 16,
        padding: '4px 16px 4px 12px',
        borderRadius: '0 16px 16px 0',
        background: active ? '#d3e3fd' : 'transparent',
        cursor: 'pointer',
        fontFamily: 'Google Sans, Roboto, sans-serif',
        fontSize: 14,
        fontWeight: active ? 600 : 400,
        color: active ? '#041e49' : '#202124',
        userSelect: 'none',
        marginRight: 8,
      }}
    >
      <span style={{ color: active ? '#041e49' : '#444746', flexShrink: 0 }}>{icon}</span>
      <span style={{ flex: 1 }}>{label}</span>
      {count && <span style={{ fontSize: 12, color: '#444746' }}>{count}</span>}
    </div>
  )
}

export default function GmailInbox({ onOpenAssessment }) {
  const [emailOpen, setEmailOpen] = useState(false)

  const today = new Date()
  const timeStr = today.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true })
  const dateStr = today.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })

  if (emailOpen) {
    return (
      <EmailView
        timeStr={timeStr}
        dateStr={dateStr}
        onBack={() => setEmailOpen(false)}
        onOpenAssessment={onOpenAssessment}
      />
    )
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh', background: '#fff', fontFamily: 'Google Sans, Roboto, sans-serif' }}>

      {/* Top bar */}
      <div style={{
        display: 'flex', alignItems: 'center', gap: 8,
        padding: '8px 16px', height: 64,
        borderBottom: '1px solid #e0e0e0',
        position: 'sticky', top: 0, background: '#fff', zIndex: 10,
      }}>
        {/* Gmail logo */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 4, marginRight: 8, width: 160, flexShrink: 0 }}>
          <svg width="36" height="36" viewBox="0 0 36 36">
            <path fill="#4285F4" d="M6 30h4V18L2 12v16c0 1.1.9 2 2 2z"/>
            <path fill="#34A853" d="M26 30h4c1.1 0 2-.9 2-2V12l-8 6z"/>
            <path fill="#EA4335" d="M30 6H6L18 15 30 6z"/>
            <path fill="#FBBC05" d="M2 12l8 6V6L2 12z"/>
            <path fill="#C5221F" d="M6 6v6l12 9 12-9V6L18 15z"/>
          </svg>
          <span style={{ fontSize: 22, color: '#5f6368', fontWeight: 400, letterSpacing: -0.5 }}>Gmail</span>
        </div>

        {/* Search bar */}
        <div style={{
          flex: 1, maxWidth: 720,
          background: GMAIL_GRAY,
          borderRadius: 24,
          display: 'flex', alignItems: 'center',
          padding: '0 16px', height: 46,
          gap: 12,
        }}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#5f6368" strokeWidth="2">
            <circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/>
          </svg>
          <span style={{ fontSize: 16, color: '#5f6368' }}>Search mail</span>
        </div>

        {/* Avatar */}
        <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 8 }}>
          <div style={{
            width: 32, height: 32, borderRadius: '50%',
            background: '#4285F4', display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: '#fff', fontSize: 14, fontWeight: 600,
          }}>
            J
          </div>
        </div>
      </div>

      <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>

        {/* Sidebar */}
        <div style={{ width: 220, flexShrink: 0, paddingTop: 8, overflowY: 'auto' }}>
          {/* Compose */}
          <div style={{ padding: '0 8px 16px 8px' }}>
            <button style={{
              display: 'flex', alignItems: 'center', gap: 12,
              background: '#c2e7ff',
              border: 'none', borderRadius: 16,
              padding: '16px 20px',
              fontFamily: 'Google Sans, Roboto, sans-serif',
              fontSize: 14, fontWeight: 600, color: '#041e49',
              cursor: 'pointer', width: '100%',
            }}>
              <ComposeIcon />
              Compose
            </button>
          </div>

          <SidebarItem active icon={<InboxSvg />} label="Inbox" count="1" />
          <SidebarItem icon={<StarredSvg />} label="Starred" />
          <SidebarItem icon={<SentSvg />} label="Sent" />
          <SidebarItem icon={<DraftSvg />} label="Drafts" count="3" />
          <SidebarItem icon={<SpamSvg />} label="Spam" />
          <SidebarItem icon={<TrashSvg />} label="Trash" />

          <div style={{ margin: '8px 0', borderTop: '1px solid #e0e0e0' }} />
          <div style={{ padding: '4px 16px', fontSize: 13, color: '#444746', fontWeight: 500 }}>Categories</div>
          <SidebarItem icon={<SocialSvg />} label="Social" />
          <SidebarItem icon={<PromoSvg />} label="Promotions" count="12" />
        </div>

        {/* Main content */}
        <div style={{ flex: 1, overflowY: 'auto', borderLeft: '1px solid #e0e0e0' }}>
          {/* Toolbar */}
          <div style={{
            display: 'flex', alignItems: 'center', gap: 4,
            padding: '4px 16px', height: 48,
            borderBottom: '1px solid #e0e0e0',
            position: 'sticky', top: 0, background: '#fff', zIndex: 5,
          }}>
            <input type="checkbox" style={{ width: 16, height: 16, cursor: 'pointer' }} readOnly />
            <button style={toolbarBtnStyle}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#444746" strokeWidth="2"><polyline points="6 9 12 15 18 9"/></svg>
            </button>
            <div style={{ width: 1, height: 20, background: '#e0e0e0', margin: '0 4px' }} />
            <button style={toolbarBtnStyle}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#444746" strokeWidth="2"><polyline points="23 4 23 10 17 10"/><path d="M20.49 15a9 9 0 1 1-.08-4.34"/></svg>
            </button>
            <button style={toolbarBtnStyle}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#444746" strokeWidth="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"/></svg>
            </button>
            <span style={{ marginLeft: 'auto', fontSize: 13, color: '#444746' }}>1–1 of 1</span>
          </div>

          {/* Category tabs */}
          <div style={{ display: 'flex', borderBottom: '1px solid #e0e0e0' }}>
            {[
              { label: 'Primary', active: true },
              { label: 'Promotions' },
              { label: 'Social' },
            ].map(tab => (
              <div key={tab.label} style={{
                padding: '12px 24px',
                fontSize: 14,
                fontWeight: tab.active ? 600 : 400,
                color: tab.active ? '#1a73e8' : '#444746',
                borderBottom: tab.active ? '2px solid #1a73e8' : '2px solid transparent',
                cursor: 'pointer',
                userSelect: 'none',
              }}>
                {tab.label}
              </div>
            ))}
          </div>

          {/* Email row */}
          <div
            onClick={() => setEmailOpen(true)}
            style={{
              display: 'flex', alignItems: 'center',
              padding: '0 16px', height: 52,
              gap: 12,
              borderBottom: '1px solid #e0e0e0',
              background: '#e8f0fe',
              cursor: 'pointer',
              fontWeight: 700,
            }}
            onMouseEnter={e => e.currentTarget.style.boxShadow = '0 1px 3px rgba(0,0,0,.15)'}
            onMouseLeave={e => e.currentTarget.style.boxShadow = 'none'}
          >
            <input type="checkbox" onClick={e => e.stopPropagation()} style={{ width: 16, height: 16, flexShrink: 0 }} readOnly />
            <span style={{ flexShrink: 0 }}><StarIcon /></span>

            {/* Sender avatar */}
            <div style={{
              width: 28, height: 28, borderRadius: '50%',
              background: BCBS_BLUE,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: '#fff', fontSize: 12, fontWeight: 700, flexShrink: 0,
            }}>
              BC
            </div>

            {/* Sender name */}
            <span style={{ width: 160, flexShrink: 0, fontSize: 14, color: '#202124', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
              BlueCrossBlueShield
            </span>

            {/* Subject + snippet */}
            <span style={{ flex: 1, fontSize: 14, color: '#202124', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
              <span>Take Your Health Assessment</span>
              <span style={{ fontWeight: 400, color: '#5f6368' }}> — Your annual health assessment is ready. Complete it today to help your care team…</span>
            </span>

            {/* Timestamp */}
            <span style={{ fontSize: 13, color: '#5f6368', flexShrink: 0, marginLeft: 8 }}>{dateStr}</span>
          </div>

          {/* Empty state below */}
          <div style={{ padding: 40, textAlign: 'center', color: '#5f6368', fontSize: 14 }}>
            No other emails in Primary
          </div>
        </div>
      </div>
    </div>
  )
}

const toolbarBtnStyle = {
  background: 'none', border: 'none', cursor: 'pointer',
  padding: '4px 6px', borderRadius: 4, display: 'flex', alignItems: 'center',
}

function EmailView({ timeStr, dateStr, onBack, onOpenAssessment }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', background: '#fff', fontFamily: 'Google Sans, Roboto, sans-serif' }}>

      {/* Top bar */}
      <div style={{
        display: 'flex', alignItems: 'center', gap: 8,
        padding: '8px 16px', height: 64,
        borderBottom: '1px solid #e0e0e0',
        position: 'sticky', top: 0, background: '#fff', zIndex: 10,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 4, width: 160, flexShrink: 0 }}>
          <svg width="36" height="36" viewBox="0 0 36 36">
            <path fill="#4285F4" d="M6 30h4V18L2 12v16c0 1.1.9 2 2 2z"/>
            <path fill="#34A853" d="M26 30h4c1.1 0 2-.9 2-2V12l-8 6z"/>
            <path fill="#EA4335" d="M30 6H6L18 15 30 6z"/>
            <path fill="#FBBC05" d="M2 12l8 6V6L2 12z"/>
            <path fill="#C5221F" d="M6 6v6l12 9 12-9V6L18 15z"/>
          </svg>
          <span style={{ fontSize: 22, color: '#5f6368', fontWeight: 400 }}>Gmail</span>
        </div>
        <div style={{ flex: 1, maxWidth: 720, background: '#f6f8fc', borderRadius: 24, display: 'flex', alignItems: 'center', padding: '0 16px', height: 46, gap: 12 }}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#5f6368" strokeWidth="2"><circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/></svg>
          <span style={{ fontSize: 16, color: '#5f6368' }}>Search mail</span>
        </div>
        <div style={{ marginLeft: 'auto' }}>
          <div style={{ width: 32, height: 32, borderRadius: '50%', background: '#4285F4', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: 14, fontWeight: 600 }}>J</div>
        </div>
      </div>

      {/* Email content area */}
      <div style={{ maxWidth: 900, margin: '0 auto', width: '100%', padding: '24px 32px' }}>

        {/* Back button */}
        <button
          onClick={onBack}
          style={{
            display: 'flex', alignItems: 'center', gap: 8,
            background: 'none', border: 'none', cursor: 'pointer',
            color: '#444746', fontSize: 14, padding: '8px 0', marginBottom: 16,
          }}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
          Back to Inbox
        </button>

        {/* Subject */}
        <h1 style={{ fontSize: 22, fontWeight: 400, color: '#202124', margin: '0 0 16px', display: 'flex', alignItems: 'center', gap: 12 }}>
          Take Your Health Assessment
          <span style={{
            fontSize: 11, fontWeight: 500, background: '#1a73e8', color: '#fff',
            padding: '2px 8px', borderRadius: 4, letterSpacing: 0.3,
          }}>Inbox</span>
        </h1>

        {/* Sender info */}
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: 16, marginBottom: 24, paddingBottom: 24, borderBottom: '1px solid #e0e0e0' }}>
          <div style={{
            width: 40, height: 40, borderRadius: '50%', background: BCBS_BLUE,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: '#fff', fontSize: 14, fontWeight: 700, flexShrink: 0,
          }}>BC</div>
          <div style={{ flex: 1 }}>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 8, flexWrap: 'wrap' }}>
              <span style={{ fontSize: 14, fontWeight: 600, color: '#202124' }}>BlueCrossBlueShield</span>
              <span style={{ fontSize: 12, color: '#5f6368' }}>&lt;noreply@member.bcbs.com&gt;</span>
              <span style={{ marginLeft: 'auto', fontSize: 13, color: '#5f6368' }}>{dateStr}, {timeStr}</span>
            </div>
            <div style={{ fontSize: 13, color: '#5f6368', marginTop: 2 }}>to me</div>
          </div>
        </div>

        {/* Email body */}
        <div style={{ fontSize: 15, lineHeight: 1.7, color: '#202124', maxWidth: 680 }}>

          {/* BCBS header banner */}
          <div style={{
            background: BCBS_BLUE, borderRadius: 8, padding: '24px 32px',
            marginBottom: 32, display: 'flex', alignItems: 'center', gap: 16,
          }}>
            <div>
              <div style={{ color: '#fff', fontSize: 22, fontWeight: 700, letterSpacing: -0.3 }}>
                BlueCross BlueShield
              </div>
              <div style={{ color: '#90b4e8', fontSize: 13, marginTop: 2 }}>Member Health Programs</div>
            </div>
          </div>

          <p style={{ margin: '0 0 16px' }}>Dear Member,</p>

          <p style={{ margin: '0 0 16px' }}>
            Your annual <strong>Health Assessment</strong> is now available. Completing this short assessment helps your care team better understand your current health, identify any areas where you may benefit from additional support, and personalize your care plan.
          </p>

          <p style={{ margin: '0 0 16px' }}>
            The assessment takes approximately <strong>5–10 minutes</strong> to complete and covers topics like your current health status, lifestyle habits, and any symptoms you may be experiencing. Your responses are private and used solely to improve your care.
          </p>

          <p style={{ margin: '0 0 8px', fontWeight: 600 }}>What to expect:</p>
          <ul style={{ margin: '0 0 24px', paddingLeft: 24, lineHeight: 2 }}>
            <li>Questions about your general health and wellbeing</li>
            <li>Questions about medications and existing conditions</li>
            <li>A brief lifestyle and activity check-in</li>
            <li>Your answers are saved automatically as you go</li>
          </ul>

          {/* CTA button */}
          <div style={{ margin: '32px 0' }}>
            <button
              onClick={onOpenAssessment}
              style={{
                display: 'inline-block',
                background: BCBS_BLUE, color: '#fff',
                padding: '14px 32px', borderRadius: 6,
                fontSize: 16, fontWeight: 600,
                border: 'none', cursor: 'pointer',
                textDecoration: 'none', letterSpacing: 0.2,
              }}
            >
              Take Your Health Assessment →
            </button>
          </div>

          {/* URL link */}
          <p style={{ margin: '0 0 16px', fontSize: 13, color: '#5f6368' }}>
            Or copy and paste this link into your browser:{' '}
            <span
              onClick={onOpenAssessment}
              style={{ color: '#1a73e8', cursor: 'pointer', textDecoration: 'underline', wordBreak: 'break-all' }}
            >
              https://lcai.github.io/assessments/
            </span>
          </p>

          <p style={{ margin: '0 0 16px' }}>
            This assessment is part of your BlueCrossBlueShield member benefits at no additional cost. If you have already completed your assessment this year, you can disregard this message.
          </p>

          <p style={{ margin: '0 0 4px' }}>Thank you for taking an active role in your health.</p>
          <p style={{ margin: '0 0 32px' }}>
            <strong>The BlueCrossBlueShield Member Health Team</strong>
          </p>

          {/* Footer */}
          <div style={{
            borderTop: '1px solid #e0e0e0', paddingTop: 24,
            fontSize: 12, color: '#9aa0a6', lineHeight: 1.6,
          }}>
            <p style={{ margin: '0 0 4px' }}>
              This email was sent to you because you are a BlueCrossBlueShield member enrolled in a health management program. If you have questions, please contact Member Services at 1-800-521-2227.
            </p>
            <p style={{ margin: 0 }}>
              BlueCross BlueShield Association · 225 North Michigan Avenue · Chicago, IL 60601
            </p>
          </div>
        </div>

        {/* Reply bar */}
        <div style={{
          marginTop: 40, padding: 16, border: '1px solid #e0e0e0',
          borderRadius: 8, display: 'flex', gap: 16, alignItems: 'center', cursor: 'pointer',
          color: '#5f6368', fontSize: 14,
        }}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="9 17 4 12 9 7"/><path d="M20 18v-2a4 4 0 0 0-4-4H4"/></svg>
          Reply
          <svg style={{ marginLeft: 16 }} width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="15 17 20 12 15 7"/><path d="M4 18v-2a4 4 0 0 1 4-4h12"/></svg>
          Forward
        </div>
      </div>
    </div>
  )
}

// Sidebar icon SVGs
function InboxSvg() {
  return <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="22 12 16 12 14 15 10 15 8 12 2 12"/><path d="M5.45 5.11L2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z"/></svg>
}
function StarredSvg() {
  return <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
}
function SentSvg() {
  return <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>
}
function DraftSvg() {
  return <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
}
function SpamSvg() {
  return <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
}
function TrashSvg() {
  return <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"/></svg>
}
function SocialSvg() {
  return <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
}
function PromoSvg() {
  return <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 12V22H4V12"/><path d="M22 7H2v5h20V7z"/><path d="M12 22V7"/><path d="M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7z"/><path d="M12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z"/></svg>
}
