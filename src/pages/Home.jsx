// src/pages/Home.jsx
import React from "react";
import { Link } from "react-router-dom";
import AnimatedShape from "../components/AnimatedShape";
import SearchCard from "../components/SearchCard"; // Reusing your App.jsx SearchCard

export default function Home() {
  // Configure animated shapes in an array
  const shapes = [
    { size: 40, top: 10, left: 10, delay: 0, duration: 8, shape: "circle" },
    { size: 60, top: 30, left: 70, delay: 2, duration: 12, shape: "blob", color: "rgba(255,255,255,0.2)" },
    { size: 30, top: 50, left: 40, delay: 4, duration: 10, shape: "triangle", color: "rgba(255,255,255,0.25)" },
    { size: 20, top: 20, left: 80, delay: 1, duration: 6, shape: "circle" },
    { size: 50, top: 65, left: 25, delay: 3, duration: 14, shape: "blob", color: "rgba(255,255,255,0.15)" },
    { size: 25, top: 75, left: 60, delay: 5, duration: 9, shape: "triangle", color: "rgba(255,255,255,0.2)" },
  ];

  return (
    <div className="min-h-screen relative pt-16"> {/* pt-16 for fixed NavBar */}

      {/* Background Image */}
      <img
        src="https://images.unsplash.com/photo-1502877338535-766e1452684a?auto=format&fit=crop&w=1950&q=80"
        alt="Carpool Sweden"
        className="absolute inset-0 w-full h-full object-cover z-0"
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-black/60 to-black/30 z-10"></div>

      {/* Animated Shapes */}
      {shapes.map((shape, i) => (
        <AnimatedShape key={i} {...shape} />
      ))}

      {/* Hero Content */}
      <div className="relative z-30 flex flex-col items-center justify-center text-center px-4 py-32">
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 drop-shadow-lg">
          Travel Across Sweden with CarPool 🚗
        </h1>
        <p className="text-lg md:text-xl text-white mb-8 drop-shadow-md">
          Find rides, share rides, and save money while traveling safely
        </p>

        {/* Search Card */}
        <SearchCard />

        {/* Quick Post Ride Button */}
        <div className="mt-6">
          <Link
            to="/post-ride"
            className="bg-green-600 text-white px-6 py-3 rounded hover:bg-green-700 transition"
          >
            Post a Ride
          </Link>
        </div>
      </div>
    </div>
  );
}
