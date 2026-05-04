import SeatSelection from "./pages/SeatSelection";
import Home from "./pages/Home";
import Movies from "./pages/Movies";
import Bookings from "./pages/Bookings";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Admin from "./pages/Admin";
import Checkout from "./pages/Checkout";
import { BrowserRouter, Routes, Route, Link, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";

function App() {
  const [user, setUser] = useState(null);

useEffect(() => {
  const storedUser = localStorage.getItem("user");
  if (storedUser) {
    setUser(JSON.parse(storedUser));
  }
}, []);
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-zinc-950 text-white">
        <nav className="sticky top-0 z-50 backdrop-blur bg-zinc-950/80 border-b border-zinc-800">
  <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
    
    <Link to="/">
  <h1 className="text-2xl font-black text-white cursor-pointer">
    Cine<span className="text-red-500">Verse</span>
  </h1>
</Link>

    <div className="flex items-center gap-6 text-sm md:text-base">
      <Link to="/" className="text-zinc-300 hover:text-white transition">
        Home
      </Link>

      <Link to="/movies" className="text-zinc-300 hover:text-white transition">
        Movies
      </Link>

      <Link to="/bookings" className="text-zinc-300 hover:text-white transition">
        Bookings
      </Link>

      {user ? (
  <div className="flex items-center gap-4">
    <span className="text-zinc-300">
      Welcome,{" "}
      {user.name}
    </span>

    <button
      onClick={() => {
  localStorage.removeItem("user");
  localStorage.removeItem("token");
  setUser(null);
  window.location.href = "/login";
}}
      className="px-4 py-2 bg-red-600 hover:bg-red-700 rounded-lg text-white font-medium transition"
    >
      Logout
    </button>
  </div>
) : (
  <Link
    to="/login"
    className="px-4 py-2 bg-red-600 hover:bg-red-700 rounded-lg text-white font-medium transition"
  >
    Login
  </Link>
)}
    </div>
  </div>
</nav>

        <Routes>
          <Route path="/seat/:id" element={<SeatSelection />} />
          <Route path="/" element={<Home />} />
          <Route path="/movies" element={<Movies />} />
          <Route path="/bookings" element={<Bookings />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/checkout" element={<Checkout />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;