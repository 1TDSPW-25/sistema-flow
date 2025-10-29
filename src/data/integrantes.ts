import fotoAnna from "../assets/img/anna.jpeg";
import fotoDuarte from "../assets/img/duarte.jpeg";
import fotoRichard from "../assets/img/richard.jpg";
import fotoCarlos from "../assets/img/carlos.jpeg";
import fotoLaura from "../assets/img/laura.jpeg";
import fotoPedro from "../assets/img/pedroH.jpeg";
import fotoLeonardo from "../assets/img/leonardo.jpeg";
import fotoCamilo from "../assets/img/camilo.png";
import fotoGustavoT from "../assets/img/gustavoT.png";
import fotoIago from "../assets/img/iago.png";
import fotoGuilherme from "../assets/img/guilherme.jpeg";
import fotoJoao from "../assets/img/joao.jpeg";
import fotoLucas from "../assets/img/lucas.jpeg";
import fotoPedroCrus from "../assets/img/pedroC.jpeg";
import fotoTiago from "../assets/img/tiago.jpeg";
import fotoMaicon from "../assets/img/maicon.jpeg";
import fotoGustavoC from "../assets/img/gustavoC.jpeg";
import fotoMiguel from "../assets/img/miguel.jpg"
import fotoIcaro from "../assets/img/icaro.jpg"
import gabrielF from "../assets/img/gabrielF.jpg"
import fotoEvellyn from "../assets/img/evellyn.jpg"
import fotoGregory from "../assets/img/gregory.jpg"


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
    foto: fotoCarlos,
  },
  {
    nome: "Laura Lopes",
    turma: TURMA_PADRAO,
    linkedin:
      "https://www.linkedin.com/in/laura-lopes-a5937a353?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
    github: "https://github.com/Laura853",
    foto: fotoLaura,
  },
  {
    nome: "Pedro Henrique de Oliveira",
    turma: TURMA_PADRAO,
    linkedin:
      "https://www.linkedin.com/in/pedro-henrique-oliveira-484336261/",
    github: "https://github.com/pedrinzz10",
    foto: fotoPedro,
  },
  {
    nome: "Leonardo José Pereira",
    turma: TURMA_PADRAO,
    linkedin: "https://www.linkedin.com/in/leonardo-pereira-adm/",
    github: "https://github.com/leojp04",
    foto: fotoLeonardo,
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
    foto: fotoCamilo,
  },
  {
    nome: "Gustavo Tavares",
    turma: TURMA_PADRAO,
    linkedin: "https://www.linkedin.com/in/gustavo-tavares-da-silva-b6180a220/",
    github: "https://github.com/gustavaress",
    foto: fotoGustavoT,
  },
  {
    nome: "Iago D. Ainette",
    turma: TURMA_PADRAO,
    linkedin:"https://www.linkedin.com/in/iago-ainette-ba8294363?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
    github: "https://github.com/IagoDAinette",
    foto: fotoIago,
  },
  {
    nome: "Gustavo Casimiro",
    turma: TURMA_PADRAO,
    linkedin: "https://www.linkedin.com/in/gustavo-casimiro/",
    github: "https://github.com/Gustavo-Casimiro",
    foto: fotoGustavoC,
  },
  {
    nome: "Guilherme Lisboa Silva",
    turma: TURMA_PADRAO,
    linkedin:
      "https://www.linkedin.com/in/guilhermelisboasilva?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app",
    github: "https://github.com/guilisbooa",
    foto: fotoGuilherme,
  },
  {
    nome: "João Victor Gomes",
    turma: TURMA_PADRAO,
    linkedin:
      "https://www.linkedin.com/in/jo%C3%A3o-victor-gomes-de-souza-419432324/",
    github: "https://github.com/Jounaxis",
    foto: fotoJoao,
  },
  {
    nome: "Lucas Barranha Giannini",
    turma: TURMA_PADRAO,
    linkedin: "https://www.linkedin.com/in/lucas-giannini-67832b2b4?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
    github: "https://github.com/Lucas06-ux",
    foto: fotoLucas,
  },
  {
    nome: "Pedro Crus Lemos",
    turma: TURMA_PADRAO,
    linkedin: "https://www.linkedin.com/in/pedro-crus-0707b7360/",
    github: "https://github.com/PedroCLH2",
    foto: fotoPedroCrus,
  },
  {
    nome: "Tiago Guedes",
    turma: TURMA_PADRAO,
    linkedin: "https://www.linkedin.com/in/tiago-guedes-7225a5276",
    github: "https://github.com/Tiagozguedes",
    foto: fotoTiago,
  },
  {
    nome: "Maicon Douglas Timoteo",
    turma: TURMA_PADRAO,
    linkedin: "https://www.linkedin.com/in/maicon-douglas-b244571b5",
    github: "https://github.com/MaiconDouglas-dev",
    foto: fotoMaicon,
  },
  {
    nome: "Gabriel Fachin",
    turma: TURMA_PADRAO,
    linkedin: "https://www.linkedin.com/in/gabriel-fachin-de-oliveira-9a0616240",
    github: "https://github.com/GabrielFachin",
    foto: gabrielF
  },
  {
    nome: "Evellyn Barbosa Ferreira",
    turma: TURMA_PADRAO,
    linkedin: "https://www.linkedin.com/in/evellyn-barbosa-ferreira-8911122a5?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app",
    github: "https://github.com/EvellynbFerreira",
    foto: fotoEvellyn
  },
  {
    nome: "Miguel Henrique Oliveira",
    turma: TURMA_PADRAO,
    linkedin: "https://www.linkedin.com/in/miguel-oliveira-dias-59b605322",
    github: "https://github.com/Maigol123",
    foto: fotoMiguel,
  },
  {
    nome: "Icaro José",
    turma: TURMA_PADRAO,
    linkedin: "https://www.linkedin.com/in/icaro-jose-96b651324?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app",
    github: "https://github.com/Icaro-Jose09",
    foto: fotoIcaro
  },
  {
    nome: "Levi Gregory",
    turma: TURMA_PADRAO,
    linkedin: "https://www.linkedin.com/in/gregoryazevedo/",
    github: "https://github.com/aboutgregory",
    foto: fotoGregory
  }
];
