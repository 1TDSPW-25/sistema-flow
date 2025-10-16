import { Link } from "react-router-dom";

export default function Menu(){

  const linkClasses = "text-white font-medium text-sm hover:text-gray-400 transition duration-150";

  return(
    <nav 
      className="
        w-full 
        bg-gray-800         
        py-3                 
        px-8                 
        shadow-md            
        flex 
        items-center         
      "
    >
      
      
      <h2 className="text-green-400 font-extrabold text-xl tracking-wider">
        NOTÍCIAS
      </h2>
      
      
      <div className="flex-grow flex justify-center space-x-6">
        <Link to="/" className={linkClasses}>Home</Link>
        <Link to="/sobre" className={linkClasses}>Sobre</Link>
        <Link to="/contato" className={linkClasses}>Contato</Link>
      </div>

      
      <div>
        <Link to="/cadastro" className="text-white font-semibold text-lg hover:text-gray-400 transition duration-150">
          Cadastre-se/Login
        </Link> 
       
      </div>
    </nav>
  );
}