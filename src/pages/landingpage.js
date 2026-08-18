import Navbar from "../components/Layout/navbar.js";
import Hero from "../components/LandingPage/hero.js";
import AboutPreview from "../components/LandingPage/aboutpreview.js";
import ServicesPreview from "../components/LandingPage/servicespreview.js";
import OurTeam from "../components/LandingPage/ourteam.js";
import FeaturedProjects from "../components/LandingPage/featuredprojects.js";
import WhyChooseUs from "../components/LandingPage/whychooseus.js";
import TrustBadges from "../components/LandingPage/trustbadges.js";
import Footer from "../components/Layout/footer.js";
import OurVision from "@/components/LandingPage/ourvision.js";
import OurMission from "@/components/LandingPage/ourmission.js";
import OurMachinery from "@/components/LandingPage/ourmachinery.js";

export default function LandingPage() {
  return (
    <>
      <Navbar />
      <Hero />
      <div className="[&>section]:py-16">
        <AboutPreview />
        <OurVision />
        <OurMission />
        <ServicesPreview />
        <OurTeam />
        <FeaturedProjects />
        <OurMachinery />
        <WhyChooseUs />
        <TrustBadges />
      </div>
      <Footer />
    </>
  );
}