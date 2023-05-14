import { useEffect, useState } from "react";

const moonIcon = (
  <svg
    aria-label="Dark Mode Theme Icon"
    width="16"
    height="16"
    viewBox="0 0 164 164"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <mask
      id="path-1-inside-1_1_20"
      fill="white"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M163.512 104.259C150.959 113.997 135.162 119.799 118 119.799C77.1309 119.799 44 86.892 44 46.2991C44 28.7504 50.1919 12.6381 60.5241 5.975e-06C25.5807 9.97954 0 42.152 0 80.2991C0 126.415 37.3842 163.799 83.5 163.799C121.288 163.799 153.214 138.697 163.512 104.259Z"
      />
    </mask>
    <path
      id="icon-moon-fill"
      fillRule="evenodd"
      clipRule="evenodd"
      d="M163.512 104.259C150.959 113.997 135.162 119.799 118 119.799C77.1309 119.799 44 86.892 44 46.2991C44 28.7504 50.1919 12.6381 60.5241 5.975e-06C25.5807 9.97954 0 42.152 0 80.2991C0 126.415 37.3842 163.799 83.5 163.799C121.288 163.799 153.214 138.697 163.512 104.259Z"
      fill="currentColor"
    />
    <path
      id="icon-moon-border"
      d="M163.512 104.259L173.092 107.124L182.029 77.2377L157.382 96.3576L163.512 104.259ZM60.5241 5.975e-06L68.2661 6.32941L88.4671 -18.3801L57.7779 -9.61554L60.5241 5.975e-06ZM157.382 96.3576C146.526 104.779 132.871 109.799 118 109.799V129.799C137.453 129.799 155.392 123.214 169.641 112.16L157.382 96.3576ZM118 109.799C82.5897 109.799 54 81.3054 54 46.2991H34C34 92.4787 71.6721 129.799 118 129.799V109.799ZM54 46.2991C54 31.1472 59.3363 17.2521 68.2661 6.32941L52.782 -6.3294C41.0474 8.02418 34 26.3536 34 46.2991H54ZM10 80.2991C10 46.735 32.5061 18.4015 63.2702 9.61556L57.7779 -9.61554C18.6554 1.55754 -10 37.569 -10 80.2991H10ZM83.5 153.799C42.9071 153.799 10 120.892 10 80.2991H-10C-10 131.938 31.8614 173.799 83.5 173.799V153.799ZM153.931 101.394C144.864 131.715 116.748 153.799 83.5 153.799V173.799C125.829 173.799 161.563 145.679 173.092 107.124L153.931 101.394Z"
      fill="currentColor"
      mask="url(#path-1-inside-1_1_20)"
    />
  </svg>
);

export default function DarkModeSwitch() {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
      return true;
    } else if (savedTheme === "light") {
      return false;
    } else {
      return window.matchMedia("(prefers-color-scheme: dark)").matches;
    }
  });

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", isDarkMode ? "dark" : "light");
    localStorage.setItem("theme", isDarkMode ? "dark" : "light");
  }, [isDarkMode]);

  const handleDarkModeToggle = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <button
      type="button"
      role="switch"
      aria-checked={isDarkMode}
      aria-label="Dark Mode Switch"
      className="dark-mode-switch"
      onClick={handleDarkModeToggle}
    >
      {moonIcon}
      <span className="dark-mode-switch__text">{isDarkMode ? "Light Mode" : "Dark Mode"}</span>
    </button>
  );
}
