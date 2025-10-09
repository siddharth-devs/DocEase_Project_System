import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './SignUp.css'

const SignUp = () => {
  const [loading, setLoading] = useState(false)
  const [showDoctorForm, setShowDoctorForm] = useState(false)
  const [showPatientForm, setShowPatientForm] = useState(false)
  const navigate = useNavigate()
  const backendURL = "http://localhost:5000/"

  const handlePatientSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    
    const formData = new FormData(e.target)
    const name = formData.get('name')
    const email = formData.get('email')
    const password = formData.get('password')
    const image = formData.get('image')

    const patientData = { name, email, password, image }

    try {
      const response = await fetch(`${backendURL}patients/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(patientData)
      })

      const data = await response.json()
      setLoading(false)
      alert(data.message)
      navigate('/signin')
    } catch (error) {
      setLoading(false)
      console.error(error)
    }
  }

  const handleDoctorSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    
    const formData = new FormData(e.target)
    const name = formData.get('name')
    const email = formData.get('email')
    const password = formData.get('password')
    const specialisation = formData.get('specialisation')
    const image = formData.get('image')

    const doctorData = { name, email, password, specialisation, image }

    try {
      const response = await fetch(`${backendURL}doctors/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(doctorData)
      })

      const data = await response.json()
      setLoading(false)
      alert(data.message)
      navigate('/signin')
    } catch (error) {
      setLoading(false)
      console.error(error)
    }
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
        <div id="buttons" style={{ display: 'flex', gap: '15px' }}>
          <button 
            id="home" 
            onClick={() => navigate('/')}
            style={{
              padding: '12px 20px',
              backgroundColor: '#3498db',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              fontSize: '14px',
              fontWeight: 'bold',
              transition: 'all 0.3s ease',
              boxShadow: '0 2px 5px rgba(0,0,0,0.1)'
            }}
            onMouseOver={(e) => e.target.style.backgroundColor = '#2980b9'}
            onMouseOut={(e) => e.target.style.backgroundColor = '#3498db'}
          >
            Home
          </button>
          <button 
            id="signin" 
            onClick={() => navigate('/signin')}
            style={{
              padding: '12px 20px',
              backgroundColor: '#27ae60',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              fontSize: '14px',
              fontWeight: 'bold',
              transition: 'all 0.3s ease',
              boxShadow: '0 2px 5px rgba(0,0,0,0.1)'
            }}
            onMouseOver={(e) => e.target.style.backgroundColor = '#229954'}
            onMouseOut={(e) => e.target.style.backgroundColor = '#27ae60'}
          >
            Already have an account?
          </button>
        </div>
      </nav>

      <h1 style={{ 
        color: '#2c3e50', 
        fontSize: '32px', 
        marginBottom: '20px',
        fontWeight: 'bold',
        textShadow: '0 2px 4px rgba(0,0,0,0.1)'
      }}>
        Welcome to DocEase
      </h1>

      <div style={{ 
        marginBottom: '40px',
        display: 'flex',
        alignItems: 'center',
        gap: '20px'
      }}>
        <h1 style={{ 
          color: '#2c3e50', 
          fontSize: '24px', 
          margin: 0,
          fontWeight: 'bold'
        }}>
          Are you
        </h1>
        <button 
          onClick={() => { setShowDoctorForm(true); setShowPatientForm(false) }}
          style={{
            padding: '15px 30px',
            backgroundColor: '#e74c3c',
            color: 'white',
            border: 'none',
            borderRadius: '10px',
            cursor: 'pointer',
            fontSize: '18px',
            fontWeight: 'bold',
            transition: 'all 0.3s ease',
            boxShadow: '0 4px 15px rgba(231, 76, 60, 0.3)'
          }}
          onMouseOver={(e) => {
            e.target.style.backgroundColor = '#c0392b'
            e.target.style.transform = 'translateY(-3px)'
            e.target.style.boxShadow = '0 6px 20px rgba(231, 76, 60, 0.4)'
          }}
          onMouseOut={(e) => {
            e.target.style.backgroundColor = '#e74c3c'
            e.target.style.transform = 'translateY(0)'
            e.target.style.boxShadow = '0 4px 15px rgba(231, 76, 60, 0.3)'
          }}
        >
          Doctor
        </button>
        <button 
          onClick={() => { setShowPatientForm(true); setShowDoctorForm(false) }}
          style={{
            padding: '15px 30px',
            backgroundColor: '#3498db',
            color: 'white',
            border: 'none',
            borderRadius: '10px',
            cursor: 'pointer',
            fontSize: '18px',
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
          Patient
        </button>
      </div>

        <div style={{ 
          display: 'flex', 
          justifyContent: 'center',
          width: '100%',
          maxWidth: '1400px'
        }}>
        {showDoctorForm && (
          <div className='create-acc' style={{
            width: '100%',
            backgroundColor: '#fff',
            borderRadius: '15px',
            padding: '30px',
            border: '3px solid #e74c3c',
            boxShadow: '0 8px 25px rgba(231, 76, 60, 0.2)',
            transition: 'transform 0.3s ease'
          }}>
            <h2 style={{ 
              color: '#2c3e50', 
              marginBottom: '25px',
              fontSize: '24px',
              fontWeight: 'bold',
              textAlign: 'center'
            }}>Doctor Signup</h2>
            <form onSubmit={handleDoctorSubmit}>
              <label style={{ 
                display: 'block', 
                textAlign: 'left', 
                marginBottom: '8px', 
                color: '#2c3e50', 
                fontWeight: 'bold',
                fontSize: '14px'
              }}>
                Name
              </label>
              <input placeholder='Enter your Full name'
                type="text" 
                id="doctorName" 
                name="name" 
                required 
                style={{
                  width: '100%',
                  padding: '12px',
                  marginBottom: '20px',
                  border: '2px solid #ecf0f1',
                  borderRadius: '8px',
                  fontSize: '16px',
                  transition: 'border-color 0.3s ease',
                  boxSizing: 'border-box'
                }}
                onFocus={(e) => e.target.style.borderColor = '#e74c3c'}
                onBlur={(e) => e.target.style.borderColor = '#ecf0f1'}
              />
              <label style={{ 
                display: 'block', 
                textAlign: 'left', 
                marginBottom: '8px', 
                color: '#2c3e50', 
                fontWeight: 'bold',
                fontSize: '14px'
              }}>
                Email
              </label>
              <input placeholder='Enter you Email ID'
                type="email" 
                id="doctorEmail" 
                name="email" 
                required 
                style={{
                  width: '100%',
                  padding: '12px',
                  marginBottom: '20px',
                  border: '2px solid #ecf0f1',
                  borderRadius: '8px',
                  fontSize: '16px',
                  transition: 'border-color 0.3s ease',
                  boxSizing: 'border-box'
                }}
                onFocus={(e) => e.target.style.borderColor = '#e74c3c'}
                onBlur={(e) => e.target.style.borderColor = '#ecf0f1'}
              />
              <label style={{ 
                display: 'block', 
                textAlign: 'left', 
                marginBottom: '8px', 
                color: '#2c3e50', 
                fontWeight: 'bold',
                fontSize: '14px'
              }}>
                Password
              </label>
              <input placeholder='Create your Password'
                type="password" 
                id="doctorPassword" 
                name="password" 
                required 
                style={{
                  width: '100%',
                  padding: '12px',
                  marginBottom: '20px',
                  border: '2px solid #ecf0f1',
                  borderRadius: '8px',
                  fontSize: '16px',
                  transition: 'border-color 0.3s ease',
                  boxSizing: 'border-box'
                }}
                onFocus={(e) => e.target.style.borderColor = '#e74c3c'}
                onBlur={(e) => e.target.style.borderColor = '#ecf0f1'}
              />
              <label style={{ 
                display: 'block', 
                textAlign: 'left', 
                marginBottom: '8px', 
                color: '#2c3e50', 
                fontWeight: 'bold',
                fontSize: '14px'
              }}>
                Specialisation
              </label>
              <select 
                id="doctorSpecialisation" 
                name="specialisation" 
                required 
                style={{
                  width: '100%',
                  padding: '12px',
                  marginBottom: '20px',
                  border: '2px solid #ecf0f1',
                  borderRadius: '8px',
                  fontSize: '16px',
                  transition: 'border-color 0.3s ease',
                  boxSizing: 'border-box',
                  backgroundColor: 'transparent',
                  color:'black'
                }}
                onFocus={(e) => e.target.style.borderColor = '#e74c3c'}
                onBlur={(e) => e.target.style.borderColor = '#ecf0f1'}
              >
                <option value="heart">Heart</option>
                <option value="kidney">Kidney</option>
                <option value="Eye">Eye Specialist</option>
                <option value="general">General</option>
              </select>
              <label style={{ 
                display: 'block', 
                textAlign: 'left', 
                marginBottom: '8px', 
                color: '#2c3e50', 
                fontWeight: 'bold',
                fontSize: '14px'
              }}>
                Enter Your Image URL
              </label>
              <input 
                type="text" 
                id="doctorImage" 
                name="image" 
                required 
                style={{
                  width: '100%',
                  padding: '12px',
                  marginBottom: '25px',
                  border: '2px solid #ecf0f1',
                  borderRadius: '8px',
                  fontSize: '16px',
                  transition: 'border-color 0.3s ease',
                  boxSizing: 'border-box'
                }}
                onFocus={(e) => e.target.style.borderColor = '#e74c3c'}
                onBlur={(e) => e.target.style.borderColor = '#ecf0f1'}
              />
              <button 
                type="submit"
                style={{
                  width: '100%',
                  fontSize: '16px',
                  padding: '15px',
                  backgroundColor: '#e74c3c',
                  color: '#fff',
                  border: 'none',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  fontWeight: 'bold',
                  transition: 'all 0.3s ease',
                  boxShadow: '0 4px 15px rgba(231, 76, 60, 0.3)'
                }}
                onMouseOver={(e) => {
                  e.target.style.backgroundColor = '#c0392b'
                  e.target.style.transform = 'translateY(-2px)'
                  e.target.style.boxShadow = '0 6px 20px rgba(231, 76, 60, 0.4)'
                }}
                onMouseOut={(e) => {
                  e.target.style.backgroundColor = '#e74c3c'
                  e.target.style.transform = 'translateY(0)'
                  e.target.style.boxShadow = '0 4px 15px rgba(231, 76, 60, 0.3)'
                }}
              >
                Register as Doctor
              </button>
            </form>
          </div>
        )}

        {showPatientForm && (
          <div style={{
            width: '100%',
            backgroundColor: '#fff',
            borderRadius: '15px',
            padding: '30px',
            border: '3px solid #3498db',
            boxShadow: '0 8px 25px rgba(52, 152, 219, 0.2)',
            transition: 'transform 0.3s ease'
          }}>
            <h2 style={{ 
              color: '#2c3e50', 
              marginBottom: '25px',
              fontSize: '24px',
              fontWeight: 'bold',
              textAlign: 'center'
            }}>Patient Signup</h2>
            <form onSubmit={handlePatientSubmit}>
              <label style={{ 
                display: 'block', 
                textAlign: 'left', 
                marginBottom: '8px', 
                color: '#2c3e50', 
                fontWeight: 'bold',
                fontSize: '14px'
              }}>
                Name
              </label>
              <input placeholder='Enter your name'
                type="text" 
                id="patientName" 
                name="name" 
                required 
                style={{
                  width: '100%',
                  padding: '12px',
                  marginBottom: '20px',
                  border: '2px solid #ecf0f1',
                  borderRadius: '8px',
                  fontSize: '16px',
                  transition: 'border-color 0.3s ease',
                  boxSizing: 'border-box'
                }}
                onFocus={(e) => e.target.style.borderColor = '#3498db'}
                onBlur={(e) => e.target.style.borderColor = '#ecf0f1'}
              />
              <label style={{ 
                display: 'block', 
                textAlign: 'left', 
                marginBottom: '8px', 
                color: '#2c3e50', 
                fontWeight: 'bold',
                fontSize: '14px'
              }}>
                Email
              </label>
              <input placeholder='Enter your email Id'
                type="email" 
                id="patientEmail" 
                name="email" 
                required 
                style={{
                  width: '100%',
                  padding: '12px',
                  marginBottom: '20px',
                  border: '2px solid #ecf0f1',
                  borderRadius: '8px',
                  fontSize: '16px',
                  transition: 'border-color 0.3s ease',
                  boxSizing: 'border-box'
                }}
                onFocus={(e) => e.target.style.borderColor = '#3498db'}
                onBlur={(e) => e.target.style.borderColor = '#ecf0f1'}
              />
              <label style={{ 
                display: 'block', 
                textAlign: 'left', 
                marginBottom: '8px', 
                color: '#2c3e50', 
                fontWeight: 'bold',
                fontSize: '14px'
              }}>
                Password
              </label>
              <input placeholder='Create a Password'
                type="password" 
                id="patientPassword" 
                name="password" 
                required 
                style={{
                  width: '100%',
                  padding: '12px',
                  marginBottom: '20px',
                  border: '2px solid #ecf0f1',
                  borderRadius: '8px',
                  fontSize: '16px',
                  transition: 'border-color 0.3s ease',
                  boxSizing: 'border-box'
                }}
                onFocus={(e) => e.target.style.borderColor = '#3498db'}
                onBlur={(e) => e.target.style.borderColor = '#ecf0f1'}
              />
              <label style={{ 
                display: 'block', 
                textAlign: 'left', 
                marginBottom: '8px', 
                color: '#2c3e50', 
                fontWeight: 'bold',
                fontSize: '14px'
              }}>
                Enter Your Image URL
              </label>
              <input 
                type="text" 
                id="patientImage" 
                name="image" 
                required 
                style={{
                  width: '100%',
                  padding: '12px',
                  marginBottom: '25px',
                  border: '2px solid #ecf0f1',
                  borderRadius: '8px',
                  fontSize: '16px',
                  transition: 'border-color 0.3s ease',
                  boxSizing: 'border-box'
                }}
                onFocus={(e) => e.target.style.borderColor = '#3498db'}
                onBlur={(e) => e.target.style.borderColor = '#ecf0f1'}
              />
              <button 
                type="submit"
                style={{
                  width: '100%',
                  fontSize: '16px',
                  padding: '15px',
                  backgroundColor: '#3498db',
                  color: '#fff',
                  border: 'none',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  fontWeight: 'bold',
                  transition: 'all 0.3s ease',
                  boxShadow: '0 4px 15px rgba(52, 152, 219, 0.3)'
                }}
                onMouseOver={(e) => {
                  e.target.style.backgroundColor = '#2980b9'
                  e.target.style.transform = 'translateY(-2px)'
                  e.target.style.boxShadow = '0 6px 20px rgba(52, 152, 219, 0.4)'
                }}
                onMouseOut={(e) => {
                  e.target.style.backgroundColor = '#3498db'
                  e.target.style.transform = 'translateY(0)'
                  e.target.style.boxShadow = '0 4px 15px rgba(52, 152, 219, 0.3)'
                }}
              >
                Register as Patient
              </button>
            </form>
          </div>
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
            borderTop: '3px solid #3498db',
            borderRadius: '50%',
            animation: 'spin 1s infinite linear'
          }}></div>
        </div>
      )}
    </div>
  )
}

export default SignUp
