import { useState, useEffect, useMemo } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainContainer from "./components/MainContainer";
import Header from "./components/Header";
import NavigationContainer from "./components/NavigationContainer";
import NavBar from "./components/NavBar";
import DropDownMenu from "./components/DropDownMenu";
import CardsGallery from "./components/CardsGallery";
import CardsContainer from "./components/CardsContainer";
import CountryDetails from "./components/CountryDetails";

export interface CountryIdentifiers {
  name: string;
  alpha2Code: string;
  alpha3Code: string;
}

export interface CountrySummary {
  name: string;
  population: string;
  region: string;
  capital: string;
  flags: { svg: string };
}

export interface CountryDetailsType extends CountrySummary {
  nativeName: string;
  subregion: string;
  topLevelDomain: string[];
  currencies: { name: string }[];
  languages: { name: string }[];
  borders: string[];
}

function App() {
  const [darkMode, setDarkMode] = useState<boolean>(() => {
    return localStorage.getItem("darkMode") === "true";
  });
  const [countriesSummary, setCountriesSummary] = useState<
    CountrySummary[] | null
  >(null);
  const [countriesIdentifiers, setCountriesIdentifiers] = useState<
    CountryIdentifiers[] | null
  >(null);
  const [filterCountries, setFilterCountries] = useState<string>("");
  const [selectedContinent, setSelectedContinent] = useState<string>("");
  const [selectedCountry, setSelectedCountry] = useState<string | null>(null);
  const [countryDetails, setCountryDetails] =
    useState<CountryDetailsType | null>(null);

  useEffect(() => {
    localStorage.setItem("darkMode", darkMode.toString());
  }, [darkMode]);

  useEffect(() => {
    const fetchCountriesData = async () => {
      try {
        const response = await fetch("/assets/data/data.json");
        if (!response.ok) throw new Error("Couldn't fetch the data");

        const data = await response.json();
        setCountriesSummary(data as CountrySummary[]);
        setCountriesIdentifiers(data as CountryIdentifiers[]);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchCountriesData();
  }, []);

  useEffect(() => {
    if (selectedCountry) {
      const fetchCountryDetails = async () => {
        try {
          const response = await fetch("/assets/data/data.json");
          if (!response.ok) throw new Error("Couldn't fetch the data");

          const data: CountryDetailsType[] = await response.json();
          const country = data.find(
            (country) =>
              country.name.toLowerCase() === selectedCountry.toLowerCase()
          );
          setCountryDetails(country || null);
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      };
      fetchCountryDetails();
    }
  }, [selectedCountry]);

  const displayCountries = useMemo(() => {
    if (!countriesSummary) return null;

    let filteredCountries = countriesSummary;

    if (selectedContinent) {
      const continentToMatch =
        selectedContinent === "America" ? "Americas" : selectedContinent;
      filteredCountries = filteredCountries.filter(
        (country) => country.region === continentToMatch
      );
    }

    if (filterCountries) {
      filteredCountries = filteredCountries.filter((country) =>
        country.name.toLowerCase().startsWith(filterCountries.toLowerCase())
      );
    }

    return filteredCountries;
  }, [countriesSummary, filterCountries, selectedContinent]);

  function handleDarkMode(): void {
    setDarkMode((prevMode) => !prevMode);
  }

  return (
    <Router>
      <MainContainer darkMode={darkMode}>
        <Header darkMode={darkMode} onDarkMode={handleDarkMode} />
        <Routes>
          <Route
            path="/"
            element={
              <>
                <NavigationContainer darkMode={darkMode}>
                  <NavBar
                    darkMode={darkMode}
                    onFilterCountries={setFilterCountries}
                  />
                  <DropDownMenu
                    darkMode={darkMode}
                    onSelectedContinent={setSelectedContinent}
                  />
                </NavigationContainer>
                <CardsGallery darkMode={darkMode}>
                  <CardsContainer
                    darkMode={darkMode}
                    countriesSummary={displayCountries}
                    onSelectedCountry={setSelectedCountry}
                  />
                </CardsGallery>
              </>
            }
          />
          <Route
            path="/country/:countryName"
            element={
              <CountryDetails
                darkMode={darkMode}
                onSelectedCountry={setSelectedCountry}
                selectedCountry={selectedCountry}
                countryDetails={countryDetails}
                countriesIdentifiers={countriesIdentifiers}
                onFilterCountries={setFilterCountries}
                onSelectedContinent={setSelectedContinent}
              />
            }
          />
        </Routes>
      </MainContainer>
    </Router>
  );
}

export default App;
