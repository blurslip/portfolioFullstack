import { useEffect, useState } from "react";
import { toast } from "react-toastify";
const BASE_URL = import.meta.env.VITE_API_URL;
function EducationCard({ showDeleteBtn = true }) {
  const [educations, setEducations] = useState([]);
  //*************Fetching Education*************
  useEffect(() => {
    async function getAllEducation() {
      try {
        const responose = await fetch(`${BASE_URL}/api/educations`);
        if (!responose.ok) {
          throw new Error("Something went wrong");
        }
        const data = await responose.json();
        setEducations(data);
      } catch (error) {
        console.error("Something went wrong with fetching educations", error);
      }
    }
    getAllEducation();
  }, []);

  //*************Delete Education*************
  function deleteEducation(id) {
    async function deleteRequest() {
      try {
        const responose = await fetch(
          `${BASE_URL}/api/educations/deleteById/${id}`,
          {
            method: "DELETE",
          }
        );
        if (!responose.ok) {
          toast.error(`Error deleting Education(ID: ${id})`);
        }
        toast.success(`Successfully Deleted Education(ID: ${id})`);
      } catch (error) {
        console.error("Something went wrong with deleting educations", error);
      }
    }
    deleteRequest();
  }
  return (
    <>
      <div className="container mt-35 mb-10 min-h-[50vh]">
        {educations.map((education, index) => (
          <div
            key={index}
            className="relative text-textprimary border border-textprimary/20 rounded-4xl flex items-start justify-between lg:flex-row lg:items-center gap-13 flex-col px-9 py-9 mx-10 md:mx-0 mb-10"
          >
            {/* Delete Icon */}
            {showDeleteBtn && (
              <button
                className="absolute top-4 right-4 p-2 rounded-full hover:bg-red-100 focus:outline-none"
                title="Delete"
                type="button"
                onClick={() => deleteEducation(education.id)}
              >
                {/* Trash (dustbin) icon */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6 text-red-500"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 7.5V19a2 2 0 002 2h8a2 2 0 002-2V7.5M4 7.5h16M9.5 7.5V5a1.5 1.5 0 013 0v2.5"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M10 11v6M14 11v6"
                  />
                </svg>
              </button>
            )}
            <div className="text-left leading-8">
              <h1 className="lg:text-3xl mb-1.5">{education.education}</h1>
              <p className="text-textpurple">{education.description}</p>
              <p className="text-textprimary/30">{`${education.fromDate} - ${education.toDate}`}</p>
            </div>
            {/* <div>
              <h1 className="text-[#5FB9B0] text-[20px]">View Certificate</h1>
            </div> */}
          </div>
        ))}
      </div>
    </>
  );
}
export default EducationCard;
