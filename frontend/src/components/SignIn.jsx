import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './SignIn.css'

const SignIn = () => {
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const backendURL = "http://localhost:5000/"

  const handlePatientSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    const formData = new FormData(e.target)
    const email = formData.get('email')
    const password = formData.get('password')

    if (!email || !password) {
      alert("Enter all the fields")
      setLoading(false)
      return
    }

    const obj = { email, password }

    try {
      const response = await fetch(`${backendURL}patients/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(obj)
      })

      const res = await response.json()
      setLoading(false)

      if (res.token) {
        localStorage.setItem("token", res.token)
        localStorage.setItem("name", res.name)
        localStorage.setItem("id", res.id)
        alert(res.message)
        navigate('/patient-dashboard')
      } else {
        alert("Invalid Credentials")
      }
    } catch (error) {
      setLoading(false)
      alert("Invalid Credentials")
    }
  }

  const handleDoctorSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    const formData = new FormData(e.target)
    const email = formData.get('email')
    const password = formData.get('password')

    if (!email || !password) {
      alert("Enter all the fields")
      setLoading(false)
      return
    }

    const obj = { email, password }

    try {
      const response = await fetch(`${backendURL}doctors/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(obj)
      })

      const res = await response.json()
      setLoading(false)

      if (res.token) {
        localStorage.setItem("token", res.token)
        localStorage.setItem("name", res.name)
        localStorage.setItem("id", res.id)
        alert(res.message)
        navigate('/doctor-dashboard')
      } else {
        alert("Invalid Credentials")
      }
    } catch (error) {
      setLoading(false)
      alert("Invalid Credentials")
    }
  }

  return (
    <div style={{

      textAlign: 'center',
      fontFamily: 'Verdana, Geneva, sans-serif',
      // backgroundColor: '#f4f4f4', 
      margin: 0,
      minHeight: '100vh',

      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      width: '100vw',
      boxSizing: 'border-box'
    }}>

      <nav style={{
        display: 'flex',
        justifyContent: 'space-between',
        backgroundColor: 'lightblue',
        padding: '15px 30px',
        marginBottom: '30px',
        borderRadius: '10px',
        boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
        width: '100%',
        maxWidth: '1400px',
        position: 'sticky',
        top: 0,
        zIndex: 1000
      }}>
        <div id="index">
          <img src="https://media.istockphoto.com/id/863958328/vector/stethoscope-icon.jpg?s=612x612&w=0&k=20&c=to7jGDQ9xktMUmA1CjHs5Dg_9Xg9fwhG2M5jOR-NtXk=" height={40} alt="" />
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
            id="admin"
            onClick={() => navigate('/admin')}
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
            Login as ADMIN
          </button>
          <button
            id="signup"
            onClick={() => navigate('/signup')}
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
            Create Account
          </button>
        </div>
      </nav>

      <h1 style={{
        color: '#02769dff',
        fontSize: '32px',
        marginBottom: '40px',
        fontWeight: 'bold',
        textShadow: '0 2px 4px rgba(0,0,0,0.1)'
      }}>
        Welcome to DocEase - Your Bestie in hard times
      </h1>

      <div style={{
        display: 'flex',
        justifyContent: 'center',
        gap: '30px',
        width: '100%',
        maxWidth: '1400px'
      }}>
        <div style={{
          width: '400px',
          backgroundColor: '#fff',
          borderRadius: '15px',
          padding: '30px',
          border: '3px solid #3498db',
          boxShadow: '0 8px 25px rgba(52, 152, 219, 0.2)',
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
          }}>Login as Patient</h2>
          <form onSubmit={handlePatientSubmit}>
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
            <input placeholder='Enter Email'
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
            <input placeholder='Enter Password'
              type="password"
              id="patientPassword"
              name="password"
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
              Login as Patient
            </button>
          </form>
        </div>

        <div style={{
          width: '400px',
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
          }}>Login as Doctor</h2>
          <form onSubmit={handleDoctorSubmit}>
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
            <input placeholder='Enter Email'
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
              onFocus={(e) => e.target.style.borderColor = '#27ae60'}
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
            <input placeholder='Enter Password'
              type="password"
              id="doctorPassword"
              name="password"
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
              onFocus={(e) => e.target.style.borderColor = '#27ae60'}
              onBlur={(e) => e.target.style.borderColor = '#ecf0f1'}
            />
            <button
              type="submit"
              style={{
                width: '100%',
                fontSize: '16px',
                padding: '15px',
                backgroundColor: '#27ae60',
                color: '#fff',
                border: 'none',
                borderRadius: '8px',
                cursor: 'pointer',
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
              Login as Doctor
            </button>
          </form>
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
          backgroundColor: 'rgba(0,0,0,0.5)'
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
      <footer style={{
        backgroundColor: 'white',
        color: 'white',
        width: '100%',
        padding: '20px 0',
        marginTop: '30px',
        textAlign: 'center',
        fontSize: '14px',
        borderTop: '2px solid #3498db'
      }}>
        <p>&copy; 2025 DocEase. All Rights Reserved.</p>
        <p>Contact Us: siddharthagrawal0305@gmail.com | Privacy Policy | Terms of Service</p>
        <p>Tele. Number :- 9528999690</p>
      </footer>
    </div>

  )
}

export default SignIn
