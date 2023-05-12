export default function Card({ country, alignLeft }) {
  return (
    <article className="country-card">
      <img
        src={`https://flagcdn.com/${country}.svg`}
        alt="flag"
        loading="lazy"
        className="country-card__img"
        data-align-left={alignLeft ? alignLeft : undefined}
      />
      <div className="country-card__text-wrapper">
        <h2 className="country-card__name">Albania</h2>
        <div className="country-card__text-line">
          <b className="country-card__text-bolded">Population:</b>
          &nbsp;
          <span>2,886,026</span>
        </div>
        <div className="country-card__text-line">
          <b className="country-card__text-bolded">Region:</b>
          &nbsp;
          <span>Europe</span>
        </div>
        <div className="country-card__text-line">
          <b className="country-card__text-bolded">Capital:</b>
          &nbsp;
          <span>Tirana</span>
        </div>
      </div>
    </article>
  );
}
