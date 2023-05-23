import { createContext, useState, useEffect, useCallback } from "react";
import axios from "axios";

const DataContext = createContext();

const arrowSVG = (
  <svg
    className="arrow-svg"
    aria-hidden
    fill="currentColor"
    viewBox="0 0 330 330"
  >
    <path
      d="M325.607,79.393c-5.857-5.857-15.355-5.858-21.213,0.001l-139.39,139.393L25.607,79.393
c-5.857-5.857-15.355-5.858-21.213,0.001c-5.858,5.858-5.858,15.355,0,21.213l150.004,150c2.813,2.813,6.628,4.393,10.606,4.393
s7.794-1.581,10.606-4.394l149.996-150C331.465,94.749,331.465,85.251,325.607,79.393z"
    />
  </svg>
);

export function DataProvider({ children }) {
  const lng = navigator.language;
  const languageMapping = {
    eng: ["en", "en"],
    ces: ["cs", "ces"],
    deu: ["de", "deu"],
    est: ["et", "est"],
    fin: ["fi", "fin"],
    fra: ["fr", "fra"],
    hrv: ["hr", "hrv"],
    hun: ["hu", "hun"],
    ita: ["it", "ita"],
    nld: ["nl", "nld"],
    pol: ["pl", "pol"],
    por: ["pt", "por"],
    rus: ["ru", "rus"],
    slk: ["sl", "slk"],
    spa: ["es", "spa"],
    srp: ["sr", "srp"],
    swe: ["sv", "swe"],
    tur: ["tr", "tur"],
  };
  const newLanguage =
    Object.values(languageMapping).find((code) => lng.startsWith(code[0])) || "en";
  const API_LANGUAGE_KEY = newLanguage === "en" ? "en" : newLanguage[1];

  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [nothingFound, setNothingFound] = useState(false);

  const [filteredData, setFilteredData] = useState(data);
  const [selectedRegions, setSelectedRegions] = useState([]);
  const [searchText, setSearchText] = useState("");

  //* Advanced Searching
  const [alphabeticalSearching, setAlphabeticalSearching] = useState(true);
  const [populationSearching, setPopulationSearching] = useState(false);
  const [populationAscending, setPopulationAscending] = useState(undefined);
  const [independent, setIndependent] = useState(null);
  const [landlocked, setLandlocked] = useState(null);
  const [unitedNationsMember, setUnitedNationsMember] = useState(null);
  const [traffic, setTraffic] = useState(null);
  const advancedSearching = {
    alphabeticalSearching,
    setAlphabeticalSearching,
    populationSearching,
    setPopulationSearching,
    populationAscending,
    setPopulationAscending,
    independent,
    setIndependent,
    landlocked,
    setLandlocked,
    unitedNationsMember,
    setUnitedNationsMember,
    traffic,
    setTraffic,
  };

  const API_URL = `https://restcountries.com/v3.1/all`;
  const controller = new AbortController();

  //* API
  useEffect(() => {
    setIsLoading(true);
    axios
      // * to work with controller, main can't have StrictMode
      .get(API_URL, { signal: controller.signal })
      .then((res) => {
        const data = res.data;
        setData(data);
      })
      .catch((error) => {
        if (axios.isCancel(error)) {
          console.log("Request canceled", error.message);
        } else {
          console.error("IP address format is incorrect");
        }
      })
      .finally(() => setIsLoading(false));
    return () => controller.abort();
  }, [API_URL]);

  //* Set filtered regions
  const filterRegions = useCallback(() => {
    let filteredRegions = [...data];

    if (selectedRegions.length !== 0) {
      filteredRegions = filteredRegions.filter((country) =>
        selectedRegions.some((item) => item.region === country.region)
      );
    }

    if (API_LANGUAGE_KEY === "en" && searchText) {
      filteredRegions = filteredRegions.filter((country) =>
        country.name.common.toLowerCase().includes(searchText.toLowerCase())
      );
    } else if (searchText) {
      filteredRegions = filteredRegions.filter((country) =>
        country.translations[API_LANGUAGE_KEY]?.common
          .toLowerCase()
          .includes(searchText.toLowerCase())
      );
    }

    return filteredRegions;
  }, [data, selectedRegions, searchText, API_LANGUAGE_KEY]);

  //* Set searchbar searching countries
  function handleSearchChange(e) {
    setSearchText(e.target.value);
    const filtered = filterRegions().filter((country) => {
      const selectedRegionsLength = selectedRegions.length !== 0;
      const commonName = country.name.common.toLowerCase().includes(e.target.value.toLowerCase());
      const translation = country.translations[API_LANGUAGE_KEY]?.common
        .toLowerCase()
        .includes(e.target.value.toLowerCase());
      const regionCheck = selectedRegions.some((item) => item.region === country.region);

      if (API_LANGUAGE_KEY === "en" && selectedRegionsLength) {
        return commonName && regionCheck;
      } else if (API_LANGUAGE_KEY === "en") {
        return commonName;
      } else if (API_LANGUAGE_KEY !== "en" && selectedRegionsLength) {
        return translation && regionCheck;
      } else if (API_LANGUAGE_KEY !== "en") {
        return translation;
      }
    });
    setFilteredData(filtered);
  }

  //* Advanced Searching Settings
  const handleFiltering = useCallback(() => {
    let filteredData = filterRegions();

    //* Countries alphabetically order
    if (alphabeticalSearching !== null) {
      filteredData = filteredData.sort((a, b) => {
        //! (API_LANGUAGE_KEY === "hrv" && data.cca3 === "CUW") fallback for country of `Curaçao` in croatian language
        const alphabeticalA =
          API_LANGUAGE_KEY === "en" || (API_LANGUAGE_KEY === "hrv" && a.cca3 === "CUW")
            ? a.name.common
            : a.translations[API_LANGUAGE_KEY].common;
        const alphabeticalB =
          API_LANGUAGE_KEY === "en" || (API_LANGUAGE_KEY === "hrv" && b.cca3 === "CUW")
            ? b.name.common
            : b.translations[API_LANGUAGE_KEY].common;

        if (alphabeticalSearching) {
          return alphabeticalA.localeCompare(alphabeticalB);
        } else {
          return alphabeticalB.localeCompare(alphabeticalA);
        }
      });
    }

    //* Countries sort by population
    if (populationSearching && populationAscending !== null) {
      filteredData = filteredData.sort((a, b) => {
        const populationA = a.population;
        const populationB = b.population;

        if (populationAscending) {
          return populationA - populationB;
        } else {
          return populationB - populationA;
        }
      });
    }

    //* Independent search
    if (independent !== null) {
      filteredData = filteredData.filter((country) => country.independent === independent);
    }

    //* Landlocked search
    if (landlocked !== null) {
      filteredData = filteredData.filter((country) => country.landlocked === landlocked);
    }

    //* United Nations search
    if (unitedNationsMember !== null) {
      filteredData = filteredData.filter((country) => country.unMember === unitedNationsMember);
    }

    //* Traffic search
    if (traffic !== null) {
      filteredData = filteredData.filter(
        (country) => country.car.side === (traffic ? "left" : "right")
      );
    }

    return filteredData;
  }, [
    filterRegions,
    alphabeticalSearching,
    populationSearching,
    populationAscending,
    independent,
    landlocked,
    unitedNationsMember,
    traffic,
  ]);
  handleFiltering();

  //* Display filtered regions
  useEffect(() => {
    const filteredData = handleFiltering();

    setFilteredData(filteredData);
    setNothingFound((searchText !== "" && filteredData.length === 0) || filteredData.length === 0);
  }, [selectedRegions, data, searchText, handleFiltering]);

  return (
    <DataContext.Provider
      value={{
        lng: lng,
        API_LANGUAGE_KEY: API_LANGUAGE_KEY,
        data: data,
        setData: setData,
        isLoading: isLoading,
        nothingFound: nothingFound,
        filteredData: filteredData,
        setFilteredData: setFilteredData,
        selectedRegions: selectedRegions,
        setSelectedRegions: setSelectedRegions,
        searchText: searchText,
        setSearchText: setSearchText,
        advancedSearching: advancedSearching,
        handleSearchChange: handleSearchChange,
        arrowSVG: arrowSVG,
      }}
    >
      {children}
    </DataContext.Provider>
  );
}

export default DataContext;
