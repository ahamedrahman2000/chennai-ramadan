import { AboutUs } from "../components/AboutUs";
import Disclaimer from "../components/DisclaimerModal"; 
import FeedbackForm from "../components/FeddbackForm";
import { HelpSection } from "../components/HelpSection";
import Hero from "../components/Hero";
import HomeStatusPopup from "../components/HomeStatusPopup"; 
import MasjidMap from "../components/MasjidMap"; 
import MissionSection from "../components/MissionSection"; 
import OuMission from "../components/OurMission";
import RamadanPopup from "../components/RamadanPopup";
import SehriStats from "../components/SehriStats";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function Home() {
  const location = useLocation();

  useEffect(() => {
    if (location.hash === "#map-section") {
      const element = document.getElementById("map-section");
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, [location]);

  return (
    <>
      <RamadanPopup />
      <HomeStatusPopup />

      <Hero /> 
      <div id="map-section">
        <MasjidMap />
      </div>
      <HelpSection />
      <AboutUs />
      <MissionSection /> 
      <OuMission />
      <SehriStats />
      <Disclaimer />
      <div id="feedback">
        <FeedbackForm />
      </div>
    </>
  );
}
