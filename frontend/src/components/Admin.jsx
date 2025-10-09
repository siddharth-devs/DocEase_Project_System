import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import './Admin.css'

console.log('Admin component loaded')

const Admin = () => {
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const backendURL = "http://localhost:5000/"

  useEffect(() => {
    console.log('Admin component mounted')
  }, [])

  const handleLoginSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    
    const formData = new FormData(e.target)
    const email = formData.get('email')
    const password = formData.get('password')

    const adminData = { email, password }

    try {
      const response = await fetch(`${backendURL}admin/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(adminData)
      })

      const data = await response.json()
      setLoading(false)

      if (data.token) {
        localStorage.setItem("token", data.token)
        localStorage.setItem("name", data.name)
        localStorage.setItem("id", data.id)
        alert(data.message)
        navigate('/view-admin')
      } else {
        alert("Invalid Credentials")
      }
    } catch (error) {
      setLoading(false)
      console.error(error)
    }
  }

  const handleRegisterSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    
    const formData = new FormData(e.target)
    const name = formData.get('name')
    const email = formData.get('email')
    const password = formData.get('password')
    const image = formData.get('image')

    const adminData = { name, email, password, image }

    try {
      const response = await fetch(`${backendURL}admin/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(adminData)
      })

      const data = await response.json()
      setLoading(false)
      alert(data.message + " " + "Login Now")
      navigate('/admin')
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
        <div>
          <h1 style={{ color: '#e74c3c', margin: 0, fontSize: '24px', fontWeight: 'bold' }}>Admin Panel</h1>
        </div>
        <div>
          <button 
            id="userButton" 
            onClick={() => navigate('/signin')}
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
            Login as User
          </button>
        </div>
      </nav>

      <div style={{ 
        display: 'flex', 
        justifyContent: 'center',
        gap: '30px',
        width: '100%',
        maxWidth: '1400px'
      }}>
        <div className='admin-form' style={{
          width: '400px',
          backgroundColor: '#fff',
          borderRadius: '15px',
          padding: '30px',
          border: '3px solid #e74c3c',
          boxShadow: '0 8px 25px rgba(231, 76, 60, 0.2)',
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
          }}>Login as ADMIN</h2>
          <form onSubmit={handleLoginSubmit}>
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
              type="text" 
              id="adminLoginEmail" 
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
            <input placeholder='Enter Password'
              type="password" 
              id="adminLoginPassword" 
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
              Login as Admin
            </button>
          </form>
        </div>

        <div className='admin-form' style={{
          width: '400px',
          backgroundColor: '#fff',
          borderRadius: '15px',
          padding: '30px',
          border: '3px solid #9b59b6',
          boxShadow: '0 8px 25px rgba(155, 89, 182, 0.2)',
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
          }}>REGISTER as ADMIN</h2>
          <form onSubmit={handleRegisterSubmit}>
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
            <input placeholder='Enter Your Name'
              type="text" 
              id="adminRegName" 
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
              onFocus={(e) => e.target.style.borderColor = '#9b59b6'}
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
            <input placeholder='Enter Email'
              type="text" 
              id="adminRegEmail" 
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
              onFocus={(e) => e.target.style.borderColor = '#9b59b6'}
              onBlur={(e) => e.target.style.borderColor = '#ecf0f1'
                
              }
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
              id="adminRegPassword" 
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
              onFocus={(e) => e.target.style.borderColor = '#9b59b6'}
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
            <input placeholder='Enter Your Image URL'
              type="text" 
              id="adminRegImage" 
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
              onFocus={(e) => e.target.style.borderColor = '#9b59b6'}
              onBlur={(e) => e.target.style.borderColor = '#ecf0f1'}
            />
            <button 
              type="submit"
              style={{
                width: '100%',
                fontSize: '16px',
                padding: '15px',
                backgroundColor: '#9b59b6',
                color: '#fff',
                border: 'none',
                borderRadius: '8px',
                cursor: 'pointer',
                fontWeight: 'bold',
                transition: 'all 0.3s ease',
                boxShadow: '0 4px 15px rgba(155, 89, 182, 0.3)'
              }}
              onMouseOver={(e) => {
                e.target.style.backgroundColor = '#8e44ad'
                e.target.style.transform = 'translateY(-2px)'
                e.target.style.boxShadow = '0 6px 20px rgba(155, 89, 182, 0.4)'
              }}
              onMouseOut={(e) => {
                e.target.style.backgroundColor = '#9b59b6'
                e.target.style.transform = 'translateY(0)'
                e.target.style.boxShadow = '0 4px 15px rgba(155, 89, 182, 0.3)'
              }}
            >
              Register as Admin
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
    </div>
  )
}

export default Admin
