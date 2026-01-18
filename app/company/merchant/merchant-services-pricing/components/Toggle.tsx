"use client";

import { useState } from "react";

export default function Toggle() {
  const [on, setOn] = useState(true);

  return (
    <button
      onClick={() => setOn(!on)}
      className={`w-10 h-5 rounded-full transition ${
        on ? "bg-[#06044B]" : "bg-gray-300"
      }`}
    >
      <span
        className={`block h-4 w-4 bg-white rounded-full transform transition ${
          on ? "translate-x-5" : "translate-x-1"
        }`}
      />
    </button>
  );
}
