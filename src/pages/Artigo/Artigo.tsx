import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import type { Article } from "../../types/home";

function Artigo() {
  const [news, setNews] = useState<Array<Article>>([]);

  const { id } = useParams();
  useEffect(() => {
    const url = `https://newsapi.org/v2/top-headlines?country=us&apiKey=0596354ecea24b1c93f25943b4f8dd9e`;

    const req = async () => {
      const getNews = await fetch(url);
      const newsResponse = await getNews.json();
      setNews(newsResponse.articles);
    };
    req();
  }, []);

  let filteredNews = news[Number(id) - 1] || null;
  

  console.log(filteredNews);

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
