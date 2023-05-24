import { useTranslation } from "react-i18next";

export default function LoadingSpinner() {
  const { t } = useTranslation();

  return (
    <div className="lds-default">
      <span className="visually-hidden">{t(LoadingSpinner)}</span>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  );
}
