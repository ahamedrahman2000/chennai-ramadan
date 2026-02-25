import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { supabase } from "../supabaseClient";

export default function Challenge() {
  const { surahNumber } = useParams();
  const [ayahs, setAyahs] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [input, setInput] = useState("");
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    fetchAyahs();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [surahNumber]);

  const handleResize = () => {
    setIsMobile(window.innerWidth < 768);
  };

  const fetchAyahs = async () => {
    const { data } = await supabase
      .from("quran_ayahs")
      .select("*")
      .eq("surah_number", surahNumber)
      .order("ayah_number", { ascending: true });

    if (data) setAyahs(data);
  };

  const currentAyah = ayahs[currentIndex];

  const handleChange = (e) => {
    const value = e.target.value;
    setInput(value);

    if (currentAyah && value === currentAyah.content) {
      setInput("");
      setCurrentIndex((prev) => prev + 1);
    }
  };

  const renderAyah = (ayah, index) => {
    if (index < currentIndex) {
      return <span style={{ color: "#00ff99" }}>{ayah.content}</span>;
    }

    if (index === currentIndex) {
      return ayah.content.split("").map((char, i) => {
        const typedChar = input[i];
        const isCorrect = typedChar === char;

        return (
          <span
            key={i}
            style={{
              color: typedChar
                ? isCorrect
                  ? "#00ff99"
                  : "#ff4d4d"
                : "#555"
            }}
          >
            {char}
          </span>
        );
      });
    }

    return <span style={{ color: "#444" }}>{ayah.content}</span>;
  };

  // 🔥 Sliding window logic for mobile
  const visibleAyahs = isMobile
    ? ayahs.slice(currentIndex, currentIndex + 3)
    : ayahs;

  return (
    <div style={container}>
      <h3>Surah {surahNumber}</h3>

      <div style={ayahContainer}>
        {visibleAyahs.map((ayah, index) => {
          const realIndex = isMobile
            ? currentIndex + index
            : index;

          return (
            <div key={ayah.ayah_number} style={ayahBox}>
              <span style={{ color: "#888", marginRight: "6px" }}>
                {ayah.ayah_number}.
              </span>
              {renderAyah(ayah, realIndex)}
            </div>
          );
        })}
      </div>

      {currentIndex < ayahs.length ? (
        <textarea
          value={input}
          onChange={handleChange}
          placeholder="Type current ayah..."
          style={inputStyle}
          rows={3}
          autoFocus
        />
      ) : (
        <h3 style={{ color: "#00ff99" }}>
          Surah Completed 🎉
        </h3>
      )}
    </div>
  );
}

/* ===== STYLES ===== */

const container = {
  maxWidth: "900px",
  margin: "auto",
  padding: "20px",
  color: "#eee"
};

const ayahContainer = {
  background: "#111",
  padding: "15px",
  borderRadius: "8px",
  marginBottom: "15px"
};

const ayahBox = {
  marginBottom: "10px",
  lineHeight: "1.8"
};

const inputStyle = {
  width: "100%",
  padding: "10px",
  borderRadius: "6px",
  border: "1px solid #333",
  background: "#1a1a1a",
  color: "#fff",
  fontSize: "14px",
  outline: "none"
};