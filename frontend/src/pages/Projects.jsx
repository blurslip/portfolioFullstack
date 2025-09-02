import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import ProjectCard from "../components/ProjectCard";
import ThemeToggle from "../components/ThemeToggle";

function Project() {
  return (
    <>
      <ThemeToggle />
      <Navbar />
      <ProjectCard />
      <Footer />
    </>
  );
}
export default Project;
