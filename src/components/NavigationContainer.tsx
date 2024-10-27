import { ReactElement, ReactNode } from "react";

interface Props {
  children: ReactNode;
  darkMode: boolean;
}

export default function NavigationContainer({
  children,
  darkMode,
}: Props): ReactElement {
  return (
    <section
      className={`py-4 px-2 sm:px-10 transition duration-300 ${
        darkMode
          ? "bg-veryDarkBlueBg border-veryDarkBlueBg text-white"
          : "bg-veryLightGray border-gray-300"
      }`}
    >
      <div className={`flex flex-col sm:flex-row justify-between mt-3`}>
        {children}
      </div>
    </section>
  );
}
