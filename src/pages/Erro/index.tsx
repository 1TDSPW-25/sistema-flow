import { useNavigate } from "react-router-dom";

export default function Erro() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-white text-center px-6">
      <h1 className="text-9xl font-extrabold text-green-500 tracking-widest">
        404
      </h1>
      <h2 className="text-3xl font-semibold mt-4">Página não encontrada</h2>
      <p className="text-gray-400 mt-2">
        A página que você está tentando acessar não existe ou foi movida.
      </p>

      <button
        onClick={() => navigate(-1)}
        className="mt-4 text-sm font-semibold text-gray-800 bg-white border border-gray-800 rounded-md px-3 py-1 hover:bg-gray-800 hover:text-white transition-colors cursor-pointer"
      >
        Voltar
      </button>
    </div>
  );
}