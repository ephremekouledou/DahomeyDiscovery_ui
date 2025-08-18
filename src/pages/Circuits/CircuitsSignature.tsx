import { Button, Flex, Typography } from "antd";
import NavBar from "../../components/navBar/navBar";
import Footer from "../../components/footer/footer";
import { useEffect, useState, useMemo } from "react";
import { Link, useLocation } from "react-router-dom";
import ImageCarousel from "../../components/ImageGallery/ImageCarousel";
import debut from "../../assets/images/Circuit signature/Début.webp";
import video from "../../assets/videos/usagevid1.mp4";
import img1 from "../../assets/images/Circuit signature/1_5.webp";
import img2 from "../../assets/images/Circuit signature/2_5.webp";
import img3 from "../../assets/images/Circuit signature/3_5.jpeg";
import img4 from "../../assets/images/Circuit signature/4_5.webp";
import img5 from "../../assets/images/Circuit signature/5_5.webp";
import {
  DetailedTimeline,
  InclusNonInclusComponent,
} from "../../components/CircuitView/Timeline";

// Optimisation: Déplacer les images en constante pour éviter les re-rendus
const images = [img1, img2, img3, img4, img5];

// Optimisation: Données de la timeline en constante avec images
const timelineData = [
  {
    title: "Bienvenue au Bénin !",
    subtitle: "Arrivée à l’aéroport de Cotonou",
    times: [
      "Accueil personnalisé",
      "Dîner",
      "Transfert vers l’hébergement choisi",
    ],
    position: "left",
    image: img1,
  },
  {
    title: "Cité lacustre de Ganvié - Cotonou, nature & modernité",
    subtitle: "07h30 - Petit déjeuner",
    times: [
      "08h00 - Départ pour Abomey-Calavi",
      "09h00 - Embarquement en pirogue pour Ganvié",
      "09h15-12h30 - Visite du village lacustre (centre artisanal, marché flottant…)",
      "13h00 - Déjeuner sur place ou retour vers Cotonou + repos",
      "16h00 - Balade à Cotonou : Jardin de Matthieu, Mur du Patrimoine, Place de l’Amazone…",
      "20h00 - Dîner",
    ],
    position: "right",
    image: img2,
  },
  {
    title: "Ouidah & Gogotinkpon, mémoire et bien-être",
    subtitle: "07h00 - Petit déjeuner",
    times: [
      "08h00 - Départ pour Ouidah",
      "09h00 - Visite : Temple des pythons, Forêt Kpassè, Place aux enchères, Route des Esclaves, Porte du Non-Retour…",
      "12h00 - Départ pour Gogotinkpon",
      "13h00 - Déjeuner face au lac Ahémé",
      "15h00 - Soirée détente dans l’espace de l’ile au bio bonheur (bain d’argile, massage, baignade…)",
      "18h00 - Retour à Cotonou",
      "20h00 - Dîner",
    ],
    position: "left",
    image: img3,
  },
  {
    title: "Porto-Novo, la ville aux trois noms",
    subtitle: "07h00 - Petit déjeuner",
    times: [
      "08h00 - Départ pour Adjarra",
      "09h00 - Découverte : Rivière noire, vin & sodabi de raphia à Avrankou",
      "13h00 - Déjeuner dans un Restaurant local",
      "14h00 - Visite des sites emblématiques de la ville : Musée Honmè (ancien palais royal), Place Toffa 1er, Ancienne Mosquée afro-brésilienne, Place Abessan, Place Adjina…",
      "17h00 - Retour à Cotonou / temps libre",
      "20h00 - Dîner",
    ],
    position: "right",
    image: img4,
  },
  {
    title: "Abomey, royauté et spiritualité",
    subtitle: "07h00 - Petit déjeuner express et départ pour Abomey",
    times: [
      "10h30 - Visite du Palais privé du Roi Agonglo",
      "12h30 - Visite de la Fossé de fortification (Abgodo)",
      "13h00 - Brunch ou déjeuner en ville",
      "13h30 - Atelier de tissage & calebasses",
      "14h30 - Visite du lieu Unik d’Abomey",
      "17h00 - Place Goho (statue de Béhanzin) + photo shooting en accoutrements royaux & dégustation de jus de coco",
      "19h00 - Dîner & nuit sur place",
    ],
    position: "left",
    image: img5,
  },
  {
    title: "Dassa-Zoumè, Igbo Idaasha",
    subtitle: "07h00 - Petit déjeuner express",
    times: [
      "10h30 - Arrivée à Dassa + balade en ville",
      "Découverte : Oké-Are (ancienne prison des sorciers), Colline du poisson",
      "12h30 - Déjeuner local",
      "13h00 - Visite de la grotte mariale et du site du Okuta",
      "16h00 - Retour à Cotonou",
      "20h00 - Dîner",
    ],
    position: "right",
    image: img1,
  },
  {
    title: "Clôture & souvenirs",
    subtitle: "Matinée libre",
    times: [
      "Achats, détente, interviews vidéo (optionnel)",
      "Journée solidaire (visite de structures soutenues par Dahomey Discovery)",
      "Dîner de clôture (surprise Dahomey Discovery)",
      "19h00 - Transfert à l’aéroport + accompagnement embarquement",
    ],
    position: "left",
    image: img2,
  },
];

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

const inclus = [
  "Hébergement 6 nuits (hôtel ou maison d’hôte)",
  "Transport tout au long du séjour",
  "Guide certifié sur chaque site",
  "Prise en charge à l’aéroport",
  "Accompagnement personnalisé",
  "Connexion internet lors des sorties",
  "Eau",
];

const nonInclus = [
  "Boissons supplémentaires Boissons alcoolisées / dépenses personnelles",
  "Assurance voyage (facultative)",
  "Activités à la carte (rituel, massage, etc.)",
  "Vol AR international",
  "Frais de visa",
  "Activités optionnelles non mentionnées",
];

// Composant principal optimisé
const CircuitsSignature = () => {
  const [isHovered, setIsHovered] = useState(false);
  const { pathname } = useLocation();
  const screenSize = useScreenSize();

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

  return (
    <Flex justify="center" vertical>
      {/* Header avec NavBar */}
      <div className="relative z-20 flex items-center justify-center">
        <NavBar menu="CIRCUITS" />
      </div>

      {/* Section héros - Responsive */}
      <Flex
        vertical
        style={{
          position: "relative",
          overflow: "hidden",
          padding: heroStyles.padding,
          paddingBottom: heroStyles.paddingBottom,
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
          <source src={video} type="video/mp4" />
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
              Richesse du bénin
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
              Sites incontournables, entre mémoire, spiritualité, artisanat et
              détente
            </Typography.Text>
          </Flex>
        </Flex>
      </Flex>

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
                7 jours / 6 nuits
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
                  <span style={{ color: "black" }}>L'Essentiel du Bénin</span>{" "}
                  {screenSize.isMobile ? <br /> : ""}
                  <span
                    style={{
                      fontSize: screenSize.isMobile ? "18px" : "inherit",
                    }}
                  >
                    (Best-seller)
                  </span>
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
                  7 jours d’aventure, de culture et de bien-être au cœur d’un
                  pays vibrant. Envie d’un voyage qui a du sens ? Envolez-vous
                  pour le Bénin, berceau du vodoun, joyau de l’Afrique de
                  l’Ouest et terre d’histoires puissantes. Ce circuit unique
                  vous plonge au cœur d’un pays chaleureux, où chaque jour est
                  une expérience forte, entre découvertes culturelles,
                  spiritualité vivante, détente et rencontres inoubliables.
                </Typography>
              </Flex>
            </Flex>
          </Flex>
        </Flex>

        {/* Timeline */}
        <Flex style={{ width: "100%" }}>
          <DetailedTimeline
            timelineData={timelineData}
            screenSize={screenSize}
          />
        </Flex>

        {/* Bouton de réservation */}
        <Flex
          justify="center"
          style={{ padding: screenSize.isMobile ? "20px 0" : "0" }}
        >
          <Link to="/reserver">
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
            inclus={inclus}
            nonInclus={nonInclus}
            screenSize={screenSize}
          />
        </Flex>
      </Flex>

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
        <ImageCarousel images={images} />
      </section>

      {/* Footer */}
      <Footer />
    </Flex>
  );
};

export default CircuitsSignature;
