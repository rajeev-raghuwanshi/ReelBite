import React from 'react'
import { useNavigate } from 'react-router-dom'
import '../styles/form.css'

const AuthForm = ({ title, submitLabel, showName = true, onSubmit, altRoute, altLabel }) => {
  const [form, setForm] = React.useState({ fullName: '', email: '', password: '' })
  const [errors, setErrors] = React.useState({})
  const navigate = useNavigate()

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm(prev => ({ ...prev, [name]: value }))
  }

  const validate = () => {
    const err = {}
    if (showName && !form.fullName.trim()) err.fullName = 'Full name is required'
    if (!form.email.trim()) err.email = 'Email is required'
    else if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(form.email)) err.email = 'Invalid email'
    if (!form.password) err.password = 'Password is required'
    else if (form.password.length < 3) err.password = 'Password must be 6+ chars'
    return err
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const err = validate()
    setErrors(err)
    if (Object.keys(err).length === 0) {
      onSubmit && onSubmit(form)
    }
  }

  return (
    <div className="form-page">
      <form className="auth-form" onSubmit={handleSubmit} noValidate>
        <h2>{title}</h2>
        {showName && (
          <label className="input-group">
            <span>Full Name</span>
            <input name="fullName" value={form.fullName} onChange={handleChange} />
            {errors.fullName && <small className="error">{errors.fullName}</small>}
          </label>
        )}

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
          <button type="submit" className="primary">{submitLabel}</button>
          <button type="button" className="link" onClick={() => navigate(altRoute)}>{altLabel}</button>
        </div>
      </form>
    </div>
  )
}

export default AuthForm
