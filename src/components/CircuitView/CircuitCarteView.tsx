import { Divider, Flex, Typography } from "antd";
import { useLocation, useParams } from "react-router-dom";
import NavBar from "../navBar/navBar";
import Footer from "../footer/footer";
import React, { useState, useEffect, useRef } from "react";
import image1 from "../../assets/images/img1.jpeg";
import image2 from "../../assets/images/img2.jpg";
import image3 from "../../assets/images/img3.jpg";
import BeginningButton from "../dededed/BeginingButton";

// Types
interface Ville {
  id: string;
  name: string;
  description?: string;
}

// Composant réutilisable pour une ville

interface Experience {
  number: string;
  text: string;
}

interface Slide {
  id: number;
  location: string;
  image: string;
}

interface CulturalExperienceProps {
  experiences: Experience[];
  slides: Slide[];
}

interface VilleCardProps {
  ville: Ville;
  clicked?: boolean;
  onClick?: () => void;
  isMobile: boolean;
}

const VilleCard: React.FC<VilleCardProps> = ({ ville, onClick, isMobile }) => {
  return (
    <Flex vertical style={{ backgroundColor: "white" }} onClick={onClick}>
      {/* Contenu principal de la ville */}
      <Flex justify="space-between" align="flex-end" style={{paddingRight: isMobile ? "8px" : "24px",}}>
        <Flex vertical>
          <Typography.Title
            level={2}
            style={{
              color: "#FF3100",
              fontSize: isMobile ? "26px" : "63px",
              fontFamily: "DragonAngled",
              fontWeight: "300",
              paddingLeft: isMobile ? "8px" : "24px",
              margin: "0",
              lineHeight: isMobile ? "1.2" : "1.4",
              transition: "all 0.5s ease",
            }}
          >
            {ville.name}
          </Typography.Title>
          <Typography
            style={{
              color: "#311715",
              fontSize: isMobile ? "26px" : "18px",
              paddingLeft: isMobile ? "8px" : "25px",
              fontFamily: "GeneralSans",
              fontWeight: "300",
            }}
          >
            {ville.description}
          </Typography>
        </Flex>

        <button
          style={{
            backgroundColor: "#F39C12",
            color: "white",
            border: "none",
            borderRadius: "24px",
            padding: isMobile ? "10px 24px" : "12px 32px",
            fontSize: isMobile ? "14px" : "16px",
            fontWeight: "500",
            cursor: "pointer",
            transition: "all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1)",
            boxShadow: "0 2px 0 rgba(0, 0, 0, 0.045)",
            fontFamily: "GeneralSans",
            width: "fit-content",
          }}
          onMouseEnter={(e) => {
            const target = e.target as HTMLButtonElement;
            target.style.backgroundColor = "#ff3100"; // Rose
            target.style.color = "white";
            target.style.transform = "translateY(-2px)";
            target.style.boxShadow = "0 4px 8px rgba(0, 0, 0, 0.15)";
          }}
          onMouseLeave={(e) => {
            const target = e.target as HTMLButtonElement;
            target.style.backgroundColor = "#F59F00"; // Orange original
            target.style.color = "black";
            target.style.transform = "translateY(0)";
            target.style.boxShadow = "0 2px 0 rgba(0, 0, 0, 0.045)";
          }}
        >
          RÉSERVER
        </button>
      </Flex>

      <Divider size="large" />
    </Flex>
  );
};

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

  // Configuration centralisée des villes
  const villes: Ville[] = [
    {
      id: "Cotonou",
      name: "Cotonou",
      description: "Art urbain, marchés, street food, fresques & vie moderne",
    },
  ];

  const experiences: Experience[] = [
    {
      number: "01",
      text: "Rituel de retour symbolique aux ancêtres",
    },
    {
      number: "02",
      text: "Rencontre avec historien local",
    },
    {
      number: "03",
      text: "Mémoire et transmission culturelle",
    },
  ];

  // Carousel slides data
  const slides: Slide[] = [
    {
      id: 1,
      location: "Cotonou",
      image: image1,
    },
    {
      id: 2,
      location: "Porto-Novo",
      image: image2,
    },
    {
      id: 3,
      location: "Ouidah",
      image: image3,
    },
  ];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <Flex justify="center" vertical>
      <BeginningButton />
      {/* Header avec NavBar - Responsive */}
      <div
        className="relative z-20 flex items-center justify-center p-8"
        style={{
          backgroundColor: "#FEF1D9",
          paddingBottom: isMobile ? "4vw" : "7vw",
        }}
      >
        <NavBar menu="CIRCUITS" />
      </div>

      {/* Contenu principal - Responsive */}
      <Flex
        style={{
          width: "100%",
          maxWidth: "1200px",
          margin: "0 auto",
          position: "relative",
          bottom: isMobile ? "1vw" : "3vw",
          zIndex: 100,
        }}
        vertical
        gap={0}
      >
        {/* Section des villes - Responsive */}
        <Flex
          vertical
          gap="20px"
          style={{
            width: "100%",
            paddingBottom: isMobile ? "1vw" : "2vw",
          }}
        >
          {villes
            .filter((ville) => ville.id === id)
            .map((ville) => (
              <VilleCard
                key={ville.id}
                ville={ville}
                clicked={true}
                isMobile={isMobile}
              />
            ))}
        </Flex>

        {/* Section de l'expérience culturelle */}
        <CulturalExperience experiences={experiences} slides={slides} />
      </Flex>

      {/* Footer */}
      <Footer />
    </Flex>
  );
};

const CulturalExperience: React.FC<CulturalExperienceProps> = ({
  experiences,
  slides,
}) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);
  const [isMobile, setIsMobile] = useState(false);
  const intervalRef = useRef<number | null>(null);

  // Check if mobile on mount and resize
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Auto-play functionality
  useEffect(() => {
    if (!isPaused) {
      intervalRef.current = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % slides.length);
      }, 3000); // Change slide every 3 seconds
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isPaused, slides.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  // Touch handlers
  const minSwipeDistance = 50;

  const onTouchStart = (e: any) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e: any) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;

    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe) {
      nextSlide();
    }
    if (isRightSwipe) {
      prevSlide();
    }
  };

  return (
    <div style={{}}>
      <div
        style={{
          margin: "0 auto",
          borderRadius: "8px",
          boxShadow:
            "0 1px 2px 0 rgba(0, 0, 0, 0.03), 0 1px 6px -1px rgba(0, 0, 0, 0.02), 0 2px 4px 0 rgba(0, 0, 0, 0.02)",
          padding: isMobile ? "0 6vw" : "0 2vw",
          paddingBottom: isMobile ? "3vw" : "5vw",
        }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: isMobile ? "1fr" : "repeat(2, 1fr)",
            gap: isMobile ? "24px" : "32px",
            alignItems: "center",
          }}
        >
          {/* Left Column - Experience List */}
          <div style={{ paddingRight: isMobile ? "0" : "24px" }}>
            {experiences.map((exp, index) => (
              <div
                key={index}
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  gap: isMobile ? "16px" : "15px",
                  marginBottom:
                    index < experiences.length - 1 ? "24px" : "32px",
                }}
              >
                <span
                  style={{
                    fontSize: isMobile ? "24px" : "60px",
                    fontWeight: "700",
                    color: "#E85D3D",
                    backgroundColor: "#FFE0D9",
                    padding: isMobile ? "12px 6px" : "3px 5px",
                    lineHeight: "1",
                    fontFamily: "DragonAngled",
                    flexShrink: 0,
                  }}
                >
                  {exp.number}
                </span>
                <p
                  style={{
                    color: "#262626",
                    fontSize: isMobile ? "14px" : "18px",
                    marginTop: isMobile ? "6px" : "8px",
                    lineHeight: "1.6",
                    fontFamily: "GeneralSans",
                  }}
                >
                  {exp.text}
                </p>
              </div>
            ))}
          </div>

          {/* Right Column - Carousel - Responsive */}
          <div
            style={{
              position: "relative",
              marginTop: isMobile ? "32px" : "0",
            }}
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            {/* Carousel Container */}
            <div
              style={{
                position: "relative",
                overflow: "hidden",
                borderRadius: "8px",
                boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
                height: isMobile ? "250px" : "450px",
              }}
              onTouchStart={onTouchStart}
              onTouchMove={onTouchMove}
              onTouchEnd={onTouchEnd}
            >
              {/* Carousel Track */}
              <div
                style={{
                  display: "flex",
                  transition: "transform 0.5s ease-in-out",
                  transform: `translateX(-${currentSlide * 100}%)`,
                  height: "100%",
                }}
              >
                {slides.map((slide) => (
                  <div
                    key={slide.id}
                    style={{
                      minWidth: "100%",
                      height: "100%",
                      position: "relative",
                    }}
                  >
                    <img
                      src={slide.image}
                      alt={slide.location}
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        borderRadius: "8px 8px 0 0",
                      }}
                    />
                  </div>
                ))}
              </div>

              {/* Navigation Arrows - Hidden on mobile */}
              {!isMobile && (
                <>
                  <button
                    onClick={prevSlide}
                    style={{
                      position: "absolute",
                      left: "16px",
                      top: "50%",
                      transform: "translateY(-50%)",
                      backgroundColor: "rgba(255, 255, 255, 0.9)",
                      border: "none",
                      borderRadius: "50%",
                      width: "40px",
                      height: "40px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      cursor: "pointer",
                      boxShadow: "0 2px 8px rgba(0, 0, 0, 0.15)",
                      transition: "all 0.3s ease",
                      zIndex: 2,
                    }}
                    onMouseEnter={(e) => {
                      const target = e.target as HTMLButtonElement;
                      target.style.backgroundColor = "rgba(255, 255, 255, 1)";
                      target.style.transform = "translateY(-50%) scale(1.1)";
                    }}
                    onMouseLeave={(e) => {
                      const target = e.target as HTMLButtonElement;
                      target.style.backgroundColor = "rgba(255, 255, 255, 0.9)";
                      target.style.transform = "translateY(-50%) scale(1)";
                    }}
                  >
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 20 20"
                      fill="#262626"
                    >
                      <path
                        d="M12 15l-5-5 5-5"
                        stroke="#262626"
                        strokeWidth="2"
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </button>

                  <button
                    onClick={nextSlide}
                    style={{
                      position: "absolute",
                      right: "16px",
                      top: "50%",
                      transform: "translateY(-50%)",
                      backgroundColor: "rgba(255, 255, 255, 0.9)",
                      border: "none",
                      borderRadius: "50%",
                      width: "40px",
                      height: "40px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      cursor: "pointer",
                      boxShadow: "0 2px 8px rgba(0, 0, 0, 0.15)",
                      transition: "all 0.3s ease",
                      zIndex: 2,
                    }}
                  >
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 20 20"
                      fill="#262626"
                    >
                      <path
                        d="M8 15l5-5-5-5"
                        stroke="#262626"
                        strokeWidth="2"
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default CircuitCarteView;
