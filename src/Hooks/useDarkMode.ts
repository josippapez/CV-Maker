import { useEffect, useState } from "react";

const useDarkMode = () => {
  const [enabled, setEnabled] = useState(localStorage.getItem("dark-theme"));

  useEffect(() => {
    const className = "dark";
    const bodyClass = window.document.body.classList;

    enabled ? bodyClass.add(className) : bodyClass.remove(className);
  }, [enabled]);

  return {
    enabled,
    toggle: () => {
      if (enabled) {
        setEnabled(null);
        localStorage.removeItem("dark-theme");
      } else {
        setEnabled("enabled");
        localStorage.setItem("dark-theme", "enabled");
      }
    },
  };
};

export default useDarkMode;
