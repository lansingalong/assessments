import { useState } from 'react'
import GmailInbox from './components/GmailInbox'
import AuthModal from './components/AuthModal'
import Assessment from './components/Assessment'

export default function App() {
  const [view, setView] = useState('email')

  if (view === 'assessment') return <Assessment onBackToEmail={() => setView('email')} />
  if (view === 'auth')       return <AuthModal  onSuccess={() => setView('assessment')} onBack={() => setView('email')} />
  return <GmailInbox onOpenAssessment={() => setView('auth')} />
}
