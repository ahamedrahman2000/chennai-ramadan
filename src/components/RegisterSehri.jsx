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

  const [errors, setErrors] = useState({});

  const whatsappNumber = "919884680243";

  const handleChange = (e) => {
    const { name, value } = e.target;

    // For contact number, allow only digits
    if (name === "contactNumber") {
      if (!/^\d*$/.test(value)) return;
    }

    setFormData({ ...formData, [name]: value });

    // clear error while typing
    if (errors[name]) {
      setErrors({ ...errors, [name]: "" });
    }
  };

  const validateForm = () => {
    const newErrors = {};

    // Organization: letters and numbers only, max 30
    if (!formData.organization) {
      newErrors.organization = "Organization is required";
    } else if (!/^[a-zA-Z0-9 ]{1,30}$/.test(formData.organization)) {
      newErrors.organization =
        "Only letters and numbers allowed (max 30 characters)";
    }

    // Service Type
    if (!formData.serviceType) {
      newErrors.serviceType = "Please select service type";
    }

    // Sehri Type
    if (!formData.sehriType) {
      newErrors.sehriType = "Please select Sehri type";
    }

    // Serving Time
    if (!formData.servingTime) {
      newErrors.servingTime = "Please select serving time";
    }

    // Area: letters and numbers only, max 30
    if (!formData.area) {
      newErrors.area = "Area is required";
    } else if (!/^[a-zA-Z0-9 ]{1,30}$/.test(formData.area)) {
      newErrors.area =
        "Only letters and numbers allowed (max 30 characters)";
    }

    // Full Address: max 300
    if (!formData.fullAddress) {
      newErrors.fullAddress = "Full Address is required";
    } else if (formData.fullAddress.length > 300) {
      newErrors.fullAddress = "Maximum 300 characters allowed";
    }

    // Contact Name: letters and space only
    if (!formData.contactName) {
      newErrors.contactName = "Contact Name is required";
    } else if (!/^[a-zA-Z ]{1,50}$/.test(formData.contactName)) {
      newErrors.contactName = "Only letters allowed (max 50 characters)";
    }

    // Contact Number: numbers only, exactly 10 digits
    if (!formData.contactNumber) {
      newErrors.contactNumber = "Contact Number is required";
    } else if (!/^\d{10}$/.test(formData.contactNumber)) {
      newErrors.contactNumber =
        "Contact Number must be exactly 10 digits";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
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
    setErrors({});
  };

  const renderInput = (label, name, placeholder, type = "text", rows) => (
    <div className="mb-4">
      <label className="block mb-1 font-semibold">{label}</label>
      {type === "textarea" ? (
        <textarea
          name={name}
          placeholder={placeholder}
          value={formData[name]}
          onChange={handleChange}
          rows={rows || 3}
          className={`w-full p-3 rounded ${
            errors[name] ? "border-2 border-red-500" : "border-2 border-[#D4AF37]"
          } bg-[#2A2A2A]`}
        />
      ) : type === "select" ? (
        <select
          name={name}
          value={formData[name]}
          onChange={handleChange}
          className={`w-full p-3 rounded ${
            errors[name] ? "border-2 border-red-500" : "border-2 border-[#D4AF37]"
          } bg-[#2A2A2A]`}
        >
          <option value="">Select {label}</option>
          {name === "serviceType" && (
            <>
              <option>Masjid (Dine-in)</option>
              <option>Home Delivery</option>
              <option>Parcel (Tiffin)</option>
              <option>Hotel</option>
            </>
          )}
          {name === "sehriType" && (
            <>
              <option>Free Sehri</option>
              <option>Paid Sehri</option>
            </>
          )}
          {name === "servingTime" && (
            <>
              <option>2:30 AM onwards</option>
              <option>3:00 AM – 4:00 AM</option>
              <option>3:30 AM – 4:30 AM</option>
            </>
          )}
        </select>
      ) : (
        <input
          type={type}
          name={name}
          placeholder={placeholder}
          value={formData[name]}
          onChange={handleChange}
          className={`w-full p-3 rounded ${
            errors[name] ? "border-2 border-red-500" : "border-2 border-[#D4AF37]"
          } bg-[#2A2A2A]`}
        />
      )}
      {errors[name] && <p className="text-red-500 mt-1 text-sm">{errors[name]}</p>}
    </div>
  );

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

        {renderInput("Organization / Masjid Name *", "organization", "e.g. Masjid-e-Noor")}
        {renderInput("Type of Service *", "serviceType", "", "select")}
        {renderInput("Sehri Type *", "sehriType", "", "select")}
        {renderInput("Serving Time *", "servingTime", "", "select")}
        {renderInput("Area *", "area", "e.g. Adyar, T. Nagar")}
        {renderInput("Full Address *", "fullAddress", "Enter complete address", "textarea")}
        {renderInput("Google Maps Link (Optional)", "locationLink", "Paste Google Maps link")}
        {renderInput("Contact Name *", "contactName", "Full name of contact person")}
        {renderInput("Contact Number *", "contactNumber", "10 digit number only")}
        {renderInput("Second Number (Optional)", "secondNumber", "10 digit number only")}
        {renderInput("Additional Info (Optional)", "additionalInfo", "Extra details", "textarea")}

        <button
          onClick={handleSubmit}
          className="w-full bg-[#D4AF37] text-black py-3 rounded-lg font-bold shadow-[0_0_25px_rgba(212,175,55,0.9)] hover:shadow-[0_0_40px_rgba(212,175,55,1)] hover:scale-105 transition duration-300"
        >
          Register
        </button>
      </div>

      {showThanks && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/70">
          <div className="bg-[#1A1A1A] border-2 border-[#D4AF37] rounded-xl p-8 max-w-sm text-center shadow-[0_0_50px_rgba(212,175,55,0.6)]">
            <h3 className="text-2xl font-bold text-[#D4AF37] mb-4">
              Thank You!
            </h3>
            <p className="text-white mb-6">May Allah reward you for your contribution.</p>
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
