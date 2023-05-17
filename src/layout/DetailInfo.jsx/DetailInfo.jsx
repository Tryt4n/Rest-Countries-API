import React, { useContext, useRef, useState } from "react";
import DataContext from "../../context/DataContext";

const arrowSVG = (
  <svg
    className="arrow-svg"
    fill="currentColor"
    version="1.1"
    id="Layer_1"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 330 330"
  >
    <path
      d="M325.607,79.393c-5.857-5.857-15.355-5.858-21.213,0.001l-139.39,139.393L25.607,79.393
c-5.857-5.857-15.355-5.858-21.213,0.001c-5.858,5.858-5.858,15.355,0,21.213l150.004,150c2.813,2.813,6.628,4.393,10.606,4.393
s7.794-1.581,10.606-4.394l149.996-150C331.465,94.749,331.465,85.251,325.607,79.393z"
    />
  </svg>
);

export default function DetailInfo({ countryData, setDetailInfo }) {
  const { data } = useContext(DataContext);

  const [showMoreInfo, setShowMoreInfo] = useState(false);
  const [isMapOpen, setIsMapOpen] = useState(false);
  const [isCoatOfArmsOpen, setIsCoatOfArmsOpen] = useState(false);

  const dialogMapRef = useRef(null);
  const dialogCoatOfArmsRef = useRef(null);

  const googleMapLink = countryData.maps.googleMaps;
  console.log(googleMapLink);

  function getCountryName(cca3) {
    const countryName = data.find((country) => country.cca3 === cca3);
    return countryName ? countryName.name.common : "";
  }

  function goToBorderCountry(cca3) {
    const countryName = data.find((country) => country.cca3 === cca3);
    setDetailInfo(countryName);
  }

  function openMap() {
    setIsMapOpen(true);
    dialogMapRef.current.showModal();
  }

  function openCoatOfArms() {
    setIsCoatOfArmsOpen(true);
    dialogCoatOfArmsRef.current.showModal();
  }

  function closeModalOnBackdropClick(e, ref) {
    const dialogDimensions = e.target.getBoundingClientRect();
    if (
      e.clientX < dialogDimensions.left ||
      e.clientX > dialogDimensions.right ||
      e.clientY < dialogDimensions.top ||
      e.clientY > dialogDimensions.bottom
    ) {
      ref.current.close();
    }
  }

  return (
    <article className="detail-info">
      <img
        src={countryData.flags.svg}
        alt={`${countryData.name.official} flag`}
        aria-label={countryData.flags.alt ? countryData.flags.alt : undefined}
        className="detail-info__img"
      />
      <div className="detail-info__data-container">
        <h2 className="detail-info__header">{countryData.name.common}</h2>
        <ul className="detail-info__list-container">
          <li className="detail-info__list-item-wrapper">
            <b>Native Name:</b>
            {countryData.name.nativeName == null ? (
              "none"
            ) : (
              <span>{Object.values(countryData.name.nativeName)[0].common}</span>
            )}
          </li>
          <li className="detail-info__list-item-wrapper">
            <b>Population:</b>
            <span>{countryData.population.toLocaleString()}</span>
          </li>
          <li className="detail-info__list-item-wrapper">
            <b>Region:</b>
            <span>{countryData.region}</span>
          </li>
          <li className="detail-info__list-item-wrapper">
            <b>Sub Region:</b>
            {!countryData.subregion ? "none" : <span>{countryData.subregion}</span>}
          </li>
          <li className="detail-info__list-item-wrapper">
            <b>Capital:</b>
            <div>
              {countryData.capital == null
                ? "none"
                : countryData.capital.map((capital, index) => (
                    <React.Fragment key={capital}>
                      {index > 0 && ", "}
                      <span key={capital}>{capital}</span>
                    </React.Fragment>
                  ))}
            </div>
          </li>
          <li className="detail-info__list-item-wrapper">
            <b>Top Level Domain:</b>
            <div>
              {countryData.tld.map((tld) => {
                return <span key={tld}>{tld}</span>;
              })}
            </div>
          </li>
          <li className="detail-info__list-item-wrapper">
            <b>Currencies:</b>
            {countryData.currencies == null ? (
              "none"
            ) : (
              <span title={`Symbol: ${Object.values(countryData.currencies)[0].symbol}`}>
                {Object.values(countryData.currencies)[0].name}
              </span>
            )}
          </li>
          <li className="detail-info__list-item-wrapper">
            <b>Languages:</b>
            <div>
              {countryData.languages == null
                ? "none"
                : Object.entries(countryData.languages).map(
                    ([languageCode, languageName], index) => (
                      <React.Fragment key={languageCode}>
                        {index > 0 && ", "}
                        <span>{languageName}</span>
                      </React.Fragment>
                    )
                  )}
            </div>
          </li>
        </ul>
        {countryData.borders && (
          <nav
            className="detail-info__border-countries-navigation"
            aria-label="Border Countries Navigation"
          >
            <h3 className="detail-info__border-countries-header">Border Countries:</h3>
            <div className="detail-info__border-countries-buttons-container">
              {countryData.borders.map((borderCountry) => (
                <React.Fragment key={borderCountry}>
                  <button
                    className="detail-info__border-countries-btn"
                    onClick={() => goToBorderCountry(borderCountry)}
                  >
                    {getCountryName(borderCountry)}
                  </button>
                </React.Fragment>
              ))}
            </div>
          </nav>
        )}
      </div>

      <div className="detail-info__more-info-container">
        <button
          className="detail-info__more-info-btn"
          onClick={() => setShowMoreInfo(!showMoreInfo)}
        >
          <span>More Info</span>
          {arrowSVG}
        </button>
        <div
          className={`${
            showMoreInfo
              ? "detail-info__more-info-list-container show"
              : "detail-info__more-info-list-container"
          }`}
        >
          <ul className="detail-info__more-info-list">
            <li className="detail-info__more-info-list-item-wrapper">
              <b>Official Name:</b>
              <span>{countryData.name.official}</span>
            </li>
            <li className="detail-info__more-info-list-item-wrapper">
              <b>Traffic:</b>
              <span>{countryData.car.side}-hand</span>
            </li>
            <li className="detail-info__more-info-list-item-wrapper">
              <b>Is country independent:</b>
              <span>{countryData.independent === true ? "Yes" : "No"}</span>
            </li>
            <li className="detail-info__more-info-list-item-wrapper">
              <b>Is country landlocked:</b>
              <span>{countryData.landlocked === true ? "Yes" : "No"}</span>
            </li>
            <li className="detail-info__more-info-list-item-wrapper">
              <b>Timezones:</b>
              <span>
                {countryData.timezones.map((timezone, index) => (
                  <React.Fragment key={timezone}>
                    {index > 0 && ", "}
                    <span>{timezone}</span>
                  </React.Fragment>
                ))}
              </span>
            </li>
            <div className="detail-info__more-info-dialog-wrapper">
              <li>
                <button
                  className="detail-info__more-info-list-item-btn"
                  onClick={openMap}
                >
                  Click to show on map.
                </button>
                <dialog
                  ref={dialogMapRef}
                  onClick={(e) => closeModalOnBackdropClick(e, dialogMapRef)}
                >
                  <iframe
                    // src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1538198.542433701!2d20.0260748!3d41.149935049999996!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x13453bf3bd274c2d%3A0x77ce589d6983bee!2sAlbania!5e0!3m2!1spl!2spl!4v1684350558439!5m2!1spl!2spl"
                    width="600"
                    height="450"
                    loading="lazy"
                  ></iframe>
                </dialog>
              </li>
              <li>
                <button
                  className="detail-info__more-info-list-item-btn"
                  onClick={openCoatOfArms}
                >
                  Click to show coat of arms.
                </button>
                <dialog
                  ref={dialogCoatOfArmsRef}
                  onClick={(e) => closeModalOnBackdropClick(e, dialogCoatOfArmsRef)}
                >
                  <img
                    src={countryData.coatOfArms.svg}
                    alt={`${countryData.name.common} Coat of Arms`}
                    loading="lazy"
                  />
                </dialog>
              </li>
            </div>
          </ul>
        </div>
      </div>
    </article>
  );
}
