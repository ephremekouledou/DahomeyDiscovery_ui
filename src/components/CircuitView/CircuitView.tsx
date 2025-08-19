import { Button, Divider, Flex, Typography } from "antd";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import NavBar from "../navBar/navBar";
import Footer from "../footer/footer";
import React, { useState, useEffect, useMemo } from "react";
import circuitImage from "../../assets/images/circuitImage.png";
import img1 from "../../assets/images/Circuit signature/1_5.webp";
import img2 from "../../assets/images/Circuit signature/2_5.webp";
import img3 from "../../assets/images/Circuit signature/3_5.jpeg";
import img4 from "../../assets/images/Circuit signature/4_5.webp";
import img5 from "../../assets/images/Circuit signature/5_5.webp";
import video from "../../assets/videos/usagevid1.mp4";
import {
  DetailedTimeline,
  InclusNonInclusComponent,
  useScreenSize,
} from "./Timeline";
import BeginningButton from "../dededed/BeginingButton";

// Types
interface Circuit {
  id: string;
  name: string;
  duration: string;
  description?: string;
}

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

interface TimelineItem {
  title: string;
  subtitle: string;
  times: string[];
  position: "left" | "right";
  image: string;
}

interface Inclusion {
  inclus: string[];
  nonInclus: string[];
}

interface BaseInfo {
  day: number;
  night: number;
  title: string;
  description: string;
}

interface TravelPackage {
  id: string;
  baseInfo: BaseInfo;
  timeline: TimelineItem[];
  inclusion: Inclusion;
}

const AllPackages: TravelPackage[] = [
  {
    id: "de774e84ds8e45s75fs",
    baseInfo: {
      day: 8,
      night: 7,
      title: "Spiritualité & Traditions Vodoun: L'invisible au cœur du Bénin",
      description:
        "Plongez dans l’univers spirituel profond du Bénin, berceau du vodoun, à travers un circuit unique mêlant rites, rencontres, lieux sacrés et traditions vivantes.Ce parcours initiatique vous emmène à la découverte de temples mystiques, couvents secrets, cérémonies puissantes et savoirs transmis depuis des générations.",
    },
    timeline: [
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
        title: "Porto Novo - Cotonou :  ART  et Premiers pas spirituels",
        subtitle: "07h30 - Petit déjeuner",
        times: [
          "08h30 - Départ  pour la  Place HOUNGBO HONTO : immersion dans couvent  Vodoun à la rencontre de plusieurs divinités",
          "10h30 - Visite de la  Place ADJINA : immersion dans les temples dédiés à plusieurs divinités",
          "11h15 - Exploration du mur du patrimoine  de Cotonou : entre mythes, esprits et mémoire",
          "13h00 - Déjeuner + repos",
          "15h00 - Visite du Temple Zangbéto : immersion dans les figures protectrices de la nuit",
          "18h00 - Détente à la plage de Fidjrossè",
          "20h00 - Dîner",
        ],
        position: "right",
        image: img2,
      },
      {
        title: "Ouidah : Mémoire, racines et offrandes",
        subtitle: "07h30 - Petit déjeuner",
        times: [
          "08h30 - Départ pour Ouidah",
          "09h30 - Atelier culinaire traditionnel (resto Kolè) : transmission des mets ancestraux",
          "13h00 - Dégustation + détente",
          "15h00 - Parcours spirituel : Temple des Pythons, Forêt sacrée de Kpassè, un site important à Ouidah, lié aux traditions vodoun,Visite au dignitaire des cultes vodoun de Ouidah",
          "20h00 - Dîner et nuit sur place",
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
        title: "Grand-Popo : Plantes, esprits et traditions vivantes",
        subtitle: "07h30 - Petit-déjeuner",
        times: [
          "08h30 - Départ pour Grand-Popo",
          "09h30 - Visite de la forêt sacrée d’Agbahouézoun : Immersion dans ce site spirituel chargé d’histoire, où les traditions vodoun sont encore bien vivantes.Découverte du site de Tolégba (si le temps le permet)",
          "13h00 - Déjeuner",
          "14h00 - Visite de la Place Adjigo et de son arbre mystique Traversée vers Agoué : palais Royal & couvent de Zangbéto",
          "17h00 - Détente à la plage ",
          "20h00 - Dîner et nuit sur place",
        ],
        position: "left",
        image: img5,
      },
      {
        title: "Abomey : Culte des ancêtres et marché sacré",
        subtitle: "07h00 - Petit déjeuner express",
        times: [
          "10h00 - Visite du Palais privé du Roi Agonglo",
          "13h00 - Déjeuner en ville",
          "15h00 - Découverte : Exploration du marché vodoun (produits rituels et objets sacrés) Visite du Temple vodoun des Tohossou, haut lieu mystique Visite de la cathédrale Vodoun",
          "18h00 - Pause à la place Goho + dégustation de jus de coco",
          "20h00 - Dîner et nuit à Abomey",
        ],
        position: "right",
        image: img1,
      },
      {
        title: "Dassa-Zoumè : Montagnes sacrées et mémoires invisibles",
        subtitle: "07h00 - Petit déjeuner",
        times: [
          "08h30 - Arrivée à Dassa : Visite de l’ancienne prison des sorciers (Oké-Are) Ascension de la Colline des Princes (site symbolique et rituel)",
          "12h30 - Déjeuner local",
          "14h00 - Découverte du site Okuta, où la pierre devient art et offrande",
          "16h00 - Retour à Cotonou",
          "20h00 - Dîner",
        ],
        position: "left",
        image: img2,
      },
      {
        title: "Activités Dahomey Discovery : Connexion, création, clôture",
        subtitle: "08h00 - Petit déjeuner",
        times: [
          "10h00 - Journée libre avec des activités à la carte : Teinture indigo, body painting rituel, initiation symbolique, etc.",
          "19h00  - Dîner de clôture & surprise",
        ],
        position: "right",
        image: img2,
      },
      {
        title: "Départ : Derniers instants",
        subtitle: "Matinée libre : achats, détente, souvenirs",
        times: [
          "Interviews vidéo si souhaitées",
          "Transfert à l’aéroport + accompagnement jusqu’à l’embarquement",
        ],
        position: "left",
        image: img2,
      },
    ],
    inclusion: {
      inclus: [
        "Hébergement 7 nuits (hôtel ou maison d’hôte)",
        "Transport tout au long du séjour",
        "Guide certifié sur chaque site",
        "Prise en charge à l’aéroport",
        "Accompagnement personnalisé",
        "Connexion internet lors des sorties",
        "Eau",
      ],
      nonInclus: [
        "Boissons supplémentaires Boissons alcoolisées / dépenses personnelles",
        "Assurance voyage (facultative)",
        "Activités à la carte (rituel, massage, etc.)",
        "Vol AR international",
        "Frais de visa",
        "Activités optionnelles non mentionnées",
      ],
    },
  },
  {
    id: "a92f8e7c3b5d4a1f9e6d", // random UUID style
    baseInfo: {
      day: 7,
      night: 6,
      title: "Esprit des Femmes – Rituels, Artisanat & Puissance Féminine",
      description:
        "Pendant 7 jours, laissez-vous emporter par une expérience unique où se rencontrent artisanes, prêtresses, stylistes et productrices inspirantes. Découvrez des lieux sacrés dédiés aux femmes et aux Amazones, participez à des ateliers créatifs (head wrap, peinture, cuisine, écriture) et vivez des instants de bien-être (spa, plage, bains thermaux). Ce séjour est une parenthèse intime et solidaire pour reconnecter le corps, l’esprit et la sororité.",
    },
    timeline: [
      {
        title: "Bienvenue au Bénin !",
        subtitle: "Arrivée à l’aéroport de Cotonou",
        times: [
          "Accueil personnalisé & dîner convivial",
          "Installation dans votre hébergement",
        ],
        position: "left",
        image: img1,
      },
      {
        title: "Cotonou : Beauté & Créativité",
        subtitle: "07h30 - Petit-déjeuner",
        times: [
          "08h30 - Départ pour le Marché des Arts de Cotonou",
          "09h00 - 10h30 : Découverte du marché des arts (échanges avec les artisanes)",
          "10h30 - Balade : Mur de fresques patrimoniales & Place de l’Amazone",
          "12h30 - Déjeuner dans un restaurant local",
          "14h30 - Pause bien-être à l’Institut L.A Beauty (coiffure, pédicure, massage…)",
          "18h00 - Atelier peinture en plein air à Fidjrossè",
          "20h00 - Dîner",
        ],
        position: "right",
        image: img2,
      },
      {
        title: "Ouidah : Mémoire & Féminité",
        subtitle: "07h30 - Petit-déjeuner",
        times: [
          "08h30 - Départ pour Ouidah",
          "09h30 - Atelier culinaire au resto Kolè : préparation et dégustation d’un plat traditionnel oublié",
          "15h00 - Découvertes : Temple des Pythons, Indigo Home (teinture indigo, artisanat local)",
          "18h00 - Soirée détente à la plage (coucher de soleil, noix de coco)",
          "20h00 - Retour à Cotonou & dîner",
        ],
        position: "left",
        image: img3,
      },
      {
        title: "Porto-Novo : Héritage & Nature",
        subtitle: "07h00 - Petit-déjeuner",
        times: [
          "08h00 - Départ pour Adjarra",
          "09h00 - Balade en pirogue sur la Rivière noire",
          "Rencontre avec des productrices de vin & sodabi à Avrankou",
          "13h00 - Déjeuner dans un restaurant local",
          "14h00 - Visite du Musée Honmè & Jardin des Plantes et de la Nature",
          "18h00 - Retour à Cotonou / temps libre",
          "20h00 - Dîner",
        ],
        position: "right",
        image: img4,
      },
      {
        title: "Abomey : Amazones & Royauté",
        subtitle: "07h00 - Petit-déjeuner express",
        times: [
          "10h30 - Visite du palais privé du Roi Agonglo + atelier de tissage traditionnel",
          "12h30 - Découverte de la place ADANZOUNDJI (lieu sacré des Amazones du Dahomey)",
          "13h00 - Brunch ou déjeuner en ville",
          "14h30 - Visite du Lieu Unik + séance photo en accoutrements royaux et amazones",
          "17h00 - Détente à la place Goho (statue de Béhanzin) + dégustation de jus de coco",
          "19h00 - Dîner & nuit sur place",
        ],
        position: "left",
        image: img5,
      },
      {
        title: "Possotomè : Bien-être & Sororité",
        subtitle: "07h00 - Petit-déjeuner express",
        times: [
          "10h00 - Matinée chic aux Merveilles du Lac Bopa (jeux aquatiques, détente)",
          "13h00 - Déjeuner les pieds dans l’eau",
          "15h00 - Détente chez Théo : massages, bains thermaux, piscine à débordement",
          "19h00 - Dîner & nuit sur place",
        ],
        position: "right",
        image: img1,
      },
      {
        title: "Transmission & Célébration",
        subtitle: "Matinée libre",
        times: [
          "Achats, détente, interviews vidéo si souhaitées",
          "Atelier créatif + Bomba Picnic en tenue traditionnelle",
          "Rencontre solidaire avec les structures soutenues par Dahomey Discovery",
          "Dîner de clôture (surprise)",
          "20h00 - Transfert vers l’aéroport ou point de retour",
        ],
        position: "left",
        image: img2,
      },
    ],
    inclusion: {
      inclus: [
        "Hébergement 6 nuits (hôtel ou maison d’hôte)",
        "Transport tout au long du séjour",
        "Guide certifié sur chaque site",
        "Prise en charge à l’aéroport (pour touristes étrangers)",
        "Accompagnement personnalisé",
        "Connexion internet lors des sorties",
        "Eau minérale",
      ],
      nonInclus: [
        "Boissons supplémentaires et alcoolisées",
        "Dépenses personnelles",
        "Assurance voyage (facultative)",
        "Activités à la carte (rituel, massage, etc.)",
        "Vols internationaux A/R",
        "Frais de visa",
      ],
    },
  },
];

export const CircuitView = () => {
  const { id } = useParams();
  const [isMobile, setIsMobile] = useState(false);
  const [selectedCircuitId, setSelectedCircuitId] = useState<string>("");
  const { pathname } = useLocation();
  const screenSize = useScreenSize();
  const [isHovered, setIsHovered] = useState(false);
  const [circuitInfos, setCircuitInfos] = useState<TravelPackage | null>(null);

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

  useEffect(() => {
    if (id) {
      const circuit = AllPackages.find((circuit) => circuit.id === id);
      if (circuit) {
        setCircuitInfos(circuit);
      }
    }
  }, [id]);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const handleCircuitHover = (circuitId: string) => {
    setSelectedCircuitId(circuitId);
  };

  // Configuration centralisée des circuits
  const circuits: Circuit[] = [
    {
      id: "circuit-signature",
      name: "Esprit des Femmes - Féminin sacré et créatif",
      duration: "9 jours / 8 nuits",
      description: "Groupes de femmes, voyages entre amies, militantes",
    },
  ];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <Flex justify="center" vertical>
      <BeginningButton />
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
          <source src={video} type="video/mp4" />
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
                {circuitInfos?.baseInfo.day} jours /{" "}
                {circuitInfos?.baseInfo.night} nuits
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
                  <span style={{ color: "black" }}>
                    {circuitInfos?.baseInfo.title}
                  </span>{" "}
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
                  {circuitInfos?.baseInfo.description}
                </Typography>
              </Flex>
            </Flex>
          </Flex>
        </Flex>

        {/* Timeline */}
        <Flex style={{ width: "100%" }}>
          <DetailedTimeline
            timelineData={circuitInfos?.timeline || []}
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
            inclus={circuitInfos?.inclusion.inclus || []}
            nonInclus={circuitInfos?.inclusion.nonInclus || []}
            screenSize={screenSize}
          />
        </Flex>
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
            Autres circuits thématiques
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
            {circuits
              .filter((circuit) => circuit.id !== id)
              .map((circuit, index) => (
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

export default CircuitView;
