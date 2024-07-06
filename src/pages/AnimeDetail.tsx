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
  const { slug } = useParams<{ slug: string }>();
  const [data, setData] = useState<AnimeDetails | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`https://api.koranime.fun/v1/nonton/${slug}`);
        setData(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching the data:", error);
        setError("Failed to load data");
        setLoading(false);
      }
    };
    fetchData();
  }, [slug]);

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
      {/* Render other data here */}
    </div>
  );
};

export default AnimeDetail;
