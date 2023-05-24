import { useContext, useState } from "react";

import DataContext from "../../context/DataContext";

import SearchBar from "../../components/SearchBar/SearchBar";
import SelectInput from "../../components/SelectInput/SelectInput";

import { useTranslation } from "react-i18next";

export default function Navbar({ isDetailOpen, setIsDetailOpen }) {
  const { t } = useTranslation();

  const { arrowSVG, advancedSearching } = useContext(DataContext);

  const [advancedSettingsOpen, setAdvancedSettingsOpen] = useState(false);

  return (
    <nav className="navigation-bar">
      <h2 className="visually-hidden">{t("navigationBarHeader")}</h2>
      <form onSubmit={(e) => e.preventDefault()}>
        {!isDetailOpen ? (
          <>
            <fieldset className="navigation-bar__form-container">
              <legend className="visually-hidden">{t("navigationBarBasicSearchingHeader")}</legend>
              <SearchBar />
              <SelectInput />
            </fieldset>

            <button
              className="navigation-bar__advanced-settings-btn"
              type="button"
              aria-controls="advanced-settings-list"
              aria-label={t("advancedSearchingSettingsButtonDescription")}
              title={t("advancedSearchingSettingsButtonDescription")}
              onClick={() => setAdvancedSettingsOpen(!advancedSettingsOpen)}
            >
              <span>{t("advancedSearchingSettingsButton")}</span>
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
                aria-label={t("advancedSearchingSettingsListDescription")}
              >
                <fieldset>
                  <legend className="navigation-bar__advanced-settings-legend">
                    {t("SortingOptions")}:
                  </legend>
                  <div className="navigation-bar__advanced-settings-inputs-container">
                    <div className="navigation-bar__advanced-settings-input-wrapper">
                      <input
                        type="radio"
                        name="sorting"
                        id="a-z"
                        className="navigation-bar__advanced-settings-input"
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
                      <label
                        htmlFor="a-z"
                        className="navigation-bar__advanced-settings-label"
                      >
                        A-Z
                      </label>
                    </div>
                    <div className="navigation-bar__advanced-settings-input-wrapper">
                      <input
                        type="radio"
                        name="sorting"
                        id="z-a"
                        className="navigation-bar__advanced-settings-input"
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
                      <label
                        htmlFor="z-a"
                        className="navigation-bar__advanced-settings-label"
                      >
                        Z-A
                      </label>
                    </div>
                    <div className="navigation-bar__advanced-settings-input-wrapper">
                      <input
                        type="radio"
                        name="sorting"
                        id="ascending"
                        className="navigation-bar__advanced-settings-input"
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
                      <label
                        htmlFor="ascending"
                        className="navigation-bar__advanced-settings-label"
                      >
                        {t("PopulationAscending")}
                      </label>
                    </div>
                    <div className="navigation-bar__advanced-settings-input-wrapper">
                      <input
                        type="radio"
                        name="sorting"
                        id="descending"
                        className="navigation-bar__advanced-settings-input"
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
                      <label
                        htmlFor="descending"
                        className="navigation-bar__advanced-settings-label"
                      >
                        {t("PopulationDescending")}
                      </label>
                    </div>
                  </div>
                </fieldset>

                <fieldset>
                  <legend className="navigation-bar__advanced-settings-legend">
                    {t("IndependentCountry")}:
                  </legend>
                  <div className="navigation-bar__advanced-settings-inputs-container">
                    <div className="navigation-bar__advanced-settings-input-wrapper">
                      <input
                        type="radio"
                        name="independent"
                        id="independent-all"
                        className="navigation-bar__advanced-settings-input"
                        tabIndex={advancedSettingsOpen ? 0 : -1}
                        checked={
                          advancedSearching.independent !== true &&
                          advancedSearching.independent !== false
                        }
                        onChange={() => {
                          advancedSearching.setIndependent(null);
                        }}
                      />
                      <label
                        htmlFor="independent-all"
                        className="navigation-bar__advanced-settings-label"
                      >
                        {t("ShowAllCountries")}
                      </label>
                    </div>
                    <div className="navigation-bar__advanced-settings-input-wrapper">
                      <input
                        type="radio"
                        name="independent"
                        id="independent-yes"
                        className="navigation-bar__advanced-settings-input"
                        tabIndex={advancedSettingsOpen ? 0 : -1}
                        checked={
                          advancedSearching.independent === true
                            ? advancedSearching.independent
                            : false
                        }
                        onChange={() => {
                          advancedSearching.setIndependent(true);
                        }}
                      />
                      <label
                        htmlFor="independent-yes"
                        className="navigation-bar__advanced-settings-label"
                      >
                        {t("Yes")}
                      </label>
                    </div>
                    <div className="navigation-bar__advanced-settings-input-wrapper">
                      <input
                        type="radio"
                        name="independent"
                        id="independent-no"
                        className="navigation-bar__advanced-settings-input"
                        tabIndex={advancedSettingsOpen ? 0 : -1}
                        checked={
                          advancedSearching.independent === false
                            ? !advancedSearching.independent
                            : false
                        }
                        onChange={() => {
                          advancedSearching.setIndependent(false);
                        }}
                      />
                      <label
                        htmlFor="independent-no"
                        className="navigation-bar__advanced-settings-label"
                      >
                        {t("No")}
                      </label>
                    </div>
                  </div>
                </fieldset>

                <fieldset>
                  <legend className="navigation-bar__advanced-settings-legend">
                    {t("LandlockedCountry")}:
                  </legend>
                  <div className="navigation-bar__advanced-settings-inputs-container">
                    <div className="navigation-bar__advanced-settings-input-wrapper">
                      <input
                        type="radio"
                        name="landlocked"
                        id="landlocked-all"
                        className="navigation-bar__advanced-settings-input"
                        tabIndex={advancedSettingsOpen ? 0 : -1}
                        checked={
                          advancedSearching.landlocked !== true &&
                          advancedSearching.landlocked !== false
                        }
                        onChange={() => {
                          advancedSearching.setLandlocked(null);
                        }}
                      />
                      <label
                        htmlFor="landlocked-all"
                        className="navigation-bar__advanced-settings-label"
                      >
                        {t("ShowAllCountries")}
                      </label>
                    </div>
                    <div className="navigation-bar__advanced-settings-input-wrapper">
                      <input
                        type="radio"
                        name="landlocked"
                        id="landlocked-yes"
                        className="navigation-bar__advanced-settings-input"
                        tabIndex={advancedSettingsOpen ? 0 : -1}
                        checked={
                          advancedSearching.landlocked === true
                            ? advancedSearching.landlocked
                            : false
                        }
                        onChange={() => {
                          advancedSearching.setLandlocked(true);
                        }}
                      />
                      <label
                        htmlFor="landlocked-yes"
                        className="navigation-bar__advanced-settings-label"
                      >
                        {t("Yes")}
                      </label>
                    </div>
                    <div className="navigation-bar__advanced-settings-input-wrapper">
                      <input
                        type="radio"
                        name="landlocked"
                        id="landlocked-no"
                        className="navigation-bar__advanced-settings-input"
                        tabIndex={advancedSettingsOpen ? 0 : -1}
                        checked={
                          advancedSearching.landlocked === false
                            ? !advancedSearching.landlocked
                            : false
                        }
                        onChange={() => {
                          advancedSearching.setLandlocked(false);
                        }}
                      />
                      <label
                        htmlFor="landlocked-no"
                        className="navigation-bar__advanced-settings-label"
                      >
                        {t("No")}
                      </label>
                    </div>
                  </div>
                </fieldset>

                <fieldset>
                  <legend className="navigation-bar__advanced-settings-legend">
                    {t("UnitedNationsMember")}:
                  </legend>
                  <div className="navigation-bar__advanced-settings-inputs-container">
                    <div className="navigation-bar__advanced-settings-input-wrapper">
                      <input
                        type="radio"
                        name="united-nations"
                        id="united-nations-all"
                        className="navigation-bar__advanced-settings-input"
                        tabIndex={advancedSettingsOpen ? 0 : -1}
                        checked={
                          advancedSearching.unitedNationsMember !== true &&
                          advancedSearching.unitedNationsMember !== false
                        }
                        onChange={() => {
                          advancedSearching.setUnitedNationsMember(null);
                        }}
                      />
                      <label
                        htmlFor="united-nations-all"
                        className="navigation-bar__advanced-settings-label"
                      >
                        {t("ShowAllCountries")}
                      </label>
                    </div>
                    <div className="navigation-bar__advanced-settings-input-wrapper">
                      <input
                        type="radio"
                        name="united-nations"
                        id="united-nations-yes"
                        className="navigation-bar__advanced-settings-input"
                        tabIndex={advancedSettingsOpen ? 0 : -1}
                        checked={
                          advancedSearching.unitedNationsMember === true
                            ? advancedSearching.unitedNationsMember
                            : false
                        }
                        onChange={() => {
                          advancedSearching.setUnitedNationsMember(true);
                        }}
                      />
                      <label
                        htmlFor="united-nations-yes"
                        className="navigation-bar__advanced-settings-label"
                      >
                        {t("Yes")}
                      </label>
                    </div>
                    <div className="navigation-bar__advanced-settings-input-wrapper">
                      <input
                        type="radio"
                        name="united-nations"
                        id="united-nations-no"
                        className="navigation-bar__advanced-settings-input"
                        tabIndex={advancedSettingsOpen ? 0 : -1}
                        checked={
                          advancedSearching.unitedNationsMember === false
                            ? !advancedSearching.unitedNationsMember
                            : false
                        }
                        onChange={() => {
                          advancedSearching.setUnitedNationsMember(false);
                        }}
                      />
                      <label
                        htmlFor="united-nations-no"
                        className="navigation-bar__advanced-settings-label"
                      >
                        {t("No")}
                      </label>
                    </div>
                  </div>
                </fieldset>

                <fieldset>
                  <legend className="navigation-bar__advanced-settings-legend">
                    {t("Traffic")}:
                  </legend>
                  <div className="navigation-bar__advanced-settings-inputs-container">
                    <div className="navigation-bar__advanced-settings-input-wrapper">
                      <input
                        type="radio"
                        name="traffic"
                        id="traffic-all"
                        className="navigation-bar__advanced-settings-input"
                        tabIndex={advancedSettingsOpen ? 0 : -1}
                        checked={
                          advancedSearching.traffic !== true && advancedSearching.traffic !== false
                        }
                        onChange={() => {
                          advancedSearching.setTraffic(null);
                        }}
                      />
                      <label
                        htmlFor="traffic-all"
                        className="navigation-bar__advanced-settings-label"
                      >
                        {t("ShowAllCountries")}
                      </label>
                    </div>
                    <div className="navigation-bar__advanced-settings-input-wrapper">
                      <input
                        type="radio"
                        name="traffic"
                        id="traffic-yes"
                        className="navigation-bar__advanced-settings-input"
                        tabIndex={advancedSettingsOpen ? 0 : -1}
                        checked={
                          advancedSearching.traffic === true ? advancedSearching.traffic : false
                        }
                        onChange={() => {
                          advancedSearching.setTraffic(true);
                        }}
                      />
                      <label
                        htmlFor="traffic-yes"
                        className="navigation-bar__advanced-settings-label"
                      >
                        {t("LeftHand")}
                      </label>
                    </div>
                    <div className="navigation-bar__advanced-settings-input-wrapper">
                      <input
                        type="radio"
                        name="traffic"
                        id="traffic-no"
                        className="navigation-bar__advanced-settings-input"
                        tabIndex={advancedSettingsOpen ? 0 : -1}
                        checked={
                          advancedSearching.traffic === false ? !advancedSearching.traffic : false
                        }
                        onChange={() => {
                          advancedSearching.setTraffic(false);
                        }}
                      />
                      <label
                        htmlFor="traffic-no"
                        className="navigation-bar__advanced-settings-label"
                      >
                        {t("RightHand")}
                      </label>
                    </div>
                  </div>
                </fieldset>
              </div>
            </div>
          </>
        ) : (
          <button
            className="navigation-bar__back-btn"
            aria-label={t("GoToMainPage")}
            title={t("GoToMainPage")}
            onClick={() => setIsDetailOpen(false)}
          >
            <span className="navigation-bar__back-btn--arrow">&#8592;</span>
            {t("navigationBarBackButton")}
          </button>
        )}
      </form>
    </nav>
  );
}
