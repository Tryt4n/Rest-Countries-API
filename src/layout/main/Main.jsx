import Card from "../../components/Card/Card";
import Navbar from "../Navbar/Navbar";

export default function Main() {
  return (
    <main className="container">
      <Navbar />
      <div className="country-cards-grid">
        <Card country="al" />
        <Card
          country="us"
          alignLeft
        />
        <Card country="pl" />
        <Card country="pt" />
        <Card country="es" />
        <Card country="fr" />
        <Card country="gb" />
        <Card country="uy" />
        <Card country="af" />
        <Card country="al" />
        <Card country="us" />
        <Card country="pl" />
        <Card country="pt" />
        <Card country="es" />
        <Card country="fr" />
        <Card country="gb" />
        <Card country="uy" />
        <Card country="af" />
        <Card country="al" />
        <Card country="us" />
        <Card country="pl" />
        <Card country="pt" />
        <Card country="es" />
        <Card country="fr" />
        <Card country="gb" />
        <Card country="uy" />
        <Card country="af" />
      </div>
    </main>
  );
}
