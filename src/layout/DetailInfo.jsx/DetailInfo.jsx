import React from "react";

export default function DetailInfo({ countryData }) {
  return (
    <article className="detail-info">
      <img
        src={countryData.flags.svg}
        alt={`${countryData.name.official} flag`}
        aria-label={countryData.flags.alt ? countryData.flags.alt : undefined}
        className="detail-info__img"
      />
      <div className="detail-info__data-container">
        <h2>{countryData.name.official}</h2>
        <ul>
          <li>
            <b>Native Name:</b>
            &nbsp;
            <span>{Object.values(countryData.name.nativeName)[0].common}</span>
          </li>
          <li>
            <b>Population:</b>
            &nbsp;
            <span>{countryData.population}</span>
          </li>
          <li>
            <b>Region:</b>
            &nbsp;
            <span>{countryData.region}</span>
          </li>
          <li>
            <b>Sub Region:</b>
            &nbsp;
            <span>{countryData.subregion}</span>
          </li>
          <li>
            <b>Capital:</b>
            &nbsp;
            <span>{countryData.capital}</span>
          </li>
          <li>
            <b>Top Level Domain:</b>
            &nbsp;
            <div>
              {countryData.tld.map((tld) => {
                return <span key={tld}>{tld}</span>;
              })}
            </div>
          </li>
          <li>
            <b>Currencies:</b>
            &nbsp;
            <span>{Object.values(countryData.currencies)[0].name}</span>
          </li>
          <li>
            <b>Languages</b>
            &nbsp;
            <div>
              {Object.entries(countryData.languages).map(([languageCode, languageName]) => {
                console.log(languageName);
                return <span key={languageCode}>{languageName}</span>;
              })}
            </div>
          </li>
        </ul>
        {countryData.borders && (
          <nav aria-label="Border Countries Navigation">
            <h3>Border Countries</h3>
            <div>
              {countryData.borders.map((borderCountry) => (
                <React.Fragment key={borderCountry}>
                  <button>{borderCountry}</button>
                </React.Fragment>
              ))}
            </div>
          </nav>
        )}
      </div>
    </article>
  );
}
