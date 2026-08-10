import React, { useState } from 'react'
import { Link } from 'react-router'

const Register = () => {
  const [formData, setFormData] = useState({
    email: '',
    username: '',
    password: ''
  })

  const handleChange = (event) => {
    const { name, value } = event.target
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }))
  }

  const submitForm = (event) => {
    event.preventDefault()
    console.log('Register submit', formData)
    alert(`Creating account for ${formData.username}`)
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-md rounded-3xl border border-[#31b8c6]/20 bg-[#0d111b]/90 p-8 shadow-[0_20px_80px_rgba(49,184,198,0.18)] backdrop-blur-xl">
        <div className="mb-8 text-center">
          <p className="text-sm uppercase tracking-[0.35em] text-[#31b8c6]/80">New account</p>
          <h1 className="mt-3 text-3xl font-semibold text-white">Register with us</h1>
          <p className="mt-2 text-sm text-slate-400">Start your journey with a secure account.</p>
        </div>

        <form onSubmit={submitForm} className="space-y-6">
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-slate-300">
              Username
            </label>
            <input
              id="username"
              name="username"
              type="text"
              value={formData.username}
              onChange={handleChange}
              required
              className="mt-2 w-full rounded-2xl border border-slate-700 bg-slate-900/90 px-4 py-3 text-white outline-none transition focus:border-[#31b8c6] focus:ring-4 focus:ring-[#31b8c6]/10"
              placeholder="Your display name"
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-slate-300">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="mt-2 w-full rounded-2xl border border-slate-700 bg-slate-900/90 px-4 py-3 text-white outline-none transition focus:border-[#31b8c6] focus:ring-4 focus:ring-[#31b8c6]/10"
              placeholder="you@example.com"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-slate-300">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="mt-2 w-full rounded-2xl border border-slate-700 bg-slate-900/90 px-4 py-3 text-white outline-none transition focus:border-[#31b8c6] focus:ring-4 focus:ring-[#31b8c6]/10"
              placeholder="Enter a strong password"
            />
          </div>

          <button
            type="submit"
            className="w-full rounded-2xl bg-[#31b8c6] px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-[#31b8c6]/20 transition hover:brightness-110"
          >
            Register
          </button>
        </form>

        <div className="mt-6 text-center text-sm text-slate-400">
          Already have an account?{' '}
          <Link to="/login" className="font-semibold text-[#31b8c6] hover:text-[#66d9e4]">
            Login
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Register;
