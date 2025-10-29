import { Outlet, useLocation } from "react-router-dom";
import Rodape from "./components/Rodape/Rodape";
import Cabecalho from "./components/Cabecalho";

export default function App() {
  const { pathname } = useLocation();

  const hideChrome =
    pathname.startsWith("/login") || pathname.startsWith("/cadastro");

  return (
    
    <div className="mx-auto">
      {!hideChrome && <Cabecalho />}
        <Outlet />
        <Rodape />
    </div>
   
  );
}
