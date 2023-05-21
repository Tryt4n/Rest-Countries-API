import { useContext } from "react";
import { useSelect } from "downshift";

import DataContext from "../../context/DataContext";

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
  const { arrowSVG, selectedRegions, setSelectedRegions } = useContext(DataContext);

  const {
    isOpen,
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
    <div
      className="select"
      title="Click to show filtering options by region."
    >
      <div
        className="select__text"
        {...getToggleButtonProps()}
      >
        <label
          className="select__label"
          {...getLabelProps()}
        >
          Filter by Region
        </label>
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
              <span>{item.region}</span>
            </li>
          ))}
      </ul>
    </div>
  );
}
