import { Link, useNavigate } from "react-router-dom";
import { useLogado } from "../../hooks/useLogado";
import { FaUserCircle } from "react-icons/fa";
import { useEffect, useState, useRef } from "react";
import '../Cabecalho/Cabecalho.css';
import logo from '../../assets/img/news_icon.png';


export default function Menu() {
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

  
  const linkClasses =
    "text-white font-medium text-sm hover:text-gray-400 transition duration-150";

  function handleLogout() {
    clearLogin("userToken");
    setMenuOpen(false);
    navigate("/login");
    window.location.reload();
  }

  return (
    <nav
      className="
        w-full 
        bg-gray-800 
        py-6 
        px-8 
        shadow-md 
        flex 
        items-center 
      "
    >
      <div className="logo-container">
        <img src={logo} alt="NewsLab logo" className="logo" />
        <h1 className="titulo">NewsLab</h1>
      </div>

      <div className="grow flex justify-center space-x-6">
        <Link to="/" className={linkClasses}>
          Home
        </Link>
        <Link to="/sobre" className={linkClasses}>
          Sobre
        </Link>
        <Link to="/contato" className={linkClasses}>
          Contato
        </Link>
      </div>

      <div className="relative" ref={menuRef}>
        {userIsLogged ? (
          <div className="flex items-center gap-x-2 cursor-pointer" onClick={() => setMenuOpen(!menuOpen)}>
            <FaUserCircle className="text-white text-3xl"/>
            <p className="text-white">{userEmail}</p>
          </div>
          
          
        ) : (
          <Link
            to="/login"
            className="text-white font-semibold text-lg hover:text-gray-400 transition duration-150"
          >
            Entrar
          </Link>
        )}

        {menuOpen && userIsLogged && (
          <div  className="absolute right-0 mt-2 w-40   bg-white rounded-md shadow-lg   py-2 z-20  ">
            <Link to="/perfil" className="block px-4 py-2 text-gray-800 hover:bg-gray-100" onClick={() => setMenuOpen(false)}> 
            Perfil
            </Link>

            <Link to="/salvos" className="block px-4 py-2 text-gray-800 hover:bg-gray-100" onClick={() => setMenuOpen(false)}>
            Salvos
            </Link>

            <button
              type="button"
              className="block w-full px-4 py-2 text-left text-gray-800 hover:bg-gray-100"
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
