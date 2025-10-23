export default function Sobre() {
  return (
    <div className="min-h-screen bg-gray-50 py-16 px-6 md:px-20">
      {/* Container principal */}
      <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-sm p-10">
        {/* Título */}
        <h1 className="text-3xl font-bold text-gray-900 mb-8 leading-tight border-b pb-4">
          Sobre Nós
        </h1>

        {/* Seção: Sobre */}
        <section className="mb-10">
          <h2 className="text-2xl font-semibold text-gray-900 mb-3">Quem Somos</h2>
          <p className="text-gray-700 leading-relaxed">
            Somos um portal de notícias digital independente. Buscamos informar com precisão,
            investigar com rigor e oferecer contexto para o leitor formar sua própria opinião.
          </p>
        </section>

        {/* Seção: Missão */}
        <section className="mb-10">
          <h2 className="text-2xl font-semibold text-gray-900 mb-3">Missão</h2>
          <p className="text-gray-700 leading-relaxed">
            Informar com responsabilidade, transparência e compromisso com o interesse público.
          </p>
        </section>

         {/* Seção: Visão */}
        <section className="mb-10">
          <h2 className="text-2xl font-semibold text-gray-900 mb-3">Visão</h2>
          <p className="text-gray-700 leading-relaxed">
            Ser referência em jornalismo digital, combinando reportagem, dados e participação da audiência.
          </p>
        </section>

          {/* Seção: Valores */}
        <section className="mb-10">
          <h2 className="text-2xl font-semibold text-gray-900 mb-3">Valores</h2>
          <ul className="list-disc list-inside text-gray-700 space-y-1 leading-relaxed">
            <li>Independência editorial</li>
            <li>Transparência</li>
            <li>Proteção de fontes</li>
            <li>Diversidade e inclusão</li>
          </ul>
        </section>

         {/* Seção: Contato */}
        <section>
          <h2 className="text-2xl font-semibold text-gray-900 mb-3">Contato</h2>
          <div className="text-gray-700 leading-relaxed space-y-2">
            <p>
              <span className="font-medium text-gray-900">Editorial:</span>{" "}
              <a
                href="mailto:redacao@exemplo.com"
                className="text-blue-600 hover:underline"
              >
                redacao@exemplo.com
              </a>
            </p>
            <p>
              <span className="font-medium text-gray-900">Comercial:</span>{" "}
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