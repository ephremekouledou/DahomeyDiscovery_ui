import { Button, Flex, Typography } from "antd";
import NavBar from "../../components/navBar/navBar";
import Footer from "../../components/footer/footer";
import { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import ImageCarousel from "../../components/ImageGallery/ImageCarousel";
// import img1 from "../../assets/images/1.jpg";
import img2 from "../../assets/images/2.jpg";
// import img3 from "../../assets/images/3.jpg";
import img4 from "../../assets/images/4.jpg";
// import img5 from "../../assets/images/5.jpg";
import img6 from "../../assets/images/6.jpg";
// import img7 from "../../assets/images/7.jpg";
import img8 from "../../assets/images/8.jpg";
// import img9 from "../../assets/images/9.jpg";
import img10 from "../../assets/images/10.jpg";
/* import img11 from "../../assets/images/11.jpg";
import img12 from "../../assets/images/12.jpg";
import img13 from "../../assets/images/13.jpg";
import img14 from "../../assets/images/14.png"; */

const images = [
  // img1,
  img2,
  // img3,
  img4,
  // img5,
  img6,
  // img7,
  img8,
  // img9,
  img10,
  // img11,
  // img12,
  // img13,
  // img14,
];

type TimelineItemProps = {
  title: string;
  subtitle: string;
  times?: string[];
  details?: string[];
  position: "left" | "right" | string;
  index: number;
  isActive: boolean;
};

const DetailedTimeline = () => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const timelineRef = useRef<HTMLDivElement | null>(null);

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

  useEffect(() => {
    const handleScroll = () => {
      if (timelineRef.current) {
        const element = timelineRef.current;
        const rect = element.getBoundingClientRect();
        const windowHeight = window.innerHeight;

        // Calculer la progression du scroll pour cet élément
        const elementTop = rect.top;
        const elementHeight = rect.height;

        // Commencer l'animation dès que l'élément commence à entrer dans la vue
        const startOffset = windowHeight; // Commencer dès que le haut de l'élément touche le bas de l'écran
        const endOffset = -elementHeight; // Finir quand l'élément sort complètement de la vue

        // Calculer la progression de 0 à 1
        const totalDistance = startOffset - endOffset;
        const currentDistance = startOffset - elementTop;
        const progress = Math.max(
          0,
          Math.min(1, currentDistance / totalDistance)
        );

        setScrollProgress(progress);
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Appeler une fois au montage

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="min-h-screen py-12 w-full" ref={timelineRef}>
      <div className="px-4">
        <div className="relative">
          {/* Ligne verticale de base (grise) */}
          <div className="absolute left-1/2 transform -translate-x-1/2 w-0.5 h-full bg-gray-300"></div>

          {/* Ligne verticale animée (orange) */}
          <div
            className="absolute left-1/2 transform -translate-x-1/2 w-0.5 bg-[#F59F00] transition-all duration-300 ease-out"
            style={{
              height: `${scrollProgress * 100}%`,
              top: 0,
            }}
          ></div>

          {/* Items de la timeline */}
          {timelineData.map((item, index) => {
            // Calculer si cet item spécifique est actif basé sur sa position dans la timeline
            const itemProgress = (index + 1) / (timelineData.length + 1);
            const isActive = scrollProgress >= itemProgress * 0.7; // Activation plus précoce

            return (
              <TimelineItem
                key={index}
                {...item}
                index={index + 1}
                isActive={isActive}
              />
            );
          })}

          {/* Élément final centré */}
          <FinalElement isActive={scrollProgress >= 0.6} />
        </div>
      </div>
    </div>
  );
};

// Mise à jour du composant TimelineItem pour inclure l'animation
const TimelineItem = ({
  title,
  subtitle,
  times,
  details,
  position,
  index,
  isActive,
}: TimelineItemProps) => {
  const isLeft = position === "left";

  return (
    <div className="relative flex items-center mb-12">
      {/* Contenu à gauche */}
      <div
        className={`w-5/12 transition-all duration-500 ${
          isActive ? "opacity-100 translate-y-0" : "opacity-70 translate-y-2"
        }`}
      >
        {isLeft && (
          <div
            className={`rounded-lg shadow-sm p-6 border transition-all duration-500 ${
              isActive
                ? "bg-[#F59F00] border-[#F59F00]"
                : "bg-white border-gray-100"
            }`}
          >
            <h3
              className={`font-semibold mb-2 transition-colors duration-500 ${
                isActive ? "text-white" : "text-[#F59F00]"
              }`}
              style={{ fontFamily: "DragonAngled", fontSize: "38px" }}
            >
              {title}
            </h3>
            <p
              className={`mb-3 transition-colors duration-500 ${
                isActive ? "text-white/90" : "text-gray-500"
              }`}
              style={{ fontFamily: "GeneralSans", fontSize: "15px" }}
            >
              {subtitle}
            </p>
            {times &&
              times.map((time, i) => (
                <p
                  key={i}
                  className={`mb-1 transition-colors duration-500 ${
                    isActive ? "text-white/85" : "text-gray-600"
                  }`}
                  style={{ fontFamily: "GeneralSans", fontSize: "15px" }}
                >
                  {time}
                </p>
              ))}
            {details &&
              details.map((detail, i) => (
                <p
                  key={i}
                  className={`text-sm mt-2 transition-colors duration-500 ${
                    isActive ? "text-white/85" : "text-gray-700"
                  }`}
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
          <div className="w-0.5 h-full bg-transparent"></div>
        </div>
        <div
          className={`relative z-10 w-12 h-12 rounded-lg flex items-center justify-center text-white font-bold text-lg shadow-md transition-all duration-500 ${
            isActive ? "bg-[#F59F00] scale-110" : "bg-gray-400 scale-100"
          }`}
        >
          {index.toString().padStart(2, "0")}
        </div>
      </div>

      {/* Contenu à droite */}
      <div
        className={`w-5/12 transition-all duration-500 ${
          isActive ? "opacity-100 translate-y-0" : "opacity-70 translate-y-2"
        }`}
      >
        {!isLeft && (
          <div
            className={`rounded-lg shadow-sm p-6 border transition-all duration-500 ${
              isActive
                ? "bg-[#F59F00] border-[#F59F00]"
                : "bg-white border-gray-100"
            }`}
          >
            <h3
              className={`text-xl font-semibold mb-2 transition-colors duration-500 ${
                isActive ? "text-white" : "text-[#F59F00]"
              }`}
              style={{ fontFamily: "DragonAngled", fontSize: "38px" }}
            >
              {title}
            </h3>
            <p
              className={`mb-3 transition-colors duration-500 ${
                isActive ? "text-white/90" : "text-gray-500"
              }`}
              style={{ fontFamily: "GeneralSans", fontSize: "15px" }}
            >
              {subtitle}
            </p>
            {times &&
              times.map((time, i) => (
                <p
                  key={i}
                  className={`mb-1 transition-colors duration-500 ${
                    isActive ? "text-white/85" : "text-gray-600"
                  }`}
                  style={{ fontFamily: "GeneralSans", fontSize: "15px" }}
                >
                  {time}
                </p>
              ))}
            {details &&
              details.map((detail, i) => (
                <p
                  key={i}
                  className={`mt-2 transition-colors duration-500 ${
                    isActive ? "text-white/85" : "text-gray-700"
                  }`}
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

// Mise à jour du composant FinalElement
const FinalElement = ({ isActive }: { isActive: boolean }) => {
  return (
    <div className="relative flex justify-center items-center pt-8 pb-12">
      <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-0.5 h-16 bg-transparent"></div>
      <div
        className={`relative z-10 rounded-lg shadow-lg p-8 border max-w-2xl text-center mt-16 transition-all duration-500 ${
          isActive
            ? "bg-[#F59F00] border-[#F59F00] opacity-100 translate-y-0"
            : "bg-white border-gray-100 opacity-70 translate-y-4"
        }`}
      >
        <div
          className={`w-16 h-16 rounded-full flex items-center justify-center text-white font-bold text-2xl shadow-md mx-auto -mt-16 mb-6 transition-all duration-500 ${
            isActive ? "bg-[#F59F00] scale-110" : "bg-gray-400 scale-100"
          }`}
        >
          ✓
        </div>
        <h3
          className={`font-bold mb-4 transition-colors duration-500 ${
            isActive ? "text-white" : "text-gray-900"
          }`}
          style={{ fontFamily: "DragonAngled", fontSize: "38px" }}
        >
          Fin du voyage
        </h3>
        <p
          className={`mb-2 transition-colors duration-500 ${
            isActive ? "text-white/90" : "text-gray-600"
          }`}
          style={{ fontFamily: "GeneralSans", fontSize: "15px" }}
        >
          Retour à l'aéroport de Cotonou
        </p>
        <p
          className={`transition-colors duration-500 ${
            isActive ? "text-white/85" : "text-gray-500"
          }`}
          style={{ fontFamily: "GeneralSans", fontSize: "15px" }}
        >
          Transfert organisé • Assistance jusqu'au départ
        </p>
        <p
          className={`mt-4 transition-colors duration-500 ${
            isActive ? "text-white/85" : "text-gray-500"
          }`}
          style={{ fontFamily: "GeneralSans", fontSize: "15px" }}
        >
          Merci pour ce magnifique voyage au Bénin !
        </p>
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
    document.title = "Circuits Signature";
  }, []);

  return (
    <Flex justify="center" vertical>
      {/* Header avec NavBar */}
      <div className="relative z-20 flex items-center justify-center">
        <NavBar menu="CIRCUITS" />
      </div>

      {/* Section héros - Responsive */}
      <Flex
        vertical
        className="relative w-full overflow-hidden"
        style={{
          backgroundImage: `url(${img2})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          padding: isMobile ? "4vh 6vw" : "8vh 8vw",
          paddingBottom: isMobile ? "10vw" : "8vw",
        }}
      >
        {/* Gradient overlay - de la couleur beige/crème vers transparent */}
        <div
          className="absolute inset-0"
          style={{
            background: `linear-gradient(to right, 
            rgba(250, 235, 215, 0.95) 0%,
            rgba(250, 235, 215, 0.85) 20%,
            rgba(250, 235, 215, 0.6) 40%,
            rgba(250, 235, 215, 0.3) 60%,
            rgba(250, 235, 215, 0.1) 80%,
            transparent 100%)`,
          }}
        />
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
          className="bg-white rounded-lg shadow-md border border-gray-200 p-6"
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
          <Flex
            vertical
            style={{ backgroundColor: "white" }}
            className="bg-white rounded-lg shadow-md border border-gray-200 p-6"
          >
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
                height: isMobile ? "80px" : "150px",
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

      <section style={{ height: "45vw" }}>
        <ImageCarousel images={images} />
      </section>

      {/* Footer */}
      <Footer />
    </Flex>
  );
};

export default CircuitsSignature;
