import { Divider, Flex, Typography } from "antd";
import NavBar from "../../components/navBar/navBar";
import Footer from "../../components/footer/footer";
import ImageGallery from "../../components/ImageGallery/imageGallery";
import { useEffect, useState } from "react";
import circuitImage from "../../assets/images/circuitImage.png";
import { useLocation, useNavigate } from "react-router-dom";

// Types
interface Circuit {
  id: string;
  name: string;
  duration: string;
  description?: string;
}

interface GalleryImage {
  id: number;
  src: string;
  alt: string;
  title: string;
  description: string;
}

// Composant réutilisable pour un circuit
interface CircuitCardProps {
  circuit: Circuit;
  isSelected: boolean;
  onHover: (circuitId: string) => void;
  showDivider: boolean;
  isMobile: boolean;
}

const CircuitCard: React.FC<CircuitCardProps> = ({
  circuit,
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
      onClick={() => navigate(`/circuits/${circuit.id}`)}
    >
      {/* Badge de durée - affiché uniquement pour le circuit sélectionné */}
      <Flex
        style={{
          backgroundColor: isSelected ? "#FFE0D9" : "white",
          margin: isMobile ? "1vh 0 0 4vw" : "2vh 0 0 3vw",
          padding: isMobile ? "0.8vw" : "0.6vw",
          border: "1px solid #999791",
          borderRadius: "46px",
          width: "fit-content",
          transition: "all 0.6s ease",
        }}
      >
        <Typography
          style={{
            fontSize: isMobile ? "12px" : "16px",
            fontFamily: "GeneralSans",
          }}
        >
          {circuit.duration}
        </Typography>
      </Flex>

      {/* Contenu principal du circuit */}
      <Flex
        justify="space-between"
        align="center"
        style={{
          width: "100%",
          height: isMobile ? "80px" : "120px",
          backgroundColor: "white",
          padding: isMobile ? "12px" : "24px",
          borderRadius: "0.3rem",
          cursor: "pointer",
        }}
        onMouseEnter={() => onHover(circuit.id)}
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
            {circuit.name}
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
              {circuit.description}
            </Typography>
          )}
        </Flex>

        {/* Image affichée uniquement pour le circuit sélectionné */}
        {isSelected && (
          <img
            src={circuitImage}
            style={{
              height: isMobile ? "5rem" : "15rem",
              width: "auto",
              paddingRight: isMobile ? "16px" : "64px",
              maxWidth: isMobile ? "40vw" : "30vw",
              position: "relative",
              bottom:
                circuit.id === "circuit-signature"
                  ? isMobile
                    ? "2vh"
                    : "4vh"
                  : "0",
            }}
            className="Accueil_image_2"
            alt={`${circuit.name} Logo`}
          />
        )}
      </Flex>

      {/* Divider affiché uniquement si le circuit n'est pas sélectionné */}
      {!isSelected && showDivider && <Divider size="large" />}
    </Flex>
  );
};

const Circuits = () => {
  const [isMobile, setIsMobile] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    document.title = "Circuits";
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

  // Configuration centralisée des circuits
  const circuits: Circuit[] = [
    {
      id: "circuit-signature",
      name: "Esprit des Femmes - Féminin sacré et créatif",
      duration: "9 jours / 8 nuits",
      description: "Groupes de femmes, voyages entre amies, militantes",
    },
    {
      id: "circuits-thematiques",
      name: "Immersion & Savoir-Faire",
      duration: "9 jours / 8 nuits",
      description: "Circuits spécialisés selon vos centres d'intérêt",
    },
    {
      id: "circuit-a-la-carte",
      name: "Spiritualité & Traditions Vodoun",
      duration: "9 jours / 8 nuits",
      description: "Créez votre propre parcours personnalisé",
    },
    {
      id: "circuit",
      name: "Racines & Héritage sur les traces de l'histoire",
      duration: "9 jours / 8 nuits",
      description: "Créez votre propre parcours personnalisé",
    },
  ];

  // Configuration de la galerie d'images (inchangée)
  const images: GalleryImage[] = [
    {
      id: 1,
      src: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop",
      alt: "Artisanat traditionnel",
      title: "Artisanat Local",
      description: "Découvrez l'artisanat traditionnel local",
    },
    {
      id: 2,
      src: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=400&h=300&fit=crop",
      alt: "Architecture sur pilotis",
      title: "Villages Lacustres",
      description: "Architecture traditionnelle sur l'eau",
    },
    {
      id: 3,
      src: "https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?w=400&h=300&fit=crop",
      alt: "Art contemporain",
      title: "Art Moderne",
      description: "Œuvres d'art contemporain",
    },
    {
      id: 4,
      src: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=400&h=300&fit=crop",
      alt: "Architecture traditionnelle",
      title: "Habitations Locales",
      description: "Architecture résidentielle traditionnelle",
    },
  ];

  // État local pour le circuit sélectionné
  const [selectedCircuitId, setSelectedCircuitId] =
    useState<string>("circuit-signature");

  // Effet pour définir le titre de la page
  useEffect(() => {
    document.title = "Circuits Thématiques";
  }, []);

  // Gestionnaire de survol
  const handleCircuitHover = (circuitId: string) => {
    setSelectedCircuitId(circuitId);
  };

  return (
    <Flex justify="center" vertical>
      {/* Header avec NavBar */}
      <div
        className="relative z-20 flex items-center justify-center p-8"
        style={{ backgroundColor: "#FEF1D9" }}
      >
        <NavBar menu="CIRCUITS" />
      </div>

      {/* Section héros - Responsive */}
      <Flex
        vertical
        style={{
          backgroundColor: "#FEF1D9",
          padding: isMobile ? "4vh 6vw" : "8vh 8vw",
          paddingBottom: isMobile ? "10vh" : "20vh",
        }}
      >
        <Flex style={{ maxWidth: "1050px", width: "100%", margin: "0 auto" }}>
          <Flex vertical>
            <Typography.Text
              style={{
                color: "#000000",
                fontSize: isMobile ? "12px" : "16px",
                lineHeight: "1.1",
                margin: "0",
                textTransform: "uppercase",
                fontFamily: "GeneralSans",
                letterSpacing: "0.3em",
              }}
            >
              CIRCUITS THÉMATIQUES
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
              DESTINATIONS CULTURELLES <br /> ET HISTORIQUES
            </Typography.Title>
          </Flex>
        </Flex>
      </Flex>

      {/* Contenu principal - Responsive */}
      <Flex
        style={{
          width: "100%",
          // padding: "3vh 0",
          paddingBottom: "0vh",
          maxWidth: "1100px",
          margin: "0 auto",
        }}
        vertical
        gap={isMobile ? 30 : 50}
      >
        {/* Section des circuits - Responsive */}
        <Flex
          vertical
          gap="20px"
          style={{
            // padding: isMobile ? "0 4vw" : "0 7vw",
            width: "100%",
            paddingBottom: isMobile ? "4vw" : "15vw",
            position: "relative",
            bottom: isMobile ? "1vw" : "3vw",
          }}
        >
          {circuits.map((circuit, index) => (
            <CircuitCard
              key={circuit.id}
              circuit={circuit}
              isSelected={selectedCircuitId === circuit.id}
              onHover={handleCircuitHover}
              showDivider={index < circuits.length - 1}
              isMobile={isMobile}
            />
          ))}
        </Flex>
      </Flex>
      {/* Galerie d'images */}
      <Flex style={{ backgroundColor: "#F59F00" }} vertical>
        <ImageGallery images={images} />
      </Flex>

      {/* Footer */}
      <Footer />
    </Flex>
  );
};

export default Circuits;
