import { useContext } from "react";
import DataContext from "../../context/DataContext";
import Header from "../Header/Header";
import MainContent from "../MainContent/MainContent";

export default function App() {
  const { data, isLoading } = useContext(DataContext);

  return (
    <>
      <div className="header-bg">
        <Header />
      </div>
      <MainContent />
    </>
  );
}
