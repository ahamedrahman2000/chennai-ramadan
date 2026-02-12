import { useState } from "react";

export default function RegistrationPage() {
  const [showThanks, setShowThanks] = useState(false);

  const [formData, setFormData] = useState({
    organization: "",
    serviceType: "",
    sehriType: "",
    servingTime: "",
    area: "",
    fullAddress: "",
    locationLink: "",
    contactName: "",
    contactNumber: "",
    secondNumber: "",
    additionalInfo: "",
  });

  const whatsappNumber = "919884680243";

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validateForm = () => {
    const requiredFields = [
      "organization",
      "serviceType",
      "sehriType",
      "servingTime",
      "area",
      "fullAddress",
      "contactName",
      "contactNumber",
    ];

    for (let field of requiredFields) {
      if (!formData[field]) {
        alert(`Please fill ${field.replace(/([A-Z])/g, " $1")}`);
        return false;
      }
    }
    return true;
  };

  const handleSubmit = () => {
    if (!validateForm()) return;
    setShowThanks(true);
  };

  const handleSend = () => {
    const message = `
*Sehri / Iftar Registration*

*Organization:* ${formData.organization}
*Service Type:* ${formData.serviceType}
*Sehri Type:* ${formData.sehriType}
*Serving Time:* ${formData.servingTime}
*Area:* ${formData.area}
*Address:* ${formData.fullAddress}
*Location Link:* ${formData.locationLink}
*Contact Name:* ${formData.contactName}
*Contact Number:* ${formData.contactNumber}
*Second Number:* ${formData.secondNumber}
*Additional Info:* ${formData.additionalInfo}
    `;

    const whatsappLink = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
      message
    )}`;

    window.open(whatsappLink, "_blank");

    setShowThanks(false);

    setFormData({
      organization: "",
      serviceType: "",
      sehriType: "",
      servingTime: "",
      area: "",
      fullAddress: "",
      locationLink: "",
      contactName: "",
      contactNumber: "",
      secondNumber: "",
      additionalInfo: "",
    });
  };

  return (
    <div className="min-h-screen bg-[#111111] text-white py-16 px-4">
      <div className="max-w-2xl mx-auto bg-[#1A1A1A] p-8 rounded-2xl shadow-xl border border-[#D4AF37]/30">
        <h2 className="text-3xl font-bold mb-4 text-[#D4AF37] text-center">
          Sehri / Iftar Registration
        </h2>

        <p className="text-center text-[#A1A1AA] mb-8">
          Register your Masjid / Organization providing Sehri or Iftar meals
          in Chennai.
        </p>

        {/* Organization */}
        <label className="block mb-2 font-semibold">
          Organization / Masjid Name *
        </label>
        <input
          type="text"
          name="organization"
          placeholder="e.g. Masjid-e-Noor"
          value={formData.organization}
          onChange={handleChange}
          className="w-full p-3 mb-4 rounded bg-[#2A2A2A]"
        />

        {/* Service Type */}
        <label className="block mb-2 font-semibold">
          Type of Service *
        </label>
        <select
          name="serviceType"
          value={formData.serviceType}
          onChange={handleChange}
          className="w-full p-3 mb-4 rounded bg-[#2A2A2A]"
        >
          <option value="">Select Service Type</option>
          <option>Masjid (Dine-in)</option>
          <option>Home Delivery</option>
          <option>Parcel (Tiffin)</option>
          <option>Hotel</option>
        </select>

        {/* Sehri Type */}
        <label className="block mb-2 font-semibold">
          Sehri Type *
        </label>
        <select
          name="sehriType"
          value={formData.sehriType}
          onChange={handleChange}
          className="w-full p-3 mb-4 rounded bg-[#2A2A2A]"
        >
          <option value="">Select Sehri Type</option>
          <option>Free Sehri</option>
          <option>Paid Sehri</option>
        </select>

        {/* Serving Time */}
        <label className="block mb-2 font-semibold">
          Serving Time *
        </label>
        <input
          type="text"
          name="servingTime"
          placeholder="e.g. 4:30 AM – 5:15 AM"
          value={formData.servingTime}
          onChange={handleChange}
          className="w-full p-3 mb-4 rounded bg-[#2A2A2A]"
        />

        {/* Area */}
        <label className="block mb-2 font-semibold">Area *</label>
        <input
          name="area"
          placeholder="e.g. Adyar, T. Nagar"
          value={formData.area}
          onChange={handleChange}
          className="w-full p-3 mb-4 rounded bg-[#2A2A2A]"
        />

        {/* Address */}
        <label className="block mb-2 font-semibold">
          Full Address *
        </label>
        <textarea
          name="fullAddress"
          placeholder="Enter complete address for directions..."
          value={formData.fullAddress}
          onChange={handleChange}
          rows={3}
          className="w-full p-3 mb-4 rounded bg-[#2A2A2A]"
        />

        {/* Location Link */}
        <label className="block mb-2 font-semibold">
          Google Maps Link (Optional)
        </label>
        <input
          name="locationLink"
          placeholder="Paste Google Maps link here"
          value={formData.locationLink}
          onChange={handleChange}
          className="w-full p-3 mb-4 rounded bg-[#2A2A2A]"
        />

        {/* Contact Name */}
        <label className="block mb-2 font-semibold">
          Contact Name *
        </label>
        <input
          name="contactName"
          placeholder="Full name of contact person"
          value={formData.contactName}
          onChange={handleChange}
          className="w-full p-3 mb-4 rounded bg-[#2A2A2A]"
        />

        {/* Contact Number */}
        <label className="block mb-2 font-semibold">
          Contact Number *
        </label>
        <input
          name="contactNumber"
          placeholder="+91 XXXXX XXXXX"
          value={formData.contactNumber}
          onChange={handleChange}
          className="w-full p-3 mb-4 rounded bg-[#2A2A2A]"
        />
        <label className="block mb-2 font-semibold">
          Second Number*
        </label>
        <input
          name="secondNumber"
          placeholder="+91 XXXXX XXXXX"
          value={formData.secondNumber}
          onChange={handleChange}
          className="w-full p-3 mb-4 rounded bg-[#2A2A2A]"
        />

        {/* Additional Info */}
        <label className="block mb-2 font-semibold">
          Additional Info (Optional)
        </label>
        <textarea
          name="additionalInfo"
          placeholder="Any extra details like number of meals, special notes..."
          value={formData.additionalInfo}
          onChange={handleChange}
          rows={3}
          className="w-full p-3 mb-6 rounded bg-[#2A2A2A]"
        />

        {/* Register Button */}
        <button
          onClick={handleSubmit}
          className="w-full bg-[#D4AF37] text-black py-3 rounded-lg font-bold shadow-[0_0_25px_rgba(212,175,55,0.9)] hover:shadow-[0_0_40px_rgba(212,175,55,1)] hover:scale-105 transition duration-300"
        >
          Register
        </button>
      </div>

      {/* Thank You Modal */}
      {showThanks && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/70">
          <div className="bg-[#1A1A1A] border-2 border-[#D4AF37] rounded-xl p-8 max-w-sm text-center shadow-[0_0_50px_rgba(212,175,55,0.6)]">
            <h3 className="text-2xl font-bold text-[#D4AF37] mb-4">
              Thank You!
            </h3>
            <p className="text-white mb-6">
              May Allah reward you for your contribution.
            </p>
            <button
              onClick={handleSend}
              className="bg-[#D4AF37] text-black py-2 px-6 rounded-lg font-semibold animate-pulse shadow-[0_0_20px_rgba(212,175,55,0.8)]"
            >
              Send to WhatsApp
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
