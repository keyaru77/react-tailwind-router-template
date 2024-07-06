import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

interface Article {
  link: string;
  typez: string;
  title: string;
  img: string;
}

const Home: React.FC = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://api.koranime.fun/v1/home');
        console.log('API Response:', response.data); // Debugging line
        setArticles(response.data.articles);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching the articles:', error);
        setError('Failed to load articles');
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <h1>Anime Articles</h1>
      <div>
        {articles.map((article, index) => (
          <div key={index}>
            <Link to={`/post${article.link}`}>
              <h2>{article.title}</h2>
              <img src={article.img} alt={article.title} />
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
