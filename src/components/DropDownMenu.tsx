import { ReactElement, useState } from "react";

type Props = {
  darkMode: boolean;
  onSelectedContinent: (continent: string) => void;
};

export default function DropDownMenu({
  darkMode,
  onSelectedContinent,
}: Props): ReactElement {
  const [isOpen, setIsOpen] = useState(false);
  const regions = ["Africa", "America", "Asia", "Europe", "Oceania"];

  function handleSelectContinent(option: string): void {
    onSelectedContinent(option);
    setIsOpen(false);
  }

  return (
    <div
      className={`relative rounded-lg border transition duration-300 w-48 ${
        darkMode
          ? "bg-darkBlue border-veryDarkBlueBg text-white"
          : "bg-veryLightGray border-gray-300"
      }`}
    >
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="rounded-md px-4 py-2 text-left w-48 flex items-center justify-between"
      >
        <span className={`${darkMode && "text-white"}`}>Filter by Region</span>
        <svg
          className={`transform transition-transform duration-500 ${
            isOpen ? "rotate-180" : ""
          }`}
          width="10"
          height="6"
          viewBox="0 0 10 6"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M8.45 0.45L5 3.9 1.55 0.45 0.5 1.5 5 6l4.5-4.5L8.45 0.45Z"
            fill="currentColor"
          />
        </svg>
      </button>
      {isOpen && (
        <ul
          className={`absolute left-0 mt-3 w-48 rounded-lg shadow-lg border ${
            darkMode
              ? "bg-darkBlue border-veryDarkBlueBg text-white"
              : "bg-white border-gray-300"
          }`}
        >
          {regions.map((option, index) => (
            <li
              key={index}
              className={`px-4 py-2 cursor-pointer hover:bg-gray-100 ${
                darkMode ? "hover:bg-veryDarkBlueBg rounded-lg" : ""
              }`}
              onClick={() => handleSelectContinent(option)}
            >
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
