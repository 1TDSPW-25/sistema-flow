import { FaGithub, FaLinkedin } from "react-icons/fa";
import { type Integrante } from "../../data/integrantes";
export default function Integrantes() 

{
  const TURMA = "1TDSPW";

  const integrantes: Integrante[] = [
    {
      nome: "Anna Clara Russo Luca",
      turma: "TechLead",
      linkedin: "https://linkedin.com/in/annaclararussoluca/",
      github: "https://github.com/annaclrl",
      foto: ""
    },
    {
      nome: "Gabriel Duarte",
      turma: "Homolog",
      linkedin: "https://linkedin.com/in/gabriel-duarte1010",
      github: "https://github.com/duartegdm",
      foto: ""
    },
    {
      nome: "Richard Freitas",
      turma: TURMA,
      linkedin: "https://www.linkedin.com/in/richard-freitas",
      github: "https://github.com/vlonerickk",
      foto: ""
    },
    {
      nome: "Carlos André Silva",
      turma: TURMA,
      linkedin: "https://www.linkedin.com/in/ukarlito?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app",
      github: "https://github.com/uKarlito",
      foto: ""
    },
    {
      nome: "Laura Lopes",
      turma: TURMA,
      linkedin: "https://www.linkedin.com/in/laura-lopes-a5937a353?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
      github: "https://github.com/Laura853",
      foto: ""
    },
    {
      nome: "Pedro Henrique de Oliveira",
      turma: TURMA,
      linkedin:
        "https://www.linkedin.com/in/pedro-henrique-oliveira-484336261/",
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
      foto: ""
    },
    {
      nome: "Camilo Micheletto",
      turma: TURMA,
      linkedin: "https://linkedin.com/in/camilo-micheletto",
      github: "https://github.com/allyhere",
      foto: ""
    },
    {
      nome: "Gustavo Tavares",
      turma: TURMA,
      linkedin: "https://www.linkedin.com/in/gustavo-tavares-da-silva-b6180a220/",
      github: "https://github.com/gustavaress",
      foto: ""
    },
    {
      nome: "Iago D. Ainette",
      turma: TURMA,
      linkedin: "https://www.linkedin.com/in/iago-ainette-ba8294363?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
      github: "https://github.com/IagoDAinette",
      foto: ""
    },
    {
      nome: "Gustavo Casimiro",
      turma: TURMA,
      linkedin: "https://www.linkedin.com/in/gustavo-casimiro/",
      github: "https://github.com/Gustavo-Casimiro",
      foto: ""
    },
    {
      nome: "Guilherme Lisboa Silva",
      turma: TURMA,
      linkedin: "https://www.linkedin.com/in/guilhermelisboasilva?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app",
      github: "https://github.com/guilisbooa",
      foto: ""
    },
    {
      nome: "João Victor Gomes",
      turma: TURMA,
      linkedin: "https://www.linkedin.com/in/jo%C3%A3o-victor-gomes-de-souza-419432324/",
      github: "https://github.com/Jounaxis",
      foto: ""
    },
    {
      nome: "Lucas Barranha Giannini",
      turma: TURMA,
      linkedin: "https://www.linkedin.com/in/lucas-giannini-67832b2b4?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
      github: "https://github.com/Lucas06-ux",
      foto: ""
    },
    {
      nome: "Pedro Crus",
      turma: TURMA,
      linkedin: "https://www.linkedin.com/in/pedro-crus-0707b7360/",
      github: "https://github.com/PedroCLH2",
      foto: ""
    },
    {
      nome: "Tiago Guedes",
      turma: TURMA,
      linkedin: "https://www.linkedin.com/in/tiago-guedes-7225a5276",
      github: "https://github.com/Tiagozguedes",
      foto: ""
    },
    {
      nome: "Maicon Douglas",
      turma: TURMA,
      linkedin: "https://www.linkedin.com/in/maicon-douglas-b244571b5",
      github: "https://github.com/MaiconDouglas-dev",
      foto: ""
    },
  ];
  return (
    <main className="min-h-screen bg-gray-50 py-10">
      <section className="max-w-6xl mx-auto px-4 text-center">
        <h1 className="text-3xl md:text-4xl font-bold mb-4">Integrantes</h1>
        <p className="text-gray-700 mb-10 text-base md:text-lg">
          Conheça a equipe responsável por este projeto.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8">
          {integrantes.map((membro, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl shadow-md hover:shadow-lg transition-all duration-200 p-6 flex flex-col items-center text-center"
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
              <span className="text-sm text-gray-600 mb-3">{membro.turma}</span>
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
                    className="text-gray-800 hover:text-black transition-colors"
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
