import { useContext } from "react";
import { useSelect } from "downshift";

import DataContext from "../../context/DataContext";

const arrowSVG = (
  <svg
    className="arrow-svg"
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

const regions = [
  { region: "Africa" },
  { region: "Americas" },
  { region: "Asia" },
  { region: "Europe" },
  { region: "Oceania" },
];

function itemToString(item) {
  return item ? item.title : "";
}
function stateReducer(state, actionAndChanges) {
  const { changes, type } = actionAndChanges;
  switch (type) {
    case useSelect.stateChangeTypes.MenuKeyDownEnter:
    case useSelect.stateChangeTypes.MenuKeyDownSpaceButton:
    case useSelect.stateChangeTypes.ItemClick:
      return {
        ...changes,
        isOpen: true, // keep menu open after selection.
        highlightedIndex: state.highlightedIndex,
      };
    default:
      return changes;
  }
}

export default function SelectInput() {
  const { selectedRegions, setSelectedRegions } = useContext(DataContext);

  const {
    isOpen,
    // selectedItem,
    getToggleButtonProps,
    getLabelProps,
    getMenuProps,
    highlightedIndex,
    getItemProps,
  } = useSelect({
    items: regions,
    itemToString,
    stateReducer,
    selectedItem: null,
    onSelectedItemChange: ({ selectedItem }) => {
      if (!selectedItem) {
        return;
      }

      setSelectedRegions((prevItems) => {
        const updatedItems = prevItems.filter((item) => item.region !== selectedItem.region);
        if (updatedItems.length === prevItems.length) {
          return [...prevItems, selectedItem];
        } else {
          return updatedItems;
        }
      });
    },
  });

  return (
    <div className="select">
      <label
        {...getLabelProps()}
        className="visually-hidden"
      >
        Filter by Region
      </label>
      <div
        className="select__text"
        {...getToggleButtonProps()}
      >
        <span>Filter by Region</span>
        <span>{arrowSVG}</span>
      </div>
      <ul
        className="select__list"
        {...getMenuProps()}
      >
        {isOpen &&
          regions.map((item, index) => (
            <li
              className={`select__list-item ${highlightedIndex === index ? "highlighted" : ""}`}
              key={`${item.value}${index}`}
              {...getItemProps({
                item,
                index,
                "aria-selected": selectedRegions.includes(item),
              })}
            >
              <input
                type="checkbox"
                className="select__list-item-input"
                checked={selectedRegions.includes(item)}
                value={item.region}
                onChange={() => null}
              />
              <span>{item.region}</span>
            </li>
          ))}
      </ul>
    </div>
  );
}
