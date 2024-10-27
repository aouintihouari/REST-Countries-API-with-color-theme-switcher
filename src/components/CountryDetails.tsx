import { ReactElement, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { CountryDetailsType, CountryIdentifiers } from "../App";
import SkeletonLoader from "./SkeletonCountryDetails";

interface Props {
  darkMode: boolean;
  onSelectedCountry: (value: string) => void;
  selectedCountry: string | null;
  countryDetails: CountryDetailsType | null;
  countriesIdentifiers: CountryIdentifiers[] | null;
  onFilterCountries: (filter: string) => void;
  onSelectedContinent: (continent: string) => void;
}

export default function CountryDetails({
  darkMode,
  onSelectedCountry,
  selectedCountry,
  countryDetails,
  countriesIdentifiers,
  onFilterCountries,
  onSelectedContinent,
}: Props): ReactElement {
  const { countryName } = useParams<{ countryName: string }>();
  const [borders, setBorders] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (countryName && countryName !== selectedCountry) {
      onSelectedCountry(countryName);
    }
  }, [countryName, selectedCountry, onSelectedCountry]);

  useEffect(() => {
    if (countryDetails?.borders && Array.isArray(countryDetails.borders)) {
      const neighboringCountries = countryDetails.borders
        .map((border) => {
          const country = countriesIdentifiers?.find(
            (identifier) =>
              identifier.alpha2Code === border ||
              identifier.alpha3Code === border
          );
          return country ? country.name : null;
        })
        .filter(Boolean) as string[];
      setBorders(neighboringCountries);
    } else {
      setBorders([]); // Fallback if borders are undefined or not an array
    }
    setLoading(false); // Set loading to false once processed
  }, [selectedCountry, countryDetails, countriesIdentifiers]);

  const populationFormatter = new Intl.NumberFormat("en-US");
  const population =
    typeof countryDetails?.population === "number"
      ? countryDetails.population
      : Number(countryDetails?.population);

  if (loading || !countryDetails) {
    return <SkeletonLoader darkMode={darkMode} />;
  }

  function handleBack() {
    onFilterCountries("");
    onSelectedContinent("");
    onSelectedCountry("");
  }

  return (
    <section
      className={`py-10 px-5 sm:px-20 transition duration-300 ${
        darkMode
          ? "bg-veryDarkBlueBg text-white"
          : "bg-veryLightGray text-black"
      }`}
    >
      <Link to="/" onClick={handleBack}>
        <div
          className={`flex items-center justify-center ml-0 sm:ml-0 mb-10 w-[8rem] rounded-lg border-2 shadow-inner p-2 transition duration-300 cursor-pointer ${
            darkMode ? "bg-darkBlue border-darkBlue" : "bg-veryLightGray"
          }`}
        >
          <svg
            width="19"
            height="12"
            viewBox="0 0 19 12"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M6.46447 0.107445L7.64298 1.28596L3.75389 5.17504L18.6031 5.17504L18.6031 6.82496L3.75389 6.82496L7.64298 10.714L6.46447 11.8926L0.57191 6L6.46447 0.107445Z"
              fill={darkMode ? "white" : "black"}
              className="transition duration-300"
            />
          </svg>
          <span className="ml-3">Back</span>
        </div>
      </Link>
      <section className="grid grid-cols-1 sm:grid-cols-2 gap-8 mt-5">
        {countryDetails.flags?.svg && (
          <div className="flex justify-center">
            <div
              className={`w-11/12 sm:w-auto rounded-lg overflow-hidden shadow-md ${
                darkMode ? "bg-darkBlue" : "bg-veryLightGray"
              }`}
            >
              <img
                src={countryDetails.flags.svg}
                alt={`${countryDetails.name} flag`}
                className="min-h-full min-w-full object-cover"
              />
            </div>
          </div>
        )}
        <article className="flex flex-col">
          <h3 className="font-extrabold text-[22px] mb-5">
            {countryDetails.name}
          </h3>
          <section className="flex flex-col sm:flex-row justify-between">
            <ul>
              <li className="mb-3 font-bold">
                Native Name:{" "}
                <span className="font-extralight">
                  {countryDetails.nativeName}
                </span>
              </li>
              <li className="mb-3 font-bold">
                Population:{" "}
                <span className="font-extralight">
                  {populationFormatter.format(population)}
                </span>
              </li>
              <li className="mb-3 font-bold">
                Region:{" "}
                <span className="font-extralight">{countryDetails.region}</span>
              </li>
              <li className="mb-3 font-bold">
                Sub Region:{" "}
                <span className="font-extralight">
                  {countryDetails.subregion}
                </span>
              </li>
              <li className="mb-3 font-bold">
                Capital:{" "}
                <span className="font-extralight">
                  {countryDetails.capital}
                </span>
              </li>
            </ul>
            <ul className="mt-8 sm:mt-0 sm:ml-8">
              <li className="mb-3 font-bold">
                Top Level Domain:{" "}
                <span className="font-extralight">
                  {countryDetails.topLevelDomain.join(", ")}
                </span>
              </li>
              <li className="mb-3 font-bold">
                Currencies:{" "}
                <span className="font-extralight">
                  {countryDetails.currencies[0]?.name}
                </span>
              </li>
              <li className="mb-3 font-bold">
                Languages:{" "}
                {countryDetails.languages.map((language, index) => (
                  <span className="font-extralight" key={language.name}>
                    {language.name}
                    {index < countryDetails.languages.length - 1 ? ", " : ""}
                  </span>
                ))}
              </li>
            </ul>
          </section>
          <div className="flex flex-col sm:flex-row mt-8">
            <h4 className="font-bold mb-3 mr-5">Border Countries:</h4>
            {borders.length > 0 ? (
              <div className="flex flex-wrap gap-4">
                {borders.map((name) => (
                  <Link
                    to={`/country/${name}`}
                    onClick={() => onSelectedCountry(name)}
                    key={name}
                  >
                    <span
                      className={`rounded-lg border-2 shadow-inner px-4 py-1 transition duration-300 hover:scale-110 will-change:transform ${
                        darkMode
                          ? "bg-darkBlue border-darkBlue text-white"
                          : "bg-veryLightGray border-gray-300 text-black"
                      }`}
                    >
                      {name}
                    </span>
                  </Link>
                ))}
              </div>
            ) : (
              <span className="font-extralight">None</span>
            )}
          </div>
        </article>
      </section>
    </section>
  );
}
