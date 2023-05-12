import { useContext } from "react";
import DataContext from "../../context/DataContext";
import Header from "../header/Header";
import Main from "../main/Main";

export default function App() {
  const { data, isLoading } = useContext(DataContext);

  return (
    <>
      <div className="header-bg">
        <Header />
      </div>
      <Main />
    </>
  );
}
