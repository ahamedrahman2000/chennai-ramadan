const SehriTicker = () => {
const text = [
  "If you are providing Sehri / providing in your area / in your Masjid in Chennai, please register with us.",
  "May Allah reward you."
];
  return (
    <div className="w-full mt-10  text-white overflow-hidden  shadow-sm">

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
