import { Divider, Flex, Typography } from "antd";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import NavBar from "../navBar/navBar";
import Footer from "../footer/footer";
import React, { useState, useEffect, useRef } from "react";
import image1 from "../../assets/images/img1.jpeg";
import image2 from "../../assets/images/img2.jpg";
import image3 from "../../assets/images/img3.jpg";

// Types
interface Circuit {
  id: string;
  name: string;
  duration: string;
  description?: string;
}

// Composant réutilisable pour un circuit
interface CircuitCardProps {
  circuit: Circuit;
  clicked?: boolean;
  onClick?: () => void;
}

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

const CircuitCard: React.FC<CircuitCardProps> = ({
  circuit,
  clicked,
  onClick,
}) => {
  return (
    <Flex vertical style={{ backgroundColor: "white" }} onClick={onClick}>
      {/* Badge de durée - affiché uniquement pour le circuit sélectionné */}

      <Flex
        style={{
          backgroundColor: clicked ? "#FFE0D9" : "white",
          margin: "2vh 0 0 3vw",
          padding: "0.6vw",
          border: "1px solid #999791",
          borderRadius: "46px",
          width: "fit-content",
        }}
      >
        <Typography style={{ fontSize: "clamp(0.3rem, 1.5vw, 2rem)" }}>
          {circuit.duration}
        </Typography>
      </Flex>

      {/* Contenu principal du circuit */}
      <Flex
        justify="space-between"
        align="center"
        style={{
          width: "100%",
          height: "clamp(3rem, 10vh, 6rem)",
          backgroundColor: "white",
          padding: "clamp(0.5rem, 2vw, 1.5rem)",
          borderRadius: "0.3rem",
          cursor: "pointer",
        }}
      >
        <Flex align="center">
          <Typography.Title
            level={2}
            style={{
              color: "#411E1C",
              fontSize: "clamp(0.3rem, 2vw, 2.5rem)",
              textAlign: "center",
              paddingLeft: "clamp(0.5rem, 2vw, 1.5rem)",
              margin: "0",
            }}
          >
            {circuit.name}
          </Typography.Title>
        </Flex>
      </Flex>

      <Divider size="large" />
    </Flex>
  );
};

export const CircuitView = () => {
  const { id } = useParams();
  const [isMobile, setIsMobile] = useState(false);
  const navigate = useNavigate();
  const { pathname } = useLocation();

  // Configuration centralisée des circuits
  const circuits: Circuit[] = [
    {
      id: "circuit-signature",
      name: "Esprit des Femmes - Féminin sacré et créatif",
      duration: "9 jours / 8 nuits",
      description: "Groupes de femmes, voyages entre amies, militantes",
    },
    {
      id: "circuits-thematiques",
      name: "Immersion & Savoir-Faire",
      duration: "9 jours / 8 nuits",
      description: "Circuits spécialisés selon vos centres d'intérêt",
    },
    {
      id: "circuit-a-la-carte",
      name: "Spiritualité & Traditions Vodoun",
      duration: "9 jours / 8 nuits",
      description: "Créez votre propre parcours personnalisé",
    },
    {
      id: "circuit",
      name: "Racines & Héritage sur les traces de l'histoire",
      duration: "9 jours / 8 nuits",
      description: "Créez votre propre parcours personnalisé",
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

  // Check if mobile on mount and resize
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  return (
    <Flex justify="center" vertical>
      {/* Header avec NavBar */}
      <div
        className="relative z-20 flex items-center justify-center p-8"
        style={{ backgroundColor: "#FEF1D9", paddingBottom: "7vw" }}
      >
        <NavBar menu="CIRCUITS" />
      </div>

      {/* Contenu principal */}
      <Flex
        style={{ width: "100%", padding: "3vh 0", paddingBottom: "0vh" }}
        vertical
        gap={0}
      >
        {/* Section des circuits */}
        <Flex
          vertical
          gap="20px"
          style={{
            padding: "0 7vw",
            width: "100%",
            paddingBottom: "2vw",
            // position: "relative",
            // bottom: "7vh",
          }}
        >
          {circuits
            .filter((circuit) => circuit.id === id)
            .map((circuit) => (
              <CircuitCard key={circuit.id} circuit={circuit} clicked={true} />
            ))}
        </Flex>
        {/* Section de l'expérience culturelle */}
        <CulturalExperience experiences={experiences} slides={slides} />
        <Flex style={{ backgroundColor: "#411E1C" }} vertical gap="20px">
          <Typography.Title
            level={1}
            style={{
              color: "white",
              padding: "5vw",
              fontSize: isMobile ? "32px" : "48px",
              fontWeight: "800",
            }}
          >
            Autres circuits thématiques
          </Typography.Title>
          <Flex
            vertical
            gap="10px"
            style={{ width: "100%", padding: "0 7vw", paddingBottom: "7vw" }}
          >
            {circuits
              .filter((circuit) => circuit.id !== id)
              .map((circuit) => (
                <CircuitCard
                  key={circuit.id}
                  circuit={circuit}
                  clicked={false}
                  onClick={() => navigate(`/circuits/${circuit.id}`)}
                />
              ))}
          </Flex>
        </Flex>
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

  const goToSlide = (index: any) => {
    setCurrentSlide(index);
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

  // Responsive styles
  const gridColumns = isMobile ? "1fr" : "repeat(2, 1fr)";
  const experienceGap = isMobile ? "16px" : "24px";
  const numberFontSize = isMobile ? "32px" : "48px";
  const textFontSize = isMobile ? "16px" : "18px";
  const carouselHeight = isMobile ? "300px" : "450px";

  return (
    <div style={{}}>
      <div
        style={{
          margin: "0 auto",
          borderRadius: "8px",
          boxShadow:
            "0 1px 2px 0 rgba(0, 0, 0, 0.03), 0 1px 6px -1px rgba(0, 0, 0, 0.02), 0 2px 4px 0 rgba(0, 0, 0, 0.02)",
          padding: "0 10vw",
          paddingBottom: "5vw",
        }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: gridColumns,
            gap: "32px",
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
                  gap: experienceGap,
                  marginBottom:
                    index < experiences.length - 1 ? "24px" : "32px",
                }}
              >
                <span
                  style={{
                    fontSize: numberFontSize,
                    fontWeight: "700",
                    color: "#E85D3D",
                    backgroundColor: "#FFE0D9",
                    padding: "16px 8px",
                    lineHeight: "1",
                    fontFamily:
                      '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial',
                    flexShrink: 0,
                  }}
                >
                  {exp.number}
                </span>
                <p
                  style={{
                    color: "#262626",
                    fontSize: textFontSize,
                    marginTop: "8px",
                    lineHeight: "1.6",
                    fontFamily:
                      '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial',
                  }}
                >
                  {exp.text}
                </p>
              </div>
            ))}

            {/* Reserve Button */}
            <button
              style={{
                backgroundColor: "#F39C12",
                color: "white",
                border: "none",
                borderRadius: "24px",
                padding: "12px 32px",
                fontSize: "16px",
                fontWeight: "500",
                cursor: "pointer",
                transition: "all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1)",
                boxShadow: "0 2px 0 rgba(0, 0, 0, 0.045)",
                fontFamily:
                  '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial',
                width: "fit-content",
              }}
              onMouseEnter={(e) => {
                const target = e.target as HTMLButtonElement;
                target.style.backgroundColor = "#E67E22";
                target.style.transform = "translateY(-2px)";
                target.style.boxShadow = "0 4px 8px rgba(0, 0, 0, 0.15)";
              }}
              onMouseLeave={(e) => {
                const target = e.target as HTMLButtonElement;
                target.style.backgroundColor = "#F39C12";
                target.style.transform = "translateY(0)";
                target.style.boxShadow = "0 2px 0 rgba(0, 0, 0, 0.045)";
              }}
            >
              RÉSERVER
            </button>
          </div>

          {/* Right Column - Carousel */}
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
                height: carouselHeight,
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

            {/* Carousel Indicators */}
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                gap: "8px",
                marginTop: "16px",
              }}
            >
              {slides.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  style={{
                    width: currentSlide === index ? "24px" : "8px",
                    height: "8px",
                    borderRadius: "4px",
                    border: "none",
                    backgroundColor:
                      currentSlide === index ? "#F39C12" : "#d9d9d9",
                    cursor: "pointer",
                    transition: "all 0.3s ease",
                    padding: 0,
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
