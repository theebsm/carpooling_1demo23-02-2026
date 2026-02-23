import React from "react";
import { Link } from "react-router-dom";

export default function NavBar() {
  return (
    <div className="fixed top-0 w-full bg-black text-white flex justify-between items-center px-8 py-4 shadow-lg z-50">

      <div className="text-2xl font-bold flex items-center gap-2">
        <i className="fa-solid fa-car-side"></i>
        RideShare
      </div>

      <div className="flex gap-8 text-lg font-medium">
        <Link to="/" className="hover:text-pink-400 transition">Home</Link>
        <Link to="/post-ride" className="hover:text-pink-400 transition">Post Ride</Link>
        <Link to="/login" className="hover:text-pink-400 transition">Login</Link>
        <Link to="/register" className="hover:text-pink-400 transition">Register</Link>
        <Link to="/profile">Profile</Link>
      </div>
    </div>
  );
}
