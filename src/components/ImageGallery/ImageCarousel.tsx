import { useEffect, useState } from "react";
import "./ImageCarousel.css";

interface ImageCarouselProps {
  images: string[];
}

const ImageCarousel = ({ images }: ImageCarouselProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Auto-advance every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000);

    return () => clearInterval(interval); // Cleanup on unmount
  }, []);

  const handleThumbnailClick = (index: number) => {
    setCurrentIndex(index);
  };

  return (
    <div className="carousel-container">
      <div className="main-image">
        <img src={images[currentIndex]} alt="Main view" />
      </div>
      <div className="thumbnail-list">
        {images.map((img, idx) => (
          <img
            key={idx}
            src={img}
            alt={`Thumbnail ${idx + 1}`}
            className={`thumbnail ${currentIndex === idx ? "active" : ""}`}
            onClick={() => handleThumbnailClick(idx)}
          />
        ))}
      </div>
    </div>
  );
};

export default ImageCarousel;
