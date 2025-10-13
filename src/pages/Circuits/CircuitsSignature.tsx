import { Button, Flex, Typography } from "antd";
import NavBar from "../../components/navBar/navBar";
import Footer from "../../components/footer/footer";
import { useEffect, useState, useMemo } from "react";
import { Link, useLocation } from "react-router-dom";
import ImageCarousel from "../../components/ImageGallery/ImageCarousel";
// import debut from "/images/Circuit signature/Début.webp";
// import reel from "/videos/video drone horizontale Abomey .mp4";
import {
  DetailedTimeline,
  InclusNonInclusComponent,
} from "../../components/CircuitView/Timeline";
import BeginningButton from "../../components/dededed/BeginingButton";
import { emptyICircuit, ICircuit } from "../../sdk/models/circuits";
import { emptyIPageMedia, IPageMedia } from "../../sdk/models/pagesMedias";
import { CircuitsAPI } from "../../sdk/api/circuits";
import { HandleGetFileLink } from "./CircuitsCartes";
import { PageSettings } from "../../sdk/api/pageMedias";
import CrossSelling from "../../components/dededed/crossSelling";
import { IClientHistory } from "../../sdk/models/clients";
import { ClientsAPI } from "../../sdk/api/clients";

// Optimisation: Hook personnalisé pour la détection de la taille d'écran
const useScreenSize = () => {
  const [screenSize, setScreenSize] = useState({
    isMobile: false,
    isTablet: false,
    isDesktop: false,
    width: 0,
  });

  useEffect(() => {
    const checkScreenSize = () => {
      const width = window.innerWidth;
      setScreenSize({
        isMobile: width < 768,
        isTablet: width >= 768 && width < 1024,
        isDesktop: width >= 1024,
        width,
      });
    };

    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  return screenSize;
};

// Composant principal optimisé
const CircuitsSignature = () => {
  const [isHovered, setIsHovered] = useState(false);
  const { pathname } = useLocation();
  const screenSize = useScreenSize();
  const [circuitInfos, setCircuitInfos] = useState<ICircuit>(emptyICircuit());
  const [loading, setLoading] = useState<boolean>(true);
  const [settings, setSettings] = useState<IPageMedia>(emptyIPageMedia());
  const [history, setHistory] = useState<IClientHistory[]>([]);

  // Optimisation: Mémorisation des styles responsifs
  const heroStyles = useMemo(() => {
    if (screenSize.isMobile) {
      return {
        padding: "4vh 4vw",
        paddingBottom: "8vw",
        categoryFontSize: "10px",
        titleFontSize: "36px",
        subtitleFontSize: "18px",
        letterSpacing: "0.2em",
      };
    } else if (screenSize.isTablet) {
      return {
        padding: "6vh 6vw",
        paddingBottom: "6vw",
        categoryFontSize: "14px",
        titleFontSize: "65px",
        subtitleFontSize: "32px",
        letterSpacing: "0.25em",
      };
    } else {
      return {
        padding: "8vh 8vw",
        paddingBottom: "8vw",
        categoryFontSize: "16px",
        titleFontSize: "85px",
        subtitleFontSize: "45px",
        letterSpacing: "0.3em",
      };
    }
  }, [screenSize]);

  const circuitCardStyles = useMemo(() => {
    if (screenSize.isMobile) {
      return {
        badgeMargin: "1vh 0 0 0",
        badgePadding: "8px 16px",
        badgeFontSize: "12px",
        height: "auto",
        padding: "16px",
        titleFontSize: "22px",
        subtitleFontSize: "14px",
        titlePadding: "0",
        subtitlePadding: "0",
      };
    } else if (screenSize.isTablet) {
      return {
        badgeMargin: "1.5vh 0 0 2vw",
        badgePadding: "10px 20px",
        badgeFontSize: "14px",
        height: "fit-content",
        padding: "20px",
        titleFontSize: "40px",
        subtitleFontSize: "16px",
        titlePadding: "16px",
        subtitlePadding: "17px",
      };
    } else {
      return {
        badgeMargin: "2vh 0 0 3vw",
        badgePadding: "12px 24px",
        badgeFontSize: "16px",
        height: "fit-content",
        padding: "24px",
        titleFontSize: "58px",
        subtitleFontSize: "18px",
        titlePadding: "24px",
        subtitlePadding: "25px",
      };
    }
  }, [screenSize]);

  // Optimisation: Effects regroupés
  useEffect(() => {
    document.title = "Circuits Signature";
    window.scrollTo(0, 0);
  }, [pathname]);

  useEffect(() => {
    PageSettings.List()
      .then((data) => {
        console.log("the settings are:", data);
        setSettings(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching circuits:", err);
      });
  }, []);

  useEffect(() => {
    CircuitsAPI.GetSignature()
      .then((data) => {
        setCircuitInfos(data);
      })
      .catch((err) => {
        console.error("Error fetching circuit:", err);
      });
  }, []);

  useEffect(() => {
    ClientsAPI.ListClientHistory(ClientsAPI.GetClientHistoryLocal())
      .then((data) => {
        setHistory(data.history);
        console.log("History fetched", data.history);
      })
      .catch((err) => {
        console.error("History added not added", err);
      });
  }, []);

  return (
    <Flex justify="center" vertical>
      <BeginningButton />
      {/* Header avec NavBar */}
      <div className="relative z-20 flex items-center justify-center">
        <NavBar menu="CIRCUITS" />
      </div>

      {/* Section héros - Responsive */}
      {!loading && (
        <Flex
          vertical
          style={{
            position: "relative",
            overflow: "hidden",
            padding: heroStyles.padding,
            paddingBottom: heroStyles.paddingBottom,
            backgroundColor: "#FEF1D9", // Fallback background
            // backgroundImage: `url(${debut})`, // Fallback background
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          {/* Optimized Video Background */}
          <video
            autoPlay
            loop
            muted
            playsInline
            preload="auto" // Ensures early loading
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              objectFit: "cover",
              zIndex: 0,
            }}
            onError={(e) => {
              console.error("Video error:", e);
            }}
          >
            <source
              src={HandleGetFileLink(settings.signature_reel[0].file as string)}
              type="video/mp4"
            />
            Your browser does not support the video tag.
          </video>

          {/* Content Layer */}
          <Flex
            style={{
              maxWidth: screenSize.isMobile ? "100%" : "1050px",
              width: "100%",
              margin: "0 auto",
              zIndex: 1,
            }}
          >
            <Flex vertical gap={0}>
              <Typography.Text
                style={{
                  color: "#FFFFFF",
                  fontSize: heroStyles.categoryFontSize,
                  lineHeight: "1.1",
                  margin: "0",
                  textTransform: "uppercase",
                  fontFamily: "GeneralSans",
                  letterSpacing: heroStyles.letterSpacing,
                }}
              >
                CIRCUIT SIGNATURE
              </Typography.Text>
              <Typography.Title
                level={1}
                style={{
                  color: "#FF3100",
                  fontSize: heroStyles.titleFontSize,
                  fontWeight: "900",
                  lineHeight: screenSize.isMobile ? "1.1" : "1",
                  letterSpacing: "0.03em",
                  marginTop: screenSize.isMobile ? "12px" : "20px",
                  marginBottom: screenSize.isMobile ? "8px" : "15px",
                  fontFamily: "DragonAngled",
                  textTransform: "uppercase",
                }}
              >
                {settings.signature_title}
              </Typography.Title>
              <Typography.Text
                style={{
                  color: "#FFFFFF",
                  fontSize: heroStyles.subtitleFontSize,
                  lineHeight: screenSize.isMobile ? "1.3" : "1",
                  marginTop: "0",
                  fontFamily: "DragonAngled",
                }}
              >
                {settings.signature_subtitle}
              </Typography.Text>
            </Flex>
          </Flex>
        </Flex>
      )}

      {/* Contenu principal - Responsive */}
      <Flex
        style={{
          width: "100%",
          paddingBottom: "0vh",
          maxWidth: screenSize.isMobile ? "100%" : "1100px",
          margin: "0 auto",
          padding: screenSize.isMobile ? "0 16px" : "0",
        }}
        vertical
        gap={screenSize.isMobile ? 20 : screenSize.isTablet ? 35 : 50}
      >
        {/* Section des circuits - Responsive */}
        <Flex
          className="bg-white rounded-lg shadow-md border border-gray-200"
          vertical
          gap="20px"
          style={{
            width: "100%",
            position: "relative",
            bottom: screenSize.isMobile ? "2vw" : "3vw",
            margin: screenSize.isMobile ? "16px 0" : "0",
          }}
        >
          <Flex
            vertical
            style={{ backgroundColor: "white" }}
            className="bg-white rounded-lg shadow-md border border-gray-200 p-6"
          >
            {/* Badge de durée */}
            <Flex
              style={{
                backgroundColor: "#FFE0D9",
                margin: circuitCardStyles.badgeMargin,
                padding: circuitCardStyles.badgePadding,
                border: "1px solid #999791",
                borderRadius: "46px",
                width: "fit-content",
                transition: "all 0.6s ease",
              }}
            >
              <Typography
                style={{
                  fontSize: circuitCardStyles.badgeFontSize,
                  fontFamily: "GeneralSans",
                }}
              >
                {circuitInfos.day} jours / {circuitInfos.night} nuits
              </Typography>
            </Flex>

            {/* Contenu principal du circuit */}
            <Flex
              justify="space-between"
              align="center"
              vertical={screenSize.isMobile}
              style={{
                width: "100%",
                height: screenSize.isMobile ? "auto" : circuitCardStyles.height,
                backgroundColor: "white",
                padding: circuitCardStyles.padding,
                borderRadius: "0.3rem",
                cursor: "pointer",
              }}
            >
              <Flex
                vertical
                style={{ width: screenSize.isMobile ? "100%" : "auto" }}
              >
                <Typography.Title
                  level={2}
                  style={{
                    color: "#BF2500",
                    fontSize: circuitCardStyles.titleFontSize,
                    fontFamily: "DragonAngled",
                    fontWeight: "300",
                    paddingLeft: circuitCardStyles.titlePadding,
                    margin: "0",
                    lineHeight: screenSize.isMobile ? "1.2" : "1.4",
                    transition: "all 0.5s ease",
                  }}
                >
                  <span style={{ color: "black" }}>{circuitInfos.title}</span>{" "}
                  {screenSize.isMobile ? <br /> : ""}
                </Typography.Title>
                <Typography
                  style={{
                    color: "#311715",
                    fontSize: circuitCardStyles.subtitleFontSize,
                    paddingLeft: circuitCardStyles.subtitlePadding,
                    fontFamily: "GeneralSans",
                    fontWeight: "300",
                    marginTop: screenSize.isMobile ? "8px" : "0",
                    lineHeight: "1.4",
                  }}
                >
                  {circuitInfos.description}
                </Typography>
              </Flex>
            </Flex>
          </Flex>
        </Flex>

        {/* Timeline */}
        <Flex style={{ width: "100%" }}>
          <DetailedTimeline
            timelineData={circuitInfos.timeline}
            screenSize={screenSize}
          />
        </Flex>

        {/* Bouton de réservation */}
        <Flex
          justify="center"
          style={{ padding: screenSize.isMobile ? "20px 0" : "0" }}
        >
          <Link to="/reservations-circuits">
            <Button
              type="primary"
              size="large"
              style={{
                backgroundColor: isHovered ? "#ff3100" : "#F59F00",
                color: isHovered ? "white" : "black",
                borderRadius: "25px",
                border: "none",
                fontFamily: "GeneralSans",
                transition: "all 0.3s ease",
                fontSize: screenSize.isMobile ? "16px" : "17px",
                fontWeight: "200",
                padding: screenSize.isMobile ? "8px 24px" : "12px 32px",
                height: "auto",
              }}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              RÉSERVER
            </Button>
          </Link>
        </Flex>

        {/* Section Inclus/Non Inclus */}
        <Flex style={{ width: "100%", paddingBottom: "60px" }}>
          <InclusNonInclusComponent
            inclus={circuitInfos.inclus}
            nonInclus={circuitInfos.exclus}
            screenSize={screenSize}
          />
        </Flex>
      </Flex>

      <CrossSelling history={history} maxItems={5} />

      {/* Galerie d'images - Responsive */}
      <section
        style={{
          height: screenSize.isMobile
            ? "60vw"
            : screenSize.isTablet
            ? "50vw"
            : "45vw",
          width: "100%",
        }}
      >
        {settings.signature_carrousel.length > 0 &&
          settings.signature_carrousel[0].file !== null && (
            <ImageCarousel
              images={settings.signature_carrousel.map((item) =>
                HandleGetFileLink(item.file as string)
              )}
            />
          )}
      </section>

      {/* Footer */}
      <Footer />
    </Flex>
  );
};

export default CircuitsSignature;
