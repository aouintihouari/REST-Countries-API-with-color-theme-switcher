import { ReactElement } from "react";

interface Props {
  darkMode: boolean;
  onFilterCountries: (name: string) => void;
}

export default function NavBar({
  darkMode,
  onFilterCountries,
}: Props): ReactElement {
  return (
    <nav>
      <div
        className={`relative mb-5 transition duration-300 sm:mb-0 ${
          darkMode
            ? "bg-veryDarkBlueBg border-veryDarkBlueBg text-white"
            : "bg-veryLightGray border-gray-300"
        }`}
      >
        <input
          className={`sm:w-[30rem] h-[3rem] w-full shadow-2xl pl-16 rounded-lg border-2 outline-none text-sm transition duration-300 ${
            darkMode
              ? "bg-darkBlue border-darkBlue text-white placeholder:text-white"
              : "bg-veryLightGray text-darkGray placeholder:text-darkGray"
          }`}
          type="text"
          placeholder="Search for a country..."
          onChange={(e) => onFilterCountries(e.target.value)}
        />
        <div className="absolute top-4 left-5">
          <svg
            width="18"
            height="18"
            viewBox="0 0 18 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g id="search">
              <path
                id="Shape"
                fillRule="evenodd"
                clipRule="evenodd"
                d="M12.5 11H11.7L11.4 10.7C12.4 9.6 13 8.1 13 6.5C13 2.9 10.1 0 6.5 0C2.9 0 0 2.9 0 6.5C0 10.1 2.9 13 6.5 13C8.1 13 9.6 12.4 10.7 11.4L11 11.7V12.5L16 17.5L17.5 16L12.5 11ZM6.5 11C4 11 2 9 2 6.5C2 4 4 2 6.5 2C9 2 11 4 11 6.5C11 9 9 11 6.5 11Z"
                fill={darkMode ? "#fff" : "#848484"}
              />
            </g>
          </svg>
        </div>
      </div>
    </nav>
  );
}
