import { Button, Flex, Typography } from "antd";
import NavBar from "../../components/navBar/navBar";
import Footer from "../../components/footer/footer";
import { useEffect, useRef, useState, useCallback, useMemo } from "react";
import { Link, useLocation } from "react-router-dom";
import ImageCarousel from "../../components/ImageGallery/ImageCarousel";
import debut from "../../assets/images/Circuit signature/Début.webp";
import img1 from "../../assets/images/Circuit signature/1_5.webp";
import img2 from "../../assets/images/Circuit signature/2_5.webp";
import img3 from "../../assets/images/Circuit signature/3_5.webp";
import img4 from "../../assets/images/Circuit signature/4_5.webp";
import img5 from "../../assets/images/Circuit signature/5_5.webp";

// Optimisation: Déplacer les images en constante pour éviter les re-rendus
const images = [img1, img2, img3, img4, img5];

// Optimisation: Données de la timeline en constante avec images
const timelineData = [
  {
    title: "Bienvenue au Bénin !",
    subtitle: "Arrivée à l'aéroport de Cotonou",
    times: [
      "Accueil personnalisé + transfert vers hôtel de charme",
      "Dîner d'accueil dans un restaurant local",
    ],
    position: "left",
    image: img1,
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
    image: img2,
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
    image: img3,
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
    image: img4,
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
    image: img5,
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
    image: img1,
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

// Optimisation: Types TypeScript
type TimelineItemProps = {
  title: string;
  subtitle: string;
  times?: string[];
  details?: string[];
  position: "left" | "right" | string;
  index: number;
  isActive: boolean;
  screenSize: ReturnType<typeof useScreenSize>;
  image?: string;
};

// Composant Timeline optimisé
const DetailedTimeline = ({ screenSize }: { screenSize: ReturnType<typeof useScreenSize> }) => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const timelineRef = useRef<HTMLDivElement | null>(null);

  // Optimisation: useCallback pour éviter les re-rendus
  const handleScroll = useCallback(() => {
    if (timelineRef.current) {
      const element = timelineRef.current;
      const rect = element.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      const elementTop = rect.top;
      const elementHeight = rect.height;
      const startOffset = windowHeight;
      const endOffset = -elementHeight;
      const totalDistance = startOffset - endOffset;
      const currentDistance = startOffset - elementTop;
      const progress = Math.max(0, Math.min(1, currentDistance / totalDistance));

      setScrollProgress(progress);
    }
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  // Responsive: Ajustement du layout pour mobile
  const timelineLayout = screenSize.isMobile ? "vertical" : "horizontal";

  return (
    <div 
      className={`min-h-screen w-full ${
        screenSize.isMobile ? 'py-6 px-4' : 'py-12 px-4'
      }`} 
      ref={timelineRef}
    >
      <div className="relative">
        {/* Timeline pour desktop/tablet */}
        {timelineLayout === "horizontal" && (
          <>
            {/* Ligne verticale de base */}
            <div className="absolute left-1/2 transform -translate-x-1/2 w-0.5 h-full bg-gray-300"></div>
            {/* Ligne verticale animée */}
            <div
              className="absolute left-1/2 transform -translate-x-1/2 w-0.5 bg-[#F59F00] transition-all duration-300 ease-out"
              style={{
                height: `${scrollProgress * 100}%`,
                top: 0,
              }}
            ></div>
          </>
        )}

        {/* Timeline pour mobile */}
        {timelineLayout === "vertical" && (
          <>
            {/* Ligne verticale à gauche pour mobile */}
            <div className="absolute left-6 w-0.5 h-full bg-gray-300"></div>
            <div
              className="absolute left-6 w-0.5 bg-[#F59F00] transition-all duration-300 ease-out"
              style={{
                height: `${scrollProgress * 100}%`,
                top: 0,
              }}
            ></div>
          </>
        )}

        {/* Items de la timeline */}
        {timelineData.map((item, index) => {
          const itemProgress = (index + 1) / (timelineData.length + 1);
          const isActive = scrollProgress >= itemProgress * 0.7;

          return (
            <TimelineItem
              key={index}
              {...item}
              index={index + 1}
              isActive={isActive}
              screenSize={screenSize}
            />
          );
        })}

        {/* Élément final */}
        <FinalElement isActive={scrollProgress >= 0.6} screenSize={screenSize} />
      </div>
    </div>
  );
};

// Composant TimelineItem responsive avec images
const TimelineItem = ({
  title,
  subtitle,
  times,
  // details,
  position,
  index,
  isActive,
  screenSize,
  image,
}: TimelineItemProps) => {
  const isLeft = position === "left";

  // Responsive: Styles adaptatifs
  const getResponsiveStyles = useMemo(() => {
    if (screenSize.isMobile) {
      return {
        titleFontSize: "24px",
        subtitleFontSize: "14px",
        textFontSize: "14px",
        padding: "16px",
        marginBottom: "24px",
        imageSize: { width: 0, height: 0 }, // Pas d'images sur mobile
      };
    } else if (screenSize.isTablet) {
      return {
        titleFontSize: "32px",
        subtitleFontSize: "15px",
        textFontSize: "15px",
        padding: "20px",
        marginBottom: "32px",
        imageSize: { width: 220, height: 220 },
      };
    } else {
      return {
        titleFontSize: "38px",
        subtitleFontSize: "15px",
        textFontSize: "15px",
        padding: "24px",
        marginBottom: "88px",
        imageSize: { width: 300, height: 300 },
      };
    }
  }, [screenSize]);

  // Layout mobile: tout en colonne
  if (screenSize.isMobile) {
    return (
      <div className="relative flex items-start mb-8 pl-16">
        {/* Numéro à gauche pour mobile */}
        <div className="absolute left-0 top-4">
          <div
            className={`w-10 h-10 rounded-lg flex items-center justify-center text-white font-bold text-sm shadow-md transition-all duration-500 ${
              isActive ? "bg-[#F59F00] scale-110" : "bg-gray-400 scale-100"
            }`}
          >
            {index.toString().padStart(2, "0")}
          </div>
        </div>

        {/* Contenu */}
        <div
          className={`w-full transition-all duration-500 ${
            isActive ? "opacity-100 translate-y-0" : "opacity-70 translate-y-2"
          }`}
        >
          <div
            className={`rounded-lg shadow-sm border transition-all duration-500 ${
              isActive
                ? "bg-[#F59F00] border-[#F59F00]"
                : "bg-white border-gray-100"
            }`}
            style={{ padding: getResponsiveStyles.padding }}
          >
            <h3
              className={`font-semibold mb-2 transition-colors duration-500 ${
                isActive ? "text-white" : "text-[#F59F00]"
              }`}
              style={{ 
                fontFamily: "DragonAngled", 
                fontSize: getResponsiveStyles.titleFontSize,
                lineHeight: "1.2"
              }}
            >
              {title}
            </h3>
            <p
              className={`mb-3 transition-colors duration-500 ${
                isActive ? "text-white/90" : "text-gray-500"
              }`}
              style={{ 
                fontFamily: "GeneralSans", 
                fontSize: getResponsiveStyles.subtitleFontSize 
              }}
            >
              {subtitle}
            </p>
            {times?.map((time, i) => (
              <p
                key={i}
                className={`mb-1 transition-colors duration-500 ${
                  isActive ? "text-white/85" : "text-gray-600"
                }`}
                style={{ 
                  fontFamily: "GeneralSans", 
                  fontSize: getResponsiveStyles.textFontSize 
                }}
              >
                {time}
              </p>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Layout desktop/tablet: alternance gauche-droite avec images
  return (
    <div className="relative flex items-center" style={{ marginBottom: getResponsiveStyles.marginBottom }}>
      {/* Image à l'extrême gauche (seulement si content à droite) */}
      {!isLeft && !screenSize.isMobile && image && (
        <div className="absolute left-0 z-10">
          <div
            className={`rounded-lg overflow-hidden shadow-lg transition-all duration-500 ${
              isActive ? "opacity-100 scale-105" : "opacity-70 scale-100"
            }`}
            style={getResponsiveStyles.imageSize}
          >
            <img
              src={image}
              alt={`Timeline ${index}`}
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      )}

      {/* Contenu à gauche */}
      <div
        className={`w-5/12 transition-all duration-500 ${
          isActive ? "opacity-100 translate-y-0" : "opacity-70 translate-y-2"
        }`}
        style={{ 
          marginLeft: !isLeft && !screenSize.isMobile
        ? screenSize.isTablet
          ? `${getResponsiveStyles.imageSize.width - 220}px`
          : `${getResponsiveStyles.imageSize.width - 300}px`
        : '0'
        }}
      >
        {isLeft && (
          <div
        className={`rounded-lg shadow-sm border transition-all duration-500 ${
          isActive
            ? "bg-[#F59F00] border-[#F59F00]"
            : "bg-white border-gray-100"
        }`}
        style={{ padding: getResponsiveStyles.padding }}
          >
        <h3
          className={`font-semibold mb-2 transition-colors duration-500 ${
            isActive ? "text-white" : "text-[#F59F00]"
          }`}
          style={{ 
            fontFamily: "DragonAngled", 
            fontSize: getResponsiveStyles.titleFontSize,
            lineHeight: "1.2"
          }}
        >
          {title}
        </h3>
        <p
          className={`mb-3 transition-colors duration-500 ${
            isActive ? "text-white/90" : "text-gray-500"
          }`}
          style={{ 
            fontFamily: "GeneralSans", 
            fontSize: getResponsiveStyles.subtitleFontSize 
          }}
        >
          {subtitle}
        </p>
        {times?.map((time, i) => (
          <p
            key={i}
            className={`mb-1 transition-colors duration-500 ${
          isActive ? "text-white/85" : "text-gray-600"
            }`}
            style={{ 
          fontFamily: "GeneralSans", 
          fontSize: getResponsiveStyles.textFontSize 
            }}
          >
            {time}
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
        style={{ 
          marginLeft: !isLeft && !screenSize.isMobile
        ? screenSize.isTablet
          ? `${getResponsiveStyles.imageSize.width - 220}px`
          : `${getResponsiveStyles.imageSize.width - 300}px`
        : '0'
        }}
      >
        {!isLeft && (
          <div
            className={`rounded-lg shadow-sm border transition-all duration-500 ${
              isActive
                ? "bg-[#F59F00] border-[#F59F00]"
                : "bg-white border-gray-100"
            }`}
            style={{ padding: getResponsiveStyles.padding }}
          >
            <h3
              className={`font-semibold mb-2 transition-colors duration-500 ${
                isActive ? "text-white" : "text-[#F59F00]"
              }`}
              style={{ 
                fontFamily: "DragonAngled", 
                fontSize: getResponsiveStyles.titleFontSize,
                lineHeight: "1.2"
              }}
            >
              {title}
            </h3>
            <p
              className={`mb-3 transition-colors duration-500 ${
                isActive ? "text-white/90" : "text-gray-500"
              }`}
              style={{ 
                fontFamily: "GeneralSans", 
                fontSize: getResponsiveStyles.subtitleFontSize 
              }}
            >
              {subtitle}
            </p>
            {times?.map((time, i) => (
              <p
                key={i}
                className={`mb-1 transition-colors duration-500 ${
                  isActive ? "text-white/85" : "text-gray-600"
                }`}
                style={{ 
                  fontFamily: "GeneralSans", 
                  fontSize: getResponsiveStyles.textFontSize 
                }}
              >
                {time}
              </p>
            ))}
          </div>
        )}
      </div>

      {/* Image à l'extrême droite (seulement si content à gauche) */}
      {isLeft && !screenSize.isMobile && image && (
        <div className="absolute right-0 z-10">
          <div
            className={`rounded-lg overflow-hidden shadow-lg transition-all duration-500 ${
              isActive ? "opacity-100 scale-105" : "opacity-70 scale-100"
            }`}
            style={getResponsiveStyles.imageSize}
          >
            <img
              src={image}
              alt={`Timeline ${index}`}
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      )}
    </div>
  );
};

// Composant FinalElement responsive
const FinalElement = ({ 
  isActive, 
  screenSize 
}: { 
  isActive: boolean; 
  screenSize: ReturnType<typeof useScreenSize>; 
}) => {
  const getResponsiveStyles = useMemo(() => {
    if (screenSize.isMobile) {
      return {
        titleFontSize: "28px",
        textFontSize: "14px",
        padding: "24px",
        circleSize: "w-12 h-12",
        iconSize: "text-lg",
        maxWidth: "max-w-sm",
      };
    } else if (screenSize.isTablet) {
      return {
        titleFontSize: "32px",
        textFontSize: "15px",
        padding: "32px",
        circleSize: "w-14 h-14",
        iconSize: "text-xl",
        maxWidth: "max-w-lg",
      };
    } else {
      return {
        titleFontSize: "38px",
        textFontSize: "15px",
        padding: "32px",
        circleSize: "w-16 h-16",
        iconSize: "text-2xl",
        maxWidth: "max-w-2xl",
      };
    }
  }, [screenSize]);

  if (screenSize.isMobile) {
    return (
      <div className="relative flex justify-center items-center pt-8 pb-12 pl-16">
        <div
          className={`relative z-10 rounded-lg shadow-lg border text-center transition-all duration-500 ${
            isActive
              ? "bg-[#F59F00] border-[#F59F00] opacity-100 translate-y-0"
              : "bg-white border-gray-100 opacity-70 translate-y-4"
          } ${getResponsiveStyles.maxWidth}`}
          style={{ padding: getResponsiveStyles.padding }}
        >
          <div
            className={`${getResponsiveStyles.circleSize} rounded-full flex items-center justify-center text-white font-bold shadow-md mx-auto -mt-12 mb-4 transition-all duration-500 ${
              isActive ? "bg-[#F59F00] scale-110" : "bg-gray-400 scale-100"
            }`}
          >
            <span className={getResponsiveStyles.iconSize}>✓</span>
          </div>
          <h3
            className={`font-bold mb-4 transition-colors duration-500 ${
              isActive ? "text-white" : "text-gray-900"
            }`}
            style={{ 
              fontFamily: "DragonAngled", 
              fontSize: getResponsiveStyles.titleFontSize,
              lineHeight: "1.2"
            }}
          >
            Fin du voyage
          </h3>
          <p
            className={`mb-2 transition-colors duration-500 ${
              isActive ? "text-white/90" : "text-gray-600"
            }`}
            style={{ 
              fontFamily: "GeneralSans", 
              fontSize: getResponsiveStyles.textFontSize 
            }}
          >
            Retour à l'aéroport de Cotonou
          </p>
          <p
            className={`transition-colors duration-500 ${
              isActive ? "text-white/85" : "text-gray-500"
            }`}
            style={{ 
              fontFamily: "GeneralSans", 
              fontSize: getResponsiveStyles.textFontSize 
            }}
          >
            Transfert organisé • Assistance jusqu'au départ
          </p>
          <p
            className={`mt-4 transition-colors duration-500 ${
              isActive ? "text-white/85" : "text-gray-500"
            }`}
            style={{ 
              fontFamily: "GeneralSans", 
              fontSize: getResponsiveStyles.textFontSize 
            }}
          >
            Merci pour ce magnifique voyage au Bénin !
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative flex justify-center items-center pt-8 pb-12">
      <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-0.5 h-16 bg-transparent"></div>
      <div
        className={`relative z-10 rounded-lg shadow-lg border text-center mt-16 transition-all duration-500 ${
          isActive
            ? "bg-[#F59F00] border-[#F59F00] opacity-100 translate-y-0"
            : "bg-white border-gray-100 opacity-70 translate-y-4"
        } ${getResponsiveStyles.maxWidth}`}
        style={{ padding: getResponsiveStyles.padding }}
      >
        <div
          className={`${getResponsiveStyles.circleSize} rounded-full flex items-center justify-center text-white font-bold shadow-md mx-auto -mt-16 mb-6 transition-all duration-500 ${
            isActive ? "bg-[#F59F00] scale-110" : "bg-gray-400 scale-100"
          }`}
        >
          <span className={getResponsiveStyles.iconSize}>✓</span>
        </div>
        <h3
          className={`font-bold mb-4 transition-colors duration-500 ${
            isActive ? "text-white" : "text-gray-900"
          }`}
          style={{ 
            fontFamily: "DragonAngled", 
            fontSize: getResponsiveStyles.titleFontSize 
          }}
        >
          Fin du voyage
        </h3>
        <p
          className={`mb-2 transition-colors duration-500 ${
            isActive ? "text-white/90" : "text-gray-600"
          }`}
          style={{ 
            fontFamily: "GeneralSans", 
            fontSize: getResponsiveStyles.textFontSize 
          }}
        >
          Retour à l'aéroport de Cotonou
        </p>
        <p
          className={`transition-colors duration-500 ${
            isActive ? "text-white/85" : "text-gray-500"
          }`}
          style={{ 
            fontFamily: "GeneralSans", 
            fontSize: getResponsiveStyles.textFontSize 
          }}
        >
          Transfert organisé • Assistance jusqu'au départ
        </p>
        <p
          className={`mt-4 transition-colors duration-500 ${
            isActive ? "text-white/85" : "text-gray-500"
          }`}
          style={{ 
            fontFamily: "GeneralSans", 
            fontSize: getResponsiveStyles.textFontSize 
          }}
        >
          Merci pour ce magnifique voyage au Bénin !
        </p>
      </div>
    </div>
  );
};

// Composant InclusNonInclusComponent responsive
const InclusNonInclusComponent = ({ screenSize }: { screenSize: ReturnType<typeof useScreenSize> }) => {
  const inclus = [
    "Hébergement 9 nuits (hôtel, maison d'hôte ou écolodge)",
    "Chauffeur privé + véhicule climatisé",
    "Guide certifié sur chaque site",
    "Prise en charge à l'aéroport",
    "Accompagnement personnalisé",
    "Connexion internet + kit de bienvenue",
  ];

  const nonInclus = [
    "Billets d'avion international",
    "Visa d'entrée au Bénin",
    "Assurance voyage",
    "Frais personnels et pourboires",
    "Boissons alcoolisées",
    "Activités optionnelles non mentionnées",
  ];

  const getResponsiveStyles = useMemo(() => {
    if (screenSize.isMobile) {
      return {
        titleFontSize: "32px",
        textFontSize: "14px",
        padding: "20px",
        gap: "16px",
      };
    } else if (screenSize.isTablet) {
      return {
        titleFontSize: "40px",
        textFontSize: "15px",
        padding: "25px",
        gap: "20px",
      };
    } else {
      return {
        titleFontSize: "49px",
        textFontSize: "16px",
        padding: "30px",
        gap: "20px",
      };
    }
  }, [screenSize]);

  return (
    <div className="w-full px-4 py-8">
      <div className={`grid ${screenSize.isMobile ? 'grid-cols-1' : 'grid-cols-2'}`} style={{ gap: getResponsiveStyles.gap }}>
        {/* Section INCLUS */}
        <div
          style={{
            backgroundColor: "#EAFFEF",
            padding: getResponsiveStyles.padding,
            height: "fit-content",
            borderRadius: "8px",
          }}
        >
          <Typography.Title
            level={2}
            style={{
              color: "#36A330",
              fontSize: getResponsiveStyles.titleFontSize,
              fontFamily: "DragonAngled",
              fontWeight: "bold",
              textTransform: "uppercase",
              letterSpacing: "0.05em",
              marginBottom: "16px",
              lineHeight: "1.2",
            }}
          >
            INCLUS
          </Typography.Title>
          <ul className="space-y-2">
            {inclus.map((item, index) => (
              <li key={index} className="flex items-start">
                <span style={{ paddingRight: "10px", color: "#36A330", fontWeight: "bold" }}>•</span>
                <Typography.Text
                  style={{
                    fontSize: getResponsiveStyles.textFontSize,
                    fontFamily: "GeneralSans",
                    lineHeight: "1.4",
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
            padding: getResponsiveStyles.padding,
            height: "fit-content",
            borderRadius: "8px",
            marginTop: screenSize.isMobile ? "16px" : "0",
          }}
        >
          <Typography.Title
            level={2}
            style={{
              color: "#991D00",
              fontSize: getResponsiveStyles.titleFontSize,
              fontFamily: "DragonAngled",
              fontWeight: "bold",
              textTransform: "uppercase",
              letterSpacing: "0.05em",
              marginBottom: "16px",
              lineHeight: "1.2",
            }}
          >
            NON INCLUS
          </Typography.Title>
          <ul className="space-y-2">
            {nonInclus.map((item, index) => (
              <li key={index} className="flex items-start">
                <span style={{ paddingRight: "10px", color: "#991D00", fontWeight: "bold" }}>•</span>
                <Typography.Text
                  style={{
                    fontSize: getResponsiveStyles.textFontSize,
                    fontFamily: "GeneralSans",
                    lineHeight: "1.4",
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
        height: "120px",
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
        height: "150px",
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
        className="relative w-full overflow-hidden"
        style={{
          backgroundImage: `url(${debut})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          padding: heroStyles.padding,
          paddingBottom: heroStyles.paddingBottom,
        }}
      >
        {/* Gradient overlay optimisé */}
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
            maxWidth: screenSize.isMobile ? "100%" : "1050px",
            width: "100%",
            margin: "0 auto",
            zIndex: 1,
          }}
        >
          <Flex vertical gap={0}>
            <Typography.Text
              style={{
                color: "#000000",
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
                color: "#000000",
                fontSize: heroStyles.subtitleFontSize,
                lineHeight: screenSize.isMobile ? "1.3" : "1",
                marginTop: "0",
                fontFamily: "DragonAngled",
              }}
            >
              Sites incontournables, entre mémoire, spiritualité, artisanat et détente
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
                10 jours / 9 nuits
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
              <Flex vertical style={{ width: screenSize.isMobile ? "100%" : "auto" }}>
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
                  <span style={{ fontSize: screenSize.isMobile ? "18px" : "inherit" }}>
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
                  Voyageurs curieux, familles, groupes DOM-TOM, premiers séjours
                </Typography>
              </Flex>
            </Flex>
          </Flex>
        </Flex>

        {/* Timeline */}
        <Flex style={{ width: "100%" }}>
          <DetailedTimeline screenSize={screenSize} />
        </Flex>

        {/* Bouton de réservation */}
        <Flex justify="center" style={{ padding: screenSize.isMobile ? "20px 0" : "0" }}>
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
          <InclusNonInclusComponent screenSize={screenSize} />
        </Flex>
      </Flex>

      {/* Galerie d'images - Responsive */}
      <section 
        style={{ 
          height: screenSize.isMobile ? "60vw" : screenSize.isTablet ? "50vw" : "45vw",
          width: "100%"
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