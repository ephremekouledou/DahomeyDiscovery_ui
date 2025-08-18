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
import VideoBackground from "../../components/videoBackground/videoBackground";
import { Flex, Typography } from "antd";
import Footer from "../../components/footer/footer";
import "../../assets/Fonts/font.css";
import { Link, useLocation } from "react-router-dom";
import logo from "../../assets/images/Logo/logo-belge.png";
// import { gsap } from "gsap";
// import { useGSAP } from "@gsap/react";
// import { useAnimation } from "../../context/animationContext";
import { CardBody, CardContainer, CardItem } from "../../components/ui/3d-card";
import ImageCarousel from "../../components/ImageGallery/ImageCarousel";
import signature from "../../assets/images/Accueil/Signature du circuit.webp";
import thematic from "../../assets/images/Accueil/Circuits thématiques.webp";
import alacarte from "../../assets/images/Accueil/Circuit à la carte.webp";
import img15 from "../../assets/images/15.jpg";
import img1 from "../../assets/images/Accueil/1_5.webp";
import img2 from "../../assets/images/Accueil/2_5.webp";
import img3 from "../../assets/images/Accueil/3_5.webp";
import img4 from "../../assets/images/Accueil/4_5.webp";
import img5 from "../../assets/images/Accueil/5_5.webp";
import fin from "../../assets/images/Accueil/fin.webp";
import BeginningButton from "../../components/dededed/BeginingButton";

// Constants moved outside component to prevent recreations
const IMAGES = [img1, img2, img3, img4, img5];

const BREAKPOINTS = {
  MOBILE: 768,
  TABLET: 1024,
} as const;

const TESTIMONIALS = [
  {
    id: 1,
    name: "Jenny Wilson",
    service: "Solar energy service",
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    avatar: "👩‍💼",
  },
  {
    id: 2,
    name: "Dianne Russell",
    service: "EV service",
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    avatar: "👩‍🦱",
  },
  {
    id: 3,
    name: "Cody Fisher",
    service: "Solar energy service",
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    avatar: "👨‍💼",
  },
  {
    id: 4,
    name: "Sarah Johnson",
    service: "Wind energy service",
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    avatar: "👩‍🔬",
  },
  {
    id: 5,
    name: "Mike Chen",
    service: "Battery storage service",
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    avatar: "👨‍🔧",
  },
  {
    id: 6,
    name: "Emma Davis",
    service: "Smart grid service",
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    avatar: "👩‍💻",
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
    description: "Découvrez nos circuits thématiques, une immersion dans la culture locale.",
    alt: "Circuit Thématiques",
    link: "/circuits-thematiques",
  },
  {
    imageUrl: alacarte,
    title: "Circuit à la carte",
    description: "Découvrez notre circuit à la carte, une expérience personnalisée.",
    alt: "Circuit à la carte",
    link: "/circuits-a-la-carte",
  },
] as const;

// Custom hook for screen size detection with debouncing
const useScreenSize = () => {
  const [screenSize, setScreenSize] = useState(() => {
    if (typeof window === "undefined") return "desktop";
    const width = window.innerWidth;
    return width < BREAKPOINTS.MOBILE
      ? "mobile"
      : width < BREAKPOINTS.TABLET
      ? "tablet"
      : "desktop";
  });

  const debouncedResize = useCallback(() => {
    let timeoutId: ReturnType<typeof setTimeout>;
    return () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        const width = window.innerWidth;
        const newSize =
          width < BREAKPOINTS.MOBILE
            ? "mobile"
            : width < BREAKPOINTS.TABLET
            ? "tablet"
            : "desktop";
        setScreenSize((prev) => (prev !== newSize ? newSize : prev));
      }, 100);
    };
  }, []);

  useEffect(() => {
    const handleResize = debouncedResize();
    window.addEventListener("resize", handleResize, { passive: true });
    return () => window.removeEventListener("resize", handleResize);
  }, [debouncedResize]);

  return useMemo(
    () => ({
      screenSize,
      isMobile: screenSize === "mobile",
      isTablet: screenSize === "tablet",
      isDesktop: screenSize === "desktop",
    }),
    [screenSize]
  );
};

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
              // aspectRatio: "5/7",
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

const ThematicCircuitCard = ({
  imageUrl,
  title,
  description,
  alt,
}: {
  imageUrl: string;
  title: string;
  description: string;
  alt: string;
  screenSize: string;
}) => {
  return (
    <>
      <div className="relative z-10 bg-white rounded-3xl p-0 shadow-2xl max-w-[400px] w-full overflow-hidden transform hover:scale-105 transition-transform duration-500">
        {/* Card image container */}
        <div className="w-full h-74 p-4 rounded-3xl">
          <img
            src={imageUrl}
            alt={alt}
            className="w-full h-full object-cover rounded-3xl"
            loading="lazy"
            decoding="async"
          />
        </div>

        {/* Text content */}
        <div className="p-8 bg-white pt-0">
            <h1
            className="text-3xl font-bold text-gray-900 mb-2 tracking-wider"
            style={{ fontFamily: "DragonAngled", letterSpacing: "0.05em" }}
            >
            {title}
            </h1>
          <div className="text-sm text-gray-700 font-medium tracking-wide" style={{ fontFamily: "GeneralSans" }}>
            {description}
          </div>
        </div>
      </div>
    </>
  );
};

// Optimized testimonial carousel with virtual scrolling concept
const TestimonialCarousel = React.memo(
  ({ screenSize }: { screenSize: string }) => {
    const [translateX, setTranslateX] = useState(0);
    const animationRef = useRef<number | null>(null);

    const config = useMemo(() => {
      const isMobile = screenSize === "mobile";
      const isTablet = screenSize === "tablet";

      return {
        cardWidth: isMobile ? 90 : isTablet ? 50 : 33.333,
        scrollSpeed: 0.05 /* isMobile ? 0.05 : isTablet ? 0.08 : 0.1 */,
        cardStyle: {
          minWidth: isMobile ? "320px" : isTablet ? "350px" : "400px",
          width: isMobile ? "85vw" : isTablet ? "45vw" : "30vw",
          maxWidth: isMobile ? "400px" : isTablet ? "450px" : "500px",
          height: isMobile ? "280px" : "300px",
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

    useEffect(() => {
      const animate = () => {
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
        animationRef.current = requestAnimationFrame(animate);
      };

      animationRef.current = requestAnimationFrame(animate);
      return () => {
        if (animationRef.current) {
          cancelAnimationFrame(animationRef.current);
        }
      };
    }, [config.scrollSpeed, config.cardWidth]);

    return (
      <div
        className="w-full"
        style={{
          // maxWidth: screenSize === 'mobile' ? "100%" : "1200px",
          margin: "0 auto",
        }}
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
                  className="bg-amber-50 rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-shadow duration-300 flex flex-col justify-between"
                  style={{
                    height: config.cardStyle.height,
                    margin: "0 auto",
                    maxWidth: config.cardStyle.maxWidth,
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
  const { screenSize, isMobile, isTablet } = useScreenSize();
  const { pathname } = useLocation();
  const container = useRef<HTMLDivElement>(null);
  // const { hasRun, setHasRun } = useAnimation();
  // const location = useLocation();

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
      fontSize: isMobile ? "2rem" : isTablet ? "3rem" : "4rem",
      top: isMobile ? "40vh" : isTablet ? "42vh" : "45vh",
    };

    return {
      logoPosition,
      logoDimensions,
      percentageLeft: {
        ...percentageStyles,
        left: isMobile ? "10vw" : isTablet ? "25vw" : "34vw",
      },
      percentageRight: {
        ...percentageStyles,
        right: isMobile ? "10vw" : isTablet ? "25vw" : "34vw",
      },
    };
  }, [isMobile, isTablet]);

  // Memoized animation styles
  const animationStyles = useMemo(
    () => `
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
    
    @media (prefers-reduced-motion: reduce) {
      .circuit-card-1, .circuit-card-2, .circuit-card-3 {
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

  // GSAP Animation
  // useGSAP(
  //   () => {
  //     const isFirstLoad = location.pathname === "/";
  //     if (!hasRun && isFirstLoad && container.current) {
  //       const timeline = gsap.timeline();

  //       gsap.set("#mask-wrapper", {
  //         position: "absolute",
  //         zIndex: 0,
  //         overflow: "hidden",
  //         clipPath: "polygon(50% 50%, 50% 50%, 50% 50%, 50% 50%)",
  //       });

  //       gsap.set(["#navBar", "#videoContent"], { opacity: 0 });

  //       timeline
  //         .to("#mask-wrapper", {
  //           clipPath: "polygon(40% 45%, 60% 45%, 60% 55%, 40% 55%)",
  //           duration: 2,
  //           ease: "sine.inOut",
  //         })
  //         .to("#mask-wrapper", {
  //           clipPath: "polygon(0% -60%, 100% -60%, 100% 160%, 0% 160%)",
  //           duration: 1,
  //           delay: 0.4,
  //           ease: "sine.inOut",
  //         })
  //         .set("#mask-wrapper", { height: "fit-content" })
  //         .to("#navBar", {
  //           opacity: 1,
  //           duration: 1.5,
  //           ease: "sine.inOut",
  //         }, "<+=0.2")
  //         .to("#videoContent", {
  //           opacity: 1,
  //           duration: 1.5,
  //           ease: "sine.inOut",
  //         }, "<+=0.7");

  //       setHasRun(true);
  //     }
  //   },
  //   { dependencies: [hasRun, location], scope: container }
  // );

  return (
    <div ref={container} className="h-screen relative bg-white">
      <div className="w-full">
        <div
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
      </div>

      <div style={styles.percentageLeft}>100 %</div>
      <div style={styles.percentageRight}>locales</div>

      <div id="mask-wrapper" className="absolute z-0 inset-0 origin-center">
        <BeginningButton />
        <Flex vertical gap={0}>
          <section className="one">
            <VideoBackground />
          </section>

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
                <style>{animationStyles}</style>
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
                      key={card.alt}
                      style={{
                        marginTop:
                          index === 1 && !isMobile
                            ? isTablet
                              ? "60px"
                              : "110px"
                            : "0px",
                      }}
                    >
                      <Link to={card.link}>
                        <div className={`circuit-card-${index + 1}`}>
                          {/* <CircuitCard
                            imageUrl={card.imageUrl}
                            title={card.title}
                            alt={card.alt}
                            screenSize={screenSize}
                          /> */}
                          <ThematicCircuitCard
                          imageUrl={card.imageUrl}
                          title={card.title}
                          description={card.description}
                          alt={card.alt}
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

          <section
            style={{
              height: isMobile ? "60vw" : isTablet ? "50vw" : "45vw",
              minHeight: "300px",
              // maxHeight: "600px"
            }}
          >
            <ImageCarousel images={IMAGES} />
          </section>

          <section className="four">
            <img
              src={fin}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
              }}
              alt="Image 4"
              loading="lazy"
              decoding="async"
            />
          </section>

          <Footer />
        </Flex>
      </div>
    </div>
  );
};

export default Acceuil;
