import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { Mic } from "lucide-react";

export default function Navbar() { 
  const [show, setShow] = useState(true);
  const [lastScroll, setLastScroll] = useState(0);

  // Lock scroll when sidebar is open
 

  // Scroll logic for hiding navbar
  useEffect(() => {
    const handleScroll = () => {
      const currentScroll = window.scrollY;
      if (currentScroll > lastScroll && currentScroll > 50) {
        // Scrolling down -> hide navbar
        setShow(false);
      } else if (currentScroll < lastScroll) {
        // Scrolling up -> show navbar
        setShow(true);
      }
      setLastScroll(currentScroll);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScroll]);

  return (
    <>
      {/* Top Navbar */}
      <nav
        className={`
        bg-[#111111] border-b border-[#2A2A2A] fixed top-0 w-full z-50
        transition-transform duration-300 shadow-md
        ${show ? "translate-y-0" : "-translate-y-full"}
      `}
      >
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between items-center h-12">
            {/* LEFT SIDE */}
            <div className="flex items-center space-x-2 md:space-x-3">
              {/* Hamburger */}

              {/* Logo */}
              <Link
                to="/"
                className="flex items-center space-x-2 text-yellow-400 font-bold text-lg whitespace-nowrap"
              >
                <span>🌙 ChennaiRamadan</span>
              </Link>
            </div>

            {/* Mobile Find Sehri */}
            <Link
              to="/find-sehri"
              className="sm:px-2 px-3 py-1 rounded md:hidden text-black font-bold text-sm whitespace-nowrap bg-[#D4AF37] hover:bg-yellow-400 transition"
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
              <Link
                to="/find-sehri"
                className="hover:text-[#FFD700] transition"
              >
                Find Sehri
              </Link>
              <Link
                to="/blogPage"
                className="flex items-center gap-3 hover:bg-[#D4AF37] hover:text-[#111111] px-3 py-2 rounded transition"
              >
                <Mic size={18} /> Spiritual Lecture
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
      </nav>

      {/* Mobile Sidebar */}
    </>
  );
}
