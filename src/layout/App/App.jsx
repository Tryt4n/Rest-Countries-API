import { useEffect } from "react";
import HeaderSection from "../HeaderSection/HeaderSection";
import MainContent from "../MainContent/MainContent";

import { useTranslation } from "react-i18next";

export default function App() {
  const { i18n } = useTranslation();

  useEffect(() => {
    const lng = navigator.language;
    // const lng = "hr";

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
