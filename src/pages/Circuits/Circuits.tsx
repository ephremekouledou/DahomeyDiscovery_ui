import { Flex, Typography } from "antd";
import NavBar from "../../components/navBar/navBar";
import Footer from "../../components/footer/footer";
import { useEffect, useState, useCallback, useMemo } from "react";
import img from "../../assets/images/13.jpg";
import video from "../../assets/videos/usagevid1.mp4";
import { useLocation, useNavigate } from "react-router-dom";
import ImageCarousel from "../../components/ImageGallery/ImageCarousel";
import img2 from "../../assets/images/2.jpg";
import img4 from "../../assets/images/4.jpg";
import img6 from "../../assets/images/6.jpg";
import img8 from "../../assets/images/8.jpg";
import img10 from "../../assets/images/10.jpg";
import BeginningButton from "../../components/dededed/BeginingButton";

// Optimisation des images en les mémorisant
const images = [img2, img4, img6, img8, img10];

interface TravelCardProps {
  id: string;
  image: string;
  video: string;
  title: string;
  description: string;
  days: number;
  nights: number;
  price: string | number;
}

// Composant TravelCard optimisé et responsive
const TravelCard = ({
  id,
  image,
  video,
  title,
  description,
  days,
  nights,
  price,
}: TravelCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const navigate = useNavigate();

  const handleCardClick = useCallback(() => {
    navigate(`/circuits-thematiques/${id}`);
  }, [navigate, id]);

  const handleMouseEnter = useCallback(() => {
    setIsHovered(true);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setIsHovered(false);
  }, []);

  return (
    <div
      className="group relative bg-white rounded-2xl shadow-lg overflow-hidden 
                 transition-all duration-300 hover:shadow-2xl cursor-pointer
                 w-full max-w-full
                 xs:max-w-[280px] 
                 sm:max-w-[320px] sm:min-w-[300px]
                 md:max-w-[340px] md:min-w-[320px]
                 lg:max-w-[360px] lg:min-w-[340px]
                 xl:max-w-[380px] xl:min-w-[360px]
                 flex flex-col
                 h-[420px] xs:h-[450px] sm:h-[480px] md:h-[500px] lg:h-[520px]"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleCardClick}
    >
      {/* Section Media - Responsive */}
      <div className="relative h-[45%] sm:h-1/2 overflow-hidden">
        <img
          src={image}
          alt={title}
          loading="lazy"
          className={`absolute inset-0 w-full h-full object-cover 
                     transition-opacity duration-500 
                     ${isHovered ? "opacity-0" : "opacity-100"}`}
        />
        {isHovered && (
          <video
            src={video}
            autoPlay
            loop
            muted
            playsInline
            preload="none"
            className="absolute inset-0 w-full h-full object-cover"
          />
        )}

        {/* Badge Jours/Nuits - Responsive */}
        <div
          className="absolute top-2 right-2 
                       xs:top-3 xs:right-3 
                       sm:top-4 sm:right-4 
                       bg-white bg-opacity-95 
                       px-2 py-1 
                       xs:px-2.5 xs:py-1.5 
                       sm:px-3 sm:py-2 
                       rounded-full shadow-md 
                       flex items-center gap-1 xs:gap-1.5 sm:gap-2 
                       backdrop-blur-sm"
        >
          <div className="flex items-center gap-0.5 xs:gap-1">
            <svg
              className="w-3 h-3 xs:w-3.5 xs:h-3.5 sm:w-4 sm:h-4 text-amber-500"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M10 2L13.09 8.26L20 9.27L15 14.14L16.18 21.02L10 17.77L3.82 21.02L5 14.14L0 9.27L6.91 8.26L10 2Z" />
            </svg>
            <span className="text-xs xs:text-xs sm:text-sm font-semibold text-gray-700">
              {days}J
            </span>
          </div>
          <div className="w-px h-2.5 xs:h-3 sm:h-4 bg-gray-300"></div>
          <div className="flex items-center gap-0.5 xs:gap-1">
            <svg
              className="w-3 h-3 xs:w-3.5 xs:h-3.5 sm:w-4 sm:h-4 text-indigo-500"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
            </svg>
            <span className="text-xs xs:text-xs sm:text-sm font-semibold text-gray-700">
              {nights}N
            </span>
          </div>
        </div>
      </div>

      {/* Contenu principal - Responsive */}
      <div className="flex flex-col h-[55%] sm:h-1/2 p-3 xs:p-4 sm:p-5 md:p-6">
        <div className="flex-grow min-h-0">
          <h3
            className="text-base xs:text-lg sm:text-xl md:text-xl 
                        font-bold text-[#411E1C] 
                        mb-1.5 xs:mb-2 sm:mb-2 
                        line-clamp-2 
                        leading-tight xs:leading-snug sm:leading-normal"
          >
            {title}
          </h3>
          <p
            className="text-gray-600 
                       text-xs xs:text-sm sm:text-sm 
                       leading-relaxed 
                       mb-3 xs:mb-4 
                       line-clamp-3 
                       overflow-hidden"
          >
            {description}
          </p>
        </div>

        {/* Footer de la carte - Responsive */}
        <div className="flex items-center justify-between mt-auto pt-2 xs:pt-3">
          <div className="min-w-0 flex-shrink-0">
            <p className="text-xs text-gray-500 mb-0.5">À partir de</p>
            <p
              className="text-lg xs:text-xl sm:text-2xl 
                         font-bold text-[#411E1C] 
                         leading-tight truncate"
            >
              {price}
            </p>
          </div>
          <button
            className="bg-[#f6aa1d] text-black 
                           px-2.5 py-1.5 
                           xs:px-3 xs:py-2 
                           sm:px-4 sm:py-2 
                           rounded-lg font-medium 
                           hover:bg-[#ff3100] hover:text-white 
                           transition-colors duration-200 
                           flex items-center gap-1.5 xs:gap-2 
                           text-xs xs:text-sm sm:text-base 
                           cursor-pointer 
                           flex-shrink-0 ml-2"
          >
            <span className="hidden xs:inline">Découvrir</span>
            <span className="xs:hidden">Voir</span>
            <svg
              className="w-3 h-3 xs:w-3.5 xs:h-3.5 sm:w-4 sm:h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

// Hook personnalisé pour gérer la responsivité
const useResponsive = () => {
  const [screenSize, setScreenSize] = useState({
    isMobile: false,
    isTablet: false,
    isDesktop: false,
    width: 0,
  });

  useEffect(() => {
    const checkScreenSize = () => {
      const width = window.innerWidth;
      setScreenSize({
        isMobile: width < 768,
        isTablet: width >= 768 && width < 1024,
        isDesktop: width >= 1024,
        width,
      });
    };

    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  return screenSize;
};

const Circuits = () => {
  const { pathname } = useLocation();
  const { isMobile, isTablet } = useResponsive();

  // Données des voyages mémorisées
  const voyages = useMemo(
    () => [
      {
        id: "de774e84ds8e45s75fs",
        image: img,
        video: video,
        title: "Spiritualité & Traditions Vodoun: L'invisible au cœur du Bénin",
        description:
          "Explorer l’univers invisible du vodoun à travers des rencontres, des cérémonies, des lieux sacrés et des savoirs ancestraux.",
        days: 8,
        nights: 7,
        price: "50.000 FCFA",
      },
    ],
    []
  );

  useEffect(() => {
    document.title = "Circuits Thématiques";
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <Flex justify="center" vertical>
      <BeginningButton /> 
      {/* Header avec NavBar */}
      <div>
        <NavBar menu="CIRCUITS" />
      </div>

      {/* Section héros - Responsive */}
      <Flex
        vertical
        style={{
          position: "relative",
          overflow: "hidden",
          padding: isMobile ? "4vh 6vw" : "8vh 8vw",
          paddingBottom: isMobile ? "10vh" : "20vh",
          backgroundColor: "#FEF1D9", // Fallback background
        }}
      >
        {/* Optimized Video Background */}
        <video
          autoPlay
          loop
          muted
          playsInline
          preload="auto" // Ensures early loading
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
            zIndex: 0,
          }}
          onError={(e) => {
            console.error("Video error:", e);
          }}
        >
          <source src={video} type="video/mp4" />
          Your browser does not support the video tag.
        </video>

        {/* Content Layer */}
        <Flex
          style={{
            maxWidth: "1050px",
            width: "100%",
            margin: "0 auto",
            zIndex: 1,
          }}
        >
          <Flex vertical>
            <Typography.Text
              style={{
                color: "white",
                fontSize: isMobile ? "12px" : "16px",
                lineHeight: "1.1",
                margin: "0",
                textTransform: "uppercase",
                fontFamily: "GeneralSans",
                letterSpacing: "0.3em",
              }}
            >
              CIRCUITS THÉMATIQUES
            </Typography.Text>
            <Typography.Title
              level={1}
              style={{
                color: "#FF3100",
                fontSize: isMobile ? "44px" : "85px",
                fontWeight: "900",
                lineHeight: "1.1",
                letterSpacing: "0.03em",
                margin: "0",
                fontFamily: "DragonAngled",
              }}
            >
              DESTINATIONS CULTURELLES <br /> ET HISTORIQUES
            </Typography.Title>
          </Flex>
        </Flex>
      </Flex>

      {/* Grille des cartes - Responsive */}
      <div className="w-full bg-gray-50 py-8 sm:py-12 lg:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div
            className="grid grid-cols-1 
                         xs:grid-cols-1 
                         sm:grid-cols-2 
                         lg:grid-cols-3 
                         xl:grid-cols-3 
                         gap-4 sm:gap-6 lg:gap-8
                         justify-items-center"
          >
            {voyages.map((voyage) => (
              <TravelCard key={voyage.id} {...voyage} />
            ))}
          </div>
        </div>
      </div>

      {/* Carrousel d'images - Responsive */}
      <section className="w-full">
        <div
          style={{
            height: isMobile ? "60vw" : isTablet ? "50vw" : "45vw",
            minHeight: isMobile ? "250px" : "300px",
          }}
        >
          <ImageCarousel images={images} />
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </Flex>
  );
};

export default Circuits;
