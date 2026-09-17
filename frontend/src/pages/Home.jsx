import React, { useState } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"

const Home = () => {
  const [authModal, setAuthModal] = useState(null)

  return (
    <div className="min-h-screen overflow-hidden bg-[#F4F5EF] text-[#11130F]">

      {/* ================= BACKGROUND GRID ================= */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.35]"
        style={{
          backgroundImage:
            "linear-gradient(#11130F 1px, transparent 1px), linear-gradient(90deg, #11130F 1px, transparent 1px)",
          backgroundSize: "80px 80px",
          maskImage:
            "linear-gradient(to bottom, black 0%, transparent 80%)",
        }}
      />

      {/* ================= NAVBAR ================= */}
      <header className="relative z-20">
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-6 lg:px-8">

          {/* Logo */}
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="flex items-center gap-2.5 text-xl font-bold tracking-[-0.04em]"
          >
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#11130F] text-sm font-bold text-[#D7F36B]">
              S
            </span>

            Skill Swap
          </button>

          {/* Center nav */}
          <div className="hidden items-center gap-8 text-sm font-medium text-black/55 md:flex">
            <a
              href="#how-it-works"
              className="transition hover:text-black"
            >
              How it works
            </a>

            <a
              href="#discover"
              className="transition hover:text-black"
            >
              Discover skills
            </a>

            <a
              href="#community"
              className="transition hover:text-black"
            >
              Community
            </a>
          </div>

          {/* Auth buttons */}
          <div className="flex items-center gap-4">

            <button
              onClick={() => setAuthModal("login")}
              className="hidden text-sm font-medium text-black/60 transition hover:text-black sm:block"
            >
              Log in
            </button>

            <button
              onClick={() => setAuthModal("register")}
              className="rounded-full bg-[#11130F] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#292B25]"
            >
              Get started
            </button>

          </div>
        </nav>
      </header>

      {/* ================= MAIN ================= */}
      <main className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8">

        {/* ================= HERO ================= */}
        <section className="grid min-h-[calc(100vh-88px)] items-center gap-12 py-12 lg:grid-cols-[1fr_0.9fr] lg:gap-20 lg:py-16">

          {/* LEFT */}
          <div className="max-w-2xl">

            <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-black/10 bg-white/60 px-3.5 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-black/55 backdrop-blur">
              <span className="h-2 w-2 rounded-full bg-[#A4C43C]" />
              Skill exchange platform
            </div>

            <h1 className="text-[clamp(3.5rem,6.5vw,6.8rem)] font-bold leading-[0.88] tracking-[-0.075em]">
              Learn.
              <br />
              Teach.
              <br />
              <span className="text-[#78911F]">
                Grow.
              </span>
            </h1>

            <p className="mt-8 max-w-lg text-base leading-7 text-black/55 sm:text-lg">
              Trade what you know for what you want to learn. Connect with
              people who have the skills you need and teach them something in
              return.
            </p>

            {/* CTA */}
            <div className="mt-9 flex flex-wrap items-center gap-3">

              <button
                onClick={() => setAuthModal("register")}
                className="group flex items-center gap-3 rounded-full bg-[#11130F] px-6 py-3.5 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-[#292B25]"
              >
                Find your match

                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#D7F36B] text-xs text-black transition-transform group-hover:translate-x-0.5">
                  →
                </span>
              </button>

              <a
                href="#how-it-works"
                className="rounded-full border border-black/15 bg-white/50 px-6 py-3.5 text-sm font-semibold transition hover:bg-white"
              >
                See how it works
              </a>

            </div>

            {/* Stats */}
            <div className="mt-12 flex items-center gap-8 border-t border-black/10 pt-6">

              <div>
                <p className="text-xl font-bold tracking-tight">
                  2.4K+
                </p>
                <p className="mt-1 text-xs text-black/45">
                  Skills shared
                </p>
              </div>

              <div className="h-8 w-px bg-black/10" />

              <div>
                <p className="text-xl font-bold tracking-tight">
                  1.8K+
                </p>
                <p className="mt-1 text-xs text-black/45">
                  Connections
                </p>
              </div>

              <div className="h-8 w-px bg-black/10" />

              <div>
                <p className="text-xl font-bold tracking-tight">
                  100%
                </p>
                <p className="mt-1 text-xs text-black/45">
                  Free to swap
                </p>
              </div>

            </div>

          </div>

          {/* ================= RIGHT VISUAL ================= */}
          <div
            id="discover"
            className="relative mx-auto w-full max-w-[570px]"
          >

            <div className="absolute -right-10 top-0 h-32 w-32 rounded-full border border-black/10" />

            <div className="absolute -right-3 top-7 h-4 w-4 rounded-full bg-[#D7F36B]" />

            {/* Main Card */}
            <div className="relative rotate-[1.5deg] rounded-[2rem] border border-black/10 bg-white p-5 shadow-[0_30px_80px_rgba(20,25,10,0.12)] sm:p-7">

              {/* Header */}
              <div className="flex items-center justify-between border-b border-black/10 pb-5">

                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.16em] text-black/40">
                    Your exchange
                  </p>

                  <p className="mt-1 text-lg font-bold">
                    Find your match
                  </p>
                </div>

                <div className="rounded-full bg-[#EEF5D5] px-3 py-1.5 text-xs font-semibold text-[#667D1C]">
                  Live
                </div>

              </div>

              {/* Teach */}
              <div className="mt-6 rounded-2xl bg-[#F1F2EC] p-5">

                <div className="flex items-center justify-between">

                  <span className="text-xs font-semibold uppercase tracking-[0.15em] text-black/40">
                    You teach
                  </span>

                  <span className="text-xs text-black/35">
                    2 skills
                  </span>

                </div>

                <div className="mt-4 flex flex-wrap gap-2">

                  <span className="rounded-full bg-white px-4 py-2 text-sm font-semibold shadow-sm">
                    React
                  </span>

                  <span className="rounded-full bg-white px-4 py-2 text-sm font-semibold shadow-sm">
                    JavaScript
                  </span>

                </div>

              </div>

              {/* Exchange */}
              <div className="relative flex h-16 items-center justify-center">

                <div className="absolute h-px w-full bg-black/10" />

                <div className="relative flex h-11 w-11 items-center justify-center rounded-full border border-black/10 bg-white text-lg shadow-sm">
                  ↕
                </div>

              </div>

              {/* Want */}
              <div className="rounded-2xl bg-[#11130F] p-5 text-white">

                <div className="flex items-center justify-between">

                  <span className="text-xs font-semibold uppercase tracking-[0.15em] text-white/40">
                    You want
                  </span>

                  <span className="text-xs text-white/35">
                    2 skills
                  </span>

                </div>

                <div className="mt-4 flex flex-wrap gap-2">

                  <span className="rounded-full bg-white/10 px-4 py-2 text-sm font-semibold">
                    Spanish
                  </span>

                  <span className="rounded-full bg-white/10 px-4 py-2 text-sm font-semibold">
                    Guitar
                  </span>

                </div>

              </div>

              {/* Match */}
              <div className="mt-5 flex items-center justify-between rounded-2xl border border-[#D7F36B]/60 bg-[#F7FBE9] p-4">

                <div className="flex items-center gap-3">

                  <div className="flex -space-x-2">

                    <div className="flex h-9 w-9 items-center justify-center rounded-full border-2 border-white bg-[#C5A58A] text-xs font-bold">
                      A
                    </div>

                    <div className="flex h-9 w-9 items-center justify-center rounded-full border-2 border-white bg-[#8997AD] text-xs font-bold text-white">
                      R
                    </div>

                  </div>

                  <div>
                    <p className="text-sm font-bold">
                      Perfect match
                    </p>

                    <p className="text-xs text-black/45">
                      Alex wants to learn React
                    </p>
                  </div>

                </div>

                <span className="text-lg font-bold text-[#667D1C]">
                  94%
                </span>

              </div>

            </div>

            {/* Floating Profile */}
            <div className="absolute -bottom-8 -left-7 hidden w-52 -rotate-3 rounded-2xl border border-black/10 bg-[#11130F] p-4 text-white shadow-2xl sm:block">

              <div className="flex items-center gap-3">

                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#D7F36B] font-bold text-black">
                  M
                </div>

                <div>
                  <p className="text-sm font-semibold">
                    Maya, 21
                  </p>

                  <p className="text-xs text-white/40">
                    Delhi
                  </p>
                </div>

              </div>

              <div className="mt-4 flex items-center justify-between">

                <span className="text-xs text-white/45">
                  Can teach
                </span>

                <span className="text-xs font-medium text-[#D7F36B]">
                  UI Design
                </span>

              </div>

            </div>

            {/* Floating Badge */}
            <div className="absolute -right-5 bottom-16 hidden rotate-3 rounded-full border border-black/10 bg-[#D7F36B] px-4 py-2.5 text-xs font-bold shadow-lg sm:block">
              + 24 new skills today
            </div>

          </div>

        </section>

        {/* ================= HOW IT WORKS ================= */}
        <section
          id="how-it-works"
          className="border-t border-black/10 py-20 sm:py-28"
        >

          <div className="grid gap-10 md:grid-cols-[0.7fr_1.3fr]">

            <div>

              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-black/40">
                How it works
              </p>

              <h2 className="mt-4 max-w-md text-4xl font-bold leading-tight tracking-[-0.05em] sm:text-5xl">
                Your knowledge is worth something.
              </h2>

            </div>

            <div className="grid gap-4 sm:grid-cols-3">

              <div className="rounded-3xl border border-black/10 bg-white/60 p-6">

                <span className="text-sm font-bold text-black/30">
                  01
                </span>

                <h3 className="mt-10 text-lg font-bold">
                  List your skills
                </h3>

                <p className="mt-3 text-sm leading-6 text-black/50">
                  Tell people what you can teach and what you want to learn.
                </p>

              </div>

              <div className="rounded-3xl border border-black/10 bg-[#11130F] p-6 text-white">

                <span className="text-sm font-bold text-white/30">
                  02
                </span>

                <h3 className="mt-10 text-lg font-bold">
                  Find a match
                </h3>

                <p className="mt-3 text-sm leading-6 text-white/45">
                  Discover people whose skills complement yours.
                </p>

              </div>

              <div className="rounded-3xl border border-black/10 bg-[#D7F36B] p-6">

                <span className="text-sm font-bold text-black/35">
                  03
                </span>

                <h3 className="mt-10 text-lg font-bold">
                  Start swapping
                </h3>

                <p className="mt-3 text-sm leading-6 text-black/55">
                  Teach, learn and grow together. No money required.
                </p>

              </div>

            </div>

          </div>

        </section>

        {/* ================= COMMUNITY PLACEHOLDER ================= */}
        <section
          id="community"
          className="border-t border-black/10 py-20"
        >
          <div className="rounded-[2rem] bg-[#11130F] p-8 text-white sm:p-12">

            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-white/40">
              Skill Swap community
            </p>

            <div className="mt-5 flex flex-col justify-between gap-8 md:flex-row md:items-end">

              <h2 className="max-w-2xl text-4xl font-bold leading-tight tracking-[-0.05em] sm:text-5xl">
                Everyone knows something
                <span className="text-[#D7F36B]"> worth sharing.</span>
              </h2>

              <button
                onClick={() => setAuthModal("register")}
                className="group flex w-fit items-center gap-3 rounded-full bg-[#D7F36B] px-6 py-3.5 text-sm font-bold text-black transition hover:-translate-y-0.5"
              >
                Join the community

                <span className="transition-transform group-hover:translate-x-1">
                  →
                </span>
              </button>

            </div>

          </div>
        </section>

      </main>

      {/* ========================================================= */}
      {/* ===================== LOGIN MODAL ======================= */}
      {/* ========================================================= */}

      {authModal === "login" && (
        <LoginModal
          onClose={() => setAuthModal(null)}
          onRegister={() => setAuthModal("register")}
        />
      )}

      {/* ========================================================= */}
      {/* =================== REGISTER MODAL ====================== */}
      {/* ========================================================= */}

      {authModal === "register" && (
        <RegisterModal
          onClose={() => setAuthModal(null)}
          onLogin={() => setAuthModal("login")}
        />
      )}

    </div>
  )
}


/* ============================================================= */
/* ====================== LOGIN MODAL ========================== */
/* ============================================================= */

const LoginModal = ({ onClose, onRegister }) => {

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

      setError(
        err.response?.data?.message ||
        "Something went wrong. Please try again."
      )

    }
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/25 p-4 backdrop-blur-md"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) {
          onClose()
        }
      }}
    >

      {/* Glass Card */}
      <div className="relative w-full max-w-md animate-[authPop_0.25s_ease-out] rounded-[2rem] border border-white/70 bg-white/75 p-7 shadow-[0_30px_100px_rgba(0,0,0,0.18)] backdrop-blur-2xl sm:p-8">

        {/* Close */}
        <button
          onClick={onClose}
          className="absolute right-5 top-5 flex h-9 w-9 items-center justify-center rounded-full border border-black/10 bg-white/50 text-lg text-black/50 transition hover:bg-white hover:text-black"
        >
          ×
        </button>

        {/* Header */}
        <div className="pr-10">

          <div className="mb-5 flex h-10 w-10 items-center justify-center rounded-full bg-[#D7F36B] text-sm font-bold">
            S
          </div>

          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-black/35">
            Welcome back
          </p>

          <h2 className="mt-2 text-3xl font-bold tracking-[-0.045em]">
            Log in to Skill Swap
          </h2>

          <p className="mt-2 text-sm text-black/45">
            Continue where you left off.
          </p>

        </div>

        {/* Error */}
        {error && (
          <div className="mt-5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
            {error}
          </div>
        )}

        {/* Form */}
        <div className="mt-7 space-y-4">

          {/* Email */}
          <div>

            <label className="mb-2 block text-xs font-semibold text-black/45">
              Email
            </label>

            <input
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-xl border border-black/10 bg-white/60 px-4 py-3.5 text-sm outline-none transition placeholder:text-black/25 focus:border-[#78911F] focus:bg-white"
            />

          </div>

          {/* Password */}
          <div>

            <label className="mb-2 block text-xs font-semibold text-black/45">
              Password
            </label>

            <input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleLogin()
                }
              }}
              className="w-full rounded-xl border border-black/10 bg-white/60 px-4 py-3.5 text-sm outline-none transition placeholder:text-black/25 focus:border-[#78911F] focus:bg-white"
            />

          </div>

          {/* Login Button */}
          <button
            onClick={handleLogin}
            className="group mt-2 flex w-full items-center justify-center gap-3 rounded-xl bg-[#11130F] py-3.5 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-[#292B25]"
          >
            Log in

            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#D7F36B] text-xs text-black transition-transform group-hover:translate-x-0.5">
              →
            </span>

          </button>

        </div>

        {/* Switch */}
        <div className="mt-6 border-t border-black/10 pt-5 text-center">

          <p className="text-sm text-black/45">
            Don't have an account?{" "}

            <button
              onClick={onRegister}
              className="font-semibold text-[#667D1C] hover:underline"
            >
              Create one
            </button>

          </p>

        </div>

      </div>
    </div>
  )
}


/* ============================================================= */
/* ==================== REGISTER MODAL ========================= */
/* ============================================================= */

const RegisterModal = ({ onClose, onLogin }) => {

  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [skillsOffered, setSkillsOffered] = useState("")
  const [skillsWanted, setSkillsWanted] = useState("")
  const [error, setError] = useState("")

  const handleRegister = async () => {

    try {

      await axios.post("http://localhost:5000/register", {
        name,
        email,
        password,
        skillsOffered: skillsOffered
          .split(",")
          .map(s => s.trim()),

        skillsWanted: skillsWanted
          .split(",")
          .map(s => s.trim())
      })

      onLogin()

    } catch (err) {

      setError(
        err.response?.data?.message ||
        "Something went wrong. Please try again."
      )

    }
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black/25 p-4 py-8 backdrop-blur-md"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) {
          onClose()
        }
      }}
    >

      {/* Glass Card */}
      <div className="relative my-auto w-full max-w-xl animate-[authPop_0.25s_ease-out] rounded-[2rem] border border-white/70 bg-white/75 p-6 shadow-[0_30px_100px_rgba(0,0,0,0.18)] backdrop-blur-2xl sm:p-8">

        {/* Close */}
        <button
          onClick={onClose}
          className="absolute right-5 top-5 flex h-9 w-9 items-center justify-center rounded-full border border-black/10 bg-white/50 text-lg text-black/50 transition hover:bg-white hover:text-black"
        >
          ×
        </button>

        {/* Header */}
        <div className="pr-10">

          <div className="mb-5 flex h-10 w-10 items-center justify-center rounded-full bg-[#D7F36B] text-sm font-bold">
            S
          </div>

          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-black/35">
            Get started
          </p>

          <h2 className="mt-2 text-3xl font-bold tracking-[-0.045em]">
            Create your account
          </h2>

          <p className="mt-2 text-sm text-black/45">
            Join people learning by teaching.
          </p>

        </div>

        {/* Error */}
        {error && (
          <div className="mt-5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
            {error}
          </div>
        )}

        {/* Form */}
        <div className="mt-6 space-y-4">

          {/* Name */}
          <div>

            <label className="mb-2 block text-xs font-semibold text-black/45">
              Full name
            </label>

            <input
              type="text"
              placeholder="Himanshu Sharma"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full rounded-xl border border-black/10 bg-white/60 px-4 py-3.5 text-sm outline-none transition placeholder:text-black/25 focus:border-[#78911F] focus:bg-white"
            />

          </div>

          {/* Email */}
          <div>

            <label className="mb-2 block text-xs font-semibold text-black/45">
              Email
            </label>

            <input
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-xl border border-black/10 bg-white/60 px-4 py-3.5 text-sm outline-none transition placeholder:text-black/25 focus:border-[#78911F] focus:bg-white"
            />

          </div>

          {/* Password */}
          <div>

            <label className="mb-2 block text-xs font-semibold text-black/45">
              Password
            </label>

            <input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-xl border border-black/10 bg-white/60 px-4 py-3.5 text-sm outline-none transition placeholder:text-black/25 focus:border-[#78911F] focus:bg-white"
            />

          </div>

          {/* Skills */}
          <div className="grid gap-4 sm:grid-cols-2">

            {/* Offered */}
            <div>

              <label className="mb-2 block text-xs font-semibold text-black/45">
                Skills you can teach
              </label>

              <input
                type="text"
                placeholder="React, Python, C++"
                value={skillsOffered}
                onChange={(e) => setSkillsOffered(e.target.value)}
                className="w-full rounded-xl border border-black/10 bg-white/60 px-4 py-3.5 text-sm outline-none transition placeholder:text-black/25 focus:border-[#78911F] focus:bg-white"
              />

              <p className="mt-1.5 text-[11px] text-black/30">
                Separate with commas
              </p>

            </div>

            {/* Wanted */}
            <div>

              <label className="mb-2 block text-xs font-semibold text-black/45">
                Skills you want
              </label>

              <input
                type="text"
                placeholder="Spanish, Guitar"
                value={skillsWanted}
                onChange={(e) => setSkillsWanted(e.target.value)}
                className="w-full rounded-xl border border-black/10 bg-white/60 px-4 py-3.5 text-sm outline-none transition placeholder:text-black/25 focus:border-[#78911F] focus:bg-white"
              />

              <p className="mt-1.5 text-[11px] text-black/30">
                Separate with commas
              </p>

            </div>

          </div>

          {/* Register */}
          <button
            onClick={handleRegister}
            className="group mt-2 flex w-full items-center justify-center gap-3 rounded-xl bg-[#11130F] py-3.5 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-[#292B25]"
          >
            Create account

            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#D7F36B] text-xs text-black transition-transform group-hover:translate-x-0.5">
              →
            </span>

          </button>

        </div>

        {/* Switch */}
        <div className="mt-6 border-t border-black/10 pt-5 text-center">

          <p className="text-sm text-black/45">
            Already have an account?{" "}

            <button
              onClick={onLogin}
              className="font-semibold text-[#667D1C] hover:underline"
            >
              Log in
            </button>

          </p>

        </div>

      </div>
    </div>
  )
}


export default Home