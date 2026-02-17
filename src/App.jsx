import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import PrayerTimes from "./components/PrayerTimes";
import ProviderCard from "./components/ProviderCard";
import Disclaimer from "./components/DisclaimerModal";
import Footer from "./components/Footer";
import FindSehri from "./components/FindSehri";
import ThankYou from "./components/ThankYou";
import OrganizationList from "./components/OrganizationList";
import RamadanChennaiSEO from "./components/RamadanChennaiSEO";
import RegistrationPage from "./components/RegisterSehri";
import SehriTicker from "./components/SehriTicker";
import AskScholar from "./components/AskScholar";
import { AboutUs } from "./components/AboutUs";
import ComingSoon from "./components/ComingSoon";
import ScrollToTop from "./components/ScrollToTop";
import { HelpSection } from "./components/HelpSection";
import MasjidMap from "./components/MasjidMap";
import MasjidMap2 from "./components/MasjidMap2";
import DuaPage from "./components/Duas";
import { useEffect, useState } from "react";
import BlogPage from "./components/Blog";
function App() {
  const [visitorCount, setVisitorCount] = useState(0);
  useEffect(() => {
    // Disable right-click
    const handleContextMenu = (e) => e.preventDefault();
    document.addEventListener("contextmenu", handleContextMenu);

    // Disable F12, Ctrl+Shift+I, Ctrl+Shift+J, Ctrl+U
    const handleKeyDown = (e) => {
      if (
        e.key === "F12" ||
        (e.ctrlKey && e.shiftKey && ["I", "J"].includes(e.key.toUpperCase())) ||
        (e.ctrlKey && e.key.toUpperCase() === "U")
      ) {
        e.preventDefault();
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("contextmenu", handleContextMenu);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  useEffect(() => {
    // Register visit
    fetch("https://ramadan-sehri-backend.onrender.com/api/visit", {
      method: "POST",
    });

    // Get total count
    fetch("https://ramadan-sehri-backend.onrender.com/api/visitor-count")
      .then((res) => res.json())
      .then((data) => setVisitorCount(data.total));
  }, []);
  return (
    <div className="flex flex-col min-h-screen bg-[#1A1A1A] text-[#E5E7EB]">
      <Navbar />
      <SehriTicker />
      <ScrollToTop />
      <div className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/find-sehri" element={<FindSehri />} />
          <Route path="/prayer-times" element={<PrayerTimes />} />
          <Route path="/providers" element={<ProviderCard />} />
          <Route path="/disclaimer" element={<Disclaimer />} />
          <Route path="/thank-you" element={<ThankYou />} />
          <Route path="/organization-list" element={<OrganizationList />} />
          <Route path="/register-sehri" element={<RegistrationPage />} />
          <Route path="/ask-scholar" element={<AskScholar />} />
          <Route path="/about-us" element={<AboutUs />} />
          <Route path="/dua" element={<DuaPage />} />
          <Route path="/coming-soon" element={<ComingSoon />} />
          <Route path="/help" element={<HelpSection />} />
          <Route path="/sehri-locations" element={<MasjidMap />} />
          <Route path="/sehri-locations2" element={<MasjidMap2 />} />
          <Route path="/blogPage" element={<BlogPage />} />
          <Route
            path="/ramadan-sehri-chennai-2026"
            element={<RamadanChennaiSEO />}
          />
        </Routes>
      </div>

      <Footer visitorCount={visitorCount} />
    </div>
  );
}

export default App;
