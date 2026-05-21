import { useState, useEffect } from "react"
import axios from "axios"
import { useNavigate, useParams } from "react-router-dom"

function Ratings() {
  const [ratingsData, setRatingsData] = useState(null)
  const navigate = useNavigate()
  const { userId } = useParams()
  const token = localStorage.getItem("token")

  useEffect(() => {
    if (!token) {
      navigate("/login")
      return
    }
    fetchRatings()
  }, [])

  const fetchRatings = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/ratings/${userId}`, {
        headers: { Authorization: `Bearer ${token}` }
      })
      setRatingsData(res.data)
    } catch (err) {
      console.log(err)
    }
  }

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <span key={i} style={{ color: i < rating ? "#FFE66D" : "#4a4a6a", fontSize: "18px" }}>★</span>
    ))
  }

  if (!ratingsData) return (
    <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: "#1A1A2E" }}>
      <p className="text-white text-xl">Loading...</p>
    </div>
  )

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
        <button
          onClick={() => navigate("/dashboard")}
          className="text-gray-400 hover:text-white transition">
          Back to Dashboard
        </button>
      </nav>

      <div className="px-12 py-8 max-w-3xl">

        {/* Average Rating Card */}
        <div className="p-8 rounded-2xl mb-8 text-center" style={{
          backgroundColor: "#2A2A3E",
          border: "1px solid rgba(255,255,255,0.05)"
        }}>
          <p className="text-gray-400 text-sm uppercase tracking-widest mb-2">Average Rating</p>
          <h2 className="text-6xl font-bold text-white mb-2">{ratingsData.average}</h2>
          <div className="flex justify-center gap-1 mb-2">
            {renderStars(Math.round(ratingsData.average))}
          </div>
          <p className="text-gray-500 text-sm">{ratingsData.total} reviews</p>
        </div>

        {/* Individual Ratings */}
        <h3 className="text-xl font-bold text-white mb-6">All Reviews</h3>

        {ratingsData.ratings.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-gray-500 text-lg">No reviews yet 😔</p>
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            {ratingsData.ratings.map((r) => (
              <div key={r._id} className="p-6 rounded-2xl" style={{
                backgroundColor: "#2A2A3E",
                border: "1px solid rgba(255,255,255,0.05)"
              }}>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full flex items-center justify-center text-lg font-bold text-white"
                      style={{ background: "linear-gradient(135deg, #7C3AED, #BE185D)" }}>
                      {r.from.name.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <h4 className="text-white font-semibold">{r.from.name}</h4>
                      <p className="text-gray-500 text-xs">{r.from.email}</p>
                    </div>
                  </div>
                  <div className="flex gap-1">
                    {renderStars(r.rating)}
                  </div>
                </div>
                {r.comment && (
                  <p className="text-gray-400 text-sm mt-2 pl-13">{r.comment}</p>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default Ratings