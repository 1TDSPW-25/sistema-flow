import { FaBookAtlas, FaEye,  } from "react-icons/fa6";
import { GiTakeMyMoney } from "react-icons/gi";
import { BsTelephoneInboundFill } from "react-icons/bs";
export default function Sobre() {

  return (
    <section className="grail px-7 py-4 text-gray-900">
      <h1 className="text-xl font-bold ">Sobre</h1>
      <p>
        Somos um portal de notícias digital independente. Buscamos informar com
        precisão, investigar com rigor e oferecer contexto para o leitor formar
        sua própria opinião.
      </p>
      <h2 className="text-lg font-bold flex items-center gap-x-2"><FaBookAtlas/>Missão</h2>
      <p>
        Informar com responsabilidade, transparência e compromisso com o
        interesse público.
      </p>

      <h2 className="text-lg font-bold flex items-center gap-x-2"><FaEye/>Visão</h2>
      <p>
        Ser referência em jornalismo digital, combinando reportagem, dados e
        participação da audiência.
      </p>

      <h2 className="text-lg font-bold flex items-center gap-x-2"><GiTakeMyMoney/>Valores</h2>
      <ul>
        <li>Independência editorial</li>
        <li>Transparência</li>
        <li>Proteção de fontes</li>
        <li>Diversidade e inclusão</li>
      </ul>

      <h2 className="text-lg font-bold flex items-center gap-x-2"><BsTelephoneInboundFill/>Contato</h2>
      <ul>
        <li>
          Editorial:{" "}
          <a href="mailto:redacao@exemplo.com">redacao@exemplo.com</a>
        </li>
        <li>
          Comercial:{" "}
          <a href="mailto:anuncios@exemplo.com">anuncios@exemplo.com</a>
        </li>
      </ul>
    </section>
  );
}
