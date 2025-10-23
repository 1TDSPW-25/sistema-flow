import { useParams, useSearchParams } from "react-router-dom";
import { useNoticia } from "../../context/useNoticia";

function Artigo() {
  const news = useNoticia();
  const [searchParams] = useSearchParams();
  const { id } = useParams();
  const paramId = id || searchParams.get("artigo");

  const filteredNews = news[Number(paramId) - 1] || null;

  return (
    <article className="grail py-4">
      {filteredNews ? (
        <>
          <img src={filteredNews.urlToImage} alt={filteredNews.title} />
          <h1>{filteredNews.title}</h1>
          <p>{filteredNews.author}</p>
          <div>
            <small>Data de publicação: {filteredNews.publishedAt}</small>
            <small>Fonte: {filteredNews.source.name}</small>
          </div>
          <hr />
          <p>{filteredNews?.content.replace(/\[\+\d{1,3} chars\]/g, "")}</p>
          <a href={filteredNews.url}>Leia o artigo completo</a>
        </>
      ) : (
        <h1>Artigo não existe</h1>
      )}
    </article>
  );
}

export { Artigo };
