import { MoonIcon, SunIcon } from "@heroicons/react/16/solid";
import { useTheme } from "../context/ThemeContext";

function ThemeToggle() {
  const { isDark, toggleTheme } = useTheme();

  return (
    <div
      type="button"
      onClick={toggleTheme}
      className="cursor-pointer btn-neutral rounded-full"
    >
      {isDark ? (
        <SunIcon className="h-4 w-4" />
      ) : (
        <MoonIcon className="h-4 w-4" />
      )}
    </div>
  );
}

export default ThemeToggle;
