import { useState } from 'react'
import GmailInbox from './components/GmailInbox'
import Assessment from './components/Assessment'

export default function App() {
  const [view, setView] = useState('email')

  if (view === 'assessment') return <Assessment onBackToEmail={() => setView('email')} />
  return <GmailInbox onOpenAssessment={() => setView('assessment')} />
}
