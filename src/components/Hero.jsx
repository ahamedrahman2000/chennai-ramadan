import { useEffect, useRef, useCallback, useState } from "react";
import { prayerTimes } from "../data/prayerTimes";
import { Link } from "react-router-dom";

import {
  MapPin,
  PlusCircle,
  Grid,
  MessageCircle,
  Book,
  UserCheck,
  Clock,
  Users,
  Wifi,
  ListChecks,
  Mic2, 
  Search, 
} from "lucide-react";
import HomeStatusPopup from "./HomeStatusPopup";

const RAMADAN_START = new Date("2026-02-19T00:00:00+05:30");
const HIJRI_YEAR = 1447;
const SHABAN_TOTAL_DAYS = 29;

export default function Hero() {
  const [statusOpen, setStatusOpen] = useState(false);
  const [ramadanDay, setRamadanDay] = useState(null);
  const [hijriDate, setHijriDate] = useState("");
  const [countdown, setCountdown] = useState("");
  const [daysToRamadan, setDaysToRamadan] = useState(null);
  const [mode, setMode] = useState("iftar");
  const adhanRef = useRef(null);

  const getIndiaTime = () => {
    return new Date(
      new Date().toLocaleString("en-US", {
        timeZone: "Asia/Kolkata",
      }),
    );
  };

  const calculateHijri = useCallback(() => {
    const now = getIndiaTime();

    const diffDays = Math.floor((RAMADAN_START - now) / (1000 * 60 * 60 * 24));

    if (diffDays > 0) {
      const shabanDay = SHABAN_TOTAL_DAYS - diffDays + 1;

      return {
        month: "Sha'ban",
        day: shabanDay,
        year: HIJRI_YEAR,
        ramadanDay: null,
        daysToRamadan: diffDays,
      };
    }

    const ramadanDay =
      Math.floor((now - RAMADAN_START) / (1000 * 60 * 60 * 24)) + 1;

    return {
      month: "Ramadan",
      day: ramadanDay,
      year: HIJRI_YEAR,
      ramadanDay: ramadanDay,
      daysToRamadan: 0,
    };
  }, []);

  useEffect(() => {
    const updateClock = () => {
      const now = getIndiaTime();
      const hijri = calculateHijri();

      setHijriDate(`${hijri.month} ${hijri.day}, ${hijri.year} AH`);
      setRamadanDay(hijri.ramadanDay);
      setDaysToRamadan(hijri.daysToRamadan);

      let targetTime;

      if (!hijri.ramadanDay) {
        targetTime = RAMADAN_START;
      } else {
        const todayPrayer = prayerTimes[hijri.ramadanDay - 1];
        if (!todayPrayer) return;

        const selectedTime =
          mode === "iftar" ? todayPrayer.iftar : todayPrayer.sehar;

        const [time, modifier] = selectedTime.split(" ");
        let [hours, minutes] = time.split(":");

        hours = parseInt(hours);
        minutes = parseInt(minutes);

        if (modifier === "PM" && hours !== 12) hours += 12;
        if (modifier === "AM" && hours === 12) hours = 0;

        targetTime = new Date(now);
        targetTime.setHours(hours, minutes, 0);

        if (targetTime < now) {
          targetTime.setDate(targetTime.getDate() + 1);
        }
      }

      const diff = targetTime - now;

      if (diff <= 0) {
        setCountdown("Time Reached");

        if (mode === "iftar" && adhanRef.current) {
          adhanRef.current.play().catch(() => {});
        }
      } else {
        const h = Math.floor(diff / (1000 * 60 * 60));
        const m = Math.floor((diff / (1000 * 60)) % 60);
        const s = Math.floor((diff / 1000) % 60);

        setCountdown(`${h}h ${m}m ${s}s`);
      }
    };

    updateClock();
    const interval = setInterval(updateClock, 1000);
    return () => clearInterval(interval);
  }, [mode, calculateHijri]);

  const upcoming =
    ramadanDay !== null
      ? prayerTimes.slice(ramadanDay - 1, ramadanDay + 2)
      : [];

  return (
    <>
      <section className="relative flex items-center px-4 bg-[#1A1A1A] text-white overflow-hidden pt-6 pb-10">
        {/* 🌌 Ramadan Night Sky Background */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none z-0 opacity-60">
          {/* Stars */}
          <div className="absolute w-1 h-1 bg-white/50 rounded-full top-[10%] left-[20%] animate-twinkle"></div>
          <div className="absolute w-1.5 h-1.5 bg-white/50 rounded-full top-[60%] left-[40%] animate-twinkle delay-500"></div>
          <div className="absolute w-1 h-1 bg-yellow-400 rounded-full top-[80%] left-[80%] animate-twinkle delay-700"></div>
          <div className="absolute w-1 h-1 bg-white/50 rounded-full top-[50%] left-[10%] animate-twinkle delay-1000"></div>

          {/* Glowing Moons */}
          <div className="absolute w-32 h-32 bg-yellow-400 rounded-full blur-3xl opacity-10 top-[-40px] right-[-40px]"></div>
          <div className="absolute w-24 h-24 bg-yellow-300 rounded-full blur-2xl opacity-10 bottom-[-30px] left-[-30px]"></div>
        </div>

        {/* Moon Emoji */}
        <div className="absolute top-5 right-2 text-4xl sm:text-5xl text-yellow-400 animate-pulse ">
          🌙
        </div>

        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10 text-center md:text-left relative z-10">
          <div>
            {/* <h4 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-2 sm:mb-4">
              Ramadan 2026
            </h4> */}

            <p className="mb-3 sm:mb-2 text-xl sm:text-base font-bold text-yellow-400 drop-shadow-[0_0_10px_rgba(255,215,0,0.9)] tracking-wide">
              ✨ {hijriDate}
            </p>

            {ramadanDay ? (
              <p className="mb-2 sm:mb-4 text-sm sm:text-base"></p>
            ) : (
              <p className="mb-2 sm:mb-4 text-yellow-400 text-sm sm:text-base">
                Ramadan starts in {daysToRamadan} days
              </p>
            )}

            {ramadanDay && (
              <div className="flex flex-row sm:flex-row justify-center md:justify-start gap-2 sm:gap-4 mb-4">
                <button
                  onClick={() => setMode("sehar")}
                  className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded text-sm sm:text-base ${
                    mode === "sehar" ? "bg-[#D4AF37] text-black" : "bg-gray-700"
                  }`}
                >
                  Sehri Countdown
                </button>

                <button
                  onClick={() => setMode("iftar")}
                  className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded text-sm sm:text-base ${
                    mode === "iftar" ? "bg-[#D4AF37] text-black" : "bg-gray-700"
                  }`}
                >
                  Iftar Countdown
                </button>
              </div>
            )}

            <p className="text-sm sm:text-base text-[#D4AF37] mb-4 sm:mb-6">
              ⏳ {countdown}
            </p>

            <div className="mt-6 sm:mt-8 grid  grid-cols-4 gap-4 max-w-xl mx-auto md:mx-0">
              {[
                { to: "/find-sehri", icon: <Search size={26} />, name: "Find" },
                {
                  to: "/register-sehri",
                  icon: <PlusCircle size={26} />,
                  name: "Register",
                },
                {
                  to: "/organization-list",
                  icon: <ListChecks size={26} />,
                  name: "Providers",
                },
                {
                  to: "/sehri-locations",
                  icon: <MapPin size={26} />,
                  name: "Locations",
                },
                {
                  to: "/ask-scholar",
                  icon: <UserCheck size={26} />,
                  name: "Scholar",
                },
                { to: "/dua", icon: <Book size={26} />, name: "Duas" },
                {
                  to: "/prayer-times",
                  icon: <Clock size={26} />,
                  name: "Prayer",
                },
                {
                  to: "/ladies",
                  icon: <Users size={26} />,
                  name: "Ladies",
                  special: true, // 👈 add this
                },
                { to: "/blogPage", icon: <Mic2 size={26} />, name: "Lectures" },
                { to: "/areapages", icon: <Grid size={26} />, name: "Areas" },
                {
                  to: "/coming-soon",
                  icon: <MessageCircle size={26} />,
                  name: "Chat",
                },
              ].map((item, index) => (
                <Link
                  key={index}
                  to={item.to}
                  className={`flex flex-col items-center justify-center 
      rounded-xl py-4 transition hover:scale-105
      ${
        item.special
          ? "bg-pink-500 border border-white-500"
          : "bg-[#222222] border border-[#3A3A3A] hover:border-[#D4AF37]"
      }`}
                >
                  <div
                    className={`mb-2 ${item.special ? "text-white" : "text-[#D4AF37]"}`}
                  >
                    {item.icon}
                  </div>

                  <span
                    className={`text-xs sm:text-sm font-medium ${
                      item.special ? "text-white" : "text-[#E5E7EB]"
                    }`}
                  >
                    {item.name}
                  </span>
                </Link>
              ))}

              {/* Live Status Special Card */}
              <div
                onClick={() => setStatusOpen(true)}
                className="flex flex-col items-center justify-center 
               bg-[#222222] 
               border border-[#3A3A3A] 
               rounded-xl 
               py-4 
               transition 
               hover:scale-105 
               cursor-pointer"
              >
                <Wifi size={26} className="text-red-500 mb-2 animate-pulse" />
                <span className="text-xs sm:text-sm font-semibold text-red-500 animate-pulse">
                  Live
                </span>
              </div>
            </div>
          </div>

          <div className="bg-[#222222] p-6 sm:p-8 rounded-2xl shadow-xl min-h-[250px] sm:min-h-[300px] flex flex-col justify-center">
            {ramadanDay && (
              <div className="grid gap-3 sm:gap-4">
                {upcoming.map((day, i) => (
                  <div
                    key={i}
                    className={`p-3 sm:p-4 rounded-xl flex justify-between text-sm sm:text-base ${
                      i === 0
                        ? "bg-[#D4AF37] text-black scale-105"
                        : "bg-[#2A2A2A]"
                    }`}
                  >
                    <span>{day.day}</span>
                    <span>
                      Sehri: {day.sehar} | Iftar: {day.iftar}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Popup Component */}
      <HomeStatusPopup open={statusOpen} setOpen={setStatusOpen} />
    </>
  );
}
