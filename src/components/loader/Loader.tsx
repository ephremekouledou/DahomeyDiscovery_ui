import bgVideo from "../../assets/videos/background.mp4";
import logo from "../../assets/images/Logo/logo-blanc.png";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { useRef } from "react";

export default function Loader() {
  const container = useRef(null);

  useGSAP(
    () => {
      gsap.set("#mask-wrapper", {
        clipPath: "polygon(50% 50%, 50% 50%, 50% 50%, 50% 50%)",
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
        // .to("#mask-wrapper", {
        //   rotate: "-90deg",
        //   duration: 1,
        //   ease: "sine.inOut",
        // })
        // .to(
        //   "#mask-video",
        //   {
        //     rotate: "90deg",
        //     duration: 1,
        //     ease: "sine.inOut",
        //   },
        //   "<-=0"
        // )
        .to("#mask-wrapper", {
          clipPath: "polygon(0% -60%, 100% -60%, 100% 160%, 0% 160%)",
          duration: 1,
          delay: 0.4,
          ease: "sine.inOut",
        })
        .to(
          ".main-text",
          {
            y: 0,
            duration: 1,
            ease: "sine.inOut",
          },
          "<+=0.2"
        )
        .to(
          ".sub-text",
          {
            y: 0,
            duration: 1,
            ease: "sine.inOut",
          },
          "<+=0.2"
        )
        .to(".quote", {
          opacity: 1,
          duration: 0.5,
          ease: "sine.inOut",
        })
        .to(".btn-explore", {
          opacity: 1,
          duration: 0.5,
          ease: "sine.inOut",
        });
    },
    { scope: container }
  );

  return (
    <>
      <div
        ref={container}
        className="h-screen relative bg-[#411e1c] overflow-hidden"
      >
        <div style={{ width: "100%" }}>
          <div
            style={{
              margin: "0 auto",
              width: "fit-content",
              position: "relative",
              top: "20vh",
            }}
          >
            <img src={logo} style={{ width: "160px", height: "auto" }} />
          </div>
        </div>

        <div
          style={{
            position: "absolute",
            top: "50vh",
            color: "white",
            fontSize: "4rem",
          }}
        >
          100 %
        </div>
        <div
          style={{
            position: "absolute",
            right: "0",
            top: "50vh",
            color: "white",
            fontSize: "4rem",
          }}
        >
          Locales
        </div>
        <div id="mask-wrapper" className="absolute z-0 inset-0 origin-center">
          <video
            autoPlay
            loop
            muted
            playsInline
            id="mask-video"
            className="w-full h-full object-cover"
          >
            <source src={bgVideo} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
        <div id="main" className="relative z-50 h-full">
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
        </div>
      </div>

      {/* <Flex vertical>
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
                onMouseEnter={() => setSelectedCircuit("Circuits Thématiques")}
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
                onMouseEnter={() => setSelectedCircuit("Circuit à la carte")}
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
      </Flex> */}
    </>
  );
}
