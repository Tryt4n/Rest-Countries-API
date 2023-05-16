import React, { useContext } from "react";
import DataContext from "../../context/DataContext";

export default function DetailInfo({ countryData }) {
  const { data } = useContext(DataContext);

  function getCountryName(cca3) {
    const countryName = data.find((country) => country.cca3 === cca3);
    return countryName ? countryName.name.common : "";
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
        <h2 className="detail-info__header">{countryData.name.official}</h2>
        <ul className="detail-info__list-container">
          <li className="detail-info__list-item-wrapper">
            <b>Native Name:</b>
            &nbsp;
            <span>{Object.values(countryData.name.nativeName)[0].common}</span>
          </li>
          <li className="detail-info__list-item-wrapper">
            <b>Population:</b>
            &nbsp;
            <span>{countryData.population.toLocaleString()}</span>
          </li>
          <li className="detail-info__list-item-wrapper">
            <b>Region:</b>
            &nbsp;
            <span>{countryData.region}</span>
          </li>
          <li className="detail-info__list-item-wrapper">
            <b>Sub Region:</b>
            &nbsp;
            <span>{countryData.subregion}</span>
          </li>
          <li className="detail-info__list-item-wrapper">
            <b>Capital:</b>
            &nbsp;
            <div>
              {countryData.capital.map((capital, index) => (
                <React.Fragment key={capital}>
                  {index > 0 && ", "}
                  <span key={capital}>{capital}</span>
                </React.Fragment>
              ))}
            </div>
          </li>
          <li className="detail-info__list-item-wrapper">
            <b>Top Level Domain:</b>
            &nbsp;
            <div>
              {countryData.tld.map((tld) => {
                return <span key={tld}>{tld}</span>;
              })}
            </div>
          </li>
          <li className="detail-info__list-item-wrapper">
            <b>Currencies:</b>
            &nbsp;
            <span title={`Symbol: ${Object.values(countryData.currencies)[0].symbol}`}>
              {Object.values(countryData.currencies)[0].name}
            </span>
          </li>
          <li className="detail-info__list-item-wrapper">
            <b>Languages:</b>
            &nbsp;
            <div>
              {Object.entries(countryData.languages).map(([languageCode, languageName], index) => (
                <React.Fragment key={languageCode}>
                  {index > 0 && ", "}
                  <span>{languageName}</span>
                </React.Fragment>
              ))}
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
                  <button className="detail-info__border-countries-btn">
                    {getCountryName(borderCountry)}
                  </button>
                </React.Fragment>
              ))}
            </div>
          </nav>
        )}
      </div>
    </article>
  );
}
