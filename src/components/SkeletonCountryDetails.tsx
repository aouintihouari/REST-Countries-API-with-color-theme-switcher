import React from "react";

interface SkeletonProps {
  darkMode: boolean;
}

const SkeletonLoader: React.FC<SkeletonProps> = ({ darkMode }) => {
  return (
    <section
      className={`py-10 px-5 sm:px-20 transition duration-300 ${
        darkMode ? "bg-veryDarkBlueBg" : "bg-veryLightGray"
      }`}
    >
      <div
        className={`flex items-center justify-center ml-0 sm:ml-0 mb-10 w-[8rem] rounded-lg border-2 shadow-inner p-2 shimmer ${
          darkMode ? "bg-darkBlue border-darkBlue" : "bg-veryLightGray"
        }`}
      ></div>
      <section className="grid grid-cols-1 sm:grid-cols-2 gap-8 mt-5">
        <div className="flex justify-center">
          <div
            className={`w-11/12 sm:w-9/12 h-60 rounded-lg overflow-hidden shadow-md shimmer ${
              darkMode ? "bg-darkBlue" : "bg-veryLightGray"
            }`}
          ></div>
        </div>
        <article className="flex flex-col">
          <div className="w-3/4 h-6 rounded-lg mb-5 shimmer"></div>
          <section className="flex flex-col sm:flex-row justify-between">
            <ul>
              {[...Array(5)].map((_, index) => (
                <li
                  key={index}
                  className="mb-3 w-48 h-4 rounded-lg shimmer"
                ></li>
              ))}
            </ul>
            <ul className="mt-8 sm:mt-0 sm:ml-8">
              {[...Array(3)].map((_, index) => (
                <li
                  key={index}
                  className="mb-3 w-48 h-4 rounded-lg shimmer"
                ></li>
              ))}
            </ul>
          </section>
          <div className="flex flex-col sm:flex-row mt-8">
            <div className="w-32 h-4 rounded-lg mb-3 shimmer"></div>
            <div className="flex flex-wrap gap-4">
              {[...Array(3)].map((_, index) => (
                <div
                  key={index}
                  className={`w-24 h-8 rounded-lg border-2 shadow-inner px-4 py-1 shimmer ${
                    darkMode
                      ? "bg-darkBlue border-darkBlue"
                      : "bg-veryLightGray border-gray-300"
                  }`}
                ></div>
              ))}
            </div>
          </div>
        </article>
      </section>
    </section>
  );
};

export default SkeletonLoader;
