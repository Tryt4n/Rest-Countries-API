import SearchBar from "../../components/SearchBar/SearchBar";
import SelectInput from "../../components/SelectInput/SelectInput";

export default function Navbar({ isDetailOpen, setIsDetailOpen }) {
  return (
    <nav className="navigation-bar">
      <h2 className="visually-hidden">Main Navigation bar</h2>
      <form
        className="navigation-bar__form-container"
        onSubmit={(e) => e.preventDefault()}
      >
        {!isDetailOpen ? (
          <>
            <SearchBar />
            <SelectInput />
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
