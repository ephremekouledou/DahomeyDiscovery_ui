import { useEffect, useState } from "react";
import "./Acceuil.css";
import backChevron from "../../assets/icons/backChevron.png";
import vector from "../../assets/icons/homeVector.png";
import VideoBackground from "../../components/videoBackground/videoBackground";
import { Flex, Typography } from "antd";
import Footer from "../../components/footer/footer";
import "../../assets/Fonts/font.css";
import { useLocation } from "react-router-dom";
import logo from "../../assets/images/Logo/logo-belge.png";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { useRef } from "react";
import { useAnimation } from "../../context/animationContext";
import { CardBody, CardContainer, CardItem } from "../../components/ui/3d-card";
import ImageCarousel from "../../components/ImageGallery/ImageCarousel";
import signature from "../../assets/images/Accueil/Circuit signature.webp";
import thematic from "../../assets/images/Accueil/Circuit thématique.webp";
import alacarte from "../../assets/images/Accueil/Circuit à la carte.webp";
import img15 from "../../assets/images/15.jpg";
import img1 from "../../assets/images/Accueil/1_5.webp";
import img2 from "../../assets/images/Accueil/2_5.webp";
import img3 from "../../assets/images/Accueil/3_5.webp";
import img4 from "../../assets/images/Accueil/4_5.webp";
import img5 from "../../assets/images/Accueil/5_5.webp";
import fin from "../../assets/images/Accueil/fin.webp";

const images = [
  img1,
  img2,
  img3,
  img4,
  img5,
];

type CircuitCardProps = {
  imageUrl: string;
  title: string;
  alt: string;
  isMobile: boolean;
};

const CircuitCard = ({ imageUrl, title, alt, isMobile }: CircuitCardProps) => {
  return (
    <>
      <CardContainer>
        <CardBody className="bg-white rounded-2xl shadow-lg overflow-hidden cursor-pointer">
          <CardItem
            className="relative overflow-hidden"
            style={{ aspectRatio: "5/7", height: "320px", width: "100%" }}
          >
            <img
              src={imageUrl}
              alt={alt}
              className="w-full h-full object-cover rounded-b-2xl group-hover/card:shadow-xl"
              style={{ objectFit: "cover", height: "100%", width: "100%" }}
            />
          </CardItem>
          {/* Title section */}
          <div style={{ display: "flex", justifyContent: "center" }}>
            <CardItem className="p-3">
              <Typography.Title
                level={2}
                style={{
                  color: "#3B1B19",
                  fontSize: isMobile ? "1.2rem" : "2.5rem",
                  fontWeight: "200",
                  textAlign: "center",
                  margin: "0",
                  fontFamily: "DragonAngled",
                }}
              >
                {title}
              </Typography.Title>
            </CardItem>
          </div>
        </CardBody>
      </CardContainer>
    </>
  );
};

const Acceuil = () => {
  const [isMobile, setIsMobile] = useState(false);
  const { pathname } = useLocation();

  const testimonials = [
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
  ];

  useEffect(() => {
    document.title = "Accueil";
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

  const container = useRef(null);
  const { hasRun, setHasRun } = useAnimation();
  const location = useLocation();

  // Style CSS pour les animations continues
  const continuousAnimationStyles = `
  @keyframes floatUp1 {
    0%, 100% { transform: translateY(0px); }
    50% { transform: translateY(-20px); }
  }
  
  @keyframes floatUp2 {
    0%, 100% { transform: translateY(0px); }
    50% { transform: translateY(-50px); }
  }
  
  @keyframes floatUp3 {
    0%, 100% { transform: translateY(0px); }
    50% { transform: translateY(-30px); }
  }
  
  .circuit-card-1 {
    animation: floatUp1 3s ease-in-out infinite;
  }
  
  .circuit-card-2 {
    animation: floatUp2 4s ease-in-out infinite 0.5s;
  }
  
  .circuit-card-3 {
    animation: floatUp3 3.5s ease-in-out infinite 1s;
  }
`;

  useGSAP(
    () => {
      const isFirstLoad = location.pathname === "/";
      if (!hasRun && isFirstLoad && container.current) {
        gsap.set("#mask-wrapper", {
          position: "absolute",
          zIndex: 0,
          overflow: "hidden",
        });
        gsap.set("#mask-wrapper", {
          clipPath: "polygon(50% 50%, 50% 50%, 50% 50%, 50% 50%)",
        });
        gsap.set("#navBar", {
          opacity: 0,
        });
        gsap.set("#videoContent", {
          opacity: 0,
        });

        const tl = gsap.timeline();
        tl.to("#mask-wrapper", {
          clipPath: "polygon(40% 45%, 60% 45%, 60% 55%, 40% 55%)",
          duration: 2,
          ease: "sine.inOut",
        })
          .to("#mask-wrapper", {
            clipPath: "polygon(0% -60%, 100% -60%, 100% 160%, 0% 160%)",
            duration: 1,
            delay: 0.4,
            ease: "sine.inOut",
          })
          .to("#mask-wrapper", {
            height: "fit-content",
          })
          .to(
            "#navBar",
            {
              opacity: 1,
              duration: 1.5,
              ease: "sine.inOut",
            },
            "<+=0.2"
          )
          .to(
            "#videoContent",
            {
              opacity: 1,
              duration: 1.5,
              ease: "sine.inOut",
            },
            "<+=0.7"
          );
        setHasRun(true);
      }
    },
    { dependencies: [hasRun, location], scope: container }
  );

  return (
    <>
      <div ref={container} className="h-screen relative bg-white">
        <div style={{ width: "100%" }}>
          <div
            style={{
              margin: "0 auto",
              width: "fit-content",
              position: "relative",
              top: "20vh",
            }}
          >
            <img src={logo} style={{ width: "80px", height: "auto" }} />
          </div>
        </div>

        <div
          style={{
            position: "absolute",
            top: "45vh",
            left: "34vw",
            color: "#411E1C",
            fontSize: "4rem",
            fontFamily: "DragonAngled",
          }}
        >
          100 %
        </div>
        <div
          style={{
            position: "absolute",
            top: "45vh",
            right: "34vw",
            color: "#411E1C",
            fontSize: "4rem",
            fontFamily: "DragonAngled",
          }}
        >
          locales
        </div>
        <div id="mask-wrapper" className="absolute z-0 inset-0 origin-center">
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
                position: "relative", // important pour l'overlay
              }}
            >
              {/* Overlay blanc semi-transparent */}
              <div
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: "100%",
                  backgroundColor: "rgba(255, 255, 255, 0.7)", // Ajuste l'opacité ici
                  zIndex: 1,
                }}
              />

              {/* Contenu principal au-dessus de l'overlay */}
              <div style={{ position: "relative", zIndex: 2 }}>
                <Flex>
                  <img
                    src={backChevron}
                    className="Accueil_image_2"
                    alt="Dahomey Discovery Logo"
                    style={{
                      width: isMobile ? "12rem" : "12vw",
                      height: "auto",
                    }}
                  />
                </Flex>

                <Flex
                  vertical
                  align="center"
                  gap={isMobile ? "0.5rem" : "1rem"}
                  style={{
                    margin: isMobile ? "0 4vw" : "0 5vw",
                    position: "relative",
                    bottom: isMobile ? "4rem" : "8rem",
                  }}
                >
                  <Typography.Title
                    level={1}
                    style={{
                      color: "#3B1B19",
                      fontSize: isMobile ? "3rem" : "5rem",
                      fontWeight: "800",
                      textAlign: "center",
                      lineHeight: "1",
                      margin: "0",
                      fontFamily: "DragonAngled",
                    }}
                  >
                    Et si vous découvriez
                    <br />
                    le Bénin avec sens
                  </Typography.Title>
                  <img
                    src={vector}
                    alt="Vector"
                    style={{
                      height: isMobile ? "1rem" : "2rem",
                      width: isMobile ? "5rem" : "10rem",
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
                    bottom: isMobile ? "4rem" : "8rem",
                  }}
                >
                  <style>{continuousAnimationStyles}</style>
                  <Flex
                    style={{ paddingTop: "0px" }}
                    gap={"50px"}
                    justify="center"
                    align="center"
                    vertical={isMobile}
                  >
                    <div className="circuit-card-1">
                      <CircuitCard
                        imageUrl={signature}
                        title="Circuit Signature"
                        alt="Circuit Signature"
                        isMobile={isMobile}
                      />
                    </div>

                    <Flex style={{ marginTop: isMobile ? "0px" : "110px" }}>
                      <div className="circuit-card-2">
                        <CircuitCard
                          imageUrl={thematic}
                          title="Circuits Thématiques"
                          alt="Circuit Thématiques"
                          isMobile={isMobile}
                        />
                      </div>
                    </Flex>

                    <div className="circuit-card-3">
                      <CircuitCard
                        imageUrl={alacarte}
                        title="Circuit à la carte"
                        alt="Circuit à la carte"
                        isMobile={isMobile}
                      />
                    </div>
                  </Flex>
                </Flex>
              </div>
            </section>

            <section className="three">
              <Flex
                vertical
                style={{ padding: "0 5vw", width: "100%" }}
                justify="center"
                align="center"
                gap="20px"
              >
                <Flex
                  align="center"
                  style={{
                    color: "white",
                    fontSize: "clamp(1.5rem, 5vw, 3rem)",
                    fontWeight: "800",
                    lineHeight: "1.2",
                    margin: "0",
                    width: "100%",
                    textAlign: "center",
                  }}
                >
                  <Typography.Title
                    style={{
                      color: "white",
                      fontSize: "clamp(1.5rem, 5vw, 5rem)",
                      fontWeight: "800",
                      lineHeight: "1.2",
                      fontFamily: "DragonAngled",
                      margin: "0",
                      width: "100%",
                      paddingBottom: "20px",
                    }}
                  >
                    Nos clients en parlent !
                  </Typography.Title>
                </Flex>
                <TestimonialCarousel testimonials={testimonials} />
              </Flex>
            </section>

            <section style={{ height: "45vw" }}>
              <ImageCarousel images={images} />
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
              />
            </section>

            <Footer />
          </Flex>
        </div>
      </div>
    </>
  );
};

type Testimonial = {
  id: number;
  name: string;
  service: string;
  text: string;
  avatar: string;
};

type TestimonialCarouselProps = {
  testimonials: Testimonial[];
};

const TestimonialCarousel: React.FC<TestimonialCarouselProps> = ({
  testimonials,
}) => {
  const [translateX, setTranslateX] = useState(0);
  const [_, setCurrentIndex] = useState(0);

  // Duplicate testimonials for infinite scroll
  const duplicatedTestimonials = [
    ...testimonials,
    ...testimonials,
    ...testimonials,
  ];
  const cardWidth = 33.333; // Width of each card in percentage
  const totalCards = testimonials.length;

  // Continuous scroll effect
  useEffect(() => {
    const interval = setInterval(() => {
      setTranslateX((prev) => {
        const newTranslateX = prev - 0.1; // Smooth continuous movement

        // Reset when we've scrolled through one full set
        if (Math.abs(newTranslateX) >= cardWidth * totalCards) {
          setCurrentIndex(0);
          return 0;
        }

        // Update current index for progress bar
        const newIndex = Math.floor(Math.abs(newTranslateX) / cardWidth);
        setCurrentIndex(newIndex);

        return newTranslateX;
      });
    }, 50); // Update every 50ms for smooth animation

    return () => clearInterval(interval);
  }, [cardWidth, totalCards]);

  // Calculate progress percentage
  const progressPercentage =
    ((Math.abs(translateX) % (cardWidth * totalCards)) /
      (cardWidth * totalCards)) *
    100;

  return (
    <div
      className="w-full" /* style={{ maxWidth: "1100px", margin: "0 auto" }} */
    >
      {/* Carousel Container */}
      <div className="overflow-hidden w-full">
        <div
          className="flex"
          style={{
            transform: `translateX(${translateX}%)`,
            transition: "none", // Remove transition for continuous movement
          }}
        >
          {duplicatedTestimonials.map((testimonial, index) => (
            <div
              key={`${testimonial.id}-${Math.floor(index / totalCards)}`}
              className="flex-shrink-0 w-1/4 px-3"
              style={{ minWidth: "400px" }}
            >
              <div className="bg-amber-50 rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-shadow duration-300 h-[300px] flex flex-col justify-between">
                {/* Testimonial Text */}
                <div className="mb-8">
                  <p
                    className="text-gray-700 text-sm leading-relaxed font-medium"
                    style={{ fontFamily: "GeneralSans", fontSize: "17px" }}
                  >
                    {testimonial.text}
                  </p>
                </div>

                {/* Profile Section */}
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-orange-400 to-amber-500 flex items-center justify-center text-xl shadow-md">
                    {testimonial.avatar}
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 text-sm">
                      {testimonial.name}
                    </h3>
                    <p className="text-gray-600 text-xs font-medium">
                      {testimonial.service}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Continuous Progress Bar */}
      <div className="mt-15 flex justify-center">
        <div className="w-full h-1 bg-[#FFFEFB] bg-opacity-50 rounded-full overflow-hidden">
          <div
            className="h-full bg-[#FF3100] rounded-full"
            style={{
              width: `${progressPercentage}%`,
              transition: "none",
            }}
          />
        </div>
      </div>
    </div>
  );
};
export default Acceuil;
