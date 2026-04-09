import { useState, useEffect } from 'react'
import GmailInbox from './components/GmailInbox'
import AuthModal from './components/AuthModal'
import Assessment from './components/Assessment'
import RemoteControl from './components/RemoteControl'

export default function App() {
  const [view, setView] = useState('email')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [dob, setDob] = useState('')
  const [storageKey, setStorageKey] = useState('')
  const [assessmentType, setAssessmentType] = useState(
    () => new URLSearchParams(window.location.search).get('assessment')
      || localStorage.getItem('gc-pending-assessment')
      || 'Health Risk Assessment'
  )

  // Listen for GC app setting a new pending assessment (cross-tab)
  useEffect(() => {
    const handle = (e) => {
      if (e.key === 'gc-pending-assessment' && e.newValue) {
        setAssessmentType(e.newValue)
      }
    }
    window.addEventListener('storage', handle)
    return () => window.removeEventListener('storage', handle)
  }, [])

  return (
    <>
      {view === 'assessment' && <Assessment firstName={firstName} lastName={lastName} dob={dob} storageKey={storageKey} assessmentType={assessmentType} onBackToEmail={() => setView('email')} onBackToLogin={() => setView('auth')} />}
      {view === 'auth' && <AuthModal onSuccess={(first, last, d) => { setFirstName(first); setLastName(last); setDob(d); setStorageKey(`wf_assessment_${first}_${last}_${d}`.toLowerCase()); setView('assessment') }} onBack={() => setView('email')} />}
      {view === 'email' && <GmailInbox assessmentType={assessmentType} onOpenAssessment={() => setView('auth')} />}
      <RemoteControl
        onGoEmail={() => setView('email')}
        onGoAssessment={() => setView('assessment')}
        onGoLogin={() => setView('auth')}
        onReset={() => {
          Object.keys(localStorage)
            .filter(k => k.startsWith('wf_assessment_'))
            .forEach(k => localStorage.removeItem(k))
          setFirstName('')
          setStorageKey('')
          setView('email')
        }}
      />
    </>
  )
}
