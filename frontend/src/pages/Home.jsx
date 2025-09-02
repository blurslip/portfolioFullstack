import HeroSection from "../components/HeroSection";
import Navbar from "../components/Navbar";
import SkillSection from "../components/SkillSection";
import TechSection from "../components/TechSection";
import ThemeToggle from "../components/ThemeToggle";
import Footer from "../components/Footer";
import SkillTitles from "../components/SkillTitles";

function Home() {
  return (
    <>
      <div className="relatie">
        {/**************THEME TOGGLE**************/}

        <ThemeToggle />

        {/**************NAVBAR**************/}

        <Navbar />
        <main>
          {/**************HERO SECTION**************/}

          <HeroSection />

          {/* *************SKILL**************/}

          <SkillSection />

          <SkillTitles />

          {/**************TECHNOLOGY SECTION**************/}

          <TechSection />
        </main>

        {/**************FOOTER**************/}

        <Footer />
      </div>
    </>
  );
}
export default Home;
