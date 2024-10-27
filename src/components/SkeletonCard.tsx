import { ReactElement } from "react";

interface Props {
  darkMode: boolean;
}

export default function SkeletonCard({ darkMode }: Props): ReactElement {
  return (
    <article
      className={`justify-center shadow-lg rounded-xl border-0 overflow-hidden w-10/12 mx-auto sm:w-64 ${
        darkMode ? "bg-darkBlue text-white" : "bg-white"
      }`}
    >
      <div className="w-full h-40 bg-gray-300 dark:bg-gray-700 shimmer"></div>
      <div className={`mb-5 pb-5 p-4 ${darkMode ? "bg-darkBlue" : ""}`}>
        <div className="h-6 bg-gray-300 dark:bg-gray-700 mb-2 w-3/4 rounded shimmer"></div>
        <div className="h-4 bg-gray-300 dark:bg-gray-700 mb-1 w-1/2 rounded shimmer"></div>
        <div className="h-4 bg-gray-300 dark:bg-gray-700 mb-1 w-2/3 rounded shimmer"></div>
        <div className="h-4 bg-gray-300 dark:bg-gray-700 mb-1 w-1/3 rounded shimmer"></div>
      </div>
    </article>
  );
}
