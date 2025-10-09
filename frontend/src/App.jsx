import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import SignIn from './components/SignIn.jsx'
import SignUp from './components/SignUp.jsx'
import Admin from './components/Admin.jsx'
import DoctorDashboard from './components/DoctorDashboard.jsx'
import PatientDashboard from './components/PatientDashboard.jsx'
import ViewAdmin from './components/ViewAdmin.jsx'
import './App.css'

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Navigate to="/signin" replace />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/doctor-dashboard" element={<DoctorDashboard />} />
          <Route path="/patient-dashboard" element={<PatientDashboard />} />
          <Route path="/view-admin" element={<ViewAdmin />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
