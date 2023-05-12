import DarkModeSwitch from "../../components/DarkModeSwitch/DarkModeSwitch";

export default function Header() {
  return (
    <header className="container header-container">
      <h1 className="header-container__header">Where in the world?</h1>
      <DarkModeSwitch />
    </header>
  );
}
