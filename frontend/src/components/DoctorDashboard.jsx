import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import './DoctorDashboard.css'

const DoctorDashboard = () => {
  const [loading, setLoading] = useState(false)
  const [appointments, setAppointments] = useState([])
  const [doctorData, setDoctorData] = useState(null)
  const navigate = useNavigate()
  const backendURL = "http://localhost:5000/"

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      alert("Please login")
      navigate('/signin')
      return
    }

    const id = localStorage.getItem('id')
    fetchDoctorData(id)
    fetchAppointments(id)
  }, [navigate])

  const fetchDoctorData = async (id) => {
    try {
      const response = await fetch(`${backendURL}doctors/getdoctor/${id}`)
      const data = await response.json()
      setDoctorData(data.Doctor)
    } catch (error) {
      console.error('Error loading doctor data:', error)
    }
  }

  const fetchAppointments = async (id) => {
    try {
      const token = localStorage.getItem('token')
      const response = await fetch(`${backendURL}appointments/docapp/${id}`, {
        method: "GET",
        headers: {
          Authorization: token,
        }
      })
      const data = await response.json()
      setAppointments(data.Appointments)
    } catch (error) {
      console.error('Error fetching appointments:', error)
    }
  }

  const handleCancelAppointment = async (appointmentId) => {
    const confirmDelete = confirm('Are you sure you want to delete this appointment?')
    if (confirmDelete) {
      setLoading(true)
      const token = localStorage.getItem('token')
      
      try {
        const response = await fetch(`${backendURL}appointments/delete/${appointmentId}`, {
          method: 'DELETE',
          headers: {
            'Authorization': token
          }
        })
        
        if (response.ok) {
          alert('Appointment deleted')
          const id = localStorage.getItem('id')
          fetchAppointments(id)
        } else {
          console.error('Failed to delete appointment')
        }
      } catch (error) {
        console.error('Error occurred while deleting appointment:', error)
      } finally {
        setLoading(false)
      }
    }
  }

  const handleLogout = async () => {
    const token = localStorage.getItem('token')
    
    localStorage.removeItem('token')
    localStorage.removeItem('name')
    localStorage.removeItem('id')

    try {
      const response = await fetch(`${backendURL}doctors/logout`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': token
        }
      })
      
      if (response.ok) {
        navigate('/')
        alert("Logging you out")
      } else {
        console.log('Logout request failed.')
      }
    } catch (error) {
      console.log('An error occurred during logout:', error)
    }
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    const year = date.getFullYear()
    const month = (date.getMonth() + 1).toString().padStart(2, '0')
    const day = date.getDate().toString().padStart(2, '0')
    return `${year}-${month}-${day}`
  }

  return (
    <div style={{ 
      textAlign: 'center', 
      fontFamily: 'Verdana, Geneva, sans-serif', 
      backgroundColor: '#f4f4f4', 
      margin: 0, 
      minHeight: '100vh',
      padding: '20px',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      width: '100vw',
      boxSizing: 'border-box'
    }}>
      
      <nav style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        backgroundColor: '#e8f4f8',
        padding: '15px 30px',
        marginBottom: '30px',
        borderRadius: '10px',
        boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
        width: '100%',
        maxWidth: '1400px'
      }}>
        <div id="index">
          <h1 style={{ color: '#2c3e50', margin: 0, fontSize: '28px', fontWeight: 'bold' }}>DocEase</h1>
        </div>
        <div>
          <h1 style={{ color: '#e74c3c', margin: 0, fontSize: '24px', fontWeight: 'bold' }}>Doctor Dashboard</h1>
        </div>
        <div>
          <h2 style={{ color: '#2c3e50', margin: '0 15px 0 0', fontSize: '18px', fontWeight: 'bold' }}>
            Hi {localStorage.getItem('name')}
          </h2>
          <button 
            onClick={handleLogout}
            style={{
              padding: '12px 20px',
              backgroundColor: '#e74c3c',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              fontSize: '14px',
              fontWeight: 'bold',
              transition: 'all 0.3s ease',
              boxShadow: '0 2px 5px rgba(0,0,0,0.1)'
            }}
            onMouseOver={(e) => e.target.style.backgroundColor = '#c0392b'}
            onMouseOut={(e) => e.target.style.backgroundColor = '#e74c3c'}
          >
            Logout
          </button>
        </div>
      </nav>

      <div style={{ 
        width: '100%',
        maxWidth: '1400px',
        backgroundColor: '#fff',
        borderRadius: '15px',
        padding: '30px',
        border: '3px solid #27ae60',
        boxShadow: '0 8px 25px rgba(39, 174, 96, 0.2)',
        transition: 'transform 0.3s ease'
      }}
      onMouseOver={(e) => e.currentTarget.style.transform = 'translateY(-5px)'}
      onMouseOut={(e) => e.currentTarget.style.transform = 'translateY(0)'}>
        <h2 style={{ 
          color: '#2c3e50', 
          marginBottom: '25px',
          fontSize: '24px',
          fontWeight: 'bold',
          textAlign: 'center'
        }}>Upcoming Appointments</h2>
        
        <div style={{ 
          display: 'flex', 
          flexDirection: 'column',
          gap: '20px'
        }}>
          {appointments.length === 0 ? (
            <div style={{
              padding: '40px',
              backgroundColor: '#f8f9fa',
              borderRadius: '10px',
              border: '2px dashed #dee2e6',
              textAlign: 'center'
            }}>
              <p style={{ 
                color: '#6c757d', 
                fontSize: '18px', 
                margin: 0,
                fontWeight: 'bold'
              }}>
                No Appointments
              </p>
            </div>
          ) : (
            appointments.map(appointment => (
              <div key={appointment._id} style={{
                display: 'flex',
                alignItems: 'center',
                backgroundColor: '#f8f9fa',
                borderRadius: '12px',
                padding: '20px',
                border: '2px solid #e9ecef',
                transition: 'all 0.3s ease',
                boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.backgroundColor = '#e3f2fd'
                e.currentTarget.style.borderColor = '#27ae60'
                e.currentTarget.style.transform = 'translateY(-2px)'
                e.currentTarget.style.boxShadow = '0 4px 15px rgba(39, 174, 96, 0.2)'
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.backgroundColor = '#f8f9fa'
                e.currentTarget.style.borderColor = '#e9ecef'
                e.currentTarget.style.transform = 'translateY(0)'
                e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.1)'
              }}>
                <img 
                  src={appointment.patientId.image} 
                  alt="Patient" 
                  style={{
                    width: '80px',
                    height: '80px',
                    borderRadius: '50%',
                    border: '3px solid #27ae60',
                    marginRight: '20px',
                    objectFit: 'cover'
                  }}
                />
                <div style={{ flex: 1, textAlign: 'left' }}>
                  <h3 style={{ 
                    color: '#2c3e50', 
                    margin: '0 0 10px 0', 
                    fontSize: '20px',
                    fontWeight: 'bold'
                  }}>
                    {appointment.patientId.name}
                  </h3>
                  <p style={{ 
                    color: '#6c757d', 
                    margin: '5px 0', 
                    fontSize: '16px'
                  }}>
                    <strong>Date:</strong> {formatDate(appointment.date)}
                  </p>
                  <p style={{ 
                    color: '#6c757d', 
                    margin: '5px 0', 
                    fontSize: '16px'
                  }}>
                    <strong>Time:</strong> {appointment.startTime} - {appointment.endTime}
                  </p>
                </div>
                <button 
                  onClick={() => handleCancelAppointment(appointment._id)}
                  style={{
                    padding: '12px 24px',
                    backgroundColor: '#e74c3c',
                    color: 'white',
                    border: 'none',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    fontSize: '14px',
                    fontWeight: 'bold',
                    transition: 'all 0.3s ease',
                    boxShadow: '0 2px 8px rgba(231, 76, 60, 0.3)'
                  }}
                  onMouseOver={(e) => {
                    e.target.style.backgroundColor = '#c0392b'
                    e.target.style.transform = 'translateY(-2px)'
                    e.target.style.boxShadow = '0 4px 15px rgba(209, 209, 209, 0.4)'
                  }}
                  onMouseOut={(e) => {
                    e.target.style.backgroundColor = '#e74c3c'
                    e.target.style.transform = 'translateY(0)'
                    e.target.style.boxShadow = '0 2px 8px rgba(231, 76, 60, 0.3)'
                  }}
                >
                  Cancel Appointment
                </button>
              </div>
            ))
          )}
        </div>
      </div>

      {loading && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: 'rgba(0,0,0,0.5)',
          zIndex: 1000
        }}>
          <div style={{
            width: '80px',
            height: '80px',
            border: '2px solid #f3f3f3',
            borderTop: '3px solid #f25a41',
            borderRadius: '50%',
            animation: 'spin 1s infinite linear'
          }}></div>
        </div>
      )}
    </div>
  )
}

export default DoctorDashboard
