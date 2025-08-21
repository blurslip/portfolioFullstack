import { ToastContainer } from "react-toastify";
import AddSkillForm from "../components/AddSkillForm";
import AddTechForm from "../components/AddTechForm";
import EducationComponentPopup from "../components/EducatiionComponentPopup";

function AddSkill({ onLogout }) {

  return (
    <>
      <div>
        <AddSkillForm onLogout={onLogout} />
        <AddTechForm />
        <EducationComponentPopup />
      </div>
      <ToastContainer />
    </>
  );
}

export default AddSkill;
