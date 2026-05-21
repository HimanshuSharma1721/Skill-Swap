import { useNavigate } from "react-router-dom"

function Home() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen relative overflow-hidden" style={{ backgroundColor: "#1A1A2E" }}>

      {/* Glow effects */}
      <div style={{
        position: "absolute", width: "500px", height: "500px",
        borderRadius: "50%", backgroundColor: "#A78BFA",
        filter: "blur(150px)", opacity: 0.1, top: "-10%", right: "10%", pointerEvents: "none"
      }} />
      <div style={{
        position: "absolute", width: "500px", height: "500px",
        borderRadius: "50%", backgroundColor: "#F472B6",
        filter: "blur(150px)", opacity: 0.1, bottom: "-10%", left: "10%" , pointerEvents: "none"
      }} />

      {/* Navbar */}
      <nav style={{
        backgroundColor: "rgba(42,42,62,0.8)",
        backdropFilter: "blur(10px)",
        borderBottom: "1px solid rgba(255,255,255,0.05)"
      }} className="sticky top-0 z-50 flex items-center justify-between px-12 py-4">
        <h1 className="text-2xl font-bold">
          <span style={{ color: "#A78BFA" }}>Skill</span>
          <span style={{ color: "#F472B6" }}>-Swap.</span>
        </h1>
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate("/login")}
            className="text-gray-400 hover:text-white transition font-semibold">
            Login
          </button>
          <button
            onClick={() => navigate("/register")}
            className="px-5 py-2 rounded-full text-sm font-bold text-white"
            style={{ background: "linear-gradient(90deg, #7C3AED, #BE185D)" }}>
            Get Started 🚀
          </button>
        </div>
      </nav>

      
      {/* Hero Section */}
<div className="relative z-10 flex items-center justify-between px-12 py-16">
  
  {/* Left side - Text */}
  <div className="flex flex-col items-start text-left max-w-2xl">
    <div className="inline-block px-4 py-2 rounded-full text-sm font-semibold mb-6"
      style={{ backgroundColor: "rgba(124,58,237,0.2)", color: "#A78BFA", border: "1px solid rgba(124,58,237,0.3)" }}>
      ✨ The Future of Skill Sharing
    </div>

    <h1 className="text-7xl font-bold text-white mb-6 leading-tight">
      Swap Skills,<br />
      <span style={{
        background: "linear-gradient(90deg, #A78BFA, #F472B6)",
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
        display: "inline-block"
      }}>
        Grow Together
      </span>
    </h1>

    <p className="text-gray-400 text-xl mb-10">
      Connect with people who have the skills you want and want the skills you have. No money needed — just knowledge! 🧠
    </p>

    <div className="flex gap-4">
      <button
        onClick={() => navigate("/register")}
        className="px-8 py-4 rounded-full font-bold text-white text-lg"
        style={{ background: "linear-gradient(90deg, #7C3AED, #BE185D)" }}>
        Start Swapping 🚀
      </button>
      <button
        onClick={() => navigate("/login")}
        className="px-8 py-4 rounded-full font-bold text-lg"
        style={{ backgroundColor: "rgba(255,255,255,0.05)", color: "#fff", border: "1px solid rgba(255,255,255,0.1)" }}>
        Login
      </button>
    </div>
  </div>

  {/* Right side - Image */}
  <div className="relative" style={{ width: "450px", height: "450px", flexShrink: 0 }}>
    <div style={{
      position: "absolute", inset: 0,
      borderRadius: "30px",
      background: "linear-gradient(135deg, rgba(124,58,237,0.3), rgba(190,24,93,0.3))",
      border: "1px solid rgba(255,255,255,0.1)",
      overflow: "hidden"
    }}>
      <img
        src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=600"
        alt="People collaborating"
        style={{
          width: "100%", height: "100%",
          objectFit: "cover", opacity: 0.7,
          mixBlendMode: "luminosity"
        }}
      />
      {/* Overlay gradient */}
      <div style={{
        position: "absolute", inset: 0,
        background: "linear-gradient(135deg, rgba(124,58,237,0.4), rgba(190,24,93,0.2))"
      }} />
    </div>

    {/* Floating cards */}
    <div className="absolute -left-8 top-8 px-4 py-3 rounded-2xl"
      style={{ backgroundColor: "#2A2A3E", border: "1px solid rgba(255,255,255,0.1)" }}>
      <p className="text-xs text-gray-400">Skills Offered</p>
      <p className="text-white font-bold text-sm">JavaScript 🚀</p>
    </div>

    <div className="absolute -right-8 bottom-8 px-4 py-3 rounded-2xl"
      style={{ backgroundColor: "#2A2A3E", border: "1px solid rgba(255,255,255,0.1)" }}>
      <p className="text-xs text-gray-400">Skills Wanted</p>
      <p className="text-white font-bold text-sm">React ⚛️</p>
    </div>
  </div>

</div>

      {/* How it works */}
      <div className="relative z-10 px-12 py-20">
        <h2 className="text-4xl font-bold text-white text-center mb-4">How it works</h2>
        <p className="text-gray-400 text-center mb-16">Three simple steps to start swapping skills</p>

        <div className="grid grid-cols-3 gap-8">

          {[
            { step: "01", title: "Create Profile", desc: "Sign up and list the skills you offer and the skills you want to learn.", icon: "👤" },
            { step: "02", title: "Find Matches", desc: "Our algorithm matches you with people who have what you need and need what you have.", icon: "🎯" },
            { step: "03", title: "Start Swapping", desc: "Send a swap request, connect and start learning from each other!", icon: "🤝" }
          ].map((item, i) => (
            <div key={i} className="p-8 rounded-2xl relative overflow-hidden"
              style={{
                backgroundColor: "#2A2A3E",
                border: "1px solid rgba(255,255,255,0.05)"
              }}>
              <span className="text-7xl font-bold absolute top-2 right-4 opacity-10 text-white">{item.step}</span>
              <div className="text-4xl mb-4">{item.icon}</div>
              <h3 className="text-white text-xl font-bold mb-2">{item.title}</h3>
              <p className="text-gray-400 text-sm">{item.desc}</p>
            </div>
          ))}

        </div>
      </div>

      {/* CTA Section */}
      <div className="relative z-10 px-12 py-20 text-center">
        <div className="p-16 rounded-3xl" style={{
          background: "linear-gradient(135deg, rgba(124,58,237,0.2), rgba(190,24,93,0.2))",
          border: "1px solid rgba(255,255,255,0.05)"
        }}>
          <h2 className="text-4xl font-bold text-white mb-4">Ready to start swapping? 🚀</h2>
          <p className="text-gray-400 mb-8">Join thousands of people already swapping skills!</p>
          <button
            onClick={() => navigate("/register")}
            className="px-10 py-4 rounded-full font-bold text-white text-lg"
            style={{ background: "linear-gradient(90deg, #7C3AED, #BE185D)" }}>
            Get Started for Free
          </button>
        </div>
      </div>

      {/* Footer */}
      <footer className="relative z-10 text-center py-8" style={{ borderTop: "1px solid rgba(255,255,255,0.05)" }}>
        <p className="text-gray-500 text-sm">
          Made with ❤️ by Himanshu — Skill-Swap 2025
        </p>
      </footer>

    </div>
  )
}

export default Home