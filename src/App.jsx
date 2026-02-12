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
import UpdateSehri from "./components/UpdateSehri";

function App() {
  return (
    <div className="flex flex-col min-h-screen bg-[#1A1A1A] text-[#E5E7EB]">
      <Navbar />

      <div className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/find-sehri" element={<FindSehri />} />
          <Route path="/prayer-times" element={<PrayerTimes />} />
          <Route path="/providers" element={<ProviderCard />} />
          <Route path="/disclaimer" element={<Disclaimer />} />
          <Route path="/thank-you" element={<ThankYou />} />
          <Route path="/organization-list" element={<OrganizationList />} />
          <Route path="/update-sehri" element={<UpdateSehri />} />
          <Route
            path="/ramadan-sehri-chennai-2026"
            element={<RamadanChennaiSEO />}
          />
        </Routes>
      </div>

      <Footer />
    </div>
  );
}

export default App;
