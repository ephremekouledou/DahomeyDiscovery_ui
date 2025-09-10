import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { CarRentalCardProps } from "./locations";
import Footer from "../../components/footer/footer";
import { Button, Flex, Image as AntdImage, Typography } from "antd";
import NavBar from "../../components/navBar/navBar";
import {
  Car,
  Fuel,
  LucideIcon,
  Luggage,
  Settings,
  Star,
  Users,
  Zap,
} from "lucide-react";
import { useTransaction } from "../../context/transactionContext";
import BeginningButton from "../../components/dededed/BeginingButton";
import { ICarRentalData } from "../../sdk/models/vehicules";
import { VehiculesAPI } from "../../sdk/api/vehicules";
import { HandleGetFileLink } from "../Circuits/CircuitsCartes";
import { EquipmentModal, TarificationModal } from "./locationsModal";
import { DollarCircleFilled } from "@ant-design/icons";

const ViewLocationContent: React.FC<CarRentalCardProps> = ({ car }) => {
  const { setTransaction } = useTransaction();
  const navigate = useNavigate();
  const [isHovered, setIsHovered] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState<number>(0);
  const [showEquipmentModal, setShowEquipmentModal] = useState(false);
  const [showTarificationModal, setShowTarificationModal] = useState(false);
  const [_, setImageHeights] = useState<number[]>([]);
  const [maxHeight, setMaxHeight] = useState<number>(400); // hauteur par défaut augmentée

  // Fonction pour charger les images et déterminer la hauteur max
  useEffect(() => {
    const loadImages = async () => {
      const heights: number[] = [];
      let max = 320;

      const imagePromises = car.images.map((image, index) => {
        return new Promise<void>((resolve) => {
          const img = new window.Image();
          img.onload = () => {
            // Calculer la hauteur en gardant le ratio aspect
            const containerWidth = window.innerWidth; // ou la largeur de votre conteneur
            const aspectRatio = img.width / img.height;
            const calculatedHeight = containerWidth / aspectRatio;

            heights[index] = calculatedHeight;
            if (calculatedHeight > max) {
              max = calculatedHeight;
            }
            resolve();
          };
          img.onerror = () => {
            heights[index] = 320; // hauteur par défaut en cas d'erreur
            resolve();
          };
          img.src = HandleGetFileLink(image.file as string);
        });
      });

      await Promise.all(imagePromises);
      setImageHeights(heights);
      setMaxHeight(Math.min(max, 500)); // limiter la hauteur maximale à 500px
    };

    if (car.images && car.images.length > 0) {
      loadImages();
    }
  }, [car.images]);

  const nextImage = (): void => {
    setCurrentImageIndex((prev) => (prev + 1) % car.images.length);
  };

  const prevImage = (): void => {
    setCurrentImageIndex(
      (prev) => (prev - 1 + car.images.length) % car.images.length
    );
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

  const getFuelIcon = (fuelType: string): LucideIcon => {
    switch (fuelType) {
      case "Électrique":
        return Zap;
      case "Hybride":
        return Zap;
      default:
        return Fuel;
    }
  };

  return (
    <div className="flex-1">
      <div>
        {/* En-tête avec le nom du véhicule */}
        <div className="bg-white shadow-md p-6">
          <h2 className="text-2xl font-bold text-gray-800">
            {car.brand} {car.model}
          </h2>
        </div>
      </div>

      {/* Galerie d'images avec hauteur adaptive */}
      <div className="relative bg-gray-100">
        <div
          className="w-full overflow-hidden flex items-center justify-center"
          style={{ height: `${maxHeight}px` }}
        >
          <AntdImage
            src={HandleGetFileLink(
              car.images[currentImageIndex].file as string
            )}
            alt={`${car.brand} ${car.model} - Image ${currentImageIndex + 1}`}
            className="max-w-full max-h-full object-cover"
            style={{
              width: "auto",
              height: "auto",
              maxHeight: "100%",
              maxWidth: "100%",
            }}
          />
        </div>

        {car.images.length > 1 && (
          <>
            <button
              onClick={prevImage}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white hover:bg-gray-50 rounded-full p-3 shadow-lg transition-all z-10"
              aria-label="Image précédente"
            >
              <span className="text-lg font-bold">‹</span>
            </button>
            <button
              onClick={nextImage}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white hover:bg-gray-50 rounded-full p-3 shadow-lg transition-all z-10"
              aria-label="Image suivante"
            >
              <span className="text-lg font-bold">›</span>
            </button>

            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black bg-opacity-70 text-white px-3 py-1 rounded-full text-sm z-10">
              {currentImageIndex + 1} / {car.images.length}
            </div>
          </>
        )}

        {/* Miniatures */}
        <div className="absolute bottom-4 left-4 flex space-x-2 z-10">
          {car.images.map((image, index) => (
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
              />
            </button>
          ))}
        </div>
      </div>

      <div className="p-6">
        {/* Prix et évaluation */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-1">
              {renderStars(car.rating)}
              <span className="font-semibold ml-2 text-lg">{car.rating}</span>
              <span className="text-gray-600">({car.review_count} avis)</span>
            </div>
            {/* <div className="flex items-center text-gray-600">
              <MapPin size={16} className="mr-1" />
              <span>{car.location}</span>
            </div> */}
          </div>
          {/* <div className="text-left md:text-right">
            <div className="text-3xl font-bold text-blue-600">
              {car.price_per_day} FCFA
            </div>
            <div className="text-gray-600">par jour</div>
          </div> */}
        </div>

        {/* Spécifications détaillées */}
        <div className="mb-8">
          <h3 className="text-xl font-semibold mb-4 text-gray-800 border-b pb-2">
            Spécifications du véhicule
          </h3>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-gray-50 p-4 rounded-lg text-center">
              <Users size={24} className="mx-auto mb-2 text-blue-600" />
              <div className="font-semibold">{car.passengers}</div>
              <div className="text-sm text-gray-600">Passagers</div>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg text-center">
              <Luggage size={24} className="mx-auto mb-2 text-blue-600" />
              <div className="font-semibold">{car.luggage}</div>
              <div className="text-sm text-gray-600">Bagages</div>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg text-center">
              <Settings size={24} className="mx-auto mb-2 text-blue-600" />
              <div className="font-semibold">{car.transmission}</div>
              <div className="text-sm text-gray-600">Transmission</div>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg text-center">
              {React.createElement(getFuelIcon(car.fuel_type), {
                size: 24,
                className: "mx-auto mb-2 text-blue-600",
              })}
              <div className="font-semibold">{car.fuel_type}</div>
              <div className="text-sm text-gray-600">Carburant</div>
            </div>
          </div>

          {car.fuel_consumption && (
            <div className="mt-4 p-3 bg-green-50 rounded-lg">
              <div className="flex items-center text-green-700">
                <Fuel size={16} className="mr-2" />
                <span className="font-medium">
                  Consommation: {car.fuel_consumption}
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Description */}
        <div className="mb-8">
          <h3 className="text-xl font-semibold mb-4 text-gray-800 border-b pb-2">
            Description du véhicule
          </h3>
          <p className="text-gray-700 leading-relaxed text-base">
            {car.description}
          </p>
          <Flex style={{ gap: "10px", marginTop: "20px" }}>
            <button
              onClick={() => setShowEquipmentModal(true)}
              className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Car className="w-5 h-5" />
              Voir les équipements
            </button>

            <button
              onClick={() => setShowTarificationModal(true)}
              className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
            >
              <DollarCircleFilled className="w-5 h-5" />
              Voir la tarification
            </button>
          </Flex>
          <EquipmentModal
            isOpen={showEquipmentModal}
            onClose={() => setShowEquipmentModal(false)}
            equipment={car}
          />

          <TarificationModal
            isOpen={showTarificationModal}
            onClose={() => setShowTarificationModal(false)}
            tarification={car.tarification}
          />
        </div>

        {/* Équipements avec distribution équilibrée */}
        {/* <div className="mb-8">
          <h3 className="text-xl font-semibold mb-6 text-gray-800 border-b pb-2">
            Équipements et options
          </h3>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {car.features}
          </div>
        </div> */}

        {/* Bouton de location */}
        <div className="mt-8 pt-6 border-t">
          <Button
            type="primary"
            size="large"
            style={{
              backgroundColor: isHovered ? "#ff3100" : "#F59F00",
              color: isHovered ? "white" : "black",
              borderRadius: "7px",
              border: "none",
              fontFamily: "GeneralSans",
              transition: "all 0.3s ease",
              fontSize: "16px",
              height: "40px",
              padding: "0 20px",
              fontWeight: "bold",
              width: "100%",
            }}
            disabled={!car.availability}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onClick={() => {
              setTransaction({
                id: car._id,
                title: car.name,
                amount: car.price_per_day,
              });
              // we redirect to the payment page
              navigate("/reservations-locations");
            }}
          >
            {car.availability
              ? "Réserver maintenant"
              : "Véhicule non disponible"}
          </Button>
        </div>
      </div>
    </div>
  );
};

const ViewLocation = () => {
  const { id } = useParams();
  const [isMobile, setIsMobile] = useState(false);
  const { pathname } = useLocation();

  const [car, setCar] = useState<ICarRentalData | null>(null);

  // Simulate fetching car data based on the ID
  // const cars = createExampleCars();

  useEffect(() => {
    VehiculesAPI.GetByID(id as string)
      .then((data) => {
        setCar(data);
        console.log("Vehicule fetched successfully:", data);
      })
      .catch((err) => {
        console.error("Error fetching vehicule:", err);
      });
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
        <NavBar menu="LOCATION" />
      </div>

      {/* Section héros - Responsive */}
      <Flex
        vertical
        className="relative w-full overflow-hidden"
        style={{
          backgroundImage: `url(${HandleGetFileLink(
            car?.main_image[0].file as string
          )})`,
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
              Nos vehicules
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
        {car !== null && (
          <Flex
            vertical
            gap="20px"
            style={{
              width: "100%",
              paddingBottom: isMobile ? "1vw" : "2vw",
            }}
          >
            <ViewLocationContent car={car} {...car} key={car._id} />

            {/* {car !== null && (
            
          )} */}
          </Flex>
        )}
      </Flex>

      {/* Footer */}
      <Footer />
    </Flex>
  );
};

export default ViewLocation;
