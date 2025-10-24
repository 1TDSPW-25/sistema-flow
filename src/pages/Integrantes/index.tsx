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
      nome: "Anna Clara Russo Luca",
      turma: "TechLead",
      linkedin: "https://linkedin.com/in/annaclararussoluca/",
      github: "https://github.com/annaclrl",
    },
    {
      nome: "Gabriel Duarte",
      turma: "Homolog",
      linkedin: "https://linkedin.com/in/gabriel-duarte1010",
      github: "https://github.com/duartegdm",
    },
    { nome: "Richard Freitas",
      turma: TURMA,
      linkedin: "https://www.linkedin.com/in/richard-freitas",
      github: "https://github.com/vlonerickk"
    },
    {
      nome: "Carlos André Silva",
      turma: TURMA,
      linkedin: "https://www.linkedin.com/in/ukarlito?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app",
      github: "https://github.com/uKarlito",
    },
    {
      nome: "Laura Lopes",
      turma: TURMA,
      linkedin: "https://www.linkedin.com/in/laura-lopes-a5937a353?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
      github: "https://github.com/Laura853",
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
    {
      nome: "Fernando Charlles Faustino Fernandes",
      turma: TURMA,
      linkedin: "https://www.linkedin.com/in/charlles-fernandes-540713359?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
      github: "https://github.com/Sigmachr",
    },
    {
      nome: "Camilo Micheletto",
      turma: TURMA,
      linkedin: "https://linkedin.com/in/camilo-micheletto",
      github: "https://github.com/allyhere",
    },
    {
      nome: "Gustavo Tavares",
      turma: TURMA,
      linkedin: "https://www.linkedin.com/in/gustavo-tavares-da-silva-b6180a220/",
      github: "https://github.com/gustavaress",
    },
    {
      nome: "Iago D. Ainette",
      turma: TURMA,
      linkedin: "https://www.linkedin.com/in/iago-ainette-ba8294363?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
      github: "https://github.com/IagoDAinette",
    },
    {
      nome: "Gustavo Casimiro",
      turma: TURMA,
      linkedin: "https://www.linkedin.com/in/gustavo-casimiro/",
      github: "https://github.com/Gustavo-Casimiro",
    },
    {
      nome: "Guilherme Lisboa Silva",
      turma: TURMA,
      linkedin: "https://www.linkedin.com/in/guilhermelisboasilva?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app",
      github: "https://github.com/guilisbooa",
    },
    {
      nome: "João Victor Gomes",
      turma: TURMA,
      linkedin: "https://www.linkedin.com/in/jo%C3%A3o-victor-gomes-de-souza-419432324/",
      github: "https://github.com/Jounaxis",
    },
    {
      nome: "Lucas Barranha Giannini",
      turma: TURMA,
      linkedin: "https://www.linkedin.com/in/lucas-giannini-67832b2b4?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
      github: "https://github.com/Lucas06-ux",
    },
    {
      nome: "Pedro Crus",
      turma: TURMA,
      linkedin: "https://www.linkedin.com/in/pedro-crus-0707b7360/",
      github: "https://github.com/PedroCLH2",
    },
    {
      nome: "Tiago Guedes",
      turma: TURMA,
      linkedin: "https://www.linkedin.com/in/tiago-guedes-7225a5276",
      github: "https://github.com/Tiagozguedes",
    },
    {
      nome: "Maicon Douglas",
      turma: TURMA,
      linkedin: "https://www.linkedin.com/in/maicon-douglas-b244571b5",
      github: "https://github.com/MaiconDouglas-dev",
    },
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
