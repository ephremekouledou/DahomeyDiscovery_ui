import { Button, Flex, Typography } from "antd";
import NavBar from "../../components/navBar/navBar";
import Footer from "../../components/footer/footer";
import { useEffect, useState } from "react";
import circuitImage from "../../assets/images/circuitImage.png";
import { Link, useLocation } from "react-router-dom";

type TimelineItemProps = {
  title: string;
  subtitle: string;
  times?: string[];
  details?: string[];
  position: "left" | "right" | string;
  index: number;
};

const TimelineItem = ({
  title,
  subtitle,
  times,
  details,
  position,
  index,
}: TimelineItemProps) => {
  const isLeft = position === "left";

  return (
    <div className="relative flex items-center mb-12">
      {/* Contenu à gauche */}
      <div className={`w-5/12`}>
        {isLeft && (
          <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-100">
            <h3
              className="font-semibold text-gray-900 mb-2"
              style={{ fontFamily: "DragonAngled", fontSize: "38px" }}
            >
              {title}
            </h3>
            <p
              className="text-gray-500 mb-3"
              style={{ fontFamily: "GeneralSans", fontSize: "15px" }}
            >
              {subtitle}
            </p>
            {times &&
              times.map((time, i) => (
                <p
                  key={i}
                  className="text-gray-600 mb-1"
                  style={{ fontFamily: "GeneralSans", fontSize: "15px" }}
                >
                  {time}
                </p>
              ))}
            {details &&
              details.map((detail, i) => (
                <p
                  key={i}
                  className="text-sm text-gray-700 mt-2"
                  style={{ fontFamily: "GeneralSans", fontSize: "15px" }}
                >
                  {detail}
                </p>
              ))}
          </div>
        )}
      </div>

      {/* Ligne centrale avec numéro */}
      <div className="w-2/12 flex justify-center relative">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-0.5 h-full bg-gray-300"></div>
        </div>
        <div className="relative z-10 w-12 h-12 bg-[#F59F00] rounded-lg flex items-center justify-center text-white font-bold text-lg shadow-md">
          {index.toString().padStart(2, "0")}
        </div>
      </div>

      {/* Contenu à droite */}
      <div className={`w-5/12`}>
        {!isLeft && (
          <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-100">
            <h3
              className="text-xl font-semibold text-gray-900 mb-2"
              style={{ fontFamily: "DragonAngled", fontSize: "38px" }}
            >
              {title}
            </h3>
            <p
              className="text-gray-500 mb-3"
              style={{ fontFamily: "GeneralSans", fontSize: "15px" }}
            >
              {subtitle}
            </p>
            {times &&
              times.map((time, i) => (
                <p
                  key={i}
                  className="text-gray-600 mb-1"
                  style={{ fontFamily: "GeneralSans", fontSize: "15px" }}
                >
                  {time}
                </p>
              ))}
            {details &&
              details.map((detail, i) => (
                <p
                  key={i}
                  className="text-gray-700 mt-2"
                  style={{ fontFamily: "GeneralSans", fontSize: "15px" }}
                >
                  {detail}
                </p>
              ))}
          </div>
        )}
      </div>
    </div>
  );
};

const FinalElement = () => {
  return (
    <div className="relative flex justify-center items-center pt-8 pb-12">
      <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-0.5 h-16 bg-gray-300"></div>
      <div className="relative z-10 bg-white rounded-lg shadow-lg p-8 border border-gray-100 max-w-2xl text-center mt-16">
        <div className="w-16 h-16 bg-[#F59F00] rounded-full flex items-center justify-center text-white font-bold text-2xl shadow-md mx-auto -mt-16 mb-6">
          ✓
        </div>
        <h3
          className="font-bold text-gray-900 mb-4"
          style={{ fontFamily: "DragonAngled", fontSize: "38px" }}
        >
          Fin du voyage
        </h3>
        <p
          className="text-gray-600 mb-2"
          style={{ fontFamily: "GeneralSans", fontSize: "15px" }}
        >
          Retour à l'aéroport de Cotonou
        </p>
        <p
          className="text-gray-500"
          style={{ fontFamily: "GeneralSans", fontSize: "15px" }}
        >
          Transfert organisé • Assistance jusqu'au départ
        </p>
        <p
          className="text-gray-500 mt-4"
          style={{ fontFamily: "GeneralSans", fontSize: "15px" }}
        >
          Merci pour ce magnifique voyage au Bénin !
        </p>
      </div>
    </div>
  );
};

const DetailedTimeline = () => {
  const timelineData = [
    {
      title: "Bienvenue au Bénin !",
      subtitle: "Arrivée à l'aéroport de Cotonou",
      times: [
        "Accueil personnalisé + transfert vers hôtel de charme",
        "Dîner d'accueil dans un restaurant local",
      ],
      position: "left",
    },
    {
      title: "Cotonou entre modernité et culture urbaine",
      subtitle: "08h00 - Petit déjeuner à l'hôtel",
      times: [
        "09h00 - Départ pour le marché Dantokpa",
        "11h00 - Découverte du Musée de Ouidah",
        "13h00 - Déjeuner avec spécialités béninoises",
        "14h30 - Visite de la Place de l'Amazone",
        "16h00 - Temps libre ou visite de Fidjrossè",
        "20h00 - Dîner dans un restaurant local / Nuit à Cotonou",
      ],
      position: "right",
    },
    {
      title: "Ganvié, la Venise du Bénin",
      subtitle: "07h30 - Petit déjeuner",
      times: [
        "08h30 - Départ pour Abomey-Calavi",
        "09h00 - Embarquement en pirogue vers Ganvié",
        "09h30-12h30 - Visite guidée du village lacustre",
        "13h00 - Déjeuner sur l'eau",
        "15h00 - Retour à Cotonou",
        "19h30 - Dîner & soirée libre / Nuit à Cotonou",
      ],
      position: "left",
    },
    {
      title: "Ouidah & Bégotinkpon, mémoire et immersion rurale",
      subtitle: "07h00 - Petit déjeuner",
      times: [
        "08h00 - Départ pour Ouidah",
        "09h15 - Visite du Musée d'Histoire",
        "11h30 - Route des Esclaves",
        "13h00 - Déjeuner local",
        "14h30 - Départ vers Bégotinkpon",
        "16h00 - Immersion rurale",
        "18h00 - Dîner local + nuit en écologie",
      ],
      position: "right",
    },
    {
      title: "Abomey, mémoire royale et artisanat",
      subtitle: "07h30 - Petit déjeuner",
      times: [
        "08h30 - Route vers Abomey",
        "11h00 - Visite du Palais royal + musée",
        "13h00 - Déjeuner béninois",
        "15h00 - Atelier artisanal",
        "17h00 - Visite Place Goho",
        "19h30 - Dîner & nuit à Abomey",
      ],
      position: "left",
    },
    {
      title: "Dassa-Zoumé, spiritualité et nature sacrée",
      subtitle: "07h00 - Petit déjeuner",
      times: [
        "08h00 - Départ vers Dassa",
        "10h00 - Visite des collines sacrées",
        "12h00 - Déjeuner + visite Okuta",
        "16h00 - Retour vers Paradomé",
        "20h00 - Dîner + nuit au bord du lac Ahémé",
      ],
      position: "right",
    },
    {
      title: "Possotomé, nature et détente",
      subtitle: "08h00 - Petit déjeuner",
      times: [
        "09h00 - Balade au bord du lac",
        "11h00 - Activités nautiques",
        "13h00 - Déjeuner poisson frais",
        "Après-midi libre : détente, baignade",
        "19h00 - Dîner au coucher du soleil",
      ],
      position: "left",
    },
  ];

  return (
    <div className="min-h-screen  py-12 w-full">
      <div className="px-4">
        <div className="relative">
          {/* Ligne verticale continue */}
          <div className="absolute left-1/2 transform -translate-x-1/2 w-0.5 h-full bg-gray-300"></div>

          {/* Items de la timeline */}
          {timelineData.map((item, index) => (
            <TimelineItem key={index} {...item} index={index + 1} />
          ))}

          {/* Élément final centré */}
          <FinalElement />
        </div>
      </div>
    </div>
  );
};

const InclusNonInclusComponent = () => {
  const inclus = [
    "Hébergement 9 nuits (hôtel, maison d'hôte ou écolodge)",
    "Chauffeur privé + véhicule climatisé",
    "Guide certifié sur chaque site",
    "Prise en charge à l'aéroport",
    "Accompagnement personnalisé",
    "Connexion internet + kit de bienvenue",
  ];

  const nonInclus = [
    "Hébergement 9 nuits (hôtel, maison d'hôte ou écolodge)",
    "Chauffeur privé + véhicule climatisé",
    "Guide certifié sur chaque site",
    "Prise en charge à l'aéroport",
    "Accompagnement personnalisé",
    "Connexion internet + kit de bienvenue",
  ];

  return (
    <div className="w-full px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* Section INCLUS */}
        <div
          style={{
            backgroundColor: "#EAFFEF",
            padding: "25px 30px",
            height: "fit-content",
          }}
        >
          <Typography.Title
            level={2}
            style={{
              color: "#36A330",
              fontSize: "49px",
              fontFamily: "DragonAngled",
              fontWeight: "bold",
              textTransform: "uppercase",
              letterSpacing: "0.05em",
            }}
          >
            INCLUS
          </Typography.Title>
          <ul className="space-y-1">
            {inclus.map((item, index) => (
              <li key={index} className="flex items-start">
                <span style={{ paddingRight: "10px" }}>•</span>
                <Typography.Text
                  style={{
                    fontSize: "16px",
                    fontFamily: "GeneralSans",
                  }}
                >
                  {item}
                </Typography.Text>
              </li>
            ))}
          </ul>
        </div>

        {/* Section NON INCLUS */}
        <div
          style={{
            backgroundColor: "#FFE6E6",
            padding: "25px 30px",
            height: "fit-content",
          }}
        >
          <Typography.Title
            level={2}
            style={{
              color: "#991D00",
              fontSize: "49px",
              fontFamily: "DragonAngled",
              fontWeight: "bold",
              textTransform: "uppercase",
              letterSpacing: "0.05em",
            }}
          >
            NON INCLUS
          </Typography.Title>
          <ul className="space-y-1">
            {nonInclus.map((item, index) => (
              <li key={index} className="flex items-start">
                <span style={{ paddingRight: "10px" }}>•</span>
                <Typography.Text
                  style={{
                    fontSize: "16px",
                    fontFamily: "GeneralSans",
                  }}
                >
                  {item}
                </Typography.Text>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

const CircuitsSignature = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
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

  // Effet pour définir le titre de la page
  useEffect(() => {
    document.title = "Circuits Thématiques";
  }, []);

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
          paddingBottom: isMobile ? "10vw" : "8vw",
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
              CIRCUIT SIGNATURE
            </Typography.Text>
            <Typography.Title
              level={1}
              style={{
                color: "#FF3100",
                fontSize: isMobile ? "44px" : "85px",
                fontWeight: "900",
                lineHeight: "1",
                letterSpacing: "0.03em",
                marginTop: "20px",
                marginBottom: "15px",
                fontFamily: "DragonAngled",
                textTransform: "uppercase",
              }}
            >
              Richesse du bénin
            </Typography.Title>
            <Typography.Text
              style={{
                color: "#000000",
                fontSize: isMobile ? "24px" : "45px",
                lineHeight: "1",
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
            // paddingBottom: isMobile ? "4vw" : "15vw",
            position: "relative",
            bottom: isMobile ? "1vw" : "3vw",
          }}
        >
          <Flex vertical style={{ backgroundColor: "white" }}>
            {/* Badge de durée - affiché uniquement pour le circuit sélectionné */}
            <Flex
              style={{
                backgroundColor: "#FFE0D9",
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
                10 jours / 9 nuits
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
            >
              <Flex vertical>
                <Typography.Title
                  level={2}
                  style={{
                    color: "#BF2500",
                    fontSize: isMobile ? "26px" : "58px",
                    fontFamily: "DragonAngled",
                    fontWeight: "300",
                    paddingLeft: isMobile ? "8px" : "24px",
                    margin: "0",
                    lineHeight: isMobile ? "1.2" : "1.4",
                    transition: "all 0.5s ease",
                  }}
                >
                  <span style={{ color: "black" }}>L'Essentiel du Bénin</span>{" "}
                  (Best-seller)
                </Typography.Title>
                <Typography
                  style={{
                    color: "#311715",
                    fontSize: isMobile ? "26px" : "18px",
                    paddingLeft: isMobile ? "8px" : "25px",
                    fontFamily: "GeneralSans",
                    fontWeight: "300",
                  }}
                >
                  Voyageurs curieux, familles, groupes DOM-TOM, premiers séjours
                </Typography>
              </Flex>

              {/* Image affichée uniquement pour le circuit sélectionné */}
              <img
                src={circuitImage}
                style={{
                  height: isMobile ? "5rem" : "15rem",
                  width: "auto",
                  paddingRight: isMobile ? "16px" : "64px",
                  maxWidth: isMobile ? "40vw" : "30vw",
                  position: "relative",
                }}
                className="Accueil_image_2"
              />
            </Flex>
          </Flex>
        </Flex>

        <Flex style={{ width: "100%" }}>
          <DetailedTimeline />
        </Flex>

        <Flex justify="center">
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
                fontSize: "17px",
                fontWeight: "200",
              }}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              RÉSERVER
            </Button>
          </Link>
        </Flex>

        <Flex style={{ width: "100%", paddingBottom: "60px" }}>
          <InclusNonInclusComponent />
        </Flex>
      </Flex>

      {/* Footer */}
      <Footer />
    </Flex>
  );
};

export default CircuitsSignature;
