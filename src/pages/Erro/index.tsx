import { useNavigate } from "react-router-dom";

export default function Erro() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-white text-center px-6 py-10 sm:px-8 md:px-10">
      <h1 className="text-6xl xs:text-7xl sm:text-8xl md:text-9xl font-extrabold text-green-500 tracking-widest wrap-break-word">
        404
      </h1>
      <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold mt-5 sm:mt-6">Página não encontrada</h2>
      <p className="text-gray-400 mt-3 sm:mt-4 text-sm sm:text-base max-w-sm sm:max-w-md md:max-w-lg">
        A página que você está tentando acessar não existe ou foi movida.
      </p>

      <button
        onClick={() => navigate(-1)}
        className="w-full xs:w-auto bg-green-600 text-white font-semibold rounded-lg px-6 py-3 xs:px-8 xs:py-3 text-base xs:text-lg hover:bg-green-700 hover:scale-105 active:scale-95 transition-all duration-200 cursor-pointer shadow-lg hover:shadow-xl"
      >
        Voltar
      </button>
    </div>
  );
}