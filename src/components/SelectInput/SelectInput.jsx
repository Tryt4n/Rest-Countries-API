export default function SelectInput() {
  return (
    <label className="select-input-container">
      {/* <label
        htmlFor="region-selection"
        className="visually-hidden"
      >
        Filter by Region
      </label> */}
      <select
        name="region"
        id="region-selection"
        className="select-input"
        defaultValue=""
      >
        <option
          value=""
          disabled
        >
          Filter by Region
        </option>
        <option value="africa">africa</option>
        <option value="america">america</option>
        <option value="asia">asia</option>
        <option value="europe">europe</option>
        <option value="oceania">oceania</option>
      </select>
    </label>
  );
}

// import * as React from "react";
// import { render } from "react-dom";
// import Downshift from "downshift";

// export default function SelectInput() {
//   const items = [
//     { value: "apple" },
//     { value: "pear" },
//     { value: "orange" },
//     { value: "grape" },
//     { value: "banana" },
//   ];

//   // render(
//   (
//     <Downshift
//       onChange={(selection) =>
//         alert(selection ? `You selected ${selection.value}` : "Selection Cleared")
//       }
//       itemToString={(item) => (item ? item.value : "")}
//     >
//       {({
//         getInputProps,
//         getItemProps,
//         getLabelProps,
//         getMenuProps,
//         isOpen,
//         inputValue,
//         highlightedIndex,
//         selectedItem,
//         getRootProps,
//       }) => (
//         <div>
//           <label {...getLabelProps()}>Enter a fruit</label>
//           <div
//             style={{ display: "inline-block" }}
//             {...getRootProps({}, { suppressRefError: true })}
//           >
//             <input {...getInputProps()} />
//           </div>
//           <ul {...getMenuProps()}>
//             {isOpen
//               ? items
//                   .filter((item) => !inputValue || item.value.includes(inputValue))
//                   .map((item, index) => (
//                     <li
//                       {...getItemProps({
//                         key: item.value,
//                         index,
//                         item,
//                         style: {
//                           backgroundColor: highlightedIndex === index ? "lightgray" : "white",
//                           fontWeight: selectedItem === item ? "bold" : "normal",
//                         },
//                       })}
//                     >
//                       {item.value}
//                     </li>
//                   ))
//               : null}
//           </ul>
//         </div>
//       )}
//     </Downshift>
//   ),
//     document.getElementById("root");
//   // );
// }
