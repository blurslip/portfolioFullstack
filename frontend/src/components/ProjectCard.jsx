import { ArrowRight, ExternalLink, Github, Plus, Trash } from "lucide-react";
import { useEffect, useState } from "react";
import AddProjectPopup from "./AddProjectPopup";
import { toast } from "react-toastify";
const BASE_URL = import.meta.env.VITE_API_URL;

// Sample data
// const initialProjects = [
//   {
//     id: 1,
//     title: "Saas Landing Page",
//     description: "A beautiful landing page app using React and Tailwind.",
//     image: "/src/assets/project1.webp",
//     tags: ["React", "TailwindCSS", "Supabase"],
//     demoUrl: "#",
//     githubUrl: "#",
//   },

//   {
//     id: 2,
//     title: "Orbit Analytics Dashboard",
//     description:
//       "Interactive analytics dashboard with data visualization and filtering capabilities.",
//     image: "/src/assets/project2.webp",
//     tags: ["TypeScript", "D3.js", "Next.js"],
//     demoUrl: "#",
//     githubUrl: "#",
//   },

//   {
//     id: 3,
//     title: "E-commerce Platform",
//     description:
//       "Full-featured e-commerce platform with user authentication and payment processing.",
//     image: "/src/assets/project3.webp",
//     tags: ["React", "Node.js", "Stripe"],
//     demoUrl: "#",
//     githubUrl: "#",
//   },
// ];

export function ProjectCard({ editMode }) {
  const [projects, setProjects] = useState([]);
  const [showPopup, setShowPopup] = useState(false);

  function handleAddProject(newProject) {
    setProjects((prev) => [{ ...newProject, id: Date.now() }, ...prev]);
  }
  // FETCHING PROJECTS
  useEffect(() => {
    async function fetchProjects() {
      try {
        const response = await fetch(`${BASE_URL}/api/projects`);
        const data = await response.json();
        if (!response.ok) {
          throw new Error("Error fetching projects");
        }
        setProjects(data);
      } catch (error) {
        console.error("Something went wrong", error);
      }
    }
    fetchProjects();
  }, []);

  //DELETING A PROJECT
  async function handleDelete(id) {
    try {
      const response = await fetch(`${BASE_URL}/api/projects/delete/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error(`Error deleting project with id: ${id}`);
      }
      toast.success(`Successfully deleted project with id: ${id}`);
    } catch (error) {
      toast.error("Something went wrong");
      console.error("Something went wrong", error);
    }
  }
  if (editMode) {
    return (
      <section className="py-24 px-4 relative">
        <div className="container mx-auto max-w-5xl text-textprimary border border-navblock p-10 rounded-2xl">
        <h1 className="text-textprimary font-bold text-2xl sm:text-3xl md:text-4xl mt-6 sm:mt-10 text-center mb-20">
          Add Your Projects Here
        </h1>
          <div className="flex gap-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 flex-1">
              {projects.map((project, key) => (
                <div
                  key={project.id || key}
                  className="relative dark:bg-bgcard rounded-lg overflow-hidden shadow-xs transition-transform duration-300 hover:scale-[1.02] hover:shadow-lg"
                >
                  {/* Dustbin Icon */}
                  <button
                    className="absolute top-3 right-3 z-10 p-1 rounded-full hover:bg-red-100 dark:hover:bg-red-900 transition-colors cursor-pointer"
                    title="Delete Project"
                    onClick={() => handleDelete(project.id)}
                  >
                    <Trash size={20} className="text-red-500" />
                  </button>
                  <div className="h-48 overflow-hidden">
                    <img
                      src={project.imageUrl}
                      alt={project.title}
                      className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                    />
                  </div>
                  <div className="p-6">
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.tags &&
                        project.tags.map((tag, key) => (
                          <span
                            key={key}
                            className="px-2 py-1 text-xs border font-medium rounded-full bg-secondary text-textprimary/80"
                          >
                            {tag}
                          </span>
                        ))}
                    </div>

                    <h3 className="text-xl font-semibold mb-1">
                      {project.title}
                    </h3>
                    <p className="text-textprimary/80 text-sm mb-4">
                      {project.description}
                    </p>
                    <div className="flex justify-between items-center">
                      <div className="flex space-x-3">
                        <a
                          href={project.demoUrl}
                          className="text-textpurple hover:text-primary transition-colors duration-300 "
                          target="_blank"
                        >
                          <ExternalLink size={20} />
                        </a>
                        <a
                          href={project.githubUrl}
                          className="text-textpurple hover:text-primary transition-colors duration-300"
                          target="_blank"
                        >
                          <Github size={20} />
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              <div className="flex flex-col justify-center items-center min-h-full">
                <button
                  className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-full p-3 shadow-md focus:outline-none transition flex-shrink-0 flex items-center justify-center cursor-pointer"
                  title="Add New Project"
                  onClick={() => setShowPopup(true)}
                  style={{ height: "56px", width: "56px", minWidth: "56px" }}
                >
                  <Plus size={28} />
                </button>
              </div>
            </div>
          </div>
        </div>
        <AddProjectPopup
          isOpen={showPopup}
          onClose={() => setShowPopup(false)}
          onAdd={handleAddProject}
        />
      </section>
    );
  }

  return (
    <section className="py-24 px-4 relative">
      <div className="container mx-auto max-w-5xl text-textprimary">
        <div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-center">
            Featured <span className="text-textpurple">Projects</span>
          </h2>
          <p className="text-center text-textprimary/80 mb-12 max-w-2xl mx-auto">
            Here are some of my recent projects. Each project was carefully
            crafted with attention to detail, performance, and user experience.
          </p>
        </div>
        <div className="flex gap-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 flex-1">
            {projects.map((project, key) => (
              <div
                key={project.id || key}
                className="relative dark:bg-bgcard rounded-lg overflow-hidden shadow-xs transition-transform duration-300 hover:scale-[1.02] hover:shadow-lg"
              >
                <div className="h-48 overflow-hidden">
                  <img
                    src={project.imageUrl}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                  />
                </div>
                <div className="p-6">
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tags &&
                      project.tags.map((tag, key) => (
                        <span
                          key={key}
                          className="px-2 py-1 text-xs border font-medium rounded-full bg-secondary text-textprimary/80"
                        >
                          {tag}
                        </span>
                      ))}
                  </div>

                  <h3 className="text-xl font-semibold mb-1">
                    {project.title}
                  </h3>
                  <p className="text-textprimary/80 text-sm mb-4">
                    {project.description}
                  </p>
                  <div className="flex justify-between items-center">
                    <div className="flex space-x-3">
                      <a
                        href={project.demoUrl}
                        className="text-textpurple hover:text-primary transition-colors duration-300 "
                        target="_blank"
                      >
                        <ExternalLink size={20} />
                      </a>
                      <a
                        href={project.githubUrl}
                        className="text-textpurple hover:text-primary transition-colors duration-300"
                        target="_blank"
                      >
                        <Github size={20} />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="text-center mt-12">
          <a
            href="https://github.com/blurslip"
            className="w-fit flex items-center mx-auto bg-[#b292ff] px-6 py-2 rounded-full bg-primary text-primary-foreground font-medium transition-all duration-300 hover:shadow-[0_0_10px_rgba(139,92,246,0.5)] hover:scale-105 active:scale-95"
            target="_blank"
          >
            Check My Github <ArrowRight size={16} />
          </a>
        </div>
      </div>
      <AddProjectPopup
        isOpen={showPopup}
        onClose={() => setShowPopup(false)}
        onAdd={handleAddProject}
      />
    </section>
  );
}
export default ProjectCard;
