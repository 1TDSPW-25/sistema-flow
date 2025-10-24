import { Link } from "react-router-dom";

export default function Erro() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-white text-center px-6 py-10 sm:px-8 md:px-10">
      <h1 className="text-6xl xs:text-7xl sm:text-8xl md:text-9xl font-extrabold text-green-500 tracking-widest wrap-break-word">
        404
      </h1>
      <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold mt-5 sm:mt-6">Página não encontrada</h2>
      <p className="text-gray-400 mt-3 sm:mt-4 text-sm sm:text-base max-w-sm sm:max-w-md md:max-w-lg">
        A página que você está tentando acessar não existe ou foi movida.
      </p>

      <Link
        to="/"
        className="mt-8 sm:mt-10 px-5 sm:px-7 py-3 sm:py-3.5 bg-green-500 hover:bg-green-600 text-black font-semibold rounded-lg transition duration-200 text-sm sm:text-base md:tex-lg w-full max-w-[250px] sm:max-w-[280px]"
      >
        Voltar para a Home
      </Link>
    </div>
  );
}
