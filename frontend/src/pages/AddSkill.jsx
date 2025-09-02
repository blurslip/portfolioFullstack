import { ToastContainer } from "react-toastify";
import AddSkillForm from "../components/AddSkillForm";
import AddTechForm from "../components/AddTechForm";
import EducationComponentPopup from "../components/EducatiionComponentPopup";
import UploadCV from "../components/UploadCV";
import ProjectCard from "../components/ProjectCard";

function AddSkill({ onLogout }) {

  return (
    <>
      <div>
        <AddSkillForm onLogout={onLogout} />
        <AddTechForm />
        <EducationComponentPopup />
        <UploadCV />
        <ProjectCard editMode={true}/>
      </div>
      <ToastContainer />
    </>
  );
}

export default AddSkill;
