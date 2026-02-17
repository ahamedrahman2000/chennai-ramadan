import { useEffect, useState } from "react";

export default function Blog() {
  const [blogData, setBlogData] = useState([]);
  const [selectedTopic, setSelectedTopic] = useState(""); // topic id
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://ramadan-sehri-backend.onrender.com/api/blog")
      .then((res) => res.json())
      .then((data) => {
        setBlogData(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching blog:", err);
        setLoading(false);
      });
  }, []);

  if (loading) return <p className="text-center mt-10">Loading blog...</p>;

  return (
   <div className="min-h-screen bg-[#1A1A1A] text-[#E5E7EB] px-4 sm:px-6 py-8 sm:py-5">
  <h1 className="text-2xl sm:text-4xl font-bold text-center text-[#D4AF37] mb-6 sm:mb-8">
    Spiritual Lecture
  </h1>

  {/* Dropdown Filter */}
  <div className="max-w-xs mx-auto mb-6 sm:mb-8">
    <select
      value={selectedTopic || ""}
      onChange={(e) => setSelectedTopic(e.target.value)}
      className="w-full p-2 sm:p-3 rounded-lg bg-[#222] border border-[#333] focus:outline-none focus:border-[#D4AF37] text-sm sm:text-base"
    >
      <option value="">Select Topic</option>
      {blogData.map((topic) => (
        <option key={topic.id} value={topic.id}>
          {topic.topic_name}
        </option>
      ))}
    </select>
  </div>

  {/* Blog Topics */}
  <div className="max-w-4xl mx-auto space-y-4 sm:space-y-8">
    {blogData.map((topic) => (
      <div
        key={topic.id}
        className="bg-[#222] p-4 sm:p-6 rounded-xl border-l-4 border-[#D4AF37] sm:border-l-8 border-b border-[#D4AF37]/50"
      >
        <h2 className="text-lg sm:text-2xl font-semibold text-[#D4AF37] mb-2 sm:mb-4">
          {topic.topic_name}
        </h2>

        {/* Show paragraphs only for selected topic */}
        {selectedTopic === "" || selectedTopic === topic.id.toString() ? (
          <div className="space-y-2 sm:space-y-3">
            {topic.paragraphs.map((p) => (
              <p key={p.id} className="text-[#E5E7EB] text-sm sm:text-base leading-relaxed">
                {p.paragraph}
              </p>
            ))}
          </div>
        ) : (
          <p className="text-gray-500 italic text-sm">Paragraphs hidden</p>
        )}
      </div>
    ))}
  </div>
</div>

  );
}
