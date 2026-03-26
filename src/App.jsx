import { useState } from 'react'
import GmailInbox from './components/GmailInbox'
import AuthModal from './components/AuthModal'
import Assessment from './components/Assessment'
import RemoteControl from './components/RemoteControl'

export default function App() {
  const [view, setView] = useState('email')

  return (
    <>
      {view === 'assessment' && <Assessment onBackToEmail={() => setView('email')} onBackToLogin={() => setView('auth')} />}
      {view === 'auth' && <AuthModal onSuccess={() => setView('assessment')} onBack={() => setView('email')} />}
      {view === 'email' && <GmailInbox onOpenAssessment={() => setView('auth')} />}
      <RemoteControl
        onGoEmail={() => setView('email')}
        onGoAssessment={() => setView('assessment')}
        onGoLogin={() => setView('auth')}
      />
    </>
  )
}
