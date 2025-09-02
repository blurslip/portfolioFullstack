import { useState } from "react";
import SkillSection from "./SkillSection";
import { LogOut } from "lucide-react";
import EditSkillPopup from "./EditSkillPopup";
import { toast } from "react-toastify";
const BASE_URL = import.meta.env.VITE_API_URL;
function AddSkillForm({ onLogout }) {
  const [formData, setFormData] = useState({});
  const [activeTab, setActiveTab] = useState("add");
  const [deleteSkillName, setDeleteSkillName] = useState("");
  const [showPopup, setShowPopup] = useState(false);

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  }

  // ADD SKILL LOGIC

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      const response = await fetch(`${BASE_URL}/api/skills`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.status === 409) {
        toast.error(`${formData.name} already exists`);
        return;
      }
      if (!response.ok) {
        throw new Error("Error adding skill");
      }
      const savedSkill = await response.text();

      toast.success(`${savedSkill} added succesfully`);
      setFormData({});
    } catch (error) {
      console.error(error);
      toast.error(error.message);
    }
  }

  // DELETE SKILL LOGIC

  async function deleteSkill() {
    try {
      const response = await fetch(
        `${BASE_URL}/api/skills/${deleteSkillName}`,
        {
          method: "DELETE",
        }
      );
      if (response.status === 404) {
        toast.error(`${deleteSkillName} is Not found`);
        return;
      }
      if (!response.ok) throw new Error("Failed to delete skill");
      toast.success(`${deleteSkillName} deleted succesfully`);
    } catch (error) {
      console.error(error);
      toast.error(error.message);
    }
  }

  // DELETE ALL LOGIC
  async function deleteAll() {
    const confirmed = window.confirm("Are you sure you want to delete all skills? This action cannot be undone.");
    if (!confirmed) return;
    try {
      const response = await fetch(`${BASE_URL}/api/skills/all`, {
        method: "DELETE",
      });
      if (!response.ok) throw new Error("Failed to delete all skill");
      toast.success("All skills are deleted successfully");
    } catch (error) {
      console.error(error);
      toast.error(error.message);
    }
  }
  return (
    <>
      <div className="dark:bg-bgprimary items-center mt-6 mb-6 px-4">
          <div className="flex flex-col items-center">
            <button
              onClick={onLogout}
              className="mb-6 flex items-center gap-2 px-5 py-2 rounded-full bg-gradient-to-tr from-red-500 to-pink-500 text-white font-semibold shadow-lg ring-2 ring-red-300 hover:scale-105 hover:ring-4 hover:from-red-600 hover:to-pink-600 transition-all duration-200 focus:outline-none cursor-pointer"
              title="Logout"
            >
              <LogOut size={20} />
              Logout
            </button>
          </div>
        <div className="w-full flex flex-col items-center justify-center border border-navblock rounded-2xl">
          <h2 className="text-white font-bold text-2xl sm:text-3xl md:text-4xl mt-6 sm:mt-10 text-center">
            Control what you see here
          </h2>
          <button
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md shadow-md focus:outline-none cursor-pointer mt-10"
            onClick={() => setShowPopup(true)}
          >
            Edit
          </button>
          <SkillSection scale={1} />
        </div>
      </div>

      <EditSkillPopup isOpen={showPopup} onClose={() => setShowPopup(false)}>
        <h1 className="text-2xl font-semibold text-gray-700 dark:text-white mb-6 text-center">
          ADD NEW SKILL BOX
        </h1>
        {/* Tabs */}
        <div className="flex mb-6 border-b border-gray-200 dark:border-gray-700">
          <button
            className={`flex-1 py-2 px-4 text-center font-medium focus:outline-none transition border-b-2 ${
              activeTab === "add"
                ? "border-indigo-500 text-indigo-600 dark:text-indigo-400"
                : "border-transparent text-gray-500 dark:text-gray-400"
            }`}
            onClick={() => setActiveTab("add")}
            type="button"
          >
            Add Skill
          </button>
          <button
            className={`flex-1 py-2 px-4 text-center font-medium focus:outline-none transition border-b-2 ${
              activeTab === "delete"
                ? "border-red-500 text-red-600 dark:text-red-400"
                : "border-transparent text-gray-500 dark:text-gray-400"
            }`}
            onClick={() => setActiveTab("delete")}
            type="button"
          >
            Delete Skill
          </button>
        </div>

        {/* Add Skill Tab */}
        {activeTab === "add" && (
          <form
            method="POST"
            className="flex flex-col gap-4"
            onSubmit={handleSubmit}
          >
            <div>
              <label className="block mb-1 text-gray-700 dark:text-gray-200">
                Skill Name
              </label>
              <input
                name="name"
                value={formData.name}
                onChange={handleChange}
                type="text"
                className="w-full rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 px-4 py-3 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 transition"
              />
            </div>
            <div>
              <label className="block mb-1 text-gray-700 dark:text-gray-200">
                Skill Icon Url
              </label>
              <input
                name="iconUrl"
                value={formData.iconUrl}
                onChange={handleChange}
                type="text"
                className="w-full rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 px-4 py-3 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 transition"
              />
            </div>
            <input
              type="submit"
              value="Add Skill"
              className="w-full rounded-md bg-indigo-600 py-2 px-4 text-white hover:bg-indigo-700 dark:hover:bg-indigo-800 cursor-pointer mt-2"
            />
          </form>
        )}

        {/* Delete Skill Tab */}
        {activeTab === "delete" && (
          <form className="flex flex-col gap-4">
            <div>
              <label className="block mb-1 text-gray-700 dark:text-gray-200">
                Skill Name to Delete
              </label>
              <input
                type="text"
                placeholder="Enter skill name"
                value={deleteSkillName}
                onChange={(e) => setDeleteSkillName(e.target.value)}
                className="w-full rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 px-4 py-3 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-red-400 focus:border-red-400 transition"
              />
            </div>
            <button
              onClick={deleteSkill}
              type="button"
              className="w-full rounded-md bg-red-500 py-2 px-4 text-white hover:bg-red-600 dark:hover:bg-red-700 cursor-pointer mt-2"
            >
              Delete Skill
            </button>
            <button
              type="button"
              onClick={deleteAll}
              className="w-full rounded-md bg-red-500 py-2 px-4 text-white hover:bg-red-600 dark:hover:bg-red-700 cursor-pointer mt-2"
            >
              Delete All
            </button>
          </form>
        )}
      </EditSkillPopup>
    </>
  );
}
export default AddSkillForm;
