import SearchBar from "../../components/SearchBar/SearchBar";
import SelectInput from "../../components/SelectInput/SelectInput";

export default function Navbar() {
  return (
    <nav className="navigation-bar">
      <h2 className="visually-hidden">Navigation bar</h2>
      <form
        className="navigation-bar__form-container"
        onSubmit={(e) => e.preventDefault()}
      >
        <SearchBar />
        <SelectInput />
      </form>
    </nav>
  );
}
