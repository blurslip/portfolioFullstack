import { Github, Instagram, Linkedin, Mail } from "lucide-react";
const navIcons = [
  { icon: <Github />, href: "https://github.com/blurslip" },
  {
    icon: <Linkedin />,
    href: "https://www.linkedin.com/in/vishnu-narayan-386464219/",
  },
  { icon: <Mail />, href: "mailto:vishnunarayan453@gmail.com" },
  { icon: <Instagram />, href: "https://www.instagram.com/narayanium/" },
];
function Footer() {
  return (
    <>
      <footer className="container mt-20">
        <div className="flex items-center justify-between text-base text-textpurple bg-navblock h-[70px] min-full rounded-full px-10 sm:mx-0 mx-4">
          <p className="text-white/40">Follow Me</p>
          <ul className="flex space-x-3 [&_svg]:w-4.5 sm:[&_svg]:w-5">
            {navIcons.map((icon, index) => (
              <li key={index}>
                <a
                  href={icon.href}
                  target="_blank"
                  className="hover:text-white"
                >
                  {icon.icon}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </footer>
      <div className="container mt-5 mb-10">
        <p className="container text-textprimary text-center text-[13px]">
          © 2025 Vishnu Narayan 
        </p>
      </div>
    </>
  );
}
export default Footer;
