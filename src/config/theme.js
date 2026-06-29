let listeners = [];

export const getTheme = () => {
  return localStorage.getItem("theme");
};

export const isDark = () => {
  const theme = getTheme();

  if (theme === "dark") return true;
  if (theme === "light") return false;

  // First visit → follow system
  return window.matchMedia("(prefers-color-scheme: dark)").matches;
};

export const applyTheme = () => {
  document.documentElement.classList.toggle("dark", isDark());

  listeners.forEach((cb) => cb());
};

export const setTheme = (theme) => {
  localStorage.setItem("theme", theme);
  applyTheme();
};

export const subscribeTheme = (callback) => {
  listeners.push(callback);

  return () => {
    listeners = listeners.filter((cb) => cb !== callback);
  };
};

// Follow system only if user hasn't chosen a theme
const media = window.matchMedia("(prefers-color-scheme: dark)");

media.addEventListener("change", () => {
  if (!getTheme()) {
    applyTheme();
  }
});
