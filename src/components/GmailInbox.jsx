const BCBS_BLUE = '#003087'

export default function GmailInbox({ onOpenAssessment }) {
  const today = new Date()
  const timeStr = today.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true })
  const dateStr = today.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })

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

      {/* Email content */}
      <div style={{ maxWidth: 900, margin: '0 auto', width: '100%', padding: '24px 32px' }}>

        {/* Subject */}
        <h1 style={{ fontSize: 22, fontWeight: 400, color: '#202124', margin: '0 0 16px', display: 'flex', alignItems: 'center', gap: 12 }}>
          Take Your Health Assessment
          <span style={{ fontSize: 11, fontWeight: 500, background: '#1a73e8', color: '#fff', padding: '2px 8px', borderRadius: 4, letterSpacing: 0.3 }}>Inbox</span>
        </h1>

        {/* Sender info */}
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: 16, marginBottom: 24, paddingBottom: 24, borderBottom: '1px solid #e0e0e0' }}>
          <div style={{ width: 40, height: 40, borderRadius: '50%', background: BCBS_BLUE, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: 14, fontWeight: 700, flexShrink: 0 }}>BC</div>
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
          <div style={{ background: BCBS_BLUE, borderRadius: 8, padding: '24px 32px', marginBottom: 32 }}>
            <div style={{ color: '#fff', fontSize: 22, fontWeight: 700, letterSpacing: -0.3 }}>BlueCross BlueShield</div>
            <div style={{ color: '#90b4e8', fontSize: 13, marginTop: 2 }}>Member Health Programs</div>
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
                background: BCBS_BLUE, color: '#fff',
                padding: '14px 32px', borderRadius: 6,
                fontSize: 16, fontWeight: 600,
                border: 'none', cursor: 'pointer', letterSpacing: 0.2,
              }}
            >
              Take Your Health Assessment →
            </button>
          </div>

          {/* URL link */}
          <p style={{ margin: '0 0 16px', fontSize: 13, color: '#5f6368' }}>
            Or copy and paste this link into your browser:{' '}
            <span onClick={onOpenAssessment} style={{ color: '#1a73e8', cursor: 'pointer', textDecoration: 'underline', wordBreak: 'break-all' }}>
              https://lansingalong.github.io/assessments/
            </span>
          </p>

          <p style={{ margin: '0 0 16px' }}>
            This assessment is part of your BlueCrossBlueShield member benefits at no additional cost. If you have already completed your assessment this year, you can disregard this message.
          </p>

          <p style={{ margin: '0 0 4px' }}>Thank you for taking an active role in your health.</p>
          <p style={{ margin: '0 0 32px' }}><strong>The BlueCrossBlueShield Member Health Team</strong></p>

          {/* Footer */}
          <div style={{ borderTop: '1px solid #e0e0e0', paddingTop: 24, fontSize: 12, color: '#9aa0a6', lineHeight: 1.6 }}>
            <p style={{ margin: '0 0 4px' }}>
              This email was sent to you because you are a BlueCrossBlueShield member enrolled in a health management program. If you have questions, please contact Member Services at 1-800-521-2227.
            </p>
            <p style={{ margin: 0 }}>BlueCross BlueShield Association · 225 North Michigan Avenue · Chicago, IL 60601</p>
          </div>
        </div>

        {/* Reply bar */}
        <div style={{ marginTop: 40, padding: 16, border: '1px solid #e0e0e0', borderRadius: 8, display: 'flex', gap: 16, alignItems: 'center', cursor: 'pointer', color: '#5f6368', fontSize: 14 }}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="9 17 4 12 9 7"/><path d="M20 18v-2a4 4 0 0 0-4-4H4"/></svg>
          Reply
          <svg style={{ marginLeft: 16 }} width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="15 17 20 12 15 7"/><path d="M4 18v-2a4 4 0 0 1 4-4h12"/></svg>
          Forward
        </div>
      </div>
    </div>
  )
}
