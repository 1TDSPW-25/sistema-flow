import { Outlet } from "react-router-dom";
import Rodape from "./components/Rodape/Rodape";
import ApiTester from "./TesterApi";
import Cabecalho from "./components/Cabecalho/Cabecalho";

export default function App() {

  return (
    
    <div className="mx-auto">

        <ApiTester /> {/* Apague esta linha junto do arquivo ApiTester.tsx quando tiver certeza que a API está funcionando e o projeto finalizado. Esta linha serve apenas para testar a comunicação com a API, retornando o resultado no console do navegador. */}
        <Cabecalho />
        <Outlet />
        <Rodape />
    </div>
   
  );
}
