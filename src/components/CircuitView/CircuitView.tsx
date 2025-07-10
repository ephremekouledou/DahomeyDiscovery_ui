import { Divider, Flex, Typography } from "antd";
import { Card,  Tooltip } from "antd";
import { EnvironmentOutlined } from "@ant-design/icons";
const { Meta } = Card;
import { useLocation, useNavigate, useParams } from "react-router-dom";
import NavBar from "../navBar/navBar";
import Footer from "../footer/footer";
import React, { useState, useEffect } from "react";
import circuitImage from "../../assets/images/circuitImage.png";
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

interface CircuitCardProps {
  circuit: Circuit;
  clicked?: boolean;
  onClick?: () => void;
  isMobile: boolean;
}

const CircuitCard: React.FC<CircuitCardProps> = ({
  circuit,
  clicked,
  onClick,
  isMobile,
}) => {
  return (
    <Flex vertical style={{ backgroundColor: "white" }} onClick={onClick}>
      {/* Badge de durée - affiché uniquement pour le circuit sélectionné */}
      <Flex
        style={{
          backgroundColor: clicked ? "#FFE0D9" : "white",
          margin: isMobile ? "1vh 0 0 4vw" : "2vh 0 0 3vw",
          padding: isMobile ? "0.8vw" : "0.6vw",
          border: "1px solid #999791",
          borderRadius: "46px",
          width: "fit-content",
        }}
      >
        <Typography
          style={{
            fontSize: isMobile ? "12px" : "16px",
          }}
        >
          {circuit.duration}
        </Typography>
      </Flex>

      {/* Contenu principal du circuit */}
      <Flex vertical>
        <Typography.Title
          level={2}
          style={{
            color: "#411E1C",
            fontSize: isMobile ? "26px" : "63px",
            fontFamily: "DragonAngled",
            fontWeight: "300",
            paddingLeft: isMobile ? "8px" : "24px",
            margin: "0",
            lineHeight: isMobile ? "1.2" : "1.4",
            transition: "all 0.5s ease",
          }}
        >
          {circuit.name}
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
          {circuit.description}
        </Typography>
      </Flex>

      <Divider size="large" />
    </Flex>
  );
};

interface CircuitCardOtherProps {
  circuit: Circuit;
  isSelected: boolean;
  onHover: (circuitId: string) => void;
  showDivider: boolean;
  isMobile: boolean;
}

const CircuitOtherCard: React.FC<CircuitCardOtherProps> = ({
  circuit,
  isSelected,
  onHover,
  showDivider,
  isMobile,
}) => {
  const navigate = useNavigate();

  return (
    <Flex
      vertical
      style={{ backgroundColor: "white" }}
      onClick={() => navigate(`/circuits-thematiques/${circuit.id}`)}
      onMouseEnter={() => onHover(circuit.id)}
      onMouseLeave={() => onHover("")}
    >
      {/* Badge de durée - affiché uniquement pour le circuit sélectionné */}
      <Flex
        style={{
          backgroundColor: isSelected ? "#FFE0D9" : "white",
          margin: isMobile ? "1vh 0 0 4vw" : "2vh 0 0 3vw",
          padding: isMobile ? "0.8vw" : "0.6vw",
          border: "1px solid #999791",
          borderRadius: "46px",
          width: "fit-content",
          transition: "all 0.6s ease",
        }}
      >
        <Typography
          style={{
            fontSize: isMobile ? "12px" : "16px",
            fontFamily: "GeneralSans",
          }}
        >
          {circuit.duration}
        </Typography>
      </Flex>

      {/* Contenu principal du circuit */}
      <Flex
        justify="space-between"
        align="center"
        style={{
          width: "100%",
          backgroundColor: "white",
          padding: isMobile ? "12px" : "24px",
          borderRadius: "0.3rem",
          cursor: "pointer",
          height: isSelected ? "100%" : isMobile ? "80px" : "120px",
        }}
        onMouseEnter={() => onHover(circuit.id)}
      >
        <Flex vertical>
          <Typography.Title
            level={2}
            style={{
              color: isSelected ? "#BF2500" : "#411E1C",
              fontSize: isMobile ? "26px" : "58px",
              fontFamily: "DragonAngled",
              fontWeight: "300",
              paddingLeft: isMobile ? "8px" : "24px",
              margin: "0",
              lineHeight: isMobile ? "1.2" : "1.4",
              transition: "all 0.5s ease",
            }}
          >
            {circuit.name}
          </Typography.Title>
          {isSelected && (
            <Typography
              style={{
                color: "#311715",
                fontSize: isMobile ? "26px" : "18px",
                paddingLeft: isMobile ? "8px" : "25px",
                fontFamily: "GeneralSans",
                fontWeight: "300",
              }}
            >
              {circuit.description}
            </Typography>
          )}
        </Flex>

        {/* Image affichée uniquement pour le circuit sélectionné */}
        {isSelected && (
          <img
            src={circuitImage}
            style={{
              height: isMobile ? "5rem" : "15rem",
              width: "auto",
              paddingRight: isMobile ? "16px" : "64px",
              maxWidth: isMobile ? "40vw" : "30vw",
              position: "relative",
              bottom:
                circuit.id === "circuit-signature"
                  ? isMobile
                    ? "2vh"
                    : "4vh"
                  : "0",
            }}
            className="Accueil_image_2"
            alt={`${circuit.name} Logo`}
          />
        )}
      </Flex>

      {/* Divider affiché uniquement si le circuit n'est pas sélectionné */}
      {!isSelected && showDivider && <Divider size="large" />}
    </Flex>
  );
};

export const CircuitView = () => {
  const { id } = useParams();
  const [isMobile, setIsMobile] = useState(false);
  const [selectedCircuitId, setSelectedCircuitId] = useState<string>("");
  const { pathname } = useLocation();

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const handleCircuitHover = (circuitId: string) => {
    setSelectedCircuitId(circuitId);
  };

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

  return (
    <Flex justify="center" vertical>
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
        {/* Section des circuits - Responsive */}
        <Flex
          vertical
          gap="20px"
          style={{
            width: "100%",
            paddingBottom: isMobile ? "1vw" : "2vw",
          }}
        >
          {circuits
            .filter((circuit) => circuit.id === id)
            .map((circuit) => (
              <CircuitCard
                key={circuit.id}
                circuit={circuit}
                clicked={true}
                isMobile={isMobile}
              />
            ))}
        </Flex>
      </Flex>

      <Flex
        vertical
        style={{
          width: "100%",
          maxWidth: "1200px",
          margin: "0 auto",
          position: "relative",
          bottom: isMobile ? "1vw" : "3vw",
          zIndex: 100,
          marginTop: isMobile ? "2vw" : "4vw",
        }}
        gap={50}
      >
        <Flex justify="space-between" align="center">
          <Typography.Text
            style={{
              color: "#411E1C",
              fontFamily: "DragonAngled",
              padding: isMobile ? "1vw" : "0vw 0 0vw 1vw",
              fontSize: isMobile ? "24px" : "48px",
            }}
          >
            Itinéraire
          </Typography.Text>
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
        <TravelRoute />
        <CulturalExperience2 experiences={experiences} slides={slides} />
      </Flex>

      {/* Section autres circuits - Responsive */}
      <Flex style={{ backgroundColor: "#411E1C" }}>
        <Flex
          vertical
          gap="20px"
          style={{ width: "100%", maxWidth: "1300px", margin: "0 auto" }}
        >
          <Typography.Title
            level={1}
            style={{
              color: "white",
              fontFamily: "DragonAngled",
              padding: isMobile ? "1vw" : "3vw 0 0vw 1vw",
              fontSize: isMobile ? "24px" : "68px",
              fontWeight: "800",
            }}
          >
            Autres circuits thématiques
          </Typography.Title>
          <Flex
            vertical
            gap="10px"
            style={{
              width: "100%",
              padding: isMobile ? "0 4vw" : "0",
              paddingBottom: isMobile ? "4vw" : "7vw",
            }}
          >
            {circuits
              .filter((circuit) => circuit.id !== id)
              .map((circuit, index) => (
                <CircuitOtherCard
                  key={circuit.id}
                  circuit={circuit}
                  // clicked={false}
                  // onClick={() => navigate(`/circuits/${circuit.id}`)}
                  isSelected={selectedCircuitId === circuit.id}
                  onHover={handleCircuitHover}
                  showDivider={index < circuits.length - 1}
                  isMobile={isMobile}
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

// const CulturalExperience: React.FC<CulturalExperienceProps> = ({
//   experiences,
//   slides,
// }) => {
//   const [currentSlide, setCurrentSlide] = useState(0);
//   const [isPaused, setIsPaused] = useState(false);
//   const [touchStart, setTouchStart] = useState(null);
//   const [touchEnd, setTouchEnd] = useState(null);
//   const [isMobile, setIsMobile] = useState(false);
//   const intervalRef = useRef<number | null>(null);

//   // Check if mobile on mount and resize
//   useEffect(() => {
//     const checkMobile = () => {
//       setIsMobile(window.innerWidth < 768);
//     };
//     checkMobile();
//     window.addEventListener("resize", checkMobile);
//     return () => window.removeEventListener("resize", checkMobile);
//   }, []);

//   // Auto-play functionality
//   useEffect(() => {
//     if (!isPaused) {
//       intervalRef.current = setInterval(() => {
//         setCurrentSlide((prev) => (prev + 1) % slides.length);
//       }, 3000); // Change slide every 3 seconds
//     }

//     return () => {
//       if (intervalRef.current) {
//         clearInterval(intervalRef.current);
//       }
//     };
//   }, [isPaused, slides.length]);

//   const nextSlide = () => {
//     setCurrentSlide((prev) => (prev + 1) % slides.length);
//   };

//   const prevSlide = () => {
//     setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
//   };

//   // Touch handlers
//   const minSwipeDistance = 50;

//   const onTouchStart = (e: any) => {
//     setTouchEnd(null);
//     setTouchStart(e.targetTouches[0].clientX);
//   };

//   const onTouchMove = (e: any) => {
//     setTouchEnd(e.targetTouches[0].clientX);
//   };

//   const onTouchEnd = () => {
//     if (!touchStart || !touchEnd) return;

//     const distance = touchStart - touchEnd;
//     const isLeftSwipe = distance > minSwipeDistance;
//     const isRightSwipe = distance < -minSwipeDistance;

//     if (isLeftSwipe) {
//       nextSlide();
//     }
//     if (isRightSwipe) {
//       prevSlide();
//     }
//   };

//   return (
//     <div style={{}}>
//       <div
//         style={{
//           margin: "0 auto",
//           borderRadius: "8px",
//           boxShadow:
//             "0 1px 2px 0 rgba(0, 0, 0, 0.03), 0 1px 6px -1px rgba(0, 0, 0, 0.02), 0 2px 4px 0 rgba(0, 0, 0, 0.02)",
//           padding: isMobile ? "0 6vw" : "0 2vw",
//           paddingBottom: isMobile ? "3vw" : "5vw",
//         }}
//       >
//         <div
//           style={{
//             display: "grid",
//             gridTemplateColumns: isMobile ? "1fr" : "repeat(2, 1fr)",
//             gap: isMobile ? "24px" : "32px",
//             alignItems: "center",
//           }}
//         >
//           {/* Left Column - Experience List */}
//           <div style={{ paddingRight: isMobile ? "0" : "24px" }}>
//             {experiences.map((exp, index) => (
//               <div
//                 key={index}
//                 style={{
//                   display: "flex",
//                   alignItems: "flex-start",
//                   gap: isMobile ? "16px" : "15px",
//                   marginBottom:
//                     index < experiences.length - 1 ? "24px" : "32px",
//                 }}
//               >
//                 <span
//                   style={{
//                     fontSize: isMobile ? "24px" : "60px",
//                     fontWeight: "700",
//                     color: "#E85D3D",
//                     backgroundColor: "#FFE0D9",
//                     padding: isMobile ? "12px 6px" : "3px 5px",
//                     lineHeight: "1",
//                     fontFamily: "DragonAngled",
//                     flexShrink: 0,
//                   }}
//                 >
//                   {exp.number}
//                 </span>
//                 <p
//                   style={{
//                     color: "#262626",
//                     fontSize: isMobile ? "14px" : "18px",
//                     marginTop: isMobile ? "6px" : "8px",
//                     lineHeight: "1.6",
//                     fontFamily: "GeneralSans",
//                   }}
//                 >
//                   {exp.text}
//                 </p>
//               </div>
//             ))}

//             {/* Reserve Button - Responsive */}
//             <button
//               style={{
//                 backgroundColor: "#F39C12",
//                 color: "white",
//                 border: "none",
//                 borderRadius: "24px",
//                 padding: isMobile ? "10px 24px" : "12px 32px",
//                 fontSize: isMobile ? "14px" : "16px",
//                 fontWeight: "500",
//                 cursor: "pointer",
//                 transition: "all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1)",
//                 boxShadow: "0 2px 0 rgba(0, 0, 0, 0.045)",
//                 fontFamily: "GeneralSans",
//                 width: "fit-content",
//               }}
//               onMouseEnter={(e) => {
//                 const target = e.target as HTMLButtonElement;
//                 target.style.backgroundColor = "#ff3100"; // Rose
//                 target.style.color = "white";
//                 target.style.transform = "translateY(-2px)";
//                 target.style.boxShadow = "0 4px 8px rgba(0, 0, 0, 0.15)";
//               }}
//               onMouseLeave={(e) => {
//                 const target = e.target as HTMLButtonElement;
//                 target.style.backgroundColor = "#F59F00"; // Orange original
//                 target.style.color = "black";
//                 target.style.transform = "translateY(0)";
//                 target.style.boxShadow = "0 2px 0 rgba(0, 0, 0, 0.045)";
//               }}
//             >
//               RÉSERVER
//             </button>
//           </div>

//           {/* Right Column - Carousel - Responsive */}
//           <div
//             style={{
//               position: "relative",
//               marginTop: isMobile ? "32px" : "0",
//             }}
//             onMouseEnter={() => setIsPaused(true)}
//             onMouseLeave={() => setIsPaused(false)}
//           >
//             {/* Carousel Container */}
//             <div
//               style={{
//                 position: "relative",
//                 overflow: "hidden",
//                 borderRadius: "8px",
//                 boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
//                 height: isMobile ? "250px" : "450px",
//               }}
//               onTouchStart={onTouchStart}
//               onTouchMove={onTouchMove}
//               onTouchEnd={onTouchEnd}
//             >
//               {/* Carousel Track */}
//               <div
//                 style={{
//                   display: "flex",
//                   transition: "transform 0.5s ease-in-out",
//                   transform: `translateX(-${currentSlide * 100}%)`,
//                   height: "100%",
//                 }}
//               >
//                 {slides.map((slide) => (
//                   <div
//                     key={slide.id}
//                     style={{
//                       minWidth: "100%",
//                       height: "100%",
//                       position: "relative",
//                     }}
//                   >
//                     <img
//                       src={slide.image}
//                       alt={slide.location}
//                       style={{
//                         width: "100%",
//                         height: "100%",
//                         objectFit: "cover",
//                         borderRadius: "8px 8px 0 0",
//                       }}
//                     />
//                   </div>
//                 ))}
//               </div>

//               {/* Navigation Arrows - Hidden on mobile */}
//               {!isMobile && (
//                 <>
//                   <button
//                     onClick={prevSlide}
//                     style={{
//                       position: "absolute",
//                       left: "16px",
//                       top: "50%",
//                       transform: "translateY(-50%)",
//                       backgroundColor: "rgba(255, 255, 255, 0.9)",
//                       border: "none",
//                       borderRadius: "50%",
//                       width: "40px",
//                       height: "40px",
//                       display: "flex",
//                       alignItems: "center",
//                       justifyContent: "center",
//                       cursor: "pointer",
//                       boxShadow: "0 2px 8px rgba(0, 0, 0, 0.15)",
//                       transition: "all 0.3s ease",
//                       zIndex: 2,
//                     }}
//                     onMouseEnter={(e) => {
//                       const target = e.target as HTMLButtonElement;
//                       target.style.backgroundColor = "rgba(255, 255, 255, 1)";
//                       target.style.transform = "translateY(-50%) scale(1.1)";
//                     }}
//                     onMouseLeave={(e) => {
//                       const target = e.target as HTMLButtonElement;
//                       target.style.backgroundColor = "rgba(255, 255, 255, 0.9)";
//                       target.style.transform = "translateY(-50%) scale(1)";
//                     }}
//                   >
//                     <svg
//                       width="20"
//                       height="20"
//                       viewBox="0 0 20 20"
//                       fill="#262626"
//                     >
//                       <path
//                         d="M12 15l-5-5 5-5"
//                         stroke="#262626"
//                         strokeWidth="2"
//                         fill="none"
//                         strokeLinecap="round"
//                         strokeLinejoin="round"
//                       />
//                     </svg>
//                   </button>

//                   <button
//                     onClick={nextSlide}
//                     style={{
//                       position: "absolute",
//                       right: "16px",
//                       top: "50%",
//                       transform: "translateY(-50%)",
//                       backgroundColor: "rgba(255, 255, 255, 0.9)",
//                       border: "none",
//                       borderRadius: "50%",
//                       width: "40px",
//                       height: "40px",
//                       display: "flex",
//                       alignItems: "center",
//                       justifyContent: "center",
//                       cursor: "pointer",
//                       boxShadow: "0 2px 8px rgba(0, 0, 0, 0.15)",
//                       transition: "all 0.3s ease",
//                       zIndex: 2,
//                     }}
//                   >
//                     <svg
//                       width="20"
//                       height="20"
//                       viewBox="0 0 20 20"
//                       fill="#262626"
//                     >
//                       <path
//                         d="M8 15l5-5-5-5"
//                         stroke="#262626"
//                         strokeWidth="2"
//                         fill="none"
//                         strokeLinecap="round"
//                         strokeLinejoin="round"
//                       />
//                     </svg>
//                   </button>
//                 </>
//               )}
//             </div>

//             {/* Carousel Indicators */}
//             {/* <div
//               style={{
//                 display: "flex",
//                 justifyContent: "center",
//                 gap: "8px",
//                 marginTop: "16px",
//               }}
//             >
//               {slides.map((_, index) => (
//                 <button
//                   key={index}
//                   onClick={() => goToSlide(index)}
//                   style={{
//                     width: currentSlide === index ? "24px" : "8px",
//                     height: "8px",
//                     borderRadius: "4px",
//                     border: "none",
//                     backgroundColor:
//                       currentSlide === index ? "#F39C12" : "#d9d9d9",
//                     cursor: "pointer",
//                     transition: "all 0.3s ease",
//                     padding: 0,
//                   }}
//                 />
//               ))}
//             </div> */}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

const CulturalExperience2: React.FC<CulturalExperienceProps> = ({
  experiences,
}) => {
  const [isMobile, setIsMobile] = useState(false);

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
    <Flex
      style={{ backgroundColor: "#FFFBF3", padding: "30px" }}
      // align="center"
      justify="space-between"
      gap={isMobile ? "24px" : "32px"}
      wrap
    >
      {experiences.map((exp, index) => (
        <div
          key={index}
          style={{
            display: "flex",
            alignItems: "flex-start",
            gap: isMobile ? "16px" : "15px",
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
    </Flex>
  );
};

const TravelRoute = () => {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  const destinations = [
    {
      name: "Cotonou",
      subtitle: "La ville et la place de l'amazone",
      image:
        "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=300&h=200&fit=crop",
      position: { top: "360px", left: "112px" },
    },
    {
      name: "Ganvié",
      subtitle: "Village lacustre",
      image:
        "https://images.unsplash.com/photo-1571771710019-ca58cf80c304?w=300&h=200&fit=crop",
      position: { top: "200px", left: "308px" },
    },
    {
      name: "Ouidah",
      subtitle: "Route des esclaves et Porte du Non-Retour",
      image:
        "https://images.unsplash.com/photo-1565084888279-aca607ecce0c?w=300&h=200&fit=crop",
      position: { top: "280px", left: "504px" },
    },
    {
      name: "Porto-Novo",
      subtitle: "Artisanat royal et spirituel",
      image:
        "https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?w=300&h=200&fit=crop",
      position: { top: "440px", left: "700px" },
    },
    {
      name: "Possotomè",
      subtitle: "Lac Ahémé et sources thermales",
      image:
        "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=300&h=200&fit=crop",
      position: { top: "360px", left: "896px" },
    },
    {
      name: "Abomey",
      subtitle: "Palais royaux d'Abomey",
      image:
        "https://images.unsplash.com/photo-1577717903315-1691ae25ab3f?w=300&h=200&fit=crop",
      position: { top: "280px", left: "1092px" },
    },
    {
      name: "Dassa",
      subtitle: "Collines sacrées",
      image:
        "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=300&h=200&fit=crop",
      position: { top: "120px", left: "1288px" },
    },
  ];

  return (
    <Flex justify="center" gap={10} style={{ width: "100%" }} wrap>
      {destinations.map((destination, index) => (
        <Flex
          vertical
          align="center"
          gap={20}
          key={destination.name}
          style={{ width: "280px", flexShrink: 0 }}
        >
          {/* Location Pin */}
          <Tooltip title={destination.name} placement="top">
            <Flex
              justify="center"
              align="center"
              gap={10}
              style={{
                // ...getPinPosition(index),
                zIndex: 10,
              }}
              onMouseEnter={() => setHoveredCard(index)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              <Typography.Text
                style={{
                  fontFamily: "GeneralSans",
                  color: "#271211",
                  fontSize: "16px",
                }}
              >
                {index + 1}
              </Typography.Text>
              <Flex className="w-10 h-10 bg-amber-500 rounded-full flex items-center justify-center shadow-lg border-3 border-white hover:bg-amber-600 transition-all duration-200 hover:scale-110">
                <EnvironmentOutlined className="text-white text-base" />
              </Flex>
            </Flex>
          </Tooltip>
          {/* Destination Card */}
          <Flex
            style={{
              // top: getCardPosition(index).top,
              // left: getCardPosition(index).left,
              zIndex: hoveredCard === index ? 20 : 5,
              transform: hoveredCard === index ? "scale(1.08)" : "scale(1)",
              padding: hoveredCard === index ? "30px" : "0",
              transformOrigin: "center center",
            }}
          >
            <Card
              hoverable
              className={`transition-all duration-300 ${
                hoveredCard === index
                  ? "shadow-[0_20px_60px_rgba(0,0,0,0.15)]"
                  : "shadow-lg"
              }`}
              style={{
                width: hoveredCard === index ? 310 : 280,
                border: "1px solid #e5e7eb",
                borderRadius: "12px",
              }}
              cover={
                <Flex className="relative overflow-hidden rounded-t-lg">
                  <img
                    alt={destination.name}
                    src={destination.image}
                    className="w-full object-cover transition-all duration-300"
                    style={{
                      height: hoveredCard === index ? "176px" : "144px",
                    }}
                  />
                </Flex>
              }
              // actions={
              //   hoveredCard === index
              //     ? [
              //         <Button
              //           key="discover"
              //           type="primary"
              //           icon={<EyeOutlined />}
              //           size="large"
              //           style={{
              //             backgroundColor: "#f59e0b",
              //             borderColor: "#f59e0b",
              //           }}
              //           className="hover:bg-amber-600 hover:border-amber-600"
              //         >
              //           Découvrir
              //         </Button>,
              //       ]
              //     : []
              // }
              onMouseEnter={() => setHoveredCard(index)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              <Meta
                title={
                  <Typography.Text
                    style={{
                      fontFamily: "DragonAngled",
                      fontSize: hoveredCard !== index ? "36px" : "42px",
                      color: "#FF3100",
                    }}
                  >
                    {destination.name}
                  </Typography.Text>
                }
                description={
                  <Typography.Text
                    style={{
                      fontFamily: "GeneralSans",
                      fontSize: hoveredCard !== index ? "16px" : "20px",
                      color: "#271211",
                    }}
                  >
                    {destination.subtitle}
                  </Typography.Text>
                }
              />
            </Card>
          </Flex>
        </Flex>
      ))}
    </Flex>
  );
};

export default CircuitView;
