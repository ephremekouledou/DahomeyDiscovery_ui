import { useEffect, useState } from "react";
import "./Acceuil.css";
import backChevron from "../../assets/icons/backChevron.png";
import vector from "../../assets/icons/homeVector.png";
import vectorbrown from "../../assets/icons/vectorbrown.png";
import vectorPoint from "../../assets/icons/Vector.png";
import unity from "../../assets/images/unity.png";
import VideoBackground from "../../components/videoBackground/videoBackground";
import circuitImage from "../../assets/images/circuitImage.png";
import { Button, Divider, Flex, Typography } from "antd";
import Footer from "../../components/footer/footer";
import "../../assets/Fonts/font.css";
import { useLocation } from "react-router-dom";
import logo from "../../assets/images/Logo/logo-belge.png";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { useRef } from "react";
import { useAnimation } from "../../context/animationContext";

const Acceuil = () => {
  const [selectedCircuit, setSelectedCircuit] =
    useState<string>("Circuit Signature");
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
        gsap.set([".main-text", ".sub-text"], {
          y: 100,
        });
        gsap.set(".quote", {
          opacity: 0,
        });
        gsap.set(".btn-explore", {
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
        <div
          id="mask-wrapper"
          className="absolute z-0 inset-0 origin-center"
        >
          <Flex vertical>
            <section className="one">
              <VideoBackground />
            </section>

            <section className="two">
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
                align="flex-start"
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
                    lineHeight: "1.2",
                    margin: "0",
                    fontFamily: "DragonAngled",
                  }}
                >
                  Et si vous découvriez le Bénin avec sens
                </Typography.Title>
                <img
                  src={vector}
                  alt="Vector"
                  style={{
                    height: isMobile ? "1rem" : "2rem",
                    width: isMobile ? "9rem" : "15rem",
                    paddingLeft: isMobile ? "1rem" : "2rem",
                    marginLeft: "20vw",
                  }}
                />
              </Flex>
              <Flex
                vertical
                gap={isMobile ? "50px" : "100px"}
                style={{
                  padding: isMobile ? "0 4vw" : "0 8vw",
                  width: "100%",
                  paddingBottom: isMobile ? "13vw" : "13vw",
                }}
              >
                <Flex vertical>
                  <Flex
                    justify="space-between"
                    align="center"
                    style={{
                      maxWidth: isMobile ? "100%" : "1200px",
                      margin: "0 auto",
                      width: "100%",
                      height: isMobile ? "4rem" : "6rem",
                      backgroundColor:
                        selectedCircuit === "Circuit Signature"
                          ? "#fef5e6"
                          : "white",
                      padding: isMobile ? "0.8rem" : "1.5rem",
                      borderRadius: "0.3rem",
                    }}
                    onMouseEnter={() => setSelectedCircuit("Circuit Signature")}
                  >
                    <Flex align="center">
                      <Typography.Title
                        level={2}
                        style={{
                          color:
                            selectedCircuit === "Circuit Signature"
                              ? "#BF2500"
                              : "#411E1C",
                          fontSize: isMobile ? "2.2rem" : "4.5rem",
                          fontWeight: "200",
                          textAlign: "center",
                          paddingLeft: isMobile ? "0.8rem" : "1.5rem",
                          margin: "0",
                          fontFamily: "DragonAngled",
                        }}
                      >
                        Circuit Signature
                      </Typography.Title>
                    </Flex>
                    <img
                      src={circuitImage}
                      style={{
                        height: isMobile ? "5rem" : "15rem",
                        width: "auto",
                        paddingRight: isMobile ? "1rem" : "4rem",
                        maxWidth: isMobile ? "25vw" : "30vw",
                        display:
                          selectedCircuit === "Circuit Signature"
                            ? "block"
                            : "none",
                      }}
                      className="Accueil_image_2"
                      alt="Dahomey Discovery Logo"
                    />
                  </Flex>
                  {selectedCircuit !== "Circuit Signature" && <Divider />}
                </Flex>
                <Flex vertical>
                  <Flex
                    justify="space-between"
                    align="center"
                    style={{
                      maxWidth: isMobile ? "100%" : "1200px",
                      margin: "0 auto",
                      width: "100%",
                      height: isMobile ? "4rem" : "6rem",
                      backgroundColor:
                        selectedCircuit === "Circuits Thématiques"
                          ? "#fef5e6"
                          : "white",
                      padding: isMobile ? "0.8rem" : "1.5rem",
                      borderRadius: "0.3rem",
                    }}
                    onMouseEnter={() =>
                      setSelectedCircuit("Circuits Thématiques")
                    }
                  >
                    <Flex align="center">
                      <Typography.Title
                        level={2}
                        style={{
                          color:
                            selectedCircuit === "Circuits Thématiques"
                              ? "#BF2500"
                              : "#411E1C",
                          fontSize: isMobile ? "2.2rem" : "4.5rem",
                          fontFamily: "DragonAngled",
                          fontWeight: "200",
                          textAlign: "center",
                          paddingLeft: isMobile ? "0.8rem" : "1.5rem",
                          margin: "0",
                        }}
                      >
                        Circuits Thématiques
                      </Typography.Title>
                    </Flex>
                    <img
                      src={circuitImage}
                      style={{
                        height: isMobile ? "5rem" : "15rem",
                        width: "auto",
                        paddingRight: isMobile ? "1rem" : "4rem",
                        maxWidth: isMobile ? "25vw" : "30vw",
                        display:
                          selectedCircuit === "Circuits Thématiques"
                            ? "block"
                            : "none",
                      }}
                      className="Accueil_image_2"
                      alt="Dahomey Discovery Logo"
                    />
                  </Flex>
                  {selectedCircuit !== "Circuits Thématiques" && <Divider />}
                </Flex>
                <Flex vertical>
                  <Flex
                    justify="space-between"
                    align="center"
                    style={{
                      maxWidth: isMobile ? "100%" : "1200px",
                      margin: "0 auto",
                      width: "100%",
                      height: isMobile ? "4rem" : "6rem",
                      backgroundColor:
                        selectedCircuit === "Circuit à la carte"
                          ? "#fef5e6"
                          : "white",
                      padding: isMobile ? "0.8rem" : "1.5rem",
                      borderRadius: "0.3rem",
                    }}
                    onMouseEnter={() =>
                      setSelectedCircuit("Circuit à la carte")
                    }
                  >
                    <Flex align="center">
                      <Typography.Title
                        level={2}
                        style={{
                          color:
                            selectedCircuit === "Circuit à la carte"
                              ? "#BF2500"
                              : "#411E1C",
                          fontSize: isMobile ? "2.2rem" : "4.5rem",
                          fontFamily: "DragonAngled",
                          fontWeight: "200",
                          textAlign: "center",
                          paddingLeft: isMobile ? "0.8rem" : "1.5rem",
                          margin: "0",
                        }}
                      >
                        Circuit à la carte
                      </Typography.Title>
                    </Flex>
                    <img
                      src={circuitImage}
                      style={{
                        height: isMobile ? "5rem" : "15rem",
                        width: "auto",
                        paddingRight: isMobile ? "1rem" : "4rem",
                        maxWidth: isMobile ? "25vw" : "30vw",
                        display:
                          selectedCircuit === "Circuit à la carte"
                            ? "block"
                            : "none",
                      }}
                      className="Accueil_image_2"
                      alt="Dahomey Discovery Logo"
                    />
                  </Flex>
                  {selectedCircuit !== "Circuit à la carte" && <Divider />}
                </Flex>
              </Flex>
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

            <section className="four">
              <Flex
                vertical
                align="center"
                gap={isMobile ? "20px" : "40px"}
                style={{
                  padding: isMobile ? "3vh 4vw" : "5vh 5vw",
                  width: "100%",
                }}
                justify="center"
              >
                <Flex vertical align="center" gap="10px">
                  <Typography.Title
                    level={2}
                    style={{
                      color: "#3B1B19",
                      fontSize: isMobile ? "2.8rem" : "5rem",
                      fontFamily: "DragonAngled",
                      fontWeight: "800",
                      textAlign: "center",
                      margin: "0",
                    }}
                  >
                    Un accueil humain, ancré dans <br /> les réalités locales
                  </Typography.Title>
                  <img
                    src={vectorbrown}
                    alt="Vector"
                    style={{
                      width: isMobile ? "120px" : "auto",
                      height: "auto",
                    }}
                  />
                </Flex>
                <Flex
                  gap={isMobile ? "20px" : "50px"}
                  justify="center"
                  align="center"
                  vertical={isMobile}
                >
                  <Flex
                    vertical
                    justify="center"
                    align={isMobile ? "flex-start" : "center"}
                    gap={isMobile ? "15px" : "20px"}
                    style={{ order: isMobile ? 2 : 1 }}
                  >
                    <Flex
                      align="center"
                      style={{ width: "100%" }}
                      gap={isMobile ? "20px" : "30px"}
                    >
                      <img
                        src={vectorPoint}
                        style={{
                          width: isMobile ? "20px" : "3vw",
                          height: isMobile ? "20px" : "30px",
                          flexShrink: 0,
                        }}
                        alt="Vector Point"
                      />
                      <Typography.Text
                        style={{
                          color: "#3B1B19",
                          fontSize: isMobile ? "1rem" : "1.5rem",
                          marginLeft: isMobile ? "5px" : "10px",
                          fontFamily: "GeneralSans",
                        }}
                      >
                        Artisans, guides, <br /> restaurateurs, hôtes
                        <br /> disponibles
                      </Typography.Text>
                    </Flex>
                    <Flex
                      align="center"
                      style={{ width: "100%" }}
                      gap={isMobile ? "20px" : "30px"}
                    >
                      <img
                        src={vectorPoint}
                        style={{
                          width: isMobile ? "20px" : "3vw",
                          height: isMobile ? "20px" : "30px",
                          flexShrink: 0,
                        }}
                        alt="Vector Point"
                      />
                      <Typography.Text
                        style={{
                          color: "#3B1B19",
                          fontSize: isMobile ? "1rem" : "1.5rem",
                          marginLeft: isMobile ? "5px" : "10px",
                        }}
                      >
                        Privatisables ou en <br /> petits groupes
                      </Typography.Text>
                    </Flex>
                    <Flex
                      align="center"
                      style={{ width: "100%" }}
                      gap={isMobile ? "20px" : "30px"}
                    >
                      <img
                        src={vectorPoint}
                        style={{
                          width: isMobile ? "20px" : "3vw",
                          height: isMobile ? "20px" : "30px",
                          flexShrink: 0,
                        }}
                        alt="Vector Point"
                      />
                      <Typography.Text
                        style={{
                          color: "#3B1B19",
                          fontSize: isMobile ? "1rem" : "1.5rem",
                          marginLeft: isMobile ? "5px" : "10px",
                        }}
                      >
                        Programmes complets, <br /> équilibrés et prêts à vivre
                      </Typography.Text>
                    </Flex>
                    <Button
                      type="primary"
                      size={isMobile ? "middle" : "large"}
                      style={{
                        borderRadius: isMobile ? "32px" : "96px",
                        padding: isMobile ? "8px 16px" : "16px 32px",
                        minHeight: isMobile ? "40px" : "64px",
                        fontSize: isMobile ? "14px" : "18px",
                        backgroundColor: "#FF3100",
                        color: "white",
                        marginTop: isMobile ? "10px" : "0",
                        fontFamily: "GeneralSans",
                        transition: "all 0.3s ease",
                      }}
                      onMouseEnter={(e) => {
                        const target = e.target as HTMLButtonElement;
                        target.style.backgroundColor = "#b22200"; // Rose
                      }}
                      onMouseLeave={(e) => {
                        const target = e.target as HTMLButtonElement;
                        target.style.backgroundColor = "#FF3100"; // Orange original
                      }}
                    >
                      Réserver maintenant
                    </Button>
                  </Flex>
                  <img
                    src={unity}
                    alt="Unity"
                    className="unity-image"
                    style={{
                      order: isMobile ? 1 : 2,
                      maxWidth: isMobile ? "100%" : "auto",
                      height: isMobile ? "200px" : "auto",
                      objectFit: "contain",
                    }}
                  />
                </Flex>
              </Flex>
            </section>

            <Footer />
          </Flex>
        </div>
        {/* <div id="main" className="relative z-50 h-full">
          <div className="absolute top-2 left-1/2 -translate-x-1/2">
            <p className="quote">kcsldflsmk,fnjrkdfrdkslieslsjekfjsehjk</p>
          </div>

          <div className="h-full flex flex-col justify-center items-center leading-none">
            <div className="overflow-hidden">
              <h1 className="main-text text-[6rem] text-zinc-100">
                EXTRAORDINARY
              </h1>
            </div>
            <div className="overflow-hidden">
              <h1 className="sub-text text-6xl text-zinc-100">WORLD</h1>
            </div>
          </div>
          <div className="quote absolute bottom-4 left-4">
            <p className="text-3xl text-zinc-100 leading-none">
              "Your quote here"
            </p>
            <p className="text-3xl text-zinc-100 leading-none">
              "Your quote here"
            </p>
            <p className="text-3xl text-zinc-100 leading-none">
              "Your quote here"
            </p>
          </div>
          <div className="btn-explore absolute bottom-4 right-4">
            <button
              className="px-4 py-1 bg-zinc-100 text-black 
        cursor-pointer text-xl rounded hover:bg-transparent 
        hover:border-2 hover:border-zinc-100 hover:text-white"
            >
              {"EXPLORE =>"}
            </button>
          </div>
        </div> */}
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
