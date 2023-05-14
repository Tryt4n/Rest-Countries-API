import { createContext, useState, useEffect } from "react";
import axios from "axios";

const DataContext = createContext({
  data: {},
  setData: () => {},
});

export function DataProvider({ children }) {
  const [data, setData] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const API_URL = `https://restcountries.com/v3.1/all`;
  const controller = new AbortController();
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

  return (
    <DataContext.Provider
      value={{
        data: data,
        setData: setData,
        isLoading: isLoading,
      }}
    >
      {children}
    </DataContext.Provider>
  );
}

export default DataContext;
