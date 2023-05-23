import { useEffect } from "react";
import HeaderSection from "../HeaderSection/HeaderSection";
import MainContent from "../MainContent/MainContent";

import DataContext from "../../context/DataContext";

import { useTranslation } from "react-i18next";
import { useContext } from "react";

export default function App() {
  const { lng } = useContext(DataContext);
  const { i18n } = useTranslation();

  useEffect(() => {
    i18n.changeLanguage(lng);
  }, []);

  return (
    <>
      <div className="header-bg">
        <HeaderSection />
      </div>
      <MainContent />
    </>
  );
}
