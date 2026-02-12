import { useEffect, useState } from "react";

export default function Countdown() {
  const [time, setTime] = useState("");

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      const iftar = new Date();
      iftar.setHours(18, 30, 0);

      const diff = iftar - now;
      const hrs = Math.floor(diff / 1000 / 60 / 60);
      const mins = Math.floor((diff / 1000 / 60) % 60);

      setTime(`Time left for Iftar: ${hrs}h ${mins}m`);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return <div className="text-2xl text-[#D4AF37] font-bold">{time}</div>;
}
