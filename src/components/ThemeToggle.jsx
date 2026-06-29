import { useEffect, useRef, useState } from "react";
import { Sun, Moon, ChevronDown, Check } from "lucide-react";
import { isDark, setTheme, subscribeTheme } from "../config/theme";

export default function ThemeToggle() {
  const [dark, setDark] = useState(isDark());
  const [open, setOpen] = useState(false);

  const dropdownRef = useRef(null);

  useEffect(() => {
    const unsubscribe = subscribeTheme(() => {
      setDark(isDark());
    });

    const closeDropdown = (e) => {
      if (!dropdownRef.current?.contains(e.target)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", closeDropdown);

    return () => {
      unsubscribe();
      document.removeEventListener("mousedown", closeDropdown);
    };
  }, []);

  const handleTheme = (mode) => {
    setTheme(mode);
    setOpen(false);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 h-10 px-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700 hover:border-blue-400 dark:hover:border-blue-500 transition-all duration-300 shadow-sm"
      >
        {dark ? <Moon size={17} /> : <Sun size={17} />}
        <ChevronDown size={15} />
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-44 rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 shadow-xl overflow-hidden z-50">
          <button
            onClick={() => handleTheme("light")}
            className="flex items-center justify-between w-full px-4 py-3 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all duration-200"
          >
            <div className="flex items-center gap-3">
              <Sun size={16} />
              <span>Light</span>
            </div>

            {!dark && (
              <div className="flex items-center justify-center w-6 h-6 rounded-full bg-blue-100 dark:bg-blue-500/20">
                <Check size={14} className="text-blue-600 dark:text-blue-300" />
              </div>
            )}
          </button>

          <button
            onClick={() => handleTheme("dark")}
            className="flex items-center justify-between w-full px-4 py-3 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all duration-200"
          >
            <div className="flex items-center gap-3">
              <Moon size={16} />
              <span>Dark</span>
            </div>

            {dark && (
              <div className="flex items-center justify-center w-6 h-6 rounded-full bg-blue-100 dark:bg-blue-500/20">
                <Check size={14} className="text-blue-600 dark:text-blue-300" />
              </div>
            )}
          </button>
        </div>
      )}
    </div>
  );
}
