import { useParams, useSearchParams } from "react-router-dom";
import { useNoticia } from "../../hooks/useNoticia";

function Artigo() {
  const news = useNoticia();
  const [searchParams] = useSearchParams();
  const { id } = useParams();
  const paramId = id || searchParams.get("artigo");

  const filteredNews = news[Number(paramId) - 1] || null;

  return (
    <article className="max-w-5xl mx-auto py-10 px-4 text-gray-800">
      {filteredNews ? (
        <>
          {/* Imagem principal */}
          {filteredNews.urlToImage && (
            <img
              src={filteredNews.urlToImage}
              alt={filteredNews.title}
              className="w-full h-96 object-cover rounded-lg shadow-md mb-8"
            />
          )}

          {/* Título */}
          <h1 className="text-3xl font-bold text-gray-900 mb-3 leading-tight">
            {filteredNews.title}
          </h1>

          {/* Autor e data */}
          <p className="text-gray-600 mb-1">
            <span className="font-medium">{filteredNews.author}</span>
          </p>
          <div className="flex flex-wrap gap-2 text-sm text-gray-500 mb-4">
            <small>
              <strong>Data de publicação:</strong>{" "}
              {new Date(filteredNews.publishedAt).toLocaleDateString("pt-BR")}
            </small>
            <span>•</span>
            <small>
              <strong>Fonte:</strong> {filteredNews.source.name}
            </small>
          </div>

          <hr className="border-gray-300 my-6" />

          {/* Conteúdo */}
          <p className="text-lg leading-relaxed mb-8">
            {filteredNews?.content
              ? filteredNews.content.replace(/\[\+\d{1,3} chars\]/g, "")
              : "Conteúdo não disponível."}
          </p>

          {/* Link para artigo completo */}
          <a
            href={filteredNews.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-blue-600 text-white font-semibold px-6 py-3 rounded-md shadow hover:bg-blue-700 transition"
          >
            Leia o artigo completo
          </a>
        </>
      ) : (
        <h1 className="text-center text-2xl text-red-600 font-semibold mt-20">
          Artigo não encontrado 😕
        </h1>
      )}
    </article>
  );
}

export { Artigo };
