import { useEffect, useState } from "react";
import type { Article } from "../../types/home";
import { Card } from "../../components/Card/Card";
import Modal from "../../components/Modal/Modal";
import { useNavigate, useSearchParams } from "react-router-dom";

export default function Home() {
  const [news, setNews] = useState<Array<Article>>([]);
  const [showModal, setShowModal] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    const url = `https://newsapi.org/v2/top-headlines?country=us&apiKey=0596354ecea24b1c93f25943b4f8dd9e`;

    const req = async () => {
      const getNews = await fetch(url);
      const newsResponse = await getNews.json();
      setNews(newsResponse.articles);
    };
    req();
  }, []);

  const handleProtectedAction = (id: number) => {
    const usuarioLogado = localStorage.getItem("userToken") || null;

    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.set("article", String(id));
    setSearchParams(newSearchParams);

    if (!usuarioLogado) {
      setShowModal(true);
    } else {
      navigate(`/artigo/${id}`);
    }
  };

  return (
    <main className="min-h-screen pb-16 bg-gray-50 max-w-7xl mx-auto">
      <div className="w-full pt-8 pb-6 mb-8">
        <p
          className="
            text-center 
            text-lg
            font-normal /* Tornando um pouco mais visível */
            text-gray-700 /* Escurecendo para ser lido sem a faixa de fundo */
            tracking-widest
          "
        >
          O QUE ESTÁ ACONTECENDO NO MUNDO?
        </p>
      </div>
      <section className="card-gallery px-4 py-2 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {news.map((post, index) => (
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
