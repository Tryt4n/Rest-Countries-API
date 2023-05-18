import React, { useContext, useRef, useState } from "react";
import DataContext from "../../context/DataContext";

const arrowSVG = (
  <svg
    fill="currentColor"
    viewBox="0 0 330 330"
  >
    <path
      d="M325.607,79.393c-5.857-5.857-15.355-5.858-21.213,0.001l-139.39,139.393L25.607,79.393
c-5.857-5.857-15.355-5.858-21.213,0.001c-5.858,5.858-5.858,15.355,0,21.213l150.004,150c2.813,2.813,6.628,4.393,10.606,4.393
s7.794-1.581,10.606-4.394l149.996-150C331.465,94.749,331.465,85.251,325.607,79.393z"
    />
  </svg>
);

const closeBtn = (
  <svg
    className="close-btn"
    viewBox="0 0 512 512"
    fill="currentColor"
  >
    <path d="M443.6,387.1L312.4,255.4l131.5-130c5.4-5.4,5.4-14.2,0-19.6l-37.4-37.6c-2.6-2.6-6.1-4-9.8-4c-3.7,0-7.2,1.5-9.8,4  L256,197.8L124.9,68.3c-2.6-2.6-6.1-4-9.8-4c-3.7,0-7.2,1.5-9.8,4L68,105.9c-5.4,5.4-5.4,14.2,0,19.6l131.5,130L68.4,387.1  c-2.6,2.6-4.1,6.1-4.1,9.8c0,3.7,1.4,7.2,4.1,9.8l37.4,37.6c2.7,2.7,6.2,4.1,9.8,4.1c3.5,0,7.1-1.3,9.8-4.1L256,313.1l130.7,131.1  c2.7,2.7,6.2,4.1,9.8,4.1c3.5,0,7.1-1.3,9.8-4.1l37.4-37.6c2.6-2.6,4.1-6.1,4.1-9.8C447.7,393.2,446.2,389.7,443.6,387.1z" />
  </svg>
);

export default function DetailInfo({ countryData, setDetailInfo }) {
  const { data } = useContext(DataContext);

  const [showMoreInfo, setShowMoreInfo] = useState(false);

  const dialogMapRef = useRef(null);
  const dialogCoatOfArmsRef = useRef(null);

  function getCountryName(cca3) {
    const countryName = data.find((country) => country.cca3 === cca3);
    return countryName ? countryName.name.common : "";
  }

  function goToBorderCountry(cca3) {
    const countryName = data.find((country) => country.cca3 === cca3);
    setDetailInfo(countryName);
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
      <h2 className="visually-hidden">Details Info of {countryData.name.official}</h2>
      <img
        src={countryData.flags.svg}
        alt={`${countryData.name.official} flag`}
        aria-label={countryData.flags.alt ? countryData.flags.alt : undefined}
        className="detail-info__img"
      />
      <section className="detail-info__data-container">
        <h3 className="detail-info__header">{countryData.name.common}</h3>
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
      </section>

      <section className="detail-info__more-info-container">
        <h3 className="visually-hidden">More Info of {countryData.name.official}</h3>
        <button
          className="detail-info__more-info-btn"
          aria-controls="more-info-container"
          onClick={() => setShowMoreInfo(!showMoreInfo)}
        >
          <span>More Info</span>
          <span className={`${showMoreInfo ? "arrow-svg rotate" : "arrow-svg"}`}>{arrowSVG}</span>
        </button>
        <div
          className={`${
            showMoreInfo
              ? "detail-info__more-info-list-container show"
              : "detail-info__more-info-list-container"
          }`}
        >
          <ul
            id="more-info-container"
            className="detail-info__more-info-list"
            aria-expanded={showMoreInfo ? "true" : "false"}
          >
            <li className="detail-info__more-info-list-item-wrapper">
              <b id="official-name">Official Name:</b>
              <span aria-labelledby="official-name">{countryData.name.official}</span>
            </li>
            <li className="detail-info__more-info-list-item-wrapper">
              <b id="traffic">Traffic:</b>
              <span aria-labelledby="traffic">{countryData.car.side}-hand Traffic</span>
            </li>
            <li className="detail-info__more-info-list-item-wrapper">
              <b id="independent">Is country independent:</b>
              <span aria-labelledby="independent">
                {countryData.independent === true ? "Yes" : "No"}
              </span>
            </li>
            <li className="detail-info__more-info-list-item-wrapper">
              <b id="landlocked">Is country landlocked:</b>
              <span aria-labelledby="landlocked">
                {countryData.landlocked === true ? "Yes" : "No"}
              </span>
            </li>
            <li className="detail-info__more-info-list-item-wrapper">
              <b id="timezones">Timezones:</b>
              <div aria-labelledby="timezones">
                {countryData.timezones.map((timezone, index) => (
                  <React.Fragment key={timezone}>
                    {index > 0 && ", "}
                    <span>{timezone}</span>
                  </React.Fragment>
                ))}
              </div>
            </li>
            <li className="detail-info__more-info-list-item-wrapper">
              <b id="un-member">UN Member:</b>
              <span aria-labelledby="un-member">{countryData.unMember ? "Yes" : "No"}</span>
            </li>
            <li className="detail-info__more-info-dialog-wrapper">
              <div>
                <button
                  className="detail-info__more-info-list-item-btn"
                  onClick={() => dialogMapRef.current.showModal()}
                  tabIndex={showMoreInfo ? 0 : -1}
                >
                  Click to show on map.
                </button>
                <dialog
                  ref={dialogMapRef}
                  onClick={(e) => closeModalOnBackdropClick(e, dialogMapRef)}
                  className="detail-info__dialog-container detail-info__map-container"
                >
                  <iframe
                    className="detail-info__map"
                    src={`https://maps.google.com/maps?q=${countryData.latlng[0]},${countryData.latlng[1]}&t=&z=5&ie=UTF8&iwloc=&output=embed`}
                    loading="lazy"
                    aria-label="Google Map"
                  ></iframe>
                  <button
                    className="detail-info__dialog-close-btn"
                    aria-labelledby="close-btn-description"
                    onClick={() => dialogMapRef.current.close()}
                  >
                    {closeBtn}
                  </button>
                </dialog>
              </div>
              {Object.keys(countryData.coatOfArms).length !== 0 && (
                <div>
                  <button
                    className="detail-info__more-info-list-item-btn"
                    onClick={() => dialogCoatOfArmsRef.current.showModal()}
                    tabIndex={showMoreInfo ? 0 : -1}
                  >
                    Click to show coat of arms.
                  </button>
                  <dialog
                    ref={dialogCoatOfArmsRef}
                    onClick={(e) => closeModalOnBackdropClick(e, dialogCoatOfArmsRef)}
                    className="detail-info__dialog-container detail-info__coat-of-arms-container"
                  >
                    <img
                      src={countryData.coatOfArms.png}
                      alt={`${countryData.name.common} Coat of Arms`}
                      loading="lazy"
                      className="detail-info__coat-of-arms"
                    />
                    <button
                      className="detail-info__dialog-close-btn"
                      aria-labelledby="close-btn-description"
                      onClick={() => dialogCoatOfArmsRef.current.close()}
                    >
                      {closeBtn}
                    </button>
                  </dialog>
                </div>
              )}
              <span
                id="close-btn-description"
                className="visually-hidden"
              >
                Close Button
              </span>
            </li>
          </ul>
        </div>
      </section>
    </article>
  );
}
