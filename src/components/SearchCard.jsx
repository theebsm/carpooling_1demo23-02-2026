import React, { useState } from "react";

export default function SearchCard({ searchData = {}, setSearchData = () => {}, onSearch = () => {} }) {
  const [showDropdown, setShowDropdown] = useState(false);

  const changePassenger = (value) => {
    let newCount = (searchData.passengers || 1) + value;
    if (newCount < 1) newCount = 1;
    if (newCount > 6) newCount = 6;
    setSearchData({ ...searchData, passengers: newCount });
  };

  const swapLocations = () => {
    setSearchData({ ...searchData, from: searchData.to || "", to: searchData.from || "" });
  };

  const validateSearch = () => {
    if (!searchData.from || !searchData.to || !searchData.date || !searchData.time) {
      alert("Please fill all fields 🚗");
      return;
    }
    onSearch(searchData);
  };

  return (
    <div className="mt-10 bg-white rounded-2xl shadow-2xl p-4 flex flex-wrap gap-3 items-center justify-center max-w-5xl mx-auto transition-all">
      {/* From */}
      <div className="flex items-center gap-2 bg-slate-100 px-4 py-3 rounded-full hover:bg-slate-200 transition w-full sm:w-auto flex-1 min-w-[120px]">
        <i className="fa-solid fa-location-dot text-pink-500"></i>
        <input
          type="text"
          placeholder="Leaving from"
          className="bg-transparent outline-none text-sm w-full"
          value={searchData.from || ""}
          onChange={(e) => setSearchData({ ...searchData, from: e.target.value })}
        />
      </div>

      {/* Swap */}
      <button
        onClick={swapLocations}
        aria-label="Swap locations"
        className="w-10 h-10 rounded-full border-2 border-pink-500 text-pink-500 transition hover:rotate-180 hover:scale-110 flex items-center justify-center"
      >
        <i className="fa-solid fa-right-left"></i>
      </button>

      {/* To */}
      <div className="flex items-center gap-2 bg-slate-100 px-4 py-3 rounded-full hover:bg-slate-200 transition w-full sm:w-auto flex-1 min-w-[120px]">
        <i className="fa-solid fa-location-arrow text-pink-500"></i>
        <input
          type="text"
          placeholder="Going to"
          className="bg-transparent outline-none text-sm w-full"
          value={searchData.to || ""}
          onChange={(e) => setSearchData({ ...searchData, to: e.target.value })}
        />
      </div>

      {/* Date */}
      <div className="flex items-center gap-2 bg-slate-100 px-4 py-3 rounded-full hover:bg-slate-200 transition w-full sm:w-auto flex-1 min-w-[120px]">
        <i className="fa-solid fa-calendar-days text-pink-500"></i>
        <input
          type="date"
          className="bg-transparent outline-none text-sm w-full"
          value={searchData.date || ""}
          onChange={(e) => setSearchData({ ...searchData, date: e.target.value })}
        />
      </div>

      {/* Time */}
      <div className="flex items-center gap-2 bg-slate-100 px-4 py-3 rounded-full hover:bg-slate-200 transition w-full sm:w-auto flex-1 min-w-[120px]">
        <i className="fa-solid fa-clock text-pink-500"></i>
        <input
          type="time"
          className="bg-transparent outline-none text-sm w-full"
          value={searchData.time || ""}
          onChange={(e) => setSearchData({ ...searchData, time: e.target.value })}
        />
      </div>

      {/* Passengers */}
      <div className="relative w-full sm:w-auto flex-1 min-w-[120px]">
        <div
          onClick={() => setShowDropdown(!showDropdown)}
          className="flex items-center gap-2 bg-slate-100 px-4 py-3 rounded-full cursor-pointer"
        >
          <i className="fa-solid fa-user text-pink-500"></i>
          <span className="text-sm text-slate-600">
            {searchData.passengers || 1} passenger{(searchData.passengers || 1) > 1 ? "s" : ""}
          </span>
        </div>

        {showDropdown && (
          <div className="absolute mt-2 bg-white rounded-xl shadow-xl p-3 flex gap-3 items-center z-20">
            <button
              onClick={() => changePassenger(-1)}
              className="px-3 py-1 bg-pink-500 text-white rounded-full"
              aria-label="Decrease passengers"
            >
              −
            </button>
            <strong>{searchData.passengers || 1}</strong>
            <button
              onClick={() => changePassenger(1)}
              className="px-3 py-1 bg-pink-500 text-white rounded-full"
              aria-label="Increase passengers"
            >
              +
            </button>
          </div>
        )}
      </div>

      {/* Search */}
      <button
        onClick={validateSearch}
        className="bg-pink-500 text-white px-7 py-3 rounded-full font-semibold transition hover:bg-pink-600 hover:scale-105 w-full sm:w-auto flex-1 min-w-[120px]"
      >
        <i className="fa-solid fa-magnifying-glass"></i> Search
      </button>
    </div>
  );
}
