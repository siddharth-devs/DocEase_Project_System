import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import './PatientDashboard.css'

const PatientDashboard = () => {
  const [loading, setLoading] = useState(false)
  const [appointments, setAppointments] = useState([])
  const [doctors, setDoctors] = useState([])
  const [showModal, setShowModal] = useState(false)
  const [selectedDoctor, setSelectedDoctor] = useState(null)
  const [appointmentData, setAppointmentData] = useState({
    date: '',
    time: '',
    startTime: '',
    endTime: ''
  })
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const closeSidebar = () => {
    setIsOpen(false);
  };

  const navigate = useNavigate()
  const backendURL = "http://localhost:5000/"

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      alert("Please login")
      navigate('/signin')
      return
    }

    const id = localStorage.getItem('id')
    fetchAppointments(id)
    fetchDoctors()
  }, [navigate])

  const fetchAppointments = async (id) => {
    try {
      const token = localStorage.getItem('token')
      const response = await fetch(`${backendURL}appointments/patapp/${id}`, {
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

  const fetchDoctors = async () => {
    try {
      const response = await fetch(`${backendURL}doctors/all`)
      const data = await response.json()
      setDoctors(data.Doctors)
    } catch (error) {
      console.error('Error fetching doctors:', error)
    }
  }

  const handleCancelAppointment = async (appointmentId) => {
    const confirmDelete = confirm('Are you sure you want to delete this appointment?')
    if (confirmDelete) {
      alert("Request is received, Allow a moment to process")
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
      }
    }
  }

  const handleEditAppointment = (appointment) => {
    setSelectedDoctor(appointment.doctorId._id)
    setAppointmentData({
      date: appointment.date,
      time: `${appointment.startTime}-${appointment.endTime}`,
      startTime: appointment.startTime,
      endTime: appointment.endTime
    })
    setShowModal(true)
  }

  const handleBookAppointment = (doctorId) => {
    setSelectedDoctor(doctorId)
    setAppointmentData({ date: '', time: '', startTime: '', endTime: '' })
    setShowModal(true)
  }

  const handleTimeChange = (timeValue) => {
    const timeMap = {
      "10 AM-11 AM": { start: "10:00:00", end: "11:00:00" },
      "11 AM-12 PM": { start: "11:00:00", end: "12:00:00" },
      "1 PM-2 PM": { start: "13:00:00", end: "14:00:00" },
      "2 PM-3 PM": { start: "14:00:00", end: "15:00:00" },
      "3 PM-4 PM": { start: "15:00:00", end: "16:00:00" },
      "4 PM-5 PM": { start: "16:00:00", end: "17:00:00" },
      "6 PM-7 PM": { start: "18:00:00", end: "19:00:00" },
      "7 PM-8 PM": { start: "19:00:00", end: "20:00:00" }
    }

    const timeData = timeMap[timeValue]
    if (timeData) {
      setAppointmentData(prev => ({
        ...prev,
        time: timeValue,
        startTime: timeData.start,
        endTime: timeData.end
      }))
    }
  }

  const handleSubmitAppointment = async () => {
    if (!appointmentData.date || !appointmentData.time) {
      alert("Please select date and time")
      return
    }

    setLoading(true)
    alert("Request is received, Allow a moment to process")

    const data = {
      doctorId: selectedDoctor,
      date: appointmentData.date,
      startTime: appointmentData.startTime,
      endTime: appointmentData.endTime,
      patientId: localStorage.getItem('id')
    }

    const token = localStorage.getItem("token")

    try {
      const response = await fetch(`${backendURL}appointments/add`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': token
        },
        body: JSON.stringify(data)
      })

      const result = await response.json()
      setLoading(false)
      console.log('Appointment added successfully:', result)
      alert("Appointment added successfully")
      setShowModal(false)
      const id = localStorage.getItem('id')
      fetchAppointments(id)
    } catch (error) {
      setLoading(false)
      console.error('Error adding appointment:', error)
      setShowModal(false)
    }
  }

  const handleLogout = async () => {
    const token = localStorage.getItem('token')

    localStorage.removeItem('token')
    localStorage.removeItem('name')
    localStorage.removeItem('id')

    try {
      const response = await fetch(`${backendURL}patients/logout`, {
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
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#e8f4f8',
        padding: '20px 30px',
        marginBottom: '30px',
        borderRadius: '10px',
        boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
        width: '100%',
        maxWidth: '1400px'
      }}>
        <h1 style={{
          color: '#2c3e50',
          margin: 0,
          fontSize: '28px',
          fontWeight: 'bold', display: 'flex', alignItems: 'center'
        }}>
          <div className="toggle">
            <button className="menu-btn" onClick={toggleSidebar}>
              ☰
            </button>
          </div>
          <div className={`sidebar ${isOpen ? "open" : ""}`}>
            <button className="close-btn" onClick={closeSidebar}>
              ×
            </button>
            <a href="#">Profile</a>
            <a href="#">About</a>
            <a href="#">Services</a>
            <a href="#">Login</a>
            <a href="#">Contact</a>
          </div>
          Patient Dashboard
        </h1>
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
          <h2 style={{
            color: '#2c3e50',
            margin: 0,
            fontSize: '20px',
            fontWeight: 'bold'
          }}>
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
      </div>

      <div style={{
        backgroundColor: '#fff',
        borderRadius: '15px',
        padding: '30px',
        marginBottom: '30px',
        boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
        width: '100%',
        maxWidth: '1400px'
      }}>
        <h2 style={{
          color: '#2c3e50',
          fontSize: '24px',
          marginBottom: '25px',
          textAlign: 'center',
          fontWeight: 'bold'
        }}>
          Upcoming Appointments
        </h2>
        <div>
          {appointments.length === 0 ? (
            <div style={{
              textAlign: 'center',
              padding: '40px',
              color: '#7f8c8d',
              fontSize: '18px'
            }}>
              No Appointments Scheduled
            </div>
          ) : (
            appointments.map(appointment => (
              <div key={appointment._id} style={{
                display: 'flex',
                alignItems: 'center',
                backgroundColor: '#f8f9fa',
                borderRadius: '10px',
                padding: '20px',
                marginBottom: '15px',
                border: '1px solid #e9ecef'
              }}>
                <img
                  src={appointment.doctorId.image}
                  alt="Doctor"
                  style={{
                    width: '80px',
                    height: '80px',
                    borderRadius: '50%',
                    objectFit: 'cover',
                    marginRight: '20px',
                    border: '3px solid #3498db'
                  }}
                />
                <div style={{ flex: 1 }}>
                  <h3 style={{
                    color: '#2c3e50',
                    margin: '0 0 10px 0',
                    fontSize: '20px',
                    fontWeight: 'bold'
                  }}>
                    Dr. {appointment.doctorId.name}
                  </h3>
                  <p style={{
                    color: '#7f8c8d',
                    margin: '5px 0',
                    fontSize: '16px'
                  }}>
                    📅 Date: {formatDate(appointment.date)}
                  </p>
                  <p style={{
                    color: '#7f8c8d',
                    margin: '5px 0',
                    fontSize: '16px'
                  }}>
                    ⏰ Time: {appointment.startTime} - {appointment.endTime}
                  </p>
                </div>
                <div style={{ display: 'flex', gap: '10px' }}>
                  <button
                    onClick={() => handleEditAppointment(appointment)}
                    style={{
                      padding: '8px 16px',
                      backgroundColor: '#3498db',
                      color: 'white',
                      border: 'none',
                      borderRadius: '6px',
                      cursor: 'pointer',
                      fontSize: '14px',
                      fontWeight: 'bold',
                      transition: 'all 0.3s ease'
                    }}
                    onMouseOver={(e) => e.target.style.backgroundColor = '#2980b9'}
                    onMouseOut={(e) => e.target.style.backgroundColor = '#3498db'}
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleCancelAppointment(appointment._id)}
                    style={{
                      padding: '8px 16px',
                      backgroundColor: '#e74c3c',
                      color: 'white',
                      border: 'none',
                      borderRadius: '6px',
                      cursor: 'pointer',
                      fontSize: '14px',
                      fontWeight: 'bold',
                      transition: 'all 0.3s ease'
                    }}
                    onMouseOver={(e) => e.target.style.backgroundColor = '#c0392b'}
                    onMouseOut={(e) => e.target.style.backgroundColor = '#e74c3c'}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      <div style={{
        backgroundColor: '#fff',
        borderRadius: '15px',
        padding: '30px',
        marginBottom: '30px',
        boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
        width: '100%',
        maxWidth: '1400px'
      }}>
        <h1 style={{
          color: '#2c3e50',
          fontSize: '24px',
          marginBottom: '25px',
          textAlign: 'center',
          fontWeight: 'bold'
        }}>
          Book any doctor for your Appointment
        </h1>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '20px',
          width: '100%'
        }}>
          {doctors.map(doctor => (
            <div key={doctor._id} style={{
              backgroundColor: '#f8f9fa',
              borderRadius: '15px',
              padding: '25px',
              textAlign: 'center',
              border: '2px solid #e9ecef',
              transition: 'all 0.3s ease',
              cursor: 'pointer'
            }}
              onMouseOver={(e) => {
                e.currentTarget.style.transform = 'translateY(-5px)'
                e.currentTarget.style.borderColor = '#3498db'
                e.currentTarget.style.boxShadow = '0 8px 25px rgba(52, 152, 219, 0.2)'
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.transform = 'translateY(0)'
                e.currentTarget.style.borderColor = '#e9ecef'
                e.currentTarget.style.boxShadow = 'none'
              }}>
              <img
                src={doctor.image}
                alt={`Doctor ${doctor.id}`}
                style={{
                  width: '120px',
                  height: '120px',
                  borderRadius: '50%',
                  objectFit: 'cover',
                  marginBottom: '20px',
                  border: '4px solid #3498db'
                }}
              />
              <h2 style={{
                color: '#2c3e50',
                margin: '0 0 10px 0',
                fontSize: '22px',
                fontWeight: 'bold'
              }}>
                Dr. {doctor.name}
              </h2>
              <p style={{
                color: '#7f8c8d',
                margin: '5px 0',
                fontSize: '16px'
              }}>
                📧 {doctor.email}
              </p>
              <p style={{
                color: '#2c3e50',
                margin: '10px 0 20px 0',
                fontSize: '16px',
                fontWeight: 'bold'
              }}>
                🩺 Specialization: {doctor.specialization}
              </p>
              <button
                onClick={() => handleBookAppointment(doctor._id)}
                style={{
                  width: '100%',
                  padding: '12px 20px',
                  backgroundColor: '#27ae60',
                  color: 'white',
                  border: 'none',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  fontSize: '16px',
                  fontWeight: 'bold',
                  transition: 'all 0.3s ease',
                  boxShadow: '0 4px 15px rgba(39, 174, 96, 0.3)'
                }}
                onMouseOver={(e) => {
                  e.target.style.backgroundColor = '#229954'
                  e.target.style.transform = 'translateY(-2px)'
                  e.target.style.boxShadow = '0 6px 20px rgba(39, 174, 96, 0.4)'
                }}
                onMouseOut={(e) => {
                  e.target.style.backgroundColor = '#27ae60'
                  e.target.style.transform = 'translateY(0)'
                  e.target.style.boxShadow = '0 4px 15px rgba(39, 174, 96, 0.3)'
                }}
              >
                Book Appointment
              </button>
            </div>
          ))}
        </div>
      </div>

      {showModal && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0,0,0,0.5)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          zIndex: 1000
        }}>
          <div style={{
            backgroundColor: '#fff',
            borderRadius: '15px',
            padding: '30px',
            width: '90%',
            maxWidth: '500px',
            boxShadow: '0 10px 30px rgba(0,0,0,0.3)'
          }}>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '25px'
            }}>
              <h2 style={{
                color: '#2c3e50',
                margin: 0,
                fontSize: '24px',
                fontWeight: 'bold'
              }}>
                Book Appointment
              </h2>
              <button
                onClick={() => setShowModal(false)}
                style={{
                  background: 'none',
                  border: 'none',
                  fontSize: '24px',
                  cursor: 'pointer',
                  color: '#7f8c8d'
                }}
              >
                &times;
              </button>
            </div>
            <div>
              <label style={{
                display: 'block',
                marginBottom: '8px',
                color: '#2c3e50',
                fontWeight: 'bold',
                fontSize: '16px'
              }}>
                Date:
              </label>
              <input
                type="date"
                id="my-date-picker"
                value={appointmentData.date}
                onChange={(e) => setAppointmentData(prev => ({ ...prev, date: e.target.value }))}
                min={new Date().toISOString().split("T")[0]}
                style={{
                  width: '100%',
                  padding: '12px',
                  marginBottom: '20px',
                  border: '2px solid #ecf0f1',
                  borderRadius: '8px',
                  fontSize: '16px',
                  boxSizing: 'border-box'
                }}
              />

              <label style={{
                display: 'block',
                marginBottom: '15px',
                color: '#2c3e50',
                fontWeight: 'bold',
                fontSize: '16px'
              }}>
                Select Time Interval:
              </label>
              <div style={{ marginBottom: '25px' }}>
                {[
                  "10 AM-11 AM", "11 AM-12 PM", "1 PM-2 PM", "2 PM-3 PM",
                  "3 PM-4 PM", "4 PM-5 PM", "6 PM-7 PM", "7 PM-8 PM"
                ].map((time, index) => (
                  <div key={index} style={{
                    display: 'flex',
                    alignItems: 'center',
                    marginBottom: '10px',
                    padding: '10px',
                    backgroundColor: '#f8f9fa',
                    borderRadius: '8px',
                    border: '1px solid #e9ecef'
                  }}>
                    <input
                      type="radio"
                      name="time"
                      value={time}
                      id={`time-${index + 1}`}
                      checked={appointmentData.time === time}
                      onChange={(e) => handleTimeChange(e.target.value)}
                      style={{ marginRight: '10px' }}
                    />
                    <label
                      htmlFor={`time-${index + 1}`}
                      style={{
                        color: '#2c3e50',
                        fontSize: '16px',
                        cursor: 'pointer',
                        margin: 0
                      }}
                    >
                      {time}
                    </label>
                  </div>
                ))}
              </div>
              <button
                onClick={handleSubmitAppointment}
                style={{
                  width: '100%',
                  padding: '15px',
                  backgroundColor: '#27ae60',
                  color: 'white',
                  border: 'none',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  fontSize: '16px',
                  fontWeight: 'bold',
                  transition: 'all 0.3s ease',
                  boxShadow: '0 4px 15px rgba(39, 174, 96, 0.3)'
                }}
                onMouseOver={(e) => {
                  e.target.style.backgroundColor = '#229954'
                  e.target.style.transform = 'translateY(-2px)'
                }}
                onMouseOut={(e) => {
                  e.target.style.backgroundColor = '#27ae60'
                  e.target.style.transform = 'translateY(0)'
                }}
              >
                Confirm Appointment
              </button>
            </div>
          </div>
        </div>
      )}

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
            borderTop: '3px solid #3498db',
            borderRadius: '50%',
            animation: 'spin 1s infinite linear'
          }}></div>
        </div>
      )}
    </div>
  )
}

export default PatientDashboard
