import { useEffect, useState, useCallback } from "react";
import { useParams } from "react-router-dom";
import { supabase } from "../supabaseClient";

export default function Challenge() {
  const { surahNumber } = useParams();
  const [ayahs, setAyahs] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [input, setInput] = useState("");
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // 🔹 Handle window resize
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // 🔹 Fetch ayahs
  const fetchAyahs = useCallback(async () => {
    setLoading(true);
    setError("");

    try {
      const { data, error } = await supabase
        .from("quran_ayahs")
        .select("*")
        .eq("surah_number", surahNumber)
        .order("ayah_number", { ascending: true });

      if (error) {
        console.error("Supabase error:", error);
        setError("Failed to fetch ayahs.");
      } else if (!data || data.length === 0) {
        setError("No ayahs found for this surah.");
      } else {
        setAyahs(data);
        setCurrentIndex(0);
      }
    } catch (e) {
      console.error("Network error:", e);
      setError("Network error while fetching ayahs.");
    } finally {
      setLoading(false);
    }
  }, [surahNumber]);

  useEffect(() => {
    fetchAyahs();
  }, [fetchAyahs]);

  // 🔹 Handle typing input
  const handleChange = (e) => {
    const value = e.target.value;
    setInput(value);

    const currentAyah = ayahs[currentIndex];
    if (currentAyah && value === currentAyah.content) {
      setInput("");
      setCurrentIndex((prev) => prev + 1);
    }
  };

  // 🔹 Render ayah with colored typing
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

  // 🔹 Sliding window for mobile
  const visibleAyahs = isMobile
    ? ayahs.slice(currentIndex, currentIndex + 3)
    : ayahs;

  // 🔹 Loading or error
  if (loading) {
    return <div style={{ padding: "20px", color: "#eee" }}>Loading ayahs...</div>;
  }
  if (error) {
    return (
      <div style={{ padding: "20px", color: "red" }}>
        {error}
      </div>
    );
  }

  return (
    <div style={container}>
      <h3>Surah {surahNumber}</h3>

      <div style={ayahContainer}>
        {visibleAyahs.map((ayah, index) => {
          const realIndex = isMobile ? currentIndex + index : index;
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
        <h3 style={{ color: "#00ff99" }}>Surah Completed 🎉</h3>
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