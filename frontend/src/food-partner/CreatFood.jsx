import React from 'react'
import axios from 'axios'
import './CreateFood.css'

const CreatFood = () => {
  const [videoFile, setVideoFile] = React.useState(null)
  const [preview, setPreview] = React.useState(null)
  const [description, setDescription] = React.useState('')
  const [name, setName] = React.useState('')
  const [loading, setLoading] = React.useState(false)
  const [error, setError] = React.useState(null)

  const handleVideoChange = (e) => {
    const file = e.target.files && e.target.files[0]
    if (file) {
      setVideoFile(file)
      const url = URL.createObjectURL(file)
      setPreview(url)
    } else {
      setVideoFile(null)
      setPreview(null)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError(null)
    if (!videoFile) {
      setError('Please select a video file')
      return
    }
    if (!name.trim()) {
      setError('Please enter food name')
      return
    }

    const formData = new FormData()
    formData.append('video', videoFile)
    formData.append('description', description)
    formData.append('name', name)

    try {
      setLoading(true)
      // replace /api/food with your backend endpoint
      const res = await axios.post('http://localhost:3000/api/food', formData, {
        withCredentials : true,
        headers: { 'Content-Type': 'multipart/form-data' }
      })
      // handle success (reset form or navigate)
      console.log('Upload success', res.data)
      setVideoFile(null)
      setPreview(null)
      setDescription('')
      setName('')
      alert('Food uploaded successfully (mock)')
    } catch (err) {
      console.error(err)
      setError(err.response?.data?.message || 'Upload failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="create-food-page">
      <form className="create-food-form" onSubmit={handleSubmit}>
        <h2 className="form-title">Add New Food Item</h2>

        <label className="input-group">
          <span>Video upload</span>
          <input type="file" name="video" accept="video/*" onChange={handleVideoChange} />
        </label>

        {preview && (
          <div className="video-preview">
            <video src={preview} controls muted loop playsInline />
          </div>
        )}

        <label className="input-group">
          <span>Description</span>
          <textarea name="description" placeholder="Write description about the food..." value={description} onChange={(e) => setDescription(e.target.value)} />
        </label>

        <label className="input-group">
          <span>Food Name</span>
          <input type="text" name="name" placeholder="Enter food name" value={name} onChange={(e) => setName(e.target.value)} />
        </label>

        {error && <div className="error">{error}</div>}

        <div className="actions">
          <button type="submit" className="primary" disabled={loading}>{loading ? 'Uploading...' : 'Submit'}</button>
        </div>
      </form>
    </div>
  )
}

export default CreatFood