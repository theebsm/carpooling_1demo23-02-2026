import { useState } from "react";

function PostRide() {
  const [form, setForm] = useState({
    from: "",
    to: "",
    date: "",
    time: "",
    price: "",
  });

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow w-96">
        <h2 className="text-2xl font-bold mb-4 text-center">Post a Ride</h2>

        <input placeholder="From" className="input" />
        <input placeholder="To" className="input" />
        <input type="date" className="input" />
        <input type="time" className="input" />
        <input placeholder="Price" className="input" />

        <button className="w-full bg-green-600 text-white py-2 rounded mt-4">
          Post Ride
        </button>
      </div>
    </div>
  );
}

export default PostRide;