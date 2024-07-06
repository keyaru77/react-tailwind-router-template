import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Home = () => {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://api.koranime.fun/v1/home');
        setArticles(response.data.articles);
      } catch (error) {
        console.error('Error fetching the articles:', error);
      }
    };
    fetchData();
  }, []);

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
                      
