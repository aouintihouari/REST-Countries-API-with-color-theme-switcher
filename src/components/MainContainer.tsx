import { ReactElement, ReactNode } from "react";

interface Props {
  darkMode: boolean;
  children: ReactNode;
}

export default function MainContainer({
  darkMode,
  children,
}: Props): ReactElement {
  return (
    <main
      className={`max-h-full min-h-screen transition duration-300 ${
        darkMode ? "bg-veryDarkBlueBg" : "bg-veryLightGray"
      }`}
    >
      {children}
    </main>
  );
}
