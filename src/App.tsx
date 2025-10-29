import { Outlet, useLocation } from "react-router-dom";
import Rodape from "./components/Rodape/Rodape";
import Cabecalho from "./components/Cabecalho";
import Toggle from "./components/Toggle";
import UploadArquivosOnly from "./components/Upload/UploadArquivosOnly";



export default function App() {
  const { pathname } = useLocation();

  const hideHeader = pathname.startsWith("/login") || pathname.startsWith("/cadastro");

  const handleThemeToggle = () => {
    const theme = window.localStorage.getItem("theme");

    if (!theme || theme === "dark") {
      window.localStorage.setItem("theme", "light");
      document.documentElement.dataset.theme = "light";
      return;
    }

    window.localStorage.setItem("theme", "dark");
    document.documentElement.dataset.theme = "dark";
  };

  return (
    <div className="mx-auto relative">
      {!hideHeader && <Cabecalho />}


      <div className="absolute top-22 right-2 grid gap-2 justify-items-center">
        <span className="text-end text-gray-700 dark:text-gray-200">Dark mode</span>
        <Toggle onToggle={handleThemeToggle} />
      </div>

      {}
      {pathname === "/" && <UploadArquivosOnly />}
      <Outlet />
      <Rodape />
    </div>
  );
}
