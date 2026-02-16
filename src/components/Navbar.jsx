import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  Home,
  BookOpen,
  MessageCircle,
  Menu,
  X,
  User,
  AlertTriangle,
  Pen,
  MapPin,
} from "lucide-react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    // Cleanup when component unmounts
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  return (
    <nav className="bg-[#111111] border-b border-[#2A2A2A] sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* LEFT SIDE */}
          <div className="flex items-center space-x-2 md:space-x-3">
            {/* Hamburger */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden text-[#D4AF37]"
            >
              {isOpen ? <X size={26} /> : <Menu size={26} />}
            </button>
            {/* Logo */}
            <Link
              to="/"
              className="flex items-center space-x-2 text-yellow-400 font-bold text-lg whitespace-nowrap"
            >
              <span>ChennaiRamadan🌙</span>
            </Link>
          </div>

          {/* RIGHT SIDE */}
          <Link
            to="/find-sehri"
            className="sm:px-2 px-3 py-1 rounded md:hidden text-black font-bold text-sm whitespace-nowrap   bg-[#D4AF37]  hover:bg-yellow-400 transition"
          >
            Find Sehri
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-6 text-sm text-[#E5E7EB]">
            <Link to="/" className="hover:text-[#FFD700] transition">
              Home
            </Link>
            <Link to="/dua" className="hover:text-[#FFD700] transition">
              Duas
            </Link>
            <Link to="/find-sehri" className="hover:text-[#FFD700] transition">
              Find Sehri
            </Link>
            <Link
              to="/prayer-times"
              className="hover:text-[#FFD700] transition"
            >
              Prayer Times
            </Link>
            <Link
              to="/organization-list"
              className="hover:text-[#FFD700] transition"
            >
              Organization List
            </Link>
            <Link
              to="/ask-scholar"
              className="flex items-center gap-3 hover:bg-[#D4AF37] hover:text-[#111111] px-3 py-2 rounded transition"
            >
              Ask to Scholar
            </Link>
          </div>
        </div>
      </div>

      <div
        className={`fixed top-0 left-0 h-full w-64 bg-gradient-to-b from-[#1a1a1a] to-[#2A2A2A] z-50
    transform transition-transform duration-300 shadow-lg border-r-2 border-[#D4AF37]
    flex flex-col rounded-tr-[15px] rounded-br-[15px]
    ${isOpen ? "translate-x-0" : "-translate-x-full"} overflow-y-auto`}
      >
        {/* Navbar Content */}

        {/* Logo + Close Button */}
        <div className="flex items-center justify-between px-4 py-4 border-b border-[#D4AF37]">
          <div className="flex items-center space-x-2">
            <span className="text-[#FFD700] font-bold text-lg">
              Chennai Ramadan
            </span>
          </div>
          <button
            onClick={() => setIsOpen(false)}
            className="p-2 rounded bg-[#FFD700] text-[#111111] hover:bg-yellow-400 transition"
          >
            ✕
          </button>
        </div>

        {/* Menu Links */}
        <div
          className={`fixed top-0 right-0 h-full w-64 bg-gradient-to-b from-[#1a1a1a] to-[#2A2A2A] z-50 transform
    transition-transform duration-300 shadow-lg border-l-2 border-[#D4AF37] rounded-tl-[5px] rounded-br-[5px]
    flex flex-col ${isOpen ? "translate-x-0" : "translate-x-full"}`}
        >
          {/* Logo + Close Button */}
          <div className="flex items-center justify-between px-4 py-4 border-b border-[#D4AF37]">
            <div className="flex items-center space-x-2">
              <span className="text-[#FFD700] font-bold text-lg">
                🌙 Chennai Ramadan
              </span>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="px-1 rounded bg-[#FFD700] text-[#111111] hover:bg-yellow-400 transition"
            >
              ✕
            </button>
          </div>

          {/* Menu Links */}
          <div className="flex flex-col mt-4 px-6 text-[#FFD700] space-y-4 flex-1">
            <Link
              to="/"
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-3 hover:bg-[#D4AF37] hover:text-[#111111] px-3 py-2 rounded transition"
            >
              <Home size={18} /> Home
            </Link>
            <Link
              to="/sehri-locations2"
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-3 hover:bg-[#D4AF37] hover:text-[#111111] px-3 py-2 rounded transition"
            >
              <MapPin size={18} /> Sehri Locations
            </Link>
            <Link
              to="/register-sehri"
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-3 hover:bg-[#D4AF37] hover:text-[#111111] px-3 py-2 rounded transition"
            >
              <Pen size={18} /> Register Sehri
            </Link>
            <Link
              to="/organization-list"
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-3 hover:bg-[#D4AF37] hover:text-[#111111] px-3 py-2 rounded transition"
            >
              <MapPin size={18} /> Providers List
            </Link>
            <Link
              to="/prayer-times"
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-3 hover:bg-[#D4AF37] hover:text-[#111111] px-3 py-2 rounded transition"
            >
              <BookOpen size={18} /> Prayer Times
            </Link>
            <Link
              to="/dua"
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-3 hover:bg-[#D4AF37] hover:text-[#111111] px-3 py-2 rounded transition"
            >
              <MessageCircle size={18} /> Duas
            </Link>
            <Link
              to="/ask-scholar"
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-3 hover:bg-[#D4AF37] hover:text-[#111111] px-3 py-2 rounded transition"
            >
              <MessageCircle size={18} /> Ask to Scholar
            </Link>

            <Link
              to="/about-us"
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-3 hover:bg-[#D4AF37] hover:text-[#111111] px-3 py-2 rounded transition"
            >
              <User size={18} /> About Us
            </Link>

            <Link
              to="/disclaimer"
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-3 hover:bg-[#D4AF37] hover:text-[#111111] px-3 py-2 rounded transition"
            >
              <AlertTriangle size={18} /> Disclaimer
            </Link>
          </div>

          {/* Footer - Share Button */}
          <div className="px-6 py-4">
            <a
              href={`https://api.whatsapp.com/send?text=Check%20out%20Chennai%20Ramadan%202026!%20Find%20Free%20Sehri%20locations%20and%20Prayer%20Times.%20If%20you%20know%20any%20area%20providing%20Sehri%20food,%20please%20add%20or%20update%20it%20here:%20https://www.chennairamadan.org`}
              target="_blank"
              rel="noopener noreferrer"
              className="block text-center bg-[#D4AF37] text-[#111111] font-semibold py-2 rounded hover:bg-yellow-400 transition"
            >
              Share to All
            </a>
          </div>
        </div>
      </div>
      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={() => setIsOpen(false)}
        ></div>
      )}
    </nav>
  );
}
