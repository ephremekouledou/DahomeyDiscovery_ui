import { Button, Flex, Typography } from "antd";
import { useEffect, useState } from "react";
import bgVideo from "../../assets/videos/bannieCoupe.mp4"
import vector from "../../assets/icons/homeVector.png";
import NavBar from "../navBar/navBar";
import "../../assets/Fonts/font.css";
import { FlipWords } from "../ui/flip-words";

const VideoBackground = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);
  const [isSmallMobile, setIsSmallMobile] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [_, setScreenHeight] = useState(0);

  useEffect(() => {
    const checkResponsive = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;

      setIsSmallMobile(width < 480);
      setIsMobile(width < 768);
      setIsTablet(width >= 768 && width <= 1024);
      setScreenHeight(height);
    };

    checkResponsive();
    window.addEventListener("resize", checkResponsive);
    return () => window.removeEventListener("resize", checkResponsive);
  }, []);

  // Get responsive vector image dimensions
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

  // Get responsive title font size
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

  // Get responsive button styles
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

  // Get responsive container padding
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

  // Get responsive gaps
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

  // Get responsive margin for title
  const getTitleMargin = () => {
    if (isSmallMobile) {
      return "2px";
    }
    if (isMobile) {
      return "4px";
    }
    if (isTablet) {
      return "8px";
    }
    return "12px";
  };

  // Get responsive line height
  const getTitleLineHeight = () => {
    if (isSmallMobile || isMobile) {
      return "0.9";
    }
    if (isTablet) {
      return "0.95";
    }
    return "1";
  };

  // Get responsive letter spacing
  const getLetterSpacing = () => {
    if (isSmallMobile) {
      return "0.02em";
    }
    if (isMobile) {
      return "0.03em";
    }
    return "0.05em";
  };

  const vectorDimensions = getVectorDimensions();
  const buttonStyles = getButtonStyles();

  return (
    <div
      className="video-container"
      style={{
        position: "relative",
        width: "100%",
        height: "100vh",
        minHeight: isSmallMobile ? "500px" : isMobile ? "600px" : "700px",
        overflow: "hidden",
      }}
    >
      {/* Video Background */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="background-video"
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
        <source src={bgVideo} type="video/mp4" />
        Your browser does not support the video tag.
      </video>

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
          padding: `0 ${getContainerPadding()}`,
          maxWidth: "100%",
        }}
      >
        <Flex
          vertical
          gap={getFlexGap()}
          justify="center"
          align="center"
          style={{
            textAlign: "center",
            width: "100%",
            // maxWidth: isSmallMobile
            //   ? "320px"
            //   : isMobile
            //   ? "400px"
            //   : isTablet
            //   ? "600px"
            //   : "900px",
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
                  height: vectorDimensions.height,
                  width: vectorDimensions.width,
                  paddingRight: vectorDimensions.paddingRight,
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
                marginLeft: getTitleMargin(),
                fontSize: getTitleFontSize(),
                fontWeight: "1000",
                lineHeight: getTitleLineHeight(),
                letterSpacing: getLetterSpacing(),
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
              style={buttonStyles}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
              onClick={() => {
                // Add your navigation logic here
                console.log("Navigate to experience selection");
              }}
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

      {/* Responsive CSS for additional styling */}
      <style>{`
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

        /* Typography responsiveness */
        @media (max-width: 479px) {
          .ant-typography h1 {
            font-size: 36px !important;
            line-height: 0.9 !important;
          }
        }

        @media (min-width: 480px) and (max-width: 767px) {
          .ant-typography h1 {
            font-size: 48px !important;
            line-height: 0.9 !important;
          }
        }

        @media (min-width: 768px) and (max-width: 1024px) {
          .ant-typography h1 {
            font-size: 72px !important;
            line-height: 0.95 !important;
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
      `}</style>
    </div>
  );
};

export default VideoBackground;
