export default function SearchBar() {
  return (
    <label
      htmlFor="country-searchbar"
      className="country-searchbar"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="currentColor"
        viewBox="0 0 24 24"
        id="search"
        className="country-searchbar__icon"
        aria-hidden
      >
        <path d="M3.624,15a8.03,8.03,0,0,0,10.619.659l5.318,5.318a1,1,0,0,0,1.414-1.414l-5.318-5.318A8.04,8.04,0,0,0,3.624,3.624,8.042,8.042,0,0,0,3.624,15Zm1.414-9.96a6.043,6.043,0,1,1-1.77,4.274A6,6,0,0,1,5.038,5.038Z"></path>
      </svg>
      <input
        type="search"
        name=""
        id="country-searchbar"
        className="country-searchbar__input"
        placeholder="Search for a country..."
        maxLength={30}
      />
    </label>
  );
}
