import { BrowserRouter, Routes, Route } from "react-router-dom"
import Login from "./pages/Login"
import Register from "./pages/Register"
import Dashboard from "./pages/Dashboard"
import SwapRequests from "./pages/SwapRequests"
import Ratings from "./pages/Ratings"
import Home from "./pages/Home"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/swap-requests" element={<SwapRequests />} />
        <Route path="/ratings/:userId" element={<Ratings />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App