import React, { useEffect, useState } from "react";
import {
  Star,
  Users,
  Luggage,
  Fuel,
  Settings,
  Shield,
  Camera,
  MapPin,
  Calendar,
  Snowflake,
  Radio,
  Navigation,
  Bluetooth,
  Wifi,
  Car,
  Zap,
  LucideIcon,
  Thermometer,
} from "lucide-react";
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
import ImageCarousel from "../../components/ImageGallery/ImageCarousel";
import Footer from "../../components/footer/footer";
import { Flex, Modal, Typography } from "antd";
import { useLocation, useNavigate } from "react-router-dom";
import NavBar from "../../components/navBar/navBar";
import { useTransaction } from "../../context/transactionContext";
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

// Interface pour définir une caractéristique de voiture
interface CarFeature {
  name: string;
  icon: LucideIcon;
  available: boolean;
  description?: string;
}

// Interface pour les caractéristiques groupées
interface CarFeaturesGroup {
  [key: string]: CarFeature[];
}

// Interface pour les spécifications de base
interface CarSpecs {
  passengers: number;
  luggage: number;
  transmission: "Manuel" | "Automatique";
  fuelType: "Essence" | "Diesel" | "Électrique" | "Hybride";
  fuelConsumption?: string;
  doors: number;
}

// Interface pour les données de location de voiture
interface CarRentalData {
  id: number;
  name: string;
  brand: string;
  model: string;
  year: number;
  category:
    | "Économique"
    | "Compact"
    | "Intermédiaire"
    | "Premium"
    | "Luxe"
    | "SUV"
    | "Monospace";
  pricePerDay: number;
  rating: number;
  reviewCount: number;
  mainImage: string;
  images: string[];
  description: string;
  location: string;
  availability: boolean;
  specs: CarSpecs;
  features: CarFeaturesGroup;
}

// Interface pour les props du composant
interface CarRentalCardProps {
  car: CarRentalData;
  onRent?: () => void;
  onViewDetails?: () => void;
  className?: string;
  startDate?: string;
  endDate?: string;
}

// Interface pour les colonnes équilibrées
interface BalancedFeatures {
  leftColumn: [string, CarFeature[]][];
  rightColumn: [string, CarFeature[]][];
}

const CarRentalCard: React.FC<CarRentalCardProps> = ({
  car,
  onRent,
  onViewDetails,
  className = "",
  startDate,
  endDate,
}) => {
  const [showModal, setShowModal] = useState<boolean>(false);
  const [currentImageIndex, setCurrentImageIndex] = useState<number>(0);

  const openModal = (): void => {
    setShowModal(true);
    if (onViewDetails) {
      onViewDetails();
    }
  };

  const closeModal = (): void => setShowModal(false);

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

  // Fonction pour équilibrer la distribution des caractéristiques
  const getBalancedFeatures = (): BalancedFeatures => {
    const featureEntries = Object.entries(car.features);
    const totalSections = featureEntries.length;
    const midPoint = Math.ceil(totalSections / 2);

    return {
      leftColumn: featureEntries.slice(0, midPoint),
      rightColumn: featureEntries.slice(midPoint),
    };
  };

  const renderFeatureSection = (
    title: string,
    features: CarFeature[]
  ): React.ReactNode | null => {
    if (!features || features.length === 0) return null;

    return (
      <div className="mb-6">
        <h4 className="font-semibold text-gray-800 mb-3 text-base">{title}</h4>
        <div className="space-y-3">
          {features.map((feature, index) => {
            const IconComponent = feature.icon;
            return (
              <div
                key={index}
                className={`flex items-start space-x-3 ${
                  !feature.available ? "opacity-60" : ""
                }`}
              >
                <div className="flex-shrink-0 mt-0.5">
                  <IconComponent
                    size={18}
                    className={
                      feature.available ? "text-green-600" : "text-red-500"
                    }
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <span
                    className={`block ${
                      !feature.available
                        ? "line-through text-gray-500"
                        : "text-gray-700"
                    } text-sm font-medium`}
                  >
                    {feature.name}
                  </span>
                  {feature.description && (
                    <p className="text-xs text-gray-500 mt-1 leading-relaxed">
                      {feature.description}
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

  // Mapping des clés vers des titres en français
  const featureTitles: Record<string, string> = {
    comfort: "Confort",
    technology: "Technologie",
    safety: "Sécurité",
    entertainment: "Divertissement",
    connectivity: "Connectivité",
    climate: "Climatisation",
    extras: "Équipements supplémentaires",
  };

  const handleRenting = (): void => {
    if (onRent) {
      onRent();
    } else {
      console.log(`Location initiée pour ${car.brand} ${car.model}`);
    }
  };

  const getCategoryColor = (category: string): string => {
    const colors: Record<string, string> = {
      Économique: "bg-green-100 text-green-800",
      Compact: "bg-blue-100 text-blue-800",
      Intermédiaire: "bg-yellow-100 text-yellow-800",
      Premium: "bg-purple-100 text-purple-800",
      Luxe: "bg-red-100 text-red-800",
      SUV: "bg-orange-100 text-orange-800",
      Monospace: "bg-indigo-100 text-indigo-800",
    };
    return colors[category] || "bg-gray-100 text-gray-800";
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

  const { leftColumn, rightColumn } = getBalancedFeatures();

  return (
    <>
      {/* Carte principale */}
      <div
        className={`bg-white rounded-xl shadow-lg overflow-hidden max-w-sm hover:shadow-xl transition-shadow duration-300 ${className}`}
      >
        <div className="relative">
          <img
            src={car.mainImage}
            alt={`${car.brand} ${car.model}`}
            className="w-full h-48 object-cover"
          />

          {/* Badge de disponibilité */}
          <div className="absolute top-3 left-3">
            <span
              className={`px-2 py-1 rounded-full text-xs font-semibold ${
                car.availability
                  ? "bg-green-100 text-green-800"
                  : "bg-red-100 text-red-800"
              }`}
            >
              {car.availability ? "Disponible" : "Non disponible"}
            </span>
          </div>

          {/* Rating */}
          {/* <div className="absolute top-3 right-3 bg-white bg-opacity-90 rounded-full px-2 py-1">
            <div className="flex items-center space-x-1">
              <Star size={14} className="fill-yellow-400 text-yellow-400" />
              <span className="text-sm font-semibold">
                {car.rating}
              </span>
            </div>
          </div> */}

          {/* Catégorie */}
          <div className="absolute bottom-3 left-3">
            <span
              className={`px-2 py-1 rounded-full text-xs font-semibold ${getCategoryColor(
                car.category
              )}`}
            >
              {car.category}
            </span>
          </div>
        </div>

        <div className="p-4">
          <div className="flex justify-between items-start mb-2">
            <div>
              <h3 className="font-bold text-lg text-gray-800">
                {car.brand} {car.model}
              </h3>
              <p className="text-sm text-gray-600">{car.year}</p>
            </div>
          </div>

          {/* Spécifications principales */}
          <div className="flex items-center justify-between mb-3 text-sm text-gray-600">
            <div className="flex items-center space-x-1">
              <Users size={16} />
              <span>{car.specs.passengers}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Luggage size={16} />
              <span>{car.specs.luggage}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Settings size={16} />
              <span>{car.specs.transmission === "Manuel" ? "M" : "A"}</span>
            </div>
            <div className="flex items-center space-x-1">
              {React.createElement(getFuelIcon(car.specs.fuelType), {
                size: 16,
              })}
              <span className="text-xs">{car.specs.fuelType}</span>
            </div>
          </div>

          {/* Rating et avis */}
          <div className="flex items-center mb-3">
            {renderStars(car.rating)}
            <span className="text-sm text-gray-600 ml-2">
              ({car.reviewCount} avis)
            </span>
          </div>

          {/* Localisation */}
          <div className="flex items-center mb-3 text-sm text-gray-600">
            <MapPin size={16} className="mr-1" />
            <span>{car.location}</span>
          </div>

          {/* Prix et bouton */}
          <div className="flex items-center justify-between">
            <div>
              <span className="text-2xl font-bold text-gray-800">
                {car.pricePerDay}€
              </span>
              <span className="text-gray-600 text-sm"> / jour</span>
            </div>

            <button
              onClick={openModal}
              disabled={!car.availability}
              className={`px-4 py-2 rounded-lg font-medium transition-colors duration-200 bg-blue-600 hover:bg-blue-700 text-white ${
                car.availability
                  ? "bg-blue-600 hover:bg-blue-700 text-white"
                  : "bg-gray-300 text-gray-500 cursor-not-allowed"
              }`}
            >
              Détails
            </button>
          </div>
        </div>
      </div>

      {/* Modal */}
      <Modal
        open={showModal}
        closeIcon={false}
        onCancel={closeModal}
        footer={null}
      >
        {/* Contenu scrollable */}
        <div className="flex-1 overflow-y-auto max-h-[80vh] w-fit">
          {/* Galerie d'images */}
          <div className="relative bg-gray-100">
            <img
              src={car.images[currentImageIndex]}
              alt={`${car.brand} ${car.model} - Image ${currentImageIndex + 1}`}
              className="w-full h-80 object-cover"
            />

            {car.images.length > 1 && (
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
                  {currentImageIndex + 1} / {car.images.length}
                </div>
              </>
            )}

            {/* Miniatures */}
            <div className="absolute bottom-4 left-4 flex space-x-2">
              {car.images.slice(0, 5).map((image, index) => (
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
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-1">
                  {renderStars(car.rating)}
                  <span className="font-semibold ml-2 text-lg">
                    {car.rating}
                  </span>
                  <span className="text-gray-600">
                    ({car.reviewCount} avis)
                  </span>
                </div>
                <div className="flex items-center text-gray-600">
                  <MapPin size={16} className="mr-1" />
                  <span>{car.location}</span>
                </div>
              </div>
              <div className="text-left md:text-right">
                <div className="text-3xl font-bold text-blue-600">
                  {car.pricePerDay}€
                </div>
                <div className="text-gray-600">par jour</div>
              </div>
            </div>

            {/* Spécifications détaillées */}
            <div className="mb-8">
              <h3 className="text-xl font-semibold mb-4 text-gray-800 border-b pb-2">
                Spécifications du véhicule
              </h3>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-gray-50 p-4 rounded-lg text-center">
                  <Users size={24} className="mx-auto mb-2 text-blue-600" />
                  <div className="font-semibold">{car.specs.passengers}</div>
                  <div className="text-sm text-gray-600">Passagers</div>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg text-center">
                  <Luggage size={24} className="mx-auto mb-2 text-blue-600" />
                  <div className="font-semibold">{car.specs.luggage}</div>
                  <div className="text-sm text-gray-600">Bagages</div>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg text-center">
                  <Settings size={24} className="mx-auto mb-2 text-blue-600" />
                  <div className="font-semibold">{car.specs.transmission}</div>
                  <div className="text-sm text-gray-600">Transmission</div>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg text-center">
                  {React.createElement(getFuelIcon(car.specs.fuelType), {
                    size: 24,
                    className: "mx-auto mb-2 text-blue-600",
                  })}
                  <div className="font-semibold">{car.specs.fuelType}</div>
                  <div className="text-sm text-gray-600">Carburant</div>
                </div>
              </div>

              {car.specs.fuelConsumption && (
                <div className="mt-4 p-3 bg-green-50 rounded-lg">
                  <div className="flex items-center text-green-700">
                    <Fuel size={16} className="mr-2" />
                    <span className="font-medium">
                      Consommation: {car.specs.fuelConsumption}
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
            </div>

            {/* Équipements avec distribution équilibrée */}
            <div className="mb-8">
              <h3 className="text-xl font-semibold mb-6 text-gray-800 border-b pb-2">
                Équipements et options
              </h3>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Colonne de gauche */}
                <div className="space-y-6">
                  {leftColumn.map(([key, features]) =>
                    renderFeatureSection(featureTitles[key] || key, features)
                  )}
                </div>

                {/* Colonne de droite */}
                <div className="space-y-6">
                  {rightColumn.map(([key, features]) =>
                    renderFeatureSection(featureTitles[key] || key, features)
                  )}
                </div>
              </div>
            </div>

            {/* Informations de location */}
            {(startDate || endDate) && (
              <div className="mb-8 p-4 bg-blue-50 rounded-lg">
                <h4 className="font-semibold text-blue-800 mb-2">
                  Période de location
                </h4>
                <div className="flex items-center space-x-4 text-blue-700">
                  {startDate && (
                    <div className="flex items-center">
                      <Calendar size={16} className="mr-1" />
                      <span>Du: {startDate}</span>
                    </div>
                  )}
                  {endDate && (
                    <div className="flex items-center">
                      <Calendar size={16} className="mr-1" />
                      <span>Au: {endDate}</span>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Bouton de location */}
            <div className="mt-8 pt-6 border-t">
              <button
                onClick={handleRenting}
                disabled={!car.availability}
                className={`w-full py-3 px-6 rounded-lg font-semibold text-lg transition-colors duration-200 ${
                  car.availability
                    ? "bg-blue-600 hover:bg-blue-700 text-white"
                    : "bg-gray-300 text-gray-500 cursor-not-allowed"
                }`}
              >
                {car.availability
                  ? "Réserver maintenant"
                  : "Véhicule non disponible"}
              </button>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
};

// Exemple d'utilisation avec données typées
export const createExampleCars = (): CarRentalData[] => [
  {
    id: 1,
    name: "Citroën C3 Aircross",
    brand: "Citroën",
    model: "C3 Aircross",
    year: 2023,
    category: "SUV",
    pricePerDay: 45,
    rating: 4.6,
    reviewCount: 89,
    mainImage:
      "https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=400&h=250&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=600&h=400&fit=crop",
      "https://images.unsplash.com/photo-1493238792000-8113da705763?w=600&h=400&fit=crop",
      "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=600&h=400&fit=crop",
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&h=400&fit=crop",
      "https://images.unsplash.com/photo-1580273916550-e323be2ae537?w=600&h=400&fit=crop",
    ],
    description:
      "SUV compact et polyvalent, parfait pour vos déplacements urbains et vos escapades. Avec son design moderne et ses équipements de série, le C3 Aircross offre confort et praticité pour toute la famille.",
    location: "Aéroport Charles de Gaulle, Paris",
    availability: true,
    specs: {
      passengers: 5,
      luggage: 3,
      transmission: "Automatique",
      fuelType: "Essence",
      fuelConsumption: "5.8L/100km",
      doors: 5,
    },
    features: {
      comfort: [
        { name: "Sièges en cuir", icon: Car, available: true },
        { name: "Sièges chauffants", icon: Thermometer, available: true },
        {
          name: "Réglage électrique des sièges",
          icon: Settings,
          available: false,
        },
      ],
      technology: [
        { name: "Écran tactile 7 pouces", icon: Radio, available: true },
        {
          name: "Système de navigation GPS",
          icon: Navigation,
          available: true,
        },
        { name: "Caméra de recul", icon: Camera, available: true },
      ],
      safety: [
        { name: "ABS et ESP", icon: Shield, available: true },
        { name: "Airbags multiples", icon: Shield, available: true },
        {
          name: "Assistance au freinage d'urgence",
          icon: Shield,
          available: true,
        },
        { name: "Détecteur d'angle mort", icon: Shield, available: false },
      ],
      connectivity: [
        { name: "Bluetooth", icon: Bluetooth, available: true },
        { name: "USB et prise 12V", icon: Settings, available: true },
        { name: "WiFi intégré", icon: Wifi, available: false },
      ],
      climate: [
        { name: "Climatisation automatique", icon: Snowflake, available: true },
        { name: "Chauffage", icon: Thermometer, available: true },
      ],
      extras: [
        { name: "Barres de toit", icon: Car, available: true },
        { name: "Kit mains libres", icon: Settings, available: true },
      ],
    },
  },
  {
    id: 3,
    name: "Peugeot 3008",
    brand: "Peugeot",
    model: "3008",
    year: 2024,
    category: "Premium",
    pricePerDay: 65,
    rating: 4.8,
    reviewCount: 54,
    mainImage:
      "https://images.unsplash.com/photo-1503736334956-4c8f8e92946d?w=400&h=250&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1503736334956-4c8f8e92946d?w=600&h=400&fit=crop",
      "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?w=600&h=400&fit=crop",
      "https://images.unsplash.com/photo-1525609004556-c46c7d6cf023?w=600&h=400&fit=crop",
    ],
    description:
      "Le Peugeot 3008 allie élégance, technologie et sécurité. Ce SUV premium propose une expérience de conduite haut de gamme avec de nombreux équipements modernes.",
    location: "Aéroport Nice Côte d'Azur",
    availability: false,
    specs: {
      passengers: 5,
      luggage: 4,
      transmission: "Automatique",
      fuelType: "Hybride",
      fuelConsumption: "4.2L/100km",
      doors: 5,
    },
    features: {
      comfort: [
        { name: "Sièges en cuir", icon: Car, available: true },
        { name: "Sièges chauffants", icon: Thermometer, available: true },
        {
          name: "Réglage électrique des sièges",
          icon: Settings,
          available: true,
        },
      ],
      technology: [
        { name: "Écran tactile 10 pouces", icon: Radio, available: true },
        {
          name: "Système de navigation GPS",
          icon: Navigation,
          available: true,
        },
        { name: "Caméra 360°", icon: Camera, available: true },
      ],
      safety: [
        { name: "ABS et ESP", icon: Shield, available: true },
        { name: "Airbags multiples", icon: Shield, available: true },
        {
          name: "Assistance au freinage d'urgence",
          icon: Shield,
          available: true,
        },
        { name: "Détecteur d'angle mort", icon: Shield, available: true },
      ],
      connectivity: [
        { name: "Bluetooth", icon: Bluetooth, available: true },
        { name: "USB et prise 12V", icon: Settings, available: true },
        { name: "WiFi intégré", icon: Wifi, available: true },
      ],
      climate: [
        { name: "Climatisation automatique", icon: Snowflake, available: true },
        { name: "Chauffage", icon: Thermometer, available: true },
      ],
      extras: [
        { name: "Barres de toit", icon: Car, available: true },
        { name: "Kit mains libres", icon: Settings, available: true },
      ],
    },
  },
  {
    id: 1,
    name: "Citroën C3 Aircross",
    brand: "Citroën",
    model: "C3 Aircross",
    year: 2023,
    category: "SUV",
    pricePerDay: 45,
    rating: 4.6,
    reviewCount: 89,
    mainImage:
      "https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=400&h=250&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=600&h=400&fit=crop",
      "https://images.unsplash.com/photo-1493238792000-8113da705763?w=600&h=400&fit=crop",
      "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=600&h=400&fit=crop",
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&h=400&fit=crop",
      "https://images.unsplash.com/photo-1580273916550-e323be2ae537?w=600&h=400&fit=crop",
    ],
    description:
      "SUV compact et polyvalent, parfait pour vos déplacements urbains et vos escapades. Avec son design moderne et ses équipements de série, le C3 Aircross offre confort et praticité pour toute la famille.",
    location: "Aéroport Charles de Gaulle, Paris",
    availability: true,
    specs: {
      passengers: 5,
      luggage: 3,
      transmission: "Automatique",
      fuelType: "Essence",
      fuelConsumption: "5.8L/100km",
      doors: 5,
    },
    features: {
      comfort: [
        { name: "Sièges en cuir", icon: Car, available: true },
        { name: "Sièges chauffants", icon: Thermometer, available: true },
        {
          name: "Réglage électrique des sièges",
          icon: Settings,
          available: false,
        },
      ],
      technology: [
        { name: "Écran tactile 7 pouces", icon: Radio, available: true },
        {
          name: "Système de navigation GPS",
          icon: Navigation,
          available: true,
        },
        { name: "Caméra de recul", icon: Camera, available: true },
      ],
      safety: [
        { name: "ABS et ESP", icon: Shield, available: true },
        { name: "Airbags multiples", icon: Shield, available: true },
        {
          name: "Assistance au freinage d'urgence",
          icon: Shield,
          available: true,
        },
        { name: "Détecteur d'angle mort", icon: Shield, available: false },
      ],
      connectivity: [
        { name: "Bluetooth", icon: Bluetooth, available: true },
        { name: "USB et prise 12V", icon: Settings, available: true },
        { name: "WiFi intégré", icon: Wifi, available: false },
      ],
      climate: [
        { name: "Climatisation automatique", icon: Snowflake, available: true },
        { name: "Chauffage", icon: Thermometer, available: true },
      ],
      extras: [
        { name: "Barres de toit", icon: Car, available: true },
        { name: "Kit mains libres", icon: Settings, available: true },
      ],
    },
  },
  {
    id: 1,
    name: "Citroën C3 Aircross",
    brand: "Citroën",
    model: "C3 Aircross",
    year: 2023,
    category: "SUV",
    pricePerDay: 45,
    rating: 4.6,
    reviewCount: 89,
    mainImage:
      "https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=400&h=250&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=600&h=400&fit=crop",
      "https://images.unsplash.com/photo-1493238792000-8113da705763?w=600&h=400&fit=crop",
      "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=600&h=400&fit=crop",
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&h=400&fit=crop",
      "https://images.unsplash.com/photo-1580273916550-e323be2ae537?w=600&h=400&fit=crop",
    ],
    description:
      "SUV compact et polyvalent, parfait pour vos déplacements urbains et vos escapades. Avec son design moderne et ses équipements de série, le C3 Aircross offre confort et praticité pour toute la famille.",
    location: "Aéroport Charles de Gaulle, Paris",
    availability: true,
    specs: {
      passengers: 5,
      luggage: 3,
      transmission: "Automatique",
      fuelType: "Essence",
      fuelConsumption: "5.8L/100km",
      doors: 5,
    },
    features: {
      comfort: [
        { name: "Sièges en cuir", icon: Car, available: true },
        { name: "Sièges chauffants", icon: Thermometer, available: true },
        {
          name: "Réglage électrique des sièges",
          icon: Settings,
          available: false,
        },
      ],
      technology: [
        { name: "Écran tactile 7 pouces", icon: Radio, available: true },
        {
          name: "Système de navigation GPS",
          icon: Navigation,
          available: true,
        },
        { name: "Caméra de recul", icon: Camera, available: true },
      ],
      safety: [
        { name: "ABS et ESP", icon: Shield, available: true },
        { name: "Airbags multiples", icon: Shield, available: true },
        {
          name: "Assistance au freinage d'urgence",
          icon: Shield,
          available: true,
        },
        { name: "Détecteur d'angle mort", icon: Shield, available: false },
      ],
      connectivity: [
        { name: "Bluetooth", icon: Bluetooth, available: true },
        { name: "USB et prise 12V", icon: Settings, available: true },
        { name: "WiFi intégré", icon: Wifi, available: false },
      ],
      climate: [
        { name: "Climatisation automatique", icon: Snowflake, available: true },
        { name: "Chauffage", icon: Thermometer, available: true },
      ],
      extras: [
        { name: "Barres de toit", icon: Car, available: true },
        { name: "Kit mains libres", icon: Settings, available: true },
      ],
    },
  },
];

const Locations = () => {
  const [isMobile, setIsMobile] = useState(false);
  const { pathname } = useLocation();
  const { setTransaction } = useTransaction();
  const navigate = useNavigate();

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
    document.title = "Nos Offres - Locations de véhicules";
  }, []);
  const cars = createExampleCars();

  return (
    <Flex justify="center" vertical>
      {/* Header avec NavBar */}
      <div className="relative z-20 flex items-center justify-center">
        <NavBar menu="OFFRES" />
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
              Explorez le Bénin à votre rythme
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
              Nos Véhicules
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
              Confort et sécurité sur toutes vos routes
            </Typography.Text>
          </Flex>
        </Flex>
      </Flex>

      {/* Liste des véhicules */}
      <Flex
        style={{
          width: "100%",
          // padding: "3vh 0",
          paddingBottom: "50px",
          maxWidth: "1200px",
          margin: "0 auto",
        }}
        vertical
        gap={isMobile ? 30 : 50}
      >
        <Flex
          wrap="wrap"
          gap={20}
          justify="center"
          /* justify="space-between" gap={isMobile ? 20 : 30} */ style={{
            paddingTop: "40px",
          }}
        >
          {cars.map((car: any, index: any) => (
            <CarRentalCard key={index} car={car} onRent={() => {
              setTransaction({
              id: car.id,
              title: car.name,
              amount: car.pricePerDay,
            })
            // we redirect to the payment page
            navigate("/reservations-locations");
            }} />
          ))}
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

export default Locations;
