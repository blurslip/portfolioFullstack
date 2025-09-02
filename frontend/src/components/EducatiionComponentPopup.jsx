import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import dateFormatter from "../CustomFunc/MonYearFormatter.js";
import capitalizeWords from "../CustomFunc/LetterCapilizer.js";
import EducationCard from "./EducationCard.jsx";
const BASE_URL = import.meta.env.VITE_API_URL;
// const educations = [
//   {
//     name: "Wise Up",
//     description: "Certificate in advanced English",
//     date: "Jan 2020 - Dec 2021",
//   },
//   {
//     name: "Wise Up",
//     description: "Certificate in advanced English",
//     date: "Jan 2020 - Dec 2021",
//   },
//   {
//     name: "Wise Up",
//     description: "Certificate in advanced English",
//     date: "Jan 2020 - Dec 2021",
//   },
// ];
function EducationComponentPopup() {
  const [showPopup, setShowPopup] = useState(false);
  const [formattedFromDate, setFormattedFromDate] = useState("");
  const [formattedToDate, setFormattedToDate] = useState("");

  const [form, setForm] = useState({
    education: "",
    description: "",
    fromDate: "",
    toDate: "",
  });

  useEffect(() => {
    setFormattedFromDate(dateFormatter(form.fromDate));

    setFormattedToDate(dateFormatter(form.toDate));
  }, [form.from, form.toDate]);

  //   Controlled Input

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: capitalizeWords(e.target.value) });
  };

  const handleClose = () => setShowPopup(false);

  //   Adding a Education

  async function addNewEducation() {
    try {
      const payload = {
        education: form.education,
        description: form.description,
        fromDate: formattedFromDate,
        toDate: formattedToDate,
      };
      const response = await fetch(`${BASE_URL}/api/educations`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      console.log(payload);
      if (!response.ok) throw new Error("Error adding Education");
      toast.success(`Education added succesfully`);
    } catch (error) {
      toast.error("Something went wrong");
      console.error("Something went wrong ", error);
    }
  }

  return (
    <>
      <div className="border border-navblock container sm:p-10 rounded-2xl">
        <h1 className="text-textprimary font-bold text-2xl sm:text-3xl md:text-4xl mt-6 sm:mt-10 text-center">
          Manage Your Education
        </h1>
        <button
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md shadow-md focus:outline-none cursor-pointer mt-10"
          onClick={() => setShowPopup(true)}
        >
          Edit
        </button>

        {showPopup && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-60 z-50">
            <div className="bg-white dark:bg-[#18181b] p-8 rounded-lg shadow-lg w-full max-w-md relative">
              <button
                className="absolute top-2 right-2 text-gray-400 hover:text-gray-700 dark:hover:text-white text-2xl font-bold"
                onClick={handleClose}
              >
                &times;
              </button>
              <h2 className="text-2xl font-semibold mb-6 text-center text-black dark:text-white">
                Add a Education
              </h2>
              <form className="flex flex-col gap-4">
                <input
                  type="text"
                  name="education"
                  value={form.education}
                  onChange={handleChange}
                  placeholder="College/University"
                  className="border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-[#23232a] dark:text-white"
                />
                <input
                  type="text"
                  name="description"
                  value={form.description}
                  onChange={handleChange}
                  placeholder="Course/Degree"
                  className="border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-[#23232a] dark:text-white"
                />
                <div className="flex gap-4">
                  <div className="flex flex-col flex-1">
                    <label className="text-xs text-gray-500 dark:text-gray-300 mb-1">
                      From
                    </label>
                    <input
                      type="month"
                      name="fromDate"
                      value={form.fromDate}
                      onChange={handleChange}
                      className="border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-[#23232a] dark:text-white"
                    />
                  </div>
                  <div className="flex flex-col flex-1">
                    <label className="text-xs text-gray-500 dark:text-gray-300 mb-1">
                      To
                    </label>
                    <input
                      type="month"
                      name="toDate"
                      value={form.toDate}
                      onChange={handleChange}
                      className="border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-[#23232a] dark:text-white"
                    />
                  </div>
                </div>
                <button
                  type="button"
                  className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md mt-4 cursor-pointer"
                  onClick={addNewEducation}
                >
                  Save
                </button>
              </form>
            </div>
          </div>
        )}
        <EducationCard />
      </div>
    </>
  );
}

export default EducationComponentPopup;
