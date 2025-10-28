import { Link, useNavigate } from "react-router-dom";
import { useLogado } from "../../hooks/useLogado";
import { FaUserCircle } from "react-icons/fa";
import { useEffect, useState, useRef } from "react";
import logo from "../../assets/img/news_icon.png";

export default function Cabecalho() {
  const navigate = useNavigate();
  const { userIsLogged, userEmail, clearLogin } = useLogado();
  const [menuOpen, setMenuOpen] = useState<boolean>(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Links do cabeçalho com hover verde
  const linkClasses =
    "text-white font-medium text-sm transition duration-150 hover:text-green-500 focus-visible:text-green-500";

  function handleLogout() {
    clearLogin("userLogado");
    setMenuOpen(false);
    navigate("/login");
    window.location.reload();
  }

  return (
    <nav className="w-full bg-gray-800 gap-3 py-4 px-6 shadow-md grid grid-cols-3 max-sm:grid-cols-2 items-center justify-between">
      <div className="flex items-center gap-3">
        <h1 className="text-2xl font-bold tracking-wide text-white">
          News<span className="text-green-600">Lab</span>
        </h1>
      </div>

      <div className="flex justify-center sm:grow space-x-6 max-sm:col-span-full">
        <Link to="/" className={linkClasses}>Home</Link>
        <Link to="/sobre" className={linkClasses}>Sobre</Link>
        <Link to="/contato" className={linkClasses}>Contato</Link>
      </div>

      <div
        className="relative justify-self-end max-sm:col-start-2 max-sm:row-start-1"
        ref={menuRef}
      >
        {userIsLogged ? (
          // Usando group para propagar hover ao ícone e email
          <div
            className="group flex items-center gap-x-2 cursor-pointer select-none"
            onClick={() => setMenuOpen(!menuOpen)}
            title="Abrir menu do perfil"
          >
            <FaUserCircle className="text-white text-3xl transition group-hover:text-green-500" />
            <p className="text-white transition group-hover:text-green-500">
              {userEmail}
            </p>
          </div>
        ) : (
          <Link
            to="/login"
            className="text-white font-semibold text-lg transition duration-150 hover:text-green-500 focus-visible:text-green-500"
          >
            Entrar
          </Link>
        )}

        {menuOpen && userIsLogged && (
          <div className="absolute right-0 mt-2 w-44 bg-white rounded-md shadow-lg py-2 z-20">
            <Link
              to="/perfil"
              className="block px-4 py-2 text-gray-800 transition hover:text-green-600 hover:bg-green-50"
              onClick={() => setMenuOpen(false)}
            >
              Perfil
            </Link>

            <Link
              to="/salvos"
              className="block px-4 py-2 text-gray-800 transition hover:text-green-600 hover:bg-green-50"
              onClick={() => setMenuOpen(false)}
            >
              Salvos
            </Link>

            <button
              type="button"
              className="block w-full px-4 py-2 text-left text-gray-800 transition hover:text-green-600 hover:bg-green-50"
              onClick={handleLogout}
            >
              Sair
            </button>
          </div>
        )}
      </div>
    </nav>
  );
}
