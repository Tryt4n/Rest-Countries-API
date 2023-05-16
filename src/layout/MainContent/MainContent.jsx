import { useContext } from "react";
import DataContext from "../../context/DataContext";

import Card from "../../components/Card/Card";
import Navbar from "../Navbar/Navbar";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";

export default function MainContent() {
  const { data, isLoading, filteredData } = useContext(DataContext);

  return (
    <main className="container">
      <Navbar />
      {!isLoading ? (
        <div className="country-cards-grid">
          {filteredData === ""
            ? data.map((country) => (
                <Card
                  key={country.cca3}
                  data={country}
                />
              ))
            : filteredData.map((country) => (
                <Card
                  key={country.cca3}
                  data={country}
                />
              ))}
        </div>
      ) : (
        <div className="country-loading-spinner-container">
          <LoadingSpinner />
        </div>
      )}
    </main>
  );
}
