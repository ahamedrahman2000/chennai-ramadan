import { useEffect, useState } from "react";
import { Moon, Star } from "lucide-react";
import ProviderModal from "./ProviderModal";

export default function RamadanPopup() {
  const [open, setOpen] = useState(false);

  const [openn, setOpenn] = useState(false);

 useEffect(() => {
    const today = new Date().toISOString().split("T")[0]; 
    const lastShown = localStorage.getItem("ramadanPopupDate");

    if (lastShown !== today) {
      setTimeout(() => {
        setOpen(true);
        localStorage.setItem("ramadanPopupDate", today);
      }, 800);
    }
  }, []);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm px-4">
      <div className="relative bg-gradient-to-br from-[#1A1A1A] to-[#111111] border border-[#D4AF37]/40 rounded-2xl p-8 max-w-lg w-full shadow-[0_0_40px_rgba(212,175,55,0.4)] text-center">
        {/* Glow Background Effect */}
        <div className="absolute -top-10 -left-10 w-40 h-40 bg-[#D4AF37]/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-[#D4AF37]/10 rounded-full blur-3xl"></div>

        {/* Icon */}
        <div className="flex justify-center mb-4 text-[#D4AF37]">
          <Moon size={40} className="mr-2 animate-pulse" />
          <Star size={28} />
        </div>

        {/* Arabic */}
        <h2 className="text-3xl font-bold text-[#D4AF37] mb-2">رمضان كريم</h2>

        {/* English Title */}
        <h3 className="text-xl font-semibold mb-4">
          Provide Meals This Ramadan 🌙
        </h3>

        {/* Message */}
        <p className="text-[#A1A1AA] mb-6 leading-relaxed">
          If you or your Masjid / organization provide
          <span className="text-[#D4AF37] font-semibold">
            {" "}
            Sehri or Iftar meals{" "}
          </span>
          in Chennai, kindly register your details.
          <br />
          Let’s ensure no one fasts alone this Ramadan.
        </p>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={() => setOpenn(true)}
            href="/register"
            className="bg-[#D4AF37] text-black px-6 py-3 rounded-lg font-semibold shadow-[0_0_20px_rgba(212,175,55,0.8)] hover:scale-105 transition"
          >
            Register Now
          </button>

          <button
            onClick={() => setOpen(false)}
            className="border border-[#D4AF37] text-[#D4AF37] px-6 py-3 rounded-lg hover:bg-[#D4AF37]/10 transition"
          >
            Close
          </button>
        </div>
      </div>
      <ProviderModal isOpen={openn} onClose={() => setOpenn(false)} />
    </div>
  );
}
