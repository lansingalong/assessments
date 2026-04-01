import { useState, useId } from 'react'
import loginBg from '../assets/login-bg.png'
import wellframeLogo from '../assets/wellframe-logo.png'

// ── Validation ───────────────────────────────────────────────────────────────
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

// ── Simple bordered field ────────────────────────────────────────────────────
function Field({ label, value, onChange, error, placeholder, type = 'text' }) {
  const [focused, setFocused] = useState(false)
  const inputId = useId()
  const errorId = useId()
  return (
    <div>
      <label
        htmlFor={inputId}
        style={{
          display: 'block',
          marginBottom: 6,
          fontSize: 14,
          fontWeight: 400,
          color: 'var(--color-text)',
          fontFamily: 'Roboto, system-ui, sans-serif',
        }}
      >
        {label}
      </label>
      <input
        id={inputId}
        type={type}
        value={value}
        placeholder={placeholder}
        onChange={e => onChange(e.target.value)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        aria-invalid={!!error}
        aria-describedby={error ? errorId : undefined}
        style={{
          display: 'block',
          width: '100%',
          height: 52,
          padding: '0 14px',
          fontSize: 16,
          color: 'var(--color-text)',
          fontFamily: 'Roboto, system-ui, sans-serif',
          background: 'var(--color-white)',
          border: `1px solid ${error ? 'var(--color-error)' : focused ? 'var(--color-brand-accent)' : 'var(--color-border-mid)'}`,
          borderRadius: 4,
          outline: focused ? '2px solid var(--color-brand-accent)' : 'none',
          outlineOffset: 2,
          boxSizing: 'border-box',
          transition: 'border-color .15s',
        }}
      />
      {error && (
        <p
          id={errorId}
          role="alert"
          style={{
            margin: '5px 0 0',
            fontSize: 12,
            color: 'var(--color-error)',
            fontFamily: 'Roboto, system-ui, sans-serif',
          }}
        >
          {error}
        </p>
      )}
    </div>
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
  const titleId = useId()

  const handleDob = (raw) => {
    const digits = raw.replace(/\D/g, '').slice(0, 8)
    let formatted = digits
    if (digits.length > 4) formatted = digits.slice(0, 2) + '/' + digits.slice(2, 4) + '/' + digits.slice(4)
    else if (digits.length > 2) formatted = digits.slice(0, 2) + '/' + digits.slice(2)
    setDob(formatted)
    if (errors.dob) setErrors(e => ({ ...e, dob: null }))
    if (authError) setAuthError(null)
  }

  const clearError = (field) => {
    if (errors[field]) setErrors(e => ({ ...e, [field]: null }))
    if (authError) setAuthError(null)
  }

  const allFilled = firstName.trim().length > 0 && lastName.trim().length > 0 && dob.trim().length > 0

  const handleSubmit = () => {
    const e = {
      firstName: validateName(firstName, 'First name'),
      lastName:  validateName(lastName,  'Last name'),
      dob:       validateDob(dob),
    }
    setErrors(e)
    setAuthError(null)
    if (e.firstName || e.lastName || e.dob) return

    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      onSuccess()
    }, 800)
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') handleSubmit()
  }

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby={titleId}
      style={{
        position: 'fixed', inset: 0,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        zIndex: 50,
      }}
    >
      {/* Background */}
      <div aria-hidden="true" style={{
        position: 'absolute', inset: 0,
        backgroundImage: `url(${loginBg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center bottom',
      }} />
      <div aria-hidden="true" style={{ position: 'absolute', inset: 0, background: 'rgba(15, 53, 65, 0.15)' }} />

      {/* Card */}
      <div style={{
        position: 'relative',
        width: '100%',
        maxWidth: 480,
        margin: '0 20px',
        background: 'var(--color-white)',
        borderRadius: 12,
        boxShadow: '0 8px 40px rgba(15,53,65,0.18)',
        padding: '40px 40px 28px',
      }}>

        <h1
          id={titleId}
          style={{
            fontFamily: 'Roboto, system-ui, sans-serif',
            fontSize: 26,
            fontWeight: 400,
            color: 'var(--color-brand-accent)',
            textAlign: 'center',
            lineHeight: 1.35,
            margin: '0 0 36px',
          }}
        >
          Enter your name and date<br />of birth to get started
        </h1>

        {authError && (
          <div
            role="alert"
            style={{
              background: 'var(--color-error-bg)',
              border: '1px solid var(--color-error-light)',
              borderRadius: 6,
              padding: '10px 14px',
              marginBottom: 20,
              fontSize: 13,
              color: 'var(--color-error)',
              fontFamily: 'Roboto, system-ui, sans-serif',
            }}
          >
            {authError}
          </div>
        )}

        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }} onKeyDown={handleKeyDown}>
          <Field
            label="First name"
            value={firstName}
            onChange={v => { setFirstName(v); clearError('firstName') }}
            error={errors.firstName}
            placeholder="First name"
          />
          <Field
            label="Last name"
            value={lastName}
            onChange={v => { setLastName(v); clearError('lastName') }}
            error={errors.lastName}
            placeholder="Last name"
          />
          <Field
            label="Date of birth"
            value={dob}
            onChange={handleDob}
            error={errors.dob}
            placeholder="MM/DD/YYYY"
          />
        </div>

        <button
          onClick={handleSubmit}
          disabled={!allFilled || loading}
          aria-disabled={!allFilled || loading}
          style={{
            display: 'block',
            width: '100%',
            height: 52,
            marginTop: 32,
            background: !allFilled || loading ? 'var(--color-brand-disabled)' : 'var(--color-brand-accent)',
            border: 'none',
            borderRadius: 30,
            fontSize: 17,
            fontWeight: 500,
            color: 'var(--color-white)',
            fontFamily: 'Roboto, system-ui, sans-serif',
            cursor: !allFilled || loading ? 'not-allowed' : 'pointer',
            letterSpacing: '0.01em',
            transition: 'background .2s',
          }}
        >
          {loading ? 'Verifying…' : 'Next'}
        </button>

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 7, marginTop: 20 }}>
          <img src={wellframeLogo} alt="" aria-hidden="true" style={{ width: 20, height: 20 }} />
          <span style={{ fontFamily: 'Roboto, system-ui, sans-serif', fontSize: 13, color: 'var(--color-text-mid)' }}>
            Powered by Wellframe
          </span>
        </div>

      </div>
    </div>
  )
}
