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
import { Button, Flex, Typography } from "antd";
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
  return (
    <div
      className="relative w-full max-w-4xl mx-auto rounded-2xl overflow-hidden shadow-2xl"
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
      <div className="relative z-10 flex items-center min-h-[400px] p-8">
        <div className="flex-1 max-w-md">
          {/* Carte blanche avec le contenu */}
          <div className="bg-white rounded-2xl p-8 shadow-xl">
            <h1 className="text-2xl font-bold text-gray-900 mb-6 leading-tight">
              Decouvrez toutes les bonnes adresses du Bénin
            </h1>

            <p className="text-gray-600 mb-8 text-sm leading-relaxed">
              Nous vous proposons un guide pdf pour bien choisir vos
              destinations.
            </p>

            <button className="w-full bg-orange-400 hover:bg-orange-500 text-white font-semibold py-4 px-6 rounded-xl transition-colors duration-200 shadow-lg hover:shadow-xl transform hover:scale-105 transition-transform">
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
                    navigate("/hebergements/" + accommodation.id);
                  }}
                >
                  Détails
                </Button>
              </div>
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
        {/* Nos hébergements */}
        <Flex
          wrap="wrap"
          vertical
          gap={20}
          justify="center"
          /* justify="space-between" gap={isMobile ? 20 : 30} */ style={{
            paddingTop: "40px",
          }}
        >
          <Typography.Title
            level={2}
            style={{
              color: "#3B1B19",
              fontSize: isMobile ? "1.2rem" : "2.5rem",
              fontWeight: "200",
              // textAlign: "center",
              margin: "0",
              fontFamily: "DragonAngled",
            }}
          >
            Nos meilleures offres d'hébergements selectionnées pour vous
          </Typography.Title>
          <Flex
            wrap="wrap"
            gap={20}
            justify={isMobile ? "center" : "flex-start"}
          >
            {accommodation
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
                    // we redirect to the payment page
                    navigate("/reservations-locations");
                  }}
                />
              ))}
          </Flex>
        </Flex>

        {/* Nos partenaires */}
        <Flex
          wrap="wrap"
          vertical
          gap={20}
          justify="center"
          /* justify="space-between" gap={isMobile ? 20 : 30} */ style={{
            paddingTop: "40px",
          }}
        >
          <Typography.Title
            level={2}
            style={{
              color: "#3B1B19",
              fontSize: isMobile ? "1.2rem" : "2.5rem",
              fontWeight: "200",
              // textAlign: "center",
              margin: "0",
              fontFamily: "DragonAngled",
            }}
          >
            Nos partenaires
          </Typography.Title>
          <Flex wrap="wrap" gap={20} justify={isMobile ? "center" : "flex-start"}>
            {accommodation
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
                    // we redirect to the payment page
                    navigate("/reservations-locations");
                  }}
                />
              ))}
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

      {/* Proposition de la fiche des bonnes adresses */}
      <Flex>
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
          <Typography.Title
            level={2}
            style={{
              color: "#3B1B19",
              fontSize: isMobile ? "1.2rem" : "2.5rem",
              fontWeight: "200",
              margin: "0",
              fontFamily: "DragonAngled",
            }}
          >
            Decouvrez toutes les bonnes adresses du Bénin
          </Typography.Title>
          <BonneAdresse />
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
