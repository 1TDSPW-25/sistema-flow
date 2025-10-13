import { useEffect, useState } from "react";
import type { Article } from "../../types/home";
import { Card } from "../../components/Card/Card";

export default function Home() {
  const [news, setNews] = useState<Array<Article>>([]);

  useEffect(() => {
    const url = `https://newsapi.org/v2/top-headlines?country=us&apiKey=0596354ecea24b1c93f25943b4f8dd9e`;

    const req = async () => {
      const getNews = await fetch(url);
      const newsResponse = await getNews.json();
      setNews(newsResponse.articles);
    };
    req();
  }, []);

  return (
    <main className="grail [&>*]:px-4">
      <h1>Home - Notícias</h1>
      <section className="card-gallery py-2">
        {news.map((post) => {
          return <Card {...post} />;
        })}
      </section>
    </main>
  );
}
