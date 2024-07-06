import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

interface AnimeDetails {
  title: string;
  imganime: string;
  titleanime: string;
  episodes: {
    href: string;
    imgSrc: string;
    title: string;
    eps: string;
  }[];
  servers: {
    server: string;
    links: {
      url: string;
      text: string;
    }[];
  }[];
  details: {
    Status: string;
    "Tipe Karakter": {
      text: string;
      link: string;
    };
    Studio: {
      text: string;
      link: string;
    };
    "Telah rilis": string;
    Durasi: string;
    Musim: {
      text: string;
      link: string;
    };
    Jenis: string;
    Episode: string;
  };
  genres: {
    genre: string;
    link: string;
  }[];
  deskripsi: string;
}

const AnimeDetail: React.FC = () => {
  const { endpoint } = useParams<{ endpoint: string }>();
  const [data, setData] = useState<AnimeDetails | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`https://api.koranime.fun/v1/nonton/${endpoint}`);
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const jsonData = await response.json();
        setData(jsonData);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching the data:", error);
        setError("Failed to load data");
        setLoading(false);
      }
    };
    fetchData();
  }, [endpoint]);

  if (loading) {
    return <div className="text-center mt-8">Loading...</div>;
  }

  if (error) {
    return <div className="text-center mt-8">{error}</div>;
  }

  if (!data) {
    return <div className="text-center mt-8">No data available</div>;
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <div className="flex flex-wrap items-center justify-between">
        <div className="w-full md:w-1/2 mb-4 md:mb-0">
          <h1 className="text-3xl font-bold">{data.title}</h1>
          <p className="text-gray-600">{data.details.Jenis} - {data.details.Status}</p>
          <div className="mt-4">
            <img src={data.imganime} alt={data.titleanime} className="w-full rounded-lg shadow-md" />
          </div>
          <p className="mt-4">{data.deskripsi}</p>
        </div>
        <div className="w-full md:w-1/2">
          <div className="mb-4">
            <h2 className="text-2xl font-bold">Episodes</h2>
            <ul className="divide-y divide-gray-300">
              {data.episodes.map((episode, index) => (
                <li key={index} className="py-2 flex items-center">
                  <Link to={episode.href} className="flex items-center">
                    <img src={episode.imgSrc} alt={episode.title} className="w-16 h-16 object-cover rounded-md shadow-md" />
                    <div className="ml-4">
                      <p className="font-bold">{episode.title}</p>
                      <p>{episode.eps}</p>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="mb-4">
            <h2 className="text-2xl font-bold">Streaming Servers</h2>
            <ul className="divide-y divide-gray-300">
              {data.servers.map((server, index) => (
                <li key={index} className="py-2">
                  <p className="font-bold">{server.server}</p>
                  <ul className="ml-4">
                    {server.links.map((link, idx) => (
                      <li key={idx} className="py-1">
                        <a href={link.url} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">{link.text}</a>
                      </li>
                    ))}
                  </ul>
                </li>
              ))}
            </ul>
          </div>
          <div className="mb-4">
            <h2 className="text-2xl font-bold">Genres</h2>
            <ul className="ml-4">
              {data.genres.map((genre, index) => (
                <li key={index} className="inline-block mr-2">
                  <Link to={genre.link} className="text-blue-500 hover:underline">{genre.genre}</Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnimeDetail;
