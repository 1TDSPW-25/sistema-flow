import { Outlet, useLocation } from "react-router-dom";
import Rodape from "./components/Rodape/Rodape";
import Cabecalho from "./components/Cabecalho";
import Toggle from "./components/Toggle";
import UploadArquivosOnly from "./components/Upload/UploadArquivosOnly";
import { useEffect } from "react";

export default function App() {
  const { pathname } = useLocation();

  const hideHeader = pathname.startsWith("/login") || pathname.startsWith("/cadastro");

  // Inicializar o tema baseado no localStorage ou preferência do sistema
  useEffect(() => {
    const savedTheme = window.localStorage.getItem("theme");
    const systemPrefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    
    if (!savedTheme) {
      const theme = systemPrefersDark ? "dark" : "light";
      window.localStorage.setItem("theme", theme);
      document.documentElement.dataset.theme = theme;
      return;
    }

    document.documentElement.dataset.theme = savedTheme;
  }, []);

  const handleThemeToggle = () => {
    const currentTheme = window.localStorage.getItem("theme") || "light";
    const newTheme = currentTheme === "dark" ? "light" : "dark";
    
    window.localStorage.setItem("theme", newTheme);
    document.documentElement.dataset.theme = newTheme;
  };

  return (
    <div className="mx-auto relative">
      {!hideHeader && <Cabecalho />}

      <div className="absolute top-22 right-2 grid gap-2 justify-items-center">
        <span className="text-end text-gray-700 dark:text-gray-200">Dark mode</span>
        <Toggle onToggle={handleThemeToggle} />
      </div>

      {pathname === "/" && <UploadArquivosOnly />}
      <Outlet />
      <Rodape />
    </div>
  );
}