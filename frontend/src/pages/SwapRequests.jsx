import { useState, useEffect } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"

function SwapRequests() {
  const [requests, setRequests] = useState([])
  const [message, setMessage] = useState("")
  const navigate = useNavigate()
  const token = localStorage.getItem("token")

  useEffect(() => {
    if (!token) {
      navigate("/login")
      return
    }
    fetchRequests()
  }, [])

  const fetchRequests = async () => {
    try {
      const res = await axios.get("http://localhost:5000/swap-requests", {
        headers: { Authorization: `Bearer ${token}` }
      })
      setRequests(res.data)
    } catch (err) {
      console.log(err)
    }
  }

  const handleAccept = async (id) => {
    try {
      await axios.put(`http://localhost:5000/swap-request/${id}/accept`, {}, {
        headers: { Authorization: `Bearer ${token}` }
      })
      setMessage("Swap request accepted! 🎉")
      fetchRequests()
      setTimeout(() => setMessage(""), 3000)
    } catch (err) {
      setMessage(err.response.data.message)
      setTimeout(() => setMessage(""), 3000)
    }
  }

  const handleReject = async (id) => {
    try {
      await axios.put(`http://localhost:5000/swap-request/${id}/reject`, {}, {
        headers: { Authorization: `Bearer ${token}` }
      })
      setMessage("Swap request rejected ❌")
      fetchRequests()
      setTimeout(() => setMessage(""), 3000)
    } catch (err) {
      setMessage(err.response.data.message)
      setTimeout(() => setMessage(""), 3000)
    }
  }

  return (
    <div className="min-h-screen" style={{ backgroundColor: "#1A1A2E" }}>

      {/* Glow effects */}
      <div style={{
        position: "fixed", width: "400px", height: "400px",
        borderRadius: "50%", backgroundColor: "#A78BFA",
        filter: "blur(150px)", opacity: 0.07, top: "0%", right: "0%", pointerEvents: "none"
      }} />
      <div style={{
        position: "fixed", width: "400px", height: "400px",
        borderRadius: "50%", backgroundColor: "#F472B6",
        filter: "blur(150px)", opacity: 0.07, bottom: "0%", left: "0%", pointerEvents: "none"
      }} />

      {/* Navbar */}
      <nav style={{
        backgroundColor: "rgba(42,42,62,0.8)",
        backdropFilter: "blur(10px)",
        borderBottom: "1px solid rgba(255,255,255,0.05)"
      }} className="sticky top-0 z-50 flex items-center justify-between px-12 py-4">
        <h1 className="text-2xl font-bold cursor-pointer" onClick={() => navigate("/dashboard")}>
          <span style={{ color: "#A78BFA" }}>Skill</span>
          <span style={{ color: "#F472B6" }}>-Swap.</span>
        </h1>
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate("/dashboard")}
            className="text-gray-400 hover:text-white transition">
            Dashboard
          </button>
          <button
            onClick={() => {
              localStorage.removeItem("token")
              navigate("/login")
            }}
            className="px-4 py-2 rounded-full text-sm font-semibold text-white"
            style={{ background: "linear-gradient(90deg, #7C3AED, #BE185D)" }}
          >
            Logout
          </button>
        </div>
      </nav>

      <div className="px-12 py-8">

        {/* Toast message */}
        {message && (
          <div className="fixed top-20 right-8 px-6 py-3 rounded-xl text-white text-sm font-semibold z-50"
            style={{ background: "linear-gradient(90deg, #7C3AED, #BE185D)" }}>
            {message}
          </div>
        )}

        <h2 className="text-2xl font-bold text-white mb-8">
          Incoming Swap Requests 🤝
          <span className="ml-3 text-sm font-normal text-gray-400">{requests.length} requests</span>
        </h2>

        {requests.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-gray-500 text-lg">No swap requests yet 😔</p>
            <p className="text-gray-600 text-sm mt-2">When someone sends you a request it'll show up here!</p>
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            {requests.map((req) => (
              <div key={req._id} className="p-6 rounded-2xl flex items-center justify-between"
                style={{
                  backgroundColor: "#2A2A3E",
                  border: "1px solid rgba(255,255,255,0.05)"
                }}>

                <div className="flex items-center gap-4">
                  {/* Avatar */}
                  <div className="w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold text-white"
                    style={{ background: "linear-gradient(135deg, #7C3AED, #BE185D)" }}>
                    {req.from.name.charAt(0).toUpperCase()}
                  </div>

                  <div>
                    <h4 className="text-white font-semibold">{req.from.name}</h4>
                    <p className="text-gray-500 text-xs">{req.from.email}</p>

                    <div className="flex gap-2 mt-2 flex-wrap">
                      {req.from.skillsOffered.map((skill, i) => (
                        <span key={i} className="px-2 py-1 rounded-full text-xs"
                          style={{ backgroundColor: "rgba(124,58,237,0.2)", color: "#A78BFA" }}>
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Status / Buttons */}
                <div className="flex items-center gap-3">
                  {req.status === "pending" ? (
                    <>
                      <button
                        onClick={() => handleAccept(req._id)}
                        className="px-5 py-2 rounded-full text-sm font-bold text-white"
                        style={{ background: "linear-gradient(90deg, #7C3AED, #BE185D)" }}
                      >
                        Accept ✅
                      </button>
                      <button
                        onClick={() => handleReject(req._id)}
                        className="px-5 py-2 rounded-full text-sm font-bold"
                        style={{ backgroundColor: "rgba(255,255,255,0.05)", color: "#gray", border: "1px solid rgba(255,255,255,0.1)", color: "#ef4444" }}
                      >
                        Reject ❌
                      </button>
                    </>
                  ) : (
                    <span className={`px-4 py-2 rounded-full text-sm font-bold ${req.status === "accepted" ? "text-green-400" : "text-red-400"}`}
                      style={{ backgroundColor: req.status === "accepted" ? "rgba(74,222,128,0.1)" : "rgba(239,68,68,0.1)" }}>
                      {req.status === "accepted" ? "Accepted ✅" : "Rejected ❌"}
                    </span>
                  )}
                </div>

              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default SwapRequests