import React, { useEffect, useState } from "react";
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
} from "lucide-react";
import { Flex, Modal, Typography } from "antd";
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

// Interface pour définir une commodité
interface Amenity {
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
interface AccommodationData {
  id: number;
  name: string;
  price: number;
  rating: number;
  reviewCount: number;
  mainImage: string;
  images: string[];
  description: string;
  amenities: AmenitiesGroup;
}

// Interface pour les props du composant
interface AccommodationCardProps {
  accommodation: AccommodationData;
  onBook?: () => void;
  className?: string;
}

// Interface pour les colonnes équilibrées
interface BalancedAmenities {
  leftColumn: [string, Amenity[]][];
  rightColumn: [string, Amenity[]][];
}

const AccommodationCard: React.FC<AccommodationCardProps> = ({
  accommodation,
  onBook,
  className = "",
}) => {
  const [showModal, setShowModal] = useState<boolean>(false);
  const [currentImageIndex, setCurrentImageIndex] = useState<number>(0);

  const openModal = (): void => setShowModal(true);
  const closeModal = (): void => setShowModal(false);

  const nextImage = (): void => {
    setCurrentImageIndex((prev) => (prev + 1) % accommodation.images.length);
  };

  const prevImage = (): void => {
    setCurrentImageIndex(
      (prev) =>
        (prev - 1 + accommodation.images.length) % accommodation.images.length
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

  // Fonction pour équilibrer la distribution des équipements
  const getBalancedAmenities = (): BalancedAmenities => {
    const amenityEntries = Object.entries(accommodation.amenities);
    const totalSections = amenityEntries.length;
    const midPoint = Math.ceil(totalSections / 2);

    return {
      leftColumn: amenityEntries.slice(0, midPoint),
      rightColumn: amenityEntries.slice(midPoint),
    };
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

  const handleBooking = (): void => {
    if (onBook) {
      onBook();
    } else {
      console.log(`Réservation pour ${accommodation.name}`);
    }
  };

  const { leftColumn, rightColumn } = getBalancedAmenities();

  return (
    <>
      {/* Carte principale */}
      <div
        className={`bg-white rounded-xl shadow-lg overflow-hidden max-w-sm hover:shadow-xl transition-shadow duration-300 ${className}`}
      >
        <div className="relative">
          <img
            src={accommodation.mainImage}
            alt={accommodation.name}
            className="w-full h-48 object-cover"
          />
          {/* <div className="absolute top-3 right-3 bg-white bg-opacity-90 rounded-full px-2 py-1">
            <div className="flex items-center space-x-1">
              <Star size={14} className="fill-yellow-400 text-yellow-400" />
              <span className="text-sm font-semibold">
                {accommodation.rating}
              </span>
            </div>
          </div> */}
        </div>

        <div className="p-4">
          <Flex vertical justify="space-between">
            <Flex>
              <h3 className="font-bold text-lg text-gray-800 mb-2 line-clamp-2">
                {accommodation.name}
              </h3>

              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-1">
                  {renderStars(accommodation.rating)}
                  <span className="text-sm text-gray-600 ml-2">
                    ({accommodation.reviewCount} avis)
                  </span>
                </div>
              </div>
            </Flex>
            <Flex
              justify="space-between"
              style={{ width: "100%" }}
              className="mt-4"
            >
              <div
                className="flex items-center justify-between"
                style={{ width: "100%" }}
              >
                <div>
                  <span className="text-2xl font-bold text-gray-800">
                    {accommodation.price}€
                  </span>
                  <span className="text-gray-600 text-sm"> / nuit</span>
                </div>

                <button
                  onClick={openModal}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors duration-200"
                >
                  Explorer
                </button>
              </div>
            </Flex>
          </Flex>
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
        <div className="flex-1 overflow-y-auto max-h-[80vh] max-w-4xl">
          {/* Galerie d'images */}
          <div className="relative bg-gray-100">
            <img
              src={accommodation.images[currentImageIndex]}
              alt={`${accommodation.name} - Image ${currentImageIndex + 1}`}
              className="w-full h-80 object-cover"
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
                {renderStars(accommodation.rating)}
                <span className="font-semibold ml-2 text-lg">
                  {accommodation.rating}
                </span>
                <span className="text-gray-600">
                  ({accommodation.reviewCount} avis)
                </span>
              </div>
              <div className="text-left md:text-right">
                <div className="text-3xl font-bold text-blue-600">
                  {accommodation.price}€
                </div>
                <div className="text-gray-600">par nuit</div>
              </div>
            </div>

            {/* Description */}
            <div className="mb-8">
              <h3 className="text-xl font-semibold mb-4 text-gray-800 border-b pb-2">
                À propos de ce logement
              </h3>
              <p className="text-gray-700 leading-relaxed text-base">
                {accommodation.description}
              </p>
            </div>

            {/* Équipements avec distribution équilibrée */}
            <div className="mb-8">
              <h3 className="text-xl font-semibold mb-6 text-gray-800 border-b pb-2">
                Ce que propose ce logement
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

            {/* Bouton de réservation */}
            <div className="mt-8 pt-6 border-t">
              <button
                onClick={handleBooking}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-lg font-semibold text-lg transition-colors duration-200"
              >
                Réserver maintenant
              </button>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
};


// Exemple d'utilisation avec données typées
export const createExampleAccommodation = (): AccommodationData[] => [
  {
    id: 1,
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
  },
  // Example of a second accommodation (add more as needed)
  {
    id: 2,
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
  },
  {
    id: 3,
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
  },
  // Example of a second accommodation (add more as needed)
  {
    id: 4,
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
  },
];

const Hebergements = () => {
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
    document.title = "Nos Offres - Hébergements";
  }, []);
  const accommodation = createExampleAccommodation();

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

      {/* Liste des hébergements */}
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
          {accommodation.map((acc: any, index: any) => (
            <AccommodationCard key={index} accommodation={acc} onBook={() => {
              setTransaction({
              id: acc.id,
              title: acc.name,
              amount: acc.price,
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

export default Hebergements;
