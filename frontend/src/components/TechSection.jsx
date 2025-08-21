import { useEffect, useState } from "react";
const BASE_URL = import.meta.env.VITE_API_URL;
function TechSection({ scale, showHeading = true }) {
  const [skills, setSkills] = useState([]);
  useEffect(() => {
    document.documentElement.classList.add("dark");
    async function fetchLang() {
      try {
        const response = await fetch(`${BASE_URL}/languages`);
        const data = await response.json();
        setSkills(data);
      } catch (error) {
        console.error("Error fetching languages ", error);
      }
    }
    fetchLang();
  }, []);

  const groupedSkills = skills.reduce((acc, skill) => {
    const categoryName = skill.category.category;
    if (!acc[categoryName]) acc[categoryName] = [];
    acc[categoryName].push({ name: skill.name, icon: skill.icon });
    return acc;
  }, {});

  return (
    <>
      <div style={{ transform: `scale(${scale})`}}id="skills">
        {/* Heading */}
        {showHeading && (
          <div className="container text-textprimary border-amber-100 mt-24 lg:mt-60">
            <div className="text-textprimary md:text-6xl text-3xl text-center lg:text-left font-extralight">
              <h1>
                These are the <br />
                technologies I've been using
              </h1>
            </div>
          </div>
        )}

        <div className=" flex flex-row flex-nowrap justify-evenly gap-6 overflow-x-auto mt-20 lg:m-40 text-textprimary/80 scrollbar-hide px-10">
          {Object.entries(groupedSkills).map(
            ([categoryName, skillList], index) => (
              <div className="tech-box" key={index}>
                <p className="text-lg font-semibold mb-4">{categoryName}</p>
                <ul>
                  {skillList.map((skill, idx) => (
                    <li key={idx} className="flex items-center space-x-3 mb-4">
                      <div className="bg-navblock p-2 rounded-full">
                        <img
                          src={skill.icon}
                          alt={`${skill.name} icon`}
                          className="w-4 h-4"
                        />
                      </div>
                      <span>{skill.name}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )
          )}
        </div>
      </div>
    </>
  );
}
export default TechSection;
