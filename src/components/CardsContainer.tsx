import { ReactElement } from "react";
import { CountrySummary } from "../App";
import Card from "./Card";
import SkeletonCard from "./SkeletonCard";

interface Props {
  darkMode: boolean;
  countriesSummary: CountrySummary[] | null;
  onSelectedCountry: (name: string) => void;
}

export default function CardsContainer({
  darkMode,
  countriesSummary,
  onSelectedCountry,
}: Props): ReactElement {
  const isLoading = !countriesSummary;

  return (
    <>
      {isLoading
        ? Array.from({ length: 8 }, (_, index) => (
            <SkeletonCard key={index} darkMode={darkMode} />
          ))
        : countriesSummary.map((country) => (
            <Card
              key={country.name}
              darkMode={darkMode}
              country={country}
              onSelectedCountry={onSelectedCountry}
            />
          ))}
    </>
  );
}
