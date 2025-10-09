import { useEffect, useState } from "react";

export default function Home() {

    const [news, setNews] = useState([])

    useEffect(() => {
        const url = 'https://newsapi.org/v2/top-headlines?' +
            'country=br' +
            'apiKey=0596354ecea24b1c93f25943b4f8dd9e';
        const req = async () => {
            const getNews = await fetch(url)
            const newsResponse = await getNews.json();
            setNews(newsResponse)
        };
        req()
    }, [])
    console.log(news)
    return (
        <main>
            <h1>Home</h1>
        </main>
    )
}
