import { useParams, useSearchParams } from "react-router-dom";
import { useNoticia } from "../../hooks/useNoticia";
import type { UsuarioType } from "../../types/usuario";
import { useLogado } from "../../hooks/useLogado";
const API_URL = "http://localhost:3001";

function Artigo() {
  const news = useNoticia();
  const { userEmail } = useLogado();
  const [searchParams] = useSearchParams();
  const { id } = useParams();
  const paramId = id || searchParams.get("artigo");

  const handleSaveNews = async () => {
    console.log("Notícia salva!");
    const response = await fetch(`${API_URL}/usuarios`);

    if (!response.ok) return

    const data: UsuarioType[] = await response.json();
    const currentUser = data.find(user => user.email === userEmail)

    if (currentUser?.artigosSalvos?.find(artigo => artigo.nomeArtigo === filteredNews.title)) return
    if (currentUser && "artigosSalvos" in currentUser) {

      currentUser.artigosSalvos?.push({
        url: filteredNews.url,
        nomeArtigo: filteredNews.title
      })
    }
    else if (currentUser) {
      currentUser.artigosSalvos = [{
        url: filteredNews.url,
        nomeArtigo: filteredNews.title
      }]
    }

    const responsePut = await fetch(`${API_URL}/usuarios/${currentUser?.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(currentUser),
    });

    console.log(responsePut);
    return data;
  }

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

          <button onClick={handleSaveNews}
            className="inline-block bg-[#0a1a2f] text-white font-semibold px-6 py-3 rounded-full shadow hover:bg-[#081524] transition cursor-pointer mb-4"> Salvar Notícia </button>



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