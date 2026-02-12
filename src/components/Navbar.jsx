import { Link } from "react-router-dom";
import { useState } from "react";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-[#111111] border-b border-[#2A2A2A] sticky top-0 z-50 overflow-x-hidden">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">

          {/* Logo */}
          <Link
            to="/"
            className="text-[#D4AF37] font-bold text-lg whitespace-nowrap"
          >
            🌙 Chennai Ramadan
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8 text-sm text-[#E5E7EB]">
            <Link to="/find-sehri" className="hover:text-[#D4AF37] transition">
              Find Sehri
            </Link>
            <Link to="/register-sehri" className="hover:text-[#D4AF37] transition">
              Register / Update
            </Link>
            <Link to="/prayer-times" className="hover:text-[#D4AF37] transition">
              Prayer Times
            </Link>
            <Link to="/organization-list" className="hover:text-[#D4AF37] transition">
              Organizations
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-[#E5E7EB]"
          >
            {isOpen ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown */}
      <div
        className={`md:hidden bg-[#1A1A1A] border-t border-[#2A2A2A] transition-all duration-300 overflow-hidden ${
          isOpen ? "max-h-96 py-4" : "max-h-0"
        }`}
      >
        <div className="flex flex-col space-y-4 px-6 text-[#E5E7EB] text-sm">

          <Link
            to="/find-sehri"
            onClick={() => setIsOpen(false)}
            className="hover:text-[#D4AF37]"
          >
            Find Sehri
          </Link>

          <Link
            to="/register-sehri"
            onClick={() => setIsOpen(false)}
            className="hover:text-[#D4AF37]"
          >
            Register / Update
          </Link>

          <Link
            to="/prayer-times"
            onClick={() => setIsOpen(false)}
            className="hover:text-[#D4AF37]"
          >
            Prayer Times
          </Link>

          <Link
            to="/organization-list"
            onClick={() => setIsOpen(false)}
            className="hover:text-[#D4AF37]"
          >
            Masjid | Organization List
          </Link>

        </div>
      </div>
    </nav>
  );
}
