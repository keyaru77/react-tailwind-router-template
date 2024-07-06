import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const AnimeDetail: React.FC = () => {
  const { endpoint } = useParams<{ endpoint: string }>();

  // Lakukan hal lain sesuai kebutuhan dengan nilai 'end' yang didapat dari useParams

  return (
    <div>
      <h2>Detail untuk {end}</h2>
      {/* Tampilkan detail anime atau konten sesuai dengan nilai 'end' */}
    </div>
  );
};

export default AnimeDetail;
