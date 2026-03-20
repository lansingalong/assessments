import { useState } from 'react'
import { sfPro } from './survey/shared'
import loginBg from '../assets/login-bg.png'

// ── Mock valid credentials ──────────────────────────────────────────────────
const VALID = { firstName: 'Jane', lastName: 'Doe', dob: '01/01/1980' }

// ── Validation ──────────────────────────────────────────────────────────────
function validateName(val, label) {
  if (!val.trim()) return `${label} is required`
  if (!/^[A-Za-z\s'\-]+$/.test(val.trim())) return `${label} can only contain letters`
  return null
}

function validateDob(val) {
  if (!val.trim()) return 'Date of birth is required'
  if (!/^\d{2}\/\d{2}\/\d{4}$/.test(val)) return 'Enter a valid date (MM/DD/YYYY)'
  const [mm, dd, yyyy] = val.split('/').map(Number)
  const d = new Date(yyyy, mm - 1, dd)
  if (d.getFullYear() !== yyyy || d.getMonth() !== mm - 1 || d.getDate() !== dd)
    return 'Enter a valid calendar date'
  if (d > new Date()) return 'Date of birth cannot be in the future'
  return null
}

// ── Wellframe Android-style text field ──────────────────────────────────────
function WfField({ label, value, onChange, error, type = 'text', placeholder, hint }) {
  const [focused, setFocused] = useState(false)
  const hasValue = value.length > 0
  const floated = focused || hasValue

  const borderColor = error ? '#923133' : focused ? '#0080A3' : '#4E5961'
  const labelColor  = error ? '#923133' : focused ? '#0080A3' : '#4E5961'

  return (
    <div>
      <div style={{ position: 'relative', background: '#D9E3E7', borderRadius: '4px 4px 0 0', height: 56 }}>
        {/* Floating label */}
        <div style={{
          position: 'absolute',
          left: 16,
          top: floated ? 8 : '50%',
          transform: floated ? 'none' : 'translateY(-50%)',
          fontSize: floated ? 12 : 16,
          lineHeight: floated ? '16px' : '21px',
          color: floated ? labelColor : '#4E5961',
          pointerEvents: 'none',
          transition: 'all .15s ease',
          fontFamily: 'Roboto, system-ui, sans-serif',
        }}>
          {label}
        </div>

        {/* Input */}
        <input
          type={type}
          value={value}
          placeholder={floated ? placeholder : ''}
          onChange={e => onChange(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          style={{
            position: 'absolute',
            bottom: 10,
            left: 16,
            right: 16,
            width: 'calc(100% - 32px)',
            background: 'transparent',
            border: 'none',
            outline: 'none',
            fontSize: 16,
            lineHeight: '21px',
            color: '#282F35',
            fontFamily: 'Roboto, system-ui, sans-serif',
          }}
        />

        {/* Bottom border */}
        <div style={{
          position: 'absolute',
          bottom: 0, left: 0, right: 0,
          height: focused ? 2 : 1,
          background: borderColor,
          transition: 'height .15s, background .15s',
        }} />
      </div>

      {/* Helper / error text */}
      <div style={{
        minHeight: 20,
        padding: '4px 16px 0',
        fontSize: 12,
        lineHeight: '16px',
        fontFamily: 'Roboto, system-ui, sans-serif',
        color: error ? '#923133' : '#4E5961',
        display: 'flex',
        alignItems: 'center',
        gap: 4,
      }}>
        {error ? (
          <>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="#923133" style={{ flexShrink: 0 }}>
              <circle cx="12" cy="12" r="10"/>
              <path d="M12 7v5" stroke="#fff" strokeWidth="2.2" strokeLinecap="round"/>
              <circle cx="12" cy="16.5" r="1.2" fill="#fff"/>
            </svg>
            {error}
          </>
        ) : hint ? (
          <span style={{ color: '#4E5961' }}>{hint}</span>
        ) : null}
      </div>
    </div>
  )
}

// ── Background illustration ─────────────────────────────────────────────────
function HealthIllustration() {
  return (
    <svg
      width="100%" height="100%"
      viewBox="0 0 1440 900"
      preserveAspectRatio="xMidYMid slice"
      style={{ position: 'absolute', inset: 0 }}
    >
      {/* Background */}
      <rect width="1440" height="900" fill="#F2F8FA"/>

      {/* Large background circles */}
      <circle cx="1280" cy="120"  r="260" fill="#B0DEEA" opacity="0.35"/>
      <circle cx="160"  cy="780"  r="200" fill="#0E98BE" opacity="0.12"/>
      <circle cx="720"  cy="-40"  r="180" fill="#D9E3E7" opacity="0.6"/>
      <circle cx="1380" cy="800"  r="140" fill="#B0DEEA" opacity="0.2"/>
      <circle cx="60"   cy="200"  r="120" fill="#0080A3" opacity="0.08"/>

      {/* Dot grid — top right */}
      {Array.from({ length: 6 }).map((_, row) =>
        Array.from({ length: 8 }).map((_, col) => (
          <circle
            key={`${row}-${col}`}
            cx={1060 + col * 28}
            cy={60  + row * 28}
            r="3"
            fill="#0080A3"
            opacity="0.18"
          />
        ))
      )}

      {/* Dot grid — bottom left */}
      {Array.from({ length: 5 }).map((_, row) =>
        Array.from({ length: 6 }).map((_, col) => (
          <circle
            key={`bl-${row}-${col}`}
            cx={60  + col * 28}
            cy={680 + row * 28}
            r="3"
            fill="#0080A3"
            opacity="0.15"
          />
        ))
      )}

      {/* Heartbeat line */}
      <polyline
        points="60,460 160,460 200,350 240,560 280,420 320,420 380,460 1380,460"
        fill="none"
        stroke="#0E98BE"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity="0.25"
      />

      {/* Large shield / care icon — left side */}
      <g transform="translate(200, 280)" opacity="0.12">
        <path d="M80 0 L160 30 L160 110 C160 155 80 180 80 180 C80 180 0 155 0 110 L0 30 Z" fill="#0080A3"/>
        <path d="M60 85 L80 105 L110 72" stroke="#fff" strokeWidth="10" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
      </g>

      {/* Pill shape — top left */}
      <rect x="80" y="100" width="80" height="32" rx="16" fill="#0E98BE" opacity="0.15" transform="rotate(-30 120 116)"/>
      <line x1="120" y1="92" x2="120" y2="140" stroke="#fff" strokeWidth="2" opacity="0.4" transform="rotate(-30 120 116)"/>

      {/* Stethoscope arc — bottom right */}
      <g transform="translate(1150, 600)" opacity="0.1">
        <circle cx="60" cy="0" r="50" fill="none" stroke="#0080A3" strokeWidth="14"/>
        <line x1="60" y1="50" x2="60" y2="130" stroke="#0080A3" strokeWidth="12" strokeLinecap="round"/>
        <circle cx="60" cy="150" r="28" fill="#0080A3"/>
      </g>

      {/* Floating cards / abstract shapes */}
      <rect x="1060" y="380" width="120" height="8" rx="4" fill="#0E98BE" opacity="0.15"/>
      <rect x="1060" y="400" width="80"  height="8" rx="4" fill="#0E98BE" opacity="0.1"/>
      <rect x="1060" y="420" width="100" height="8" rx="4" fill="#0E98BE" opacity="0.08"/>

      <rect x="200" y="140" width="100" height="8" rx="4" fill="#0080A3" opacity="0.12"/>
      <rect x="200" y="160" width="70"  height="8" rx="4" fill="#0080A3" opacity="0.08"/>

      {/* Cross icon — right */}
      <g transform="translate(1240, 280)" opacity="0.1">
        <rect x="20" y="0"  width="20" height="60" rx="4" fill="#0080A3"/>
        <rect x="0"  y="20" width="60" height="20" rx="4" fill="#0080A3"/>
      </g>

      {/* Curved connecting lines */}
      <path d="M 0 600 Q 360 500 720 580 T 1440 520" fill="none" stroke="#B0DEEA" strokeWidth="2" opacity="0.5"/>
      <path d="M 0 650 Q 360 580 720 640 T 1440 580" fill="none" stroke="#D9E3E7" strokeWidth="1.5" opacity="0.8"/>
    </svg>
  )
}

// ── Main component ───────────────────────────────────────────────────────────
export default function AuthModal({ onSuccess, onBack }) {
  const [firstName, setFirstName] = useState('')
  const [lastName,  setLastName]  = useState('')
  const [dob,       setDob]       = useState('')

  const [errors,    setErrors]    = useState({})
  const [authError, setAuthError] = useState(null)
  const [loading,   setLoading]   = useState(false)

  // Auto-format DOB as user types
  const handleDob = (raw) => {
    const digits = raw.replace(/\D/g, '').slice(0, 8)
    let formatted = digits
    if (digits.length > 4) formatted = digits.slice(0,2) + '/' + digits.slice(2,4) + '/' + digits.slice(4)
    else if (digits.length > 2) formatted = digits.slice(0,2) + '/' + digits.slice(2)
    setDob(formatted)
    if (errors.dob) setErrors(e => ({ ...e, dob: null }))
  }

  const handleSubmit = () => {
    // Run all format validations
    const e = {
      firstName: validateName(firstName, 'First name'),
      lastName:  validateName(lastName,  'Last name'),
      dob:       validateDob(dob),
    }
    setErrors(e)
    setAuthError(null)
    if (e.firstName || e.lastName || e.dob) return

    // Simulate async auth check
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      const match =
        firstName.trim().toLowerCase() === VALID.firstName.toLowerCase() &&
        lastName.trim().toLowerCase()  === VALID.lastName.toLowerCase()  &&
        dob.trim()                     === VALID.dob
      if (match) {
        onSuccess()
      } else {
        setAuthError('The information you entered doesn\'t match our records. Please check your details and try again.')
      }
    }, 800)
  }

  const clearFieldError = (field) => {
    if (errors[field]) setErrors(e => ({ ...e, [field]: null }))
    if (authError) setAuthError(null)
  }

  const allFilled = firstName.trim() && lastName.trim() && dob.trim()

  return (
    <div style={{ position: 'fixed', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 50 }}>

      {/* Illustration background */}
      <div style={{
        position: 'absolute', inset: 0, overflow: 'hidden',
        backgroundImage: `url(${loginBg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center bottom',
      }} />

      {/* Overlay to ensure modal readability */}
      <div style={{ position: 'absolute', inset: 0, background: 'rgba(15, 53, 65, 0.15)' }} />

      {/* Modal card */}
      <div style={{
        position: 'relative',
        width: '100%',
        maxWidth: 420,
        margin: '0 16px',
        background: '#fff',
        borderRadius: 10,
        boxShadow: '0 24px 48px rgba(15,53,65,0.18), 0 4px 16px rgba(15,53,65,0.1)',
        overflow: 'hidden',
      }}>

        {/* Modal header */}
        <div style={{ background: '#0080A3', padding: '20px 24px 18px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 4 }}>
            {/* BCBS shield icon */}
            <svg width="28" height="28" viewBox="0 0 28 28">
              <path d="M14 2 L26 6.5 L26 15 C26 21 14 26 14 26 C14 26 2 21 2 15 L2 6.5 Z" fill="rgba(255,255,255,0.2)"/>
              <path d="M10 13.5 L13 16.5 L18.5 11" stroke="#fff" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
            </svg>
            <span style={{ fontFamily: sfPro, fontSize: 18, fontWeight: 600, color: '#fff', letterSpacing: '-0.32px' }}>
              Verify Your Identity
            </span>
          </div>
          <p style={{ fontFamily: 'Roboto, system-ui, sans-serif', fontSize: 13, color: 'rgba(255,255,255,0.8)', margin: 0, lineHeight: 1.5 }}>
            To protect your health information, please confirm your details before accessing your assessment.
          </p>
        </div>

        {/* Modal body */}
        <div style={{ padding: '24px 24px 20px' }}>

          {/* Auth mismatch error banner */}
          {authError && (
            <div style={{
              background: '#FFF3F3',
              border: '1px solid #F05B60',
              borderRadius: 6,
              padding: '12px 14px',
              marginBottom: 20,
              display: 'flex',
              gap: 10,
              alignItems: 'flex-start',
            }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="#F05B60" style={{ flexShrink: 0, marginTop: 1 }}>
                <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/>
                <line x1="12" y1="9" x2="12" y2="13" stroke="#fff" strokeWidth="2" strokeLinecap="round"/>
                <circle cx="12" cy="17" r="1" fill="#fff"/>
              </svg>
              <div>
                <div style={{ fontFamily: 'Roboto, system-ui, sans-serif', fontSize: 13, fontWeight: 600, color: '#923133', marginBottom: 2 }}>
                  Information not found
                </div>
                <div style={{ fontFamily: 'Roboto, system-ui, sans-serif', fontSize: 13, color: '#923133', lineHeight: 1.5 }}>
                  {authError}
                </div>
              </div>
            </div>
          )}

          {/* Fields */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            <WfField
              label="First Name"
              value={firstName}
              onChange={v => { setFirstName(v); clearFieldError('firstName') }}
              error={errors.firstName}
            />
            <WfField
              label="Last Name"
              value={lastName}
              onChange={v => { setLastName(v); clearFieldError('lastName') }}
              error={errors.lastName}
            />
            <WfField
              label="Date of Birth"
              value={dob}
              onChange={handleDob}
              error={errors.dob}
              placeholder="MM/DD/YYYY"
              hint="Format: MM/DD/YYYY"
            />
          </div>

          {/* HIPAA note */}
          <div style={{
            display: 'flex', alignItems: 'flex-start', gap: 8,
            background: '#F2F8FA', borderRadius: 6, padding: '10px 12px',
            marginTop: 20,
          }}>
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" style={{ flexShrink: 0, marginTop: 1 }}>
              <circle cx="12" cy="12" r="9" stroke="#0080A3" strokeWidth="1.8"/>
              <path d="M12 11v5" stroke="#0080A3" strokeWidth="2" strokeLinecap="round"/>
              <circle cx="12" cy="8" r="1" fill="#0080A3"/>
            </svg>
            <p style={{ fontFamily: 'Roboto, system-ui, sans-serif', fontSize: 12, color: '#4E5961', margin: 0, lineHeight: 1.5 }}>
              Your information is protected under HIPAA and used only to verify your identity.
            </p>
          </div>

          {/* Buttons */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginTop: 20 }}>
            <button
              onClick={handleSubmit}
              disabled={loading}
              style={{
                fontFamily: sfPro,
                fontSize: 16,
                fontWeight: 500,
                color: '#fff',
                background: loading ? '#78868E' : '#0E98BE',
                border: 'none',
                borderRadius: 30,
                height: 51,
                width: '100%',
                cursor: loading ? 'not-allowed' : 'pointer',
                letterSpacing: '-0.32px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 8,
                transition: 'background .2s',
              }}
            >
              {loading ? (
                <>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" style={{ animation: 'spin 1s linear infinite' }}>
                    <circle cx="12" cy="12" r="9" stroke="rgba(255,255,255,0.35)" strokeWidth="2.5"/>
                    <path d="M12 3a9 9 0 0 1 9 9" stroke="#fff" strokeWidth="2.5" strokeLinecap="round"/>
                  </svg>
                  Verifying…
                </>
              ) : 'Continue'}
            </button>
            <button
              onClick={onBack}
              style={{
                fontFamily: sfPro,
                fontSize: 16,
                fontWeight: 500,
                color: '#0E98BE',
                background: 'transparent',
                border: '1px solid #0E98BE',
                borderRadius: 30,
                height: 51,
                width: '100%',
                cursor: 'pointer',
                letterSpacing: '-0.32px',
              }}
            >
              ← Back to Email
            </button>
          </div>
        </div>

        {/* Modal footer */}
        <div style={{ borderTop: '1px solid #E8EDF0', padding: '12px 24px', textAlign: 'center' }}>
          <p style={{ fontFamily: 'Roboto, system-ui, sans-serif', fontSize: 12, color: '#78868E', margin: 0 }}>
            Need help?{' '}
            <span style={{ color: '#0080A3', cursor: 'pointer' }}>Call 1-800-521-2227</span>
            {' '}(TTY: 711) · Mon–Fri, 8 AM–6 PM ET
          </p>
        </div>
      </div>

      {/* Spinner keyframe */}
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  )
}
