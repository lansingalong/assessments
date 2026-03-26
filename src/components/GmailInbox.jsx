export default function GmailInbox({ onOpenAssessment }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh', background: '#fff', fontFamily: '"Google Sans", Roboto, Arial, sans-serif', fontSize: 14, color: '#202124' }}>

      {/* ── TOP BAR ── */}
      <div style={{ display: 'flex', alignItems: 'center', height: 64, padding: '0 16px', gap: 8, borderBottom: '1px solid #e0e0e0', flexShrink: 0 }}>
        {/* Hamburger + Logo */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 4, width: 256, flexShrink: 0 }}>
          <button style={iconBtn}>
            <HamburgerIcon />
          </button>
          <div style={{ display: 'flex', alignItems: 'center', gap: 2, marginLeft: 4 }}>
            <GmailLogo />
            <span style={{ fontSize: 22, color: '#5f6368', letterSpacing: -0.5, fontWeight: 400, marginLeft: 4 }}>Gmail</span>
          </div>
        </div>

        {/* Search */}
        <div style={{ flex: 1, maxWidth: 720 }}>
          <div style={{ background: '#eaf1fb', borderRadius: 24, display: 'flex', alignItems: 'center', height: 46, padding: '0 16px', gap: 12 }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><circle cx="11" cy="11" r="7.5" stroke="#5f6368" strokeWidth="2"/><path d="M20 20l-3.5-3.5" stroke="#5f6368" strokeWidth="2.2" strokeLinecap="round"/></svg>
            <span style={{ flex: 1, fontSize: 16, color: '#5f6368' }}>Search mail</span>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M6 9l6 6 6-6" stroke="#5f6368" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </div>
        </div>

        {/* Right icons */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 4, marginLeft: 'auto' }}>
          <button style={iconBtn}><HelpIcon /></button>
          <button style={iconBtn}><SettingsIcon /></button>
          <button style={iconBtn}><AppsIcon /></button>
          <div style={{ width: 32, height: 32, borderRadius: '50%', background: '#1a73e8', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: 13, fontWeight: 600, marginLeft: 8, cursor: 'pointer' }}>JD</div>
        </div>
      </div>

      {/* ── BODY ── */}
      <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>

        {/* ── LEFT SIDEBAR ── */}
        <div style={{ width: 256, flexShrink: 0, overflowY: 'auto', paddingTop: 8, display: 'flex', flexDirection: 'column' }}>
          {/* Compose */}
          <div style={{ padding: '4px 16px 8px' }}>
            <button style={{ display: 'flex', alignItems: 'center', gap: 12, background: '#fce8e6', border: 'none', borderRadius: 20, padding: '16px 20px', fontSize: 14, fontWeight: 500, color: '#202124', cursor: 'pointer', width: '100%' }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><line x1="12" y1="5" x2="12" y2="19" stroke="#c5221f" strokeWidth="2.5" strokeLinecap="round"/><line x1="5" y1="12" x2="19" y2="12" stroke="#c5221f" strokeWidth="2.5" strokeLinecap="round"/></svg>
              Compose
            </button>
          </div>

          <NavItem icon={<InboxIcon />} label="Inbox" badge={3} active />
          <NavItem icon={<StarIcon />} label="Starred" />
          <NavItem icon={<SnoozedIcon />} label="Snoozed" />
          <NavItem icon={<SentIcon />} label="Sent" />
          <NavItem icon={<DraftsIcon />} label="Drafts" badge={1} />
          <NavItem icon={<SpamIcon />} label="Spam" badge={3} />
          <NavItem icon={<TrashIcon />} label="Trash" />

          <div style={{ padding: '8px 16px 4px', fontWeight: 600, fontSize: 14, color: '#202124', display: 'flex', alignItems: 'center', gap: 4 }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M19 9l-7 7-7-7" stroke="#444746" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
            Categories
          </div>
          <NavItem icon={<MoreIcon />} label="More" />

          <div style={{ borderTop: '1px solid #e0e0e0', margin: '8px 0' }} />

          {/* Meet */}
          <div style={{ padding: '4px 16px', fontWeight: 600, fontSize: 14, color: '#202124' }}>Meet</div>
          <NavItem icon={<VideoIcon />} label="New meeting" />
          <NavItem icon={<JoinIcon />} label="Join a meeting" />

          <div style={{ borderTop: '1px solid #e0e0e0', margin: '8px 0' }} />

          {/* Hangouts */}
          <div style={{ padding: '4px 16px', fontWeight: 600, fontSize: 14, color: '#202124' }}>Hangouts</div>
          <div style={{ padding: '8px 16px' }}>
            <button style={{ background: '#1a73e8', color: '#fff', border: 'none', borderRadius: 4, padding: '8px 0', fontSize: 14, fontWeight: 500, cursor: 'pointer', width: '100%' }}>
              Sign in
            </button>
          </div>
        </div>

        {/* ── MAIN CONTENT ── */}
        <div style={{ flex: 1, overflowY: 'auto', borderLeft: '1px solid #e0e0e0' }}>

          {/* Email toolbar */}
          <div style={{ display: 'flex', alignItems: 'center', padding: '8px 16px', borderBottom: '1px solid #e0e0e0', gap: 2, position: 'sticky', top: 0, background: '#fff', zIndex: 5 }}>
            <button style={iconBtn}><BackArrowIcon /></button>
            <button style={iconBtn}><ArchiveIcon /></button>
            <button style={iconBtn}><ReportIcon /></button>
            <button style={iconBtn}><DeleteIcon /></button>
            <button style={iconBtn}><MarkReadIcon /></button>
            <button style={iconBtn}><SnoozeIcon /></button>
            <button style={iconBtn}><TaskIcon /></button>
            <button style={iconBtn}><MoveToIcon /></button>
            <button style={iconBtn}><LabelIcon /></button>
            <button style={iconBtn}><MoreVertIcon /></button>
            <span style={{ marginLeft: 'auto', fontSize: 13, color: '#5f6368', whiteSpace: 'nowrap' }}>1–50 of 2,619</span>
            <button style={iconBtn}><ChevronLeftIcon /></button>
            <button style={iconBtn}><ChevronRightIcon /></button>
          </div>

          {/* Email thread */}
          <div style={{ padding: '16px 32px 32px', maxWidth: 900 }}>

            {/* Subject line */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
              <h1 style={{ fontSize: 22, fontWeight: 400, color: '#202124', margin: 0, flex: 1 }}>
                Take Your Health Assessment
              </h1>
              <button style={iconBtn}><ForwardIcon /></button>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: 4, background: '#e8f0fe', border: '1px solid #c5d5f5', borderRadius: 4, padding: '2px 8px', fontSize: 12, color: '#1a73e8', fontWeight: 500 }}>
                Inbox
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none"><path d="M18 6L6 18M6 6l12 12" stroke="#1a73e8" strokeWidth="2.5" strokeLinecap="round"/></svg>
              </div>
              <button style={iconBtn}><PrintIcon /></button>
              <button style={iconBtn}><OpenInNewIcon /></button>
            </div>

            {/* Sender row */}
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12, marginBottom: 20 }}>
              {/* Avatar */}
              <div style={{ width: 40, height: 40, borderRadius: '50%', background: '#e0e0e0', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="#9e9e9e"><circle cx="12" cy="8" r="4"/><path d="M4 20c0-4 3.6-8 8-8s8 4 8 8"/></svg>
              </div>

              {/* Sender info */}
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6, flexWrap: 'wrap' }}>
                  <span style={{ fontWeight: 600, fontSize: 14, color: '#202124' }}>YourHealthPlan</span>
                  <span style={{ fontSize: 13, color: '#5f6368' }}>&lt;care@yourhealthplan.com&gt;</span>
                  <span style={{ fontSize: 13, color: '#1a73e8', cursor: 'pointer', textDecoration: 'underline' }}>Unsubscribe</span>
                  <span style={{ marginLeft: 'auto', fontSize: 13, color: '#5f6368', whiteSpace: 'nowrap' }}>9:14 AM (8 hours ago)</span>
                  <button style={iconBtn}><StarOutlineIcon /></button>
                  <button style={iconBtn}><ReplyIcon /></button>
                  <button style={iconBtn}><MoreVertIcon /></button>
                </div>
                <div style={{ fontSize: 13, color: '#5f6368', display: 'flex', alignItems: 'center', gap: 4, marginTop: 2 }}>
                  to me
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M6 9l6 6 6-6" stroke="#5f6368" strokeWidth="2" strokeLinecap="round"/></svg>
                </div>
              </div>
            </div>

            {/* Email body */}
            <div style={{ fontSize: 14, lineHeight: 1.8, color: '#202124', paddingLeft: 52 }}>
              <p style={{ margin: '0 0 12px' }}>Hi Jane,</p>
              <p style={{ margin: '0 0 4px' }}>We'd like to learn more about your health so we can provide you with the right support and resources.</p>
              <p style={{ margin: '0 0 12px' }}>Complete your health assessment today:</p>

              <p style={{ margin: '0 0 16px' }}>
                <span
                  onClick={onOpenAssessment}
                  style={{ color: '#1a73e8', cursor: 'pointer', textDecoration: 'underline' }}
                >
                  https://wellframe.com/altruistalD102911
                </span>
              </p>

              <p style={{ margin: '0 0 8px' }}>Why this matters:</p>
              <ul style={{ margin: '0 0 16px', paddingLeft: 16, listStyle: 'none' }}>
                <li style={{ marginBottom: 4 }}>· Help us understand your health needs</li>
                <li style={{ marginBottom: 4 }}>· Get connected to programs and resources that fit your situation</li>
                <li style={{ marginBottom: 4 }}>· Receive personalized support from our care team</li>
              </ul>

              <p style={{ margin: '0 0 4px' }}>Your responses are private and secure under HIPAA.</p>
              <p style={{ margin: '0 0 4px' }}>Need help? Call us at [phone number] (TTY: 711) Monday–Friday, 8 AM–6 PM ET</p>
              <p style={{ margin: '0 0 16px' }}>Or reply to this email with any questions.</p>

              <p style={{ margin: '0 0 16px' }}>Thank you!</p>

              {/* Health Plan Logo */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, margin: '16px 0 24px' }}>
                <HealthPlanLogo />
                <div style={{ fontSize: 16, fontWeight: 700, color: '#1a6b4a', lineHeight: 1.2 }}>
                  Your<br />HealthPlan
                </div>
              </div>
            </div>

            {/* Smart reply chips */}
            <div style={{ display: 'flex', gap: 8, paddingLeft: 52, marginBottom: 24, flexWrap: 'wrap' }}>
              {['Looking forward to it!', 'We will be there!', 'Thanks for the update!'].map(text => (
                <button key={text} style={{
                  background: '#fff', border: '1px solid #dadce0', borderRadius: 20,
                  padding: '8px 16px', fontSize: 14, color: '#1a73e8', cursor: 'pointer',
                  fontFamily: 'inherit',
                }}>
                  {text}
                </button>
              ))}
            </div>

            {/* Divider */}
            <div style={{ borderTop: '1px solid #e0e0e0', margin: '0 0 16px' }} />

            {/* Reply / Forward */}
            <div style={{ display: 'flex', gap: 8, paddingLeft: 52 }}>
              <button style={{
                display: 'flex', alignItems: 'center', gap: 8,
                background: '#fff', border: '1px solid #dadce0', borderRadius: 4,
                padding: '10px 20px', fontSize: 14, color: '#202124', cursor: 'pointer',
                fontFamily: 'inherit',
              }}>
                <ReplyIcon color="#5f6368" />
                Reply
              </button>
              <button style={{
                display: 'flex', alignItems: 'center', gap: 8,
                background: '#fff', border: '1px solid #dadce0', borderRadius: 4,
                padding: '10px 20px', fontSize: 14, color: '#202124', cursor: 'pointer',
                fontFamily: 'inherit',
              }}>
                <ForwardIcon color="#5f6368" />
                Forward
              </button>
            </div>
          </div>
        </div>

        {/* ── RIGHT APP RAIL ── */}
        <div style={{ width: 56, flexShrink: 0, borderLeft: '1px solid #e0e0e0', display: 'flex', flexDirection: 'column', alignItems: 'center', paddingTop: 8, gap: 4 }}>
          <button style={railBtn}><CalendarRailIcon /></button>
          <button style={railBtn}><KeepRailIcon /></button>
          <button style={railBtn}><TasksRailIcon /></button>
          <button style={railBtn}><ContactsRailIcon /></button>
          <div style={{ borderTop: '1px solid #e0e0e0', width: 32, margin: '4px 0' }} />
          <button style={railBtn}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="9" stroke="#5f6368" strokeWidth="1.8"/><path d="M12 8v4M12 16h.01" stroke="#5f6368" strokeWidth="2" strokeLinecap="round"/></svg>
          </button>
        </div>
      </div>
    </div>
  )
}

// ── Shared styles ──
const iconBtn = {
  background: 'none', border: 'none', cursor: 'pointer',
  padding: 6, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center',
  color: '#444746',
}
const railBtn = {
  background: 'none', border: 'none', cursor: 'pointer',
  width: 40, height: 40, borderRadius: '50%',
  display: 'flex', alignItems: 'center', justifyContent: 'center',
}

// ── Nav item ──
function NavItem({ icon, label, badge, active }) {
  return (
    <div style={{
      display: 'flex', alignItems: 'center', gap: 16,
      padding: '4px 16px 4px 24px',
      background: active ? '#d3e3fd' : 'transparent',
      borderRadius: '0 20px 20px 0',
      marginRight: 16, cursor: 'pointer', userSelect: 'none',
      fontWeight: active ? 700 : 400,
      color: active ? '#041e49' : '#202124',
      fontSize: 14,
    }}>
      <span style={{ color: active ? '#041e49' : '#444746', flexShrink: 0, display: 'flex' }}>{icon}</span>
      <span style={{ flex: 1 }}>{label}</span>
      {badge && <span style={{ fontSize: 12, color: active ? '#041e49' : '#5f6368', fontWeight: 700 }}>{badge}</span>}
    </div>
  )
}

// ── Gmail "M" logo ──
function GmailLogo() {
  return (
    <svg width="32" height="32" viewBox="0 0 48 48">
      <path fill="#EA4335" d="M24 24L8 12h32z"/>
      <path fill="#FBBC05" d="M8 12v24l8-8V20z"/>
      <path fill="#34A853" d="M40 12v24l-8-8V20z"/>
      <path fill="#4285F4" d="M8 36h32v4H8z"/>
      <path fill="#C5221F" d="M8 12l16 12 16-12"/>
    </svg>
  )
}

// ── Health Plan Logo ──
function HealthPlanLogo() {
  return (
    <svg width="48" height="48" viewBox="0 0 48 48">
      <rect width="48" height="48" rx="10" fill="#1a6b4a"/>
      <path d="M24 10c-3.5 0-6.5 2-8 5-1.5-1-3.5-1-5 .5s-1.5 3.5-.5 5c-3 1.5-4 5-2.5 8s5 4 8 2.5c1.5 3 5 4 8 2.5s4-5 2.5-8c3-1.5 4-5 2.5-8s-5-4-8-2.5c-1.5-3-5-5-7-5z" fill="none" stroke="#fff" strokeWidth="1.5" opacity="0.2"/>
      <path d="M24 15l2.5 5 5.5.8-4 3.9.9 5.3-4.9-2.6-4.9 2.6.9-5.3-4-3.9 5.5-.8z" fill="#fff"/>
      <path d="M17 34h14" stroke="#fff" strokeWidth="2" strokeLinecap="round" opacity="0.6"/>
      <path d="M19 37h10" stroke="#fff" strokeWidth="2" strokeLinecap="round" opacity="0.4"/>
    </svg>
  )
}

// ── Sidebar icons ──
function HamburgerIcon() {
  return <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M3 6h18M3 12h18M3 18h18" stroke="#5f6368" strokeWidth="2" strokeLinecap="round"/></svg>
}
function InboxIcon() {
  return <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M22 12h-6l-2 3H10l-2-3H2" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round"/><path d="M5.45 5.11L2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round"/></svg>
}
function StarIcon() {
  return <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round"/></svg>
}
function SnoozedIcon() {
  return <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.8"/><path d="M12 7v5l3 3" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/></svg>
}
function SentIcon() {
  return <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><line x1="22" y1="2" x2="11" y2="13" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/><polygon points="22 2 15 22 11 13 2 9 22 2" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" fill="none"/></svg>
}
function DraftsIcon() {
  return <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>
}
function SpamIcon() {
  return <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.8"/><path d="M12 7v5" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/><circle cx="12" cy="16.5" r="1" fill="currentColor"/></svg>
}
function TrashIcon() {
  return <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><polyline points="3 6 5 6 21 6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/></svg>
}
function MoreIcon() {
  return <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>
}
function VideoIcon() {
  return <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><rect x="2" y="6" width="14" height="12" rx="2" stroke="currentColor" strokeWidth="1.8"/><path d="M16 10l5-3v10l-5-3" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round"/></svg>
}
function JoinIcon() {
  return <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><rect x="3" y="7" width="11" height="10" rx="1.5" stroke="currentColor" strokeWidth="1.8"/><path d="M14 11l5-3v8l-5-3" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round"/></svg>
}

// ── Toolbar icons ──
function BackArrowIcon() {
  return <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M19 12H5M12 19l-7-7 7-7" stroke="#444746" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
}
function ArchiveIcon() {
  return <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><rect x="2" y="4" width="20" height="4" rx="1" stroke="#444746" strokeWidth="1.8"/><path d="M4 8v10a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8" stroke="#444746" strokeWidth="1.8"/><path d="M10 12h4" stroke="#444746" strokeWidth="1.8" strokeLinecap="round"/></svg>
}
function ReportIcon() {
  return <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" stroke="#444746" strokeWidth="1.8" strokeLinejoin="round"/><line x1="12" y1="9" x2="12" y2="13" stroke="#444746" strokeWidth="1.8" strokeLinecap="round"/><circle cx="12" cy="17" r="1" fill="#444746"/></svg>
}
function DeleteIcon() {
  return <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><polyline points="3 6 5 6 21 6" stroke="#444746" strokeWidth="1.8" strokeLinecap="round"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2" stroke="#444746" strokeWidth="1.8" strokeLinecap="round"/></svg>
}
function MarkReadIcon() {
  return <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M22 6c0-1.1-.9-2-2-2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6z" stroke="#444746" strokeWidth="1.8"/><path d="M22 6l-10 7L2 6" stroke="#444746" strokeWidth="1.8" strokeLinecap="round"/></svg>
}
function SnoozeIcon() {
  return <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="13" r="8" stroke="#444746" strokeWidth="1.8"/><path d="M12 9v4l2.5 2.5" stroke="#444746" strokeWidth="1.8" strokeLinecap="round"/><path d="M5 3l-2 2M19 3l2 2" stroke="#444746" strokeWidth="1.8" strokeLinecap="round"/></svg>
}
function TaskIcon() {
  return <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M9 11l3 3L22 4" stroke="#444746" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" stroke="#444746" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>
}
function MoveToIcon() {
  return <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M5 12h14M12 5l7 7-7 7" stroke="#444746" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>
}
function LabelIcon() {
  return <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z" stroke="#444746" strokeWidth="1.8" strokeLinejoin="round"/><circle cx="7" cy="7" r="1.5" fill="#444746"/></svg>
}
function MoreVertIcon() {
  return <svg width="20" height="20" viewBox="0 0 24 24" fill="#444746"><circle cx="12" cy="5" r="1.5"/><circle cx="12" cy="12" r="1.5"/><circle cx="12" cy="19" r="1.5"/></svg>
}
function ChevronLeftIcon() {
  return <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M15 18l-6-6 6-6" stroke="#444746" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
}
function ChevronRightIcon() {
  return <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M9 18l6-6-6-6" stroke="#444746" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
}
function ForwardIcon({ color = '#444746' }) {
  return <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><polyline points="15 17 20 12 15 7" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/><path d="M4 18v-2a4 4 0 0 1 4-4h12" stroke={color} strokeWidth="1.8" strokeLinecap="round"/></svg>
}
function PrintIcon() {
  return <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><polyline points="6 9 6 2 18 2 18 9" stroke="#444746" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2" stroke="#444746" strokeWidth="1.8" strokeLinejoin="round"/><rect x="6" y="14" width="12" height="8" stroke="#444746" strokeWidth="1.8" strokeLinejoin="round"/></svg>
}
function OpenInNewIcon() {
  return <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" stroke="#444746" strokeWidth="1.8" strokeLinecap="round"/><polyline points="15 3 21 3 21 9" stroke="#444746" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/><line x1="10" y1="14" x2="21" y2="3" stroke="#444746" strokeWidth="1.8" strokeLinecap="round"/></svg>
}
function StarOutlineIcon() {
  return <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" stroke="#5f6368" strokeWidth="1.8" strokeLinejoin="round"/></svg>
}
function ReplyIcon({ color = '#5f6368' }) {
  return <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><polyline points="9 17 4 12 9 7" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/><path d="M20 18v-2a4 4 0 0 0-4-4H4" stroke={color} strokeWidth="1.8" strokeLinecap="round"/></svg>
}
function HelpIcon() {
  return <svg width="22" height="22" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="9" stroke="#5f6368" strokeWidth="1.8"/><path d="M9.5 9a2.5 2.5 0 0 1 5 0c0 1.5-1.5 2-2.5 2.5V13" stroke="#5f6368" strokeWidth="1.8" strokeLinecap="round"/><circle cx="12" cy="16.5" r="1" fill="#5f6368"/></svg>
}
function SettingsIcon() {
  return <svg width="22" height="22" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="3" stroke="#5f6368" strokeWidth="1.8"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" stroke="#5f6368" strokeWidth="1.8"/></svg>
}
function AppsIcon() {
  return <svg width="22" height="22" viewBox="0 0 24 24" fill="#5f6368"><circle cx="5" cy="5" r="2"/><circle cx="12" cy="5" r="2"/><circle cx="19" cy="5" r="2"/><circle cx="5" cy="12" r="2"/><circle cx="12" cy="12" r="2"/><circle cx="19" cy="12" r="2"/><circle cx="5" cy="19" r="2"/><circle cx="12" cy="19" r="2"/><circle cx="19" cy="19" r="2"/></svg>
}

// ── Right rail icons ──
function CalendarRailIcon() {
  return <svg width="24" height="24" viewBox="0 0 24 24" fill="none"><rect x="3" y="4" width="18" height="17" rx="2" stroke="#f09300" strokeWidth="1.8"/><path d="M3 9h18" stroke="#f09300" strokeWidth="1.8"/><path d="M8 2v4M16 2v4" stroke="#f09300" strokeWidth="1.8" strokeLinecap="round"/></svg>
}
function KeepRailIcon() {
  return <svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M17 3H7a2 2 0 0 0-2 2v14l7-3 7 3V5a2 2 0 0 0-2-2z" stroke="#f9ab00" strokeWidth="1.8" strokeLinejoin="round"/></svg>
}
function TasksRailIcon() {
  return <svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M9 11l3 3L22 4" stroke="#1a73e8" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" stroke="#1a73e8" strokeWidth="1.8" strokeLinecap="round"/></svg>
}
function ContactsRailIcon() {
  return <svg width="24" height="24" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="8" r="4" stroke="#1a73e8" strokeWidth="1.8"/><path d="M4 20c0-4 3.6-8 8-8s8 4 8 8" stroke="#1a73e8" strokeWidth="1.8" strokeLinecap="round"/></svg>
}
