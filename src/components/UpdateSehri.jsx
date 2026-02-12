import { useState } from "react";

export default function UpdateSehri() {
  const [open, setOpen] = useState(false);
  const [showThanks, setShowThanks] = useState(false);
  const [formData, setFormData] = useState({
    organization: "",
    serviceType: "",
    sehriType: "",
    area: "",
    fullAddress: "",
    locationLink: "",
    contactName: "",
    contactNumber: "",
    secondNumber: "",
    additionalInfo: "",
  });

  const whatsappNumber = "919884680243"; // your number with country code

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validateForm = () => {
    const requiredFields = [
      "organization",
      "serviceType",
      "sehriType",
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

  const handleShowThanks = () => {
    if (!validateForm()) return;
    setOpen(false);
    setShowThanks(true);
  };

  const handleSend = () => {
    const message = `
*Sehri Update / Registration*

*Organization / Masjid Name:* ${formData.organization}
*Type of Service:* ${formData.serviceType}
*Sehri Type:* ${formData.sehriType}
*Area:* ${formData.area}
*Full Address:* ${formData.fullAddress}
*Location Link (Optional):* ${formData.locationLink}
*Point of Contact:* ${formData.contactName}
*Contact Number:* ${formData.contactNumber}
*Second Number (Optional):* ${formData.secondNumber}
*Additional Information:* ${formData.additionalInfo}
    `;

    const whatsappLink = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
      message
    )}`;
    window.open(whatsappLink, "_blank");

    // reset
    setFormData({
      organization: "",
      serviceType: "",
      sehriType: "",
      area: "",
      fullAddress: "",
      locationLink: "",
      contactName: "",
      contactNumber: "",
      secondNumber: "",
      additionalInfo: "",
    });
    setShowThanks(false);
  };

  return (
    <div className="flex justify-center mt-6">
      {/* Open Form Button */}
      <button
        onClick={() => setOpen(true)}
        className="bg-[#D4AF37] text-black px-6 py-3 rounded-lg font-semibold animate-pulse shadow-[0_0_30px_rgba(212,175,55,1)]"
      >
        Register / Update Sehri Details
      </button>

      {/* Form Modal */}
      {open && (
        <div className="fixed inset-0 mt-8 bg-black bg-opacity-50 flex items-center justify-center z-500 overflow-auto p-4  ">
          <div className="bg-[#1A1A1A] text-white p-6 rounded-lg w-full max-w-lg overflow-y-auto max-h-[90vh] relative">
            {/* Close Button */}
            <button
              onClick={() => setOpen(false)}
              className="absolute top-4 right-4 text-[#D4AF37] font-bold text-xl"
            >
              ✕
            </button>

            <h2 className="text-2xl font-bold mb-3 text-[#D4AF37]">
              Register / Update Sehri Details
            </h2>
            <p className="mb-6 text-[#A1A1AA]">
              Help us keep Sehri distribution points updated. Fill in the details below.
            </p>

            {/* Organization / Masjid Name */}
            <label className="block mb-2 font-semibold">Organization / Masjid Name *</label>
            <input
              type="text"
              name="organization"
              value={formData.organization}
              onChange={handleChange}
              placeholder="e.g. Masjid-e-Khair"
              className="w-full p-3 mb-4 rounded bg-[#2A2A2A] placeholder-gray-400"
            />

            {/* Type of Service */}
            <label className="block mb-2 font-semibold">Type of Service *</label>
            <select
              name="serviceType"
              value={formData.serviceType}
              onChange={handleChange}
              className="w-full p-3 mb-4 rounded bg-[#2A2A2A] placeholder-gray-400"
            >
              <option value="">Select Service Type</option>
              <option value="Masjid (Dine-in)">Masjid (Dine-in)</option>
              <option value="Home Delivery">Home Delivery</option>
              <option value="Parcel (Tiffin)">Parcel (Tiffin)</option>
              <option value="Hotel">Hotel</option>
            </select>

            {/* Sehri Type */}
            <label className="block mb-2 font-semibold">Sehri Type *</label>
            <select
              name="sehriType"
              value={formData.sehriType}
              onChange={handleChange}
              className="w-full p-3 mb-4 rounded bg-[#2A2A2A] placeholder-gray-400"
            >
              <option value="">Select Sehri Type</option>
              <option value="Free Sehri">Free Sehri</option>
              <option value="Paid Sehri">Paid Sehri</option>
            </select>

            {/* Area */}
            <label className="block mb-2 font-semibold">Area *</label>
            <input
              name="area"
              value={formData.area}
              onChange={handleChange}
              placeholder="e.g. Adyar, Nungambakkam"
              className="w-full p-3 mb-4 rounded bg-[#2A2A2A] placeholder-gray-400"
            />

            {/* Full Address */}
            <label className="block mb-2 font-semibold">Full Address *</label>
            <textarea
              name="fullAddress"
              value={formData.fullAddress}
              onChange={handleChange}
              placeholder="Complete address for directions..."
              className="w-full p-3 mb-4 rounded bg-[#2A2A2A] placeholder-gray-400"
              rows={3}
            />

            {/* Optional Google Maps Link */}
            <label className="block mb-2 font-semibold">
              Google Maps / Location Link (Optional)
            </label>
            <input
              name="locationLink"
              value={formData.locationLink}
              onChange={handleChange}
              placeholder="Paste location link"
              className="w-full p-3 mb-4 rounded bg-[#2A2A2A] placeholder-gray-400"
            />

            {/* Contact Name */}
            <label className="block mb-2 font-semibold">Point of Contact Name *</label>
            <input
              name="contactName"
              value={formData.contactName}
              onChange={handleChange}
              placeholder="Full name of contact person"
              className="w-full p-3 mb-4 rounded bg-[#2A2A2A] placeholder-gray-400"
            />

            {/* Contact Numbers */}
            <label className="block mb-2 font-semibold">Contact Number *</label>
            <input
              name="contactNumber"
              value={formData.contactNumber}
              onChange={handleChange}
              placeholder="+91 XXXXX XXXXX"
              className="w-full p-3 mb-4 rounded bg-[#2A2A2A] placeholder-gray-400"
            />

            <label className="block mb-2 font-semibold">Additional Contact Number (Optional)</label>
            <input
              name="secondNumber"
              value={formData.secondNumber}
              onChange={handleChange}
              placeholder="+91 XXXXX XXXXX"
              className="w-full p-3 mb-4 rounded bg-[#2A2A2A] placeholder-gray-400"
            />

            {/* Additional Information */}
            <label className="block mb-2 font-semibold">Additional Information (Optional)</label>
            <textarea
              name="additionalInfo"
              value={formData.additionalInfo}
              onChange={handleChange}
              placeholder="Any extra info you'd like to share..."
              className="w-full p-3 mb-6 rounded bg-[#2A2A2A] placeholder-gray-400"
              rows={3}
            />

            {/* Show Thanks Popup Button */}
            <button
              onClick={handleShowThanks}
              className="w-full bg-[#D4AF37] text-black py-3 rounded-lg font-semibold animate-pulse shadow-[0_0_30px_rgba(212,175,55,1)]"
            >
              Submit
            </button>
          </div>
        </div>
      )}

      {/* Thanks / WhatsApp Popup */}
      {showThanks && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <div className="bg-[#1A1A1A] border-2 border-[#D4AF37] rounded-xl p-8 max-w-sm text-center shadow-[0_0_50px_rgba(212,175,55,0.6)]">
            <h3 className="text-2xl font-bold text-[#D4AF37] mb-4">Thank You!</h3>
            <p className="text-white mb-6">
              May Allah reward you for adding or updating Sehri details.
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
