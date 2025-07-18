import { Divider, Flex, Typography } from "antd";
import NavBar from "../../components/navBar/navBar";
import Footer from "../../components/footer/footer";
import { useEffect, useRef, useState } from "react";
import circuitImage from "../../assets/images/circuitImage.png";
import { useLocation, useNavigate } from "react-router-dom";
import villes from "../../assets/images/villes.svg";

// Types
interface Circuit {
  id: string;
  name: string;
  duration: string;
  description?: string;
}

interface CityCardProps {
  ville?: string;
  description?: string | string[];
  image?: string;
}

const CityCard: React.FC<CityCardProps> = ({
  ville,
  description,
  image,
}: CityCardProps) => {
  // Convertir la description en tableau de lignes si c'est une string
  const descriptionLines =
    typeof description === "string"
      ? description.split("\n")
      : Array.isArray(description)
      ? description
      : [description];
  const navigate = useNavigate();
  return (
    <div
      className="relative w-64 h-80 rounded-lg overflow-hidden shadow-lg cursor-pointer group"
      onClick={() => navigate(`/circuits-a-la-carte/${ville}`)}
    >
      {/* Image de fond */}
      <div className="absolute inset-0 bg-cover bg-center group-hover:opacity-0 transition-opacity duration-500">
        <img src={image} alt={ville} className="w-full h-full object-cover" />
        {/* Overlay pour améliorer la lisibilité */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>
      </div>

      {/* Fond blanc qui apparaît au hover */}
      <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

      {/* CSS personnalisé pour l'animation */}
      <style>{`
                .moving-title {
                    position: absolute;
                    left: 16px;
                    bottom: 16px;
                    transition: all 0.7s ease-out;
                    z-index: 10;
                }

                .group:hover .moving-title {
                    left: 50%;
                    bottom: auto;
                    top: 64px;
                    transform: translateX(-50%);
                }

                .moving-title h2 {
                    color: white;
                    font-size: 1.5rem;
                    font-weight: bold;
                    transition: all 0.7s ease-out;
                }

                .group:hover .moving-title h2 {
                    position: relative;
                    bottom: 40px;
                    color: #dc2626;
                    font-size: "39px";
                }
            `}</style>

      {/* Titre de la ville qui se déplace */}
      <div className="moving-title">
        <h2>{ville}</h2>
      </div>

      {/* Texte descriptif qui apparaît au hover */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-all duration-500 delay-300 z-10">
        <div>
          {descriptionLines.map((line, index) => (
            <p key={index}>{line}</p>
          ))}
        </div>
      </div>
    </div>
  );
};

interface City {
  ville: string;
  description: string;
  image: string;
}

interface StaggeredGridProps {
  cities?: City[];
  minItemWidth?: number;
}

const StaggeredGrid = ({
  cities = [],
  minItemWidth = 280,
}: StaggeredGridProps) => {
  // Hook pour détecter la largeur du container
  const [itemsPerRow, setItemsPerRow] = useState(3);
  const [containerWidth, setContainerWidth] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const calculateItemsPerRow = () => {
      if (containerRef.current) {
        const containerActualWidth = containerRef.current.offsetWidth;
        setContainerWidth(containerActualWidth);
        const calculatedItems = Math.floor(containerActualWidth / minItemWidth);
        const finalItems = Math.max(1, Math.min(calculatedItems, 6)); // Entre 1 et 6 items
        console.log(
          `Container width: ${containerActualWidth}px, Items per row: ${finalItems}`
        );
        setItemsPerRow(finalItems);
      }
    };

    // Calculer au chargement
    calculateItemsPerRow();

    // Recalculer au redimensionnement
    window.addEventListener("resize", calculateItemsPerRow);

    // Observer les changements de taille du container avec ResizeObserver
    const resizeObserver = new ResizeObserver(calculateItemsPerRow);
    if (containerRef.current) {
      resizeObserver.observe(containerRef.current);
    }

    // Nettoyage
    return () => {
      window.removeEventListener("resize", calculateItemsPerRow);
      resizeObserver.disconnect();
    };
  }, [minItemWidth]);

  // Données par défaut si aucune n'est fournie
  const defaultCities = [
    {
      ville: "Cotonou",
      description:
        "Art urbain,\nmarchés, street\nfood, fresques &\nvie moderne",
      image:
        "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop",
    },
    {
      ville: "Paris",
      description: "Monuments,\nmusées, cuisine\nraffrinée & mode",
      image:
        "https://images.unsplash.com/photo-1502602898536-47ad22581b52?w=400&h=300&fit=crop",
    },
    {
      ville: "Tokyo",
      description: "Tradition,\ntechnologie,\nculture pop &\narchitecture",
      image:
        "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=400&h=300&fit=crop",
    },
    {
      ville: "New York",
      description: "Gratte-ciels,\nBroadway, diversité\n& énergie urbaine",
      image:
        "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=400&h=300&fit=crop",
    },
    {
      ville: "Londres",
      description: "Histoire,\nthéâtres, pubs\n& architecture\nvictorienne",
      image:
        "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=400&h=300&fit=crop",
    },
    {
      ville: "Barcelona",
      description: "Gaudí,\narchitecture,\ntapas & vie\nnocturne",
      image:
        "https://images.unsplash.com/photo-1539037116277-4db20889f2d4?w=400&h=300&fit=crop",
    },
  ];

  // Utiliser les données fournies ou les données par défaut
  const displayCities = cities.length > 0 ? cities : defaultCities;

  return (
    <div className="w-full min-h-screen">
      <div
        ref={containerRef}
        className="relative w-full"
        style={{
          minHeight: Math.ceil(displayCities.length / itemsPerRow) * 410 + "px", // Ensure enough height for all rows
        }}
      >
        {displayCities.map((city, index) => {
          // Calculer la position dans la grille
          const row = Math.floor(index / itemsPerRow);
          const col = index % itemsPerRow;

          // Largeur de chaque carte
          const itemWidth =
            containerWidth > 0
              ? Math.min(240, containerWidth / itemsPerRow - 20)
              : 240;

          // Calculer la largeur totale occupée par les cartes + gaps
          const totalRowWidth =
            itemsPerRow * itemWidth + (itemsPerRow - 1) * 30;

          // Décalage horizontal pour centrer la rangée
          const leftOffset =
            containerWidth > totalRowWidth
              ? (containerWidth - totalRowWidth) / 2
              : 0;

          // Décalage vertical pour effet "staggered"
          const columnOffset = col % 2 === 1 ? 60 : 0;

          return (
            <div
              key={`${city.ville}-${index}`}
              className="absolute group cursor-pointer"
              style={{
                left: `${leftOffset + col * (itemWidth + 30)}px`,
                top: `${row * 380 + columnOffset + 30 * row}px`,
                width: `${itemWidth}px`,
                zIndex: 10 - index,
                gap: "20px",
              }}
            >
              <CityCard
                key={`city-${index}`}
                ville={city.ville}
                description={city.description}
                image={city.image}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

const CircuitsCartes = () => {
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

  const cities = [
    {
      ville: "Cotonou",
      description:
        "Art urbain,\nmarchés, street\nfood, fresques &\nvie moderne",
      image: villes,
    },
    {
      ville: "Cotonou",
      description:
        "Art urbain,\nmarchés, street\nfood, fresques &\nvie moderne",
      image: villes,
    },
    {
      ville: "Cotonou",
      description:
        "Art urbain,\nmarchés, street\nfood, fresques &\nvie moderne",
      image: villes,
    },
    {
      ville: "Cotonou",
      description:
        "Art urbain,\nmarchés, street\nfood, fresques &\nvie moderne",
      image: villes,
    },
    {
      ville: "Cotonou",
      description:
        "Art urbain,\nmarchés, street\nfood, fresques &\nvie moderne",
      image: villes,
    },
    {
      ville: "Cotonou",
      description:
        "Art urbain,\nmarchés, street\nfood, fresques &\nvie moderne",
      image: villes,
    },
    {
      ville: "Cotonou",
      description:
        "Art urbain,\nmarchés, street\nfood, fresques &\nvie moderne",
      image: villes,
    },
    {
      ville: "Cotonou",
      description:
        "Art urbain,\nmarchés, street\nfood, fresques &\nvie moderne",
      image: villes,
    },
    {
      ville: "Cotonou",
      description:
        "Art urbain,\nmarchés, street\nfood, fresques &\nvie moderne",
      image: villes,
    },
    {
      ville: "Cotonou",
      description:
        "Art urbain,\nmarchés, street\nfood, fresques &\nvie moderne",
      image: villes,
    },
  ];

  // État local pour le circuit sélectionné
  const [selectedCircuitId, setSelectedCircuitId] =
    useState<string>("circuit-signature");

  // Effet pour définir le titre de la page
  useEffect(() => {
    document.title = "Circuits à la carte";
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
          paddingBottom: isMobile ? "10vw" : "5vw",
        }}
      >
        <Flex style={{ maxWidth: "1050px", width: "100%", margin: "0 auto" }}>
          <Flex vertical gap={0}>
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
              Découverte de régions
            </Typography.Title>
            <Typography.Text
              style={{
                color: "#000000",
                fontSize: isMobile ? "24px" : "45px",
                lineHeight: "1.1",
                marginTop: "0",
                fontFamily: "DragonAngled",
              }}
            >
              Chaque ville est une porte d’entrée vers une histoire, une
              tradition, un paysage
            </Typography.Text>
          </Flex>
        </Flex>
      </Flex>

      <Flex
        style={{
          maxWidth: "1350px",
          width: "100%",
          margin: "0 auto",
          paddingTop: "60px",
          paddingBottom: "60px"
        }}
      >
        <StaggeredGrid cities={cities} /* minItemWidth={4} */ />
      </Flex>

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
            Découvrir{" "}
            <span style={{ color: "#f59f00" }}>le Bénin autrement</span> !
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
            {circuits.map((circuit, index) => (
              <CircuitOtherCard
                key={circuit.id}
                circuit={circuit}
                // clicked={false}
                // onClick={() => navigate(`/circuits/${circuit.id}`)}
                isSelected={selectedCircuitId === circuit.id}
                onHover={handleCircuitHover}
                showDivider={index < circuits.length - 1}
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

interface CircuitCardOtherProps {
  circuit: Circuit;
  isSelected: boolean;
  onHover: (circuitId: string) => void;
  showDivider: boolean;
  isMobile: boolean;
}

const CircuitOtherCard: React.FC<CircuitCardOtherProps> = ({
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
      onClick={() => navigate(`/circuits-thematiques/${circuit.id}`)}
      onMouseEnter={() => onHover(circuit.id)}
      onMouseLeave={() => onHover("")}
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
          backgroundColor: "white",
          padding: isMobile ? "12px" : "24px",
          borderRadius: "0.3rem",
          cursor: "pointer",
          height: isSelected ? "100%" : isMobile ? "80px" : "120px",
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

export default CircuitsCartes;
