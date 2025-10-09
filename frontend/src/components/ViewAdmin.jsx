import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import './ViewAdmin.css'

const ViewAdmin = () => {
  const [loading, setLoading] = useState(false)
  const [viewType, setViewType] = useState('')
  const [doctors, setDoctors] = useState([])
  const [patients, setPatients] = useState([])
  const [appointments, setAppointments] = useState([])
  const navigate = useNavigate()
  const backendURL = "http://localhost:5000/"

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      alert("Please login")
      navigate('/admin')
      return
    }
  }, [navigate])

  const fetchDoctors = async () => {
    try {
      const response = await fetch(`${backendURL}doctors/all`)
      const data = await response.json()
      setDoctors(data.Doctors)
      setViewType('doctors')
    } catch (error) {
      console.error('Error fetching doctors:', error)
    }
  }

  const fetchPatients = async () => {
    try {
      const response = await fetch(`${backendURL}patients/all`)
      const data = await response.json()
      setPatients(data.Patients)
      setViewType('patients')
    } catch (error) {
      console.error('Error fetching patients:', error)
    }
  }

  const fetchAppointments = async () => {
    try {
      const token = localStorage.getItem('token')
      const response = await fetch(`${backendURL}appointments`, {
        method: "GET",
        headers: {
          Authorization: localStorage.getItem("token"),
        }
      })
      const data = await response.json()
      setAppointments(data.Appointments)
      setViewType('appointments')
    } catch (error) {
      console.error('Error fetching appointments:', error)
    }
  }

  const handleToggleVideoCall = async (doctorId, currentStatus) => {
    const obj = {
      videoCall: currentStatus === "YES" ? "NO" : "YES",
      role: "admin"
    }

    try {
      const response = await fetch(`${backendURL}doctors/update/${doctorId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(obj)
      })

      if (response.ok) {
        alert("Video Call Availability changed")
        fetchDoctors()
      } else {
        alert("Error")
      }
    } catch (error) {
      console.log('An error', error)
    }
  }

  const handleRemoveDoctor = async (doctorId) => {
    const requestOptions = {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ role: 'admin' })
    }

    try {
      const response = await fetch(`${backendURL}doctors/delete/${doctorId}`, requestOptions)
      if (response.ok) {
        alert("Doctor removed")
        fetchDoctors()
      } else {
        console.error('Error deleting doctor:', response.statusText)
      }
    } catch (error) {
      console.error('Error:', error)
    }
  }

  const handleRemovePatient = async (patientId) => {
    const requestOptions = {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ role: 'admin' })
    }

    try {
      const response = await fetch(`${backendURL}patients/delete/${patientId}`, requestOptions)
      if (response.ok) {
        alert("Patient removed")
        fetchPatients()
      } else {
        console.error('Error deleting patient')
      }
    } catch (error) {
      console.error('Error:', error)
    }
  }

  const handleCancelAppointment = async (appointmentId) => {
    const confirmDelete = confirm('Are you sure you want to delete this appointment?')
    if (confirmDelete) {
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
          fetchAppointments()
        } else {
          console.error('Failed to delete appointment')
        }
      } catch (error) {
        console.error('Error occurred while deleting appointment:', error)
      }
    }
  }

  const handleLogout = async () => {
    const token = localStorage.getItem('token')
    
    localStorage.removeItem('token')
    localStorage.removeItem('name')
    localStorage.removeItem('id')

    try {
      const response = await fetch(`${backendURL}admin/logout`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': token
        }
      })
      
      if (response.ok) {
        navigate('/admin')
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
          <h1 style={{ color: '#e74c3c', margin: 0, fontSize: '24px', fontWeight: 'bold' }}>Admin Dashboard</h1>
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
        display: 'flex', 
        justifyContent: 'center',
        gap: '20px',
        marginBottom: '30px',
        width: '100%',
        maxWidth: '1400px'
      }}>
        <button 
          onClick={fetchDoctors}
          style={{
            padding: '15px 30px',
            backgroundColor: '#3498db',
            color: 'white',
            border: 'none',
            borderRadius: '10px',
            cursor: 'pointer',
            fontSize: '16px',
            fontWeight: 'bold',
            transition: 'all 0.3s ease',
            boxShadow: '0 4px 15px rgba(52, 152, 219, 0.3)'
          }}
          onMouseOver={(e) => {
            e.target.style.backgroundColor = '#2980b9'
            e.target.style.transform = 'translateY(-3px)'
            e.target.style.boxShadow = '0 6px 20px rgba(52, 152, 219, 0.4)'
          }}
          onMouseOut={(e) => {
            e.target.style.backgroundColor = '#3498db'
            e.target.style.transform = 'translateY(0)'
            e.target.style.boxShadow = '0 4px 15px rgba(52, 152, 219, 0.3)'
          }}
        >
          View all Doctors
        </button>
        <button 
          onClick={fetchPatients}
          style={{
            padding: '15px 30px',
            backgroundColor: '#27ae60',
            color: 'white',
            border: 'none',
            borderRadius: '10px',
            cursor: 'pointer',
            fontSize: '16px',
            fontWeight: 'bold',
            transition: 'all 0.3s ease',
            boxShadow: '0 4px 15px rgba(39, 174, 96, 0.3)'
          }}
          onMouseOver={(e) => {
            e.target.style.backgroundColor = '#229954'
            e.target.style.transform = 'translateY(-3px)'
            e.target.style.boxShadow = '0 6px 20px rgba(39, 174, 96, 0.4)'
          }}
          onMouseOut={(e) => {
            e.target.style.backgroundColor = '#27ae60'
            e.target.style.transform = 'translateY(0)'
            e.target.style.boxShadow = '0 4px 15px rgba(39, 174, 96, 0.3)'
          }}
        >
          View all Patients
        </button>
        <button 
          onClick={fetchAppointments}
          style={{
            padding: '15px 30px',
            backgroundColor: '#9b59b6',
            color: 'white',
            border: 'none',
            borderRadius: '10px',
            cursor: 'pointer',
            fontSize: '16px',
            fontWeight: 'bold',
            transition: 'all 0.3s ease',
            boxShadow: '0 4px 15px rgba(155, 89, 182, 0.3)'
          }}
          onMouseOver={(e) => {
            e.target.style.backgroundColor = '#8e44ad'
            e.target.style.transform = 'translateY(-3px)'
            e.target.style.boxShadow = '0 6px 20px rgba(155, 89, 182, 0.4)'
          }}
          onMouseOut={(e) => {
            e.target.style.backgroundColor = '#9b59b6'
            e.target.style.transform = 'translateY(0)'
            e.target.style.boxShadow = '0 4px 15px rgba(155, 89, 182, 0.3)'
          }}
        >
          View all Appointments
        </button>
      </div>

      <div style={{ 
        width: '100%',
        maxWidth: '1400px',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
        gap: '20px'
      }}>
        {viewType === 'doctors' && doctors.map(doctor => (
          <div key={doctor._id} style={{
            backgroundColor: '#fff',
            borderRadius: '15px',
            padding: '25px',
            border: '3px solid #3498db',
            boxShadow: '0 8px 25px rgba(52, 152, 219, 0.2)',
            transition: 'transform 0.3s ease',
            textAlign: 'center'
          }}
          onMouseOver={(e) => e.currentTarget.style.transform = 'translateY(-5px)'}
          onMouseOut={(e) => e.currentTarget.style.transform = 'translateY(0)'}>
            <img 
              src={doctor.image} 
              alt={`Doctor ${doctor.id}`} 
              style={{
                width: '100px',
                height: '100px',
                borderRadius: '50%',
                border: '3px solid #3498db',
                marginBottom: '15px',
                objectFit: 'cover'
              }}
            />
            <h2 style={{ 
              color: '#2c3e50', 
              margin: '0 0 10px 0', 
              fontSize: '22px',
              fontWeight: 'bold'
            }}>
              {doctor.name}
            </h2>
            <p style={{ 
              color: '#6c757d', 
              margin: '5px 0', 
              fontSize: '16px'
            }}>
              {doctor.email}
            </p>
            <p style={{ 
              color: '#6c757d', 
              margin: '5px 0', 
              fontSize: '16px'
            }}>
              <strong>Specialization:</strong> {doctor.specialization}
            </p>
            <p style={{ 
              color: '#6c757d', 
              margin: '10px 0', 
              fontSize: '16px'
            }}>
              <strong>Video Call:</strong> {doctor.videoCall}
            </p>
            <div style={{ display: 'flex', gap: '10px', justifyContent: 'center', marginTop: '20px' }}>
              <button 
                onClick={() => handleToggleVideoCall(doctor._id, doctor.videoCall)}
                style={{
                  padding: '10px 20px',
                  backgroundColor: '#f39c12',
                  color: 'white',
                  border: 'none',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  fontSize: '14px',
                  fontWeight: 'bold',
                  transition: 'all 0.3s ease',
                  boxShadow: '0 2px 8px rgba(243, 156, 18, 0.3)'
                }}
                onMouseOver={(e) => {
                  e.target.style.backgroundColor = '#e67e22'
                  e.target.style.transform = 'translateY(-2px)'
                }}
                onMouseOut={(e) => {
                  e.target.style.backgroundColor = '#f39c12'
                  e.target.style.transform = 'translateY(0)'
                }}
              >
                Change Availability
              </button>
              <button 
                onClick={() => handleRemoveDoctor(doctor._id)}
                style={{
                  padding: '10px 20px',
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
                }}
                onMouseOut={(e) => {
                  e.target.style.backgroundColor = '#e74c3c'
                  e.target.style.transform = 'translateY(0)'
                }}
              >
                Remove
              </button>
            </div>
          </div>
        ))}

        {viewType === 'patients' && patients.map(patient => (
          <div key={patient._id} style={{
            backgroundColor: '#fff',
            borderRadius: '15px',
            padding: '25px',
            border: '3px solid #27ae60',
            boxShadow: '0 8px 25px rgba(39, 174, 96, 0.2)',
            transition: 'transform 0.3s ease',
            textAlign: 'center'
          }}
          onMouseOver={(e) => e.currentTarget.style.transform = 'translateY(-5px)'}
          onMouseOut={(e) => e.currentTarget.style.transform = 'translateY(0)'}>
            <img 
              src={patient.image} 
              alt={`Patient ${patient.id}`} 
              style={{
                width: '100px',
                height: '100px',
                borderRadius: '50%',
                border: '3px solid #27ae60',
                marginBottom: '15px',
                objectFit: 'cover'
              }}
            />
            <h2 style={{ 
              color: '#2c3e50', 
              margin: '0 0 10px 0', 
              fontSize: '22px',
              fontWeight: 'bold'
            }}>
              {patient.name}
            </h2>
            <p style={{ 
              color: '#6c757d', 
              margin: '5px 0', 
              fontSize: '16px'
            }}>
              {patient.email}
            </p>
            <div style={{ marginTop: '20px' }}>
              <button 
                onClick={() => handleRemovePatient(patient._id)}
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
                }}
                onMouseOut={(e) => {
                  e.target.style.backgroundColor = '#e74c3c'
                  e.target.style.transform = 'translateY(0)'
                }}
              >
                Remove Patient
              </button>
            </div>
          </div>
        ))}

        {viewType === 'appointments' && (
          appointments.length === 0 ? (
            <div style={{
              gridColumn: '1 / -1',
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
                backgroundColor: '#fff',
                borderRadius: '15px',
                padding: '25px',
                border: '3px solid #9b59b6',
                boxShadow: '0 8px 25px rgba(155, 89, 182, 0.2)',
                transition: 'transform 0.3s ease',
                textAlign: 'center'
              }}
              onMouseOver={(e) => e.currentTarget.style.transform = 'translateY(-5px)'}
              onMouseOut={(e) => e.currentTarget.style.transform = 'translateY(0)'}>
                <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', marginBottom: '20px' }}>
                  <div style={{ textAlign: 'center' }}>
                    <img 
                      src={appointment.doctorId.image} 
                      alt="Doctor" 
                      style={{
                        width: '80px',
                        height: '80px',
                        borderRadius: '50%',
                        border: '3px solid #3498db',
                        objectFit: 'cover'
                      }}
                    />
                    <p style={{ margin: '10px 0 0 0', fontSize: '14px', fontWeight: 'bold', color: '#2c3e50' }}>
                      Dr. {appointment.doctorId.name}
                    </p>
                  </div>
                  <div style={{ textAlign: 'center' }}>
                    <img 
                      src={appointment.patientId.image} 
                      alt="Patient" 
                      style={{
                        width: '80px',
                        height: '80px',
                        borderRadius: '50%',
                        border: '3px solid #27ae60',
                        objectFit: 'cover'
                      }}
                    />
                    <p style={{ margin: '10px 0 0 0', fontSize: '14px', fontWeight: 'bold', color: '#2c3e50' }}>
                      {appointment.patientId.name}
                    </p>
                  </div>
                </div>
                <div style={{ marginBottom: '20px' }}>
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
                  }}
                  onMouseOut={(e) => {
                    e.target.style.backgroundColor = '#e74c3c'
                    e.target.style.transform = 'translateY(0)'
                  }}
                >
                  Cancel Appointment
                </button>
              </div>
            ))
          )
        )}
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

export default ViewAdmin
