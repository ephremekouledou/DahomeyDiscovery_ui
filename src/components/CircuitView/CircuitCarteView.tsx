import { Flex, Typography } from "antd";
import { useLocation, useParams } from "react-router-dom";
import NavBar from "../navBar/navBar";
import Footer from "../footer/footer";
import { useState, useEffect } from "react";
import BeginningButton from "../dededed/BeginingButton";
import video from "../../assets/videos/usagevid1.mp4";
import debut from "../../assets/images/Circuit signature/Début.webp";
import img1 from "../../assets/images/Accueil/1_5.webp";
import img2 from "../../assets/images/Accueil/2_5.webp";
import img3 from "../../assets/images/Accueil/3_5.webp";
import { ThematicCircuitCard } from "./Card";
import { useScreenSizeResponsive } from "./Timeline";
import ImageCarousel from "../ImageGallery/ImageCarousel";

const IMAGES = [img1, img2, img3];

const CIRCUIT_CARDS = [
  {
    imageUrl: img1,
    title: "Place de l'amazon",
    description: "Découvrez la Place de l'amazon, une expérience unique.",
    alt: "Circuit Signature",
  },
  {
    imageUrl: img2,
    title: "Place de l'amazon",
    description: "Découvrez la Place de l'amazon, une expérience unique.",
    alt: "Circuit Thématiques",
  },
  {
    imageUrl: img3,
    title: "Place de l'amazon",
    description: "Découvrez la Place de l'amazon, une expérience unique.",
    alt: "Circuit à la carte",
  },
] as const;


export const CircuitCarteView = () => {
  const { id } = useParams();
  const [isMobile, setIsMobile] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const { screenSize, isTablet } = useScreenSizeResponsive();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <Flex justify="center" vertical>
      <BeginningButton />
      {/* Header avec NavBar */}
      <div
        className="relative z-20 flex items-center justify-center"
        style={{ backgroundColor: "#FEF1D9" }}
      >
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
          backgroundImage: `url(${debut})`, // Fallback background
          backgroundSize: "cover",
          backgroundPosition: "center",
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
          <Flex vertical gap={0}>
            <Typography.Text
              style={{
                color: "#FFFFFF",
                fontSize: isMobile ? "12px" : "16px",
                lineHeight: "1.1",
                margin: "0",
                textTransform: "uppercase",
                fontFamily: "GeneralSans",
                letterSpacing: "0.3em",
              }}
            >
              Circuit à la carte
            </Typography.Text>
            <Typography.Title
              level={1}
              style={{
                color: "#FF3100",
                fontSize: isMobile ? "44px" : "85px",
                fontWeight: "900",
                lineHeight: "1.1",
                letterSpacing: "0.03em",
                marginTop: "20px",
                fontFamily: "DragonAngled",
                textTransform: "uppercase",
              }}
            >
              Découverte de régions
            </Typography.Title>
            <Typography.Text
              style={{
                color: "#FFFFFF",
                fontSize: isMobile ? "24px" : "45px",
                lineHeight: "1.1",
                marginTop: "0",
                fontFamily: "DragonAngled",
              }}
            >
              Chaque ville est une porte d’entrée vers une histoire, une
              tradition, un paysage
            </Typography.Text>
          </Flex>
        </Flex>
      </Flex>

      {/* Contenu principal - Responsive */}
      <Flex
        style={{
          width: "100%",
          maxWidth: "1200px",
          margin: "20px auto",
        }}
        gap={10}
        vertical
      >
        <Typography.Title
          level={1}
          style={{
            color: "#FF3100",
            fontSize: isMobile ? "44px" : "65px",
            fontWeight: "900",
            lineHeight: "1.1",
            letterSpacing: "0.03em",
            marginTop: "20px",
            fontFamily: "DragonAngled",
            textTransform: "uppercase",
          }}
        >
          {id} vous propose...
        </Typography.Title>
        <Flex gap={30}>
          {CIRCUIT_CARDS.map((card, index) => (
            <Flex key={card.alt}>
              <div className={`circuit-card-${index + 1}`}>
                <ThematicCircuitCard
                  imageUrl={card.imageUrl}
                  title={card.title}
                  description={card.description}
                  alt={card.alt}
                  screenSize={screenSize}
                />
              </div>
            </Flex>
          ))}
        </Flex>
      </Flex>

      <section
        style={{
          marginTop: "60px",
          height: isMobile ? "60vw" : isTablet ? "50vw" : "45vw",
          minHeight: "300px",
        }}
      >
        <ImageCarousel images={IMAGES} />
      </section>

      {/* Footer */}
      <Footer />
    </Flex>
  );
};

export default CircuitCarteView;
