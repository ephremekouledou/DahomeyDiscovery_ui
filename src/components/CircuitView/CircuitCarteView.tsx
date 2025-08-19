import { Flex, Typography } from "antd";
import { useLocation, useParams } from "react-router-dom";
import NavBar from "../navBar/navBar";
import Footer from "../footer/footer";
import { useState, useEffect } from "react";
import BeginningButton from "../dededed/BeginingButton";
import video from "../../assets/videos/usagevid1.mp4";
import debut from "../../assets/images/Circuit signature/Début.webp";
import img1 from "../../assets/images/Accueil/1_5.webp";
import img2 from "../../assets/images/Accueil/2_5.webp";
import img3 from "../../assets/images/Accueil/3_5.webp";
import img4 from "../../assets/images/4.jpg";
import img5 from "../../assets/images/5.jpg";
import { ThematicCircuitCard } from "./Card";
import { useScreenSizeResponsive } from "./Timeline";
import ImageCarousel from "../ImageGallery/ImageCarousel";

const IMAGES = [img1, img2, img3];

const CIRCUIT_CARDS = [
  {
    id: "Cotonou",
    activity: [
      {
        imageUrl: img1,
        title: "Place de l’Amazone",
        description:
          "Balade sur un lieu emblématique avec une statue monumentale honorant les guerrières du Dahomey.",
        alt: "Circuit à la carte",
      },
      {
        imageUrl: img2,
        title: "Mur du Patrimoine",
        description:
          "Balade culturelle et street art retraçant l’histoire et la créativité urbaine de Cotonou.",
        alt: "Circuit à la carte",
      },
      {
        imageUrl: img3,
        title: "Marché des Arts et de l’Artisanat",
        description:
          "Rencontre avec des artisans locaux et découverte de leurs créations uniques.",
        alt: "Circuit à la carte",
      },
      {
        imageUrl: img4,
        title: "Plage de Fidjrossè",
        description: "Moment de détente au bord de l’eau et air marin vivifiant.",
        alt: "Circuit à la carte",
      },
    ],
  },
  {
    id: "Abomey",
    activity: [
      {
        imageUrl: img1,
        title: "Palais Royaux d’Abomey",
        description:
          "Immersion dans l’histoire du Royaume du Dahomey à travers les palais des Rois.",
        alt: "Circuit à la carte",
      },
      {
        imageUrl: img2,
        title: "Village artisanal",
        description:
          "Découverte du tissage traditionnel et rencontre avec les artisans locaux.",
        alt: "Circuit à la carte",
      },
      {
        imageUrl: img3,
        title: "Marché vodoun",
        description:
          "Observer les produits rituels et objets sacrés utilisés dans la religion traditionnelle.",
        alt: "Circuit à la carte",
      },
      {
        imageUrl: img4,
        title: "Temple vodoun des Tohossou",
        description:
          "Découverte d’un haut lieu mystique et des croyances locales.",
        alt: "Circuit à la carte",
      },
      {
        imageUrl: img5,
        title: "Place Goho",
        description:
          "Détente et dégustation de jus de coco, cœur historique d’Abomey.",
        alt: "Circuit à la carte",
      },
      {
        imageUrl: img1,
        title: "Balade dans les quartiers historiques",
        description:
          "Découvrir l’architecture traditionnelle et l’ambiance locale.",
        alt: "Circuit à la carte",
      },
    ],
  },
  {
    id: "Porto-Novo",
    activity: [
      {
        imageUrl: img1,
        title: "Musée Honmè",
        description:
          "Découvrir l’histoire royale et les objets traditionnels du Dahomey.",
        alt: "Circuit à la carte",
      },
      {
        imageUrl: img2,
        title: "Grande Mosquée afro-brésilienne",
        description:
          "Explorer l’architecture et l’histoire de cette mosquée emblématique.",
        alt: "Circuit à la carte",
      },
      {
        imageUrl: img3,
        title: "Place Abessan",
        description:
          "Lieu historique lié à la première divinité installée à Porto-Novo.",
        alt: "Circuit à la carte",
      },
      {
        imageUrl: img4,
        title: "Sentinelle du Climat",
        description:
          "Œuvres contemporaines sensibilisant aux inondations et changements climatiques.",
        alt: "Circuit à la carte",
      },
      {
        imageUrl: img5,
        title: "Jardin des Plantes et de la Nature",
        description:
          "Immersion dans l’ancien espace forestier pour une reconnexion à la nature.",
        alt: "Circuit à la carte",
      },
      {
        imageUrl: img1,
        title: "Promenade dans le centre historique",
        description:
          "Immersion dans l’architecture coloniale, afro brésilien et ruelles typiques.",
        alt: "Circuit à la carte",
      },
    ],
  },
  {
    id: "Ganvie",
    activity: [
      {
        imageUrl: img1,
        title: "Balade en pirogue",
        description:
          "Découvrir la Venise de l’Afrique et la vie lacustre unique de Ganvié.",
        alt: "Circuit à la carte",
      },
      {
        imageUrl: img2,
        title: "Village flottant",
        description:
          "Visite des habitations sur pilotis et rencontre avec les habitants.",
        alt: "Circuit à la carte",
      },
      {
        imageUrl: img3,
        title: "Marché flottant",
        description:
          "Échanges avec les commerçants locaux et dégustation de produits frais.",
        alt: "Circuit à la carte",
      },
    ],
  },
  {
    id: "Dassa",
    activity: [
      {
        imageUrl: img1,
        title: "Randonnée en montagne",
        description:
          "Explorer les paysages naturels, panoramas et biodiversité des collines sacrées.",
        alt: "Circuit à la carte",
      },
      {
        imageUrl: img2,
        title: "Sites sacrés locaux",
        description:
          "Immersion dans les traditions spirituelles et rituels de la région.",
        alt: "Circuit à la carte",
      },
      {
        imageUrl: img3,
        title: "Villages traditionnels",
        description:
          "Rencontre avec les habitants, artisanat et culture locale.",
        alt: "Circuit à la carte",
      },
    ],
  },
  {
    id: "Gogotinkpon",
    activity: [
      {
        imageUrl: img1,
        title: "Atelier culinaire Dakouin",
        description:
          "Cuisine locale avec les femmes du village, un plat traditionnel à base de manioc et poisson.",
        alt: "Circuit à la carte",
      },
      {
        imageUrl: img2,
        title: "Découverte de la mangrove",
        description:
          "Immersion écologique et observation de la faune locale (oiseaux, crabes, poissons).",
        alt: "Circuit à la carte",
      },
      {
        imageUrl: img3,
        title: "Pêche traditionnelle",
        description: "Initiation aux techniques locales avec les habitants.",
        alt: "Circuit à la carte",
      },
      {
        imageUrl: img4,
        title: "Bains d’argile thérapeutique",
        description: "Profitez des vertus régénérantes de l’argile locale.",
        alt: "Circuit à la carte",
      },
      {
        imageUrl: img5,
        title: "Massage Afrotôbô",
        description:
          "Moment de détente inspiré des pratiques ancestrales du village.",
        alt: "Circuit à la carte",
      },
    ],
  },
  {
    id: "Grand-Popo",
    activity: [
      {
        imageUrl: img1,
        title: "Plages paradisiaques",
        description:
          "Relaxez-vous sur le sable fin bordé de cocotiers et admirez le coucher du soleil.",
        alt: "Circuit à la carte",
      },
      {
        imageUrl: img2,
        title: "Observation des oiseaux",
        description:
          "Sanctuaire naturel pour observer une grande variété d’espèces.",
        alt: "Circuit à la carte",
      },
      {
        imageUrl: img3,
        title: "Visite du marché local",
        description:
          "Découverte du terroir, ambiance chaleureuse et échanges authentiques.",
        alt: "Circuit à la carte",
      },
      {
        imageUrl: img4,
        title: "Découverte du patrimoine",
        description:
          "Exploration des forts coloniaux, villages traditionnels et vestiges historiques.",
        alt: "Circuit à la carte",
      },
    ],
  },
  {
    id: "Ouidah",
    activity: [
      {
        imageUrl: img1,
        title: "Temple des Pythons",
        description:
          "Lieu sacré du culte vodoun avec les Pythons royaux, symbole de courage.",
        alt: "Circuit à la carte",
      },
      {
        imageUrl: img2,
        title: "Basilique de l’Immaculée Conception",
        description:
          "Découverte d’un lieu sacré parmi les plus anciens du catholicisme béninois.",
        alt: "Circuit à la carte",
      },
      {
        imageUrl: img3,
        title: "Route des Esclaves",
        description:
          "Promenez vous sur ce chemin historique jusqu’à la mer.",
        alt: "Circuit à la carte",
      },
      {
        imageUrl: img5,
        title: "Porte du Non - Retour",
        description:
          "Découvrez un monument emblématique érigé en mémoire des esclaves déportés , un lieu chargé d’histoire et d’émotion.",
        alt: "Circuit à la carte",
      },
      {
        imageUrl: img4,
        title: "Plage de Ouidah",
        description:
          "Moment de détente sur le sable fin et immersion dans la nature.",
        alt: "Circuit à la carte",
      },
      {
        imageUrl: img5,
        title: "Forêt sacrée de Kpassè",
        description:
          "Espace naturel avec arbres centenaires et statues vodoun.",
        alt: "Circuit à la carte",
      },
    ],
  },
  {
    id: "Possotomè",
    activity: [
      {
        imageUrl: img1,
        title: "Lac Ahémé",
        description:
          "Balade en pirogue pour admirer les paysages paisibles du lac.",
        alt: "Circuit à la carte",
      },
      {
        imageUrl: img2,
        title: "Sources thermales",
        description:
          "Découverte des eaux chaudes naturelles aux vertus thérapeutiques.",
        alt: "Circuit à la carte",
      },
      {
        imageUrl: img3,
        title: "Villages lacustres",
        description:
          "Visite des villages installés au bord de l’eau et observation de leur mode de vie.",
        alt: "Circuit à la carte",
      },
      {
        imageUrl: img4,
        title: "Pêche traditionnelle",
        description:
          "Partage d’un moment authentique avec les pêcheurs locaux.",
        alt: "Circuit à la carte",
      },
      {
        imageUrl: img5,
        title: "Artisanat local",
        description:
          "Achat de nattes, sculptures et objets faits main par les artisans.",
        alt: "Circuit à la carte",
      },
    ],
  },
] as const;


export const CircuitCarteView = () => {
  const { id } = useParams();
  const [isMobile, setIsMobile] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const { screenSize, isTablet } = useScreenSizeResponsive();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

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
              Découverte de régions
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
              Chaque ville est une porte d’entrée vers une histoire, une
              tradition, un paysage
            </Typography.Text>
          </Flex>
        </Flex>
      </Flex>

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
          {id} vous propose...
        </Typography.Title>
        <Flex gap={30} wrap justify="center">
          {CIRCUIT_CARDS.find(card => card.id === id)?.activity.map((card, index) => (
            <Flex key={card.alt}>
              <div className={`circuit-card-${index + 1}`}>
                <ThematicCircuitCard
                  imageUrl={card.imageUrl}
                  title={card.title}
                  description={card.description}
                  alt={card.alt}
                  screenSize={screenSize}
                />
              </div>
            </Flex>
          ))}
        </Flex>
      </Flex>

      <section
        style={{
          marginTop: "60px",
          height: isMobile ? "60vw" : isTablet ? "50vw" : "45vw",
          minHeight: "300px",
        }}
      >
        <ImageCarousel images={IMAGES} />
      </section>

      {/* Footer */}
      <Footer />
    </Flex>
  );
};

export default CircuitCarteView;
