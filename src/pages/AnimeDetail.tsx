import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

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

interface AnimeDetail {
  iframeSrc: string;
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
  const [animeDetail, setAnimeDetail] = useState<AnimeDetail | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAnimeDetail = async () => {
      try {
        const response = await axios.get(`https://api.koranime.fun/v1/nonton/${endpoint}`);
        setAnimeDetail(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching anime detail:", error);
        setError("Failed to load anime detail");
        setLoading(false);
      }
    };

    fetchAnimeDetail();
  }, [endpoint]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (!animeDetail) {
    return <div>No anime detail available</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">{animeDetail.title}</h1>
      <iframe src={animeDetail.iframeSrc} className="w-full h-64 mb-4" title="Anime Video"></iframe>
      {/* Render other details and components here */}
      {/* Example rendering episodes */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {animeDetail.episodes.map((episode, index) => (
          <AnimeCard key={index} episode={episode} />
        ))}
      </div>
    </div>
  );
};

export default AnimeDetail;

interface AnimeCardProps {
  episode: Episode;
}

const AnimeCard: React.FC<AnimeCardProps> = ({ episode }) => {
  return (
    <div className="bg-gray-100 p-4 rounded">
      <a href={episode.href} target="_blank" rel="noopener noreferrer" className="block">
        <img src={episode.imgSrc} alt={episode.title} className="w-full mb-2" />
        <h3 className="text-lg font-bold">{episode.title}</h3>
        <p>{episode.eps}</p>
      </a>
    </div>
  );
};

export default AnimeCard;
