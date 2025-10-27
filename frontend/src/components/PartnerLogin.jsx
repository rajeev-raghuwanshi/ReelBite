import React from 'react'
import { useNavigate } from 'react-router-dom'
import '../styles/form.css'

const PartnerLogin = () => {
  const [form, setForm] = React.useState({
    email: '',
    password: ''
  })
  const [errors, setErrors] = React.useState({})
  const navigate = useNavigate()

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm(prev => ({ ...prev, [name]: value }))
  }

  const validate = () => {
    const err = {}
    if (!form.email.trim()) err.email = 'Email is required'
    else if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(form.email)) err.email = 'Invalid email'
    if (!form.password) err.password = 'Password is required'
    else if (form.password.length < 2) err.password = 'Password must be 6+ chars'
    return err
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const err = validate()
    setErrors(err)
    if (Object.keys(err).length === 0) {
      console.log('Partner Login data', form)
      alert('Food Partner login (mock)')
    }
  }

  return (
    <div className="form-page">
      <form className="auth-form" onSubmit={handleSubmit} noValidate>
        <h2>Food Partner Login</h2>

        <label className="input-group">
          <span>Email</span>
          <input name="email" value={form.email} onChange={handleChange} />
          {errors.email && <small className="error">{errors.email}</small>}
        </label>

        <label className="input-group">
          <span>Password</span>
          <input name="password" type="password" value={form.password} onChange={handleChange} />
          {errors.password && <small className="error">{errors.password}</small>}
        </label>

        <div className="actions">
          <button type="submit" className="primary">Login</button>
          <button type="button" className="link" onClick={() => navigate('/user/login')}>Register/Login as User</button>
        </div>
      </form>
    </div>
  )
}

export default PartnerLogin
