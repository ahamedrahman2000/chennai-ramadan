import { Link } from "react-router-dom";
import { useState } from "react";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
  <nav className="bg-[#111] border-b border-[#2A2A2A] p-4 sticky top-0 w-full z-50">
  <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Logo */}
        <h1 className="text-[#D4AF37] font-bold text-lg cursor-pointer">
          <Link to="/">🌙 Chennai Ramadan</Link>
        </h1>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-6 text-sm text-[#E5E7EB]">
          <Link
            to="/"
            className="hover:text-[#D4AF37] transition-colors duration-300"
          >
            Register / Update
          </Link>
          <Link
            to="/find-sehri"
            className="hover:text-[#D4AF37] transition-colors duration-300"
          >
            Find Sehri
          </Link>
          <Link
            to="/prayer-times"
            className="hover:text-[#D4AF37] transition-colors duration-300"
          >
            Prayer Times
          </Link>
          <Link
            to="/organization-list"
            className="hover:text-[#D4AF37] transition-colors duration-300"
          >
            Masjid | Organization Lists
          </Link>
        </div>

        {/* Mobile Buttons */}
        <div className="flex items-center space-x-3 md:hidden">
          <Link
            to="/find-sehri"
            className="bg-[#D4AF37] text-black px-3 py-1 rounded-md text-xs font-semibold"
          >
            Find Sehri
          </Link>
          {/* <Link
            to="/update-sehri"
            className="bg-[#D4AF37] text-black px-3 py-1 rounded-md text-xs font-semibold"
          >
            Join Sehri
          </Link> */}

          <button onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? (
              <X className="text-[#E5E7EB]" size={22} />
            ) : (
              <Menu className="text-[#E5E7EB]" size={22} />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {isOpen && (
        <div className="md:hidden mt-4 flex justify-between bg-[#1A1A1A] border-t border-[#2A2A2A] py-4 px-6  items-center text-[#E5E7EB] text-sm">
          <Link
            to="/"
            onClick={() => setIsOpen(false)}
            className="bg-[#D4AF37] text-black px-3 py-1 rounded-md text-xs font-semibold"
          >
            Duas
          </Link>
          <Link
            to="/prayer-times"
            onClick={() => setIsOpen(false)}
            className="bg-[#D4AF37] text-black px-3 py-1 rounded-md text-xs font-semibold"
          >
            Prayer Times
          </Link>
          <Link
            to="/organization-list"
            onClick={() => setIsOpen(false)}
            className="bg-[#D4AF37] text-black px-3 py-1 rounded-md text-xs font-semibold"
          >
            Masjid | Organization Lists
          </Link>
        </div>
      )}
    </nav>
  );
}
