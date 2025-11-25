import { useEffect, useState } from "react";
import { Sun, Moon } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

// Utility to merge Tailwind classes
const cn = (...classes) => classes.filter(Boolean).join(" ");

const ThemeToggle = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Initialize theme from localStorage or OS preference
  useEffect(() => {
    const storedTheme = localStorage.getItem("theme");
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

    if (storedTheme === "dark" || (!storedTheme && prefersDark)) {
      document.documentElement.classList.add("dark");
      setIsDarkMode(true);
    } else {
      document.documentElement.classList.remove("dark");
      setIsDarkMode(false);
    }
  }, []);

  // Toggle dark/light mode
  const toggleTheme = () => {
    const newMode = !isDarkMode;
    setIsDarkMode(newMode);

    // Toggle dark class on <html> for whole page
    document.documentElement.classList.toggle("dark", newMode);

    // Save preference
    localStorage.setItem("theme", newMode ? "dark" : "light");
  };

  return (
    <button
      onClick={toggleTheme}
      className={cn(
        "fixed top-5 right-5 z-50 p-3 rounded-full transition-all duration-500 animate-fade",
        "focus:outline-none shadow-lg",
        isDarkMode
          ? "bg-gray-900 hover:bg-gray-800 ring-2 ring-yellow-400"
          : "bg-gray-200 hover:bg-gray-300 ring-2 ring-blue-300"
      )}
    >
      <AnimatePresence initial={false}>
        {isDarkMode ? (
          <motion.div
            key="sun"
            initial={{ x: 20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -20, opacity: 0 }}
            transition={{ duration: 0.4 }}
            style={{ display: "flex" }}
          >
            <Sun className="h-7 w-7" />
          </motion.div>
        ) : (
          <motion.div
            key="moon"
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 20, opacity: 0 }}
            transition={{ duration: 0.4 }}
            style={{ display: "flex" }}
          >
            <Moon className="h-7 w-7" />
          </motion.div>
        )}
      </AnimatePresence>
    </button>
  );
};

export default ThemeToggle;
