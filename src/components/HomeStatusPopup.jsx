import { useEffect, useState } from "react";

export default function HomeStatusPopup({ open, setOpen }) {
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (open) {
      fetch("https://ramadan-sehri-backend.onrender.com/api/status-message")
        .then((res) => res.json())
        .then((data) => setMessage(data.message || ""));
      
      // Prevent background scroll
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [open]);

  if (!open) return null;

  return (
    <div
      onClick={() => setOpen(false)}
      className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 px-4 animate-fadeIn"
    >
      <div
        onClick={(e) => e.stopPropagation()} // prevent close when clicking inside
        className="bg-gradient-to-br from-[#1C1C1C] to-[#121212] 
                   w-full max-w-md 
                   rounded-2xl 
                   p-6 
                   relative 
                   border border-[#D4AF37]/40 
                   shadow-[0_0_40px_rgba(212,175,55,0.25)] 
                   transform transition-all duration-300 scale-100"
      >
        {/* Close Button */}
        <button
          onClick={() => setOpen(false)}
          className="absolute top-3 right-3 text-gray-400 hover:text-[#D4AF37] transition"
        >
          ✕
        </button>

        {/* Title */}
        <h2 className="text-lg font-bold text-[#D4AF37] text-center mb-4">
          📡 Live Status
        </h2>

        {/* Message */}
        {message ? (
          <div className="p-4 bg-yellow-900/40 text-yellow-300 rounded-xl text-sm border border-yellow-600/40 text-center">
            {message}
          </div>
        ) : (
          <p className="text-gray-500 text-center text-sm">
            No status available
          </p>
        )}
      </div>
    </div>
  );
}
