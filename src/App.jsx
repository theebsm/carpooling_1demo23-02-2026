// src/App.jsx
import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar";
import SearchCard from "./components/SearchCard";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import PostRide from "./pages/PostRide";

export default function App() {
  // Unified state for the SearchCard
  const [searchData, setSearchData] = useState({
    from: "",
    to: "",
    date: "",
    time: "",
    passengers: 1,
  });

  // Handler for search action
  const handleSearch = (data) => {
    alert(
      `Searching rides from ${data.from} to ${data.to} for ${data.passengers} passenger(s) on ${data.date} 🚀`
    );
  };

  return (
    <BrowserRouter>
      <div className="font-sans">
        {/* Navbar */}
        <NavBar />

        {/* Hero Section */}
        <section className="relative min-h-[550px] flex items-center justify-center text-center pt-24 bg-slate-900 overflow-visible">
          <div className="relative z-10 max-w-xl text-white">
            <h1 className="text-4xl font-bold flex items-center justify-center gap-2">
              <i className="fa-solid fa-car-side"></i>
              Find a Ride. Save Money.
            </h1>
            <p className="mt-4 text-lg text-slate-300">
              Eco-friendly and cost-effective way of travelling.
            </p>

            {/* Reusable SearchCard */}
            <SearchCard
              searchData={searchData}
              setSearchData={setSearchData}
              onSearch={handleSearch}
            />
          </div>
        </section>

        {/* Routes */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/post-ride" element={<PostRide />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}
