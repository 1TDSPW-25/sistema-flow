import { Link } from "react-router-dom";
import { useLogado } from "../../hooks/useLogado";

export default function Menu() {
  const { userIsLogged, userEmail } = useLogado();

  
  const linkClasses =
    "text-white font-medium text-sm hover:text-gray-400 transition duration-150";

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
      <h2 className="text-green-400 font-extrabold text-xl tracking-widest">
        NOTÍCIAS
      </h2>

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

      <div>
        {userIsLogged ? (
          <p className="text-white">{userEmail}</p>
        ) : (
          <Link
            to="/login"
            className="text-white font-semibold text-lg hover:text-gray-400 transition duration-150"
          >
            Entrar
          </Link>
        )}
      </div>
    </nav>
  );
}
