import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Moon, Star, Clock, Mail } from "lucide-react";

const RAMADAN_START = new Date("2026-02-19T00:00:00");
const RAMADAN_TOTAL_DAYS = 30;

export default function Footer() {
  const [time, setTime] = useState("");
  const [ramadanProgress, setRamadanProgress] = useState(null);

  // Chennai Clock
  const getChennaiTime = () => {
    return new Date(
      new Date().toLocaleString("en-US", {
        timeZone: "Asia/Kolkata",
      })
    );
  };

  useEffect(() => {
    const updateTime = () => {
      const now = getChennaiTime();

      setTime(
        now.toLocaleTimeString("en-IN", {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        })
      );

      const diffDays = Math.floor(
        (now - RAMADAN_START) / (1000 * 60 * 60 * 24)
      );

      if (diffDays >= 0 && diffDays < RAMADAN_TOTAL_DAYS) {
        setRamadanProgress(diffDays + 1);
      } else {
        setRamadanProgress(null);
      }
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <footer className="bg-[#0E0E0E] text-[#E5E7EB] mt-20 border-t border-[#2A2A2A] relative overflow-hidden">

      {/* Subtle Mosque Background */}
      <div className="absolute bottom-0 left-0 w-full opacity-5">
        <img src="/mosque-silhouette.png" alt="Mosque" />
      </div>

      <div className="max-w-7xl mx-auto px-6 py-14 grid md:grid-cols-3 gap-12 relative z-10">

        {/* Brand */}
        <div>
          <div className="flex items-center gap-2 text-[#D4AF37] mb-4">
            <Moon size={22} />
            <h2 className="text-xl font-bold">Ramadan 2026</h2>
          </div>

          <p className="text-[#A1A1AA] text-sm leading-relaxed mb-4">
            A community initiative connecting Chennai for Sehri & Iftar
            during the blessed month of Ramadan.
          </p>

          <p className="text-2xl text-[#D4AF37] font-semibold">
            رمضان كريم
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-[#D4AF37] font-semibold mb-4">
            Explore
          </h3>

          <ul className="space-y-3 text-sm">
            <li>
              <Link to="/" className="hover:text-[#D4AF37]">
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/prayer-times"
                className="hover:text-[#D4AF37]"
              >
                Prayer Times
              </Link>
            </li>
            <li>
              <Link
                to="/find-sehri"
                className="hover:text-[#D4AF37]"
              >
                Find Sehri
              </Link>
            </li>
            <li>
              <Link
                to="/disclaimer"
                className="hover:text-[#D4AF37]"
              >
                Disclaimer
              </Link>
            </li>
          </ul>
        </div>

        {/* Ramadan Status */}
        <div>
          <h3 className="text-[#D4AF37] font-semibold mb-4">
            Ramadan Status
          </h3>

          {/* Chennai Clock */}
          <div className="flex items-center gap-2 text-sm mb-4 text-[#A1A1AA]">
            <Clock size={16} />
            <span>Chennai Time: {time}</span>
          </div>

          {/* Ramadan Progress */}
          {ramadanProgress ? (
            <>
              <p className="text-sm text-[#A1A1AA] mb-2">
                🌙 Day {ramadanProgress} of {RAMADAN_TOTAL_DAYS}
              </p>

              <div className="w-full bg-[#2A2A2A] rounded-full h-3 mb-4">
                <div
                  className="bg-[#D4AF37] h-3 rounded-full transition-all duration-500"
                  style={{
                    width: `${
                      (ramadanProgress /
                        RAMADAN_TOTAL_DAYS) *
                      100
                    }%`,
                  }}
                />
              </div>
            </>
          ) : (
            <p className="text-sm text-[#A1A1AA] mb-4">
              Ramadan has not started yet.
            </p>
          )}

          {/* Social */}
          <div className="flex items-center gap-4 mt-4">
           
            <a
              href="mailto:contact@ramadanchennai.in"
              className="hover:text-[#D4AF37]"
            >
              <Mail size={18} />
            </a>
            <Star size={18} className="text-[#D4AF37]" />
          </div>
        </div>

      </div>

      {/* Bottom */}
      <div className="border-t border-[#2A2A2A] text-center py-4 text-sm text-[#A1A1AA] relative z-10">
        © {new Date().getFullYear()} Chennai Ramadan.
        Built with care for the community.
      </div>
    </footer>
  );
}
