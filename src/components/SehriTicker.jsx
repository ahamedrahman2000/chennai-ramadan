const SehriTicker = () => {
const text = [
  "Find Free Sehri and Sahar providing areas in Chennai during Ramadan 2026.",
  "Updated daily with masjid and organization details across Chennai.",
  "Share iftar with your neighbors and earn rewards from Allah.",
  "Fasting purifies the soul, may Allah give barakah in your rizq.",
  "Help someone in need this Ramadan and receive endless blessings.",
  "Recite Quran daily for peace and guidance in Ramadan.",
  "Give charity and spread happiness during the holy month.",
];
  return (
    <div className="w-full bg-gradient-to-r from-green-700 via-emerald-600 to-green-700 text-white overflow-hidden border-y border-green-800 shadow-sm">

      <div className="relative flex whitespace-nowrap">
        <div className="animate-marquee hover:[animation-play-state:paused] py-2 text-sm md:text-base font-medium">
          <span className="bg-white text-green-700 px-3 py-1 mr-4 rounded-full text-xs font-bold animate-pulse">
            LIVE
          </span>
          {text} &nbsp; • &nbsp; {text}
        </div>
      </div>
    </div>
  );
};

export default SehriTicker;
