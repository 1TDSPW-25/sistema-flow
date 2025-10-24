import { Link } from "react-router-dom";

export default function Rodape() {
  return (
    <footer className="bg-gray-800 text-white text-center py-4 shadow-inner">
      <p className="text-sm">
        &copy; {new Date().getFullYear()} Todos os direitos reservados - Sistema Flow.
      </p>
        <div className="text-white font-medium text-sm hover:text-gray-400 transition duration-150 flex-wrap-reverse">
            <Link to="/integrantes">
          Nossa equipe
        </Link>
        </div>

    </footer>
  );
}
