import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import "swiper/css/mousewheel";
import { Mousewheel, Pagination } from "swiper/modules";
const BASE_URL = import.meta.env.VITE_API_URL;
import { useEffect, useState } from "react";
function SkillSection({ scale }) {
  // *************SAMPLE DATA*************

  // const skills = [
  //   {
  //     name: "JavaScript",
  //     path: jsIcon,
  //   },
  //   { name: "ReactJS", path: reactIcon },
  //   { name: "Java", path: javaIcon },
  //   { name: "Spring Framework", path: springIcon },
  //   { name: "Sql", path: sqlIcon },
  // ];

  const colors = ["#C3C99E", "#c8c8c8c8", "#5FB9B0", "#C2C2C2"];

  const [skills, setSkills] = useState([]);

  // *************FETCHING SKILLS*************

  useEffect(() => {
    const loadSkills = async () => {
      try {
        const response = await fetch(`${BASE_URL}/api/skills`);
        if (!response.ok) {
          throw new Error("Failed to fetch Skills");
        }
        const data = await response.json();
        setSkills(data);
      } catch (error) {
        console.error("Error fetching  skills: ", error);
      }
    };

    loadSkills();
  }, []);
  return (
    <>
      <div
        className="container p-0 mt-24 md:mt-52 w-full"
        style={{ transform: `scale(${scale})` }}
      >
        {/* *************INNER CONTAINER************* */}
        <div className="flex flex-col lg:flex-row items-center justify-between lg:gap-10 overflow-hidden">
          {/* *************XP BOX************* */}
          <div className="xp-box max-w-[300px] min-w-[280px] drop-shadow-[0_0_10px_rgba(255,255,255,0.1)]">
            <div className="lg:text-left text-center text-base text-textprimary/50">
              <p>
                4 years of <br />
                <span className="text-7xl text-textprimary font-bold">XP</span>
                <br /> with the most popular ecosystem frontend
              </p>
            </div>
          </div>
          {/* *************SKILL BOXES************* */}
          <div className="max-w-full w-full p-5">
            <Swiper
              modules={[Pagination, Mousewheel]}
              loop={true}
              pagination={{
                clickable: true,
                bulletClass: "swiper-pagination-bullet custom-bullet",
                bulletActiveClass:
                  "swiper-pagination-bullet-active custom-bullet-active",
              }}
              mousewheel={{ enabled: true }}
              breakpoints={{
                320: { slidesPerView: 2, spaceBetween: 200 }, // Mobile
                640: { slidesPerView: 2, spaceBetween: 80 }, // Small tablets
                1024: { slidesPerView: 2.5, spaceBetween: 80 }, // Laptops
                1280: { slidesPerView: 3.5, spaceBetween: 80 }, // Large screens
              }}
            >
              {skills.map((skill, index) => (
                <SwiperSlide key={index}>
                  <div
                    className={`skill-box flex items-start justify-center pl-5 flex-col`}
                    style={{
                      backgroundColor: `${colors[index % colors.length]}`,
                    }}
                  >
                    <img
                      src={skill.iconUrl}
                      alt={`${skill.name} logo `}
                      className="h-8 w-8"
                    />
                    <div>{skill.name}</div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </div>
    </>
  );
}
export default SkillSection;
