import { useEffect, useState } from "react";

export default function ThemeToggle() {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

return (
    <button
      className="px-4 py-2 rounded bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-100 transition"
      onClick={() => setDarkMode((prev) => !prev)}
    >
      {darkMode ? "🌙 Dark" : "☀️ Light"}
    </button>
  );
}
