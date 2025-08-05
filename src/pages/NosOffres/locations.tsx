import React, { useEffect, useState } from "react";
import {
  Star,
  Users,
  Luggage,
  Fuel,
  Settings,
  Shield,
  Camera,
  Snowflake,
  Radio,
  Navigation,
  Bluetooth,
  Wifi,
  Car,
  Zap,
  LucideIcon,
  Thermometer,
  MapPin,
  Smartphone,
  Mail,
  User,
  Coffee,
  Droplets,
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
import voiture from "../../assets/images/voitures.jpg";
import voitureFront from "../../assets/images/voitureFront.webp";
import ImageCarousel from "../../components/ImageGallery/ImageCarousel";
import Footer from "../../components/footer/footer";
import { Button, Flex, Typography } from "antd";
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

const ServicesSection = () => {
  const services = [
    {
      id: 1,
      title: "CHAUFFEURS",
      description: "Chauffeurs expérimentés et professionnels.",
      icon: User,
      delay: "0ms",
    },
    {
      id: 2,
      title: "VÉHICULES",
      description: "Véhicules hauts de gamme et tout équipés",
      icon: Car,
      delay: "100ms",
    },
    {
      id: 3,
      title: "CHAUFFEURS",
      description: "Chauffeurs expérimentés et professionnels.",
      icon: Coffee,
      delay: "200ms",
    },
    {
      id: 4,
      title: "RAFRAÎCHISSEMENT",
      description: "N'hésitez pas à nous demander une bouteille d'eau.",
      icon: Droplets,
      delay: "300ms",
    },
  ];

  return (
    <div className="bg-gradient-to-br from-gray-900 via-gray-800 to-black relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-red-500/20 to-transparent"></div>
        <div className="absolute bottom-0 right-0 w-full h-full bg-gradient-to-l from-red-500/20 to-transparent"></div>
      </div>

      {/* Road-like lines for visual effect */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-red-500/30 to-transparent transform rotate-12"></div>
        <div className="absolute bottom-1/4 right-0 w-full h-px bg-gradient-to-r from-transparent via-red-500/30 to-transparent transform -rotate-12"></div>
      </div>

      <div className="relative z-10 container mx-auto px-4 py-16">
        {/* Title */}
        <div className="text-center mb-16">
          <h2
            className="text-5xl md:text-6xl font-bold text-white mb-4"
            style={{ fontFamily: "DragonAngled" }}
          >
            <span className="text-red-500">NOS</span>{" "}
            <span className="text-white">SERVICES</span>
          </h2>
          <div className="w-24 h-1 bg-red-500 mx-auto"></div>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {services.map((service) => {
            const IconComponent = service.icon;
            return (
              <div
                key={service.id}
                className="group relative bg-black/40 backdrop-blur-sm border border-gray-600/30 rounded-2xl p-8 hover:border-red-500/50 transition-all duration-500 hover:transform hover:scale-105"
                style={{
                  animationDelay: service.delay,
                  animation: `fadeInUp 0.8s ease-out forwards ${service.delay}`,
                }}
              >
                {/* Gradient overlay on hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-red-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl"></div>

                <div className="relative z-10 flex items-start space-x-6">
                  {/* Icon */}
                  <div className="flex-shrink-0">
                    <div className="w-16 h-16 bg-red-500 rounded-xl flex items-center justify-center group-hover:bg-red-600 transition-colors duration-300">
                      <IconComponent size={28} className="text-white" />
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex-1">
                    <h3
                      className="text-xl font-bold text-red-500 mb-3 group-hover:text-red-400 transition-colors duration-300"
                      style={{ fontFamily: "DragonAngled", fontSize: "2rem" }}
                    >
                      {service.title}
                    </h3>
                    <p className="text-gray-300 leading-relaxed group-hover:text-white transition-colors duration-300">
                      {service.description}
                    </p>
                  </div>
                </div>

                {/* Decorative corner */}
                <div className="absolute top-4 right-4 w-8 h-8 border-t-2 border-r-2 border-red-500/30 group-hover:border-red-500/60 transition-colors duration-300"></div>
              </div>
            );
          })}
        </div>
      </div>

      <style>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
};

// Interface pour définir une caractéristique de voiture
export interface CarFeature {
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
export interface CarRentalData {
  id: string;
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
export interface CarRentalCardProps {
  car: CarRentalData;
  onRent?: () => void;
  onViewDetails?: () => void;
  className?: string;
  startDate?: string;
  endDate?: string;
}

// Interface pour les colonnes équilibrées
export interface BalancedFeatures {
  leftColumn: [string, CarFeature[]][];
  rightColumn: [string, CarFeature[]][];
}

const CarRentalCard: React.FC<CarRentalCardProps> = ({
  car,
  className = "",
}) => {
  const navigate = useNavigate();
  const [isHovered, setIsHovered] = useState(false);

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

          {/* Localisation
          <div className="flex items-center mb-3 text-sm text-gray-600">
            <MapPin size={16} className="mr-1" />
            <span>{car.location}</span>
          </div> */}

          {/* Prix et bouton */}
          <div className="flex items-center justify-between">
            <div>
              <span className="text-2xl font-bold text-gray-800">
                {car.pricePerDay}€
              </span>
              <span className="text-gray-600 text-sm"> / jour</span>
            </div>

            {/* <button
              onClick={openModal}
              disabled={!car.availability}
              className={`px-4 py-2 rounded-lg font-medium transition-colors duration-200 bg-blue-600 hover:bg-blue-700 text-white ${
                car.availability
                  ? "bg-blue-600 hover:bg-blue-700 text-white"
                  : "bg-gray-300 text-gray-500 cursor-not-allowed"
              }`}
            >
              Détails
            </button> */}

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
              }}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
              onClick={() => {
                // we redirect to the payment page
                navigate("/locations/" + car.id);
              }}
            >
              Détails
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

// Exemple d'utilisation avec données typées
export const createExampleCars = (): CarRentalData[] => [
  {
    id: "de7464d5sewr",
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
    id: "f8d7a3b2c1e4",
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
    id: "a1b2c3d4e5f6",
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
    id: "f8d7a3b2c1e4sdesde",
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

  const steps = [
    {
      number: 1,
      title: "Choisissez",
      description: "Votre destination\net votre véhicule",
      icon: MapPin,
      bgColor: "bg-[#FF3100]",
    },
    {
      number: 2,
      title: "Réservez",
      description: "en ligne (paiement CB\nou à bord)",
      icon: Smartphone,
      bgColor: "bg-[#FF3100]",
    },
    {
      number: 3,
      title: "Confirmation",
      description: "Par mail de votre\nréservation",
      icon: Mail,
      bgColor: "bg-[#FF3100]",
    },
    {
      number: 4,
      title: "Profitez",
      description: "de votre trajet",
      icon: Car,
      bgColor: "bg-[#FF3100]",
    },
  ];

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
          backgroundImage: `url(${voiture})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          padding: isMobile ? "4vh 6vw" : "8vh 8vw",
          paddingBottom: isMobile ? "10vw" : "8vw",
        }}
      >
        {/* Gradient overlay - de la couleur beige/crème vers transparent */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.3)", // Ajuste l'opacité ici
            zIndex: 1,
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
          <Flex vertical gap={0} align="center" style={{ width: "100%" }}>
            <Typography.Title
              level={1}
              style={{
                color: "white",
                fontSize: isMobile ? "44px" : "85px",
                fontWeight: "900",
                lineHeight: "1",
                letterSpacing: "0.03em",
                marginTop: "20px",
                marginBottom: "15px",
                fontFamily: "DragonAngled",
                textTransform: "uppercase",
                textAlign: "center",
              }}
            >
              SOYEZ VOTRE CHAUFFEUR PRIVÉ
            </Typography.Title>
            <Button
              type="primary"
              size="large"
              style={{
                backgroundColor: "#ff3100",
                color: "white",
                borderRadius: "7px",
                border: "none",
                fontFamily: "GeneralSans",
                transition: "all 0.3s ease",
                fontSize: "20px",
                height: "40px",
                padding: "10px 25px",
                fontWeight: "bold",
                width: "fit-content",
              }}
            >
              Réserver
            </Button>
          </Flex>
        </Flex>
      </Flex>

      {/* Section Step */}
      <Flex
        style={{
          width: "100%",
          position: "relative",
          bottom: "35px",
          zIndex: 1,
        }}
        justify="center"
        gap={"10vw"}
      >
        {steps.map((step, _) => {
          const IconComponent = step.icon;

          return (
            <div key={step.number} className="text-center">
              {/* Icon Circle */}
              <div
                className={`${step.bgColor} rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4`}
              >
                <IconComponent className="w-8 h-8 text-white" />
              </div>

              {/* Step Content */}
              <div className="space-y-2">
                <h3 className="text-lg font-bold text-gray-800">
                  {step.number}. {step.title}
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed whitespace-pre-line">
                  {step.description}
                </p>
              </div>
            </div>
          );
        })}
      </Flex>

      {/* Section Presentation - Responsive */}
      <Flex vertical>
        <Flex
          style={{ width: "100%", height: "70px", backgroundColor: "#FF3100" }}
        >
          <div></div>
        </Flex>
        <Flex justify="flex-end">
          <div
            style={{
              width: "20vw",
              height: "20vw",
              minWidth: "265px",
              minHeight: "265px",
              backgroundColor: "#FF3100",
              borderBottomLeftRadius: "300px",
              position: "relative",
              top: "180px",
              left: "100px",
            }}
          ></div>
          <div
            style={{
              width: "23vw",
              height: "21vw",
              minWidth: "305px",
              minHeight: "278px",
              backgroundColor: "#FF3100",
            }}
          >
            <img
              src={voitureFront}
              alt="Location de véhicules"
              style={{
                minWidth: "281px",
                minHeight: "281px",
                width: "22vw",
                height: "22vw",
                borderRadius: "50px",
                zIndex: 1,
                position: "relative",
                top: "60px",
                right: "100px",
              }}
            />
          </div>
        </Flex>
        <Flex
          style={{
            maxWidth: "1050px",
            width: "100%",
            margin: "0 auto",
            zIndex: 1,
          }}
        >
          <Flex
            vertical
            style={{ width: "50%", position: "relative", bottom: "200px" }}
          >
            <Typography.Title
              level={1}
              style={{
                color: "#FF3100",
                fontSize: isMobile ? "44px" : "85px",
                fontWeight: "bold",
                lineHeight: "1",
                letterSpacing: "0.03em",
                marginTop: "20px",
                marginBottom: "15px",
                fontFamily: "DragonAngled",
                textTransform: "uppercase",
              }}
            >
              SOYEZ VOTRE <br />
              <span style={{ color: "#3b1b19" }}>CHAUFFEUR PRIVÉ</span>
            </Typography.Title>
            <Typography.Text
              style={{
                color: "#563800",
                fontSize: isMobile ? "24px" : "22px",
                lineHeight: "1",
                marginTop: "0",
                fontFamily: "GeneralSans",
              }}
            >
              text à revoir "Acteur essentielle dans la mobilité et le transport
              de personnes en région parisienne. Spécialisé dans les transferts
              aéroports, gares, courses courtes ou longues distances, nationales
              ou internationales."
            </Typography.Text>
          </Flex>
        </Flex>
      </Flex>

      {/* Section Separator */}
      <div
        style={{
          height: "80px",
          backgroundColor: "#D9D9D938",
          margin: "40px 0",
        }}
      ></div>

      {/* Section Titre */}
      <Flex
        style={{
          maxWidth: "1050px",
          width: "100%",
          margin: "0 auto",
          zIndex: 1,
        }}
      >
        <Typography.Title
          level={1}
          style={{
            color: "#FF3100",
            fontSize: isMobile ? "44px" : "85px",
            fontWeight: "bold",
            lineHeight: "1",
            letterSpacing: "0.03em",
            marginTop: "20px",
            marginBottom: "15px",
            fontFamily: "DragonAngled",
            textTransform: "uppercase",
          }}
        >
          NOS VÉHICULES
        </Typography.Title>
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
            <CarRentalCard
              key={index}
              car={car}
              onRent={() => {
                setTransaction({
                  id: car.id,
                  title: car.name,
                  amount: car.pricePerDay,
                });
                // we redirect to the payment page
                navigate("/reservations-locations");
              }}
            />
          ))}
        </Flex>
      </Flex>

      {/* Section Devis sur mesure */}
      <Flex
        style={{
          backgroundColor: "#FF3100",
          width: "100%",
          padding: "30px 0",
        }}
      >
        <Flex
          style={{
            maxWidth: "1050px",
            width: "100%",
            margin: "0 auto",
          }}
          justify="space-between"
          align="center"
        >
          <Typography.Title
            level={1}
            style={{
              color: "white",
              fontSize: isMobile ? "44px" : "65px",
              fontWeight: "bold",
              lineHeight: "1",
              letterSpacing: "0.03em",
              marginTop: "20px",
              marginBottom: "15px",
              fontFamily: "DragonAngled",
              textTransform: "uppercase",
            }}
          >
            Besoin d'un devis sur mesure ?
          </Typography.Title>
          <Button
            type="primary"
            size="large"
            style={{
              backgroundColor: "#F59F00",
              color: "black",
              borderRadius: "7px",
              border: "none",
              fontFamily: "GeneralSans",
              transition: "all 0.3s ease",
              fontSize: "26px",
              height: "40px",
              padding: "35px 20px",
              fontWeight: "bold",
              width: "fit-content",
            }}
          >
            Contactez-nous
          </Button>
        </Flex>
      </Flex>

      {/* Section Nos services */}
      <ServicesSection />

      {/* Section Devis sur mesure */}
      <Flex
        style={{
          backgroundColor: "#FF3100",
          width: "100%",
          padding: "30px 0",
        }}
      >
        <Flex
          style={{
            maxWidth: "1050px",
            width: "100%",
            margin: "0 auto",
          }}
          justify="center"
          align="center"
        >
          <Button
            type="primary"
            size="large"
            style={{
              backgroundColor: "#F59F00",
              color: "black",
              borderRadius: "7px",
              border: "none",
              fontFamily: "GeneralSans",
              transition: "all 0.3s ease",
              fontSize: "26px",
              height: "40px",
              padding: "35px 20px",
              fontWeight: "bold",
              width: "fit-content",
            }}
          >
            Reservation
          </Button>
        </Flex>
      </Flex>

      <section style={{ height: "25vw", padding: "5px 0" }}>
        <ImageCarousel images={images} />
      </section>

      {/* Footer */}
      <Footer />
    </Flex>
  );
};

export default Locations;
