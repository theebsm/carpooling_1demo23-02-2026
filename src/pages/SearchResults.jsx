import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Home() {
  const [form, setForm] = useState({ from: "", to: "", date: "" });
  const navigate = useNavigate();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Navigate to SearchResults page with form data
    navigate("/search-results", { state: form });
  };

  return (
    <div className="pt-20">
      {/* Hero Section with background image (same as before) */}
      <section className="relative min-h-screen bg-[url('https://images.unsplash.com/photo-1502877338535-766e1452684a?auto=format&fit=crop&w=1950&q=80')] bg-cover bg-center flex items-center justify-center">
        <div className="absolute inset-0 bg-black/40"></div>

        <div className="relative z-10 text-center px-4">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 flex items-center justify-center gap-2">
            <i className="fa-solid fa-car-side"></i> Find a Ride. Save Money.
          </h1>
          <p className="text-lg md:text-2xl text-white mb-8">
            Eco-friendly and cost-effective way of travelling.
          </p>

          {/* Search Form */}
          <form
            onSubmit={handleSubmit}
            className="bg-white rounded-xl shadow-lg p-6 flex flex-col md:flex-row gap-4 w-full max-w-4xl mx-auto"
          >
            <input
              type="text"
              name="from"
              placeholder="From (e.g. Stockholm)"
              required
              value={form.from}
              onChange={handleChange}
              className="flex-1 p-3 border rounded text-black"
            />
            <input
              type="text"
              name="to"
              placeholder="To (e.g. Uppsala)"
              required
              value={form.to}
              onChange={handleChange}
              className="flex-1 p-3 border rounded text-black"
            />
            <input
              type="date"
              name="date"
              required
              value={form.date}
              onChange={handleChange}
              className="p-3 border rounded text-black"
            />
            <button
              type="submit"
              className="bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-700 transition"
            >
              Search
            </button>
          </form>
        </div>
      </section>
    </div>
  );
}

export default Home;
