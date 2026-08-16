import React, { useState } from "react";
import { Link, useNavigate } from "react-router";
import { useSelector } from "react-redux";
import { Navigate } from "react-router";

import { useAuth } from "../hook/useAuth";


const Login = () => {

  const [formData, setFormData] = useState({email: "",password: ""});

  const { handleLogin } = useAuth();

  const navigate = useNavigate();

  // 🔥 Get error from Redux
  const { error, loading } = useSelector(
      (state) => state.auth
  );


  const handleChange = (event) => {

      const { name, value } = event.target;

      setFormData((prev) => ({
          ...prev,
          [name]: value
      }));
  };


  const submitForm = async (event) => {

      event.preventDefault();

      try {

          await handleLogin({
              email: formData.email,
              password: formData.password
          });

          // ✅ This will execute ONLY
          // if login was successful
          navigate("/");

      } catch (error) {

          // ❌ Login failed
          // Stay on login page

          console.error("Login failed:", error.message);
      }
  };

  // for navigating user to direct dashboard if he is already logged in
  const userState = useSelector(state => state.auth.user);
  const loadingState = useSelector(state => state.auth.loading);
  if(!loadingState && userState){
    return <Navigate to="/" replace />
  }

  return (
      <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center px-4 py-10">

          <div className="w-full max-w-md rounded-3xl border border-[#31b8c6]/20 bg-[#0d111b]/90 p-8 shadow-[0_20px_80px_rgba(49,184,198,0.18)] backdrop-blur-xl">

              <div className="mb-8 text-center">

                  <p className="text-sm uppercase tracking-[0.35em] text-[#31b8c6]/80">
                      Welcome back
                  </p>

                  <h1 className="mt-3 text-3xl font-semibold text-white">
                      Login to your account
                  </h1>

                  <p className="mt-2 text-sm text-slate-400">
                      Use your email and password to sign in.
                  </p>

              </div>


              {/* 🔥 ERROR MESSAGE */}
              {error && (
                  <div className="mb-5 rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-400">
                      {error}
                  </div>
              )}


              <form
                  onSubmit={submitForm}
                  className="space-y-6"
              >

                  <div>

                      <label
                          htmlFor="email"
                          className="block text-sm font-medium text-slate-300"
                      >
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

                      <label
                          htmlFor="password"
                          className="block text-sm font-medium text-slate-300"
                      >
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
                          placeholder="Enter your password"
                      />

                  </div>


                  <button
                      type="submit"
                      disabled={loading}
                      className="w-full rounded-2xl bg-[#31b8c6] px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-[#31b8c6]/20 transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-50"
                  >

                      {loading ? "Logging in..." : "Sign In"}

                  </button>

              </form>


              <div className="mt-6 text-center text-sm text-slate-400">

                  Don't have an account?{" "}

                  <Link
                      to="/register"
                      className="font-semibold text-[#31b8c6] hover:text-[#66d9e4]"
                  >
                      Register
                  </Link>

              </div>

          </div>

      </div>
  );
};


export default Login;