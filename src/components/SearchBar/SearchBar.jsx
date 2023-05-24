import { useContext, useEffect, useState } from "react";
import DataContext from "../../context/DataContext";

import { useTranslation } from "react-i18next";

export default function SearchBar() {
  const { t } = useTranslation();

  const { searchText, handleSearchChange } = useContext(DataContext);
  const [searchBarWarning, setSearchBarWarning] = useState(false);

  const handleKeyPress = (event) => {
    const charCode = event.which || event.keyCode;
    const char = String.fromCharCode(charCode);
    const pattern = /[a-zA-Z\s]/;

    if (!pattern.test(char)) {
      event.preventDefault();
      setSearchBarWarning(true);
    }
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      setSearchBarWarning(false);
    }, 3000);

    return () => clearTimeout(timeout);
  }, [searchBarWarning]);

  return (
    <label
      htmlFor="country-searchbar"
      className="country-searchbar"
      aria-label={t("searchbarLabel")}
    >
      <svg
        className="country-searchbar__icon"
        aria-hidden
        xmlns="http://www.w3.org/2000/svg"
        fill="currentColor"
        viewBox="0 0 24 24"
        id="search"
      >
        <path d="M3.624,15a8.03,8.03,0,0,0,10.619.659l5.318,5.318a1,1,0,0,0,1.414-1.414l-5.318-5.318A8.04,8.04,0,0,0,3.624,3.624,8.042,8.042,0,0,0,3.624,15Zm1.414-9.96a6.043,6.043,0,1,1-1.77,4.274A6,6,0,0,1,5.038,5.038Z"></path>
      </svg>
      <input
        type="search"
        name="searchbar"
        id="country-searchbar"
        className="country-searchbar__input"
        placeholder={t("searchbarPlaceholder")}
        pattern="[a-zA-Z]"
        maxLength={30}
        value={searchText}
        onChange={handleSearchChange}
        onKeyPress={handleKeyPress}
      />
      {searchBarWarning && (
        <dialog
          className="country-searchbar__warning"
          open={searchBarWarning}
        >
          {t("searchbarWarningText")}
        </dialog>
      )}
    </label>
  );
}
