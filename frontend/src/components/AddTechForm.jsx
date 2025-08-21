import { useState } from "react";
import TechSection from "./TechSection";
import EditTechPopup from "./EditTechPopup";

function AddTechForm() {
  const [showPopup, setShowPopup] = useState(false);
  return (
    <>
      <div className="w-full flex flex-col items-center justify-center mt-6 mb-6 px-2 sm:px-4">
        <div className="w-full border border-navblock rounded-2xl ba relative max-w-full sm:p-8 p-4 flex flex-col items-center">
          <h1 className="text-white font-bold text-2xl sm:text-3xl md:text-4xl mt-6 sm:mt-10 text-center">
            ADD NEW SKILL TO YOUR ARSENAL{" "}
          </h1>
          <button
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-3 py-1.5 sm:px-4 sm:py-2 rounded-md shadow-md focus:outline-none cursor-pointer text-sm sm:text-base mt-20"
            onClick={() => setShowPopup(true)}
          >
            Edit
          </button>
          <div className="w-full mt-4">
            <TechSection scale={1} showHeading={false} />
          </div>
        </div>
      </div>
      <EditTechPopup isOpen={showPopup} onClose={() => setShowPopup(false)} />
    </>
  );
}
export default AddTechForm;
