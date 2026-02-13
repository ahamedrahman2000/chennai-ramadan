import { useState } from "react";
import { X, Star } from "lucide-react";

export default function AskScholar() {
  const [formData, setFormData] = useState({
    name: "",
    from: "",
    about: "",
    question: "",
  });

  const [showPopup, setShowPopup] = useState(false);

  const scholarNumber = "919551450452"; // WhatsApp number with country code

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = () => {
    const { name, from, question } = formData;

    if (!name || !from || !question) {
      alert("Please fill Name, From, and Question fields.");
      return;
    }

    // WhatsApp message
    const message = `
*Question from Chennai Ramadan App*

*Name:* ${formData.name}
*From:* ${formData.from}
*About:* ${formData.about || "-"}
*Question:* ${formData.question}
    `;

    const whatsappLink = `https://wa.me/${scholarNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappLink, "_blank");

    setShowPopup(true);

    // Reset form
    setFormData({
      name: "",
      from: "",
      about: "",
      question: "",
    });
  };

  return (
    <div className="min-h-screen relative bg-gradient-to-b from-[#0A0A0A] to-[#111111] text-white py-16 px-4 overflow-hidden flex flex-col items-center">
      {/* Animated Islamic background */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-3 h-3 bg-[#D4AF37] rounded-full animate-ping"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 2}s`,
            }}
          ></div>
        ))}
        {[...Array(10)].map((_, i) => (
          <Star
            key={i}
            className="text-[#D4AF37] animate-bounce absolute"
            size={24}
            style={{
              top: `${Math.random() * 90}%`,
              left: `${Math.random() * 90}%`,
            }}
          />
        ))}
      </div>

      {/* Scholar Details */}
      <div className="relative z-10 max-w-2xl w-full bg-gradient-to-br from-[#1A1A1A] to-[#111111] border border-[#D4AF37]/40 rounded-2xl p-8 shadow-[0_0_50px_rgba(212,175,55,0.5)] mb-10 text-center">
        <h1 className="text-3xl font-bold text-[#D4AF37] mb-2">
          Moulana Moulavi Mufti Mohamed Luqman Irshadi Qasmi
        </h1>
        <p className="text-[#A1A1AA] mb-2">
          Professor, Darul Uloom Hussainiya Arabic College, Chennai
        </p>
        <p className="text-[#A1A1AA]">
          Ask your Islamic queries through our app. Your question will be sent directly to the scholar via WhatsApp.
        </p>
      </div>

      {/* Form */}
      <div className="relative z-10 max-w-2xl w-full bg-[#1A1A1A] p-8 rounded-2xl shadow-[0_0_50px_rgba(212,175,55,0.5)] border border-[#D4AF37]/30">
        <h2 className="text-2xl font-bold text-[#D4AF37] mb-6 text-center">
          Ask Your Question
        </h2>

        <label className="block mb-2 font-semibold">Name *</label>
        <input
          type="text"
          name="name"
          placeholder="Your full name"
          value={formData.name}
          onChange={handleChange}
          className="w-full p-3 mb-4 rounded bg-[#2A2A2A] placeholder-gray-400"
        />

        <label className="block mb-2 font-semibold">From *</label>
        <input
          type="text"
          name="from"
          placeholder="City / Area"
          value={formData.from}
          onChange={handleChange}
          className="w-full p-3 mb-4 rounded bg-[#2A2A2A] placeholder-gray-400"
        />

        <label className="block mb-2 font-semibold">About (Optional)</label>
        <input
          type="text"
          name="about"
          placeholder="Topic or context"
          value={formData.about}
          onChange={handleChange}
          className="w-full p-3 mb-4 rounded bg-[#2A2A2A] placeholder-gray-400"
        />

        <label className="block mb-2 font-semibold">Your Question *</label>
        <textarea
          name="question"
          placeholder="Type your question here..."
          value={formData.question}
          onChange={handleChange}
          rows={5}
          className="w-full p-3 mb-6 rounded bg-[#2A2A2A] placeholder-gray-400"
        />

        <button
          onClick={handleSubmit}
          className="w-full bg-[#D4AF37] text-black py-3 rounded-lg font-bold shadow-[0_0_30px_rgba(212,175,55,0.8)] hover:scale-105 transition animate-pulse"
        >
          Submit Question
        </button>
      </div>

      {/* Popup */}
      {showPopup && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-60">
          <div className="bg-[#1A1A1A] border-2 border-[#D4AF37] rounded-xl p-8 max-w-sm text-center shadow-[0_0_50px_rgba(212,175,55,0.6)] relative">
            <button
              onClick={() => setShowPopup(false)}
              className="absolute top-4 right-4 text-[#D4AF37] font-bold text-xl"
            >
              <X size={24} />
            </button>
            <h3 className="text-2xl font-bold text-[#D4AF37] mb-4">
              Thank You!
            </h3>
            <p className="text-white mb-4">
              Your question has been sent via WhatsApp from the Chennai Ramadan App.
              Kindly wait you will get as soon as possible.
            </p>
           
          </div>
        </div>
      )}
    </div>
  );
}
