import { useEffect, useState } from "react";

export default function HomeStatusPopup() {
  const [open, setOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("updated");

  const [updatedAreas, setUpdatedAreas] = useState([]);
  const [notUpdatedAreas, setNotUpdatedAreas] = useState([]);

  const [updatedCount, setUpdatedCount] = useState(0);
  const [notUpdatedCount, setNotUpdatedCount] = useState(0);

  const [message, setMessage] = useState("");

  useEffect(() => {
    // Fetch message
    fetch("https://ramadan-sehri-backend.onrender.com/api/status-message")
      .then((res) => res.json())
      .then((data) => setMessage(data.message || ""));

    // Fetch grouped status summary
    fetch("https://ramadan-sehri-backend.onrender.com/api/status-summary")
      .then((res) => res.json())
      .then((data) => {
        setUpdatedAreas(data.updated || []);
        setNotUpdatedAreas(data.notUpdated || []);
        setUpdatedCount(data.updatedCount || 0);
        setNotUpdatedCount(data.notUpdatedCount || 0);
      });
  }, []);

  return (
    <>
      {/* FLOAT BUTTON */}
      <button
        onClick={() => setOpen(true)}
        className="fixed bottom-6 right-6 bg-red-600 text-white px-5 py-3 rounded-full shadow-lg animate-pulse z-50"
      >
        ⚠ Live Status
      </button>

    {/* POPUP */}
{open && (
  <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 px-4">
    
    <div className="bg-gradient-to-br from-[#1C1C1C] to-[#121212] 
                    w-full max-w-2xl 
                    rounded-2xl 
                    p-5 sm:p-6 
                    relative 
                    border border-[#D4AF37]/40 
                    shadow-[0_0_40px_rgba(212,175,55,0.25)] 
                    animate-fadeIn">

      {/* CLOSE */}
      <button
        onClick={() => setOpen(false)}
        className="absolute top-4 right-4 
                   text-gray-400 hover:text-[#D4AF37] 
                   transition text-lg"
      >
        ✕
      </button>

      {/* TITLE */}
      <h2 className="text-lg sm:text-xl font-bold text-[#D4AF37] mb-4 text-center">
        Area Update Status
      </h2>

      {/* MESSAGE */}
      {message && (
        <div className="mb-4 p-3 bg-yellow-900/40 
                        text-yellow-300 
                        rounded-lg text-sm border border-yellow-600/40">
          {message}
        </div>
      )}

      {/* TABS */}
      <div className="flex bg-[#222] rounded-full p-1 mb-5">
        <button
          onClick={() => setActiveTab("updated")}
          className={`flex-1 py-2 rounded-full text-sm font-semibold transition ${
            activeTab === "updated"
              ? "bg-green-500 text-black"
              : "text-gray-400"
          }`}
        >
          Updated ({updatedCount})
        </button>

        <button
          onClick={() => setActiveTab("not_updated")}
          className={`flex-1 py-2 rounded-full text-sm font-semibold transition ${
            activeTab === "not_updated"
              ? "bg-red-500 text-black"
              : "text-gray-400"
          }`}
        >
          Not Updated ({notUpdatedCount})
        </button>
      </div>

      {/* LIST */}
      <div className="max-h-72 overflow-y-auto space-y-2 no-scrollbar pr-1">
        {(activeTab === "updated"
          ? updatedAreas
          : notUpdatedAreas
        ).map((item, index) => (
          <div
            key={index}
            className="bg-[#222] 
                       rounded-lg 
                       px-4 py-3 
                       flex justify-between items-center 
                       hover:bg-[#2A2A2A] 
                       transition"
          >
            <p className="text-white text-sm font-medium">
              {item.area}
            </p>

            <span className="text-xs bg-[#D4AF37]/20 
                             text-[#D4AF37] 
                             px-2 py-1 
                             rounded-full">
              {item.count}
            </span>
          </div>
        ))}

        {(activeTab === "updated"
          ? updatedAreas
          : notUpdatedAreas
        ).length === 0 && (
          <p className="text-gray-500 text-center py-4 text-sm">
            No data available
          </p>
        )}
      </div>

    </div>
  </div>
)}

    </>
  );
}
