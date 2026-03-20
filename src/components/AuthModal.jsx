import { useState } from 'react'
import loginBg from '../assets/login-bg.png'

const VALID = { dob: '01/01/1980', email: 'jane.doe@bcbs.com' }

// ── Validation ───────────────────────────────────────────────────────────────
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

function validateEmail(val) {
  if (!val.trim()) return 'Email address is required'
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val.trim())) return 'Enter a valid email address'
  return null
}

// ── Simple bordered field ────────────────────────────────────────────────────
function Field({ label, value, onChange, error, placeholder, type = 'text' }) {
  const [focused, setFocused] = useState(false)
  return (
    <div>
      <label style={{
        display: 'block',
        marginBottom: 6,
        fontSize: 14,
        fontWeight: 400,
        color: '#282F35',
        fontFamily: 'Roboto, system-ui, sans-serif',
      }}>
        {label}
      </label>
      <input
        type={type}
        value={value}
        placeholder={placeholder}
        onChange={e => onChange(e.target.value)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        style={{
          display: 'block',
          width: '100%',
          height: 52,
          padding: '0 14px',
          fontSize: 16,
          color: '#282F35',
          fontFamily: 'Roboto, system-ui, sans-serif',
          background: '#fff',
          border: `1px solid ${error ? '#923133' : focused ? '#0E98BE' : '#B8CDD4'}`,
          borderRadius: 4,
          outline: 'none',
          boxSizing: 'border-box',
          transition: 'border-color .15s',
        }}
      />
      {error && (
        <p style={{
          margin: '5px 0 0',
          fontSize: 12,
          color: '#923133',
          fontFamily: 'Roboto, system-ui, sans-serif',
        }}>
          {error}
        </p>
      )}
    </div>
  )
}

// ── Wellframe logo mark ──────────────────────────────────────────────────────
function WellframeMark() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="10" cy="10" r="9.5" stroke="#0E98BE" strokeWidth="1"/>
      <path
        d="M5 7l2 6 3-4 3 4 2-6"
        stroke="#0E98BE"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    </svg>
  )
}

// ── Main component ───────────────────────────────────────────────────────────
export default function AuthModal({ onSuccess, onBack }) {
  const [dob,      setDob]      = useState('')
  const [email,    setEmail]    = useState('')
  const [errors,   setErrors]   = useState({})
  const [authError, setAuthError] = useState(null)
  const [loading,  setLoading]  = useState(false)

  const handleDob = (raw) => {
    const digits = raw.replace(/\D/g, '').slice(0, 8)
    let formatted = digits
    if (digits.length > 4) formatted = digits.slice(0, 2) + '/' + digits.slice(2, 4) + '/' + digits.slice(4)
    else if (digits.length > 2) formatted = digits.slice(0, 2) + '/' + digits.slice(2)
    setDob(formatted)
    if (errors.dob) setErrors(e => ({ ...e, dob: null }))
    if (authError) setAuthError(null)
  }

  const handleEmailChange = (val) => {
    setEmail(val)
    if (errors.email) setErrors(e => ({ ...e, email: null }))
    if (authError) setAuthError(null)
  }

  const handleSubmit = () => {
    const e = {
      dob:   validateDob(dob),
      email: validateEmail(email),
    }
    setErrors(e)
    setAuthError(null)
    if (e.dob || e.email) return

    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      const match =
        dob.trim() === VALID.dob &&
        email.trim().toLowerCase() === VALID.email.toLowerCase()
      if (match) {
        onSuccess()
      } else {
        setAuthError('The information you entered doesn\'t match our records.')
      }
    }, 800)
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') handleSubmit()
  }

  return (
    <div style={{
      position: 'fixed', inset: 0,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      zIndex: 50,
    }}>
      {/* Background */}
      <div style={{
        position: 'absolute', inset: 0,
        backgroundImage: `url(${loginBg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center bottom',
      }} />
      <div style={{ position: 'absolute', inset: 0, background: 'rgba(15, 53, 65, 0.15)' }} />

      {/* Card */}
      <div style={{
        position: 'relative',
        width: '100%',
        maxWidth: 480,
        margin: '0 20px',
        background: '#fff',
        borderRadius: 12,
        boxShadow: '0 8px 40px rgba(15,53,65,0.18)',
        padding: '40px 40px 28px',
      }}>

        {/* Title */}
        <h1 style={{
          fontFamily: 'Roboto, system-ui, sans-serif',
          fontSize: 26,
          fontWeight: 400,
          color: '#0E98BE',
          textAlign: 'center',
          lineHeight: 1.35,
          margin: '0 0 36px',
        }}>
          Enter your date of birth<br />and email to get started
        </h1>

        {/* Auth error banner */}
        {authError && (
          <div style={{
            background: '#FFF3F3',
            border: '1px solid #F05B60',
            borderRadius: 6,
            padding: '10px 14px',
            marginBottom: 20,
            fontSize: 13,
            color: '#923133',
            fontFamily: 'Roboto, system-ui, sans-serif',
          }}>
            {authError}
          </div>
        )}

        {/* Fields */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }} onKeyDown={handleKeyDown}>
          <Field
            label="Date of birth"
            value={dob}
            onChange={handleDob}
            error={errors.dob}
            placeholder="MM/DD/YYYY"
          />
          <Field
            label="Email address"
            value={email}
            onChange={handleEmailChange}
            error={errors.email}
            placeholder="Email address"
            type="email"
          />
        </div>

        {/* Next button */}
        <button
          onClick={handleSubmit}
          disabled={loading}
          style={{
            display: 'block',
            width: '100%',
            height: 52,
            marginTop: 32,
            background: loading ? '#A8D4DF' : '#8BBFD0',
            border: 'none',
            borderRadius: 30,
            fontSize: 17,
            fontWeight: 500,
            color: '#fff',
            fontFamily: 'Roboto, system-ui, sans-serif',
            cursor: loading ? 'not-allowed' : 'pointer',
            letterSpacing: '0.01em',
            transition: 'background .2s',
          }}
        >
          {loading ? 'Verifying…' : 'Next'}
        </button>

        {/* Powered by Wellframe */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 7,
          marginTop: 20,
        }}>
          <WellframeMark />
          <span style={{
            fontFamily: 'Roboto, system-ui, sans-serif',
            fontSize: 13,
            color: '#4E5961',
          }}>
            Powered by Wellframe
          </span>
        </div>

      </div>
    </div>
  )
}
