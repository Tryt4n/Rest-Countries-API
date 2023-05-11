import { createContext, useState } from "react";
import dataJSON from "../../server/data.json";

const DataContext = createContext({
  data: {},
  setData: () => {},
});

export function DataProvider({ children }) {
  const [data, setData] = useState(dataJSON);

  return (
    <DataContext.Provider
      value={{
        data: data,
        setData: setData,
      }}
    >
      {children}
    </DataContext.Provider>
  );
}

export default DataContext;
