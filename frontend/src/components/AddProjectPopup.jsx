import { useState } from "react";
import EditSkillPopup from "./EditSkillPopup"; // Consider renaming to ModalWrapper if it's generic
import { toast } from "react-toastify";

const BASE_URL = import.meta.env.VITE_API_URL;

function AddProjectPopup({ isOpen, onClose, onAdd }) {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    imageUrl: "",
    tags: [],
    tagInput: "",
    demoUrl: "",
    githubUrl: "",
  });

  // Handle input changes
  function handleChange(e) {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }

  // Handle tag input
  function handleTagInput(e) {
    setFormData((prev) => ({ ...prev, tagInput: e.target.value }));
  }

  // Add tag
  function handleAddTag(e) {
    e.preventDefault();
    const tag = formData.tagInput.trim();
    if (tag && !formData.tags.includes(tag)) {
      setFormData((prev) => ({
        ...prev,
        tags: [...prev.tags, tag],
        tagInput: "",
      }));
    }
  }

  // Remove tag
  function handleRemoveTag(tag) {
    setFormData((prev) => ({
      ...prev,
      tags: prev.tags.filter((t) => t !== tag),
    }));
  }

  // Submit form
  async function handleSubmit(e) {
    e.preventDefault();
    if (!formData.title || !formData.description) return;

    try {
      const response = await fetch(`${BASE_URL}/api/projects`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Error adding project");
      }

      toast.success(`Successfully added ${formData.title}`);

      // Pass to parent
      onAdd({
        title: formData.title,
        description: formData.description,
        imageUrl: formData.imageUrl,
        tags: formData.tags,
        demoUrl: formData.demoUrl,
        githubUrl: formData.githubUrl,
      });

      // Reset form
      setFormData({
        title: "",
        description: "",
        imageUrl: "",
        tags: [],
        tagInput: "",
        demoUrl: "",
        githubUrl: "",
      });

      onClose();
    } catch (error) {
      toast.error("Something went wrong");
      console.error("Something went wrong", error);
    }
  }

  return (
    <EditSkillPopup isOpen={isOpen} onClose={onClose}>
      <h1 className="text-2xl font-semibold text-gray-700 dark:text-white mb-6 text-center">
        Add New Project
      </h1>

      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        {/* Title */}
        <div>
          <label className="block mb-1 text-gray-700 dark:text-gray-200">
            Project Title
          </label>
          <input
            name="title"
            value={formData.title}
            onChange={handleChange}
            type="text"
            className="w-full rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 px-4 py-3 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 transition"
            required
          />
        </div>

        {/* Description */}
        <div>
          <label className="block mb-1 text-gray-700 dark:text-gray-200">
            Project Description
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="w-full rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 px-4 py-3 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 transition"
            rows={3}
            required
          />
        </div>

        {/* Image */}
        <div>
          <label className="block mb-1 text-gray-700 dark:text-gray-200">
            Image URL
          </label>
          <input
            name="imageUrl"
            value={formData.imageUrl}
            onChange={handleChange}
            type="text"
            className="w-full rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 px-4 py-3 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 transition"
          />
        </div>

        {/* Tags */}
        <div>
          <label className="block mb-1 text-gray-700 dark:text-gray-200">
            Tags
          </label>
          <div className="flex gap-2 mb-2 flex-wrap">
            {formData.tags.map((tag) => (
              <span
                key={tag}
                className="px-2 py-1 text-xs border font-medium rounded-full bg-secondary text-textprimary/80 flex items-center gap-1"
              >
                {tag}
                <button
                  type="button"
                  className="ml-1 text-red-500 hover:text-red-700"
                  onClick={() => handleRemoveTag(tag)}
                  aria-label="Remove tag"
                >
                  &times;
                </button>
              </span>
            ))}
          </div>
          <div className="flex gap-2">
            <input
              type="text"
              value={formData.tagInput}
              onChange={handleTagInput}
              className="flex-1 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 px-4 py-2 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 transition"
              placeholder="Add tag"
            />
            <button
              onClick={handleAddTag}
              className="rounded-md bg-indigo-600 py-2 px-4 text-white hover:bg-indigo-700 dark:hover:bg-indigo-800 cursor-pointer"
            >
              Add
            </button>
          </div>
        </div>

        {/* Demo URL */}
        <div>
          <label className="block mb-1 text-gray-700 dark:text-gray-200">
            Demo URL
          </label>
          <input
            name="demoUrl"
            value={formData.demoUrl}
            onChange={handleChange}
            type="text"
            className="w-full rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 px-4 py-3 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 transition"
          />
        </div>

        {/* GitHub URL */}
        <div>
          <label className="block mb-1 text-gray-700 dark:text-gray-200">
            GitHub URL
          </label>
          <input
            name="githubUrl"
            value={formData.githubUrl}
            onChange={handleChange}
            type="text"
            className="w-full rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 px-4 py-3 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 transition"
          />
        </div>

        {/* Submit */}
        <input
          type="submit"
          value="Add Project"
          className="w-full rounded-md bg-indigo-600 py-2 px-4 text-white hover:bg-indigo-700 dark:hover:bg-indigo-800 cursor-pointer mt-2"
        />
      </form>
    </EditSkillPopup>
  );
}

export default AddProjectPopup;
