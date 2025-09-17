import React, {
  useEffect,
  useState,
  useRef,
  useMemo,
  useCallback,
} from "react";
import "./Acceuil.css";
import backChevron from "../../assets/icons/backChevron.png";
import vector from "../../assets/icons/homeVector.png";
import { Button, Flex, Typography } from "antd";
import Footer from "../../components/footer/footer";
import "../../assets/Fonts/font.css";
import { Link, useLocation } from "react-router-dom";
import logo from "/images/Logo/logo-belge.png";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { useAnimation } from "../../context/animationContext";
import { CardBody, CardContainer, CardItem } from "../../components/ui/3d-card";
import ImageCarousel from "../../components/ImageGallery/ImageCarousel";
import signature from "/images/Accueil/Signature du circuit.jpg";
import thematic from "/images/Accueil/Circuits thématiques.jpg";
import alacarte from "/images/Accueil/Circuit à la carte.jpg";
import img15 from "/images/15.jpg";
import BeginningButton from "../../components/dededed/BeginingButton";
import { ThematicCircuitCard } from "../../components/CircuitView/Card";
import {
  useFontLoadedRobust,
  useScreenSizeResponsive,
} from "../../components/CircuitView/Timeline";
import { PageSettings } from "../../sdk/api/pageMedias";
import { emptyIPageMedia, IPageMedia } from "../../sdk/models/pagesMedias";
import { HandleGetFileLink } from "../Circuits/CircuitsCartes";
import { FlipWords } from "../../components/ui/flip-words";
import NavBar from "../../components/navBar/navBar";

const TESTIMONIALS = [
  {
    id: 1,
    name: "LA STYLISTE BAROUDEUSE",
    service: "",
    text: "Une véritable expérience humaine ! Mon séjour au Bénin avec Dahomey Discovery a été parfaitement orchestré : découvertes, rencontres, paysages à couper le souffle… de Cotonou à Abomey en passant par Porto-Novo, Ganvié et Ouidah. Une équipe à l'écoute, pro et passionnée. Pour une immersion authentique et sereine, je recommande à 100 % !",
    avatar: "👩‍💼",
  },
  {
    id: 2,
    name: "Nathy & sa fille",
    service: "Martinique",
    text: "Nous étions déjà au Bénin, mais grâce à Dahomey Discovery, nous avons découvert une autre facette du pays. Des souvenirs inoubliables partagés en famille.",
    avatar: "👩‍💼",
  },
  {
    id: 3,
    name: "Serge",
    service: "Guyane",
    text: "À chaque voyage professionnel au Bénin, je fais appel à Dahomey Discovery. Accompagnement sérieux et sorties détente bien pensées. Un service complet et fiable.",
    avatar: "👨‍💼",
  },
  {
    id: 4,
    name: "Odette & son fils",
    service: "Montpellier",
    text: "J'ai réalisé mon rêve de découvrir le Bénin. Plus qu'un voyage, ce fut une immersion culturelle et humaine rendue possible grâce à une équipe attentionnée. Ce que j'ai particulièrement apprécié, c'est que cette famille travaille avec leurs enfants : mon fils s'est lié d'amitié avec le leur. Une expérience professionnelle et humaine à la fois.",
    avatar: "👨‍💼",
  },
] as const;

const CIRCUIT_CARDS = [
  {
    imageUrl: signature,
    title: "Circuit Signature",
    description: "Découvrez notre circuit signature, une expérience unique.",
    alt: "Circuit Signature",
    link: "/circuits-signature",
  },
  {
    imageUrl: thematic,
    title: "Circuits Thématiques",
    description:
      "Découvrez nos circuits thématiques, une immersion dans la culture locale.",
    alt: "Circuit Thématiques",
    link: "/circuits-thematiques",
  },
  {
    imageUrl: alacarte,
    title: "Circuit à la carte",
    description:
      "Découvrez notre circuit à la carte, une expérience personnalisée.",
    alt: "Circuit à la carte",
    link: "/circuits-a-la-carte",
  },
] as const;

// Memoized circuit card component
const CircuitCard = React.memo(
  ({
    imageUrl,
    title,
    alt,
    screenSize,
  }: {
    imageUrl: string;
    title: string;
    alt: string;
    screenSize: string;
  }) => {
    const dimensions = useMemo(() => {
      switch (screenSize) {
        case "mobile":
          return { height: "280px", width: "200px" };
        case "tablet":
          return { height: "300px", width: "220px" };
        default:
          return { height: "320px", width: "240px" };
      }
    }, [screenSize]);

    const fontSize = useMemo(() => {
      switch (screenSize) {
        case "mobile":
          return "1rem";
        case "tablet":
          return "1.4rem";
        default:
          return "2rem";
      }
    }, [screenSize]);

    return (
      <CardContainer>
        <CardBody className="bg-white w-full rounded-2xl shadow-lg overflow-hidden cursor-pointer">
          <CardItem
            className="relative overflow-hidden w-full"
            style={{
              height: dimensions.height,
              width: dimensions.width,
              maxWidth: "100%",
            }}
          >
            <img
              src={imageUrl}
              alt={alt}
              className="w-full h-full object-cover rounded-t-2xl group-hover/card:shadow-xl"
              loading="lazy"
              decoding="async"
              style={{ objectFit: "cover", height: "100%", width: "100%" }}
            />
          </CardItem>
          <div className="flex justify-center">
            <CardItem className="p-3">
              <Typography.Title
                level={2}
                style={{
                  color: "#3B1B19",
                  fontSize,
                  fontWeight: "200",
                  textAlign: "center",
                  margin: "0",
                  fontFamily: "DragonAngled",
                  lineHeight: 1.2,
                  maxWidth: dimensions.width,
                  wordWrap: "break-word",
                }}
              >
                {title}
              </Typography.Title>
            </CardItem>
          </div>
        </CardBody>
      </CardContainer>
    );
  }
);
CircuitCard.displayName = "CircuitCard";

// Optimized testimonial carousel with virtual scrolling concept
const TestimonialCarousel = React.memo(
  ({ screenSize }: { screenSize: string }) => {
    const [translateX, setTranslateX] = useState(0);
    const [isPaused, setIsPaused] = useState(false);
    const [_, setMaxCardHeight] = useState(0);
    const animationRef = useRef<number | null>(null);
    const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

    const config = useMemo(() => {
      const isMobile = screenSize === "mobile";
      const isTablet = screenSize === "tablet";

      return {
        cardWidth: isMobile ? 90 : isTablet ? 50 : 33.333,
        scrollSpeed: 0.05,
        cardStyle: {
          minWidth: isMobile ? "320px" : isTablet ? "350px" : "400px",
          width: isMobile ? "85vw" : isTablet ? "45vw" : "30vw",
          maxWidth: isMobile ? "400px" : isTablet ? "450px" : "500px",
          minHeight: isMobile ? "280px" : "300px",
        },
        fontSize: isMobile ? "14px" : isTablet ? "15px" : "17px",
      };
    }, [screenSize]);

    const duplicatedTestimonials = useMemo(
      () => [...TESTIMONIALS, ...TESTIMONIALS, ...TESTIMONIALS],
      []
    );

    const progressPercentage = useMemo(
      () =>
        ((Math.abs(translateX) % (config.cardWidth * TESTIMONIALS.length)) /
          (config.cardWidth * TESTIMONIALS.length)) *
        100,
      [translateX, config.cardWidth]
    );

    // Calculer la hauteur maximale des cartes
    useEffect(() => {
      const calculateMaxHeight = () => {
        const validCards = cardsRef.current.filter((card) => card !== null);
        if (validCards.length < TESTIMONIALS.length) {
          setTimeout(calculateMaxHeight, 50);
          return;
        }

        let maxHeight = 0;
        const minHeight = parseInt(config.cardStyle.minHeight);

        validCards.forEach((cardRef) => {
          if (cardRef) {
            cardRef.style.height = "auto";
            cardRef.style.minHeight = "auto";
          }
        });

        validCards.forEach((cardRef) => {
          if (cardRef) {
            cardRef.offsetHeight;
          }
        });

        validCards.forEach((cardRef) => {
          if (cardRef) {
            const cardHeight = cardRef.getBoundingClientRect().height;
            maxHeight = Math.max(maxHeight, cardHeight);
          }
        });

        const finalHeight = Math.max(maxHeight, minHeight);
        setMaxCardHeight(finalHeight);

        cardsRef.current.forEach((cardRef) => {
          if (cardRef) {
            cardRef.style.height = `${finalHeight}px`;
            cardRef.style.minHeight = `${finalHeight}px`;
          }
        });

        const allCards = document.querySelectorAll("[data-testimonial-card]");
        allCards.forEach((card) => {
          (card as HTMLElement).style.height = `${finalHeight}px`;
          (card as HTMLElement).style.minHeight = `${finalHeight}px`;
        });
      };

      const timer1 = setTimeout(calculateMaxHeight, 100);
      const timer2 = setTimeout(calculateMaxHeight, 300);
      const timer3 = setTimeout(calculateMaxHeight, 500);

      const handleResize = () => {
        setTimeout(calculateMaxHeight, 100);
      };

      window.addEventListener("resize", handleResize);

      return () => {
        clearTimeout(timer1);
        clearTimeout(timer2);
        clearTimeout(timer3);
        window.removeEventListener("resize", handleResize);
      };
    }, [config.cardStyle.minHeight, duplicatedTestimonials, screenSize]);

    useEffect(() => {
      const animate = () => {
        if (!isPaused) {
          setTranslateX((prev) => {
            const newTranslateX = prev - config.scrollSpeed;
            if (
              Math.abs(newTranslateX) >=
              config.cardWidth * TESTIMONIALS.length
            ) {
              return 0;
            }
            return newTranslateX;
          });
        }
        animationRef.current = requestAnimationFrame(animate);
      };

      animationRef.current = requestAnimationFrame(animate);
      return () => {
        if (animationRef.current) {
          cancelAnimationFrame(animationRef.current);
        }
      };
    }, [config.scrollSpeed, config.cardWidth, isPaused]);

    const handleMouseEnter = useCallback(() => {
      setIsPaused(true);
    }, []);

    const handleMouseLeave = useCallback(() => {
      setIsPaused(false);
    }, []);

    return (
      <div
        className="w-full"
        style={{
          margin: "0 auto",
        }}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <div className="overflow-hidden w-full">
          <div
            className="flex will-change-transform"
            style={{
              transform: `translate3d(${translateX}%, 0, 0)`,
            }}
          >
            {duplicatedTestimonials.map((testimonial, index) => (
              <div
                key={`${testimonial.id}-${Math.floor(
                  index / TESTIMONIALS.length
                )}`}
                className="flex-shrink-0 px-3"
                style={{
                  width: `${config.cardWidth}%`,
                  minWidth: config.cardStyle.minWidth,
                }}
              >
                <div
                  ref={(el) => {
                    const originalIndex = index % TESTIMONIALS.length;
                    if (!cardsRef.current[originalIndex]) {
                      cardsRef.current[originalIndex] = el;
                    }
                  }}
                  data-testimonial-card
                  className="bg-amber-50 rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-shadow duration-300 flex flex-col justify-between"
                  style={{
                    margin: "0 auto",
                    maxWidth: config.cardStyle.maxWidth,
                    minHeight: config.cardStyle.minHeight,
                  }}
                >
                  <div className={screenSize === "mobile" ? "mb-4" : "mb-8"}>
                    <p
                      className="text-gray-700 leading-relaxed font-medium"
                      style={{
                        fontFamily: "GeneralSans",
                        fontSize: config.fontSize,
                        lineHeight: 1.5,
                      }}
                    >
                      {testimonial.text}
                    </p>
                  </div>

                  <div className="flex items-center gap-3">
                    <div
                      className="rounded-full bg-gradient-to-br from-orange-400 to-amber-500 flex items-center justify-center shadow-md"
                      style={{
                        width: screenSize === "mobile" ? "40px" : "48px",
                        height: screenSize === "mobile" ? "40px" : "48px",
                        fontSize: screenSize === "mobile" ? "16px" : "20px",
                      }}
                    >
                      {testimonial.avatar}
                    </div>
                    <div>
                      <h3
                        className="font-bold text-gray-900"
                        style={{
                          fontSize: screenSize === "mobile" ? "12px" : "14px",
                        }}
                      >
                        {testimonial.name}
                      </h3>
                      <p
                        className="text-gray-600 font-medium"
                        style={{
                          fontSize: screenSize === "mobile" ? "10px" : "12px",
                        }}
                      >
                        {testimonial.service}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div
          className={`flex justify-center ${
            screenSize === "mobile" ? "mt-8" : "mt-15"
          }`}
        >
          <div
            className="h-1 bg-[#FFFEFB] bg-opacity-50 rounded-full overflow-hidden"
            style={{ width: screenSize === "mobile" ? "80%" : "100%" }}
          >
            <div
              className="h-full bg-[#FF3100] rounded-full will-change-transform"
              style={{
                transform: `scaleX(${progressPercentage / 100})`,
                transformOrigin: "left",
              }}
            />
          </div>
        </div>
      </div>
    );
  }
);
TestimonialCarousel.displayName = "TestimonialCarousel";

const Acceuil = () => {
  const { screenSize, isMobile, isTablet } = useScreenSizeResponsive();
  const { pathname } = useLocation();
  const container = useRef<HTMLDivElement>(null);
  const { isLoaded, hasRun, setHasRun, setIsLoaded } = useAnimation();
  const fontLoaded = useFontLoadedRobust();
  const location = useLocation();
  const [settings, SetSettings] = useState<IPageMedia>(emptyIPageMedia());

  // États pour gérer l'affichage et les composants video
  const [showLoader, setShowLoader] = useState(true);
  const [isHovered, setIsHovered] = useState(false);
  const [isSmallMobile, setIsSmallMobile] = useState(false);
  const [videoLoaded, setVideoLoaded] = useState(false);

  // Vérification responsive pour la video
  useEffect(() => {
    const checkResponsive = () => {
      const width = window.innerWidth;
      setIsSmallMobile(width < 480);
    };

    checkResponsive();
    window.addEventListener("resize", checkResponsive);
    return () => window.removeEventListener("resize", checkResponsive);
  }, []);

  // Memoized style calculations
  const styles = useMemo(() => {
    const logoPosition = isMobile ? "15vh" : isTablet ? "18vh" : "20vh";
    const logoDimensions = {
      width: isMobile ? "60px" : isTablet ? "70px" : "80px",
      height: "auto" as const,
    };

    const percentageStyles = {
      position: "absolute" as const,
      color: "#411E1C",
      fontFamily: "DragonAngled",
      fontSize: isMobile ? "1.8rem" : isTablet ? "2.5rem" : "3.5rem",
      fontWeight: "700",
      zIndex: 10,
      top: "50%",
      transform: "translateY(-50%)",
    };

    return {
      logoPosition,
      logoDimensions,
      percentageLeft: {
        ...percentageStyles,
        left: isMobile ? "5vw" : isTablet ? "15vw" : "20vw",
      },
      percentageRight: {
        ...percentageStyles,
        right: isMobile ? "5vw" : isTablet ? "15vw" : "20vw",
      },
      loaderContainer: {
        position: "absolute" as const,
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        zIndex: 15,
      },
    };
  }, [isMobile, isTablet]);

  // Video background styles
  const videoStyles = useMemo(() => {
    const getVectorDimensions = () => {
      if (isSmallMobile) {
        return { height: "24px", width: "120px", paddingRight: "12px" };
      }
      if (isMobile) {
        return { height: "28px", width: "140px", paddingRight: "16px" };
      }
      if (isTablet) {
        return { height: "40px", width: "200px", paddingRight: "24px" };
      }
      return { height: "64px", width: "288px", paddingRight: "40px" };
    };

    const getTitleFontSize = () => {
      if (isSmallMobile) {
        return "36px";
      }
      if (isMobile) {
        return "48px";
      }
      if (isTablet) {
        return "72px";
      }
      return "120px";
    };

    const getButtonStyles = () => {
      const baseStyles = {
        backgroundColor: isHovered ? "#ff3100" : "#F59F00",
        color: isHovered ? "white" : "black",
        border: "none",
        fontFamily: "GeneralSans",
        transition: "all 0.3s ease",
        fontWeight: "600",
        boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
      };

      if (isSmallMobile) {
        return {
          ...baseStyles,
          borderRadius: "24px",
          padding: "6px 12px",
          fontSize: "12px",
          minHeight: "36px",
          minWidth: "200px",
        };
      }
      if (isMobile) {
        return {
          ...baseStyles,
          borderRadius: "28px",
          padding: "8px 16px",
          fontSize: "14px",
          minHeight: "42px",
          minWidth: "240px",
        };
      }
      if (isTablet) {
        return {
          ...baseStyles,
          borderRadius: "48px",
          padding: "12px 24px",
          fontSize: "16px",
          minHeight: "52px",
          minWidth: "280px",
        };
      }
      return {
        ...baseStyles,
        borderRadius: "96px",
        padding: "16px 32px",
        fontSize: "18px",
        minHeight: "64px",
        minWidth: "320px",
      };
    };

    const getContainerPadding = () => {
      if (isSmallMobile) {
        return "12px";
      }
      if (isMobile) {
        return "16px";
      }
      if (isTablet) {
        return "24px";
      }
      return "32px";
    };

    const getFlexGap = () => {
      if (isSmallMobile) {
        return "4px";
      }
      if (isMobile) {
        return "8px";
      }
      if (isTablet) {
        return "12px";
      }
      return "16px";
    };

    const getTitleLineHeight = () => {
      if (isSmallMobile || isMobile) {
        return "0.9";
      }
      if (isTablet) {
        return "0.95";
      }
      return "1";
    };

    const getLetterSpacing = () => {
      if (isSmallMobile) {
        return "0.02em";
      }
      if (isMobile) {
        return "0.03em";
      }
      return "0.05em";
    };

    return {
      vectorDimensions: getVectorDimensions(),
      titleFontSize: getTitleFontSize(),
      buttonStyles: getButtonStyles(),
      containerPadding: getContainerPadding(),
      flexGap: getFlexGap(),
      titleLineHeight: getTitleLineHeight(),
      letterSpacing: getLetterSpacing(),
    };
  }, [isSmallMobile, isMobile, isTablet, isHovered]);

  // Styles CSS pour le loader et les animations
  const loaderAndAnimationStyles = useMemo(
    () => `
    /* Loader styles */
    .loading-spinner {
      width: ${isMobile ? "40px" : "50px"};
      height: ${isMobile ? "40px" : "50px"};
      border: 3px solid rgba(65, 30, 28, 0.2);
      border-top: 3px solid #411E1C;
      border-radius: 50%;
      animation: spin 1s linear infinite;
    }
    
    @keyframes spin {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }
    
    /* Animations pour les cartes */
    @keyframes floatUp1 {
      0%, 100% { transform: translateY(0px); }
      50% { transform: translateY(${
        isMobile ? "-10px" : isTablet ? "-15px" : "-20px"
      }); }
    }
    
    @keyframes floatUp2 {
      0%, 100% { transform: translateY(0px); }
      50% { transform: translateY(${
        isMobile ? "-25px" : isTablet ? "-35px" : "-50px"
      }); }
    }
    
    @keyframes floatUp3 {
      0%, 100% { transform: translateY(0px); }
      50% { transform: translateY(${
        isMobile ? "-15px" : isTablet ? "-20px" : "-30px"
      }); }
    }
    
    .circuit-card-1 {
      animation: floatUp1 3s ease-in-out infinite;
      will-change: transform;
    }
    
    .circuit-card-2 {
      animation: floatUp2 4s ease-in-out infinite 0.5s;
      will-change: transform;
    }
    
    .circuit-card-3 {
      animation: floatUp3 3.5s ease-in-out infinite 1s;
      will-change: transform;
    }

    /* Video Background Styles */
    .video-container {
      position: relative;
      width: 100%;
      display: flex;
      flex-direction: column;
    }

    .background-video {
      position: absolute !important;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      object-fit: cover;
      z-index: 1;
    }

    /* Ensure video covers properly on all devices */
    @media (max-aspect-ratio: 16/9) {
      .background-video {
        width: 100%;
        height: auto;
        min-height: 100%;
      }
    }

    @media (min-aspect-ratio: 16/9) {
      .background-video {
        width: auto;
        height: 100%;
        min-width: 100%;
      }
    }

    /* Button hover effects */
    .ant-btn:hover {
      transform: translateY(-2px);
      box-shadow: 0 6px 20px rgba(0,0,0,0.25) !important;
    }

    /* Prevent content overflow */
    #videoContent {
      max-width: 100%;
      overflow-x: hidden;
    }

    /* Ensure proper text rendering */
    .ant-typography {
      overflow-wrap: break-word;
      word-wrap: break-word;
    }
    
    @media (prefers-reduced-motion: reduce) {
      .circuit-card-1, .circuit-card-2, .circuit-card-3 {
        animation: none;
      }
      .loading-spinner {
        animation: none;
      }
    }
  `,
    [isMobile, isTablet]
  );

  // Effects
  useEffect(() => {
    document.title = "Accueil";
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  // Fonction pour gérer le chargement de la vidéo
  const handleVideoLoad = useCallback(() => {
    setVideoLoaded(true);
    setIsLoaded(true);
  }, [setIsLoaded]);

  // Fonction pour gérer les erreurs de chargement
  const handleVideoError = useCallback(() => {
    console.error("Erreur lors du chargement de la vidéo");
    setVideoLoaded(true);
    setIsLoaded(true);
  }, [setIsLoaded]);

  // Effet pour gérer l'affichage du loader
  useEffect(() => {
    if (isLoaded && fontLoaded && videoLoaded) {
      const timer = setTimeout(() => {
        setShowLoader(false);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [isLoaded, fontLoaded, videoLoaded]);

  useEffect(() => {
    PageSettings.List()
      .then((data) => {
        console.log("the settings are:", data);
        SetSettings(data);
      })
      .catch((err) => {
        console.error("Error fetching circuits:", err);
      });
  }, []);

  // Animation GSAP corrigée
  useGSAP(
    () => {
      const isFirstLoad = location.pathname === "/";

      // Toujours initialiser le masque à l'état fermé
      gsap.set("#mask-wrapper", {
        position: "absolute",
        zIndex: 0,
        overflow: "hidden",
        clipPath: "polygon(50% 50%, 50% 50%, 50% 50%, 50% 50%)",
      });

      // Également cacher le contenu tant que l'anim n'est pas prête
      gsap.set(["#navBar", "#videoContent"], { opacity: 0 });

      // Toujours afficher le logo et les pourcentages
      gsap.set(["#logo-container", "#percentage-left", "#percentage-right"], {
        opacity: 1,
      });

      // Ne lancer l'animation que si tout est prêt
      if (
        !hasRun &&
        isFirstLoad &&
        isLoaded &&
        fontLoaded &&
        videoLoaded &&
        !showLoader &&
        container.current
      ) {
        const timeline = gsap.timeline({
          onStart: () => {
            console.log("Animation start");
          },
          onComplete: () => {
            console.log("Animation complete");
          },
        });

        timeline
          // Affichage des éléments
          .set(["#logo-container", "#percentage-left", "#percentage-right"], {
            opacity: 1,
          })
          // Pause pour afficher logo et pourcentages
          .to({}, { duration: 1.5 })

          // Ouverture partielle du masque
          .to("#mask-wrapper", {
            clipPath: "polygon(40% 45%, 60% 45%, 60% 55%, 40% 55%)",
            duration: 1.5,
            ease: "power2.inOut",
          })

          // Ouverture complète
          .to("#mask-wrapper", {
            clipPath: "polygon(0% -60%, 100% -60%, 100% 160%, 0% 160%)",
            duration: 1.2,
            delay: 0.2,
            ease: "power2.inOut",
          })

          // Disparition logo et textes
          .to(
            ["#logo-container", "#percentage-left", "#percentage-right"],
            {
              opacity: 0,
              duration: 0.8,
              ease: "power2.inOut",
            },
            "<+=0.3"
          )

          // Révélation du contenu
          .set("#mask-wrapper", { height: "fit-content" })
          .to(
            "#navBar",
            { opacity: 1, duration: 1, ease: "power2.inOut" },
            "<+=0.2"
          )
          .to(
            "#videoContent",
            { opacity: 1, duration: 1, ease: "power2.inOut" },
            "<+=0.3"
          );

        setHasRun(true);
      }
    },
    {
      dependencies: [
        hasRun,
        location,
        isLoaded,
        fontLoaded,
        videoLoaded,
        showLoader,
      ],
      scope: container,
    }
  );

  const handleButtonClick = useCallback(() => {
    console.log("Navigate to experience selection");
    // Add your navigation logic here
  }, []);

  return (
    <div ref={container} className="h-screen relative bg-white">
      <style>{loaderAndAnimationStyles}</style>

      {/* Logo - toujours visible */}
      <div
        id="logo-container"
        style={{
          margin: "0 auto",
          width: "fit-content",
          position: "relative",
          top: styles.logoPosition,
        }}
      >
        <img
          src={logo}
          style={styles.logoDimensions}
          alt="Logo"
          loading="eager"
          decoding="async"
        />
      </div>

      {/* Pourcentages - toujours visibles */}
      <div id="percentage-left" style={styles.percentageLeft}>
        100 %
      </div>
      <div id="percentage-right" style={styles.percentageRight}>
        locales
      </div>

      {/* Loader - affiché entre les pourcentages pendant le chargement */}
      {(showLoader || settings._id === "" || !videoLoaded) && (
        <div style={styles.loaderContainer}>
          <div className="loading-spinner"></div>
        </div>
      )}

      {/* Contenu principal avec masque */}
      <div id="mask-wrapper" className="absolute z-0 inset-0 origin-center">
        <BeginningButton />
        <Flex vertical gap={0}>
          {/* Section vidéo - intégrée directement */}
          <section className="one">
            <div
              className="video-container"
              style={{
                position: "relative",
                width: "100%",
                height: "100vh",
                minHeight: isSmallMobile
                  ? "500px"
                  : isMobile
                  ? "600px"
                  : "700px",
                overflow: "hidden",
              }}
            >
              {/* Video Background */}
              {settings.banniere &&
                settings.banniere.length > 0 &&
                settings.banniere[0].file && (
                  <video
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="background-video"
                    onLoadedData={handleVideoLoad}
                    onError={handleVideoError}
                    style={{
                      position: "absolute",
                      top: "50%",
                      left: "50%",
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      transform: "translate(-50%, -50%)",
                      zIndex: 1,
                    }}
                  >
                    <source
                      src={HandleGetFileLink(
                        settings.banniere[0].file as string
                      )}
                      type="video/mp4"
                    />
                    Your browser does not support the video tag.
                  </video>
                )}

              {/* Overlay d'assombrissement */}
              <div
                className="video-overlay"
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: "100%",
                  backgroundColor: "rgba(0, 0, 0, 0.0)",
                  zIndex: 2,
                }}
              />

              {/* Navigation Bar */}
              <div
                id="navBar"
                className="relative flex items-center justify-center"
                style={{
                  zIndex: 30,
                  padding: isSmallMobile ? "4px" : isMobile ? "6px" : "8px",
                }}
              >
                <NavBar menu="ACCUEIL" />
              </div>

              {/* Main Content */}
              <div
                className="relative flex items-center justify-center text-white"
                style={{
                  zIndex: 20,
                  height: `calc(100vh - ${
                    isSmallMobile
                      ? "60px"
                      : isMobile
                      ? "70px"
                      : isTablet
                      ? "80px"
                      : "90px"
                  })`,
                  padding: `0 ${videoStyles.containerPadding}`,
                  maxWidth: "100%",
                }}
              >
                <Flex
                  vertical
                  gap={videoStyles.flexGap}
                  justify="center"
                  align="center"
                  style={{
                    textAlign: "center",
                    width: "100%",
                  }}
                  id="videoContent"
                >
                  {/* Vector and Title Container */}
                  <Flex
                    vertical
                    align="center"
                    style={{
                      width: "100%",
                      position: "relative",
                    }}
                  >
                    {/* Vector Image */}
                    <Flex
                      justify="flex-end"
                      style={{
                        width: "100%",
                        marginBottom: isSmallMobile ? "4px" : "8px",
                        position: "relative",
                        right: "30vw",
                      }}
                    >
                      <img
                        src={vector}
                        alt="Vector"
                        style={{
                          height: videoStyles.vectorDimensions.height,
                          width: videoStyles.vectorDimensions.width,
                          paddingRight:
                            videoStyles.vectorDimensions.paddingRight,
                          maxWidth: "90%",
                          objectFit: "contain",
                        }}
                      />
                    </Flex>

                    {/* Main Title */}
                    <Typography.Title
                      level={1}
                      style={{
                        color: "white",
                        fontSize: videoStyles.titleFontSize,
                        fontWeight: "1000",
                        lineHeight: videoStyles.titleLineHeight,
                        letterSpacing: videoStyles.letterSpacing,
                        margin: "0",
                        fontFamily: "DragonAngled",
                        textShadow: "2px 2px 4px rgba(0,0,0,0.5)",
                        wordBreak: isSmallMobile ? "break-word" : "normal",
                        hyphens: isSmallMobile ? "auto" : "none",
                      }}
                    >
                      {isSmallMobile ? (
                        <>
                          Reconnectez-vous à{" "}
                          <FlipWords
                            words={[
                              "la Terre Mère",
                              "vos racines",
                              "l'energie des ancestres",
                              "la vie",
                            ]}
                          />{" "}
                          !
                        </>
                      ) : (
                        <>
                          Reconnectez-vous à <br />
                          <FlipWords
                            words={[
                              "la Terre Mère",
                              "vos racines",
                              "l'energie des ancestres",
                              "la vie",
                            ]}
                          />{" "}
                          !
                        </>
                      )}
                    </Typography.Title>
                  </Flex>

                  {/* Call to Action Button */}
                  <div
                    style={{
                      marginTop: isSmallMobile
                        ? "16px"
                        : isMobile
                        ? "20px"
                        : isTablet
                        ? "24px"
                        : "32px",
                      width: "100%",
                      display: "flex",
                      justifyContent: "center",
                    }}
                  >
                    <Button
                      type="primary"
                      size="large"
                      style={videoStyles.buttonStyles}
                      onMouseEnter={() => setIsHovered(true)}
                      onMouseLeave={() => setIsHovered(false)}
                      onClick={handleButtonClick}
                    >
                      <span
                        style={{
                          whiteSpace: isSmallMobile ? "nowrap" : "normal",
                          textOverflow: "ellipsis",
                          overflow: "hidden",
                        }}
                      >
                        Je choisis mon expérience
                      </span>
                    </Button>
                  </div>
                </Flex>
              </div>
            </div>
          </section>

          {/* Section principale avec circuits */}
          <section
            className="two"
            style={{
              backgroundImage: `url(${img15})`,
              backgroundSize: "cover",
              backgroundRepeat: "no-repeat",
              backgroundPosition: "center",
              width: "100%",
              minHeight: "100vh",
              position: "relative",
            }}
          >
            {/* Overlay blanc */}
            <div
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                backgroundColor: "rgba(255, 255, 255, 0.7)",
                zIndex: 1,
              }}
            />

            {/* Contenu */}
            <div style={{ position: "relative", zIndex: 2 }}>
              <Flex>
                <img
                  src={backChevron}
                  className="Accueil_image_2"
                  alt="Dahomey Discovery Logo"
                  loading="lazy"
                  decoding="async"
                  style={{
                    width: isMobile ? "8rem" : isTablet ? "10rem" : "12vw",
                    height: "auto",
                    maxWidth: "200px",
                  }}
                />
              </Flex>

              {/* Titre principal */}
              <Flex
                vertical
                align="center"
                gap={isMobile ? "0.5rem" : "1rem"}
                style={{
                  margin: isMobile ? "0 2vw" : isTablet ? "0 4vw" : "0 5vw",
                  position: "relative",
                  bottom: isMobile ? "2rem" : isTablet ? "4rem" : "8rem",
                }}
              >
                <Typography.Title
                  level={1}
                  style={{
                    color: "#3B1B19",
                    fontSize: isMobile
                      ? "2.2rem"
                      : isTablet
                      ? "3.5rem"
                      : "5rem",
                    fontWeight: "800",
                    textAlign: "center",
                    lineHeight: "1.1",
                    margin: "0",
                    fontFamily: "DragonAngled",
                    padding: "0 1rem",
                  }}
                >
                  Et si vous découvriez
                  <br />
                  le Bénin avec sens
                </Typography.Title>
                <img
                  src={vector}
                  alt="Vector"
                  loading="lazy"
                  decoding="async"
                  style={{
                    height: isMobile ? "0.8rem" : isTablet ? "1.5rem" : "2rem",
                    width: isMobile ? "4rem" : isTablet ? "8rem" : "10rem",
                  }}
                />
              </Flex>

              {/* Cartes de circuits */}
              <Flex
                align="center"
                justify="center"
                style={{
                  maxWidth: "1500px",
                  width: "100%",
                  margin: "0 auto",
                  position: "relative",
                  bottom: isMobile ? "2rem" : isTablet ? "4rem" : "8rem",
                  padding: isMobile ? "0 1rem" : "0",
                }}
              >
                <Flex
                  style={{ paddingTop: "0px" }}
                  gap={isMobile ? "30px" : isTablet ? "40px" : "50px"}
                  justify="center"
                  align="center"
                  vertical={isMobile}
                  wrap={isTablet}
                >
                  {CIRCUIT_CARDS.map((card, index) => (
                    <Flex
                      key={card.title}
                      style={{
                        marginTop:
                          index === 1 && !isMobile
                            ? isTablet
                              ? "60px"
                              : "110px"
                            : "0px",
                      }}
                    >
                      <Link to={card.title}>
                        <div className={`circuit-card-${index + 1}`}>
                          <ThematicCircuitCard
                            imageUrl={card.imageUrl}
                            title={card.title}
                            description={card.description}
                            alt={card.title}
                            screenSize={screenSize}
                          />
                        </div>
                      </Link>
                    </Flex>
                  ))}
                </Flex>
              </Flex>
            </div>
          </section>

          {/* Section témoignages */}
          <section
            className="three"
            style={{
              padding: isMobile
                ? "2rem 1rem"
                : isTablet
                ? "3rem 2rem"
                : "4rem 5vw",
            }}
          >
            <Flex
              vertical
              style={{ width: "100%" }}
              justify="center"
              align="center"
              gap={isMobile ? "15px" : "20px"}
            >
              <Typography.Title
                style={{
                  color: "white",
                  fontSize: isMobile ? "2rem" : isTablet ? "3.5rem" : "5rem",
                  fontWeight: "800",
                  lineHeight: "1.2",
                  fontFamily: "DragonAngled",
                  margin: "0",
                  width: "100%",
                  textAlign: "center",
                  paddingBottom: isMobile ? "10px" : "20px",
                }}
              >
                Nos clients en parlent !
              </Typography.Title>

              <TestimonialCarousel screenSize={screenSize} />
            </Flex>
          </section>

          {/* Section carrousel d'images */}
          <section
            style={{
              height: isMobile ? "60vw" : isTablet ? "50vw" : "45vw",
              minHeight: "300px",
            }}
          >
            {settings.acceuil_carrousel &&
              settings.acceuil_carrousel.length > 0 &&
              settings.acceuil_carrousel[0].file !== null && (
                <ImageCarousel
                  images={settings.acceuil_carrousel.map((item) =>
                    HandleGetFileLink(item.file as string)
                  )}
                />
              )}
          </section>

          {/* Section finale */}
          <section className="four">
            {settings.acceuil_image_fin &&
              settings.acceuil_image_fin.length > 0 &&
              settings.acceuil_image_fin[0].file !== null && (
                <img
                  src={HandleGetFileLink(
                    settings.acceuil_image_fin[0].file as string
                  )}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                  }}
                  alt="Image 4"
                  loading="lazy"
                  decoding="async"
                />
              )}
          </section>

          <Footer />
        </Flex>
      </div>
    </div>
  );
};

export default Acceuil;
