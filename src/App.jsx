import { useState } from 'react'
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

  return (
    <>
      {view === 'assessment' && <Assessment firstName={firstName} lastName={lastName} dob={dob} storageKey={storageKey} onBackToEmail={() => setView('email')} onBackToLogin={() => setView('auth')} />}
      {view === 'auth' && <AuthModal onSuccess={(first, last, d) => { setFirstName(first); setLastName(last); setDob(d); setStorageKey(`wf_assessment_${first}_${last}_${d}`.toLowerCase()); setView('assessment') }} onBack={() => setView('email')} />}
      {view === 'email' && <GmailInbox onOpenAssessment={() => setView('auth')} />}
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
