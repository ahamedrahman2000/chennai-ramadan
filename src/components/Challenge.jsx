import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { supabase } from "../supabaseClient";

export default function Challenge() {
  const { surahNumber } = useParams();

  const [ayahs, setAyahs] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [visibleCount] = useState(3);
  const [input, setInput] = useState("");
  const [startTime, setStartTime] = useState(null);
  const [finished, setFinished] = useState(false);

  const [stats, setStats] = useState({
    totalChars: 0,
    totalWords: 0,
    totalTime: 0,
    wpm: 0,
  });

  // ✅ Fetch ayahs (fixed warning)
  useEffect(() => {
    const fetchAyahs = async () => {
      const { data, error } = await supabase
        .from("quran_ayahs")
        .select("*")
        .eq("surah_number", surahNumber)
        .order("ayah_number", { ascending: true });

      if (!error && data) {
        setAyahs(data);
      }
    };

    fetchAyahs();
  }, [surahNumber]);

  const currentAyah = ayahs[currentIndex];

  const handleChange = (e) => {
    const value = e.target.value;
    setInput(value);

    if (!startTime) setStartTime(Date.now());

    if (currentAyah && value === currentAyah.content) {
      const nextIndex = currentIndex + 1;
      setCurrentIndex(nextIndex);
      setInput("");

      if (nextIndex >= ayahs.length) {
        finishChallenge();
      }
    }
  };

  const finishChallenge = () => {
    const endTime = Date.now();
    const totalTimeMs = endTime - startTime;
    const totalMinutes = totalTimeMs / 60000;

    const fullText = ayahs
      .map((a) => a.content.trim())
      .join(" ")
      .replace(/\s+/g, " ")
      .trim();

    const totalChars = fullText.replace(/\s/g, "").length;

    const totalWords = fullText
      .split(" ")
      .filter((word) => word.length > 0).length;

    const wpm = totalMinutes > 0 ? Math.round(totalWords / totalMinutes) : 0;

    setStats({
      totalChars,
      totalWords,
      totalTime: totalTimeMs,
      wpm,
    });

    setFinished(true);
  };

  const renderAyah = (ayah, index) => {
    if (index < currentIndex)
      return <span className="text-green-400">{ayah.content}</span>;

    if (index === currentIndex) {
      return ayah.content.split("").map((char, i) => {
        const typedChar = input[i];
        const isCorrect = typedChar === char;

        let colorClass = "text-gray-500";
        if (typedChar)
          colorClass = isCorrect ? "text-green-400" : "text-red-500";

        return (
          <span key={i} className={colorClass}>
            {char}
          </span>
        );
      });
    }

    return <span className="text-gray-700">{ayah.content}</span>;
  };

  const visibleAyahs = ayahs.slice(
    currentIndex,
    currentIndex + visibleCount
  );

  const formatTime = (ms) => {
    const totalSeconds = Math.floor(ms / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes}m ${seconds}s`;
  };

  return (
    <div className="min-h-screen bg-#1A1A1A text-white px-4 py-4 md:p-6">
      <div className="max-w-4xl mx-auto">

        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-yellow-400 mb-4 md:mb-6 text-center">
          Surah {surahNumber} Typing Challenge
        </h2>

        {/* Progress */}
        <div className="w-full bg-gray-800 rounded-full h-2 md:h-3 mb-4 md:mb-6">
          <div
            className="bg-yellow-500 h-2 md:h-3 rounded-full transition-all duration-500"
            style={{
              width: ayahs.length
                ? `${(currentIndex / ayahs.length) * 100}%`
                : "0%",
            }}
          />
        </div>

        {/* Ayahs */}
        <div className="bg-gray-900 p-3 sm:p-4 md:p-6 rounded-xl shadow-xl mb-4 md:mb-6 leading-relaxed md:leading-loose text-sm sm:text-base md:text-lg">
          {visibleAyahs.map((ayah, index) => {
            const realIndex = currentIndex + index;
            return (
              <div key={ayah.ayah_number} className="mb-2 md:mb-3">
                <span className="text-gray-500 mr-2 text-xs sm:text-sm md:text-base">
                  {ayah.ayah_number}.
                </span>
                {renderAyah(ayah, realIndex)}
              </div>
            );
          })}
        </div>

        {!finished && (
          <textarea
            value={input}
            onChange={handleChange}
            placeholder="Start typing here..."
            autoFocus
            rows={2}
            className="w-full p-3 md:p-4 rounded-xl bg-gray-800 border border-yellow-600 focus:ring-2 focus:ring-yellow-400 outline-none text-white text-sm sm:text-base md:text-lg"
          />
        )}
      </div>

      {/* Result Popup */}
      {finished && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center px-4">
          <div className="bg-gradient-to-br from-gray-900 to-black border border-yellow-600 rounded-2xl p-5 sm:p-6 md:p-8 text-center shadow-2xl w-full max-w-sm sm:max-w-md">
            <h3 className="text-xl sm:text-2xl font-bold text-yellow-400 mb-4 md:mb-6">
              🎉 Surah Completed!
            </h3>

            <div className="space-y-2 md:space-y-3 text-sm sm:text-base md:text-lg">
              <p>⏱ Time: <span className="text-yellow-300">{formatTime(stats.totalTime)}</span></p>
              <p>⚡ WPM: <span className="text-yellow-300">{stats.wpm}</span></p>
              <p>🔤 Letters: <span className="text-yellow-300">{stats.totalChars}</span></p>
              <p>📝 Words: <span className="text-yellow-300">{stats.totalWords}</span></p>
            </div>

            <button
              onClick={() => window.location.reload()}
              className="mt-5 md:mt-6 px-5 py-2 md:px-6 md:py-3 bg-yellow-500 text-black font-semibold rounded-xl hover:bg-yellow-400 transition text-sm sm:text-base"
            >
              Try Again
            </button>
          </div>
        </div>
      )}
    </div>
  );
}