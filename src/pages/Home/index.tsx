import { useState } from "react";
import { Card } from "../../components/Card/Card";
import Modal from "../../components/Modal/Modal";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useNoticia } from "../../hooks/useNoticia";
import { useLogado } from "../../hooks/useLogado";

export default function Home() {
  const news = useNoticia();
  const [showModal, setShowModal] = useState(false);
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

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-700 flex flex-col items-center px-4 sm:px-6 lg:px-8 pb-20">
      <header className="w-full text-center pt-10 pb-6">
        <p className="text-base sm:text-lg md:text-xl font-semibold text-gray-700 dark:text-gray-50 tracking-widest">
          O QUE ESTÁ ACONTECENDO NO MUNDO?
        </p>
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
        {news
          .filter((post) => post.title && post.description && post.urlToImage)
          .map((post, index) => (
            <Card
              key={index}
              {...post}
              onVerMais={() => handleProtectedAction(index + 1)}
            />
          ))}
      </section>

      <Modal
        mostrar={showModal}
        titulo="Atenção"
        mensagem="Você precisa estar logado para ver essa notícia."
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
