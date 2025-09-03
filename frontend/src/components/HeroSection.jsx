import { toast, ToastContainer } from "react-toastify";
import BlobAvatar from "./BlobAvatar";
const BASE_URL = import.meta.env.VITE_API_URL;

function HeroSection() {
  // Download CV logic

  const downloadCv = async () => {
    try {
      const response = await fetch(`${BASE_URL}/api/cv/download`, {
        responseType: "blob",
      });
      const fileURL = URL.createObjectURL(await response.blob());
      const link = document.createElement("a");
      link.href = fileURL;
      link.download = "vishnunarayancv.pdf";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      URL.revokeObjectURL(fileURL);
      if (!response.ok) {
        toast.error("Cv Download Failed");
        console.error("Cv Download Failed");
      } else {
        toast.success("File Downloaded Successfully");
      }
    } catch (error) {
      toast.error(error);
      console.error("Something went wrong", error);
    }
  };
  return (
    <>
      <section id="hero" className="text-textprimary container mt-30">
        {/* CONTENT SECTION */}

        <div className="flex flex-col-reverse xl:flex-row xl:text-left items-center justify-between max-w-full pt-[120px] px-5 sm:px-0 gap-10">
          {/* CONTENT */}
          <div className="max-w-[700px]">
            <h1 className="md:text-[50px] text-[32px]">
              <span className="opacity-0 animate-fade-in">Hi,</span>{" "}
              <span className="opacity-0 animate-fade-in-delay-1">I'm </span>
              <span className="opacity-0 animate-fade-in-delay-2">
                Vishnu
              </span>{" "}
              <span className="opacity-0 animate-fade-in-delay-3">Narayan</span>
            </h1>
            <div className="lg:text-base text-base mt-8 text-textprimary/50 leading-7 opacity-0 animate-fade-in-delay-5 text-justify xl:mr-50">
              <p>
                I’m an aspiring{" "}
                <span className="font-bold text-textprimary/100">
                  Java Full Stack Developer{" "}
                </span>
                with a keen interest in creating applications that are both
                functional and user-friendly. My journey so far has been about
                learning, experimenting, and growing as a developer, and this
                portfolio is a space where I share some of that work
              </p>
            </div>

            {/* BUTTONS */}

            <div className="flex flex-col items-center sm:flex-row mt-10 xl:justify-start justify-center gap-10 opacity-0 animate-fade-in-delay-5 ">
              {/* <a href=""> */}
              <button className="cv-btn cursor-pointer" onClick={downloadCv}>
                Download CV
              </button>
              <a href="/projects">
                <button className="x-btn cursor-pointer">See Projects</button>
              </a>
            </div>
          </div>

          {/* IMAGE SECTION */}

          {/* <BlobAvatar /> */}
          <div>
            <div className="shape portfolio-img opacity-0 animate-fade-in-delay-1 mt-[-40px] md:mt-0"></div>
          </div>
        </div>
        <ToastContainer />
      </section>
    </>
  );
}
export default HeroSection;
