import { Sun, Moon } from "lucide-react";
import { useState, useEffect } from "react";
function ThemeToggle() {
  const [isDarkMode, setIsDarkMode] = useState(true);

  useEffect(() => {
    const storedTheme = localStorage.getItem("theme");
    console.log(storedTheme);
    if (storedTheme === "dark" || storedTheme === null) {
      document.documentElement.classList.add("dark");
      setIsDarkMode(true);
    }
    else {
      document.documentElement.classList.remove("dark");
      setIsDarkMode(false);
    }
  }, []);

  function toggleTheme() {
    if (isDarkMode) {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
      console.log("Light mode");
      setIsDarkMode(false);
    } else {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
      console.log("Dark mode");
      setIsDarkMode(true);
    }
  }

  return (
    <>
      <button
        className="absolute top-13 right-10 cursor-pointer hidden md:block"
        onClick={toggleTheme}
      >
        {isDarkMode ? (
          <Sun className="h-8 w-8 text-yellow-300" />
        ) : (
          <Moon className="h-8 w-8" />
        )}
      </button>
    </>
  );
}
export default ThemeToggle;
