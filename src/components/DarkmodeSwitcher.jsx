import React, { useState, useEffect } from "react";
import { MdOutlineLightMode } from "react-icons/md";
import { CiDark } from "react-icons/ci";
import PropTypes from "prop-types";
const DarkModeSwitcher = ({ setDarkModeFunc }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  // Initialize dark mode based on user's system preference or previously stored preference
  useEffect(() => {
    const darkModePreference = localStorage.getItem("theme");
    if (
      darkModePreference === "dark" ||
      (!darkModePreference &&
        window.matchMedia("(prefers-color-scheme: dark)").matches)
    ) {
      setIsDarkMode(true);
      // setDarkModeFunc(true);
      document.documentElement.classList.add("dark");
    }
  }, []);

  // Toggle dark mode
  const toggleDarkMode = () => {
    setIsDarkMode((prevMode) => !prevMode);
    if (!isDarkMode) {
      setDarkModeFunc(true);

      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      setDarkModeFunc(false);

      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  };

  return (
    <button
      onClick={toggleDarkMode}
      className="p-2 text-sm border bg-gray-300 dark:bg-gray-800 rounded-full "
    >
      {isDarkMode ? <MdOutlineLightMode size={20} /> : <CiDark size={20} />}
    </button>
  );
};
DarkModeSwitcher.propTypes = {
  setDarkModeFunc: PropTypes.func,
};
export default DarkModeSwitcher;
