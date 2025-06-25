import { Divider, Flex, Typography } from "antd";
import NavBar from "../../components/navBar/navBar";
import Footer from "../../components/footer/footer";
import ImageGallery from "../../components/ImageGallery/imageGallery";
import { useEffect, useState } from "react";
import circuitImage from "../../assets/images/circuitImage.png";
import { useNavigate } from "react-router-dom";

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
}

const CircuitCard: React.FC<CircuitCardProps> = ({
  circuit,
  isSelected,
  onHover,
  showDivider,
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
          margin: "2vh 0 0 3vw",
          padding: "0.6vw",
          border: "1px solid #999791",
          borderRadius: "46px",
          width: "fit-content",
        }}
      >
        <Typography style={{ fontSize: "clamp(0.3rem, 1.5vw, 2rem)" }}>
          {circuit.duration}
        </Typography>
      </Flex>

      {/* Contenu principal du circuit */}
      <Flex
        justify="space-between"
        align="center"
        style={{
          width: "100%",
          height: "clamp(3rem, 10vh, 6rem)",
          backgroundColor: "white",
          padding: "clamp(0.5rem, 2vw, 1.5rem)",
          borderRadius: "0.3rem",
          cursor: "pointer",
        }}
        onMouseEnter={() => onHover(circuit.id)}
      >
        <Flex align="center">
          <Typography.Title
            level={2}
            style={{
              color: isSelected ? "#BF2500" : "#411E1C",
              fontSize: "clamp(0.3rem, 2vw, 2.5rem)",
              textAlign: "center",
              paddingLeft: "clamp(0.5rem, 2vw, 1.5rem)",
              margin: "0",
            }}
          >
            {circuit.name}
          </Typography.Title>
        </Flex>

        {/* Image affichée uniquement pour le circuit sélectionné */}
        {isSelected && (
          <img
            src={circuitImage}
            style={{
              height: "clamp(6rem, 25vh, 15rem)",
              width: "auto",
              paddingRight: "clamp(1rem, 5vw, 4rem)",
              maxWidth: "30vw",
              position: "relative",
              bottom: circuit.id === "circuit-signature" ? "4vh" : "0",
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

      {/* Section héros */}
      <Flex
        vertical
        style={{
          backgroundColor: "#FEF1D9",
          padding: "8vh 8vw",
          paddingBottom: "20vh",
        }}
      >
        <Typography.Text
          style={{
            color: "#000000",
            fontSize: "clamp(0.3rem, 1.5vw, 1rem)",
            lineHeight: "1.1",
            margin: "0",
            textTransform: "uppercase",
          }}
        >
          CIRCUITS THÉMATIQUES
        </Typography.Text>
        <Typography.Title
          level={1}
          style={{
            color: "#FF3100",
            fontSize: "clamp(1rem, 5vw, 3rem)",
            fontWeight: "800",
            lineHeight: "1.1",
            margin: "0",
          }}
        >
          DESTINATIONS CULTURELLES <br /> ET HISTORIQUES
        </Typography.Title>
      </Flex>

      {/* Contenu principal */}
      <Flex
        style={{ width: "100%", padding: "3vh 0", paddingBottom: "0vh" }}
        vertical
        gap={50}
      >
        {/* Section des circuits */}
        <Flex
          vertical
          gap="20px"
          style={{
            padding: "0 7vw",
            width: "100%",
            paddingBottom: "7vw",
            position: "relative",
            bottom: "7vh",
          }}
        >
          {circuits.map((circuit, index) => (
            <CircuitCard
              key={circuit.id}
              circuit={circuit}
              isSelected={selectedCircuitId === circuit.id}
              onHover={handleCircuitHover}
              showDivider={index < circuits.length - 1}
            />
          ))}
        </Flex>

        {/* Galerie d'images */}
        <Flex style={{ backgroundColor: "#F59F00" }} vertical>
          <ImageGallery images={images} />
        </Flex>
      </Flex>

      {/* Footer */}
      <Footer />
    </Flex>
  );
};

export default Circuits;
