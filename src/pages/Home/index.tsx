import { useState } from "react";
import { Card } from "../../components/Card/Card";
import Modal from "../../components/Modal/Modal";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useNoticia } from "../../hooks/useNoticia";
import { useLogado } from "../../hooks/useLogado";

export default function Home() {
  const news = useNoticia();
  const [showModal, setShowModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const { userIsLogged } = useLogado();

  const handleProtectedAction = (id: number) => {
    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.set("article", String(id));
    setSearchParams(newSearchParams);

    if (!userIsLogged) {
      setShowModal(true);
    } else {
      navigate(`/artigo/${id}`);
    }
  };

  const normalizedSearch = searchTerm.trim().toLowerCase();
  const filteredNews = news
    .map((post, index) => ({ post, index }))
    .filter(
      ({ post }) => post.title && post.description && post.urlToImage
    )
    .filter(({ post }) => {
      if (!normalizedSearch) return true;

      const searchableFields = [
        post.title,
        post.description,
        post.content,
        post.source?.name,
      ].filter(Boolean) as Array<string>;

      return searchableFields.some((field) =>
        field.toLowerCase().includes(normalizedSearch)
      );
    });


    const limitedNews = filteredNews.slice(0, 8);


  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-700 flex flex-col items-center px-4 sm:px-6 lg:px-8 pb-20">
      <header className="w-full flex flex-col items-center gap-4 pt-10 pb-6">
        <p className="text-base sm:text-lg md:text-xl font-semibold text-gray-700 dark:text-gray-50 tracking-widest text-center">
          O QUE ESTA ACONTECENDO NO MUNDO?
        </p>
        <label className="w-full max-w-lg">
          <span className="sr-only">Buscar noticias por palavra-chave</span>
          <input
            type="search"
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
            placeholder="Busque por palavra-chave (titulo, fonte, descricao...)"
            className="w-full rounded-full border border-gray-300 bg-white px-5 py-3 text-sm sm:text-base text-gray-700 shadow focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/40 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-100"
          />
        </label>
      </header>

      <section
        className="
          w-full
          grid
          grid-cols-1
          sm:grid-cols-2
          lg:grid-cols-3
          xl:grid-cols-4
          gap-6
          justify-items-center
          max-w-7xl
        "
      >
        {limitedNews.map(({ post, index }) => (
          <Card
            key={post.url ?? index}
            {...post}
            onVerMais={() => handleProtectedAction(index + 1)}
          />
        ))}
      </section>

      {!filteredNews.length && (
        <p className="mt-8 text-center text-sm sm:text-base text-gray-600 dark:text-gray-300">
          Nao encontramos resultados para "{searchTerm}". Tente outras palavras-chave.
        </p>
      )}

      <Modal
        mostrar={showModal}
        titulo="Atencao"
        mensagem="Voce precisa estar logado para ver essa noticia."
        onClose={() => setShowModal(false)}
        acaoOpcional={{
          texto: "Ir para Login",
          onClick: () =>
            navigate(`/login?article=${searchParams.get("article")}`),
        }}
      />
    </main>
  );
}
