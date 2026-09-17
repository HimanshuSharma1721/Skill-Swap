import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const [user, setUser] = useState(null);
  const [matches, setMatches] = useState([]);
  const [message, setMessage] = useState("");
  const [editing, setEditing] = useState(false);

  const [editName, setEditName] = useState("");
  const [editSkillsOffered, setEditSkillsOffered] = useState("");
  const [editSkillsWanted, setEditSkillsWanted] = useState("");

  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) {
      navigate("/");
      return;
    }

    fetchProfile();
    fetchMatches();
  }, []);

  const fetchProfile = async () => {
    try {
      const res = await axios.get("http://localhost:5000/profile", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setUser(res.data);
    } catch (err) {
      navigate("/");
    }
  };

  const fetchMatches = async () => {
    try {
      const res = await axios.get("http://localhost:5000/match", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setMatches(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const sendSwapRequest = async (toId) => {
    try {
      await axios.post(
        "http://localhost:5000/swap-request",
        { to: toId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setMessage("Swap request sent successfully!");
      setTimeout(() => setMessage(""), 3000);
    } catch (err) {
      setMessage(err.response?.data?.message || "Something went wrong.");
      setTimeout(() => setMessage(""), 3000);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  const handleEditSave = async () => {
    try {
      const res = await axios.put(
        "http://localhost:5000/profile",
        {
          name: editName,
          skillsOffered: editSkillsOffered
            .split(",")
            .map((s) => s.trim())
            .filter(Boolean),

          skillsWanted: editSkillsWanted
            .split(",")
            .map((s) => s.trim())
            .filter(Boolean),
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setUser(res.data.user);
      setEditing(false);

      setMessage("Profile updated successfully!");
      setTimeout(() => setMessage(""), 3000);
    } catch (err) {
      setMessage(err.response?.data?.message || "Update failed.");
      setTimeout(() => setMessage(""), 3000);
    }
  };

  const startEditing = () => {
    setEditing(true);
    setEditName(user.name);
    setEditSkillsOffered(user.skillsOffered.join(", "));
    setEditSkillsWanted(user.skillsWanted.join(", "));
  };

  if (!user) {
    return (
      <div
        className="min-h-screen flex items-center justify-center"
        style={{ backgroundColor: "#F4F5EF" }}
      >
        <div className="text-center">
          <div
            className="w-10 h-10 rounded-full border-4 border-black/10 border-t-black animate-spin mx-auto mb-4"
          />
          <p className="text-sm font-medium text-[#11130F]/60">
            Loading your workspace...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div
      className="min-h-screen text-[#11130F] relative overflow-hidden"
      style={{ backgroundColor: "#F4F5EF" }}
    >
      {/* Background Grid */}
      <div
        className="fixed inset-0 pointer-events-none opacity-[0.16]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(17,19,15,0.08) 1px, transparent 1px),
            linear-gradient(90deg, rgba(17,19,15,0.08) 1px, transparent 1px)
          `,
          backgroundSize: "80px 80px",
          maskImage:
            "linear-gradient(to bottom, black 0%, transparent 85%)",
          WebkitMaskImage:
            "linear-gradient(to bottom, black 0%, transparent 85%)",
        }}
      />

      {/* Decorative lime blur */}
      <div
        className="fixed pointer-events-none rounded-full blur-[120px] opacity-30"
        style={{
          width: "300px",
          height: "300px",
          backgroundColor: "#D7F36B",
          top: "-100px",
          right: "-80px",
        }}
      />

      {/* NAVBAR */}
      <nav className="relative z-40 border-b border-black/10 bg-[#F4F5EF]/80 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10 h-20 flex items-center justify-between">
          
          {/* Logo */}
          <button
            onClick={() => navigate("/")}
            className="flex items-center gap-3"
          >
            <div className="w-10 h-10 rounded-full bg-[#11130F] text-[#D7F36B] flex items-center justify-center font-black text-lg">
              S
            </div>

            <div className="text-left">
              <div className="font-black tracking-tight text-lg leading-none">
                Skill Swap
              </div>
              <div className="text-[10px] uppercase tracking-[0.18em] text-black/45 mt-1">
                Learn by teaching
              </div>
            </div>
          </button>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-8 text-sm font-medium">
            <button
              onClick={() => navigate("/Dashboard")}
              className="text-[#11130F]"
            >
              Dashboard
            </button>

            <button
              onClick={() => navigate("/swap-requests")}
              className="text-black/50 hover:text-[#11130F] transition"
            >
              Swap Requests
            </button>
          </div>

          {/* Right */}
          <button
            onClick={handleLogout}
            className="px-5 py-2.5 rounded-full bg-[#11130F] text-[#F4F5EF] text-sm font-bold hover:translate-y-[-1px] transition"
          >
            Log out
          </button>
        </div>
      </nav>

      {/* MAIN */}
      <main className="relative z-10 max-w-7xl mx-auto px-5 sm:px-8 lg:px-10 py-10 lg:py-14">

        {/* Toast */}
        {message && (
          <div className="fixed top-24 right-5 sm:right-8 z-50 max-w-sm">
            <div className="bg-[#11130F] text-white px-5 py-4 rounded-2xl shadow-2xl flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-[#D7F36B]" />
              <p className="text-sm font-medium">{message}</p>
            </div>
          </div>
        )}

        {/* HEADER */}
        <section className="mb-10">
          <p className="text-xs uppercase tracking-[0.2em] font-bold text-[#78911F] mb-3">
            Your workspace
          </p>

          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-5">
            <div>
              <h1 className="text-4xl sm:text-5xl font-black tracking-[-0.04em] leading-tight">
                Hey, {user.name.split(" ")[0]}.
                <br />
                <span className="text-black">
                  Ready to swap some skills?
                </span>
              </h1>

              <p className="mt-4 text-black/55 max-w-xl leading-relaxed">
                Find people who want what you know and know what you want to
                learn.
              </p>
            </div>

            <button
              onClick={() => navigate("/swap-requests")}
              className="self-start lg:self-auto px-6 py-3 rounded-full bg-[#D7F36B] border border-[#11130F]/10 font-bold text-sm hover:-translate-y-0.5 transition shadow-sm"
            >
              View swap requests →
            </button>
          </div>
        </section>

        {/* STATS */}
        <section className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          <StatCard
            number={user.skillsOffered.length}
            label="Skills you offer"
          />

          <StatCard
            number={user.skillsWanted.length}
            label="Skills you want"
          />

          <StatCard
            number={matches.length}
            label="Potential matches"
          />
        </section>

        {/* PROFILE + QUICK INFO */}
        <section className="grid lg:grid-cols-[1.1fr_0.9fr] gap-6 mb-14">

          {/* PROFILE CARD */}
          <div className="rounded-[2rem] bg-white/70 border border-black/10 shadow-[0_20px_60px_rgba(17,19,15,0.06)] p-6 sm:p-8 backdrop-blur-xl">

            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-5 mb-8">

              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-2xl bg-[#11130F] text-[#D7F36B] flex items-center justify-center text-2xl font-black">
                  {user.name.charAt(0).toUpperCase()}
                </div>

                <div>
                  {editing ? (
                    <input
                      value={editName}
                      onChange={(e) => setEditName(e.target.value)}
                      className="text-2xl font-black bg-transparent border-b-2 border-[#78911F] outline-none w-full max-w-[250px]"
                    />
                  ) : (
                    <h2 className="text-2xl font-black tracking-tight">
                      {user.name}
                    </h2>
                  )}

                  <p className="text-sm text-black/45 mt-1">
                    {user.email}
                  </p>
                </div>
              </div>

              {!editing ? (
                <button
                  onClick={startEditing}
                  className="px-4 py-2 rounded-full border border-black/10 bg-white text-sm font-bold hover:bg-black/5 transition"
                >
                  Edit profile
                </button>
              ) : (
                <div className="flex gap-2">
                  <button
                    onClick={handleEditSave}
                    className="px-4 py-2 rounded-full bg-[#11130F] text-white text-sm font-bold"
                  >
                    Save
                  </button>

                  <button
                    onClick={() => setEditing(false)}
                    className="px-4 py-2 rounded-full border border-black/10 text-sm font-bold"
                  >
                    Cancel
                  </button>
                </div>
              )}
            </div>

            {/* SKILLS */}
            <div className="grid sm:grid-cols-2 gap-6">

              {/* OFFERED */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <p className="text-xs uppercase tracking-[0.18em] font-bold text-black/40">
                    I can teach
                  </p>

                  <span className="text-xs font-bold text-[#78911F]">
                    {user.skillsOffered.length}
                  </span>
                </div>

                {editing ? (
                  <input
                    value={editSkillsOffered}
                    onChange={(e) => setEditSkillsOffered(e.target.value)}
                    placeholder="React, JavaScript, Python"
                    className="w-full bg-[#F4F5EF] border border-black/10 rounded-xl px-4 py-3 text-sm outline-none focus:border-[#78911F]"
                  />
                ) : (
                  <div className="flex flex-wrap gap-2">
                    {user.skillsOffered.map((skill, index) => (
                      <span
                        key={index}
                        className="px-3 py-2 rounded-full bg-[#D7F36B]/60 border border-[#78911F]/20 text-sm font-semibold"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {/* WANTED */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <p className="text-xs uppercase tracking-[0.18em] font-bold text-black/40">
                    I want to learn
                  </p>

                  <span className="text-xs font-bold text-[#78911F]">
                    {user.skillsWanted.length}
                  </span>
                </div>

                {editing ? (
                  <input
                    value={editSkillsWanted}
                    onChange={(e) => setEditSkillsWanted(e.target.value)}
                    placeholder="Java, Node.js, Design"
                    className="w-full bg-[#F4F5EF] border border-black/10 rounded-xl px-4 py-3 text-sm outline-none focus:border-[#78911F]"
                  />
                ) : (
                  <div className="flex flex-wrap gap-2">
                    {user.skillsWanted.map((skill, index) => (
                      <span
                        key={index}
                        className="px-3 py-2 rounded-full bg-black/[0.04] border border-black/10 text-sm font-semibold"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* QUICK CARD */}
          <div className="rounded-[2rem] bg-[#11130F] text-white p-7 sm:p-8 overflow-hidden relative">

            <div
              className="absolute w-56 h-56 rounded-full bg-[#D7F36B] blur-[100px] opacity-20 -right-20 -top-20"
            />

            <div className="relative">
              <p className="text-xs uppercase tracking-[0.2em] text-[#D7F36B] font-bold mb-4">
                How Skill Swap works
              </p>

              <h3 className="text-3xl font-black tracking-tight leading-tight">
                Your skills are
                <br />
                your currency.
              </h3>

              <p className="text-white/55 text-sm leading-relaxed mt-4 max-w-sm">
                You teach something you're good at. Someone teaches you
                something you want to learn. No money involved.
              </p>

              <div className="mt-7 space-y-4">
                <Step number="01" text="Find someone with complementary skills" />
                <Step number="02" text="Send them a swap request" />
                <Step number="03" text="Start learning together" />
              </div>
            </div>
          </div>
        </section>

        {/* MATCHES */}
        <section>
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 mb-6">
            <div>
              <p className="text-xs uppercase tracking-[0.2em] font-bold text-[#78911F] mb-2">
                Discover
              </p>

              <h2 className="text-3xl font-black tracking-tight">
                Your matches
              </h2>
            </div>

            <p className="text-sm text-black/45">
              {matches.length} {matches.length === 1 ? "person" : "people"} found
            </p>
          </div>

          {matches.length === 0 ? (
            <div className="rounded-[2rem] bg-white/60 border border-black/10 p-12 text-center">
              <div className="w-16 h-16 rounded-2xl bg-[#D7F36B] mx-auto flex items-center justify-center text-2xl mb-5">
                ✦
              </div>

              <h3 className="text-xl font-black">
                No matches yet
              </h3>

              <p className="text-sm text-black/50 mt-2 max-w-md mx-auto">
                Add more skills to your profile and we'll help you discover
                people who complement what you know.
              </p>

              <button
                onClick={startEditing}
                className="mt-6 px-6 py-3 rounded-full bg-[#11130F] text-white text-sm font-bold"
              >
                Add more skills
              </button>
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-5">
              {matches.map((match) => (
                <MatchCard
                  key={match._id}
                  match={match}
                  onSwap={sendSwapRequest}
                  onRatings={() => navigate(`/ratings/${match._id}`)}
                />
              ))}
            </div>
          )}
        </section>
      </main>
    </div>
  );
}

/* ---------------- COMPONENTS ---------------- */

function StatCard({ number, label }) {
  return (
    <div className="bg-white/65 border border-black/10 rounded-2xl p-5 backdrop-blur-xl">
      <p className="text-3xl font-black tracking-tight">
        {number}
      </p>

      <p className="text-sm text-black/45 mt-1">
        {label}
      </p>
    </div>
  );
}

function Step({ number, text }) {
  return (
    <div className="flex items-center gap-4">
      <div className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center text-xs font-bold text-[#D7F36B]">
        {number}
      </div>

      <p className="text-sm text-white/70">
        {text}
      </p>
    </div>
  );
}

function MatchCard({ match, onSwap, onRatings }) {
  return (
    <div className="group bg-white/70 border border-black/10 rounded-[1.75rem] p-6 backdrop-blur-xl hover:-translate-y-1 hover:shadow-[0_20px_50px_rgba(17,19,15,0.08)] transition-all duration-300">

      {/* Person */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-[#11130F] text-[#D7F36B] flex items-center justify-center text-lg font-black">
            {match.name.charAt(0).toUpperCase()}
          </div>

          <div>
            <h3 className="font-black">
              {match.name}
            </h3>

            <p className="text-xs text-black/40 mt-0.5">
              Skill swap partner
            </p>
          </div>
        </div>

        <div className="w-8 h-8 rounded-full bg-[#D7F36B] flex items-center justify-center text-sm">
          ↗
        </div>
      </div>

      {/* Exchange */}
      <div className="space-y-4">

        <div>
          <p className="text-[10px] uppercase tracking-[0.18em] font-bold text-black/35 mb-2">
            They can teach
          </p>

          <div className="flex flex-wrap gap-2">
            {match.skillsOffered.map((skill, index) => (
              <span
                key={index}
                className="px-3 py-1.5 rounded-full bg-[#D7F36B]/50 border border-[#78911F]/15 text-xs font-semibold"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>

        <div className="h-px bg-black/10" />

        <div>
          <p className="text-[10px] uppercase tracking-[0.18em] font-bold text-black/35 mb-2">
            They want to learn
          </p>

          <div className="flex flex-wrap gap-2">
            {match.skillsWanted.map((skill, index) => (
              <span
                key={index}
                className="px-3 py-1.5 rounded-full bg-black/[0.035] border border-black/10 text-xs font-semibold"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="flex gap-2 mt-7">

        <button
          onClick={() => onSwap(match._id)}
          className="flex-1 py-3 rounded-xl bg-[#11130F] text-white text-sm font-bold hover:bg-[#78911F] hover:text-white transition"
        >
          Swap
        </button>

        <button
          onClick={onRatings}
          className="px-4 py-3 rounded-xl border border-black/10 text-sm font-bold hover:bg-black/5 transition"
        >
          ★
        </button>

      </div>
    </div>
  );
}

export default Dashboard;