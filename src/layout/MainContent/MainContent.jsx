import { useContext, useEffect, useState } from "react";
import DataContext from "../../context/DataContext";

import Card from "../../components/Card/Card";
import Navbar from "../Navbar/Navbar";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";
import DetailInfo from "../DetailInfo.jsx/DetailInfo";

export default function MainContent() {
  const { data, isLoading, filteredData } = useContext(DataContext);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [detailInfo, setDetailInfo] = useState({});

  useEffect(() => {
    console.log(detailInfo);
  }, [detailInfo, setDetailInfo]);

  return (
    <main className="container">
      <Navbar
        isDetailOpen={isDetailOpen}
        setIsDetailOpen={setIsDetailOpen}
      />
      {!isDetailOpen ? (
        <>
          {!isLoading ? (
            <div className="country-cards-grid">
              {filteredData === ""
                ? data.map((country) => (
                    <Card
                      key={country.cca3}
                      data={country}
                      setDetailInfo={setDetailInfo}
                    />
                  ))
                : filteredData.map((country) => (
                    <Card
                      key={country.cca3}
                      data={country}
                      setDetailInfo={setDetailInfo}
                      setIsDetailOpen={setIsDetailOpen}
                    />
                  ))}
            </div>
          ) : (
            <div className="country-loading-spinner-container">
              <LoadingSpinner />
            </div>
          )}
        </>
      ) : (
        <DetailInfo countryData={detailInfo} />
      )}
    </main>
  );
}
