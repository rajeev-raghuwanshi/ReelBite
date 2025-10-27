import React from 'react'
import { useNavigate } from 'react-router-dom'
import '../styles/form.css'

const PartnerRegister = () => {
  const [form, setForm] = React.useState({
    businessName: '',
    contactName: '',
    phone: '',
    address: '',
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
    if (!form.businessName.trim()) err.businessName = 'Business name is required'
    if (!form.contactName.trim()) err.contactName = 'Contact name is required'
    if (!form.phone.trim()) err.phone = 'Phone is required'
    if (!form.address.trim()) err.address = 'Address is required'
    if (!form.email.trim()) err.email = 'Email is required'
    else if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(form.email)) err.email = 'Invalid email'
    if (!form.password) err.password = 'Password is required'
    else if (form.password.length < 6) err.password = 'Password must be 6+ chars'
    return err
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const err = validate()
    setErrors(err)
    if (Object.keys(err).length === 0) {
      console.log('Partner Register data', form)
      alert('Food Partner registered (mock)')
      // navigate or other actions can be added here
    }
  }

  return (
    <div className="form-page">
      <form className="auth-form" onSubmit={handleSubmit} noValidate>
        <h2>Food Partner Register</h2>

        <label className="input-group">
          <span>Business Name</span>
          <input name="businessName" value={form.businessName} onChange={handleChange} />
          {errors.businessName && <small className="error">{errors.businessName}</small>}
        </label>

        <label className="input-group">
          <span>Contact Person’s Name</span>
          <input name="contactName" value={form.contactName} onChange={handleChange} />
          {errors.contactName && <small className="error">{errors.contactName}</small>}
        </label>

        <label className="input-group">
          <span>Phone Number</span>
          <input name="phone" value={form.phone} onChange={handleChange} />
          {errors.phone && <small className="error">{errors.phone}</small>}
        </label>

        <label className="input-group">
          <span>Address</span>
          <input name="address" value={form.address} onChange={handleChange} />
          {errors.address && <small className="error">{errors.address}</small>}
        </label>

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
          <button type="submit" className="primary">Register</button>
          <button type="button" className="link" onClick={() => navigate('/user/register')}>Register/Login as User</button>
        </div>
      </form>
    </div>
  )
}

export default PartnerRegister
