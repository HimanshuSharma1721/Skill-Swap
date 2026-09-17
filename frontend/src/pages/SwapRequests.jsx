import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function SwapRequests() {
  const [requests, setRequests] = useState([]);
  const [message, setMessage] = useState("");

  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) {
      navigate("/");
      return;
    }

    fetchRequests();
  }, []);

  const fetchRequests = async () => {
    try {
      const res = await axios.get("http://localhost:5000/swap-requests", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setRequests(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const handleAccept = async (id) => {
    try {
      await axios.put(
        `http://localhost:5000/swap-request/${id}/accept`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setMessage("Swap request accepted!");
      fetchRequests();

      setTimeout(() => setMessage(""), 3000);
    } catch (err) {
      setMessage(
        err.response?.data?.message || "Something went wrong."
      );

      setTimeout(() => setMessage(""), 3000);
    }
  };

  const handleReject = async (id) => {
    try {
      await axios.put(
        `http://localhost:5000/swap-request/${id}/reject`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setMessage("Swap request rejected.");
      fetchRequests();

      setTimeout(() => setMessage(""), 3000);
    } catch (err) {
      setMessage(
        err.response?.data?.message || "Something went wrong."
      );

      setTimeout(() => setMessage(""), 3000);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

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

      {/* Decorative glow */}
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
            onClick={() => navigate("/Dashboard")}
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

          {/* Navigation */}
          <div className="hidden md:flex items-center gap-8 text-sm font-medium">
            <button
              onClick={() => navigate("/Dashboard")}
              className="text-black/50 hover:text-[#11130F] transition"
            >
              Dashboard
            </button>

            <button className="text-[#11130F] font-bold">
              Swap Requests
            </button>
          </div>

          {/* Logout */}
          <button
            onClick={handleLogout}
            className="px-5 py-2.5 rounded-full bg-[#11130F] text-[#F4F5EF] text-sm font-bold hover:-translate-y-0.5 transition"
          >
            Log out
          </button>
        </div>
      </nav>

      {/* MAIN */}
      <main className="relative z-10 max-w-5xl mx-auto px-5 sm:px-8 py-10 lg:py-14">

        {/* Toast */}
        {message && (
          <div className="fixed top-24 right-5 sm:right-8 z-50">
            <div className="bg-[#11130F] text-white px-5 py-4 rounded-2xl shadow-2xl flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-[#D7F36B]" />

              <p className="text-sm font-medium">
                {message}
              </p>
            </div>
          </div>
        )}

        {/* HEADER */}
        <section className="mb-10">
          <p className="text-xs uppercase tracking-[0.2em] font-bold text-[#78911F] mb-3">
            Collaboration
          </p>

          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-5">
            <div>
              <h1 className="text-4xl sm:text-5xl font-black tracking-[-0.04em] leading-tight">
                Swap requests
              </h1>

              <p className="mt-4 text-black/50 max-w-xl leading-relaxed">
                People interested in exchanging skills with you will appear
                here.
              </p>
            </div>

            <div className="self-start sm:self-auto px-4 py-2 rounded-full bg-white/70 border border-black/10 text-sm font-bold">
              {requests.length}{" "}
              {requests.length === 1 ? "request" : "requests"}
            </div>
          </div>
        </section>

        {/* REQUESTS */}
        {requests.length === 0 ? (
          <div className="rounded-[2rem] bg-white/65 border border-black/10 p-12 sm:p-16 text-center backdrop-blur-xl">

            <div className="w-16 h-16 rounded-2xl bg-[#D7F36B] mx-auto flex items-center justify-center text-2xl mb-6">
              ↔
            </div>

            <h2 className="text-2xl font-black tracking-tight">
              No swap requests yet
            </h2>

            <p className="text-sm text-black/50 mt-3 max-w-md mx-auto leading-relaxed">
              When someone wants to exchange skills with you, their request
              will appear here.
            </p>

            <button
              onClick={() => navigate("/Dashboard")}
              className="mt-7 px-6 py-3 rounded-full bg-[#11130F] text-white text-sm font-bold hover:-translate-y-0.5 transition"
            >
              Find people to swap with →
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {requests.map((req) => (
              <RequestCard
                key={req._id}
                request={req}
                onAccept={handleAccept}
                onReject={handleReject}
              />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}

/* ---------------- REQUEST CARD ---------------- */

function RequestCard({ request, onAccept, onReject }) {
  const isPending = request.status === "pending";
  const isAccepted = request.status === "accepted";

  return (
    <div className="group bg-white/70 border border-black/10 rounded-[1.75rem] p-5 sm:p-6 backdrop-blur-xl hover:shadow-[0_20px_50px_rgba(17,19,15,0.07)] transition-all">

      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">

        {/* PERSON */}
        <div className="flex items-start gap-4">

          <div className="w-14 h-14 shrink-0 rounded-2xl bg-[#11130F] text-[#D7F36B] flex items-center justify-center text-xl font-black">
            {request.from.name.charAt(0).toUpperCase()}
          </div>

          <div className="min-w-0">

            <div className="flex flex-wrap items-center gap-2">
              <h3 className="font-black text-lg">
                {request.from.name}
              </h3>

              {isPending && (
                <span className="px-2.5 py-1 rounded-full bg-[#D7F36B]/60 border border-[#78911F]/20 text-[10px] uppercase tracking-wider font-bold text-[#596b17]">
                  New
                </span>
              )}
            </div>

            <p className="text-xs text-black/40 mt-1">
              {request.from.email}
            </p>

            {/* Skills */}
            <div className="mt-4">
              <p className="text-[10px] uppercase tracking-[0.18em] font-bold text-black/35 mb-2">
                They can teach
              </p>

              <div className="flex flex-wrap gap-2">
                {request.from.skillsOffered.map((skill, index) => (
                  <span
                    key={index}
                    className="px-3 py-1.5 rounded-full bg-[#D7F36B]/50 border border-[#78911F]/15 text-xs font-semibold"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ACTIONS */}
        <div className="flex flex-wrap items-center gap-3 lg:shrink-0">

          {isPending ? (
            <>
              <button
                onClick={() => onAccept(request._id)}
                className="flex-1 sm:flex-none px-6 py-3 rounded-xl bg-[#11130F] text-white text-sm font-bold hover:bg-[#78911F] transition"
              >
                Accept
              </button>

              <button
                onClick={() => onReject(request._id)}
                className="flex-1 sm:flex-none px-6 py-3 rounded-xl border border-black/10 bg-white text-sm font-bold text-black/55 hover:text-red-600 hover:border-red-200 transition"
              >
                Reject
              </button>
            </>
          ) : (
            <span
              className={`px-5 py-3 rounded-xl text-sm font-bold ${
                isAccepted
                  ? "bg-[#D7F36B]/60 text-[#596b17]"
                  : "bg-black/[0.04] text-black/45"
              }`}
            >
              {isAccepted ? "Accepted ✓" : "Rejected"}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

export default SwapRequests;