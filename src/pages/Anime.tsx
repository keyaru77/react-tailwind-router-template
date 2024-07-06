// src/pages/Anime.tsx
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

interface AnimeData {
  iframeSrc: string;
  iframes: { label: string; src: string }[];
  episodes: { href: string; imgSrc: string; title: string; eps: string }[];
  title: string;
  epn: string;
  prev: string;
  prevtex: string;
  next: string;
  nexttex: string;
  servers: { server: string; links: { url: string; text: string }[] }[];
  imganime: string;
  titleanime: string;
  rating: string;
  details: {
    Status: string;
    'Tipe Karakter': { text: string; link: string };
    Studio: { text: string; link: string };
    'Telah rilis': string;
    Durasi: string;
    Musim: { text: string; link: string };
    Jenis: string;
    Episode: string;
  };
  genres: { genre: string; link: string }[];
  deskripsi: string;
}

const Anime: React.FC = () => {
  const { endpoint } = useParams<{ endpoint: string }>();
  const [animeData, setAnimeData] = useState<AnimeData | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`https://api.koranime.fun/v1/nonton/${endpoint}`);
        setAnimeData(response.data);
      } catch (error) {
        console.error("Error fetching data", error);
      }
    };
    fetchData();
  }, [endpoint]);

  if (!animeData) return <div>Loading...</div>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">{animeData.title}</h1>
      <iframe src={animeData.iframeSrc} className="w-full h-64 mb-4"></iframe>
      <div className="mb-4">
        <h2 className="text-xl font-bold mb-2">Iframes</h2>
        <ul>
          {animeData.iframes.map((iframe, index) => (
            <li key={index}>
              <a href={iframe.src} className="text-blue-500 underline">
                {iframe.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
      <div className="mb-4">
        <h2 className="text-xl font-bold mb-2">Episodes</h2>
        <ul className="grid grid-cols-2 gap-4">
          {animeData.episodes.map((episode, index) => (
            <li key={index} className="flex">
              <img src={episode.imgSrc} alt={episode.title} className="w-20 h-20 object-cover" />
              <div className="ml-2">
                <a href={episode.href} className="text-blue-500 underline">
                  {episode.title}
                </a>
                <p>{episode.eps}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
      <div className="mb-4">
        <h2 className="text-xl font-bold mb-2">Servers</h2>
        {animeData.servers.map((server, index) => (
          <div key={index}>
            <h3 className="font-semibold">{server.server}</h3>
            <ul>
              {server.links.map((link, linkIndex) => (
                <li key={linkIndex}>
                  <a href={link.url} className="text-blue-500 underline">
                    {link.text}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="mb-4">
        <h2 className="text-xl font-bold mb-2">Details</h2>
        <ul>
          <li>Status: {animeData.details.Status}</li>
          <li>Studio: <a href={animeData.details.Studio.link} className="text-blue-500 underline">{animeData.details.Studio.text}</a></li>
          <li>Rilis: {animeData.details['Telah rilis']}</li>
          <li>Durasi: {animeData.details.Durasi}</li>
          <li>Musim: <a href={animeData.details.Musim.link} className="text-blue-500 underline">{animeData.details.Musim.text}</a></li>
          <li>Jenis: {animeData.details.Jenis}</li>
          <li>Episode: {animeData.details.Episode}</li>
        </ul>
      </div>
      <div className="mb-4">
        <h2 className="text-xl font-bold mb-2">Genres</h2>
        <ul>
          {animeData.genres.map((genre, index) => (
            <li key={index}>
              <a href={genre.link} className="text-blue-500 underline">{genre.genre}</a>
            </li>
          ))}
        </ul>
      </div>
      <p>{animeData.deskripsi}</p>
    </div>
  );
};

export default Anime;
