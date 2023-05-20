import { createContext, useState, useEffect } from "react";
import axios from "axios";

const DataContext = createContext();

const arrowSVG = (
  <svg
    className="arrow-svg"
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
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [nothingFound, setNothingFound] = useState(false);

  const [filteredData, setFilteredData] = useState(data);
  const [selectedRegions, setSelectedRegions] = useState([]);
  const [searchText, setSearchText] = useState("");

  const [alphabeticalSearching, setAlphabeticalSearching] = useState(true);

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
        const alphabeticalData = setAlphabetically(data);
        setData(alphabeticalData);
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
  function filterRegions() {
    if (selectedRegions.length !== 0 && searchText) {
      const filteredRegions = data.filter(
        (country) =>
          selectedRegions.some((item) => item.region === country.region) &&
          country.name.common.toLowerCase().includes(searchText.toLowerCase())
      );
      return filteredRegions;
    } else if (selectedRegions.length !== 0) {
      const filteredRegions = data.filter((country) =>
        selectedRegions.some((item) => item.region === country.region)
      );
      return filteredRegions;
    } else if (searchText) {
      const filteredRegions = data.filter((country) =>
        country.name.common.toLowerCase().includes(searchText.toLowerCase())
      );
      return filteredRegions;
    } else {
      return data;
    }
  }

  //* Set searching countries
  function handleSearchChange(e) {
    setSearchText(e.target.value);
    const filtered = filterRegions().filter((country) => {
      if (selectedRegions.length !== 0) {
        return (
          country.name.common.toLowerCase().includes(e.target.value.toLowerCase()) &&
          selectedRegions.some((item) => item.region === country.region)
        );
      } else {
        return country.name.common.toLowerCase().includes(e.target.value.toLowerCase());
      }
    });
    setFilteredData(filtered);
  }

  //* Countries order
  function setAlphabetically(data) {
    const alphabeticalData = [...data].sort((a, b) => {
      if (alphabeticalSearching === true) {
        return a.name.common.localeCompare(b.name.common);
      } else if (alphabeticalSearching === false) {
        return b.name.common.localeCompare(a.name.common);
      }
      return 0;
    });

    return alphabeticalData;
  }

  //* Display filtered regions
  useEffect(() => {
    const filtered = filterRegions();
    const alphabeticalData = setAlphabetically(filtered);
    setFilteredData(alphabeticalData);
    if (searchText !== "" && alphabeticalData.length === 0) {
      setNothingFound(true);
    } else {
      setNothingFound(false);
    }
  }, [selectedRegions, data, searchText, alphabeticalSearching, nothingFound]);

  return (
    <DataContext.Provider
      value={{
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
        alphabeticalSearching: alphabeticalSearching,
        setAlphabeticalSearching: setAlphabeticalSearching,
        handleSearchChange: handleSearchChange,
        arrowSVG: arrowSVG,
      }}
    >
      {children}
    </DataContext.Provider>
  );
}

export default DataContext;
