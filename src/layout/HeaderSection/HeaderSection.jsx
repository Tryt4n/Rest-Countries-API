import DarkModeSwitch from "../../components/DarkModeSwitch/DarkModeSwitch";

import { useTranslation } from "react-i18next";

export default function HeaderSection() {
  const { t } = useTranslation();

  return (
    <header className="container header-container">
      <h1 className="header-container__header">{t("mainHeader")}</h1>
      <DarkModeSwitch />
    </header>
  );
}
