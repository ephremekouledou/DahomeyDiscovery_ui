import React, { useEffect, useMemo, useState } from "react";
import {
  Star,
  Wifi,
  Tv,
  Snowflake,
  UtensilsCrossed,
  MapPin,
  User,
  Thermometer,
  Droplets,
  LucideIcon,
  ChevronUp,
  ChevronDown,
  Filter,
  X,
  Lock,
  Sofa,
  Bubbles,
  ShowerHead,
} from "lucide-react";
import { Button, Flex, Typography, Drawer } from "antd";
import NavBar from "../../components/navBar/navBar";
import { useLocation, useNavigate } from "react-router-dom";
// import img1 from "/images/1.jpg";
import img2 from "/images/2.jpg";
// import img3 from "/images/3.jpg";
import img4 from "/images/4.jpg";
// import img5 from "/images/5.jpg";
import img6 from "/images/6.jpg";
// import img7 from "/images/7.jpg";
import img8 from "/images/8.jpg";
// import img9 from "/images/9.jpg";
import img10 from "/images/10.jpg";
import ImageCarousel from "../../components/ImageGallery/ImageCarousel";
import Footer from "../../components/footer/footer";
import { useTransaction } from "../../context/transactionContext";
import bonneAdressImg from "/images/bonnesAddresse.webp";
import BeginningButton from "../../components/dededed/BeginingButton";
import imgElia1 from "/images/Hebergements/ElaRedidence/1.jpg";
import imgElia2 from "/images/Hebergements/ElaRedidence/2.jpg";
import imgElia3 from "/images/Hebergements/ElaRedidence/3.jpg";
import imgElia4 from "/images/Hebergements/ElaRedidence/4.jpg";
import imgElia5 from "/images/Hebergements/ElaRedidence/5.jpg";
import imgElia6 from "/images/Hebergements/ElaRedidence/6.jpg";
import imgElia7 from "/images/Hebergements/ElaRedidence/7.jpg";
import imgElia8 from "/images/Hebergements/ElaRedidence/8.jpg";
import imgEliagbessi from "/images/Hebergements/ElaRedidence/gbessi.jpg";
import imgEliahoundji from "/images/Hebergements/ElaRedidence/houndji.jpg";
import imgEliaife from "/images/Hebergements/ElaRedidence/ife.jpg";
import imgEliamabou from "/images/Hebergements/ElaRedidence/mabou.jpg";
import imgEliasedo from "/images/Hebergements/ElaRedidence/sedo.jpg";
import imgCasaCelio1 from "/images/Hebergements/CasaCielo/casa de cielo.jpg";
import imgCasaCielo2 from "/images/Hebergements/CasaCielo/chambre prestige (2).jpg";
import imgCasaCielo3 from "/images/Hebergements/CasaCielo/Chambre Prestige.jpg";
import imgCasaCielo4 from "/images/Hebergements/CasaCielo/chambre Standard.jpg";
import imgCasaCielo5 from "/images/Hebergements/CasaCielo/lit deu place vue sur mer.jpg";
import imgCasaCielo6 from "/images/Hebergements/CasaCielo/piscine.jpg";
import imgCasaCielo7 from "/images/Hebergements/CasaCielo/prestige lit 3 place.jpg";
import imgCasaCielo8 from "/images/Hebergements/CasaCielo/prestige lit deux place.jpg";
import imgCasaCielo9 from "/images/Hebergements/CasaCielo/restaurant.jpg";
import imgCasaCielo10 from "/images/Hebergements/CasaCielo/sale de réunion.jpg";
import imgCasaCielo11 from "/images/Hebergements/CasaCielo/Suite Ryal Présidentiel.jpg";

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

// Liste des villes disponibles
export const CITIES = [
  "Ouidah",
  "Possotomè",
  "Abomey",
  "Porto-Novo",
  "Dassa",
  "Ganvie",
  "Gogotinkpon",
  "Grand-Popo",
  "Cotonou",
] as const;

export type City = (typeof CITIES)[number];

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

// Interface pour les options d'hébergement
export interface AccommodationOption {
  name: string;
  description: string;
  photo: string;
  price: number;
  amenities: AmenitiesGroup;
}

// Interface pour les données d'hébergement (modifiée avec ville)
export interface AccommodationData {
  id: string;
  name: string;
  price?: number; // Optionnel maintenant si des options sont disponibles
  rating: number;
  reviewCount: number;
  mainImage: string;
  images: string[];
  description: string;
  ville: City; // Nouvel attribut ville
  amenities?: AmenitiesGroup; // Optionnel si des options sont disponibles
  options?: AccommodationOption[]; // Nouvelles options
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

  // Calculer le prix à afficher
  const getPriceDisplay = () => {
    if (accommodation.options && accommodation.options.length > 0) {
      const prices = accommodation.options.map((option) => option.price);
      const minPrice = Math.min(...prices);
      const maxPrice = Math.max(...prices);

      if (minPrice === maxPrice) {
        return `${minPrice} FCFA`;
      }
      return `${minPrice} FCFA - ${maxPrice} FCFA`;
    }
    return `${accommodation.price} FCFA`;
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
          {/* Badge ville */}
          <div className="absolute top-3 left-3 bg-white bg-opacity-90 rounded-full px-3 py-1">
            <span className="text-xs font-semibold text-gray-700 flex items-center gap-1">
              <MapPin size={12} />
              {accommodation.ville}
            </span>
          </div>
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
                    isMobile ? "text-xl" : "text-lg"
                  }`}
                >
                  {getPriceDisplay()}
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

// Exemple d'utilisation avec données typées (modifié avec villes)
export const createExampleAccommodation = (): AccommodationData[] => [
  {
    id: "846567erfsrfdrfdesew",
    name: "Elia Résidence",
    rating: 4.1,
    reviewCount: 7,
    mainImage: imgElia2,
    ville: "Cotonou",
    images: [
      imgElia1,
      imgElia2,
      imgElia3,
      imgElia4,
      imgElia5,
      imgElia6,
      imgElia7,
      imgElia8,
    ],
    description:
      "Face au murmure des vagues, Cette Résidence vous ouvre ses portes : chambres raffinées, piscine clé en main, jardins apaisants et restauration locale et internationale. À quelques minutes de l’aéroport de Cotonou, cette adresse incarne l’âme de la cote béninoise. Éléments préférés de nos voyageurs ? Le personnel chaleureux, la propreté du lieu, et ce sentiment d’être chez soi… tout en étant ailleurs.",
    options: [
      {
        name: "KOUAKOU Prestige",
        description:
          "Au rez-de-chaussée de la Résidence; découvrez notre belle Chambre Prestige Standard KOUAKOU, avec une vue donnant sur le Jardin intérieur et la Piscine.",
        photo: imgEliamabou,
        price: 65000,
        amenities: {
          entertainment: [
            { name: "Télévision", icon: Tv, available: true },
            { name: "Mini-bar", icon: UtensilsCrossed, available: true },
          ],
          heating: [
            { name: "Climatisation", icon: Snowflake, available: true },
            { name: "Chauffage", icon: Thermometer, available: true },
          ],
          internet: [
            { name: "Wifi", icon: Wifi, available: true },
            { name: "Espace de travail dédié", icon: User, available: true },
          ],
          comfort: [
            { name: "Équipements de base", icon: User, available: true },
            { name: "Eau chaude", icon: Droplets, available: true },
          ],
          safety: [
            {
              name: "Coffre fort",
              icon: Lock,
              available: true,
            },
          ],
          // kitchen: [
          //   {
          //     name: "Cuisine",
          //     icon: UtensilsCrossed,
          //     available: true,
          //     description: "Espace où les voyageurs peuvent cuisiner",
          //   },
          // ],
          // location: [
          //   {
          //     name: "Accès plage ou bord de mer",
          //     icon: MapPin,
          //     available: true,
          //     description:
          //       "Les voyageurs peuvent profiter d'une plage à proximité",
          //   },
          // ],
          // parking: [
          //   { name: "Parking gratuit sur place", icon: Car, available: true },
          // ],
          // laundry: [
          //   { name: "Lave-linge", icon: Shirt, available: true },
          //   { name: "Sèche-linge", icon: Wind, available: true },
          // ],
        },
      },
      {
        name: "MABOU Prestige",
        description:
          "Au rez-de-chaussée de la Résidence; découvrez notre belle Chambre Prestige Standard MABOU, avec une vue donnant sur le Jardin intérieur et la Piscine.",
        photo: imgEliamabou,
        price: 65000,
        amenities: {
          entertainment: [
            { name: "Télévision", icon: Tv, available: true },
            { name: "Mini-bar", icon: UtensilsCrossed, available: true },
          ],
          heating: [
            { name: "Climatisation", icon: Snowflake, available: true },
            { name: "Chauffage", icon: Thermometer, available: true },
          ],
          internet: [
            { name: "Wifi", icon: Wifi, available: true },
            { name: "Espace de travail dédié", icon: User, available: true },
          ],
          comfort: [
            { name: "Équipements de base", icon: User, available: true },
            { name: "Eau chaude", icon: Droplets, available: true },
          ],
          safety: [
            {
              name: "Coffre fort",
              icon: Lock,
              available: true,
            },
          ],
        },
      },
      {
        name: "SEDO Prestige",
        description:
          "Au premier et seul étage de la Résidence; découvrez notre spacieuse chambre salon, avec une vue donnant sur la Piscine et la Plage.",
        photo: imgEliasedo,
        price: 99000,
        amenities: {
          entertainment: [
            { name: "Télévision", icon: Tv, available: true },
            { name: "Mini-bar", icon: UtensilsCrossed, available: true },
          ],
          heating: [
            { name: "Climatisation", icon: Snowflake, available: true },
            { name: "Chauffage", icon: Thermometer, available: true },
          ],
          internet: [
            { name: "Wifi", icon: Wifi, available: true },
            { name: "Espace de travail dédié", icon: User, available: true },
          ],
          comfort: [
            { name: "Équipements de base", icon: User, available: true },
            { name: "Eau chaude", icon: Droplets, available: true },
          ],
          safety: [
            {
              name: "Coffre fort",
              icon: Lock,
              available: true,
            },
          ],
        },
      },
      {
        name: "IFE Prestige",
        description:
          "Au rez-de-chaussée de la Résidence; découvrez notre spacieuse chambre salon, avec une vue donnant sur une cour et l’entrée face à la Plage.",
        photo: imgEliaife,
        price: 109000,
        amenities: {
          entertainment: [
            { name: "Télévision", icon: Tv, available: true },
            { name: "Mini-bar", icon: UtensilsCrossed, available: true },
          ],
          heating: [
            { name: "Climatisation", icon: Snowflake, available: true },
            { name: "Chauffage", icon: Thermometer, available: true },
          ],
          internet: [
            { name: "Wifi", icon: Wifi, available: true },
            { name: "Espace de travail dédié", icon: User, available: true },
          ],
          comfort: [
            { name: "Équipements de base", icon: User, available: true },
            { name: "Eau chaude", icon: Droplets, available: true },
          ],
          safety: [
            {
              name: "Coffre fort",
              icon: Lock,
              available: true,
            },
          ],
        },
      },
      {
        name: "GBESSI Deluxe",
        description:
          "Au premier et seul étage de la Résidence; découvrez notre somptueuse Chambre Deluxe GBESSI, dotée d'une chambre salon spacieuse, d'une terrasse privée donnant sur la Piscine.",
        photo: imgEliagbessi,
        price: 139000,
        amenities: {
          entertainment: [
            { name: "Télévision", icon: Tv, available: true },
            { name: "Mini-bar", icon: UtensilsCrossed, available: true },
          ],
          heating: [
            { name: "Climatisation", icon: Snowflake, available: true },
            { name: "Chauffage", icon: Thermometer, available: true },
          ],
          internet: [
            { name: "Wifi", icon: Wifi, available: true },
            { name: "Espace de travail dédié", icon: User, available: true },
          ],
          comfort: [
            { name: "Équipements de base", icon: User, available: true },
            { name: "Eau chaude", icon: Droplets, available: true },
          ],
          safety: [
            {
              name: "Coffre fort",
              icon: Lock,
              available: true,
            },
          ],
        },
      },
      {
        name: "HOUNDJI Suite",
        description:
          "Au premier et seul étage de la Résidence; découvrez notre somptueuse Suite Deluxe HOUNDJI, dotée d'une chambre spacieuse, d'une terrasse privée et d'un salon télé séparé. Idéale pour se détendre au calme face à la Plage.",
        photo: imgEliahoundji,
        price: 169000,
        amenities: {
          entertainment: [
            { name: "Télévision", icon: Tv, available: true },
            { name: "Mini-bar", icon: UtensilsCrossed, available: true },
          ],
          heating: [
            { name: "Climatisation", icon: Snowflake, available: true },
            { name: "Chauffage", icon: Thermometer, available: true },
          ],
          internet: [
            { name: "Wifi", icon: Wifi, available: true },
            { name: "Espace de travail dédié", icon: User, available: true },
          ],
          comfort: [
            { name: "Équipements de base", icon: User, available: true },
            { name: "Eau chaude", icon: Droplets, available: true },
          ],
          safety: [
            {
              name: "Coffre fort",
              icon: Lock,
              available: true,
            },
          ],
        },
      },
    ],
    owner: false,
  },
  {
    id: "846567e63587745rfsrfdrfdesew",
    name: "CASA CIELO",
    rating: 4.2,
    reviewCount: 489,
    mainImage: imgCasaCielo11,
    ville: "Cotonou",
    images: [
      imgCasaCelio1,
      imgCasaCielo2,
      imgCasaCielo3,
      imgCasaCielo4,
      imgCasaCielo5,
      imgCasaCielo6,
      imgCasaCielo7,
      imgCasaCielo8,
      imgCasaCielo9,
      imgCasaCielo10,
      imgCasaCielo11,
    ],
    description:
      "Un refuge design et raffiné, à deux pas de la plage de Fidjrossé. Inspiré des chalets alpins, l’hôtel combine luxe discret et confort moderne, avec piscine extérieure, salle de sport, parking gratuit, Wi-Fi, salon commun, restaurant aux influences africaines et indiennes, et navette aéroport. Le personnel trilingue (français, anglais, hindi) est réputé pour son hospitalité sans faille et son service attentionné.",
    options: [
      {
        name: "Chambre Standard",
        description:
          "Un espace confortable  pour un séjour reposant au cœur de Cotonou",
        photo: imgCasaCielo4,
        price: 54500,
        amenities: {
          entertainment: [
            { name: "Télévision", icon: Tv, available: true },
            { name: "Mini-bar", icon: UtensilsCrossed, available: true },
          ],
          heating: [
            { name: "Climatisation", icon: Snowflake, available: true },
            { name: "Chauffage", icon: Thermometer, available: true },
          ],
          internet: [
            { name: "Wifi", icon: Wifi, available: true },
            { name: "Espace de travail dédié", icon: User, available: false },
          ],
          comfort: [
            { name: "Équipements de base", icon: User, available: true },
            { name: "Eau chaude", icon: Droplets, available: true },
          ],
          safety: [
            {
              name: "Coffre fort",
              icon: Lock,
              available: false,
            },
          ],
          // kitchen: [
          //   {
          //     name: "Cuisine",
          //     icon: UtensilsCrossed,
          //     available: true,
          //     description: "Espace où les voyageurs peuvent cuisiner",
          //   },
          // ],
          // location: [
          //   {
          //     name: "Accès plage ou bord de mer",
          //     icon: MapPin,
          //     available: true,
          //     description:
          //       "Les voyageurs peuvent profiter d'une plage à proximité",
          //   },
          // ],
          // parking: [
          //   { name: "Parking gratuit sur place", icon: Car, available: true },
          // ],
          // laundry: [
          //   { name: "Lave-linge", icon: Shirt, available: true },
          //   { name: "Sèche-linge", icon: Wind, available: true },
          // ],
        },
      },
      {
        name: "Chambre Prestige avec vue sur Mer",
        description:
          "Spacieuse et lumineuse, elle s’ouvre sur  une vue  sur la mer.",
        photo: imgCasaCielo3,
        price: 59500,
        amenities: {
          entertainment: [
            { name: "Télévision", icon: Tv, available: true },
            { name: "Mini-bar", icon: UtensilsCrossed, available: true },
          ],
          heating: [
            { name: "Climatisation", icon: Snowflake, available: true },
            { name: "Chauffage", icon: Thermometer, available: true },
          ],
          internet: [
            { name: "Wifi", icon: Wifi, available: true },
            { name: "Espace de travail dédié", icon: User, available: false },
          ],
          comfort: [
            { name: "Équipements de base", icon: User, available: true },
            { name: "Eau chaude", icon: Droplets, available: true },
          ],
          safety: [
            {
              name: "Coffre fort",
              icon: Lock,
              available: false,
            },
          ],
        },
      },
      {
        name: "Chambre Prestige avec vue sur Mer avec balcon  lit 2 places",
        description:
          "Spacieuse et lumineuse, elle s’ouvre sur un balcon privé qui dévoile une vue imprenable sur la mer.",
        photo: imgCasaCielo2,
        price: 75500,
        amenities: {
          entertainment: [
            { name: "Télévision", icon: Tv, available: true },
            { name: "Mini-bar", icon: UtensilsCrossed, available: true },
          ],
          heating: [
            { name: "Climatisation", icon: Snowflake, available: true },
            { name: "Chauffage", icon: Thermometer, available: true },
          ],
          internet: [
            { name: "Wifi", icon: Wifi, available: true },
            { name: "Espace de travail dédié", icon: User, available: false },
          ],
          comfort: [
            { name: "Équipements de base", icon: User, available: true },
            { name: "Eau chaude", icon: Droplets, available: true },
          ],
          safety: [
            {
              name: "Coffre fort",
              icon: Lock,
              available: false,
            },
          ],
        },
      },
      {
        name: "Chambre Prestige avec vue sur Mer avec balcon  lit 3 places",
        description:
          "Spacieuse et lumineuse, elle s’ouvre sur un balcon privé qui dévoile une vue imprenable sur la mer.",
        photo: imgCasaCielo5,
        price: 85500,
        amenities: {
          entertainment: [
            { name: "Télévision", icon: Tv, available: true },
            { name: "Mini-bar", icon: UtensilsCrossed, available: true },
          ],
          heating: [
            { name: "Climatisation", icon: Snowflake, available: true },
            { name: "Chauffage", icon: Thermometer, available: true },
          ],
          internet: [
            { name: "Wifi", icon: Wifi, available: true },
            { name: "Espace de travail dédié", icon: User, available: false },
          ],
          comfort: [
            { name: "Équipements de base", icon: User, available: true },
            { name: "Eau chaude", icon: Droplets, available: true },
          ],
          safety: [
            {
              name: "Coffre fort",
              icon: Lock,
              available: false,
            },
          ],
        },
      },
      {
        name: "Chambre Prestige lit 3 places",
        description:
          "Spacieuse et décorée avec goût, elle allie confort moderne et charme.",
        photo: imgCasaCielo7,
        price: 85500,
        amenities: {
          entertainment: [
            { name: "Télévision", icon: Tv, available: true },
            { name: "Mini-bar", icon: UtensilsCrossed, available: true },
          ],
          heating: [
            { name: "Climatisation", icon: Snowflake, available: true },
            { name: "Chauffage", icon: Thermometer, available: true },
          ],
          internet: [
            { name: "Wifi", icon: Wifi, available: true },
            { name: "Espace de travail dédié", icon: User, available: false },
          ],
          comfort: [
            { name: "Équipements de base", icon: User, available: true },
            { name: "Eau chaude", icon: Droplets, available: true },
          ],
          safety: [
            {
              name: "Coffre fort",
              icon: Lock,
              available: false,
            },
          ],
        },
      },
      {
        name: "Suite Royales Présidentiel vue sur la mer avec balcon",
        description:
          "U  n espace d’exception alliant luxe, élégance et confort, offrant une vue splendide sur l’océan.",
        photo: imgCasaCielo11,
        price: 120500,
        amenities: {
          entertainment: [
            { name: "Télévision", icon: Tv, available: true },
            { name: "Mini-bar", icon: UtensilsCrossed, available: true },
          ],
          heating: [
            { name: "Climatisation", icon: Snowflake, available: true },
            { name: "Chauffage", icon: Thermometer, available: true },
          ],
          internet: [
            { name: "Wifi", icon: Wifi, available: true },
            { name: "Espace de travail dédié", icon: User, available: false },
          ],
          comfort: [
            { name: "Équipements de base", icon: User, available: true },
            { name: "Coin salon", icon: Sofa, available: true },
            { name: "Jacuzzi", icon: Bubbles, available: true },
            { name: "Baignoire", icon: ShowerHead, available: true },
            { name: "Eau chaude", icon: Droplets, available: true },
          ],
          safety: [
            {
              name: "Coffre fort",
              icon: Lock,
              available: false,
            },
          ],
        },
      },
    ],
    owner: false,
  },
  // {
  //   id: "846567erfsrfdrf",
  //   name: "Villa Océane - Vue mer exceptionnelle",
  //   price: 150,
  //   rating: 4.8,
  //   reviewCount: 124,
  //   mainImage:
  //     "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=400&h=250&fit=crop",
  //   ville: "Ouidah",
  //   images: [
  //     "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=600&h=400&fit=crop",
  //     "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=600&h=400&fit=crop",
  //     "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=600&h=400&fit=crop",
  //     "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=600&h=400&fit=crop",
  //     "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=600&h=400&fit=crop",
  //   ],
  //   description:
  //     "Magnifique villa en bord de mer avec une vue panoramique sur l'océan. Parfaite pour des vacances en famille ou entre amis. Située à proximité de la plage, cette propriété offre tout le confort moderne dans un cadre idyllique.",
  //   amenities: {
  //     entertainment: [{ name: "Télévision", icon: Tv, available: true }],
  //     heating: [{ name: "Climatisation", icon: Snowflake, available: true }],
  //     internet: [
  //       { name: "Wifi", icon: Wifi, available: true },
  //       { name: "Espace de travail dédié", icon: User, available: true },
  //     ],
  //     kitchen: [
  //       {
  //         name: "Cuisine",
  //         icon: UtensilsCrossed,
  //         available: true,
  //         description: "Espace où les voyageurs peuvent cuisiner",
  //       },
  //     ],
  //     location: [
  //       {
  //         name: "Accès plage ou bord de mer",
  //         icon: MapPin,
  //         available: true,
  //         description: "Les voyageurs peuvent profiter d'une plage à proximité",
  //       },
  //     ],
  //     parking: [
  //       { name: "Parking gratuit sur place", icon: Car, available: true },
  //     ],
  //     safety: [
  //       {
  //         name: "Caméras de surveillance extérieures",
  //         icon: Camera,
  //         available: true,
  //       },
  //       {
  //         name: "Détecteur de fumée",
  //         icon: Flame,
  //         available: false,
  //         description:
  //           "Ce logement n'est peut-être pas équipé d'un détecteur de fumée",
  //       },
  //       {
  //         name: "Détecteur de monoxyde de carbone",
  //         icon: Shield,
  //         available: false,
  //         description:
  //           "Ce logement n'est peut-être pas équipé d'un détecteur de monoxyde de carbone",
  //       },
  //     ],
  //     laundry: [
  //       { name: "Lave-linge", icon: Shirt, available: true },
  //       { name: "Sèche-linge", icon: Wind, available: true },
  //     ],
  //     comfort: [
  //       { name: "Équipements de base", icon: User, available: true },
  //       { name: "Chauffage", icon: Thermometer, available: true },
  //       { name: "Eau chaude", icon: Droplets, available: true },
  //     ],
  //   },
  //   owner: true,
  // },
];

// Interface pour les filtres (modifiée avec ville)
interface FilterOptions {
  priceRange: [number, number];
  minRating: number;
  selectedAmenities: string[];
  accommodationType: "all" | "owner" | "partner";
  searchTerm: string;
  selectedCities: City[]; // Nouveau filtre par ville
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
    cities: true, // Nouvelle section pour les villes
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

  // Extraire toutes les commodités disponibles (modifié pour supporter les options)
  const allAmenities = useMemo(() => {
    const amenitiesSet = new Set<string>();
    accommodations.forEach((acc) => {
      // Commodités de l'hébergement principal
      if (acc.amenities) {
        Object.values(acc.amenities).forEach((categoryAmenities) => {
          categoryAmenities.forEach((amenity) => {
            if (amenity.available) {
              amenitiesSet.add(amenity.name);
            }
          });
        });
      }

      // Commodités des options
      if (acc.options) {
        acc.options.forEach((option) => {
          Object.values(option.amenities).forEach((categoryAmenities) => {
            categoryAmenities.forEach((amenity) => {
              if (amenity.available) {
                amenitiesSet.add(amenity.name);
              }
            });
          });
        });
      }
    });
    return Array.from(amenitiesSet).sort();
  }, [accommodations]);

  // Obtenir les prix min et max (modifié pour supporter les options)
  const priceRange = useMemo(() => {
    const prices: number[] = [];
    accommodations.forEach((acc) => {
      if (acc.options && acc.options.length > 0) {
        // Si l'hébergement a des options, prendre tous les prix des options
        acc.options.forEach((option) => prices.push(option.price));
      } else if (acc.price) {
        // Sinon, prendre le prix principal
        prices.push(acc.price);
      }
    });
    return prices.length > 0
      ? [Math.min(...prices), Math.max(...prices)]
      : [0, 500];
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

  // Nouvelle fonction pour gérer les villes
  const handleCityToggle = (city: City) => {
    const newCities = filters.selectedCities.includes(city)
      ? filters.selectedCities.filter((c) => c !== city)
      : [...filters.selectedCities, city];
    setFilters({ ...filters, selectedCities: newCities });
  };

  const clearFilters = () => {
    setFilters({
      priceRange: [priceRange[0], priceRange[1]],
      minRating: 0,
      selectedAmenities: [],
      accommodationType: "all",
      searchTerm: "",
      selectedCities: [], // Reset des villes
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

      {/* Villes - Nouvelle section */}
      <div className="mb-6">
        <button
          onClick={() => toggleSection("cities")}
          className="flex items-center justify-between w-full text-left font-semibold text-gray-700 mb-3"
        >
          <span className="flex items-center gap-2">
            <MapPin size={16} />
            Villes
          </span>
          {openSections.cities ? (
            <ChevronUp size={16} />
          ) : (
            <ChevronDown size={16} />
          )}
        </button>
        {openSections.cities && (
          <div className="space-y-2 max-h-60 overflow-y-auto">
            {CITIES.map((city) => (
              <label key={city} className="flex items-center">
                <input
                  type="checkbox"
                  checked={filters.selectedCities.includes(city)}
                  onChange={() => handleCityToggle(city)}
                  className="mr-2 text-orange-500"
                />
                <span className="text-sm text-gray-700">{city}</span>
                {/* Afficher le nombre d'hébergements par ville */}
                <span className="text-xs text-gray-500 ml-auto">
                  ({accommodations.filter((acc) => acc.ville === city).length})
                </span>
              </label>
            ))}
          </div>
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
              {filters.priceRange[0]} FCFA - {filters.priceRange[1]} FCFA
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
  const accommodation = createExampleAccommodation();

  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);
  const [filtersOpen, setFiltersOpen] = useState(false);
  // Calculer la plage de prix réelle des hébergements
  const realPriceRange = useMemo(() => {
    const prices: number[] = [];
    accommodation.forEach((acc) => {
      if (acc.options && acc.options.length > 0) {
        acc.options.forEach((option) => prices.push(option.price));
      } else if (acc.price) {
        prices.push(acc.price);
      }
    });
    return prices.length > 0
      ? [0, Math.max(...prices)]
      : [0, 500];
  }, [accommodation]);

  // Initialiser les filtres avec les vraies valeurs
  const [filters, setFilters] = useState<FilterOptions>({
    priceRange: [realPriceRange[0], realPriceRange[1]], // Utiliser la vraie plage de prix
    minRating: 0,
    selectedAmenities: [],
    accommodationType: "all",
    searchTerm: "",
    selectedCities: [],
  });
  const { pathname } = useLocation();
  const { setTransaction } = useTransaction();
  const navigate = useNavigate();

  // Filtrer les hébergements (modifié pour supporter les villes)
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

      // Filtre par ville - nouveau filtre
      if (filters.selectedCities.length > 0) {
        if (!filters.selectedCities.includes(accommodation.ville)) {
          return false;
        }
      }

      // Filtre par type
      if (filters.accommodationType !== "all") {
        const isOwner = filters.accommodationType === "owner";
        if (accommodation.owner !== isOwner) return false;
      }

      // Filtre par prix (modifié pour les options)
      let priceMatches = false;
      if (accommodation.options && accommodation.options.length > 0) {
        // Vérifier si au moins une option est dans la fourchette de prix
        priceMatches = accommodation.options.some(
          (option) =>
            option.price >= filters.priceRange[0] &&
            option.price <= filters.priceRange[1]
        );
      } else if (accommodation.price) {
        // Vérifier le prix principal
        priceMatches =
          accommodation.price >= filters.priceRange[0] &&
          accommodation.price <= filters.priceRange[1];
      }
      if (!priceMatches) return false;

      // Filtre par note
      if (accommodation.rating < filters.minRating) {
        return false;
      }

      // Filtre par équipements (modifié pour supporter les options)
      if (filters.selectedAmenities.length > 0) {
        let accommodationAmenities: string[] = [];

        // Commodités de l'hébergement principal
        if (accommodation.amenities) {
          accommodationAmenities = Object.values(accommodation.amenities)
            .flat()
            .filter((amenity) => amenity.available)
            .map((amenity) => amenity.name);
        }

        // Commodités des options
        if (accommodation.options) {
          accommodation.options.forEach((option) => {
            const optionAmenities = Object.values(option.amenities)
              .flat()
              .filter((amenity) => amenity.available)
              .map((amenity) => amenity.name);
            accommodationAmenities = [
              ...accommodationAmenities,
              ...optionAmenities,
            ];
          });
        }

        // Supprimer les doublons
        accommodationAmenities = [...new Set(accommodationAmenities)];

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
      <BeginningButton />
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

              {/* Affichage du nombre de résultats */}
              <div className="mb-6 text-sm text-gray-600">
                {filteredAccommodations.length} hébergement
                {filteredAccommodations.length > 1 ? "s" : ""} trouvé
                {filteredAccommodations.length > 1 ? "s" : ""}
                {filters.selectedCities.length > 0 && (
                  <span> dans {filters.selectedCities.join(", ")}</span>
                )}
              </div>

              {/* Message si aucun résultat */}
              {filteredAccommodations.length === 0 && (
                <div className="text-center py-12">
                  <div className="text-gray-500 text-lg mb-4">
                    Aucun hébergement trouvé pour vos critères
                  </div>
                  <Button
                    onClick={() =>
                      setFilters({
                        priceRange: [0, 300],
                        minRating: 0,
                        selectedAmenities: [],
                        accommodationType: "all",
                        searchTerm: "",
                        selectedCities: [],
                      })
                    }
                    type="primary"
                    style={{
                      backgroundColor: "#F59F00",
                      borderColor: "#F59F00",
                    }}
                  >
                    Réinitialiser les filtres
                  </Button>
                </div>
              )}

              {/* Grille d'hébergements */}
              {filteredAccommodations.length > 0 && (
                <div
                  className="grid gap-6"
                  style={{
                    gridTemplateColumns: `repeat(${getGridColumns()}, 1fr)`,
                  }}
                >
                  {filteredAccommodations.map((acc: any) => (
                    <AccommodationCard
                      key={acc.id}
                      accommodation={acc}
                      onBook={() => {
                        setTransaction({
                          id: acc.id,
                          title: acc.name,
                          amount:
                            acc.options && acc.options.length > 0
                              ? Math.min(
                                  ...acc.options.map((opt: any) => opt.price)
                                )
                              : acc.price,
                        });
                        navigate("/reservations-locations");
                      }}
                    />
                  ))}
                </div>
              )}
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
