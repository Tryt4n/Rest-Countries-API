import { useState, useEffect } from "react";

import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";

import { useContext } from "react";
import DataContext from "../../context/DataContext";

export default function Card({ data, setDetailInfo, setIsDetailOpen }) {
  const { searchText } = useContext(DataContext);

  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const [isMatch, setIsMatch] = useState(false);

  useEffect(() => {
    setIsMatch(data.name.common.toLowerCase().includes(searchText.toLowerCase()));
  }, [data.name.common, searchText]);

  function handleImageLoad() {
    setIsImageLoaded(true);
  }

  return (
    <a
      href="#"
      className="country-card__link"
      onClick={() => {
        setDetailInfo(data);
        setIsDetailOpen(true);
        console.log(data);
      }}
    >
      <article className="country-card">
        {!isImageLoaded && (
          <div className="country-card__img-loading-spinner">
            <LoadingSpinner />
          </div>
        )}
        <img
          src={data.flags.svg}
          alt={`${data.name.official} flag`}
          aria-label={data.flags.alt ? data.flags.alt : undefined}
          loading="lazy"
          className="country-card__img"
          onLoad={handleImageLoad}
        />
        <div className="country-card__text-wrapper">
          <h2 className="country-card__name">
            {isMatch
              ? data.name.common.split(new RegExp(`(${searchText})`, "gi")).map((part, index) =>
                  part.toLowerCase() === searchText.toLowerCase() ? (
                    <mark
                      className="country-card__marked-text"
                      key={index}
                    >
                      {part}
                    </mark>
                  ) : (
                    part
                  )
                )
              : data.name.common}
          </h2>

          <div className="country-card__text-line">
            <b className="country-card__text-bolded">Population:</b>
            &nbsp;
            <span className="country-card__text-output">{data.population.toLocaleString()}</span>
          </div>
          <div className="country-card__text-line">
            <b className="country-card__text-bolded">Region:</b>
            &nbsp;
            <span className="country-card__text-output">{data.region}</span>
          </div>
          <div className="country-card__text-line">
            <b className="country-card__text-bolded">Capital:</b>
            &nbsp;
            <span className="country-card__text-output">{data.capital}</span>
          </div>
        </div>
      </article>
    </a>
  );
}
