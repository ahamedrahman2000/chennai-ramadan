import { useState, useEffect, useRef, useCallback } from "react";
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
     <section className="relative flex items-center px-4 bg-[#1A1A1A] text-white overflow-hidden pt-6 pb-10">
        {/* Moon Emoji */}
        <div className="absolute top-12 right-8 text-4xl sm:text-5xl text-yellow-400 animate-pulse">
          🌙
        </div>

        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10 text-center md:text-left relative z-10">
          <div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-2 sm:mb-4">
              Ramadan 2026
            </h1>

            <h2 className="text-2xl sm:text-3xl md:text-3xl text-[#D4AF37] mb-2 sm:mb-4">
              رمضان كريم
            </h2>

            <p className="mb-1 sm:mb-2 text-[#D4AF37] text-sm sm:text-base">
              {hijriDate}
            </p>

            {ramadanDay ? (
              <p className="mb-2 sm:mb-4 text-sm sm:text-base">
                🌙 Ramadan Day {ramadanDay}
              </p>
            ) : (
              <p className="mb-2 sm:mb-4 text-yellow-400 text-sm sm:text-base">
                Ramadan starts in {daysToRamadan} days
              </p>
            )}

            {ramadanDay && (
              <div className="flex flex-col sm:flex-row justify-center md:justify-start gap-2 sm:gap-4 mb-4">
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

            <div className="text-center md:text-left mt-2 sm:mt-4 text-[#E5E7EB] text-sm sm:text-base max-w-md sm:max-w-xl mx-auto md:mx-0">
              Looking for free Sehri places in Chennai? Or are you providing
              Sehri in your area? Register with us to help the community.{" "}
              <span className="text-green-500">May Allah reward you!</span>
            </div>

            <div className="flex flex-row sm:flex-row justify-center md:justify-start mt-4 sm:mt-6 gap-3 sm:gap-4">
              <Link
                to="/find-sehri"
                className="bg-[#D4AF37] text-black px-4 sm:px-6 py-2 sm:py-3 rounded-lg font-semibold text-sm sm:text-base shadow-[0_0_15px_rgba(212,175,55,0.6)] hover:scale-105 transition"
              >
                Find Sehri
              </Link>
              <Link
                to="/register-sehri"
                className="bg-[#D4AF37] text-black px-4 sm:px-6 py-2 sm:py-3 rounded-lg font-semibold text-sm sm:text-base shadow-[0_0_15px_rgba(212,175,55,0.6)] hover:scale-105 transition"
              >
                Register Now
              </Link>
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
    </>
  );
}
