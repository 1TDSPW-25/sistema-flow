import { FaGithub, FaLinkedin } from "react-icons/fa";
import { integrantes } from "../../data/integrantes";

export default function Integrantes() {

  return (
    <main className="min-h-screen bg-gray-50 py-10">
      <section className="max-w-5xl mx-auto px-4">
        <h1 className="text-3xl font-bold mb-6">Integrantes</h1>
        <p className="text-gray-700 mb-8">
          Conheca a equipe responsavel por este projeto.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {integrantes.map((membro, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow p-5 flex flex-col items-start"
            >
              <div className="relative w-16 h-16 rounded-full bg-gray-200 mb-4 overflow-hidden flex items-center justify-center text-sm font-semibold text-gray-600 select-none">
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
                <span>
                  {membro.nome
                    .split(" ")
                    .filter(Boolean)
                    .slice(0, 2)
                    .map((parte) => parte[0])
                    .join("")}
                </span>
              </div>
              <h3 className="text-lg font-semibold">{membro.nome}</h3>
              <span className="text-sm text-gray-600 mb-3">{membro.turma}</span>
              <div className="flex items-center gap-3 mt-auto">
                {membro.linkedin && membro.linkedin !== "#" && (
                  <a
                    href={membro.linkedin}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="text-blue-600 hover:text-blue-700"
                    aria-label={`LinkedIn de ${membro.nome}`}
                  >
                    <FaLinkedin size={20} />
                  </a>
                )}
                {membro.github && membro.github !== "#" && (
                  <a
                    href={membro.github}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="text-gray-800 hover:text-black"
                    aria-label={`GitHub de ${membro.nome}`}
                  >
                    <FaGithub size={20} />
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
