export default function Card({ data, alignLeft }) {
  return (
    <a
      href="#"
      className="country-card__link"
    >
      <article
        className="country-card"
        onClick={() => console.log(data)}
      >
        <img
          src={data.flags.svg}
          alt={data.flags.alt ? data.flags.alt : `${data.name.official} flag`}
          loading="lazy"
          className="country-card__img"
          data-align-left={alignLeft ? alignLeft : undefined}
        />
        <div className="country-card__text-wrapper">
          <h2 className="country-card__name">{data.name.common}</h2>
          <div className="country-card__text-line">
            <b className="country-card__text-bolded">Population:</b>
            &nbsp;
            <span>{data.population.toLocaleString()}</span>
          </div>
          <div className="country-card__text-line">
            <b className="country-card__text-bolded">Region:</b>
            &nbsp;
            <span>{data.region}</span>
          </div>
          <div className="country-card__text-line">
            <b className="country-card__text-bolded">Capital:</b>
            &nbsp;
            <span>{data.capital}</span>
          </div>
        </div>
      </article>
    </a>
  );
}
