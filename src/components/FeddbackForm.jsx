import { useState } from "react";

export default function FeedbackForm() {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const whatsappNumber = "919884680243"; // your number with country code

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validateForm = () => {
    const requiredFields = ["name", "message"];
    for (let field of requiredFields) {
      if (!formData[field]) {
        alert(`Please fill ${field}`);
        return false;
      }
    }
    return true;
  };

  const handleSend = () => {
    if (!validateForm()) return;

    const message = `
*Feedback Received*

*Name:* ${formData.name}
*Email (Optional):* ${formData.email}
*Message:* ${formData.message}
    `;

    const whatsappLink = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
      message
    )}`;
    window.open(whatsappLink, "_blank");

    setOpen(false);
    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <div className="flex justify-center mt-12 px-2">
      {/* Feedback Button */}
      <button
        onClick={() => setOpen(true)}
        className="bg-[#D4AF37] text-black px-6 py-3 rounded-lg font-semibold animate-pulse shadow-[0_0_30px_rgba(212,175,55,1)]"
      >
        Give Feedback
      </button>

      {/* Modal */}
      {open && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 overflow-auto p-4">
          <div className="bg-[#1A1A1A] text-white w-full max-w-lg rounded-2xl p-6 relative overflow-y-auto max-h-[90vh] flex flex-col gap-6">
            
            {/* Close Button */}
            <button
              onClick={() => setOpen(false)}
              className="absolute top-4 right-4 text-[#D4AF37] font-bold text-2xl"
            >
              ✕
            </button>

            {/* Form */}
            <div>
              <h2 className="text-2xl font-bold mb-4 text-[#D4AF37] text-center">
                Feedback Form
              </h2>
              <p className="mb-6 text-[#A1A1AA] text-center text-sm sm:text-base">
                We value your feedback! Kindly fill the form below.
              </p>

              <label className="block mb-2 font-semibold text-sm">Name *</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Your name"
                className="w-full p-3 mb-4 rounded bg-[#2A2A2A] placeholder-gray-400 text-sm"
              />

              <label className="block mb-2 font-semibold text-sm">Email (Optional)</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Your email"
                className="w-full p-3 mb-4 rounded bg-[#2A2A2A] placeholder-gray-400 text-sm"
              />

              <label className="block mb-2 font-semibold text-sm">Message *</label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Your feedback..."
                rows={4}
                className="w-full p-3 mb-4 rounded bg-[#2A2A2A] placeholder-gray-400 text-sm"
              />

              <button
                onClick={handleSend}
                className="w-full bg-[#D4AF37] text-black py-3 rounded-lg font-semibold animate-pulse shadow-[0_0_25px_rgba(212,175,55,1)] text-sm sm:text-base"
              >
                Send to WhatsApp
              </button>
            </div>

            {/* Info Message */}
            <div className="bg-[#2A2A2A] p-4 rounded-lg border border-[#D4AF37] text-[#FFD700] text-center text-sm sm:text-base">
              Sorry for any inconvenience due to wrong locations or details. <br />
              Your feedback helps us improve with Sehri & newly registered providers.
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
