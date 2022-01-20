import useDarkMode from "./Hooks/useDarkMode";
import PagesImage from "./Styles/Assets/Images/pages.svg";

function App() {
  const darkTheme = useDarkMode();
  return (
    <div className="h-screen px-1 py-1 dark:bg-gray-700">
      <button className="absolute top-3 left-3" onClick={darkTheme.toggle}>
        Toggle
      </button>
      <div className="flex h-full justify-center items-center">
        <header className="w-2/6 text-6xl text-blue-900 dark:text-white">
          CV Generator
        </header>
        <img src={PagesImage} alt="Page Logo" className="w-2/6" />
      </div>
    </div>
  );
}

export default App;
