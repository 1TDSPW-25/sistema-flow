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
        {news.map((post, index) => {
          
          return <Card key={index} {...post} />;
        })}
      </section>
    </main>
  );
}