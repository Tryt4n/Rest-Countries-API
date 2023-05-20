import { useContext, useState } from "react";

import DataContext from "../../context/DataContext";

import SearchBar from "../../components/SearchBar/SearchBar";
import SelectInput from "../../components/SelectInput/SelectInput";

export default function Navbar({ isDetailOpen, setIsDetailOpen }) {
  const { arrowSVG, advancedSearching } = useContext(DataContext);

  const [advancedSettingsOpen, setAdvancedSettingsOpen] = useState(false);

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
                  <legend>Sorting options:</legend>
                  <input
                    type="radio"
                    name="sorting"
                    id="a-z"
                    tabIndex={advancedSettingsOpen ? 0 : -1}
                    checked={
                      !advancedSearching.populationSearching
                        ? advancedSearching.alphabeticalSearching
                        : false
                    }
                    onChange={() => {
                      advancedSearching.setAlphabeticalSearching(true);
                      advancedSearching.setPopulationSearching(false);
                    }}
                  />
                  <label htmlFor="a-z">A-Z</label>
                  <input
                    type="radio"
                    name="sorting"
                    id="z-a"
                    tabIndex={advancedSettingsOpen ? 0 : -1}
                    checked={
                      !advancedSearching.populationSearching
                        ? !advancedSearching.alphabeticalSearching
                        : false
                    }
                    onChange={() => {
                      advancedSearching.setAlphabeticalSearching(false);
                      advancedSearching.setPopulationSearching(false);
                    }}
                  />
                  <label htmlFor="z-a">Z-A</label>

                  <input
                    type="radio"
                    name="sorting"
                    id="ascending"
                    tabIndex={advancedSettingsOpen ? 0 : -1}
                    checked={
                      advancedSearching.populationSearching
                        ? advancedSearching.populationAscending
                        : false
                    }
                    onChange={() => {
                      advancedSearching.setPopulationAscending(true);
                      advancedSearching.setPopulationSearching(true);
                    }}
                  />
                  <label htmlFor="ascending">Population ascending</label>
                  <input
                    type="radio"
                    name="sorting"
                    id="descending"
                    tabIndex={advancedSettingsOpen ? 0 : -1}
                    checked={
                      advancedSearching.populationSearching
                        ? !advancedSearching.populationAscending
                        : false
                    }
                    onChange={() => {
                      advancedSearching.setPopulationAscending(false);
                      advancedSearching.setPopulationSearching(true);
                    }}
                  />
                  <label htmlFor="descending">Population descending</label>
                </fieldset>

                <fieldset>
                  <legend>Landlocked:</legend>
                  <input
                    type="radio"
                    name="landlocked"
                    id="landlocked-all"
                    tabIndex={advancedSettingsOpen ? 0 : -1}
                    checked={
                      advancedSearching.landlocked !== true &&
                      advancedSearching.landlocked !== false
                    }
                    onChange={() => advancedSearching.setLandlocked(null)}
                  />
                  <label htmlFor="landlocked-all">Show all countries</label>
                  <input
                    type="radio"
                    name="landlocked"
                    id="landlocked-yes"
                    tabIndex={advancedSettingsOpen ? 0 : -1}
                    checked={
                      advancedSearching.landlocked === true ? advancedSearching.landlocked : false
                    }
                    onChange={() => advancedSearching.setLandlocked(true)}
                  />
                  <label htmlFor="landlocked-yes">Yes</label>
                  <input
                    type="radio"
                    name="landlocked"
                    id="landlocked-no"
                    tabIndex={advancedSettingsOpen ? 0 : -1}
                    checked={
                      advancedSearching.landlocked === false ? !advancedSearching.landlocked : false
                    }
                    onChange={() => advancedSearching.setLandlocked(false)}
                  />
                  <label htmlFor="landlocked-no">No</label>
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
