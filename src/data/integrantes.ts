import fotoAnna from "../assets/img/anna.jpeg";
import fotoDuarte from "../assets/img/duarte.jpeg";
import fotoRichard from "../assets/img/richard.jpg";
import fotoCarlos from "../assets/img/carlos.jpg";
import fotoLaura from "../assets/img/laura.jpg";
import fotoPedro from "../assets/img/pedro.jpg";
import fotoLeonardo from "../assets/img/leonardo.jpg";
import fotoFernando from "../assets/img/fernando.jpg";
import fotoCamilo from "../assets/img/camilo.jpg";
import fotoGustavo from "../assets/img/gustavo.jpg";
import fotoIago from "../assets/img/iago.jpg";
import fotoGuilherme from "../assets/img/guilherme.jpg";
import fotoJoao from "../assets/img/joao.jpg";
import fotoLucas from "../assets/img/lucas.jpg";
import fotoPedroCrus from "../assets/img/pedro-crus.jpg";
import fotoTiago from "../assets/img/tiago.jpg";
import fotoMaicon from "../assets/img/maicon.jpg";


export type Integrante = {
  nome: string;
  turma: string;
  linkedin: string;
  github: string;
  foto: string;
};

const TURMA_PADRAO = "1TDSPW";

export const integrantes: Integrante[] = [
  {
    nome: "Anna Clara Russo Luca",
    turma: "TechLead",
    linkedin: "https://linkedin.com/in/annaclararussoluca/",
    github: "https://github.com/annaclrl",
    foto: fotoAnna,
  },
  {
    nome: "Gabriel Duarte Maciel",
    turma: "Homolog",
    linkedin: "https://linkedin.com/in/gabriel-duarte1010",
    github: "https://github.com/duartegdm",
    foto: fotoDuarte,
  },
  {
    nome: "Richard Freitas",
    turma: TURMA_PADRAO,
    linkedin: "https://www.linkedin.com/in/richard-freitas",
    github: "https://github.com/vlonerickk",
    foto: fotoRichard,
  },
  {
    nome: "Carlos André Silva",
    turma: TURMA_PADRAO,
    linkedin:
      "https://www.linkedin.com/in/ukarlito?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app",
    github: "https://github.com/uKarlito",
    foto: "",
  },
  {
    nome: "Laura Lopes",
    turma: TURMA_PADRAO,
    linkedin:
      "https://www.linkedin.com/in/laura-lopes-a5937a353?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
    github: "https://github.com/Laura853",
    foto: "",
  },
  {
    nome: "Pedro Henrique de Oliveira",
    turma: TURMA_PADRAO,
    linkedin:
      "https://www.linkedin.com/in/pedro-henrique-oliveira-484336261/",
    github: "https://github.com/pedrinzz10",
    foto: "",
  },
  {
    nome: "Leonardo José Pereira",
    turma: TURMA_PADRAO,
    linkedin: "https://www.linkedin.com/in/leonardo-pereira-adm/",
    github: "https://github.com/leojp04",
    foto: "",
  },
  {
    nome: "Fernando Charlles Faustino Fernandes",
    turma: TURMA_PADRAO,
    linkedin:
      "https://www.linkedin.com/in/charlles-fernandes-540713359?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
    github: "https://github.com/Sigmachr",
    foto: "",
  },
  {
    nome: "Camilo Micheletto",
    turma: TURMA_PADRAO,
    linkedin: "https://linkedin.com/in/camilo-micheletto",
    github: "https://github.com/allyhere",
    foto: "",
  },
  {
    nome: "Gustavo Tavares",
    turma: TURMA_PADRAO,
    linkedin: "https://www.linkedin.com/in/gustavo-tavares-da-silva-b6180a220/",
    github: "https://github.com/gustavaress",
    foto: "",
  },
  {
    nome: "Iago D. Ainette",
    turma: TURMA_PADRAO,
    linkedin:"https://www.linkedin.com/in/iago-ainette-ba8294363?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
    github: "https://github.com/IagoDAinette",
    foto: "",
  },
  {
    nome: "Gustavo Casimiro",
    turma: TURMA_PADRAO,
    linkedin: "https://www.linkedin.com/in/gustavo-casimiro/",
    github: "https://github.com/Gustavo-Casimiro",
    foto: "",
  },
  {
    nome: "Guilherme Lisboa Silva",
    turma: TURMA_PADRAO,
    linkedin:
      "https://www.linkedin.com/in/guilhermelisboasilva?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app",
    github: "https://github.com/guilisbooa",
    foto: "",
  },
  {
    nome: "João Victor Gomes",
    turma: TURMA_PADRAO,
    linkedin:
      "https://www.linkedin.com/in/jo%C3%A3o-victor-gomes-de-souza-419432324/",
    github: "https://github.com/Jounaxis",
    foto: "",
  },
  {
    nome: "Lucas Barranha Giannini",
    turma: TURMA_PADRAO,
    linkedin: "https://www.linkedin.com/in/lucas-giannini-67832b2b4?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
    github: "https://github.com/Lucas06-ux",
    foto: "",
  },
  {
    nome: "Pedro Crus Lemos",
    turma: TURMA_PADRAO,
    linkedin: "https://www.linkedin.com/in/pedro-crus-0707b7360/",
    github: "https://github.com/PedroCLH2",
    foto: "",
  },
  {
    nome: "Tiago Guedes",
    turma: TURMA_PADRAO,
    linkedin: "https://www.linkedin.com/in/tiago-guedes-7225a5276",
    github: "https://github.com/Tiagozguedes",
    foto: "",
  },
  {
    nome: "Maicon Douglas Timoteo",
    turma: TURMA_PADRAO,
    linkedin: "https://www.linkedin.com/in/maicon-douglas-b244571b5",
    github: "https://github.com/MaiconDouglas-dev",
    foto: "",
  },
];
