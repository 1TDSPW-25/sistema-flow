import { FaGithub, FaLinkedin } from "react-icons/fa";
import { integrantes } from "../../data/integrantes";

export default function Integrantes() {
  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-700 dark:text-white py-10">
      <section className="max-w-6xl mx-auto px-4 text-center">
        <h1 className="text-3xl md:text-4xl font-bold mb-4">Integrantes</h1>
        <p className="text-gray-700 mb-10 text-base md:text-lg">
          Conheça a equipe responsável por este projeto.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8">
          {integrantes.map((membro, index) => (
            <div
              key={index}
              className="bg-white dark:bg-gray-800 rounded-2xl shadow-md hover:shadow-lg transition-all duration-200 p-6 flex flex-col items-center text-center"
            >
              <div className="relative w-20 h-20 md:w-24 md:h-24 rounded-full bg-gray-200 mb-4 overflow-hidden flex items-center justify-center text-lg font-semibold text-gray-600 select-none">
                {membro.foto && (
                  <img
                    src={membro.foto}
                    alt={`Foto de ${membro.nome}`}
                    className="absolute inset-0 w-full h-full object-cover rounded-full"
                    onError={(event) => {
                      event.currentTarget.style.display = "none";
                    }}
                  />
                )}
                {!membro.foto && (
                  <span>
                    {membro.nome
                      .split(" ")
                      .filter(Boolean)
                      .slice(0, 2)
                      .map((parte) => parte[0])
                      .join("")}
                  </span>
                )}
              </div>
              <h3 className="text-base md:text-lg font-semibold">
                {membro.nome}
              </h3>
              <span className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                {membro.turma}
              </span>
              <div className="flex items-center justify-center gap-4 mt-auto">
                {membro.linkedin && (
                  <a
                    href={membro.linkedin}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="text-blue-600 hover:text-blue-700 transition-colors"
                    aria-label={`LinkedIn de ${membro.nome}`}
                  >
                    <FaLinkedin size={22} />
                  </a>
                )}
                {membro.github && (
                  <a
                    href={membro.github}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="text-gray-800 dark:text-gray-400 hover:text-black transition-colors"
                    aria-label={`GitHub de ${membro.nome}`}
                  >
                    <FaGithub size={22} />
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
