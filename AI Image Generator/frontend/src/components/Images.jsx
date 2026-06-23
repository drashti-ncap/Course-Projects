import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

import "./Images.css";

const API_URL = "http://localhost:9000";

const fetchImagesAPI = async () => {
  const res = await axios.get(`${API_URL}/gallery`);
  return res.data;
};

export default function Gallery() {
  const { data } = useQuery({
    queryKey: ["images"],
    queryFn: fetchImagesAPI,
  });

  const [lightboxDisplay, setLightboxDisplay] = useState(false);
  const [currentImage, setCurrentImage] = useState("");

  const openLightbox = (url) => {
    setCurrentImage(`${API_URL}${url}`);
    setLightboxDisplay(true);
  };

  const closeLightbox = () => {
    setLightboxDisplay(false);
  };

  return (
    <>
      <div className="gallery">
        {data?.map((image, index) => (
          <div
            key={image._id || index}
            className={`image-container image-${index + 1}`}
            onClick={() => openLightbox(image.url)}
          >
            <img
              src={`${API_URL}${image.url}`}
              alt={`Artwork ${index + 1}`}
              className="gallery-image"
            />
          </div>
        ))}
      </div>

      {lightboxDisplay && (
        <div className="lightbox" onClick={closeLightbox}>
          <span className="close-btn">&times;</span>

          <img
            className="lightbox-image"
            src={currentImage}
            alt="Artwork"
          />
        </div>
      )}
    </>
  );
}