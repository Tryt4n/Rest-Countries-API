import { useContext } from "react";
import DataContext from "../../context/DataContext";

import Card from "../../components/Card/Card";
import Navbar from "../Navbar/Navbar";

export default function Main() {
  const { data, isLoading } = useContext(DataContext);

  return (
    <main className="container">
      <Navbar />
      <div className="country-cards-grid">
        {!isLoading &&
          data.map((country) => (
            <Card
              key={country.cca3}
              data={country}
            />
          ))}
      </div>
    </main>
  );
}
