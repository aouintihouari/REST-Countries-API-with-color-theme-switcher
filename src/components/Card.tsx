import { ReactElement } from "react";
import { CountrySummary } from "../App";
import { Link } from "react-router-dom";

interface Props {
  darkMode: boolean;
  country: CountrySummary;
  onSelectedCountry: (name: string) => void;
}

export default function Card({
  darkMode,
  country,
  onSelectedCountry,
}: Props): ReactElement {
  const populationFormatter = new Intl.NumberFormat("en-US");
  const population =
    typeof country.population === "number"
      ? country.population
      : Number(country.population);

  return (
    <Link
      to={`/country/${country.name.toLowerCase()}`}
      onClick={() => onSelectedCountry(country.name)}
    >
      <article
        className={`justify-center shadow-lg rounded-xl border-0 overflow-hidden w-10/12 mx-auto sm:w-64 cursor-pointer transition duration-300 hover:scale-110 ${
          darkMode ? "bg-darkBlue text-white" : "bg-white"
        }`}
      >
        <img
          src={country.flags.svg}
          alt={`${country.name} flag`}
          className="w-full h-40 object-cover"
        />
        <div className="mb-5 pb-5 p-4">
          <h2 className="font-bold text-lg mb-2">{country.name}</h2>
          <p className="text-sm">
            <span className="font-semibold">Population:</span>{" "}
            {populationFormatter.format(population)}{" "}
          </p>
          <p className="text-sm">
            <span className="font-semibold">Region:</span>{" "}
            <span className="font-extralight">{country.region}</span>
          </p>
          <p className="text-sm">
            <span className="font-semibold">Capital:</span>{" "}
            <span className="font-extralight">{country.capital}</span>
          </p>
        </div>
      </article>
    </Link>
  );
}
