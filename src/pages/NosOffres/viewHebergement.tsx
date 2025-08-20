import { Button, Flex, Typography } from "antd";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import NavBar from "../../components/navBar/navBar";
import {
  AccommodationData,
  AccommodationOption,
  Amenity,
  BalancedAmenities,
  createExampleAccommodation,
} from "./hebergement";
import { Star, Check, MapPin } from "lucide-react";
import { useTransaction } from "../../context/transactionContext";
import Footer from "../../components/footer/footer";
import BeginningButton from "../../components/dededed/BeginingButton";

const ViewHebergementContent: React.FC<AccommodationData> = ({
  id,
  name,
  price,
  rating,
  reviewCount,
  ville,
  images,
  description,
  amenities,
  options,
}) => {
  const { setTransaction } = useTransaction();
  const navigate = useNavigate();
  const [isHovered, setIsHovered] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState<number>(0);
  const [selectedOption, setSelectedOption] =
    useState<AccommodationOption | null>(null);

  // Si il y a des options, on sélectionne la première par défaut
  useEffect(() => {
    if (options && options.length > 0) {
      setSelectedOption(null); // Ne pas sélectionner par défaut, forcer l'utilisateur à choisir
    }
  }, [options]);

  const nextImage = (): void => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = (): void => {
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const renderStars = (rating: number): React.ReactNode[] => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        size={16}
        className={
          i < Math.floor(rating)
            ? "fill-yellow-400 text-yellow-400"
            : "text-gray-300"
        }
      />
    ));
  };

  const getBalancedAmenities = (amenitiesToUse: any): BalancedAmenities => {
    const amenityEntries = Object.entries(amenitiesToUse) as [
      string,
      Amenity[]
    ][];
    const totalSections = amenityEntries.length;
    const midPoint = Math.ceil(totalSections / 2);

    return {
      leftColumn: amenityEntries.slice(0, midPoint),
      rightColumn: amenityEntries.slice(midPoint),
    };
  };

  // Mapping des clés vers des titres en français
  const amenityTitles: Record<string, string> = {
    entertainment: "Divertissement",
    heating: "Chauffage et climatisation",
    internet: "Internet et bureau",
    kitchen: "Cuisine et salle à manger",
    location: "Caractéristiques de l'emplacement",
    parking: "Parking et installations",
    safety: "Sécurité",
    comfort: "Équipements de base",
    laundry: "Lave-linge et sèche-linge",
  };

  const renderAmenitySection = (
    title: string,
    amenities: Amenity[]
  ): React.ReactNode | null => {
    if (!amenities || amenities.length === 0) return null;

    return (
      <div className="mb-6">
        <h4 className="font-semibold text-gray-800 mb-3 text-base">{title}</h4>
        <div className="space-y-3">
          {amenities.map((amenity, index) => {
            const IconComponent = amenity.icon;
            return (
              <div
                key={index}
                className={`flex items-start space-x-3 ${
                  !amenity.available ? "opacity-60" : ""
                }`}
              >
                <div className="flex-shrink-0 mt-0.5">
                  <IconComponent
                    size={18}
                    className={
                      amenity.available ? "text-green-600" : "text-red-500"
                    }
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <span
                    className={`block ${
                      !amenity.available
                        ? "line-through text-gray-500"
                        : "text-gray-700"
                    } text-sm font-medium`}
                  >
                    {amenity.name}
                  </span>
                  {amenity.description && (
                    <p className="text-xs text-gray-500 mt-1 leading-relaxed">
                      {amenity.description}
                    </p>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  const renderOptionCard = (
    option: AccommodationOption,
    index: number
  ): React.ReactNode => {
    const isSelected = selectedOption === option;

    return (
      <div
        key={index}
        onClick={() => setSelectedOption(option)}
        className={`relative cursor-pointer rounded-lg border-2 transition-all duration-300 overflow-hidden ${
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
            src={option.photo}
            alt={option.name}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Content */}
        <div className="p-4">
          <div className="flex justify-between items-start mb-2">
            <h4 className="font-semibold text-lg text-gray-800">
              {option.name}
            </h4>
            <div className="text-right">
              <div className="text-xl font-bold text-blue-600">
                {option.price} FCFA
              </div>
              <div className="text-sm text-gray-600">par nuit</div>
            </div>
          </div>
          <p className="text-gray-600 text-sm leading-relaxed">
            {option.description}
          </p>
        </div>
      </div>
    );
  };

  // Déterminer les équipements à afficher
  const amenitiesToDisplay = selectedOption
    ? selectedOption.amenities
    : amenities;
  const currentPrice = selectedOption ? selectedOption.price : price;
  const { leftColumn, rightColumn } = amenitiesToDisplay
    ? getBalancedAmenities(amenitiesToDisplay)
    : { leftColumn: [], rightColumn: [] };

  // Déterminer si le bouton de réservation doit être actif
  const isReservationEnabled = options ? selectedOption !== null : true;

  return (
    <div className="flex-1 w-fit">
      <div>
        {/* En-tête avec le nom de l'hébergement */}
        <div className="bg-white shadow-md p-6">
          <h2 className="text-2xl font-bold text-gray-800">{name}</h2>
        </div>
      </div>
      {/* Galerie d'images */}
      <div className="relative bg-gray-100">
        <img
          src={images[currentImageIndex]}
          alt={`${name} - Image ${currentImageIndex + 1}`}
          className="w-full h-150 object-cover"
        />

        {images.length > 1 && (
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
              {currentImageIndex + 1} / {images.length}
            </div>
          </>
        )}

        {/* Miniatures */}
        <div className="absolute bottom-4 left-4 flex space-x-2">
          {images.slice(0, 5).map((image, index) => (
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
                src={image}
                alt={`Miniature ${index + 1}`}
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>
      </div>

      <div className="p-6">
        {/* Prix et évaluation */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4">
          <div className="flex items-center space-x-1">
            {renderStars(rating)}
            <span className="font-semibold ml-2 text-lg">{rating}</span>
            <span className="text-gray-600">({reviewCount} avis)</span>
            <span className="text-lg font-semibold text-gray-700 flex items-center gap-1">
              <MapPin size={15} />
              {ville}
            </span>
          </div>
          {currentPrice && (
            <div className="text-left md:text-right">
              <div className="text-3xl font-bold text-blue-600">
                {currentPrice} FCFA
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
          <p className="text-gray-700 leading-relaxed text-base">
            {description}
          </p>
        </div>

        {/* Options disponibles */}
        {options && options.length > 0 && (
          <div className="mb-8">
            <h3 className="text-xl font-semibold mb-6 text-gray-800 border-b pb-2">
              Options disponibles
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {options.map((option, index) => renderOptionCard(option, index))}
            </div>
            {!selectedOption && (
              <p className="text-center text-gray-600 mt-4 text-sm">
                Sélectionnez une option pour voir les équipements et pouvoir
                réserver
              </p>
            )}
          </div>
        )}

        {/* Équipements avec distribution équilibrée */}
        {amenitiesToDisplay && (
          <div className="mb-8">
            <h3 className="text-xl font-semibold mb-6 text-gray-800 border-b pb-2">
              {selectedOption
                ? `Équipements - ${selectedOption.name}`
                : "Ce que propose ce logement"}
            </h3>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Colonne de gauche */}
              <div className="space-y-6">
                {leftColumn.map(([key, amenities]) =>
                  renderAmenitySection(amenityTitles[key] || key, amenities)
                )}
              </div>

              {/* Colonne de droite */}
              <div className="space-y-6">
                {rightColumn.map(([key, amenities]) =>
                  renderAmenitySection(amenityTitles[key] || key, amenities)
                )}
              </div>
            </div>
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
              borderRadius: "7px",
              border: "none",
              fontFamily: "GeneralSans",
              transition: "all 0.3s ease",
              fontSize: "16px",
              height: "40px",
              padding: "0 20px",
              fontWeight: "bold",
              width: "100%",
              cursor: !isReservationEnabled ? "not-allowed" : "pointer",
            }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onClick={() => {
              if (isReservationEnabled && currentPrice) {
                setTransaction({
                  id: id,
                  title: selectedOption
                    ? `${name} - ${selectedOption.name}`
                    : name,
                  amount: currentPrice,
                });
                navigate("/reservations-locations");
              }
            }}
          >
            {!isReservationEnabled
              ? "Sélectionnez une option pour réserver"
              : "Réserver maintenant"}
          </Button>
        </div>
      </div>
    </div>
  );
};

const ViewHebergement = () => {
  const { id } = useParams();
  const [isMobile, setIsMobile] = useState(false);
  const { pathname } = useLocation();

  const [accommodation, setAccommodation] = useState<AccommodationData | null>(
    null
  );

  // Simulate fetching accommodation data based on the ID
  const accommodations = createExampleAccommodation();

  useEffect(() => {
    const foundAccommodation = accommodations.find((acc) => acc.id === id);
    if (foundAccommodation) {
      console.log("Found accommodation:", foundAccommodation);
      setAccommodation(foundAccommodation);
    }
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

  return (
    <Flex justify="center" vertical>
      <BeginningButton />
      {/* Header avec NavBar - Responsive */}
      <div
        className="relative z-20 flex items-center justify-center"
        style={{
          backgroundColor: "#FEF1D9",
        }}
      >
        <NavBar menu="OFFRES" />
      </div>

      {/* Section héros - Responsive */}
      <Flex
        vertical
        className="relative w-full overflow-hidden"
        style={{
          backgroundImage: `url(${accommodation?.mainImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          padding: isMobile ? "4vh 6vw" : "8vh 8vw",
          paddingBottom: isMobile ? "10vw" : "80px",
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

      {/* Contenu principal - Responsive */}
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
        {/* Section des circuits - Responsive */}
        <Flex
          vertical
          gap="20px"
          style={{
            width: "100%",
            paddingBottom: isMobile ? "1vw" : "2vw",
          }}
        >
          {accommodations
            .filter((accommodation) => accommodation.id === id)
            .map((accommodation) => (
              <ViewHebergementContent
                {...accommodation}
                key={accommodation.id}
              />
            ))}
        </Flex>
      </Flex>

      {/* Footer */}
      <Footer />
    </Flex>
  );
};

export default ViewHebergement;
