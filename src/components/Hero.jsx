import { useState, useEffect, useRef, useCallback } from "react";
import ProviderModal from "./ProviderModal";
import { prayerTimes } from "../data/prayerTimes";
import { Link } from "react-router-dom";

const RAMADAN_START = new Date("2026-02-19T00:00:00+05:30");
const HIJRI_YEAR = 1447;
const SHABAN_TOTAL_DAYS = 29;

export default function Hero() {
  const [open, setOpen] = useState(false);
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
      <section className="min-h-screen relative flex items-center px-4 bg-[#1A1A1A] text-white overflow-hidden py-10">
        <div className="absolute top-24 right-10 text-5xl text-yellow-400 animate-pulse">
          🌙
        </div>

        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-10 text-center relative z-10">
          <div>
            <h1 className="text-4xl font-bold mb-4">Ramadan 2026</h1>

            <h2 className="text-3xl text-[#D4AF37] mb-4">رمضان كريم</h2>

            <p className="mb-2 text-[#D4AF37]">{hijriDate}</p>

            {ramadanDay ? (
              <p className="mb-4">🌙 Ramadan Day {ramadanDay}</p>
            ) : (
              <p className="mb-4 text-yellow-400">
                Ramadan starts in {daysToRamadan} days
              </p>
            )}

            {ramadanDay && (
              <div className="flex justify-center gap-4 mb-6">
                <button
                  onClick={() => setMode("sehar")}
                  className={`px-4 py-2 rounded ${
                    mode === "sehar" ? "bg-[#D4AF37] text-black" : "bg-gray-700"
                  }`}
                >
                  Sehri Countdown
                </button>

                <button
                  onClick={() => setMode("iftar")}
                  className={`px-4 py-2 rounded ${
                    mode === "iftar" ? "bg-[#D4AF37] text-black" : "bg-gray-700"
                  }`}
                >
                  Iftar Countdown
                </button>
              </div>
            )}

            <p className="text-xl text-[#D4AF37] mb-6">⏳ {countdown}</p>

            <div className="text-center mt-4 text-[#E5E7EB] max-w-xl mx-auto">
              "Looking for free Sehri places in Chennai? Or are you providing
              Sehri in your area?", "Register with us to help the community. May
              Allah reward you!"
            </div>

            <div className="flex justify-center mt-6 gap-4">
              <Link
                to="/find-sehri"
                className="bg-[#D4AF37] text-black px-6 py-3 rounded-lg font-semibold shadow-[0_0_20px_rgba(212,175,55,0.8)] hover:scale-105 transition"
              >
                Find Sehri
              </Link>
              <Link
                to="/register-sehri"
                className="bg-[#D4AF37] text-black px-6 py-3 rounded-lg font-semibold shadow-[0_0_20px_rgba(212,175,55,0.8)] hover:scale-105 transition"
              >
                Register Now
              </Link>
            </div>
          </div>

          <div className="bg-[#222222] p-8 rounded-2xl shadow-xl min-h-[300px] flex flex-col justify-center">
            {ramadanDay && (
              <div className="grid gap-4">
                {upcoming.map((day, i) => (
                  <div
                    key={i}
                    className={`p-4 rounded-xl flex justify-between ${
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

      <ProviderModal isOpen={open} onClose={() => setOpen(false)} />
    </>
  );
}
