import { Button, Flex, Typography } from "antd";
import { useEffect, useState } from "react";
import bgVideo from "../../assets/videos/background.mp4";
import vector from "../../assets/icons/homeVector.png";
import NavBar from "../navBar/navBar";
import "../../assets/Fonts/font.css";

const VideoBackground = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  return (
    <div className="video-container">
      <video autoPlay loop muted playsInline className="background-video">
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
          backgroundColor: "rgba(0, 0, 0, 0.6)", // Filtre noir avec 60% d'opacité
          zIndex: 10,
        }}
      />
      <div className="relative z-20 flex items-center justify-center p-8">
        <NavBar menu="ACCUEIL" />
      </div>
      {/* Contenu par-dessus la vidéo - Responsive */}
      <div className="relative z-20 flex items-center justify-center h-full text-white">
        <Flex
          vertical
          gap={isMobile ? "8px" : "16px"}
          justify="center"
          align="center"
          style={{
            padding: isMobile ? "16px" : "32px",
            textAlign: "center",
          }}
        >
          <Flex vertical align="flex-end">
            <img
              src={vector}
              alt="Vector"
              style={{
                height: isMobile ? "32px" : "64px",
                width: isMobile ? "160px" : "288px",
                paddingRight: isMobile ? "16px" : "40px",
                maxWidth: "90vw",
              }}
            />
            <Typography.Title
              level={2}
              style={{
                color: "white",
                marginLeft: isMobile ? "4px" : "12px",
                fontSize: isMobile ? "72px" : "120px",
                fontWeight: "1000",
                lineHeight: "1.1",
                margin: "0",
                fontFamily: "DragonAngled",
              }}
            >
              Reconnectez-vous à
            </Typography.Title>
          </Flex>
          <Typography.Title
            level={2}
            style={{
              color: "white",
              marginLeft: isMobile ? "4px" : "12px",
              fontSize: isMobile ? "72px" : "120px",
              fontWeight: "1000",
              lineHeight: "1.1",
              margin: "0",
              fontFamily: "DragonAngled",
            }}
          >
            la Terre Mère !
          </Typography.Title>
          <Button
            type="primary"
            size="large"
            style={{
              borderRadius: isMobile ? "32px" : "96px",
              padding: isMobile ? "8px 16px" : "16px 32px",
              backgroundColor: "#F59F00",
              color: "black",
              fontSize: isMobile ? "14px" : "18px",
              marginTop: isMobile ? "16px" : "32px",
              minHeight: isMobile ? "40px" : "64px",
              border: "none",
              boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
              fontFamily: "GeneralSans",
              transition: "all 0.3s ease",
            }}
            onMouseEnter={(e) => {
              const target = e.target as HTMLButtonElement;
              target.style.backgroundColor = "#ff3100"; // Rose
              target.style.color = "white";
            }}
            onMouseLeave={(e) => {
              const target = e.target as HTMLButtonElement;
              target.style.backgroundColor = "#F59F00"; // Orange original
              target.style.color = "black";
            }}
          >
            Je choisis mon expérience
          </Button>
        </Flex>
      </div>
    </div>
  );
};

export default VideoBackground;
