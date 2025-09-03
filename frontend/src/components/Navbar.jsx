import { Github, Instagram, Linkedin, Mail } from "lucide-react";
import { NavLink } from "react-router-dom";

const navItems = [
  { name: "Home", href: "/" },
  { name: "Education", href: "/education" },
  { name: "Projects", href: "/projects" },
];

const navIcons = [
  { icon: <Github />, href: "https://github.com/blurslip" },
  {
    icon: <Linkedin />,
    href: "https://www.linkedin.com/in/vishnu-narayan-386464219/",
  },
  { icon: <Mail />, href: "https://mail.google.com/mail/?view=cm&to=vishnunarayan453@gmail.com" },
  { icon: <Instagram />, href: "https://www.instagram.com/narayanium/" },
];

function Navbar() {
  return (
    <nav className="fixed left-1/2 top-8 transform -translate-x-1/2 z-50 flex justify-center w-full pointer-events-none">
  <div className="flex items-center text-base text-textpurple bg-navblock/60 backdrop-blur-sm shadow-lg sm:max-w-[450px] h-[70px] max-w-[300px] rounded-full overflow-x-auto sm:overflow-hidden scrollbar-hide w-full pointer-events-auto mx-auto">
        <div className="flex justify-center items-center w-full gap-5 mx-10">
          {/* Nav Links */}
          <div className="flex justify-center space-x-8">
            {navItems.map((item, index) => (
              <NavLink
                key={index}
                to={item.href}
                className={({ isActive }) =>
                  isActive ? "text-textpurple" : "text-white"
                }
              >
                {item.name}
              </NavLink>
            ))}
          </div>
          {/* Icons */}
          <ul className="flex space-x-3 [&_svg]:w-4.5 sm:[&_svg]:w-5">
            {navIcons.map((icon, index) => (
              <li key={index}>
                <a href={icon.href} target="_blank" className="hover:text-white">
                  {icon.icon}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
