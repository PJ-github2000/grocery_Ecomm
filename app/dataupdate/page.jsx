import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import SubmissionButton from './Modal'
import SubmissionsPage from './table'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SubmissionButton />} />
        <Route path="/submissions" element={<SubmissionsPage />} />
      </Routes>
    </Router>
  )
}

export default App
