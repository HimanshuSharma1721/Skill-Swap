import { useState } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"

function Login() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const navigate = useNavigate()

  const handleLogin = async () => {
    try {
      const res = await axios.post("http://localhost:5000/login", {
        email,
        password
      })
      localStorage.setItem("token", res.data.token)
      navigate("/Dashboard")
    } catch (err) {
      setError(err.response.data.message)
    }
  }

  return (
    <div className="min-h-screen relative overflow-hidden" style={{ backgroundColor: "#1A1A2E" }}>

      {/* Background image on right */}
      <div style={{
        position: "absolute", right: 0, top: 0,
        width: "55%", height: "100%",
        backgroundImage: "url('https://images.unsplash.com/photo-1519608487953-e999c86e7455?w=1200')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        opacity: 0.3
      }} />

      {/* Dark overlay */}
      <div style={{
        position: "absolute", inset: 0,
        background: "linear-gradient(to right, #1A1A2E 45%, transparent 100%)"
      }} />

      {/* Navbar */}
      <nav className="relative z-10 flex items-center justify-between px-12 py-6">
       <h1 className="text-2xl font-bold">
  <span style={{ color: "#A78BFA" }}>Skill</span>
  <span style={{ color: "#F472B6" }}>-Swap.</span>
</h1>
        <div className="flex gap-8">
          <a href="/" className="text-gray-400 hover:text-white transition">Home</a>
          <a href="/register" style={{ color: "#4ECDC4" }} className="font-semibold">Register</a>
        </div>
      </nav>

      {/* Form Section */}
      <div className="relative z-10 flex flex-col justify-center px-12 mt-12" style={{ maxWidth: "520px" }}>

        <p className="text-gray-400 text-sm tracking-widest uppercase mb-2">Welcome Back</p>

        <h2 className="text-5xl font-bold text-white mb-1">
          Login to your <br />account<span style={{ color: "#A78BFA" }}>.</span>
        </h2>

        <p className="text-gray-400 mt-3 mb-8">
          Don't have an account?{" "}
          <a href="/register" style={{ color: "#4ECDC4" }} className="font-semibold">Register</a>
        </p>

        {error && (
          <div className="mb-4 p-3 rounded-xl text-sm" style={{ backgroundColor: "rgba(167,139,250,0.1)", color: "#A78BFA" }}>
            {error}
          </div>
        )}

        <div className="flex flex-col gap-4">

          {/* Email */}
          <div style={{
            backgroundColor: "#2A2A3E",
            border: "1px solid rgba(255,255,255,0.08)",
            borderRadius: "12px",
            padding: "12px 16px"
          }}>
            <label className="text-gray-500 text-xs block mb-1">Email</label>
            <div className="flex items-center gap-2">
              <input
                type="email"
                placeholder="you@example.com"
                className="bg-transparent text-white outline-none w-full"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <span className="text-gray-500">✉️</span>
            </div>
          </div>

          {/* Password */}
          <div style={{
            backgroundColor: "#2A2A3E",
            border: "1px solid #A78BFA",
            borderRadius: "12px",
            padding: "12px 16px"
          }}>
            <label className="text-xs block mb-1" style={{ color: "#A78BFA" }}>Password</label>
            <div className="flex items-center gap-2">
              <input
                type="password"
                placeholder="••••••••"
                className="bg-transparent text-white outline-none w-full"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <span className="text-gray-500">🔒</span>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex gap-4 mt-2">
            <a href="/" className="flex-1 py-3 rounded-full text-center text-white font-semibold"
              style={{ backgroundColor: "#2A2A3E", border: "1px solid rgba(255,255,255,0.1)" }}>
              Go Home
            </a>
            <button
              className="flex-1 py-3 rounded-full font-bold text-white"
              style={{ background: "linear-gradient(90deg, #7C3AED, #BE185D)" }}
              onClick={handleLogin}
            >
              Login 🚀
            </button>
          </div>

        </div>
      </div>
    </div>
  )
}

export default Login