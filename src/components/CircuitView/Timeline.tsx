import { Typography } from "antd";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { InclusList, ITimeline } from "../../sdk/models/circuits";
import { HandleGetFileLink } from "../../pages/Circuits/CircuitsCartes";

const BREAKPOINTS = {
  MOBILE: 768,
  TABLET: 1024,
} as const;

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
  timeline: ITimeline;
  index: number;
  isActive: boolean;
  screenSize: ReturnType<typeof useScreenSize>;
};

// Composant Timeline optimisé
const DetailedTimeline = ({
  timelineData,
  screenSize,
}: {
  timelineData: ITimeline[];
  screenSize: ReturnType<typeof useScreenSize>;
}) => {
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
      const progress = Math.max(
        0,
        Math.min(1, currentDistance / totalDistance)
      );

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
        screenSize.isMobile ? "py-6 px-4" : "py-12 px-4"
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
        {timelineData.map((item: ITimeline, index: any) => {
          const itemProgress = (index + 1) / (timelineData.length + 1);
          const isActive = scrollProgress >= itemProgress * 0.7;

          return (
            <TimelineItem
              key={index}
              timeline={item}
              index={index + 1}
              isActive={isActive}
              screenSize={screenSize}
            />
          );
        })}

        {/* Élément final */}
        <FinalElement
          isActive={scrollProgress >= 0.6}
          screenSize={screenSize}
        />
      </div>
    </div>
  );
};

// Composant TimelineItem responsive avec images
const TimelineItem = ({
  timeline,
  index,
  isActive,
  screenSize,
}: TimelineItemProps) => {
  const isLeft = timeline.position === "left";

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
                lineHeight: "1.2",
                letterSpacing: "0.13rem",
              }}
            >
              {timeline.title}
            </h3>
            {/* <p
              className={`mb-3 transition-colors duration-500 ${
                isActive ? "text-white/90" : "text-gray-500"
              }`}
              style={{
                fontFamily: "GeneralSans",
                fontSize: getResponsiveStyles.subtitleFontSize,
              }}
            >
              {timeline.subtitle}
            </p> */}
            {timeline.times?.map((time, i) => (
              <p
                key={i}
                className={`mb-1 transition-colors duration-500 ${
                  isActive ? "text-white/85" : "text-gray-600"
                }`}
                style={{
                  fontFamily: "GeneralSans",
                  fontSize: getResponsiveStyles.textFontSize,
                }}
              >
                {time.hour} - {time.activity}
              </p>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Layout desktop/tablet: alternance gauche-droite avec images
  return (
    <div
      className="relative flex items-center"
      style={{ marginBottom: getResponsiveStyles.marginBottom }}
    >
      {/* Image à l'extrême gauche (seulement si content à droite) */}
      {!isLeft && !screenSize.isMobile && timeline.image.length > 0 && (
        <div className="absolute left-0 z-10">
          <div
            className={`rounded-lg overflow-hidden shadow-lg transition-all duration-500 ${
              isActive ? "opacity-100 scale-105" : "opacity-70 scale-100"
            }`}
            style={getResponsiveStyles.imageSize}
          >
            <img
              src={HandleGetFileLink(timeline.image[0].file as string)}
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
          marginLeft:
            !isLeft && !screenSize.isMobile
              ? screenSize.isTablet
                ? `${getResponsiveStyles.imageSize.width - 220}px`
                : `${getResponsiveStyles.imageSize.width - 300}px`
              : "0",
          minHeight: screenSize.isMobile ? "auto" : "300px",
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
                lineHeight: "1.2",
                letterSpacing: "0.13rem",
              }}
            >
              {timeline.title}
            </h3>
            {/* <p
              className={`mb-3 transition-colors duration-500 ${
                isActive ? "text-white/90" : "text-gray-500"
              }`}
              style={{
                fontFamily: "GeneralSans",
                fontSize: getResponsiveStyles.subtitleFontSize,
              }}
            >
              {subtitle}
            </p> */}
            {timeline.times?.map((time, i) => (
              <p
                key={i}
                className={`mb-1 transition-colors duration-500 ${
                  isActive ? "text-white/85" : "text-gray-600"
                }`}
                style={{
                  fontFamily: "GeneralSans",
                  fontSize: getResponsiveStyles.textFontSize,
                }}
              >
                {time.hour} - {time.activity}
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
          marginLeft:
            !isLeft && !screenSize.isMobile
              ? screenSize.isTablet
                ? `${getResponsiveStyles.imageSize.width - 220}px`
                : `${getResponsiveStyles.imageSize.width - 300}px`
              : "0",
          minHeight: screenSize.isMobile ? "auto" : "300px",
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
                lineHeight: "1.2",
                letterSpacing: "0.13rem",
              }}
            >
              {timeline.title}
            </h3>
            {/* <p
              className={`mb-3 transition-colors duration-500 ${
                isActive ? "text-white/90" : "text-gray-500"
              }`}
              style={{
                fontFamily: "GeneralSans",
                fontSize: getResponsiveStyles.subtitleFontSize,
              }}
            >
              {subtitle}
            </p> */}
            {timeline.times?.map((time, i) => (
              <p
                key={i}
                className={`mb-1 transition-colors duration-500 ${
                  isActive ? "text-white/85" : "text-gray-600"
                }`}
                style={{
                  fontFamily: "GeneralSans",
                  fontSize: getResponsiveStyles.textFontSize,
                }}
              >
                {time.hour} - {time.activity}
              </p>
            ))}
          </div>
        )}
      </div>

      {/* Image à l'extrême droite (seulement si content à gauche) */}
      {isLeft && !screenSize.isMobile && timeline.image.length > 0 && (
        <div className="absolute right-0 z-10">
          <div
            className={`rounded-lg overflow-hidden shadow-lg transition-all duration-500 ${
              isActive ? "opacity-100 scale-105" : "opacity-70 scale-100"
            }`}
            style={{ ...getResponsiveStyles.imageSize, minHeight: "300px" }}
          >
            <img
              src={HandleGetFileLink(timeline.image[0].file as string)}
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
  screenSize,
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
            className={`${
              getResponsiveStyles.circleSize
            } rounded-full flex items-center justify-center text-white font-bold shadow-md mx-auto -mt-12 mb-4 transition-all duration-500 ${
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
              lineHeight: "1.2",
            }}
          >
            Fin du voyage
          </h3>
          {/* <p
            className={`mb-2 transition-colors duration-500 ${
              isActive ? "text-white/90" : "text-gray-600"
            }`}
            style={{
              fontFamily: "GeneralSans",
              fontSize: getResponsiveStyles.textFontSize,
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
              fontSize: getResponsiveStyles.textFontSize,
            }}
          >
            Transfert organisé • Assistance jusqu'au départ
          </p> */}
          <p
            className={`mt-4 transition-colors duration-500 ${
              isActive ? "text-white/85" : "text-gray-500"
            }`}
            style={{
              fontFamily: "GeneralSans",
              fontSize: getResponsiveStyles.textFontSize,
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
          className={`${
            getResponsiveStyles.circleSize
          } rounded-full flex items-center justify-center text-white font-bold shadow-md mx-auto -mt-16 mb-6 transition-all duration-500 ${
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
          }}
        >
          Fin du voyage
        </h3>
        {/* <p
          className={`mb-2 transition-colors duration-500 ${
            isActive ? "text-white/90" : "text-gray-600"
          }`}
          style={{
            fontFamily: "GeneralSans",
            fontSize: getResponsiveStyles.textFontSize,
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
            fontSize: getResponsiveStyles.textFontSize,
          }}
        >
          Transfert organisé • Assistance jusqu'au départ
        </p> */}
        <p
          className={`mt-4 transition-colors duration-500 ${
            isActive ? "text-white/85" : "text-gray-500"
          }`}
          style={{
            fontFamily: "GeneralSans",
            fontSize: getResponsiveStyles.textFontSize,
          }}
        >
          Merci pour ce magnifique voyage au Bénin !
        </p>
      </div>
    </div>
  );
};

// Composant InclusNonInclusComponent responsive
const InclusNonInclusComponent = ({
  inclus,
  nonInclus,
  screenSize,
}: {
  inclus: InclusList[];
  nonInclus: InclusList[];
  screenSize: ReturnType<typeof useScreenSize>;
}) => {
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
      <div
        className={`grid ${
          screenSize.isMobile ? "grid-cols-1" : "grid-cols-2"
        }`}
        style={{ gap: getResponsiveStyles.gap }}
      >
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
                <span
                  style={{
                    paddingRight: "10px",
                    color: "#36A330",
                    fontWeight: "bold",
                  }}
                >
                  •
                </span>
                <Typography.Text
                  style={{
                    fontSize: getResponsiveStyles.textFontSize,
                    fontFamily: "GeneralSans",
                    lineHeight: "1.4",
                  }}
                >
                  {item.title}
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
                <span
                  style={{
                    paddingRight: "10px",
                    color: "#991D00",
                    fontWeight: "bold",
                  }}
                >
                  •
                </span>
                <Typography.Text
                  style={{
                    fontSize: getResponsiveStyles.textFontSize,
                    fontFamily: "GeneralSans",
                    lineHeight: "1.4",
                  }}
                >
                  {item.title}
                </Typography.Text>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

const useScreenSizeResponsive = () => {
  const [screenSize, setScreenSize] = useState(() => {
    if (typeof window === "undefined") return "desktop";
    const width = window.innerWidth;
    return width < BREAKPOINTS.MOBILE
      ? "mobile"
      : width < BREAKPOINTS.TABLET
      ? "tablet"
      : "desktop";
  });

  const debouncedResize = useCallback(() => {
    let timeoutId: ReturnType<typeof setTimeout>;
    return () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        const width = window.innerWidth;
        const newSize =
          width < BREAKPOINTS.MOBILE
            ? "mobile"
            : width < BREAKPOINTS.TABLET
            ? "tablet"
            : "desktop";
        setScreenSize((prev) => (prev !== newSize ? newSize : prev));
      }, 100);
    };
  }, []);

  useEffect(() => {
    const handleResize = debouncedResize();
    window.addEventListener("resize", handleResize, { passive: true });
    return () => window.removeEventListener("resize", handleResize);
  }, [debouncedResize]);

  return useMemo(
    () => ({
      screenSize,
      isMobile: screenSize === "mobile",
      isTablet: screenSize === "tablet",
      isDesktop: screenSize === "desktop",
    }),
    [screenSize]
  );
};

const useFontLoadedRobust = () => {
  const [isFontLoaded, setIsFontLoaded] = useState(false);
  const fontFamily = "DragonAngled";

  useEffect(() => {
    let timeoutId: ReturnType<typeof setTimeout> | null = null;

    const checkFontLoaded = () => {
      // Créer un élément de test
      const testElement = document.createElement("div");
      testElement.style.fontFamily = fontFamily;
      testElement.style.fontSize = "100px";
      testElement.style.position = "absolute";
      testElement.style.left = "-9999px";
      testElement.style.visibility = "hidden";
      testElement.innerHTML = "Test";

      document.body.appendChild(testElement);

      const initialWidth = testElement.offsetWidth;

      // Fallback font pour comparaison
      testElement.style.fontFamily = `${fontFamily}, Arial, sans-serif`;
      const fallbackWidth = testElement.offsetWidth;

      document.body.removeChild(testElement);

      // Si les largeurs sont différentes, la police est chargée
      if (
        initialWidth !== fallbackWidth ||
        document.fonts?.check?.(`12px ${fontFamily}`)
      ) {
        setIsFontLoaded(true);
      } else {
        timeoutId = setTimeout(checkFontLoaded, 100);
      }
    };

    // Vérifier immédiatement
    if (document.fonts?.ready) {
      document.fonts.ready.then(() => {
        if (document.fonts.check(`12px ${fontFamily}`)) {
          setIsFontLoaded(true);
        } else {
          checkFontLoaded();
        }
      });
    } else {
      checkFontLoaded();
    }

    // Timeout de sécurité
    const safetyTimeout = setTimeout(() => {
      setIsFontLoaded(true);
    }, 3000);

    return () => {
      if (timeoutId) clearTimeout(timeoutId);
      clearTimeout(safetyTimeout);
    };
  }, [fontFamily]);

  return isFontLoaded;
};

export {
  DetailedTimeline,
  useScreenSize,
  TimelineItem,
  FinalElement,
  InclusNonInclusComponent,
  useScreenSizeResponsive,
  useFontLoadedRobust,
};
