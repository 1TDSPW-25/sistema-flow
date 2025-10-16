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
    // Fundo
    <main className="min-h-screen pb-16 bg-gray-50"> 
      
      <h1
        className="
          w-full               
          py-6                
          px-4                 
          text-center         
          
          /* ESTILOS DE TEXTO */
          text-5xl             
          font-bold            
          uppercase
          font-[Bebas_Neue]    
          text-amber-900       

          /* ESTILO DA FAIXA */
          bg-orange-200        
          shadow-md            
          mb-10              
        "
      >
        NOTÍCIAS
      </h1>
      
      <section className="card-gallery px-4 py-2">
        {news.map((post) => {
          return <Card {...post} />;
        })}
      </section>
    </main>
  );
}