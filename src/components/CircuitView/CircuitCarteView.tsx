import { Button, Divider, Flex, Typography } from "antd";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import NavBar from "../navBar/navBar";
import Footer from "../footer/footer";
import { useState, useEffect, useMemo } from "react";
import BeginningButton from "../dededed/BeginingButton";
import {
  DetailedTimeline,
  InclusNonInclusComponent,
  useScreenSize,
} from "./Timeline";
import { VillesAPI } from "../../sdk/api/villes";
import { emptyIVille, IVille } from "../../sdk/models/villes";
import { emptyIPageMedia, IPageMedia } from "../../sdk/models/pagesMedias";
import { PageSettings } from "../../sdk/api/pageMedias";
import { HandleGetFileLink } from "../../pages/Circuits/CircuitsCartes";

interface VilleCardOtherProps {
  ville: IVille;
  isSelected: boolean;
  onHover: (villeId: string) => void;
  showDivider: boolean;
  isMobile: boolean;
}

const VilleOtherCard: React.FC<VilleCardOtherProps> = ({
  ville,
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
      onClick={() => navigate(`/circuits-a-la-carte/${ville._id}`)}
      onMouseEnter={() => onHover(ville._id)}
      onMouseLeave={() => onHover("")}
    >
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
        onMouseEnter={() => onHover(ville._id)}
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
            {ville.name}
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
              {ville.description}
            </Typography>
          )}
        </Flex>

        {/* Image affichée uniquement pour le circuit sélectionné */}
        {isSelected && (
          <img
            src={HandleGetFileLink(ville.image[0].file as string)}
            style={{
              height: isMobile ? "5rem" : "15rem",
              width: "auto",
              paddingRight: isMobile ? "16px" : "64px",
              maxWidth: isMobile ? "40vw" : "30vw",
              position: "relative",
              bottom:
                ville._id === "circuit-signature"
                  ? isMobile
                    ? "2vh"
                    : "4vh"
                  : "0",
            }}
            className="Accueil_image_2"
            alt={`${ville.name} Logo`}
          />
        )}
      </Flex>

      {/* Divider affiché uniquement si le circuit n'est pas sélectionné */}
      {!isSelected && showDivider && <Divider size="large" />}
    </Flex>
  );
};

export const CircuitCarteView = () => {
  const { id } = useParams();
  const [isMobile, setIsMobile] = useState(false);
  const { pathname } = useLocation();
  const [selectedCircuitId, setSelectedCircuitId] = useState<string>("");
  const [ville, setVille] = useState<IVille>(emptyIVille());
  const [villes, setVilles] = useState<IVille[]>([]);
  const [isHovered, setIsHovered] = useState(false);
  const [loading, setLoading] = useState<boolean>(true);
  const screenSize = useScreenSize();
  const [loadingSettgins, setLoadingSettgins] = useState<boolean>(true);
  const [settings, setSettings] = useState<IPageMedia>(emptyIPageMedia());

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

  const handleCircuitHover = (circuitId: string) => {
    setSelectedCircuitId(circuitId);
  };

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  useEffect(() => {
    PageSettings.List()
      .then((data) => {
        console.log("the settings are:", data);
        setSettings(data);
        setLoadingSettgins(false);
      })
      .catch((err) => {
        console.error("Error fetching circuits:", err);
      });
  }, []);

  useEffect(() => {
    VillesAPI.GetByID(id || "")
      .then((data) => {
        console.log("Fetched ville:", data);
        setVille(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching ville:", err);
      });
  }, [pathname]);

  useEffect(() => {
    VillesAPI.List()
      .then((data) => {
        console.log("Fetched villes:", data);
        setVilles(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching ville:", err);
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
      {!loadingSettgins && !loading && (
        <Flex
          vertical
          style={{
            position: "relative",
            overflow: "hidden",
            padding: isMobile ? "4vh 6vw" : "8vh 8vw",
            paddingBottom: isMobile ? "10vh" : "20vh",
            backgroundColor: "#FEF1D9", // Fallback background
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
              src={HandleGetFileLink(ville.video[0].file as string)}
              type="video/mp4"
            />
            Your browser does not support the video tag.
          </video>

          {/* Content Layer */}
          <Flex
            style={{
              maxWidth: "1050px",
              width: "100%",
              margin: "0 auto",
              zIndex: 1,
            }}
          >
            <Flex vertical>
              <Typography.Text
                style={{
                  color: "white",
                  fontSize: isMobile ? "12px" : "16px",
                  lineHeight: "1.1",
                  margin: "0",
                  textTransform: "uppercase",
                  fontFamily: "GeneralSans",
                  letterSpacing: "0.3em",
                }}
              >
                CIRCUITS à la carte
              </Typography.Text>
              <Typography.Title
                level={1}
                style={{
                  color: "#FF3100",
                  fontSize: isMobile ? "44px" : "85px",
                  fontWeight: "900",
                  lineHeight: "1.1",
                  letterSpacing: "0.03em",
                  margin: "0",
                  fontFamily: "DragonAngled",
                }}
              >
                {settings.carte_title}
              </Typography.Title>
              <Typography.Text
                style={{
                  color: "#FFFFFF",
                  fontSize: isMobile ? "44px" : "44px",
                  lineHeight: isMobile ? "1.3" : "1",
                  marginTop: "0",
                  fontFamily: "DragonAngled",
                }}
              >
                {settings.carte_subtitle}
              </Typography.Text>
            </Flex>
          </Flex>
        </Flex>
      )}

      {/* Contenu principal - Responsive */}
      {!loading && (
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
              {/* Contenu principal du circuit */}
              <Flex
                justify="space-between"
                align="center"
                vertical={screenSize.isMobile}
                style={{
                  width: "100%",
                  height: screenSize.isMobile
                    ? "auto"
                    : circuitCardStyles.height,
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
                    <span style={{ color: "black" }}>{ville.name}</span>{" "}
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
                    {ville.full_description}
                  </Typography>
                </Flex>
              </Flex>
            </Flex>
          </Flex>

          {/* Timeline */}
          <Flex style={{ width: "100%" }}>
            <DetailedTimeline
              timelineData={ville.timeline}
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
              inclus={ville.inclus}
              nonInclus={ville.exclus}
              screenSize={screenSize}
            />
          </Flex>
        </Flex>
      )}

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
            Autres villes
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
            {villes
              .filter((ville) => ville._id !== id)
              .map((ville, index) => (
                <VilleOtherCard
                  key={ville._id}
                  ville={ville}
                  isSelected={selectedCircuitId === ville._id}
                  onHover={handleCircuitHover}
                  showDivider={index < villes.length - 1}
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

export default CircuitCarteView;
