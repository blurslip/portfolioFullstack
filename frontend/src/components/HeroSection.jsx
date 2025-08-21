function HeroSection() {
  return (
    <>
      <section id="hero" className="text-textprimary ">
        {/* CONTENT SECTION */}

        <div className="container flex flex-col-reverse xl:flex-row xl:text-left items-center justify-between max-w-full pt-[120px] lg:px-[250px] px-5">
          {/* CONTENT */}
          <div className="max-w-[700px] mt-10 md:mt-0">
            <h1 className="md:text-[62px] text-[32px]">
              <span className="opacity-0 animate-fade-in">Hi,</span>{" "}
              <span className="opacity-0 animate-fade-in-delay-1">I'm </span>
              <span className="opacity-0 animate-fade-in-delay-2">
                Vishnu
              </span>{" "}
              <span className="opacity-0 animate-fade-in-delay-3">Narayan</span>
            </h1>
            <div className="lg:text-base text-base mt-8 text-textprimary/50 leading-7 opacity-0 animate-fade-in-delay-5 text-justify">
              <p>
                During these{" "}
                <span className="text-textsecondary font-bold">4 years</span> as{" "}
                <span className="text-textsecondary font-bold">
                  Front-End Software Engineer
                </span>
                . My role has extended beyond coding to effective communication
                with various departments, to define new features and
                spearheading the development of new apps.
              </p>
            </div>

            {/* BUTTONS */}

            <div className="flex flex-col items-center lg:flex-row mt-10 lg:justify-start justify-center gap-10 opacity-0 animate-fade-in-delay-5 ">
              {/* <a href=""> */}
                <a href="/src/assets/vishnunarayanresume.pdf" download="vishnunarayanresume.pdf">
                  <button className="cv-btn cursor-pointer">Download CV</button>
                </a>
              <button className="x-btn cursor-pointer">See experience</button>
            </div>
          </div>

          {/* IMAGE SECTION */}

          <div>
            <div className="shape portfolio-img opacity-0 animate-fade-in-delay-1 mt-[-40px] md:mt-0"></div>
          </div>
        </div>
      </section>
    </>
  );
}
export default HeroSection;
