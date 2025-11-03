import { Flex, Typography, Tooltip } from "antd";
import NavBar from "../../components/navBar/navBar";
import Footer from "../../components/footer/footer";
import { useEffect, useState, useCallback } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import ImageCarousel from "../../components/ImageGallery/ImageCarousel";
import BeginningButton from "../../components/dededed/BeginingButton";
import { ICircuitPresenter } from "../../sdk/models/circuits";
import { ClientsAPI } from "../../sdk/api/clients";
import { LikeAPI } from "../../sdk/api/like";
import { CircuitsAPI } from "../../sdk/api/circuits";
import { MultiAppFile } from "../../sdk/models/models";
import { HandleGetFileLink } from "./CircuitsCartes";
import { emptyIPageMedia, IPageMedia } from "../../sdk/models/pagesMedias";
import { PageSettings } from "../../sdk/api/pageMedias";
import { UsersAPI } from "../../sdk/api/User";

interface TravelCardProps {
  _id: string;
  image: MultiAppFile[];
  video: MultiAppFile[];
  title: string;
  description: string;
  day: number;
  night: number;
  price: string | number;
  liked?: boolean;
}

// Composant TravelCard optimisé et responsive
const TravelCard = ({
  _id,
  image,
  video,
  title,
  description,
  day,
  night,
  price,
  liked: initialLiked,
}: TravelCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const [liked, setLiked] = useState<boolean>(!!initialLiked);
  const [likeLoading, setLikeLoading] = useState<boolean>(false);
  const user = ClientsAPI.GetUser();
  const navigate = useNavigate();

  const handleCardClick = useCallback(() => {
    navigate(`/circuits-thematiques/${_id}`);
  }, [navigate, _id]);

  const handleMouseEnter = useCallback(() => {
    setIsHovered(true);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setIsHovered(false);
  }, []);

  // Toggle like - stop propagation so card click (navigate) doesn't fire
  const handleToggleLike = useCallback(
    (e: any) => {
      e.stopPropagation();

      // Optimistic UI
      const newLiked = !liked;
      setLiked(newLiked);

      // If already processing, skip
      if (likeLoading) return;

      const user = ClientsAPI.GetUser();

      if (!user) {
        // If no user, keep it local only (could prompt to login here)
        return;
      }

      setLikeLoading(true);

      LikeAPI.ToggleLike({ customer_id: user._id, item_id: _id })
        .then((_res) => {
          // API success - nothing else for now (state already updated optimistically)
        })
        .catch((err) => {
          console.error("Error toggling like:", err);
          // revert optimistic update on error
          setLiked(!newLiked);
        })
        .finally(() => setLikeLoading(false));
    },
    [liked, likeLoading, _id]
  );

  return (
    <div
      className="group relative bg-white rounded-2xl shadow-lg overflow-hidden 
                 transition-all duration-300 hover:shadow-2xl cursor-pointer
                 w-full max-w-full
                 xs:max-w-[280px] 
                 sm:max-w-[320px] sm:min-w-[300px]
                 md:max-w-[340px] md:min-w-[320px]
                 lg:max-w-[360px] lg:min-w-[340px]
                 xl:max-w-[380px] xl:min-w-[360px]
                 flex flex-col
                 h-[420px] xs:h-[450px] sm:h-[480px] md:h-[500px] lg:h-[520px]"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleCardClick}
    >
      {/* Section Media - Responsive */}
      <div className="relative h-[45%] sm:h-1/2 overflow-hidden">
        {/* Like button (absolute top-left) - tooltip when not connected */}
        {user ? (
          <button
            onClick={handleToggleLike}
            aria-label={liked ? "Retirer des favoris" : "Ajouter aux favoris"}
            className="absolute top-2 left-2 z-30 bg-white bg-opacity-90 p-2 rounded-full shadow-md hover:scale-105 transform transition-transform"
          >
            {/* Heart icon: filled when liked */}
            {liked ? (
              <svg
                className="w-5 h-5 text-red-500"
                viewBox="0 0 24 24"
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M12.001 4.529c1.349-1.535 3.516-2.07 5.334-1.174 1.514.77 2.91 2.47 2.91 5.035 0 4.656-4.43 7.83-8.244 10.61-.6.42-1.46.42-2.06 0-3.813-2.78-8.244-5.954-8.244-10.61 0-2.565 1.396-4.265 2.91-5.035 1.818-.896 3.985-.361 5.334 1.174l.06.068.06-.068z" />
              </svg>
            ) : (
              <svg
                className="w-5 h-5 text-gray-400"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={1.5}
                strokeLinecap="round"
                strokeLinejoin="round"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M20.8 8.6c0 4.5-4.6 7.7-8.8 10.5-.45.32-1.03.32-1.48 0C7.8 16.3 3.2 13.1 3.2 8.6 3.2 6.6 4.2 5 5.6 4c1.38-1.02 3.2-.6 4.36.64l.84.92.84-.92c1.16-1.24 2.98-1.66 4.36-.64 1.4 1 2.4 2.6 2.4 4.6z" />
              </svg>
            )}
          </button>
        ) : (
          <Tooltip title="Connectez-vous pour aimer" placement="left">
            <button
              onClick={handleToggleLike}
              aria-label={liked ? "Retirer des favoris" : "Ajouter aux favoris"}
              className="absolute top-2 left-2 z-30 bg-white bg-opacity-90 p-2 rounded-full shadow-md hover:scale-105 transform transition-transform"
            >
              {/* Heart icon: filled when liked */}
              {liked ? (
                <svg
                  className="w-5 h-5 text-red-500"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M12.001 4.529c1.349-1.535 3.516-2.07 5.334-1.174 1.514.77 2.91 2.47 2.91 5.035 0 4.656-4.43 7.83-8.244 10.61-.6.42-1.46.42-2.06 0-3.813-2.78-8.244-5.954-8.244-10.61 0-2.565 1.396-4.265 2.91-5.035 1.818-.896 3.985-.361 5.334 1.174l.06.068.06-.068z" />
                </svg>
              ) : (
                <svg
                  className="w-5 h-5 text-gray-400"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={1.5}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M20.8 8.6c0 4.5-4.6 7.7-8.8 10.5-.45.32-1.03.32-1.48 0C7.8 16.3 3.2 13.1 3.2 8.6 3.2 6.6 4.2 5 5.6 4c1.38-1.02 3.2-.6 4.36.64l.84.92.84-.92c1.16-1.24 2.98-1.66 4.36-.64 1.4 1 2.4 2.6 2.4 4.6z" />
                </svg>
              )}
            </button>
          </Tooltip>
        )}
        <img
          src={HandleGetFileLink(image[0].file as string)}
          alt={title}
          loading="lazy"
          className={`absolute inset-0 w-full h-full object-cover 
                     transition-opacity duration-500 
                     ${
                       isHovered && video.length ? "opacity-0" : "opacity-100"
                     }`}
        />
        {isHovered && video.length > 0 && (
          <video
            src={HandleGetFileLink(video[0].file as string)}
            autoPlay
            loop
            muted
            playsInline
            preload="none"
            className="absolute inset-0 w-full h-full object-cover"
          />
        )}

        {/* Badge Jours/Nuits - Responsive */}
        <div
          className="absolute top-2 right-2 
                       xs:top-3 xs:right-3 
                       sm:top-4 sm:right-4 
                       bg-white bg-opacity-95 
                       px-2 py-1 
                       xs:px-2.5 xs:py-1.5 
                       sm:px-3 sm:py-2 
                       rounded-full shadow-md 
                       flex items-center gap-1 xs:gap-1.5 sm:gap-2 
                       backdrop-blur-sm"
        >
          <div className="flex items-center gap-0.5 xs:gap-1">
            <svg
              className="w-3 h-3 xs:w-3.5 xs:h-3.5 sm:w-4 sm:h-4 text-amber-500"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M10 2L13.09 8.26L20 9.27L15 14.14L16.18 21.02L10 17.77L3.82 21.02L5 14.14L0 9.27L6.91 8.26L10 2Z" />
            </svg>
            <span className="text-xs xs:text-xs sm:text-sm font-semibold text-gray-700">
              {day}J
            </span>
          </div>
          <div className="w-px h-2.5 xs:h-3 sm:h-4 bg-gray-300"></div>
          <div className="flex items-center gap-0.5 xs:gap-1">
            <svg
              className="w-3 h-3 xs:w-3.5 xs:h-3.5 sm:w-4 sm:h-4 text-indigo-500"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
            </svg>
            <span className="text-xs xs:text-xs sm:text-sm font-semibold text-gray-700">
              {night}N
            </span>
          </div>
        </div>
      </div>

      {/* Contenu principal - Responsive */}
      <div className="flex flex-col h-[55%] sm:h-1/2 p-3 xs:p-4 sm:p-5 md:p-6">
        <div className="flex-grow min-h-0">
          <h3
            className="text-base xs:text-lg sm:text-xl md:text-xl 
                        font-bold text-[#411E1C] 
                        mb-1.5 xs:mb-2 sm:mb-2 
                        line-clamp-2 
                        leading-tight xs:leading-snug sm:leading-normal"
          >
            {title}
          </h3>
          <p
            className="text-gray-600 
                       text-xs xs:text-sm sm:text-sm 
                       leading-relaxed 
                       mb-3 xs:mb-4 
                       line-clamp-3 
                       overflow-hidden"
          >
            {description}
          </p>
        </div>

        {/* Footer de la carte - Responsive */}
        <div className="flex items-center justify-between mt-auto pt-2 xs:pt-3">
          <div className="min-w-0 flex-shrink-0">
            <p className="text-xs text-gray-500 mb-0.5">À partir de</p>
            <p
              className="text-lg xs:text-xl sm:text-2xl 
                         font-bold text-[#411E1C] 
                         leading-tight truncate"
            >
              {price} FCFA
            </p>
          </div>
          <button
            className="bg-[#f6aa1d] text-black 
                           px-2.5 py-1.5 
                           xs:px-3 xs:py-2 
                           sm:px-4 sm:py-2 
                           rounded-lg font-medium 
                           hover:bg-[#ff3100] hover:text-white 
                           transition-colors duration-200 
                           flex items-center gap-1.5 xs:gap-2 
                           text-xs xs:text-sm sm:text-base 
                           cursor-pointer 
                           flex-shrink-0 ml-2"
          >
            <span className="hidden xs:inline">Découvrir</span>
            <span className="xs:hidden">Voir</span>
            <svg
              className="w-3 h-3 xs:w-3.5 xs:h-3.5 sm:w-4 sm:h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

// Hook personnalisé pour gérer la responsivité
const useResponsive = () => {
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

const Circuits = () => {
  const { pathname } = useLocation();
  const { isMobile, isTablet } = useResponsive();
  const [loading, setLoading] = useState<boolean>(true);
  const [settings, setSettings] = useState<IPageMedia>(emptyIPageMedia());
  const [loadingCircuits, setLoadingCircuits] = useState<boolean>(true);
  const [circuits, setCircuits] = useState<ICircuitPresenter[]>([]);

  useEffect(() => {
    PageSettings.List()
      .then((data) => {
        console.log("the settings are:", data);
        setSettings(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching circuits:", err);
      });
  }, []);

  // On recupere les villes
  useEffect(() => {
    CircuitsAPI.List(UsersAPI.GetUser()?._id || "")
      .then((data) => {
        console.log("the circuits are:", data);
        setCircuits(data);
        setLoadingCircuits(false);
      })
      .catch((err) => {
        console.error("Error fetching circuits:", err);
      });
  }, []);

  // Données des voyages mémorisées
  /* const voyages = useMemo(
    () => [
      {
        id: "de774e84ds8e45s75fs",
        image: img,
        video: video,
        title: "Spiritualité & Traditions Vodoun: L'invisible au cœur du Bénin",
        description:
          "Explorer l’univers invisible du vodoun à travers des rencontres, des cérémonies, des lieux sacrés et des savoirs ancestraux.",
        days: 8,
        nights: 7,
        price: "50.000 FCFA",
      },
      {
        id: "a92f8e7c3b5d4a1f9e6d",
        image: img,
        video: video,
        title: "Esprit des Femmes – Rituels, Artisanat & Puissance Féminine",
        description:
          "Pendant 7 jours, laissez-vous emporter par une expérience unique où se rencontrent artisanes, prêtresses, stylistes et productrices inspirantes. Découvrez des lieux sacrés dédiés aux femmes et aux Amazones, participez à des ateliers créatifs (head wrap, peinture, cuisine, écriture) et vivez des instants de bien-être (spa, plage, bains thermaux). Ce séjour est une parenthèse intime et solidaire pour reconnecter le corps, l’esprit et la sororité.",
        days: 7,
        nights: 6,
        price: "50.000 FCFA",
      },
      {
        id: "c83d9f1e7a4b5c6d8f2a",
        image: img,
        video: video,
        title: "Circuit Immersion & Savoir-Faire – Le Bénin au quotidien",
        description:
          "Plongez au cœur du quotidien béninois à travers un voyage authentique et immersif. Ce circuit de 8 jours vous offre l’opportunité de découvrir les villages, les traditions et les savoir-faire locaux, de rencontrer les habitants et de participer à des ateliers culturels et artisanaux. Entre marchés animés, ateliers culinaires, artisanat traditionnel et balades lacustres, vous vivrez le Bénin loin des sentiers touristiques classiques, en prenant le temps d’observer, d’apprendre et d’échanger. Une expérience idéale pour les voyageurs curieux et adeptes de slow travel, qui souhaitent comprendre le quotidien et les richesses culturelles du pays.",
        days: 8,
        nights: 7,
        price: "50.000 FCFA",
      },
    ],
    []
  ); */

  useEffect(() => {
    document.title = "Circuits Thématiques";
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <Flex justify="center" vertical>
      <BeginningButton />

      {/* Header avec NavBar */}
      <div>
        <NavBar menu="CIRCUITS" />
      </div>

      {/* Section héros - Responsive */}
      {!loading && (
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
            <source
              src={HandleGetFileLink(
                settings.thematique_reel[0].file as string
              )}
              type="video/mp4"
            />
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
                {settings.thematique_title}
              </Typography.Title>
              <Typography.Text
                style={{
                  color: "#FFFFFF",
                  fontSize: isMobile ? "44px" : "44px",
                  lineHeight: isMobile ? "1.3" : "1",
                  marginTop: "0",
                  fontFamily: "DragonAngled",
                }}
              >
                {settings.thematique_subtitle}
              </Typography.Text>
            </Flex>
          </Flex>
        </Flex>
      )}

      {/* Grille des cartes - Responsive */}
      {!loadingCircuits && (
        <div className="w-full bg-gray-50 py-8 sm:py-12 lg:py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div
              className="grid grid-cols-1 
                         xs:grid-cols-1 
                         sm:grid-cols-2 
                         lg:grid-cols-3 
                         xl:grid-cols-3 
                         gap-4 sm:gap-6 lg:gap-8
                         justify-items-center"
            >
              {circuits
                .filter((circuit) => circuit.type === "Thematique")
                .map((voyage) => (
                  <TravelCard key={voyage._id} {...voyage} />
                ))}
            </div>
          </div>
        </div>
      )}

      {/* Carrousel d'images - Responsive */}
      <section className="w-full">
        <div
          style={{
            height: isMobile ? "60vw" : isTablet ? "50vw" : "45vw",
            minHeight: isMobile ? "250px" : "300px",
          }}
        >
          {settings.thematique_carrousel.length > 0 &&
            settings.thematique_carrousel[0].file !== null && (
              <ImageCarousel
                images={settings.thematique_carrousel.map((item) =>
                  HandleGetFileLink(item.file as string)
                )}
              />
            )}
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </Flex>
  );
};

export default Circuits;
