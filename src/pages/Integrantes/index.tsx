import { FaGithub, FaLinkedin } from "react-icons/fa";

type Membro = {
  nome: string;
  turma: string;
  linkedin?: string;
  github?: string;
  foto?: string; // caminho dentro de /public ou URL
};

export default function Integrantes() {
  const TURMA = "1TDSPW";
  const membros: Membro[] = [
    {
      nome: "Laura Lopes Cruz",
      turma: TURMA,
      linkedin:
        "https://www.linkedin.com/in/laura-lopes-a5937a353?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
      github: "https://github.com/Laura853",
      foto: "/integrantes/laura.jpg",
    },
    {
      nome: "Pedro Henrique de Oliveira",
      turma: TURMA,
      linkedin: "https://www.linkedin.com/in/pedro-henrique-oliveira-484336261/",
      github: "https://github.com/pedrinzz10",
      foto: "/integrantes/pedro.jpg",
    },
    {
      nome: "Leonardo José Pereira",
      turma: TURMA,
      linkedin: "https://www.linkedin.com/in/leonardo-pereira-adm/",
      github: "https://github.com/leojp04",
      foto: "/integrantes/leonardo.jpg",
    },
    { nome: "Integrante 4", turma: TURMA },
    { nome: "Integrante 5", turma: TURMA, linkedin: "#", github: "#" },
    { nome: "Integrante 6", turma: TURMA, linkedin: "#", github: "#" },
    { nome: "Integrante 7", turma: TURMA, linkedin: "#", github: "#" },
    { nome: "Integrante 8", turma: TURMA, linkedin: "#", github: "#" },
    { nome: "Integrante 9", turma: TURMA, linkedin: "#", github: "#" },
    { nome: "Integrante 10", turma: TURMA, linkedin: "#", github: "#" },
    { nome: "Integrante 11", turma: TURMA, linkedin: "#", github: "#" },
    { nome: "Integrante 12", turma: TURMA, linkedin: "#", github: "#" },
    { nome: "Integrante 13", turma: TURMA, linkedin: "#", github: "#" },
    { nome: "Integrante 14", turma: TURMA, linkedin: "#", github: "#" },
    { nome: "Integrante 15", turma: TURMA, linkedin: "#", github: "#" },
    { nome: "Integrante 16", turma: TURMA, linkedin: "#", github: "#" },
    { nome: "Integrante 17", turma: TURMA, linkedin: "#", github: "#" },
    { nome: "Integrante 18", turma: TURMA, linkedin: "#", github: "#" },
    { nome: "Integrante 19", turma: TURMA, linkedin: "#", github: "#" },
    { nome: "Integrante 20", turma: TURMA, linkedin: "#", github: "#" },
  ];

  return (
    <main className="min-h-screen bg-gray-50 py-10">
      <section className="max-w-5xl mx-auto px-4">
        <h1 className="text-3xl font-bold mb-6">Integrantes</h1>
        <p className="text-gray-700 mb-8">
          Conheça a equipe responsável por este projeto.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {membros.map((m, i) => (
            <div
              key={i}
              className="bg-white rounded-lg shadow p-5 flex flex-col items-start"
            >
              <div className="relative w-16 h-16 rounded-full bg-gray-200 mb-4 overflow-hidden flex items-center justify-center text-sm font-semibold text-gray-600 select-none">
                {m.foto && (
                  <img
                    src={m.foto}
                    alt={`Foto de ${m.nome}`}
                    className="absolute inset-0 w-full h-full object-cover rounded-full"
                    onError={(e) => {
                      (e.currentTarget as HTMLImageElement).style.display = "none";
                    }}
                  />
                )}
                <span>
                  {m.nome
                    .split(" ")
                    .filter(Boolean)
                    .slice(0, 2)
                    .map((p) => p[0])
                    .join("")}
                </span>
              </div>
              <h3 className="text-lg font-semibold">{m.nome}</h3>
              <span className="text-sm text-gray-600 mb-3">{m.turma}</span>
              <div className="flex items-center gap-3 mt-auto">
                {m.linkedin && m.linkedin !== "#" && (
                  <a
                    href={m.linkedin}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="text-blue-600 hover:text-blue-700"
                    aria-label={`LinkedIn de ${m.nome}`}
                  >
                    <FaLinkedin size={20} />
                  </a>
                )}
                {m.github && m.github !== "#" && (
                  <a
                    href={m.github}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="text-gray-800 hover:text-black"
                    aria-label={`GitHub de ${m.nome}`}
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
