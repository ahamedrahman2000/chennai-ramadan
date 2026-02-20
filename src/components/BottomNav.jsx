import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Home, MapPin, PlusCircle,  MapPinHouse } from "lucide-react";

export default function CompactBottomNav() {
  const location = useLocation();
  const [show, setShow] = useState(true);
  const [lastScroll, setLastScroll] = useState(0);

  // Hide on scroll down, show on scroll up
  useEffect(() => {
    const handleScroll = () => {
      const currentScroll = window.scrollY;
      if (currentScroll > lastScroll && currentScroll > 50) {
        setShow(false);
      } else {
        setShow(true);
      }
      setLastScroll(currentScroll);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScroll]);

  const navItems = [
    { name: "Home", path: "/", icon: <Home size={20} /> },
    { name: "Find", path: "/find-sehri", icon: <MapPin size={20} /> },
    { name: "Register", path: "/register-sehri", icon: <PlusCircle size={20} /> },
    { name: "Locations", path: "/sehri-locations", icon: <MapPinHouse size={20} /> },
  ];

  return (
    <nav
      className={`
        fixed bottom-1 lg:hidden left-1/2 transform -translate-x-1/2 border border-yellow-600
        flex justify-around w-[90%] max-w-sm bg-[#111111]/80 backdrop-blur-sm
        rounded-2xl shadow-md transition-all duration-300 z-50
        ${show ? "translate-y-0 opacity-100" : "translate-y-20 opacity-0"}
      `}
    >
      {navItems.map((item) => {
        const isActive = location.pathname === item.path;
        return (
          <Link
            key={item.name}
            to={item.path}
            className="flex flex-col items-center justify-center flex-1 py-2 transition-transform"
          >
            <div
              className={`
                w-10 h-10 flex items-center justify-center rounded-full
                transition-all duration-300
                ${isActive 
                  ? "bg-gradient-to-tr from-[#D4AF37] to-[#FFD700] shadow-[0_0_8px_rgba(212,175,55,0.6)] scale-105" 
                  : "bg-[#1A1A1A] hover:bg-[#D4AF37]/20"}
              `}
            >
              {item.icon}
            </div>
            <span
              className={`mt-1 text-[10px] font-medium ${
                isActive ? "text-[#FFD700]" : "text-[#E5E7EB]/70"
              }`}
            >
              {item.name}
            </span>
          </Link>
        );
      })}
    </nav>
  );
}
