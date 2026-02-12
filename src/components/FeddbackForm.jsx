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
    <div className="flex justify-center mt-6">
      <button
        onClick={() => setOpen(true)}
        className="bg-[#D4AF37] text-black px-6 py-3 rounded-lg font-semibold animate-pulse shadow-[0_0_30px_rgba(212,175,55,1)]"
      >
        Give Feedback
      </button>

      {open && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 overflow-auto p-4">
          <div className="bg-[#1A1A1A] text-white p-6 rounded-lg w-full max-w-4xl overflow-y-auto max-h-[90vh] relative flex flex-col md:flex-row gap-6">
            {/* Close Button */}
            <button
              onClick={() => setOpen(false)}
              className="absolute top-4 right-4 text-[#D4AF37] font-bold text-xl"
            >
              ✕
            </button>

            {/* Left Side: Form */}
            <div className="flex-1">
              <h2 className="text-2xl font-bold mb-3 text-[#D4AF37]">
                Feedback Form
              </h2>
              <p className="mb-6 text-[#A1A1AA]">
                We value your feedback! Please fill out the form below.
              </p>

              {/* Name */}
              <label className="block mb-2 font-semibold">Name *</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Your name"
                className="w-full p-3 mb-4 rounded bg-[#2A2A2A] placeholder-gray-400"
              />

              {/* Email */}
              <label className="block mb-2 font-semibold">Email (Optional)</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Your email"
                className="w-full p-3 mb-4 rounded bg-[#2A2A2A] placeholder-gray-400"
              />

              {/* Message */}
              <label className="block mb-2 font-semibold">Message *</label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Your feedback..."
                className="w-full p-3 mb-6 rounded bg-[#2A2A2A] placeholder-gray-400"
                rows={4}
              />

              {/* Submit */}
              <button
                onClick={handleSend}
                className="w-full bg-[#D4AF37] text-black py-3 rounded-lg font-semibold animate-pulse shadow-[0_0_30px_rgba(212,175,55,1)]"
              >
                Send to WhatsApp
              </button>
            </div>

            {/* Right Side: Message */}
            <div className="flex-1 bg-[#2A2A2A] p-4 rounded-lg border border-[#D4AF37] text-[#FFD700] flex items-center justify-center">
              <p className="text-lg md:text-xl font-semibold text-center">
                Sorry for the inconvenience for wrong location and details. <br />
                We are improving by using Sehri or newly registered people help.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
