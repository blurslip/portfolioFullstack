import EducationCard from "../components/EducationCard";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import ThemeToggle from "../components/ThemeToggle";

function Education() {
  return (
    <>
      <ThemeToggle />
      <Navbar />
      <EducationCard showDeleteBtn = {false}/>
      <Footer />
    </>
  );
}
export default Education;
