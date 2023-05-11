import SearchBar from "../../components/SearchBar/SearchBar";
import SelectInput from "../../components/SelectInput/SelectInput";

export default function Navbar() {
  return (
    <nav className="navigation-bar">
      <SearchBar />
      <SelectInput />
    </nav>
  );
}
