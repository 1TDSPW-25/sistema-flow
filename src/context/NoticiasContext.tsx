import { createContext, useEffect, useState, type ReactNode } from "react";
import type { Article } from "../types/home";

// eslint-disable-next-line react-refresh/only-export-components
export const NoticiasContext = createContext<Array<Article>>([]);

export const NoticiasProvider = ({ children }: { children: ReactNode }) => {
  const [news, setNews] = useState([]);

  useEffect(() => {
    const url = `https://newsapi.org/v2/top-headlines?country=us&apiKey=0596354ecea24b1c93f25943b4f8dd9e`;

    const req = async () => {
      try {
        const getNews = await fetch(url);
        const newsResponse = await getNews.json();
        setNews(newsResponse.articles);
      } catch (error) {
        console.error("Error fetching news:", error);
      }
    };
    req();
  }, []);

  return (
    <NoticiasContext.Provider value={news}>{children}</NoticiasContext.Provider>
  );
};
