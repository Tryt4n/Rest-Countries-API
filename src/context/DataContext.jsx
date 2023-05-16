import { createContext, useState, useEffect } from "react";
import axios from "axios";

const DataContext = createContext({
  data: {},
  setData: () => {},
});

export function DataProvider({ children }) {
  const [data, setData] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const [filteredData, setFilteredData] = useState(data);
  const [selectedRegions, setSelectedRegions] = useState([]);
  const [searchText, setSearchText] = useState("");

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
        const alphabeticalData = data.sort((a, b) => {
          if (a.name.common < b.name.common) {
            return -1;
          } else if (a.name.common > b.name.common) {
            return 1;
          } else {
            return 0;
          }
        });
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

  //* Display filtered regions
  useEffect(() => {
    const filtered = filterRegions();
    setFilteredData(filtered);
  }, [selectedRegions, data, searchText]);

  return (
    <DataContext.Provider
      value={{
        data: data,
        setData: setData,
        isLoading: isLoading,
        filteredData: filteredData,
        setFilteredData: setFilteredData,
        selectedRegions: selectedRegions,
        setSelectedRegions: setSelectedRegions,
        searchText: searchText,
        setSearchText: setSearchText,
        handleSearchChange: handleSearchChange,
      }}
    >
      {children}
    </DataContext.Provider>
  );
}

export default DataContext;
