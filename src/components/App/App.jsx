import { useContext } from "react";
import DataContext from "../../context/DataContext";

export default function App() {
  const { data } = useContext(DataContext);

  return <div>App</div>;
}
