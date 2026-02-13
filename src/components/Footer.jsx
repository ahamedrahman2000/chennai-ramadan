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
      }),
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
        }),
      );

      const diffDays = Math.floor(
        (now - RAMADAN_START) / (1000 * 60 * 60 * 24),
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
      <div className="max-w-7xl mx-auto px-6 py-14 grid md:grid-cols-3 gap-12 relative z-10">
        {/* Brand */}
        <div>
          <div className="flex items-center gap-2 text-[#D4AF37] mb-4">
            <Moon size={22} />
            <h2 className="text-xl font-bold">Chennai Ramadan 2026</h2>
          </div>

          <p className="text-[#A1A1AA] text-sm leading-relaxed mb-4">
            A community initiative connecting Chennai for Sehri & Iftar during
            the blessed month of Ramadan.
          </p>

          <p className="text-2xl text-[#D4AF37] font-semibold">رمضان كريم</p>
        </div>

        {/* Quick Links */}
        <div className="md:flex gap-10">
          {/* General Links */}
          <div className="mb-6">
            <h3 className="text-[#D4AF37] font-semibold mb-2">General</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/" className="hover:text-[#D4AF37]">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/about-us" className="hover:text-[#D4AF37]">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/ask-scholar" className="hover:text-[#D4AF37]">
                  Ask to Scholar
                </Link>
              </li>
              <li>
                <Link to="/disclaimer" className="hover:text-[#D4AF37]">
                  Disclaimer
                </Link>
              </li>
            </ul>
          </div>

          {/* Religious Links */}
          <div className="mb-6">
            <h3 className="text-[#D4AF37] font-semibold mb-2">Religious</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/find-sehri" className="hover:text-[#D4AF37]">
                  Find Sehri
                </Link>
              </li>
              <li>
                <Link to="/organization-list" className="hover:text-[#D4AF37]">
                  Providers List
                </Link>
              </li>
              <li>
                <Link to="/prayer-times" className="hover:text-[#D4AF37]">
                  Prayer Times
                </Link>
              </li>
              <li>
                <Link to="/dua" className="hover:text-[#D4AF37]">
                  Duas
                </Link>
              </li>
              <li>
                <Link to="/coming-soon" className="hover:text-[#D4AF37]">
                  Hadith
                </Link>
              </li>
              <li>
                <Link to="/coming-soon" className="hover:text-[#D4AF37]">
                  Quran
                </Link>
              </li>
            </ul>
          </div>

          <div className="mt-4">
            <a
              href={`https://api.whatsapp.com/send?text=Check%20out%20Chennai%20Ramadan%202026!%20Find%20Free%20Sehri%20locations%20and%20Prayer%20Times.%20If%20you%20know%20any%20area%20providing%20Sehri%20food,%20please%20add%20or%20update%20it%20here:%20https://www.chennairamadan.org`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-[#D4AF37] text-[#111111] font-semibold py-2 px-4 rounded hover:bg-yellow-400 transition"
            >
              Share to All
            </a>
          </div>
        </div>

        {/* Ramadan Status */}
        <div>
          <h3 className="text-[#D4AF37] font-semibold mb-4">Ramadan Status</h3>

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
                    width: `${(ramadanProgress / RAMADAN_TOTAL_DAYS) * 100}%`,
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
            <div className="mt-4 text-center">
              <p className="text-sm text-gray-400 mb-2">Total Visitors</p>

              <a
                href="https://visitorbadge.io/status?path=https://www.chennairamadan.org"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  src="https://api.visitorbadge.io/api/visitors?path=https%3A%2F%2Fwww.chennairamadan.org&label=Visitors&labelColor=%23d4af37&countColor=%23555555&style=flat-square&labelStyle=upper"
                  alt="Visitors"
                />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom */}
      <div className="border-t border-[#2A2A2A] text-center py-4 text-sm text-[#A1A1AA] relative z-10">
        © {new Date().getFullYear()} Chennai Ramadan. Built with care for the
        community.
      </div>
    </footer>
  );
}
