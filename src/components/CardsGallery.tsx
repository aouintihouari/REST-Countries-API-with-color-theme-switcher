import { ReactElement, ReactNode } from "react";

interface Props {
  children: ReactNode;
  darkMode: boolean;
}

export default function CardsGallery({
  children,
  darkMode,
}: Props): ReactElement {
  return (
    <section
      className={`grid grid-cols-1 pt-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 sm:p-10 transition duration-300 ${
        darkMode
          ? "bg-veryDarkBlueBg border-veryDarkBlueBg text-white"
          : "bg-veryLightGray border-gray-300"
      }`}
    >
      {children}
    </section>
  );
}
