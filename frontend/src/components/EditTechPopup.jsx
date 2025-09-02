import { useState } from "react";
import { toast } from "react-toastify";
import capitalizeFirstLetter from "../CustomFunc/LetterCapilizer";
const BASE_URL = import.meta.env.VITE_API_URL;
function EditTechPopup({ isOpen, onClose }) {
  const [formData, setFormData] = useState({
    category: "",
    name: "",
    icon: "",
  });
  const [activeTab, setActiveTab] = useState("category");
  const [deleteCategory, setDeleteCategory] = useState("");
  const [deleteSkill, setDeleteSkill] = useState("");

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: capitalizeFirstLetter(value) }));
  }
  // Clear all data logic
  async function handleClearAll() {
    const confirmed = window.confirm("Are you sure you want to clear all categories and skills? This action cannot be undone.");
    if (!confirmed) return;
    try {
      // Delete all categories
      const resCat = await fetch(`${BASE_URL}/api/categories/all`, {
        method: "DELETE",
      });
      // Delete all skills
      const resSkill = await fetch(`${BASE_URL}/api/languages/all`, {
        method: "DELETE",
      });
      if (!resCat.ok && !resSkill.ok)
        throw new Error("Failed to clear all data");
      toast.success("All categories and skills deleted successfully");
    } catch (error) {
      toast.error("Something went wrong");
      console.error("Something went wrong ", error);
    }
  }

  //Add Category Logic

  async function addCategory() {
    try {
      const response = await fetch(`${BASE_URL}/api/categories`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.status === 409) {
        toast.error(`${formData.category} already exists`);
        return;
      }

      if (!response.ok) throw new Error("Error adding Category");
      toast.success(`Category ${formData.category} added succesfully`);
    } catch (error) {
      toast.error("Something went wrong");
      console.error("Something went wrong ", error);
    }
  }

  // Add Skill logic

  async function addSkill() {
    try {
      const response = await fetch(`${BASE_URL}/api/languages`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      if (!response.ok) throw new Error("Error adding skill");
      toast.success(`${formData.name} added succesfully`);
    } catch (error) {
      toast.error("Something went wrong ");
      console.error("Something went wrong ", error);
    }
  }

  // Delete Category logic
  async function handleDeleteCategory() {
    try {
      const response = await fetch(
        `${BASE_URL}/api/categories/${deleteCategory}`,
        {
          method: "DELETE",
        }
      );
      if (response.status === 404) {
        toast.error(`${deleteCategory} not found`);
        return;
      }
      if (!response.ok) throw new Error("Failed to delete category");
      toast.success(`${deleteCategory} deleted successfully`);
    } catch (error) {
      toast.error("Something went wrong");
      console.error("Something went wrong ", error);
    }
  }

  // Delete Skill logic
  async function handleDeleteSkill() {
    try {
      const response = await fetch(
        `${BASE_URL}/api/languages/${deleteSkill}`,
        {
          method: "DELETE",
        }
      );
      if (response.status === 404) {
        toast.error(`${deleteSkill} not found`);
        return;
      }
      if (!response.ok) throw new Error("Failed to delete skill");
      toast.success(`${deleteSkill} deleted successfully`);
    } catch (error) {
      toast.error("Something went wrong");
      console.error("Something went wrong ", error);
    }
  }

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-opacity-30 backdrop-blur-xs">
      <div className="bg-white dark:bg-gray-900 rounded-lg shadow-lg w-full max-w-md p-6 relative">
        {/* <h1>{formData}</h1> */}
        <button
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-white"
          onClick={onClose}
        >
          &#10005;
        </button>
        <div className="flex mb-6 border-b border-gray-200 dark:border-gray-700">
          <button
            className={`flex-1 py-2 px-4 text-center font-medium focus:outline-none transition border-b-2 ${
              activeTab === "category"
                ? "border-indigo-500 text-indigo-600 dark:text-indigo-400"
                : "border-transparent text-gray-500 dark:text-gray-400"
            }`}
            onClick={() => setActiveTab("category")}
            type="button"
          >
            Add Category
          </button>
          <button
            className={`flex-1 py-2 px-4 text-center font-medium focus:outline-none transition border-b-2 ${
              activeTab === "skill"
                ? "border-indigo-500 text-indigo-600 dark:text-indigo-400"
                : "border-transparent text-gray-500 dark:text-gray-400"
            }`}
            onClick={() => setActiveTab("skill")}
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
            Delete
          </button>
        </div>
        {activeTab === "delete" && (
          <form className="flex flex-col gap-4">
            <div>
              <label className="block mb-1 text-gray-700 dark:text-gray-200">
                Category Name to Delete
              </label>
              <input
                type="text"
                value={deleteCategory}
                onChange={(e) => setDeleteCategory(e.target.value)}
                className="w-full rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 px-4 py-3 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-red-400 focus:border-red-400 transition"
                placeholder="Enter category name"
              />
            </div>
            <button
              type="button"
              onClick={handleDeleteCategory}
              className="w-full rounded-md bg-red-500 py-2 px-4 text-white hover:bg-red-600 dark:hover:bg-red-700 cursor-pointer mt-2"
            >
              Delete Category
            </button>
            <div>
              <label className="block mb-1 text-gray-700 dark:text-gray-200">
                Skill Name to Delete
              </label>
              <input
                type="text"
                value={deleteSkill}
                onChange={(e) => setDeleteSkill(e.target.value)}
                className="w-full rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 px-4 py-3 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-red-400 focus:border-red-400 transition"
                placeholder="Enter skill name"
              />
            </div>
            <button
              type="button"
              onClick={handleDeleteSkill}
              className="w-full rounded-md bg-red-500 py-2 px-4 text-white hover:bg-red-600 dark:hover:bg-red-700 cursor-pointer mt-2"
            >
              Delete Skill
            </button>
            <button
              type="button"
              onClick={handleClearAll}
              className="w-full rounded-md bg-red-700 py-2 px-4 text-white hover:bg-red-800 dark:hover:bg-red-900 cursor-pointer mt-2"
            >
              Clear All Data
            </button>
          </form>
        )}
        {activeTab === "category" && (
          <form className="flex flex-col gap-4">
            <div>
              <label className="block mb-1 text-gray-700 dark:text-gray-200">
                Category Name
              </label>
              <input
                name="category"
                type="text"
                value={formData.category}
                onChange={handleChange}
                className="w-full rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 px-4 py-3 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 transition"
              />
            </div>
            <button
              type="button"
              className="w-full rounded-md bg-indigo-600 py-2 px-4 text-white hover:bg-indigo-700 dark:hover:bg-indigo-800 cursor-pointer mt-2"
              onClick={addCategory}
            >
              Add Category
            </button>
          </form>
        )}
        {activeTab === "skill" && (
          <form className="flex flex-col gap-4">
            <div>
              <label className="block mb-1 text-gray-700 dark:text-gray-200">
                Skill Name
              </label>
              <input
                name="name"
                type="text"
                value={formData.name}
                onChange={handleChange}
                className="w-full rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 px-4 py-3 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 transition"
              />
            </div>

            <div>
              <label className="block mb-1 text-gray-700 dark:text-gray-200">
                Skill Icon Url
              </label>
              <input
                name="icon"
                type="text"
                value={formData.icon}
                onChange={handleChange}
                className="w-full rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 px-4 py-3 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 transition"
              />
            </div>
            <div>
              <label className="block mb-1 text-gray-700 dark:text-gray-200">
                Category
              </label>
              <input
                name="category"
                type="text"
                value={formData.category}
                onChange={handleChange}
                className="w-full rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 px-4 py-3 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 transition"
              />
            </div>
            <button
              type="button"
              className="w-full rounded-md bg-indigo-600 py-2 px-4 text-white hover:bg-indigo-700 dark:hover:bg-indigo-800 cursor-pointer mt-2"
              onClick={addSkill}
            >
              Add Skill
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

export default EditTechPopup;
