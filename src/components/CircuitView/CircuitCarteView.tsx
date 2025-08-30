import { Flex, Typography } from "antd";
import { useLocation, useParams } from "react-router-dom";
import NavBar from "../navBar/navBar";
import Footer from "../footer/footer";
import { useState, useEffect } from "react";
import BeginningButton from "../dededed/BeginingButton";
import debut from "/images/Circuit signature/Début.webp";
import { ThematicCircuitCard } from "./Card";
import { useScreenSizeResponsive } from "./Timeline";
import { VillesAPI } from "../../sdk/api/villes";
import { IVille } from "../../sdk/models/villes";
import { FileAPI } from "../../sdk/api/file";
import { emptyIPageMedia, IPageMedia } from "../../sdk/models/pagesMedias";
import { PageSettings } from "../../sdk/api/pageMedias";
import { HandleGetFileLink } from "../../pages/Circuits/CircuitsCartes";

const handleGetFileLink = (id: string) => {
  return FileAPI.Download("villes", id);
};

export const CircuitCarteView = () => {
  const { id } = useParams();
  const [isMobile, setIsMobile] = useState(false);
  const { pathname } = useLocation();
  const [ville, setVille] = useState<IVille | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [settings, setSettings] = useState<IPageMedia>(emptyIPageMedia());

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const { screenSize } = useScreenSizeResponsive();

  useEffect(() => {
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
    VillesAPI.GetByID(id || "")
      .then((data) => {
        console.log("Fetched ville:", data);
        setVille(data);
      })
      .catch((err) => {
        console.error("Error fetching ville:", err);
      });
  }, []);

  return (
    <Flex justify="center" vertical>
      <BeginningButton />
      {/* Header avec NavBar */}
      <div
        className="relative z-20 flex items-center justify-center"
        style={{ backgroundColor: "#FEF1D9" }}
      >
        <NavBar menu="CIRCUITS" />
      </div>

      {/* Section héros - Responsive */}
      {!loading && (
        <Flex
          vertical
          style={{
            position: "relative",
            overflow: "hidden",
            padding: isMobile ? "4vh 6vw" : "8vh 8vw",
            paddingBottom: isMobile ? "10vh" : "20vh",
            backgroundColor: "#FEF1D9", // Fallback background
            backgroundImage: `url(${debut})`, // Fallback background
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
              src={HandleGetFileLink(settings.carte_reel[0].file as string)}
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
            <Flex vertical gap={0}>
              <Typography.Text
                style={{
                  color: "#FFFFFF",
                  fontSize: isMobile ? "12px" : "16px",
                  lineHeight: "1.1",
                  margin: "0",
                  textTransform: "uppercase",
                  fontFamily: "GeneralSans",
                  letterSpacing: "0.3em",
                }}
              >
                Circuit à la carte
              </Typography.Text>
              <Typography.Title
                level={1}
                style={{
                  color: "#FF3100",
                  fontSize: isMobile ? "44px" : "85px",
                  fontWeight: "900",
                  lineHeight: "1.1",
                  letterSpacing: "0.03em",
                  marginTop: "20px",
                  fontFamily: "DragonAngled",
                  textTransform: "uppercase",
                }}
              >
                {settings.carte_title}
              </Typography.Title>
              <Typography.Text
                style={{
                  color: "#FFFFFF",
                  fontSize: isMobile ? "24px" : "45px",
                  lineHeight: "1.1",
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
      <Flex
        style={{
          width: "100%",
          maxWidth: "1200px",
          margin: "20px auto",
        }}
        gap={10}
        vertical
      >
        <Typography.Title
          level={1}
          style={{
            color: "#FF3100",
            fontSize: isMobile ? "44px" : "65px",
            fontWeight: "900",
            lineHeight: "1.1",
            letterSpacing: "0.03em",
            marginTop: "20px",
            fontFamily: "DragonAngled",
            textTransform: "uppercase",
          }}
        >
          {ville?.name} vous propose...
        </Typography.Title>
        <Flex gap={30} wrap justify="center">
          {ville?.activities.map((card, index) => (
            <Flex key={card.name}>
              <div className={`circuit-card-${index + 1}`}>
                <ThematicCircuitCard
                  imageUrl={handleGetFileLink(card.image[0].file as string)}
                  title={card.name}
                  description={card.description}
                  alt={card.name}
                  screenSize={screenSize}
                />
              </div>
            </Flex>
          ))}
        </Flex>
      </Flex>

      {/* <section
        style={{
          marginTop: "60px",
          height: isMobile ? "60vw" : isTablet ? "50vw" : "45vw",
          minHeight: "300px",
        }}
      >
        <ImageCarousel images={IMAGES} />
      </section> */}

      {/* Footer */}
      <Footer />
    </Flex>
  );
};

export default CircuitCarteView;
