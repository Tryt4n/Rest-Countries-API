import { useState } from "react";

import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";

export default function Card({ data, alignLeft }) {
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  function handleImageLoad() {
    setIsImageLoaded(true);
  }

  return (
    <a
      href="#"
      className="country-card__link"
    >
      <article
        className="country-card"
        onClick={() => console.log(data)}
      >
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
          data-align-left={alignLeft ? alignLeft : undefined}
          onLoad={handleImageLoad}
        />
        <div className="country-card__text-wrapper">
          <h2 className="country-card__name">{data.name.common}</h2>
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
