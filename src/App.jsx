import { useState } from 'react'
import GmailInbox from './components/GmailInbox'
import AuthModal from './components/AuthModal'
import Assessment from './components/Assessment'
import RemoteControl from './components/RemoteControl'

export default function App() {
  const [view, setView] = useState('email')
  const [firstName, setFirstName] = useState('')

  return (
    <>
      {view === 'assessment' && <Assessment firstName={firstName} onBackToEmail={() => setView('email')} onBackToLogin={() => setView('auth')} />}
      {view === 'auth' && <AuthModal onSuccess={(name) => { setFirstName(name); setView('assessment') }} onBack={() => setView('email')} />}
      {view === 'email' && <GmailInbox onOpenAssessment={() => setView('auth')} />}
      <RemoteControl
        onGoEmail={() => setView('email')}
        onGoAssessment={() => setView('assessment')}
        onGoLogin={() => setView('auth')}
      />
    </>
  )
}
