import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const [user, setUser] = useState(null);
  const [matches, setMatches] = useState([]);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const [editing, setEditing] = useState(false);
  const [editName, setEditName] = useState("");
  const [editSkillsOffered, setEditSkillsOffered] = useState("");
  const [editSkillsWanted, setEditSkillsWanted] = useState("");

  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) {
      navigate("/login");
      return;
    }
    fetchProfile();
    fetchMatches();
  }, []);

  const fetchProfile = async () => {
    try {
      const res = await axios.get("http://localhost:5000/profile", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUser(res.data);
    } catch (err) {
      navigate("/login");
    }
  };

  const fetchMatches = async () => {
    try {
      const res = await axios.get("http://localhost:5000/match", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setMatches(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const sendSwapRequest = async (toId) => {
    console.log("Sending swap request to:", toId);
    try {
      await axios.post(
        "http://localhost:5000/swap-request",
        { to: toId },
        { headers: { Authorization: `Bearer ${token}` } },
      );
      setMessage("Swap request sent! ✅");
      setTimeout(() => setMessage(""), 3000);
    } catch (err) {
      setMessage(err.response.data.message);
      setTimeout(() => setMessage(""), 3000);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };
  const handleEditSave = async () => {
    try {
      const res = await axios.put(
        "http://localhost:5000/profile",
        {
          name: editName,
          skillsOffered: editSkillsOffered.split(",").map((s) => s.trim()),
          skillsWanted: editSkillsWanted.split(",").map((s) => s.trim()),
        },
        { headers: { Authorization: `Bearer ${token}` } },
      );
      setUser(res.data.user);
      setEditing(false);
      setMessage("Profile updated! ✅");
      setTimeout(() => setMessage(""), 3000);
    } catch (err) {
      setMessage(err.response.data.message);
      setTimeout(() => setMessage(""), 3000);
    }
  };

  if (!user)
    return (
      <div
        className="min-h-screen flex items-center justify-center"
        style={{ backgroundColor: "#1A1A2E" }}
      >
        <p className="text-white text-xl">Loading...</p>
      </div>
    );

  return (
    <div className="min-h-screen" style={{ backgroundColor: "#1A1A2E" }}>
      {/* Glow effects */}
      <div
        style={{
          position: "fixed",
          width: "400px",
          height: "400px",
          borderRadius: "50%",
          backgroundColor: "#A78BFA",
          filter: "blur(150px)",
          opacity: 0.07,
          top: "0%",
          right: "0%",
          pointerEvents: "none"
        }}
      />
      <div
        style={{
          position: "fixed",
          width: "400px",
          height: "400px",
          borderRadius: "50%",
          backgroundColor: "#F472B6",
          filter: "blur(150px)",
          opacity: 0.07,
          bottom: "0%",
          left: "0%",
          pointerEvents: "none"
        }}
      />

      {/* Navbar */}
      <nav
        style={{
          backgroundColor: "rgba(42,42,62,0.8)",
          backdropFilter: "blur(10px)",
          borderBottom: "1px solid rgba(255,255,255,0.05)",
        }}
        className="sticky top-0 z-50 flex items-center justify-between px-12 py-4"
      >
        <h1 className="text-2xl font-bold">
          <span style={{ color: "#A78BFA" }}>Skill</span>
          <span style={{ color: "#F472B6" }}>-Swap.</span>
        </h1>
        <div className="flex items-center gap-4">
          <a
            href="/swap-requests"
            className="text-gray-400 hover:text-white transition"
          >
            Swap Requests
          </a>
          <button
            onClick={handleLogout}
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
          <div
            className="fixed top-20 right-8 px-6 py-3 rounded-xl text-white text-sm font-semibold z-50"
            style={{ background: "linear-gradient(90deg, #7C3AED, #BE185D)" }}
          >
            {message}
          </div>
        )}

        {/* Profile Section */}
        {/* Profile Section */}
        <div
          className="mb-10 p-8 rounded-2xl"
          style={{
            backgroundColor: "#2A2A3E",
            border: "1px solid rgba(255,255,255,0.05)",
          }}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-6">
              {/* Avatar */}
              <div
                className="w-20 h-20 rounded-full flex items-center justify-center text-3xl font-bold text-white"
                style={{
                  background: "linear-gradient(135deg, #7C3AED, #BE185D)",
                }}
              >
                {user.name.charAt(0).toUpperCase()}
              </div>

              <div>
                {editing ? (
                  <input
                    className="bg-transparent text-white text-2xl font-bold outline-none border-b"
                    style={{ borderColor: "#A78BFA" }}
                    value={editName}
                    onChange={(e) => setEditName(e.target.value)}
                  />
                ) : (
                  <h2 className="text-2xl font-bold text-white">{user.name}</h2>
                )}
                <p className="text-gray-400 text-sm">{user.email}</p>
              </div>
            </div>

            {/* Edit / Save Button */}
            {editing ? (
              <div className="flex gap-2">
                <button
                  onClick={handleEditSave}
                  className="px-5 py-2 rounded-full text-sm font-bold text-white"
                  style={{
                    background: "linear-gradient(90deg, #7C3AED, #BE185D)",
                  }}
                >
                  Save ✅
                </button>
                <button
                  onClick={() => setEditing(false)}
                  className="px-5 py-2 rounded-full text-sm font-bold"
                  style={{
                    backgroundColor: "rgba(255,255,255,0.05)",
                    color: "#ef4444",
                    border: "1px solid rgba(255,255,255,0.1)",
                  }}
                >
                  Cancel
                </button>
              </div>
            ) : (
              <button
                onClick={() => {
                  setEditing(true);
                  setEditName(user.name);
                  setEditSkillsOffered(user.skillsOffered.join(", "));
                  setEditSkillsWanted(user.skillsWanted.join(", "));
                }}
                className="px-5 py-2 rounded-full text-sm font-bold"
                style={{
                  backgroundColor: "rgba(124,58,237,0.2)",
                  color: "#A78BFA",
                  border: "1px solid rgba(124,58,237,0.3)",
                }}
              >
                Edit Profile ✏️
              </button>
            )}
          </div>

          <div className="flex gap-8 mt-6">
            <div className="flex-1">
              <p className="text-xs text-gray-500 uppercase tracking-widest mb-2">
                Skills Offered
              </p>
              {editing ? (
                <input
                  className="w-full bg-transparent text-white outline-none border-b p-2"
                  style={{ borderColor: "rgba(255,255,255,0.1)" }}
                  value={editSkillsOffered}
                  onChange={(e) => setEditSkillsOffered(e.target.value)}
                  placeholder="JavaScript, Python, C++"
                />
              ) : (
                <div className="flex flex-wrap gap-2">
                  {user.skillsOffered.map((skill, i) => (
                    <span
                      key={i}
                      className="px-3 py-1 rounded-full text-sm font-semibold"
                      style={{
                        backgroundColor: "rgba(124,58,237,0.2)",
                        color: "#A78BFA",
                        border: "1px solid rgba(124,58,237,0.3)",
                      }}
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              )}
            </div>

            <div className="flex-1">
              <p className="text-xs text-gray-500 uppercase tracking-widest mb-2">
                Skills Wanted
              </p>
              {editing ? (
                <input
                  className="w-full bg-transparent text-white outline-none border-b p-2"
                  style={{ borderColor: "rgba(255,255,255,0.1)" }}
                  value={editSkillsWanted}
                  onChange={(e) => setEditSkillsWanted(e.target.value)}
                  placeholder="React, Node.js, Tailwind"
                />
              ) : (
                <div className="flex flex-wrap gap-2">
                  {user.skillsWanted.map((skill, i) => (
                    <span
                      key={i}
                      className="px-3 py-1 rounded-full text-sm font-semibold"
                      style={{
                        backgroundColor: "rgba(244,114,182,0.2)",
                        color: "#F472B6",
                        border: "1px solid rgba(244,114,182,0.3)",
                      }}
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Matches Section */}
        <h3 className="text-xl font-bold text-white mb-6">
          Your Matches 🎯
          <span className="ml-3 text-sm font-normal text-gray-400">
            {matches.length} people found
          </span>
        </h3>

        {matches.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-gray-500 text-lg">No matches found yet 😔</p>
            <p className="text-gray-600 text-sm mt-2">
              Add more skills to find matches!
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-3 gap-6">
            {matches.map((match) => (
              <div
                key={match._id}
                className="p-6 rounded-2xl flex flex-col gap-4"
                style={{
                  backgroundColor: "#2A2A3E",
                  border: "1px solid rgba(255,255,255,0.05)",
                }}
              >
                {/* Match Avatar */}
                <div className="flex items-center gap-4">
                  <div
                    className="w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold text-white"
                    style={{
                      background: "linear-gradient(135deg, #7C3AED, #BE185D)",
                    }}
                  >
                    {match.name.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <h4 className="text-white font-semibold">{match.name}</h4>
                    <p className="text-gray-500 text-xs">{match.email}</p>
                  </div>
                </div>

                {/* Skills */}
                <div>
                  <p className="text-xs text-gray-500 uppercase tracking-widest mb-2">
                    Offers
                  </p>
                  <div className="flex flex-wrap gap-1">
                    {match.skillsOffered.map((skill, i) => (
                      <span
                        key={i}
                        className="px-2 py-1 rounded-full text-xs"
                        style={{
                          backgroundColor: "rgba(124,58,237,0.2)",
                          color: "#A78BFA",
                        }}
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <p className="text-xs text-gray-500 uppercase tracking-widest mb-2">
                    Wants
                  </p>
                  <div className="flex flex-wrap gap-1">
                    {match.skillsWanted.map((skill, i) => (
                      <span
                        key={i}
                        className="px-2 py-1 rounded-full text-xs"
                        style={{
                          backgroundColor: "rgba(244,114,182,0.2)",
                          color: "#F472B6",
                        }}
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Buttons */}
                <div className="flex gap-2 mt-auto">
                  <button
                    onClick={() => sendSwapRequest(match._id)}
                    className="flex-1 py-2 rounded-full text-sm font-bold text-white"
                    style={{
                      background: "linear-gradient(90deg, #7C3AED, #BE185D)",
                    }}
                  >
                    Swap 🤝
                  </button>
                  <button
                    onClick={() => navigate(`/ratings/${match._id}`)}
                    className="flex-1 py-2 rounded-full text-sm font-bold"
                    style={{
                      backgroundColor: "rgba(255,255,255,0.05)",
                      color: "#A78BFA",
                      border: "1px solid rgba(124,58,237,0.3)",
                    }}
                  >
                    Ratings ⭐
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Dashboard;
