import { useParams, useSearchParams } from "react-router-dom";
import { useNoticia } from "../../hooks/useNoticia";
import { useUser } from "../../hooks/useUser";

function Artigo() {
  const news = useNoticia();
  const { currentUser, setCurrentUser } = useUser();
  const [searchParams] = useSearchParams();
  const { id } = useParams();
  const paramId = id || searchParams.get("artigo");

  const filteredNews = news[Number(paramId) - 1] || null;
  console.log({ currentUser });

  const isSaved = currentUser?.artigosSalvos?.find(
    (artigo) => artigo.nomeArtigo === filteredNews.title
  );

  const handleSaveNews = async () => {
    if (isSaved) return;

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

    if (currentUser) setCurrentUser(currentUser);

    const responsePut = await fetch(
      `${import.meta.env.VITE_API_URL_BASE}/usuarios/${currentUser?.id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(currentUser),
      }
    );
    return responsePut;
  };

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
                disabled={Boolean(isSaved)}
                className={`w-full sm:w-auto text-white font-semibold px-6 py-3 rounded-full shadow text-sm sm:text-base text-center
                transition-colors duration-300 ease-in-out
                ${
                  isSaved
                    ? "bg-green-600 cursor-not-allowed"
                    : "bg-[#0a1a2f] hover:bg-[#081524] cursor-pointer"
                }
              `}
              >
                {isSaved ? "Notícia Salva" : "Salvar Notícia"}
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
    </div>
  );
}

export { Artigo };
