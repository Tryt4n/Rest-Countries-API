import { createContext, useState, useEffect } from "react";
import axios from "axios";
import dataJSON from "../../server/data.json";

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
  }, []);

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
