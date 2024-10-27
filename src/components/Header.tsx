import { ReactElement } from "react";

interface Props {
  darkMode: boolean;
  onDarkMode: () => void;
}

export default function Header({ darkMode, onDarkMode }: Props): ReactElement {
  return (
    <header
      className={`transition duration-300 ${
        darkMode ? "bg-darkBlue text-white" : "bg-veryLightGray text-black"
      }`}
    >
      <div className="flex justify-between py-4 px-2 sm:px-10">
        <h1 className="font-semibold">Where in the world?</h1>
        <div className="flex items-center cursor-pointer" onClick={onDarkMode}>
          <svg
            width="18"
            height="17"
            viewBox="0 0 18 17"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M12.5532 11.815C8.66857 11.815 5.51929 8.92783 5.51929 5.36821C5.51929 4.0253 5.96679 2.78158 6.73143 1.75C3.69036 2.69515 1.5 5.33122 1.5 8.43807C1.5 12.3385 4.94929 15.5 9.20357 15.5C12.5929 15.5 15.4696 13.4932 16.5 10.7045C15.375 11.4048 14.0161 11.815 12.5532 11.815Z"
              fill="white"
              stroke={darkMode ? `#FFF` : `#111517`}
              strokeWidth={darkMode ? "0.5" : "1.25"}
            />
          </svg>{" "}
          <p className="ml-2">Dark Mode</p>
        </div>
      </div>
      <div
        className={`drop-shadow-2xl w-full h-[0.01rem] mt-3 shadow-[0_4px_6px_rgba(0,0,0,0.1)] transition duration-300 ${
          darkMode ? "bg-darkBlue" : "bg-gray-400"
        }`}
      ></div>
    </header>
  );
}
