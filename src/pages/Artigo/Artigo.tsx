import { useParams, useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useNoticia } from "../../hooks/useNoticia";
import type { UsuarioType } from "../../types/usuario";
import { useLogado } from "../../hooks/useLogado";
import Modal from "../../components/Modal/Modal";

const API_URL = "http://localhost:3001";

function Artigo() {
  const news = useNoticia();
  const { userEmail } = useLogado();
  const [searchParams] = useSearchParams();
  const { id } = useParams();
  const paramId = id || searchParams.get("artigo");

  const [showSavedModal, setShowSavedModal] = useState(false);
  const [savedMessage, setSavedMessage] = useState<string>("");
  const [isSaved, setIsSaved] = useState(false);

  const filteredNews = news[Number(paramId) - 1] || null;

  const getCurrentUser = async () => {
    const response = await fetch(`${API_URL}/usuarios`);
    if (!response.ok) return;
    const data: UsuarioType[] = await response.json();
    const currentUser = data.find((user) => user.email === userEmail);
    return currentUser;
  };

  const isArticleSaved = async (user?: UsuarioType | undefined | null) => {
    const currentUser = user ?? (await getCurrentUser());
    if (!currentUser || !filteredNews) return false;
    return Boolean(
      currentUser.artigosSalvos?.find(
        (artigo) =>
          artigo.nomeArtigo === filteredNews.title ||
          artigo.url === filteredNews.url
      )
    );
  };

  const handleSaveNews = async () => {
    if (!filteredNews) return;
    const currentUser = await getCurrentUser();

    if (!currentUser) {
      setSavedMessage("Não foi possível identificar o usuário.");
      setShowSavedModal(true);
      return;
    }

    if (await isArticleSaved(currentUser)) {
      setSavedMessage("Esta notícia já foi salva.");
      setShowSavedModal(true);
      setIsSaved(true);
      return;
    }

    if (currentUser && "artigosSalvos" in currentUser) {
      currentUser.artigosSalvos?.push({
        url: filteredNews.url,
        nomeArtigo: filteredNews.title,
      });
    } else if (currentUser) {
      currentUser.artigosSalvos = [
        {
          url: filteredNews.url,
          nomeArtigo: filteredNews.title,
        },
      ];
    }

    const responsePut = await fetch(`${API_URL}/usuarios/${currentUser?.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(currentUser),
    });

    if (responsePut.ok) {
      setSavedMessage("Notícia salva com sucesso.");
      setIsSaved(true);
    } else {
      setSavedMessage("Falha ao salvar a notícia.");
    }
    setShowSavedModal(true);
    return responsePut;
  };

  useEffect(() => {
    let mounted = true;
    (async () => {
      const user = await getCurrentUser();
      const saved = await isArticleSaved(user);
      if (mounted) setIsSaved(saved);
    })();
    return () => {
      mounted = false;
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userEmail, paramId, news.length]);

  return (
    <div className="min-h-screen flex flex-col dark:bg-gray-700">
      <article className="flex-1 w-full max-w-4xl mx-auto py-6 sm:py-8 px-4 sm:px-6 lg:px-8 text-gray-800">
        {filteredNews ? (
          <div className="w-full">
            {filteredNews.urlToImage && (
              <div className="w-full mb-6">
                <img
                  src={filteredNews.urlToImage}
                  alt={filteredNews.title}
                  className="w-full h-48 sm:h-60 md:h-72 lg:h-80 object-cover rounded-lg shadow-md"
                />
              </div>
            )}

            <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 mb-4 leading-tight wrap-break-word">
              {filteredNews.title}
            </h1>

            <div className="mb-6">
              <p className="text-gray-600 mb-2 text-sm sm:text-base dark:text-gray-200">
                <span className="font-medium">
                  {filteredNews.author || "Autor não informado"}
                </span>
              </p>
              <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3 text-xs sm:text-sm text-gray-500 dark:text-gray-400">
                <span>
                  <strong>Data de publicação:</strong>{" "}
                  {new Date(filteredNews.publishedAt).toLocaleDateString(
                    "pt-BR"
                  )}
                </span>
                <span className="hidden sm:inline">•</span>
                <span>
                  <strong>Fonte:</strong>{" "}
                  {filteredNews.source?.name || "Fonte não informada"}
                </span>
              </div>
            </div>

            <div className="mb-6">
              <button
                onClick={handleSaveNews}
                disabled={isSaved}
                className={`w-full sm:w-auto text-white font-semibold px-6 py-3 rounded-full shadow text-sm sm:text-base text-center
                transition-colors duration-300 ease-in-out
                ${
                  isSaved
                    ? 'bg-green-600 cursor-not-allowed'
                    : 'bg-[#0a1a2f] hover:bg-[#081524] cursor-pointer'
                }
              `}
              >
                {isSaved ? 'Notícia Salva' : 'Salvar Notícia'}
              </button>
            </div>

            <hr className="border-gray-300 my-6" />

            <div className="mb-8">
              <p className="text-sm sm:text-base lg:text-lg leading-relaxed text-justify wrap-break-word dark:text-gray-100">
                {filteredNews?.content
                  ? filteredNews.content.replace(/\[\+\d{1,3} chars\]/g, "")
                  : "Conteúdo não disponível."}
              </p>
            </div>

            <div className="flex justify-center sm:justify-start">
              <a
                href={filteredNews.url}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto bg-blue-600 text-white font-semibold px-6 py-3 rounded-md shadow hover:bg-blue-700 transition text-center text-sm sm:text-base"
              >
                Leia o artigo completo
              </a>
            </div>
          </div>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center min-h-[60vh]">
            <h1 className="text-xl sm:text-2xl text-red-600 font-semibold mb-4 text-center">
              Artigo não encontrado 😕
            </h1>
            <p className="text-gray-600 text-center">
              O artigo que você está procurando não foi encontrado.
            </p>
          </div>
        )}
      </article>
      <Modal
        mostrar={showSavedModal}
        titulo="Tudo certo"
        mensagem={savedMessage}
        onClose={() => setShowSavedModal(false)}
      />
    </div>
  );
}

export { Artigo };

