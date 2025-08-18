import React, { useEffect, useMemo, useState } from "react";
import {
  Star,
  Wifi,
  Car,
  Tv,
  Snowflake,
  UtensilsCrossed,
  MapPin,
  Camera,
  Shirt,
  User,
  Shield,
  Flame,
  Wind,
  Thermometer,
  Droplets,
  LucideIcon,
  ChevronUp,
  ChevronDown,
  Filter,
  X,
} from "lucide-react";
import { Button, Flex, Typography, Drawer } from "antd";
import NavBar from "../../components/navBar/navBar";
import { useLocation, useNavigate } from "react-router-dom";
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
import { useTransaction } from "../../context/transactionContext";
import bonneAdressImg from "../../assets/images/bonnesAddresse.webp";

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

const BonneAdresse = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  return (
    <div
      className={`relative w-full max-w-4xl mx-auto rounded-2xl overflow-hidden shadow-2xl ${
        isMobile ? "px-4" : ""
      }`}
      style={{
        backgroundImage: `url(${bonneAdressImg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Overlay dégradé pour lisibilité */}
      <div className="absolute inset-0">
        <div className="w-full h-full bg-gradient-to-r from-slate-800 via-slate-600 to-slate-500 opacity-60"></div>
      </div>

      {/* Contenu principal */}
      <div className="relative z-10 flex items-center min-h-[400px] p-4 sm:p-6 lg:p-8">
        <div className="flex-1 max-w-md">
          {/* Carte blanche avec le contenu */}
          <div className="bg-white rounded-2xl p-4 sm:p-6 lg:p-8 shadow-xl">
            <h1
              className={`font-bold text-gray-900 mb-4 sm:mb-6 leading-tight ${
                isMobile ? "text-xl" : "text-2xl"
              }`}
            >
              Decouvrez toutes les bonnes adresses du Bénin
            </h1>

            <p className="text-gray-600 mb-6 sm:mb-8 text-sm leading-relaxed">
              Nous vous proposons un guide pdf pour bien choisir vos
              destinations.
            </p>

            <button
              className={`w-full bg-orange-400 hover:bg-orange-500 text-white font-semibold rounded-xl transition-colors duration-200 shadow-lg hover:shadow-xl transform hover:scale-105 transition-transform ${
                isMobile ? "py-3 px-4 text-sm" : "py-4 px-6"
              }`}
            >
              Achetez
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Interface pour définir une commodité
export interface Amenity {
  name: string;
  icon: LucideIcon;
  available: boolean;
  description?: string;
}

// Interface pour les équipements groupés
interface AmenitiesGroup {
  [key: string]: Amenity[];
}

// Interface pour les données d'hébergement
export interface AccommodationData {
  id: string;
  name: string;
  price: number;
  rating: number;
  reviewCount: number;
  mainImage: string;
  images: string[];
  description: string;
  amenities: AmenitiesGroup;
  owner: boolean; // Indique si l'hébergement est géré par l'utilisateur
}

// Interface pour les props du composant
interface AccommodationCardProps {
  accommodation: AccommodationData;
  onBook?: () => void;
  className?: string;
}

// Interface pour les colonnes équilibrées
export interface BalancedAmenities {
  leftColumn: [string, Amenity[]][];
  rightColumn: [string, Amenity[]][];
}

const AccommodationCard: React.FC<AccommodationCardProps> = ({
  accommodation,
  className = "",
}) => {
  const navigate = useNavigate();
  const [isHovered, setIsHovered] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const renderStars = (rating: number): React.ReactNode[] => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        size={isMobile ? 14 : 16}
        className={
          i < Math.floor(rating)
            ? "fill-yellow-400 text-yellow-400"
            : "text-gray-300"
        }
      />
    ));
  };

  return (
    <>
      {/* Carte principale */}
      <div
        className={`bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 ${
          isMobile ? "w-full max-w-sm mx-auto" : "max-w-sm"
        } ${className}`}
      >
        <div className="relative">
          <img
            src={accommodation.mainImage}
            alt={accommodation.name}
            className={`w-full object-cover ${isMobile ? "h-40" : "h-48"}`}
          />
        </div>

        <div className={`${isMobile ? "p-3" : "p-4"}`}>
          <Flex vertical justify="space-between">
            <Flex vertical>
              <h3
                className={`font-bold text-gray-800 mb-2 line-clamp-2 ${
                  isMobile ? "text-base" : "text-lg"
                }`}
              >
                {accommodation.name}
              </h3>

              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-1">
                  {renderStars(accommodation.rating)}
                  <span
                    className={`text-gray-600 ml-2 ${
                      isMobile ? "text-xs" : "text-sm"
                    }`}
                  >
                    ({accommodation.reviewCount} avis)
                  </span>
                </div>
              </div>
            </Flex>
            <Flex
              justify="space-between"
              align="center"
              style={{ width: "100%" }}
              className="mt-4"
            >
              <div>
                <span
                  className={`font-bold text-gray-800 ${
                    isMobile ? "text-xl" : "text-2xl"
                  }`}
                >
                  {accommodation.price}€
                </span>
                <span
                  className={`text-gray-600 ${
                    isMobile ? "text-xs" : "text-sm"
                  }`}
                >
                  {" "}
                  / nuit
                </span>
              </div>

              <Button
                type="primary"
                size={isMobile ? "middle" : "large"}
                style={{
                  backgroundColor: isHovered ? "#ff3100" : "#F59F00",
                  color: isHovered ? "white" : "black",
                  borderRadius: "7px",
                  border: "none",
                  fontFamily: "GeneralSans",
                  transition: "all 0.3s ease",
                  fontSize: isMobile ? "14px" : "16px",
                  height: isMobile ? "35px" : "40px",
                  padding: isMobile ? "0 16px" : "0 20px",
                  fontWeight: "bold",
                }}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                onClick={() => {
                  // we redirect to the payment page
                  navigate("/hebergements/" + accommodation.id);
                }}
              >
                Détails
              </Button>
            </Flex>
          </Flex>
        </div>
      </div>
    </>
  );
};

// Exemple d'utilisation avec données typées
export const createExampleAccommodation = (): AccommodationData[] => [
  {
    id: "846567erfsrfdrf",
    name: "Villa Océane - Vue mer exceptionnelle",
    price: 150,
    rating: 4.8,
    reviewCount: 124,
    mainImage:
      "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=400&h=250&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=600&h=400&fit=crop",
      "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=600&h=400&fit=crop",
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=600&h=400&fit=crop",
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=600&h=400&fit=crop",
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=600&h=400&fit=crop",
    ],
    description:
      "Magnifique villa en bord de mer avec une vue panoramique sur l'océan. Parfaite pour des vacances en famille ou entre amis. Située à proximité de la plage, cette propriété offre tout le confort moderne dans un cadre idyllique.",
    amenities: {
      entertainment: [{ name: "Télévision", icon: Tv, available: true }],
      heating: [{ name: "Climatisation", icon: Snowflake, available: true }],
      internet: [
        { name: "Wifi", icon: Wifi, available: true },
        { name: "Espace de travail dédié", icon: User, available: true },
      ],
      kitchen: [
        {
          name: "Cuisine",
          icon: UtensilsCrossed,
          available: true,
          description: "Espace où les voyageurs peuvent cuisiner",
        },
      ],
      location: [
        {
          name: "Accès plage ou bord de mer",
          icon: MapPin,
          available: true,
          description: "Les voyageurs peuvent profiter d'une plage à proximité",
        },
      ],
      parking: [
        { name: "Parking gratuit sur place", icon: Car, available: true },
      ],
      safety: [
        {
          name: "Caméras de surveillance extérieures",
          icon: Camera,
          available: true,
        },
        {
          name: "Détecteur de fumée",
          icon: Flame,
          available: false,
          description:
            "Ce logement n'est peut-être pas équipé d'un détecteur de fumée",
        },
        {
          name: "Détecteur de monoxyde de carbone",
          icon: Shield,
          available: false,
          description:
            "Ce logement n'est peut-être pas équipé d'un détecteur de monoxyde de carbone",
        },
      ],
      laundry: [
        { name: "Lave-linge", icon: Shirt, available: true },
        { name: "Sèche-linge", icon: Wind, available: true },
      ],
      comfort: [
        { name: "Équipements de base", icon: User, available: true },
        { name: "Chauffage", icon: Thermometer, available: true },
        { name: "Eau chaude", icon: Droplets, available: true },
      ],
    },
    owner: true,
  },
  {
    id: "es7f8s7f8s7f8s7f8s7f8s7f8s7f8s7f8",
    name: "Appartement Centre-ville - Moderne & lumineux",
    price: 95,
    rating: 4.5,
    reviewCount: 87,
    mainImage:
      "https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?w=400&h=250&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?w=600&h=400&fit=crop",
      "https://images.unsplash.com/photo-1464983953574-0892a716854b?w=600&h=400&fit=crop",
      "https://images.unsplash.com/photo-1507089947368-19c1da9775ae?w=600&h=400&fit=crop",
    ],
    description:
      "Appartement moderne situé au cœur du centre-ville, proche de toutes commodités. Idéal pour les voyageurs d'affaires ou les couples souhaitant découvrir la ville.",
    amenities: {
      entertainment: [{ name: "Télévision", icon: Tv, available: true }],
      heating: [{ name: "Chauffage", icon: Thermometer, available: true }],
      internet: [
        { name: "Wifi", icon: Wifi, available: true },
        { name: "Espace de travail dédié", icon: User, available: true },
      ],
      kitchen: [
        {
          name: "Cuisine équipée",
          icon: UtensilsCrossed,
          available: true,
        },
      ],
      location: [
        {
          name: "Centre-ville",
          icon: MapPin,
          available: true,
        },
      ],
      parking: [
        { name: "Parking public à proximité", icon: Car, available: false },
      ],
      safety: [
        {
          name: "Détecteur de fumée",
          icon: Flame,
          available: true,
        },
      ],
      laundry: [{ name: "Lave-linge", icon: Shirt, available: true }],
      comfort: [
        { name: "Équipements de base", icon: User, available: true },
        { name: "Eau chaude", icon: Droplets, available: true },
      ],
    },
    owner: false,
  },
  {
    id: "deef8s7f8s7f8s7f8s7f8s7f8s7f8s7f8",
    name: "Villa Océane - Vue mer exceptionnelle",
    price: 150,
    rating: 4.8,
    reviewCount: 124,
    mainImage:
      "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=400&h=250&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=600&h=400&fit=crop",
      "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=600&h=400&fit=crop",
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=600&h=400&fit=crop",
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=600&h=400&fit=crop",
      "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=600&h=400&fit=crop",
    ],
    description:
      "Magnifique villa en bord de mer avec une vue panoramique sur l'océan. Parfaite pour des vacances en famille ou entre amis. Située à proximité de la plage, cette propriété offre tout le confort moderne dans un cadre idyllique.",
    amenities: {
      entertainment: [{ name: "Télévision", icon: Tv, available: true }],
      heating: [{ name: "Climatisation", icon: Snowflake, available: true }],
      internet: [
        { name: "Wifi", icon: Wifi, available: true },
        { name: "Espace de travail dédié", icon: User, available: true },
      ],
      kitchen: [
        {
          name: "Cuisine",
          icon: UtensilsCrossed,
          available: true,
          description: "Espace où les voyageurs peuvent cuisiner",
        },
      ],
      location: [
        {
          name: "Accès plage ou bord de mer",
          icon: MapPin,
          available: true,
          description: "Les voyageurs peuvent profiter d'une plage à proximité",
        },
      ],
      parking: [
        { name: "Parking gratuit sur place", icon: Car, available: true },
      ],
      safety: [
        {
          name: "Caméras de surveillance extérieures",
          icon: Camera,
          available: true,
        },
        {
          name: "Détecteur de fumée",
          icon: Flame,
          available: false,
          description:
            "Ce logement n'est peut-être pas équipé d'un détecteur de fumée",
        },
        {
          name: "Détecteur de monoxyde de carbone",
          icon: Shield,
          available: false,
          description:
            "Ce logement n'est peut-être pas équipé d'un détecteur de monoxyde de carbone",
        },
      ],
      laundry: [
        { name: "Lave-linge", icon: Shirt, available: true },
        { name: "Sèche-linge", icon: Wind, available: true },
      ],
      comfort: [
        { name: "Équipements de base", icon: User, available: true },
        { name: "Chauffage", icon: Thermometer, available: true },
        { name: "Eau chaude", icon: Droplets, available: true },
      ],
    },
    owner: false,
  },
  {
    id: "deef8s7f8s7f8s7f8s7f8s7f8s7f8s7f9",
    name: "Appartement Centre-ville - Moderne & lumineux",
    price: 95,
    rating: 4.5,
    reviewCount: 87,
    mainImage:
      "https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?w=400&h=250&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?w=600&h=400&fit=crop",
      "https://images.unsplash.com/photo-1464983953574-0892a716854b?w=600&h=400&fit=crop",
      "https://images.unsplash.com/photo-1507089947368-19c1da9775ae?w=600&h=400&fit=crop",
    ],
    description:
      "Appartement moderne situé au cœur du centre-ville, proche de toutes commodités. Idéal pour les voyageurs d'affaires ou les couples souhaitant découvrir la ville.",
    amenities: {
      entertainment: [{ name: "Télévision", icon: Tv, available: true }],
      heating: [{ name: "Chauffage", icon: Thermometer, available: true }],
      internet: [
        { name: "Wifi", icon: Wifi, available: true },
        { name: "Espace de travail dédié", icon: User, available: true },
      ],
      kitchen: [
        {
          name: "Cuisine équipée",
          icon: UtensilsCrossed,
          available: true,
        },
      ],
      location: [
        {
          name: "Centre-ville",
          icon: MapPin,
          available: true,
        },
      ],
      parking: [
        { name: "Parking public à proximité", icon: Car, available: false },
      ],
      safety: [
        {
          name: "Détecteur de fumée",
          icon: Flame,
          available: true,
        },
      ],
      laundry: [{ name: "Lave-linge", icon: Shirt, available: true }],
      comfort: [
        { name: "Équipements de base", icon: User, available: true },
        { name: "Eau chaude", icon: Droplets, available: true },
      ],
    },
    owner: true,
  },
];

// Interface pour les filtres
interface FilterOptions {
  priceRange: [number, number];
  minRating: number;
  selectedAmenities: string[];
  accommodationType: "all" | "owner" | "partner";
  searchTerm: string;
}

const FilterSection = ({
  filters,
  setFilters,
  accommodations,
  isMobile,
}: {
  filters: FilterOptions;
  setFilters: (filters: FilterOptions) => void;
  accommodations: AccommodationData[];
  isMobile: boolean;
}) => {
  const [openSections, setOpenSections] = useState({
    type: true,
    price: true,
    rating: true,
    amenities: false,
    search: true,
  });

  const toggleSection = (section: string) => {
    setOpenSections((prev) => ({
      ...prev,
      [section]: !prev[section as keyof typeof prev],
    }));
  };

  // Extraire toutes les commodités disponibles
  const allAmenities = useMemo(() => {
    const amenitiesSet = new Set<string>();
    accommodations.forEach((acc) => {
      Object.values(acc.amenities).forEach((categoryAmenities) => {
        categoryAmenities.forEach((amenity) => {
          if (amenity.available) {
            amenitiesSet.add(amenity.name);
          }
        });
      });
    });
    return Array.from(amenitiesSet).sort();
  }, [accommodations]);

  // Obtenir les prix min et max
  const priceRange = useMemo(() => {
    const prices = accommodations.map((acc) => acc.price);
    return [Math.min(...prices), Math.max(...prices)];
  }, [accommodations]);

  const handlePriceChange = (index: number, value: number) => {
    const newPriceRange: [number, number] = [...filters.priceRange];
    newPriceRange[index] = value;
    setFilters({ ...filters, priceRange: newPriceRange });
  };

  const handleAmenityToggle = (amenity: string) => {
    const newAmenities = filters.selectedAmenities.includes(amenity)
      ? filters.selectedAmenities.filter((a) => a !== amenity)
      : [...filters.selectedAmenities, amenity];
    setFilters({ ...filters, selectedAmenities: newAmenities });
  };

  const clearFilters = () => {
    setFilters({
      priceRange: [priceRange[0], priceRange[1]],
      minRating: 0,
      selectedAmenities: [],
      accommodationType: "all",
      searchTerm: "",
    });
  };

  return (
    <div className={`bg-white h-fit ${isMobile ? "w-full p-4" : "w-80 p-6"}`}>
      <div className="flex items-center justify-between mb-6">
        <h2
          className={`font-bold text-gray-800 flex items-center gap-2 ${
            isMobile ? "text-lg" : "text-xl"
          }`}
        >
          <Filter size={isMobile ? 18 : 20} />
          Filtres
        </h2>
        <button
          onClick={clearFilters}
          className="text-sm text-blue-600 hover:text-blue-800 flex items-center gap-1"
        >
          <X size={16} />
          Effacer
        </button>
      </div>

      {/* Recherche */}
      <div className="mb-6">
        <button
          onClick={() => toggleSection("search")}
          className="flex items-center justify-between w-full text-left font-semibold text-gray-700 mb-3"
        >
          Recherche
          {openSections.search ? (
            <ChevronUp size={16} />
          ) : (
            <ChevronDown size={16} />
          )}
        </button>
        {openSections.search && (
          <input
            type="text"
            placeholder="Rechercher un hébergement..."
            value={filters.searchTerm}
            onChange={(e) =>
              setFilters({ ...filters, searchTerm: e.target.value })
            }
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
        )}
      </div>

      {/* Type d'hébergement */}
      <div className="mb-6">
        <button
          onClick={() => toggleSection("type")}
          className="flex items-center justify-between w-full text-left font-semibold text-gray-700 mb-3"
        >
          Type d'hébergement
          {openSections.type ? (
            <ChevronUp size={16} />
          ) : (
            <ChevronDown size={16} />
          )}
        </button>
        {openSections.type && (
          <div className="space-y-2">
            {[
              { value: "all", label: "Tous" },
              { value: "owner", label: "Nos hébergements" },
              { value: "partner", label: "Partenaires" },
            ].map((option) => (
              <label key={option.value} className="flex items-center">
                <input
                  type="radio"
                  name="accommodationType"
                  value={option.value}
                  checked={filters.accommodationType === option.value}
                  onChange={(e) =>
                    setFilters({
                      ...filters,
                      accommodationType: e.target.value as any,
                    })
                  }
                  className="mr-2 text-orange-500"
                />
                <span className="text-sm text-gray-700">{option.label}</span>
              </label>
            ))}
          </div>
        )}
      </div>

      {/* Prix */}
      <div className="mb-6">
        <button
          onClick={() => toggleSection("price")}
          className="flex items-center justify-between w-full text-left font-semibold text-gray-700 mb-3"
        >
          Prix par nuit
          {openSections.price ? (
            <ChevronUp size={16} />
          ) : (
            <ChevronDown size={16} />
          )}
        </button>
        {openSections.price && (
          <div className="space-y-4">
            <div className="flex gap-2">
              <div>
                <label className="block text-xs text-gray-600 mb-1">Min</label>
                <input
                  type="number"
                  value={filters.priceRange[0]}
                  onChange={(e) =>
                    handlePriceChange(0, parseInt(e.target.value) || 0)
                  }
                  className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
                />
              </div>
              <div>
                <label className="block text-xs text-gray-600 mb-1">Max</label>
                <input
                  type="number"
                  value={filters.priceRange[1]}
                  onChange={(e) =>
                    handlePriceChange(1, parseInt(e.target.value) || 0)
                  }
                  className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
                />
              </div>
            </div>
            <div className="text-xs text-gray-600">
              {filters.priceRange[0]}€ - {filters.priceRange[1]}€
            </div>
          </div>
        )}
      </div>

      {/* Note minimum */}
      <div className="mb-6">
        <button
          onClick={() => toggleSection("rating")}
          className="flex items-center justify-between w-full text-left font-semibold text-gray-700 mb-3"
        >
          Note minimum
          {openSections.rating ? (
            <ChevronUp size={16} />
          ) : (
            <ChevronDown size={16} />
          )}
        </button>
        {openSections.rating && (
          <div className="space-y-2">
            {[0, 3, 4, 4.5].map((rating) => (
              <label key={rating} className="flex items-center">
                <input
                  type="radio"
                  name="minRating"
                  value={rating}
                  checked={filters.minRating === rating}
                  onChange={(e) =>
                    setFilters({
                      ...filters,
                      minRating: parseFloat(e.target.value),
                    })
                  }
                  className="mr-2 text-orange-500"
                />
                <div className="flex items-center gap-1">
                  <span className="text-sm text-gray-700">
                    {rating === 0 ? "Toutes" : `${rating}+`}
                  </span>
                  {rating > 0 && (
                    <div className="flex">
                      {Array.from({ length: Math.floor(rating) }, (_, i) => (
                        <Star
                          key={i}
                          size={12}
                          className="fill-yellow-400 text-yellow-400"
                        />
                      ))}
                    </div>
                  )}
                </div>
              </label>
            ))}
          </div>
        )}
      </div>

      {/* Équipements */}
      <div className="mb-6">
        <button
          onClick={() => toggleSection("amenities")}
          className="flex items-center justify-between w-full text-left font-semibold text-gray-700 mb-3"
        >
          Équipements
          {openSections.amenities ? (
            <ChevronUp size={16} />
          ) : (
            <ChevronDown size={16} />
          )}
        </button>
        {openSections.amenities && (
          <div className="space-y-2 max-h-60 overflow-y-auto">
            {allAmenities.map((amenity) => (
              <label key={amenity} className="flex items-center">
                <input
                  type="checkbox"
                  checked={filters.selectedAmenities.includes(amenity)}
                  onChange={() => handleAmenityToggle(amenity)}
                  className="mr-2 text-orange-500"
                />
                <span className="text-sm text-gray-700">{amenity}</span>
              </label>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

const Hebergements = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [filters, setFilters] = useState<FilterOptions>({
    priceRange: [0, 200],
    minRating: 0,
    selectedAmenities: [],
    accommodationType: "all",
    searchTerm: "",
  });
  const { pathname } = useLocation();
  const { setTransaction } = useTransaction();
  const navigate = useNavigate();

  const accommodation = createExampleAccommodation();

  // Filtrer les hébergements
  const filteredAccommodations = useMemo(() => {
    return accommodation.filter((accommodation) => {
      // Filtre par recherche textuelle
      if (
        filters.searchTerm &&
        !accommodation.name
          .toLowerCase()
          .includes(filters.searchTerm.toLowerCase())
      ) {
        return false;
      }

      // Filtre par type
      if (filters.accommodationType !== "all") {
        const isOwner = filters.accommodationType === "owner";
        if (accommodation.owner !== isOwner) return false;
      }

      // Filtre par prix
      if (
        accommodation.price < filters.priceRange[0] ||
        accommodation.price > filters.priceRange[1]
      ) {
        return false;
      }

      // Filtre par note
      if (accommodation.rating < filters.minRating) {
        return false;
      }

      // Filtre par équipements
      if (filters.selectedAmenities.length > 0) {
        const accommodationAmenities = Object.values(accommodation.amenities)
          .flat()
          .filter((amenity) => amenity.available)
          .map((amenity) => amenity.name);

        const hasAllSelectedAmenities = filters.selectedAmenities.every(
          (selectedAmenity) => accommodationAmenities.includes(selectedAmenity)
        );

        if (!hasAllSelectedAmenities) return false;
      }

      return true;
    });
  }, [accommodation, filters]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  useEffect(() => {
    const checkScreenSize = () => {
      const width = window.innerWidth;
      setIsMobile(width < 768);
      setIsTablet(width >= 768 && width < 1024);
    };
    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  // Effet pour définir le titre de la page
  useEffect(() => {
    document.title = "Nos Offres - Hébergements";
  }, []);

  const getGridColumns = () => {
    if (isMobile) return 1;
    if (isTablet) return 2;
    return 3;
  };

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
          padding: isMobile ? "4vh 4vw" : isTablet ? "6vh 6vw" : "8vh 8vw",
          paddingBottom: isMobile ? "12vw" : isTablet ? "10vw" : "8vw",
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
                fontSize: isMobile ? "10px" : isTablet ? "14px" : "16px",
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
                fontSize: isMobile ? "32px" : isTablet ? "60px" : "85px",
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
                fontSize: isMobile ? "18px" : isTablet ? "32px" : "45px",
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

      {/* Bouton filtres mobile */}
      {isMobile && (
        <div className="sticky top-0 z-30 bg-white border-b border-gray-200 p-4">
          <Button
            onClick={() => setFiltersOpen(true)}
            icon={<Filter size={16} />}
            className="w-full flex items-center justify-center gap-2"
            style={{
              height: "44px",
              borderRadius: "8px",
              border: "1px solid #d1d5db",
            }}
          >
            Filtres
          </Button>
        </div>
      )}

      {/* Layout principal avec sidebar et contenu */}
      <div
        className={`flex ${isMobile ? "flex-col" : "flex-row"} ${
          isMobile ? "gap-0" : "gap-6"
        } w-full max-w-7xl mx-auto ${isMobile ? "p-0" : "p-6"}`}
      >
        {/* Sidebar filtres - Desktop et Tablet */}
        {!isMobile && (
          <div className="flex-shrink-0">
            <div className="sticky top-6">
              <FilterSection
                filters={filters}
                setFilters={setFilters}
                accommodations={accommodation}
                isMobile={false}
              />
            </div>
          </div>
        )}

        {/* Drawer filtres - Mobile */}
        <Drawer
          title="Filtres"
          placement="left"
          width="90%"
          onClose={() => setFiltersOpen(false)}
          open={filtersOpen}
          className="lg:hidden"
        >
          <FilterSection
            filters={filters}
            setFilters={setFilters}
            accommodations={accommodation}
            isMobile={true}
          />
        </Drawer>

        {/* Contenu principal */}
        <div className="flex-1 min-w-0">
          <Flex vertical gap={isMobile ? 30 : 50}>
            {/* Nos hébergements */}
            <div className={`${isMobile ? "px-4" : "px-0"} pt-6`}>
              <Typography.Title
                level={2}
                style={{
                  color: "#3B1B19",
                  fontSize: isMobile
                    ? "1.25rem"
                    : isTablet
                    ? "1.75rem"
                    : "2.5rem",
                  fontWeight: "200",
                  margin: "0 0 24px 0",
                  fontFamily: "DragonAngled",
                  lineHeight: "1.2",
                }}
              >
                Nos meilleures offres d'hébergements sélectionnées pour vous
              </Typography.Title>

              {/* Grille d'hébergements propriétaire */}
              <div
                className="grid gap-6"
                style={{
                  gridTemplateColumns: `repeat(${getGridColumns()}, 1fr)`,
                }}
              >
                {filteredAccommodations
                  .filter((acc: AccommodationData) => acc.owner === true)
                  .map((acc: any, index: any) => (
                    <AccommodationCard
                      key={index}
                      accommodation={acc}
                      onBook={() => {
                        setTransaction({
                          id: acc.id,
                          title: acc.name,
                          amount: acc.price,
                        });
                        navigate("/reservations-locations");
                      }}
                    />
                  ))}
              </div>
            </div>

            {/* Nos partenaires */}
            <div className={`${isMobile ? "px-4" : "px-0"}`}>
              <Typography.Title
                level={2}
                style={{
                  color: "#3B1B19",
                  fontSize: isMobile
                    ? "1.25rem"
                    : isTablet
                    ? "1.75rem"
                    : "2.5rem",
                  fontWeight: "200",
                  margin: "0 0 24px 0",
                  fontFamily: "DragonAngled",
                  lineHeight: "1.2",
                }}
              >
                Nos partenaires
              </Typography.Title>

              {/* Grille d'hébergements partenaires */}
              <div
                className="grid gap-6"
                style={{
                  gridTemplateColumns: `repeat(${getGridColumns()}, 1fr)`,
                }}
              >
                {filteredAccommodations
                  .filter((acc: AccommodationData) => acc.owner === false)
                  .map((acc: any, index: any) => (
                    <AccommodationCard
                      key={index}
                      accommodation={acc}
                      onBook={() => {
                        setTransaction({
                          id: acc.id,
                          title: acc.name,
                          amount: acc.price,
                        });
                        navigate("/reservations-locations");
                      }}
                    />
                  ))}
              </div>
            </div>
          </Flex>
        </div>
      </div>

      {/* Section Separator */}
      <div
        style={{
          height: isMobile ? "40px" : "80px",
          backgroundColor: "#D9D9D938",
          margin: isMobile ? "20px 0" : "40px 0",
        }}
      ></div>

      {/* Proposition de la fiche des bonnes adresses */}
      <div className={`w-full ${isMobile ? "px-4" : "px-6"} pb-12`}>
        <div className="max-w-6xl mx-auto">
          <Typography.Title
            level={2}
            style={{
              color: "#3B1B19",
              fontSize: isMobile ? "1.25rem" : isTablet ? "1.75rem" : "2.5rem",
              fontWeight: "200",
              margin: `0 0 ${isMobile ? "24px" : "48px"} 0`,
              fontFamily: "DragonAngled",
              textAlign: isMobile ? "center" : "left",
            }}
          >
            Découvrez toutes les bonnes adresses du Bénin
          </Typography.Title>
          <BonneAdresse />
        </div>
      </div>

      {/* Section carousel */}
      <section
        style={{ height: isMobile ? "25vh" : isTablet ? "35vh" : "45vw" }}
      >
        <ImageCarousel images={images} />
      </section>

      {/* Footer */}
      <Footer />
    </Flex>
  );
};

export default Hebergements;
