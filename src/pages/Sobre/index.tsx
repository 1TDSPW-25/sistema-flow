import { FaBookAtlas, FaEye } from "react-icons/fa6";
import { GiTakeMyMoney } from "react-icons/gi";
import { BsTelephoneInboundFill } from "react-icons/bs";
export default function Sobre() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-700 py-16 px-6 md:px-20">
      <div className="max-w-5xl mx-auto bg-white dark:bg-gray-800 text-gray-900 dark:text-white rounded-2xl shadow-sm p-10">
        <h1 className="text-3xl font-bold mb-8 leading-tight border-b pb-4">
          Sobre Nós
        </h1>

        <section className="mb-10">
          <h2 className="text-2xl font-semibold mb-3 ">Quem Somos</h2>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
            Somos um portal de notícias digital independente. Buscamos informar
            com precisão, investigar com rigor e oferecer contexto para o leitor
            formar sua própria opinião.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-semibold mb-3 flex items-center gap-x-2">
            <FaBookAtlas />
            Missão
          </h2>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
            Informar com responsabilidade, transparência e compromisso com o
            interesse público.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-semibold mb-3 flex items-center gap-x-2">
            <FaEye />
            Visão
          </h2>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
            Ser referência em jornalismo digital, combinando reportagem, dados e
            participação da audiência.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-semibold mb-3 flex items-center gap-x-2">
            <GiTakeMyMoney />
            Valores
          </h2>
          <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-1 leading-relaxed">
            <li>Independência editorial</li>
            <li>Transparência</li>
            <li>Proteção de fontes</li>
            <li>Diversidade e inclusão</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-3 flex items-center gap-x-2">
            <BsTelephoneInboundFill />
            Contato
          </h2>
          <div className="text-gray-700 leading-relaxed space-y-2 dark:text-gray-50">
            <p>
              <span className="font-medium ">Editorial:</span>{" "}
              <a
                href="mailto:redacao@exemplo.com"
                className="text-blue-600 hover:underline"
              >
                redacao@exemplo.com
              </a>
            </p>
            <p>
              <span className="font-medium">Comercial:</span>{" "}
              <a
                href="mailto:anuncios@exemplo.com"
                className="text-blue-600 hover:underline"
              >
                anuncios@exemplo.com
              </a>
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}
