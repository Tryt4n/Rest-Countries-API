// import { useContext } from "react";
// import DataContext from "../../context/DataContext";
import HeaderSection from "../HeaderSection/HeaderSection";
import MainContent from "../MainContent/MainContent";

export default function App() {
  // const { data, isLoading } = useContext(DataContext);

  return (
    <>
      <div className="header-bg">
        <HeaderSection />
      </div>
      <MainContent />
    </>
  );
}
