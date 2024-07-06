import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

interface Iframe {
  label: string;
  src: string;
}

interface Episode {
  href: string;
  imgSrc: string;
  title: string;
  eps: string;
}

interface ServerLink {
  url: string;
  text: string;
}

interface Server {
  server: string;
  links: ServerLink[];
}

interface AnimeDetails {
  iframeSrc: string;
  iframes: Iframe[];
  episodes: Episode[];
  title: string;
  epn: string;
  epx: string;
  tanggal: string;
  prev: string;
  prevtex: string;
  allepx: string;
  allepxtex: string;
  next: string;
  nexttex: string;
  download: string;
  servers: Server[];
  imganime: string;
  titleanime: string;
  titlealter: string;
  rating: string;
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
        const response = await axios.get(`https://api.koranime.fun/v1/nonton/${endpoint}`);
        console.log('API Response:', response.data); // Debugging line
        setData(response.data);
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
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (!data) {
    return <div>No data available</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">{data.title}</h1>
      <iframe src={data.iframeSrc} className="w-full h-64 mb-4" title="Anime Video"></iframe>
      <div className="mb-8">
        {data.iframes.map((iframe, index) => (
          <div key={index} className="mb-2">
            <a href={iframe.src} target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">
              {iframe.label}
            </a>
          </div>
        ))}
      </div>
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Episodes</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {data.episodes.map((episode, index) => (
            <div key={index} className="bg-gray-100 p-4 rounded">
              <a href={episode.href} target="_blank" rel="noopener noreferrer" className="block">
                <img src={episode.imgSrc} alt={episode.title} className="w-full mb-2" />
                <h3 className="text-lg font-bold">{episode.title}</h3>
                <p>{episode.eps}</p>
              </a>
            </div>
          ))}
        </div>
      </div>
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Servers</h2>
        {data.servers.map((server, index) => (
          <div key={index} className="mb-4">
            <h3 className="text-xl font-bold mb-2">{server.server}</h3>
            {server.links.map((link, linkIndex) => (
              <div key={linkIndex} className="mb-1">
                <a href={link.url} target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">
                  {link.text}
                </a>
              </div>
            ))}
          </div>
        ))}
      </div>
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Details</h2>
        <p><strong>Status:</strong> {data.details.Status}</p>
        <p><strong>Tipe Karakter:</strong> <a href={data.details["Tipe Karakter"].link} className="text-blue-500 underline">{data.details["Tipe Karakter"].text}</a></p>
        <p><strong>Studio:</strong> <a href={data.details.Studio.link} className="text-blue-500 underline">{data.details.Studio.text}</a></p>
        <p><strong>Rilis:</strong> {data.details["Telah rilis"]}</p>
        <p><strong>Durasi:</strong> {data.details.Durasi}</p>
        <p><strong>Musim:</strong> <a href={data.details.Musim.link} className="text-blue-500 underline">{data.details.Musim.text}</a></p>
        <p><strong>Jenis:</strong> {data.details.Jenis}</p>
        <p><strong>Episode:</strong> {data.details.Episode}</p>
      </div>
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Genres</h2>
        {data.genres.map((genre, index) => (
          <span key={index} className="mr-2">
            <a href={genre.link} className="text-blue-500 underline">{genre.genre}</a>
          </span>
        ))}
      </div>
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Description</h2>
        <p>{data.deskripsi}</p>
      </div>
    </div>
  );
};

export default AnimeDetail;
