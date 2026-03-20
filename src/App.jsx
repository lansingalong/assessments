import { useState } from 'react'
import GmailInbox from './components/GmailInbox'
import Assessment from './components/Assessment'

export default function App() {
  const [view, setView] = useState('inbox')

  if (view === 'assessment') return <Assessment />
  return <GmailInbox onOpenAssessment={() => setView('assessment')} />
}
