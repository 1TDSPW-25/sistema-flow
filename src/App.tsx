import { Outlet } from "react-router-dom";
import Rodape from "./components/Rodape/Rodape";
import Menu from "./components/Menu/Menu.tsx";

export default function App() {

  return (
    
    <div className="mx-auto">

        <Menu />
        <Outlet />
        <Rodape />
    </div>
   
  );
}
