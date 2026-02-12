import { AboutUs } from "../components/AboutUs";
import Disclaimer from "../components/DisclaimerModal";
import FeedbackForm from "../components/FeddbackForm";
import Hero from "../components/Hero";
import MasjidMap from "../components/MasjidMap";
import MissionSection from "../components/MissionSection";
import RamadanPopup from "../components/RamadanPopup";
import SehriStats from "../components/SehriStats";

export default function Home() {
  return (
    <>
      <RamadanPopup />
      <Hero />
      <MasjidMap />
      <AboutUs/>
      <MissionSection /> 
      <SehriStats/> 
      <Disclaimer />
      <FeedbackForm/>
    </>
  );
}
