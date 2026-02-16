import { useState } from "react";
import { X } from "lucide-react";

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
    <div
      className="min-h-screen relative 
              bg-[#1A1A1A]
                text-white 
                py-5 sm:py-16 
                px-4 
                overflow-hidden 
                flex flex-col items-center"
    >
      {/* Soft Animated Background (Reduced for Mobile) */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden opacity-40 sm:opacity-100">
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-[#D4AF37] rounded-full animate-ping"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 2}s`,
            }}
          ></div>
        ))}
      </div>

      {/* Scholar Details */}
      <div
        className="relative z-10 
                  max-w-2xl w-full 
                  bg-gradient-to-br from-[#1A1A1A] to-[#111111] 
                  border border-[#D4AF37]/30 
                  rounded-xl sm:rounded-2xl 
                  p-4 sm:p-8 
                  shadow-lg sm:shadow-[0_0_40px_rgba(212,175,55,0.4)] 
                  mb-6 sm:mb-10 
                  text-center"
      >
        <h1
          className="text-xl sm:text-3xl 
                   font-bold 
                   text-[#D4AF37] 
                   mb-2"
        >
          Moulana Moulavi Mufti Mohamed Luqman Irshadi Qasmi
        </h1>

        <p className="text-xs sm:text-base text-[#A1A1AA] mb-2">
          Professor, Darul Uloom Hussainiya Arabic College, Chennai
        </p>

        <p className="text-xs sm:text-base text-[#A1A1AA]">
          Ask your Islamic queries through our app. Your question will be sent
          directly via WhatsApp.
        </p>
      </div>

      {/* Form */}
      <div
        className="relative z-10 
                  max-w-2xl w-full 
                  bg-[#1A1A1A] 
                  p-4 sm:p-8 
                  rounded-xl sm:rounded-2xl 
                  shadow-lg sm:shadow-[0_0_40px_rgba(212,175,55,0.4)] 
                  border border-[#D4AF37]/30"
      >
        <h2
          className="text-lg sm:text-2xl 
                   font-bold 
                   text-[#D4AF37] 
                   mb-4 sm:mb-6 
                   text-center"
        >
          Ask Your Question
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
          <div>
            <label className="text-sm font-medium">Name *</label>
            <input
              type="text"
              name="name"
              placeholder="Your full name"
              value={formData.name}
              onChange={handleChange}
              className="w-full text-sm p-2 sm:p-3 rounded bg-[#2A2A2A] mt-1"
            />
          </div>

          <div>
            <label className="text-sm font-medium">From *</label>
            <input
              type="text"
              name="from"
              placeholder="City / Area"
              value={formData.from}
              onChange={handleChange}
              className="w-full text-sm p-2 sm:p-3 rounded bg-[#2A2A2A] mt-1"
            />
          </div>
        </div>

        <div className="mt-3 sm:mt-4">
          <label className="text-sm font-medium">About (Optional)</label>
          <input
            type="text"
            name="about"
            placeholder="Topic or context"
            value={formData.about}
            onChange={handleChange}
            className="w-full text-sm p-2 sm:p-3 rounded bg-[#2A2A2A] mt-1"
          />
        </div>

        <div className="mt-3 sm:mt-4">
          <label className="text-sm font-medium">Your Question *</label>
          <textarea
            name="question"
            placeholder="Type your question here..."
            value={formData.question}
            onChange={handleChange}
            rows={4}
            className="w-full text-sm p-2 sm:p-3 rounded bg-[#2A2A2A] mt-1"
          />
        </div>

        <button
          onClick={handleSubmit}
          className="w-full mt-4 sm:mt-6 
                 bg-[#D4AF37] text-black 
                 py-2 sm:py-3 
                 rounded-lg 
                 text-sm sm:text-base 
                 font-bold 
                 hover:scale-105 transition"
        >
          Submit Question
        </button>
      </div>

      {/* Popup */}
      {showPopup && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/70">
          <div
            className="bg-[#1A1A1A] 
                      border border-[#D4AF37] 
                      rounded-xl 
                      p-5 sm:p-8 
                      max-w-sm 
                      text-center 
                      shadow-lg relative"
          >
            <button
              onClick={() => setShowPopup(false)}
              className="absolute top-3 right-3 text-[#D4AF37]"
            >
              <X size={20} />
            </button>

            <h3
              className="text-lg sm:text-2xl 
                       font-bold 
                       text-[#D4AF37] 
                       mb-3"
            >
              Thank You!
            </h3>

            <p className="text-xs sm:text-sm text-gray-300">
              Your question has been sent via WhatsApp. Kindly wait for the
              scholar's reply.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
