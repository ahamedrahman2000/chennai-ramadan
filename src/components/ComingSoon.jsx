import { Star, Moon } from "lucide-react";

export default function ComingSoon({ title }) {
  return (
    <div className="min-h-screen bg-[#111111] text-white flex flex-col items-center justify-center px-4 relative overflow-hidden">
      {/* Animated Stars and Moon in background */}
      <div className="absolute inset-0 -z-10">
        {[...Array(20)].map((_, i) => (
          <Star
            key={i}
            size={10 + Math.random() * 20}
            className="absolute text-[#D4AF37] opacity-20 animate-pulse"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDuration: `${2 + Math.random() * 3}s`,
            }}
          />
        ))}
        <Moon
          size={100}
          className="absolute text-[#D4AF37] opacity-10 animate-bounce"
          style={{ top: "10%", right: "10%" }}
        />
      </div>

      {/* Content */}
      <h1 className="text-5xl md:text-6xl font-bold text-[#D4AF37] mb-6 animate-pulse">
        {title}
      </h1>
      <p className="text-center text-[#A1A1AA] max-w-xl mb-8 text-lg">
        This section is coming soon! Stay tuned for updates and resources related to {title}.
      </p>

      {/* Decorative button placeholder */}
      <div className="relative inline-block">
        <span className="absolute inset-0 bg-gradient-to-r from-[#D4AF37]/50 to-[#D4AF37]/20 blur-lg rounded-full animate-pulse"></span>
        <button className="relative bg-[#222222] text-[#D4AF37] px-8 py-3 rounded-full font-semibold shadow-[0_0_25px_rgba(212,175,55,0.7)] hover:scale-105 transition">
          Stay Tuned 🌙
        </button>
      </div>

      {/* Footer note */}
      <p className="text-[#A1A1AA] mt-12 text-sm">
        Made with love for the Chennai Ramadan community
      </p>
    </div>
  );
}
