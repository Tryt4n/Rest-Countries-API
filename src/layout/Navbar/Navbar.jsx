import { useState } from "react";

import SearchBar from "../../components/SearchBar/SearchBar";
import SelectInput from "../../components/SelectInput/SelectInput";

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

export default function Navbar({ isDetailOpen, setIsDetailOpen }) {
  const [advancedSettingsOpen, setAdvancedSettingsOpen] = useState(false);

  return (
    <nav className="navigation-bar">
      <h2 className="visually-hidden">Main Navigation bar</h2>
      <form
        // className="navigation-bar__form-container"
        onSubmit={(e) => e.preventDefault()}
      >
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
                    defaultChecked
                  />
                  <label htmlFor="a-z">A-Z</label>
                  <input
                    type="radio"
                    name="alphabetically"
                    id="z-a"
                    tabIndex={advancedSettingsOpen ? 0 : -1}
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

// import SearchBar from "../../components/SearchBar/SearchBar";
// import SelectInput from "../../components/SelectInput/SelectInput";

// export default function Navbar({ isDetailOpen, setIsDetailOpen }) {
//   return (
//     <nav className="navigation-bar">
//       <h2 className="visually-hidden">Main Navigation bar</h2>
//       <form
//         className="navigation-bar__form-container"
//         onSubmit={(e) => e.preventDefault()}
//       >
//         {!isDetailOpen ? (
//           <>
//               <SearchBar />
//               <SelectInput />
//           </>
//         ) : (
//           <button
//             className="navigation-bar__back-btn"
//             onClick={() => setIsDetailOpen(false)}
//           >
//             <span className="navigation-bar__back-btn--arrow">&#8592;</span>
//             back
//           </button>
//         )}
//       </form>
//     </nav>
//   );
// }
