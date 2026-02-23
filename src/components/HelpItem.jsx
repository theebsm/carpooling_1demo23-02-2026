// src/components/HelpItem.jsx
import { useState } from "react";

export default function HelpItem({ icon, question, answer }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="bg-white p-5 rounded-xl shadow cursor-pointer">
      <div
        className="flex gap-2 items-center font-semibold"
        onClick={() => setOpen(!open)}
      >
        <i className={icon}></i>
        {question}
      </div>
      {open && <p className="mt-3 text-slate-600">{answer}</p>}
    </div>
  );
}
