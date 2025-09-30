import { Button, Flex, Rate, Typography } from "antd";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import NavBar from "../../components/navBar/navBar";
import { Check, Building2 } from "lucide-react";
import { useTransaction } from "../../context/transactionContext";
import Footer from "../../components/footer/footer";
import BeginningButton from "../../components/dededed/BeginingButton";
import {
  IAccommodationData,
  IAccommodationOption,
} from "../../sdk/models/hebergements";
import { HebergementsAPI } from "../../sdk/api/hebergements";
import { HandleGetFileLink } from "../Circuits/CircuitsCartes";
import {
  AccommodationOptionModal,
  HotelServicesModal,
} from "./hebergementsModals";
import { ClientsAPI } from "../../sdk/api/clients";
import { IClientHistory } from "../../sdk/models/clients";
import CrossSelling from "../../components/dededed/crossSelling";
import { VillesAPI } from "../../sdk/api/villes";
import SimilarSelling from "../../components/dededed/similarSelling";

interface ViewHebergementContentProps {
  accommodation: IAccommodationData;
}

const ViewHebergementContent: React.FC<ViewHebergementContentProps> = ({
  accommodation,
}) => {
  const { setTransaction } = useTransaction();
  const navigate = useNavigate();
  const [isHovered, setIsHovered] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState<number>(0);
  const [selectedOption, setSelectedOption] =
    useState<IAccommodationOption | null>(null);

  // Changement : une option spécifique pour le modal des détails
  const [optionDetailModal, setOptionDetailModal] =
    useState<IAccommodationOption | null>(null);

  // Si il y a des options, on ne sélectionne pas par défaut
  useEffect(() => {
    if (
      accommodation.has_options &&
      accommodation.options &&
      accommodation.options.length > 0
    ) {
      setSelectedOption(null);
    }
  }, [accommodation]);

  const nextImage = (): void => {
    setCurrentImageIndex((prev) => (prev + 1) % accommodation.images.length);
  };

  const prevImage = (): void => {
    setCurrentImageIndex(
      (prev) =>
        (prev - 1 + accommodation.images.length) % accommodation.images.length
    );
  };

  const renderOptionCard = (
    option: IAccommodationOption,
    index: number
  ): React.ReactNode => {
    const isSelected = selectedOption === option;

    return (
      <div
        key={index}
        onClick={() => setSelectedOption(option)}
        className={`relative cursor-pointer rounded-lg border-2 transition-all duration-300 overflow-hidden flex flex-col ${
          isSelected
            ? "border-blue-500 shadow-lg bg-blue-50"
            : "border-gray-200 hover:border-gray-300 hover:shadow-md"
        }`}
      >
        {/* Checkbox indicator */}
        <div
          className={`absolute top-3 right-3 z-10 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
            isSelected
              ? "bg-blue-500 border-blue-500"
              : "bg-white border-gray-300"
          }`}
        >
          {isSelected && <Check size={16} className="text-white" />}
        </div>

        {/* Image */}
        <div className="aspect-video w-full overflow-hidden">
          <img
            src={HandleGetFileLink(option.photo[0]?.file as string)}
            alt={option.name}
            className="w-full h-full object-cover"
            onError={(e) => {
              e.currentTarget.src = "/placeholder-room.jpg";
            }}
          />
        </div>

        {/* Content */}
        <div className="p-4 flex flex-col flex-grow">
          <div className="flex justify-between items-start mb-2">
            <h4 className="font-semibold text-lg text-gray-800 flex-1 mr-4">
              {option.name}
            </h4>
            <div className="text-right flex-shrink-0">
              <div className="text-xl font-bold text-blue-600">
                {option.price?.toLocaleString()} FCFA
              </div>
              <div className="text-sm text-gray-600">par nuit</div>
            </div>
          </div>

          <p className="text-gray-600 text-sm leading-relaxed mb-3">
            {option.description}
          </p>

          {/* Détails supplémentaires - qui poussent le bouton vers le bas */}
          <div className="space-y-2 text-sm text-gray-600 mb-4 flex-grow">
            {option.size && (
              <div className="flex justify-between">
                <span>Superficie:</span>
                <span className="font-medium">{option.size}</span>
              </div>
            )}
            {option.maxGuests && (
              <div className="flex justify-between">
                <span>Capacité:</span>
                <span className="font-medium">
                  {option.maxGuests} personnes
                </span>
              </div>
            )}
            {option.bedType && (
              <div className="flex justify-between">
                <span>Type de lit:</span>
                <span className="font-medium">{option.bedType}</span>
              </div>
            )}
          </div>

          {/* Bouton Details - toujours en bas */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              // Changement : on définit l'option spécifique pour le modal
              setOptionDetailModal(option);
            }}
            className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 py-3 rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-300 shadow-md hover:shadow-lg flex items-center gap-2 font-medium w-fit mt-auto"
          >
            <Building2 className="w-5 h-5" />
            Details
          </button>
        </div>
      </div>
    );
  };

  const currentPrice = selectedOption
    ? selectedOption.price
    : accommodation.price;
  const isReservationEnabled = accommodation.has_options
    ? selectedOption !== null
    : true;

  return (
    <div className="flex-1 w-full">
      {/* En-tête avec le nom de l'hébergement */}
      <div className="bg-white shadow-md p-6">
        <h2 className="text-2xl font-bold text-gray-800">
          {accommodation.name}
        </h2>
      </div>

      {/* Galerie d'images */}
      <div className="relative bg-gray-100">
        <img
          src={HandleGetFileLink(
            accommodation.images[currentImageIndex]?.file as string
          )}
          alt={`${accommodation.name} - Image ${currentImageIndex + 1}`}
          className="w-full h-96 object-cover"
          onError={(e) => {
            e.currentTarget.src = "/placeholder-hotel.jpg";
          }}
        />

        {accommodation.images.length > 1 && (
          <>
            <button
              onClick={prevImage}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white hover:bg-gray-50 rounded-full p-3 shadow-lg transition-all"
              aria-label="Image précédente"
            >
              <span className="text-lg font-bold">‹</span>
            </button>
            <button
              onClick={nextImage}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white hover:bg-gray-50 rounded-full p-3 shadow-lg transition-all"
              aria-label="Image suivante"
            >
              <span className="text-lg font-bold">›</span>
            </button>

            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black bg-opacity-70 text-white px-3 py-1 rounded-full text-sm">
              {currentImageIndex + 1} / {accommodation.images.length}
            </div>
          </>
        )}

        {/* Miniatures */}
        {accommodation.images.length > 1 && (
          <div className="absolute bottom-4 left-4 flex space-x-2">
            {accommodation.images.slice(0, 5).map((image, index) => (
              <button
                key={index}
                onClick={() => setCurrentImageIndex(index)}
                className={`w-12 h-8 rounded overflow-hidden border-2 transition-all ${
                  index === currentImageIndex
                    ? "border-white"
                    : "border-transparent opacity-70"
                }`}
                aria-label={`Aller à l'image ${index + 1}`}
              >
                <img
                  src={HandleGetFileLink(image.file as string)}
                  alt={`Miniature ${index + 1}`}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.currentTarget.src = "/placeholder-hotel.jpg";
                  }}
                />
              </button>
            ))}
            {accommodation.images.length > 5 && (
              <div className="w-12 h-8 rounded bg-black bg-opacity-50 flex items-center justify-center text-white text-xs">
                +{accommodation.images.length - 5}
              </div>
            )}
          </div>
        )}
      </div>

      <div className="p-6">
        {/* Prix et évaluation */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4">
          <div className="flex items-center space-x-1">
            <Rate allowHalf disabled defaultValue={accommodation.rating} />
            <span className="font-semibold ml-2 text-lg">
              {accommodation.rating.toFixed(1)}
            </span>
            <span className="text-gray-600">
              ({accommodation.review_count} avis)
            </span>
          </div>
          {currentPrice && !accommodation.has_options && (
            <div className="text-left md:text-right">
              <div className="text-3xl font-bold text-blue-600">
                {currentPrice.toLocaleString()} FCFA
              </div>
              <div className="text-gray-600">par nuit</div>
            </div>
          )}
        </div>

        {/* Description */}
        <div className="mb-8">
          <h3 className="text-xl font-semibold mb-4 text-gray-800 border-b pb-2">
            À propos de ce logement
          </h3>
          <p className="text-gray-700 leading-relaxed text-base whitespace-pre-line">
            {accommodation.description}
          </p>
        </div>

        {/* Modal des services */}
        <div className="mb-8">
          <HotelServicesModal accommodation={accommodation} />
        </div>

        {/* Options disponibles */}
        {accommodation.has_options &&
          accommodation.options &&
          accommodation.options.length > 0 && (
            <div className="mb-8">
              <h3 className="text-xl font-semibold mb-6 text-gray-800 border-b pb-2">
                Options disponibles ({accommodation.options.length})
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {accommodation.options.map((option, index) =>
                  renderOptionCard(option, index)
                )}
              </div>
              {!selectedOption && (
                <div className="text-center mt-6 p-4 bg-amber-50 border border-amber-200 rounded-lg">
                  <p className="text-amber-800 font-medium">
                    Sélectionnez une option pour voir les détails et pouvoir
                    réserver
                  </p>
                </div>
              )}
            </div>
          )}

        {/* Bouton de réservation */}
        <div className="mt-8 pt-6 border-t">
          <Button
            type="primary"
            size="large"
            disabled={!isReservationEnabled}
            style={{
              backgroundColor: !isReservationEnabled
                ? "#d1d5db"
                : isHovered
                ? "#ff3100"
                : "#F59F00",
              color: !isReservationEnabled
                ? "#6b7280"
                : isHovered
                ? "white"
                : "black",
              borderRadius: "8px",
              border: "none",
              fontFamily: "GeneralSans",
              transition: "all 0.3s ease",
              fontSize: "16px",
              height: "48px",
              padding: "0 24px",
              fontWeight: "600",
              width: "100%",
              cursor: !isReservationEnabled ? "not-allowed" : "pointer",
            }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onClick={() => {
              if (isReservationEnabled && currentPrice) {
                setTransaction({
                  id: accommodation._id,
                  title: selectedOption
                    ? `${accommodation.name} - ${selectedOption.name}`
                    : accommodation.name,
                  amount: currentPrice,
                  tarification: [],
                });
                navigate("/reservations-locations");
              }
            }}
          >
            {!isReservationEnabled
              ? "Sélectionnez une option pour réserver"
              : `Réserver maintenant - ${currentPrice?.toLocaleString()} FCFA`}
          </Button>
        </div>
      </div>

      {/* Modal des détails d'option - Changement : placé ici et contrôlé par optionDetailModal */}
      {optionDetailModal && (
        <AccommodationOptionModal
          isOpen={true}
          onClose={() => setOptionDetailModal(null)}
          optionData={optionDetailModal}
          getFileLink={HandleGetFileLink}
        />
      )}
    </div>
  );
};

const ViewHebergement: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [isMobile, setIsMobile] = useState(false);
  const { pathname } = useLocation();
  const [accommodation, setAccommodation] = useState<IAccommodationData>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [history, setHistory] = useState<IClientHistory[]>([]);
  const [hebergements, setHebergements] = useState<IAccommodationData[]>([]);

  // Fetch accommodation data
  useEffect(() => {
    if (!id) {
      setError("ID de l'hébergement manquant");
      setLoading(false);
      return;
    }

    setLoading(true);
    HebergementsAPI.GetByID(id)
      .then((data) => {
        setAccommodation(data);
        console.log("Hebergement fetched successfully:", data);
        const newElement: IClientHistory = {
          _id: data._id,
          type: "hebergement",
          lien: pathname,
        };
        ClientsAPI.AddToClientHistory(newElement)
          .then((_) => {
            console.log("History added");
          })
          .catch((err) => {
            console.error("History added not added", err);
          });
      })
      .catch((err) => {
        console.error("Error fetching accommodation:", err);
        setError("Erreur lors du chargement de l'hébergement");
      })
      .finally(() => {
        setLoading(false);
      });
  }, [id]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch both datasets concurrently
        const [villesData, hebergementsData] = await Promise.all([
          VillesAPI.List(),
          HebergementsAPI.List(),
        ]);

        console.log("Villes fetched successfully:", villesData);

        // Create a lookup map for better performance
        const villesMap = new Map(
          villesData.map((ville) => [ville._id, ville.name])
        );

        // Map hebergements with ville names
        const mappedHebergements = hebergementsData.map((hebergement) => ({
          ...hebergement,
          ville: villesMap.get(hebergement.ville) || hebergement.ville,
        }));

        setHebergements(mappedHebergements.filter((h) => h._id != id));
        console.log("Hébergements fetched successfully:", hebergementsData);
      } catch (err) {
        console.error("Error fetching data:", err);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    ClientsAPI.ListClientHistory()
      .then((data) => {
        setHistory(data.history);
        console.log("History fetched", data.history);
      })
      .catch((err) => {
        console.error("History added not added", err);
      });
  }, [id]);

  // Fetch cities data
  // useEffect(() => {
  //   VillesAPI.List()
  //     .then((data) => {
  //       setVilles(data);
  //       console.log("Villes fetched successfully:", data);
  //     })
  //     .catch((err) => {
  //       console.error("Error fetching villes:", err);
  //     });
  // }, []);

  // Scroll to top on pathname change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  // Check mobile viewport
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  if (loading) {
    return (
      <Flex justify="center" align="center" style={{ minHeight: "100vh" }}>
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Chargement de l'hébergement...</p>
        </div>
      </Flex>
    );
  }

  if (error || !accommodation) {
    return (
      <Flex justify="center" align="center" style={{ minHeight: "100vh" }}>
        <div className="text-center">
          <p className="text-red-600 text-lg mb-4">
            {error || "Hébergement non trouvé"}
          </p>
          <Button onClick={() => window.history.back()}>Retour</Button>
        </div>
      </Flex>
    );
  }

  return (
    <Flex justify="center" vertical>
      <BeginningButton />

      {/* Header avec NavBar */}
      <div
        className="relative z-20 flex items-center justify-center"
        style={{ backgroundColor: "#FEF1D9" }}
      >
        <NavBar menu="HÉBERGEMENT" />
      </div>

      {/* Section héros */}
      <Flex
        vertical
        className="relative w-full overflow-hidden"
        style={{
          backgroundImage: `url(${HandleGetFileLink(
            accommodation.main_image[0]?.file as string
          )})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          padding: isMobile ? "4vh 6vw" : "8vh 8vw",
          paddingBottom: isMobile ? "10vw" : "80px",
        }}
      >
        {/* Gradient overlay */}
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
              Vivez le Bénin comme chez vous
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
              Nos hébergements
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
              Confort moderne et charme local
            </Typography.Text>
          </Flex>
        </Flex>
      </Flex>

      {/* Contenu principal */}
      <Flex
        style={{
          width: "100%",
          maxWidth: "1200px",
          margin: "0 auto",
          paddingTop: "20px",
        }}
        vertical
        gap={0}
      >
        <Flex
          vertical
          gap="20px"
          style={{
            width: "100%",
            paddingBottom: isMobile ? "1vw" : "2vw",
          }}
        >
          <ViewHebergementContent accommodation={accommodation} />
        </Flex>
        <SimilarSelling items={hebergements} type="hebergement" maxItems={4} />
        <CrossSelling history={history} maxItems={5} />
      </Flex>

      <Footer />
    </Flex>
  );
};

export default ViewHebergement;
