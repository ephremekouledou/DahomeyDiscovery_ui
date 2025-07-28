import { Flex, Typography } from "antd";
import NavBar from "../../components/navBar/navBar";
import Footer from "../../components/footer/footer";
import { useEffect, useState } from "react";
import img from "../../assets/images/13.jpg";
import video from "../../assets/videos/usagevid1.mp4";
import { useLocation, useNavigate } from "react-router-dom";
import ImageCarousel from "../../components/ImageGallery/ImageCarousel";
// import img1 from "../../assets/images/1.jpg";
import img2 from "../../assets/images/2.jpg";
// import img3 from "../../assets/images/3.jpg";
import img4 from "../../assets/images/4.jpg";
// import img5 from "../../assets/images/5.jpg";
import img6 from "../../assets/images/6.jpg";
// import img7 from "../../assets/images/7.jpg";
import img8 from "../../assets/images/8.jpg";
// import img9 from "../../assets/images/9.jpg";
import img10 from "../../assets/images/10.jpg";
/* import img11 from "../../assets/images/11.jpg";
import img12 from "../../assets/images/12.jpg";
import img13 from "../../assets/images/13.jpg";
import img14 from "../../assets/images/14.png"; */


const images = [
  // img1,
  img2,
  // img3,
  img4,
  // img5,
  img6,
  // img7,
  img8,
  // img9,
  img10,
  // img11,
  // img12,
  // img13,
  // img14,
];

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

  return (
    <div
      className="relative bg-white rounded-2xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-2xl cursor-pointer
             w-full max-w-[320px] min-w-[280px] 
             sm:max-w-[300px] sm:min-w-[280px]
             md:max-w-[320px] md:min-w-[300px]
             lg:flex-1 lg:max-w-[350px] lg:min-w-[320px] flex flex-col h-[500px]" // 👈 hauteur totale définie ici
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => navigate(`/circuits-thematiques/${id}`)}
    >
      {/* Section Media (Image/Video) */}
      <div className="relative h-1/2 overflow-hidden">
        <img
          src={image}
          alt={title}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${
            isHovered ? "opacity-0" : "opacity-100"
          }`}
        />
        {isHovered && (
          <video
            src={video}
            autoPlay
            loop
            muted
            playsInline
            className="absolute inset-0 w-full h-full object-cover"
          />
        )}

        {/* Badge Jours/Nuits */}
        <div className="absolute top-3 right-3 sm:top-4 sm:right-4 bg-white bg-opacity-95 px-2 py-1.5 sm:px-3 sm:py-2 rounded-full shadow-md flex items-center gap-1.5 sm:gap-2 backdrop-blur-sm">
          <div className="flex items-center gap-1">
            <svg
              className="w-3 h-3 sm:w-4 sm:h-4 text-amber-500"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm..." />
            </svg>
            <span className="text-xs sm:text-sm font-semibold text-gray-700">
              {days}J
            </span>
          </div>
          <div className="w-px h-3 sm:h-4 bg-gray-300"></div>
          <div className="flex items-center gap-1">
            <svg
              className="w-3 h-3 sm:w-4 sm:h-4 text-indigo-500"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
            </svg>
            <span className="text-xs sm:text-sm font-semibold text-gray-700">
              {nights}N
            </span>
          </div>
        </div>
      </div>

      {/* Contenu principal */}
      <div className="flex flex-col h-1/2 p-4 sm:p-5 md:p-6">
        <div className="flex-grow">
          <h3 className="text-lg sm:text-xl font-bold text-[#411E1C] mb-2 line-clamp-2">
            {title}
          </h3>
          <p className="text-gray-600 text-sm leading-relaxed mb-4 line-clamp-3">
            {description}
          </p>
        </div>

        <div className="flex items-center justify-between mt-auto pt-2">
          <div>
            <p className="text-xs text-gray-500">À partir de</p>
            <p className="text-xl sm:text-2xl font-bold text-[#411E1C]">
              {price}
            </p>
          </div>
          <button className="bg-[#f6aa1d] text-black px-3 py-2 sm:px-4 sm:py-2 rounded-lg font-medium hover:bg-[#ff3100] hover:text-white transition-colors duration-200 flex items-center gap-2 text-sm sm:text-base cursor-pointer">
            Découvrir
            <svg
              className="w-3 h-3 sm:w-4 sm:h-4"
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

const Circuits = () => {
  const [isMobile, setIsMobile] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    document.title = "Circuits";
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const voyages = [
    {
      id: "circuit-signature",
      image: img,
      video: video,
      title: "Esprit des Femmes - Féminin sacré et créatif",
      description: "Groupes de femmes, voyages entre amies, militantes.",
      days: 9,
      nights: 8,
      price: "50.000 FCFA",
    },
    {
      id: "circuit",
      image: img,
      video: video,
      title: "Racines & Héritage sur les traces de l'histoire",
      description: "Créez votre propre parcours personnalisé.",
      days: 9,
      nights: 8,
      price: "50.000 FCFA",
    },
    {
      id: "circuit-thematiques",
      image: img,
      video: video,
      title: "Immersion & Savoir-Faire",
      description: "Circuits spécialisés selon vos centres d'intérêt.",
      days: 9,
      nights: 8,
      price: "50.000 FCFA",
    },
    {
      id: "circuit-a-la-carte",
      image: img,
      video: video,
      title: "Spiritualité & Traditions Vodoun",
      description: "Créez votre propre parcours personnalisé",
      days: 9,
      nights: 8,
      price: "50.000 FCFA",
    },
  ];

  // Effet pour définir le titre de la page
  useEffect(() => {
    document.title = "Circuits Thématiques";
  }, []);

  return (
    <Flex justify="center" vertical>
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
          backgroundColor: "black", // Fallback background
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

      {/* Contenu principal - Responsive */}
      <Flex
        style={{
          width: "100%",
          padding: "50px 0",
          maxWidth: "1100px",
          margin: "0 auto",
          flexWrap: "wrap", // Permet le passage à la ligne
          justifyContent: "center", // Centre les éléments
        }}
        gap={isMobile ? 15 : 25} // Gap réduit pour mobile
      >
        {/* Section des circuits - Responsive */}
        {voyages.map((voyage, index) => (
          <TravelCard key={index} {...voyage} />
        ))}
      </Flex>

      <section style={{ height: "45vw" }}>
        <ImageCarousel images={images} />
      </section>

      {/* Footer */}
      <Footer />
    </Flex>
  );
};

export default Circuits;
