import { Link } from "react-router-dom";

export default function Erro() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-white text-center px-6">
      <h1 className="text-9xl font-extrabold text-green-500 tracking-widest">
        404
      </h1>
      <h2 className="text-3xl font-semibold mt-4">Página não encontrada</h2>
      <p className="text-gray-400 mt-2">
        A página que você está tentando acessar não existe ou foi movida.
      </p>

      <Link
        to="/"
        className="mt-8 px-6 py-3 bg-green-500 hover:bg-green-600 text-black font-semibold rounded-lg transition duration-200"
      >
        Voltar para a Home
      </Link>
    </div>
  );
}
