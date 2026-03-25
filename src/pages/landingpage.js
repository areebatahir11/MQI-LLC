import Navbar from "../components/Layout/navbar.js";
import Hero from "../components/LandingPage/hero.js";
import AboutPreview from "../components/LandingPage/aboutpreview.js";
import OurGoals from "../components/LandingPage/ourgoals";
import ServicesPreview from "../components/LandingPage/servicespreview.js";
import OurTeam from "../components/LandingPage/ourteam.js";
import FeaturedProjects from "../components/LandingPage/featuredprojects.js";
import WhyChooseUs from "../components/LandingPage/whychooseus.js";
import TrustBadges from "../components/LandingPage/trustbadges.js";
import Footer from "../components/Layout/footer.js";

export default function LandingPage() {
  return (
    <>
      <Navbar />
      <Hero />
      <AboutPreview />
      <OurGoals />
      <ServicesPreview />
      <OurTeam />
      <FeaturedProjects />
      <WhyChooseUs />
      <TrustBadges />
      <Footer />
    </>
  );
}
