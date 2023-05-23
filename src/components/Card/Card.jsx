import { useState, useEffect } from "react";

import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";

import { useContext } from "react";
import DataContext from "../../context/DataContext";

import { useTranslation } from "react-i18next";

export default function Card({ data, setDetailInfo, setIsDetailOpen }) {
  const { t } = useTranslation();

  const { API_LANGUAGE_KEY, searchText } = useContext(DataContext);

  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const [isMatch, setIsMatch] = useState(false);

  useEffect(() => {
    if (API_LANGUAGE_KEY === "en") {
      setIsMatch(data.name.common.toLowerCase().includes(searchText.toLowerCase()));
    } else {
      setIsMatch(
        data.translations[API_LANGUAGE_KEY]?.common.toLowerCase().includes(searchText.toLowerCase())
      );
    }
  }, [data.name.common, data.translations, searchText, API_LANGUAGE_KEY]);

  function handleImageLoad() {
    setIsImageLoaded(true);
  }
  //! (API_LANGUAGE_KEY === "hrv" && data.cca3 === "CUW") fallback for country of `Curaçao` in croatian language
  const cardName =
    API_LANGUAGE_KEY === "en" || (API_LANGUAGE_KEY === "hrv" && data.cca3 === "CUW")
      ? data.name.common
      : data.translations[API_LANGUAGE_KEY].common;

  const cardNameOfficial =
    API_LANGUAGE_KEY === "en" || (API_LANGUAGE_KEY === "hrv" && data.cca3 === "CUW")
      ? data.name.official
      : data.translations[API_LANGUAGE_KEY].official;

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
          alt={`${t("Flag")} ${cardNameOfficial}`}
          aria-label={data.flags.alt ? data.flags.alt : undefined}
          loading="lazy"
          className="country-card__img"
          onLoad={handleImageLoad}
        />
        <div className="country-card__text-wrapper">
          <h2 className="country-card__name">
            {isMatch
              ? cardName.split(new RegExp(`(${searchText})`, "gi")).map((part, index) =>
                  part.toLowerCase() === searchText.toLowerCase() ? (
                    <mark
                      className="country-card__marked-text"
                      aria-label={t("CardMarkedCharacter")}
                      key={index}
                    >
                      {part}
                    </mark>
                  ) : (
                    part
                  )
                )
              : cardName}
          </h2>
          <div className="country-card__text-line">
            <b className="country-card__text-bolded">{t("Population")}:</b>
            &nbsp;
            <span className="country-card__text-output">{data.population.toLocaleString()}</span>
          </div>
          <div className="country-card__text-line">
            <b className="country-card__text-bolded">{t("Region")}:</b>
            &nbsp;
            <span className="country-card__text-output">{data.region}</span>
          </div>
          <div className="country-card__text-line">
            <b className="country-card__text-bolded">{t("Capital")}:</b>
            &nbsp;
            <span className="country-card__text-output">
              {data.capital ? data.capital : t("NotApplicable")}
            </span>
          </div>
        </div>
      </article>
    </a>
  );
}
