import { useContext, useState } from "react";

import DataContext from "../../context/DataContext";

import SearchBar from "../../components/SearchBar/SearchBar";
import SelectInput from "../../components/SelectInput/SelectInput";

export default function Navbar({ isDetailOpen, setIsDetailOpen }) {
  const { arrowSVG, alphabeticalSearching, setAlphabeticalSearching } = useContext(DataContext);

  const [advancedSettingsOpen, setAdvancedSettingsOpen] = useState(false);

  // const [populationSearching, setPopulationSearching] = useState(null)
  // const [alphabeticalSearching, setAlphabeticalSearching] = useState(true)

  return (
    <nav className="navigation-bar">
      <h2 className="visually-hidden">Main Navigation bar</h2>
      <form onSubmit={(e) => e.preventDefault()}>
        {!isDetailOpen ? (
          <>
            <fieldset className="navigation-bar__form-container">
              <legend className="visually-hidden">Basic Searching</legend>
              <SearchBar />
              <SelectInput />
            </fieldset>

            <button
              className="navigation-bar__advanced-settings-btn"
              type="button"
              aria-controls="advanced-settings-list"
              onClick={() => setAdvancedSettingsOpen(!advancedSettingsOpen)}
            >
              <span>Advanced Searching Settings</span>
              <span className={`${advancedSettingsOpen ? "arrow-svg rotate" : "arrow-svg"}`}>
                {arrowSVG}
              </span>
            </button>
            <div
              className={`${
                advancedSettingsOpen
                  ? "navigation-bar__advanced-settings-grid-container show"
                  : "navigation-bar__advanced-settings-grid-container"
              }`}
            >
              <div
                id="advanced-settings-list"
                className="navigation-bar__advanced-settings-container"
                role="region"
                aria-expanded={advancedSettingsOpen}
              >
                <fieldset>
                  <legend>Sort by population:</legend>
                  <input
                    type="radio"
                    name="population"
                    id="none"
                    tabIndex={advancedSettingsOpen ? 0 : -1}
                    defaultChecked
                  />
                  <label htmlFor="none">none</label>
                  <input
                    type="radio"
                    id="ascending"
                    name="population"
                    tabIndex={advancedSettingsOpen ? 0 : -1}
                    // value="growing"
                  />
                  <label htmlFor="ascending">ascending</label>
                  <input
                    type="radio"
                    id="descending"
                    name="population"
                    tabIndex={advancedSettingsOpen ? 0 : -1}
                    // value="declining"
                  />
                  <label htmlFor="descending">descending</label>
                </fieldset>

                <fieldset>
                  <legend>Sort alphabetically:</legend>
                  <input
                    type="radio"
                    name="alphabetically"
                    id="a-z"
                    tabIndex={advancedSettingsOpen ? 0 : -1}
                    defaultChecked={alphabeticalSearching}
                    onChange={() => setAlphabeticalSearching(true)}
                  />
                  <label htmlFor="a-z">A-Z</label>
                  <input
                    type="radio"
                    name="alphabetically"
                    id="z-a"
                    tabIndex={advancedSettingsOpen ? 0 : -1}
                    onChange={() => setAlphabeticalSearching(false)}
                  />
                  <label htmlFor="z-a">Z-A</label>
                </fieldset>
              </div>
            </div>
          </>
        ) : (
          <button
            className="navigation-bar__back-btn"
            onClick={() => setIsDetailOpen(false)}
          >
            <span className="navigation-bar__back-btn--arrow">&#8592;</span>
            back
          </button>
        )}
      </form>
    </nav>
  );
}
