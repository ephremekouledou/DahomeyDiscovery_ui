import { useState } from "react";
import {
  Tv,
  Bath,
  Wifi,
  Waves,
  Car,
  MapPin,
  Briefcase,
  Users,
  Globe,
  Coffee,
  Home,
  Heart,
  Shirt,
  Baby,
  Shield,
  X,
  CheckCircle,
  Sparkles,
  Dumbbell,
  TreePine,
  Plane,
  Bike,
  Lock,
  Calendar,
  Mail,
  Building2,
  Presentation,
  Radio,
  Cigarette,
  Music,
  ShoppingBag,
  Utensils,
  Flower,
  WashingMachine,
  Gift,
  Droplets,
  CreditCard,
  Volume2,
  BedDouble,
  UtensilsCrossed,
  Languages,
  Accessibility,
  Snowflake,
  Refrigerator,
  Microwave,
  Wind,
} from "lucide-react";

import {
  IAccommodationData,
  IAccommodationOption,
} from "../../sdk/models/hebergements";
import { Modal } from "antd";
import { useTransaction } from "../../context/transactionContext";
import { useNavigate } from "react-router-dom";

interface HotelServicesModalProps {
  accommodation: IAccommodationData;
}

interface ServiceItem {
  key: string;
  text: string;
  badge?: string;
  icon: React.ReactNode;
  category: string;
}

const HotelServicesModal: React.FC<HotelServicesModalProps> = ({
  accommodation,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  // Mapping des services avec leurs icônes et catégories
  const serviceMapping: Record<
    string,
    { text: string; icon: React.ReactNode; category: string }
  > = {
    // Piscines
    piscine_exterieure: {
      text: "Piscine extérieure",
      icon: <Waves className="w-5 h-5" />,
      category: "Piscines et bien-être",
    },
    piscine_interieure: {
      text: "Piscine intérieure",
      icon: <Waves className="w-5 h-5" />,
      category: "Piscines et bien-être",
    },
    piscine_toit: {
      text: "Piscine sur le toit",
      icon: <Waves className="w-5 h-5" />,
      category: "Piscines et bien-être",
    },
    piscine_debordement: {
      text: "Piscine à débordement",
      icon: <Waves className="w-5 h-5" />,
      category: "Piscines et bien-être",
    },
    piscine_vue: {
      text: "Piscine avec vue",
      icon: <Waves className="w-5 h-5" />,
      category: "Piscines et bien-être",
    },
    piscine_enfants: {
      text: "Piscine pour enfants",
      icon: <Baby className="w-5 h-5" />,
      category: "Services familiaux",
    },

    // Bien-être
    bain_soleil: {
      text: "Bains de soleil",
      icon: <Sparkles className="w-5 h-5" />,
      category: "Piscines et bien-être",
    },
    spa: {
      text: "Spa",
      icon: <Heart className="w-5 h-5" />,
      category: "Piscines et bien-être",
    },
    sauna: {
      text: "Sauna",
      icon: <Heart className="w-5 h-5" />,
      category: "Piscines et bien-être",
    },
    source_chaude: {
      text: "Source chaude",
      icon: <Droplets className="w-5 h-5" />,
      category: "Piscines et bien-être",
    },
    salle_massage: {
      text: "Salle de massage",
      icon: <Heart className="w-5 h-5" />,
      category: "Piscines et bien-être",
    },
    salle_sport: {
      text: "Salle de sport",
      icon: <Dumbbell className="w-5 h-5" />,
      category: "Piscines et bien-être",
    },
    randonnee: {
      text: "Randonnée",
      icon: <TreePine className="w-5 h-5" />,
      category: "Activités",
    },

    // Transport & parking
    parking: {
      text: "Parking",
      icon: <Car className="w-5 h-5" />,
      category: "Transport et parking",
    },
    transfert_aeroport: {
      text: "Transfert aéroport",
      icon: <Plane className="w-5 h-5" />,
      category: "Transport et parking",
    },
    location_voiture: {
      text: "Location de voiture",
      icon: <Car className="w-5 h-5" />,
      category: "Transport et parking",
    },
    location_velos: {
      text: "Location de vélos",
      icon: <Bike className="w-5 h-5" />,
      category: "Transport et parking",
    },
    service_navette: {
      text: "Service navette",
      icon: <MapPin className="w-5 h-5" />,
      category: "Transport et parking",
    },

    // Réception & services
    reception_24h: {
      text: "Réception 24h/24",
      icon: <Users className="w-5 h-5" />,
      category: "Services de réception",
    },
    bagagerie: {
      text: "Bagagerie",
      icon: <ShoppingBag className="w-5 h-5" />,
      category: "Services de réception",
    },
    conciergerie: {
      text: "Service de conciergerie",
      icon: <Users className="w-5 h-5" />,
      category: "Services de réception",
    },
    casiers: {
      text: "Casiers",
      icon: <Lock className="w-5 h-5" />,
      category: "Services de réception",
    },
    enregistrement_vip: {
      text: "Enregistrement VIP",
      icon: <Users className="w-5 h-5" />,
      category: "Services de réception",
    },
    depart_express: {
      text: "Départ express",
      icon: <Calendar className="w-5 h-5" />,
      category: "Services de réception",
    },
    coffre_fort: {
      text: "Coffre-fort",
      icon: <Lock className="w-5 h-5" />,
      category: "Sécurité",
    },
    reservation_tours: {
      text: "Réservation de tours",
      icon: <MapPin className="w-5 h-5" />,
      category: "Services de réception",
    },
    service_postal: {
      text: "Service postal",
      icon: <Mail className="w-5 h-5" />,
      category: "Services généraux",
    },
    service_mariage: {
      text: "Service mariage",
      icon: <Heart className="w-5 h-5" />,
      category: "Services spéciaux",
    },

    // Business
    centre_affaires: {
      text: "Centre d'affaires",
      icon: <Building2 className="w-5 h-5" />,
      category: "Services d'affaires",
    },
    salle_conference: {
      text: "Salle de conférence",
      icon: <Presentation className="w-5 h-5" />,
      category: "Services d'affaires",
    },
    salle_multifonction: {
      text: "Salle multifonction",
      icon: <Building2 className="w-5 h-5" />,
      category: "Services d'affaires",
    },
    wifi_public: {
      text: "Wi-Fi public",
      icon: <Wifi className="w-5 h-5" />,
      category: "Internet et connectivité",
    },

    // Espaces communs
    zone_fumeur: {
      text: "Zone fumeur",
      icon: <Cigarette className="w-5 h-5" />,
      category: "Espaces communs",
    },
    bar: {
      text: "Bar",
      icon: <Coffee className="w-5 h-5" />,
      category: "Restauration et bars",
    },
    bar_lobby: {
      text: "Bar du lobby",
      icon: <Coffee className="w-5 h-5" />,
      category: "Restauration et bars",
    },
    cafe: {
      text: "Café",
      icon: <Coffee className="w-5 h-5" />,
      category: "Restauration et bars",
    },
    restaurant: {
      text: "Restaurant",
      icon: <Utensils className="w-5 h-5" />,
      category: "Restauration et bars",
    },
    snack_bar: {
      text: "Snack-bar",
      icon: <Coffee className="w-5 h-5" />,
      category: "Restauration et bars",
    },
    commerce: {
      text: "Commerce",
      icon: <ShoppingBag className="w-5 h-5" />,
      category: "Espaces communs",
    },
    boite_nuit: {
      text: "Boîte de nuit",
      icon: <Music className="w-5 h-5" />,
      category: "Divertissement",
    },
    karaoke: {
      text: "Karaoké",
      icon: <Music className="w-5 h-5" />,
      category: "Divertissement",
    },
    billard: {
      text: "Billard",
      icon: <Home className="w-5 h-5" />,
      category: "Divertissement",
    },
    bbq: {
      text: "Barbecue",
      icon: <Utensils className="w-5 h-5" />,
      category: "Espaces extérieurs",
    },
    pique_nique: {
      text: "Aire de pique-nique",
      icon: <TreePine className="w-5 h-5" />,
      category: "Espaces extérieurs",
    },
    jardin: {
      text: "Jardin",
      icon: <Flower className="w-5 h-5" />,
      category: "Espaces extérieurs",
    },

    // Blanchisserie & entretien
    buanderie: {
      text: "Buanderie",
      icon: <WashingMachine className="w-5 h-5" />,
      category: "Services de blanchisserie",
    },
    blanchisserie: {
      text: "Blanchisserie",
      icon: <Shirt className="w-5 h-5" />,
      category: "Services de blanchisserie",
    },
    nettoyage_sec: {
      text: "Nettoyage à sec",
      icon: <Shirt className="w-5 h-5" />,
      category: "Services de blanchisserie",
    },
    seche_linge: {
      text: "Sèche-linge",
      icon: <WashingMachine className="w-5 h-5" />,
      category: "Services de blanchisserie",
    },
    repassage: {
      text: "Service de repassage",
      icon: <Shirt className="w-5 h-5" />,
      category: "Services de blanchisserie",
    },

    // Boutiques & services divers
    souvenirs: {
      text: "Boutique de souvenirs",
      icon: <Gift className="w-5 h-5" />,
      category: "Boutiques et services",
    },
    purificateur_eau: {
      text: "Purificateur d'eau",
      icon: <Droplets className="w-5 h-5" />,
      category: "Services généraux",
    },
    distributeur_billets: {
      text: "Distributeur de billets",
      icon: <CreditCard className="w-5 h-5" />,
      category: "Services généraux",
    },
    systeme_sonorisation: {
      text: "Système de sonorisation",
      icon: <Volume2 className="w-5 h-5" />,
      category: "Équipements techniques",
    },

    // Services en chambre
    service_chambre: {
      text: "Service en chambre",
      icon: <BedDouble className="w-5 h-5" />,
      category: "Services en chambre",
    },
    repas_enfants: {
      text: "Repas pour enfants",
      icon: <UtensilsCrossed className="w-5 h-5" />,
      category: "Services familiaux",
    },
    club_enfants: {
      text: "Club pour enfants",
      icon: <Baby className="w-5 h-5" />,
      category: "Services familiaux",
    },
    garde_enfants: {
      text: "Service de garde d'enfants",
      icon: <Baby className="w-5 h-5" />,
      category: "Services familiaux",
    },

    // Langues
    francais: {
      text: "Français",
      icon: <Languages className="w-5 h-5" />,
      category: "Langues parlées",
    },
    anglais: {
      text: "Anglais",
      icon: <Languages className="w-5 h-5" />,
      category: "Langues parlées",
    },
    espagnol: {
      text: "Espagnol",
      icon: <Languages className="w-5 h-5" />,
      category: "Langues parlées",
    },

    // Accessibilité
    entree_sans_escalier: {
      text: "Entrée sans escalier",
      icon: <Accessibility className="w-5 h-5" />,
      category: "Accessibilité",
    },
    aide_ecoute: {
      text: "Aide à l'écoute",
      icon: <Accessibility className="w-5 h-5" />,
      category: "Accessibilité",
    },
  };

  // Fonction pour extraire les services disponibles
  const getAvailableServices = (): ServiceItem[] => {
    const services: ServiceItem[] = [];

    Object.entries(accommodation).forEach(([key, value]) => {
      // Vérifier si c'est un service boolean et qu'il est true
      if (typeof value === "boolean" && value === true && serviceMapping[key]) {
        const badgeKey = `${key}_badge` as keyof typeof accommodation;
        const badge = accommodation[badgeKey] as string;

        services.push({
          key,
          text: serviceMapping[key].text,
          badge: badge || undefined,
          icon: serviceMapping[key].icon,
          category: serviceMapping[key].category,
        });
      }
    });

    return services;
  };

  // Grouper les services par catégorie
  const groupServicesByCategory = (services: ServiceItem[]) => {
    return services.reduce((acc, service) => {
      if (!acc[service.category]) {
        acc[service.category] = [];
      }
      acc[service.category].push(service);
      return acc;
    }, {} as Record<string, ServiceItem[]>);
  };

  const availableServices = getAvailableServices();
  const groupedServices = groupServicesByCategory(availableServices);

  // Icônes pour les catégories
  const categoryIcons: Record<string, React.ReactNode> = {
    "Piscines et bien-être": <Heart className="w-5 h-5" />,
    "Transport et parking": <Car className="w-5 h-5" />,
    "Services de réception": <Users className="w-5 h-5" />,
    "Services d'affaires": <Briefcase className="w-5 h-5" />,
    "Internet et connectivité": <Wifi className="w-5 h-5" />,
    "Restauration et bars": <Coffee className="w-5 h-5" />,
    "Espaces communs": <Home className="w-5 h-5" />,
    Divertissement: <Music className="w-5 h-5" />,
    "Espaces extérieurs": <TreePine className="w-5 h-5" />,
    "Services de blanchisserie": <Shirt className="w-5 h-5" />,
    "Boutiques et services": <ShoppingBag className="w-5 h-5" />,
    "Services généraux": <Briefcase className="w-5 h-5" />,
    "Services en chambre": <BedDouble className="w-5 h-5" />,
    "Services familiaux": <Baby className="w-5 h-5" />,
    "Langues parlées": <Globe className="w-5 h-5" />,
    Accessibilité: <Accessibility className="w-5 h-5" />,
    Sécurité: <Shield className="w-5 h-5" />,
    "Services spéciaux": <Sparkles className="w-5 h-5" />,
    Activités: <TreePine className="w-5 h-5" />,
    "Équipements techniques": <Radio className="w-5 h-5" />,
  };

  const ServiceSection: React.FC<{
    title: string;
    services: ServiceItem[];
  }> = ({ title, services }) => (
    <div className="mb-6">
      <div className="flex items-center gap-3 mb-4 pb-2 border-b border-gray-100">
        <div className="text-blue-600">
          {categoryIcons[title] || <Home className="w-5 h-5" />}
        </div>
        <h3 className="font-semibold text-gray-800 text-lg">{title}</h3>
        <span className="text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
          {services.length}
        </span>
      </div>
      <div className="space-y-3">
        {services.map((service, index) => (
          <div
            key={index}
            className="flex items-start gap-3 p-2 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-sm text-gray-700 font-medium">
                  {service.text}
                </span>
                {service.badge && (
                  <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full font-medium">
                    {service.badge}
                  </span>
                )}
              </div>
            </div>
            <div className="text-gray-400 flex-shrink-0">{service.icon}</div>
          </div>
        ))}
      </div>
    </div>
  );

  console.log("Services disponibles:", availableServices); // Pour debug
  console.log("Données accommodation:", accommodation); // Pour debug

  if (availableServices.length === 0) {
    return (
      <div className="mb-6">
        <p className="text-gray-500 text-sm">
          Aucun service disponible pour cet hébergement.
        </p>
      </div>
    ); // Afficher quelque chose même s'il n'y a pas de services
  }

  return (
    <div className="mb-6">
      {/* Bouton pour ouvrir la modal */}
      <button
        onClick={() => setIsOpen(true)}
        className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 py-3 rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-300 shadow-md hover:shadow-lg flex items-center gap-2 font-medium"
      >
        <Building2 className="w-5 h-5" />
        Voir tous les services et équipements
        <span className="bg-blue-500 text-xs px-2 py-1 rounded-full">
          {availableServices.length}
        </span>
      </button>

      {/* Modal */}
      {isOpen && (
        <Modal
          // title="Services et équipements"
          open={isOpen}
          onCancel={() => setIsOpen(false)}
          footer={null}
          width={"80vw"}
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-600 rounded-lg grid place-items-center">
              <Building2 className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-800">
                Services et équipements
              </h2>
              <p className="text-sm text-gray-600">
                {availableServices.length} service
                {availableServices.length > 1 ? "s" : ""} disponible
                {availableServices.length > 1 ? "s" : ""}
              </p>
            </div>
          </div>
          {/* Content */}
          <div className="p-6 overflow-y-auto max-h-[calc(90vh-100px)]">
            {Object.keys(groupedServices).length > 0 ? (
              <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
                {Object.entries(groupedServices)
                  .sort(([a], [b]) => a.localeCompare(b)) // Trier les catégories alphabétiquement
                  .map(([category, services]) => (
                    <ServiceSection
                      key={category}
                      title={category}
                      services={services}
                    />
                  ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <Building2 className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-500 mb-2">
                  Aucun service disponible
                </h3>
                <p className="text-gray-400">
                  Les informations sur les services ne sont pas encore
                  disponibles pour cet hébergement.
                </p>
              </div>
            )}
          </div>
        </Modal>
      )}
    </div>
  );
};

interface AccommodationOptionModalProps {
  isOpen: boolean;
  onClose: () => void;
  optionData: IAccommodationOption;
  // Fonction pour gérer le lien des fichiers (à adapter selon votre implémentation)
  getFileLink?: (file: string) => string;
}

interface FeatureItem {
  key: string;
  text: string;
  badge?: string;
  icon: React.ReactNode;
  category: string;
  available: boolean;
}

const AccommodationOptionModal: React.FC<AccommodationOptionModalProps> = ({
  isOpen,
  onClose,
  optionData,
  getFileLink = (file: string) => file, // Fonction par défaut
}) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const { setTransaction } = useTransaction();
  const navigate = useNavigate();

  if (!isOpen) return null;

  const handleImageNavigation = (direction: "prev" | "next") => {
    if (direction === "prev") {
      setCurrentImageIndex((prev) =>
        prev === 0 ? optionData.photo.length - 1 : prev - 1
      );
    } else {
      setCurrentImageIndex((prev) =>
        prev === optionData.photo.length - 1 ? 0 : prev + 1
      );
    }
  };

  // Mapping des équipements avec leurs icônes et catégories
  const equipmentMapping: Record<
    string,
    { text: string; icon: React.ReactNode; category: string }
  > = {
    wifi: {
      text: "Wi-Fi",
      icon: <Wifi className="w-4 h-4" />,
      category: "Connectivité",
    },
    climatisation: {
      text: "Climatisation",
      icon: <Snowflake className="w-4 h-4" />,
      category: "Confort",
    },
    salle_de_bain_privee: {
      text: "Salle de bain privée",
      icon: <Bath className="w-4 h-4" />,
      category: "Salle de bain",
    },
    refrigerateur: {
      text: "Réfrigérateur",
      icon: <Refrigerator className="w-4 h-4" />,
      category: "Cuisine et boissons",
    },
    micro_ondes: {
      text: "Micro-ondes",
      icon: <Microwave className="w-4 h-4" />,
      category: "Cuisine et boissons",
    },
    tv: {
      text: "Téléviseur",
      icon: <Tv className="w-4 h-4" />,
      category: "Divertissement",
    },
    mini_bar: {
      text: "Minibar",
      icon: <Coffee className="w-4 h-4" />,
      category: "Cuisine et boissons",
    },
    serviettes: {
      text: "Serviettes",
      icon: <Shirt className="w-4 h-4" />,
      category: "Linge et confort",
    },
    fenetres: {
      text: "Fenêtres",
      icon: <Wind className="w-4 h-4" />,
      category: "Vue et luminosité",
    },
  };

  // Fonction pour extraire les équipements disponibles
  const getAvailableEquipment = (): FeatureItem[] => {
    const equipment: FeatureItem[] = [];

    Object.entries(optionData).forEach(([key, value]) => {
      if (typeof value === "boolean" && equipmentMapping[key]) {
        const badgeKey = `${key}_badge` as keyof typeof optionData;
        const badge = optionData[badgeKey] as string;

        equipment.push({
          key,
          text: equipmentMapping[key].text,
          badge: badge || undefined,
          icon: equipmentMapping[key].icon,
          category: equipmentMapping[key].category,
          available: value,
        });
      }
    });

    return equipment;
  };

  // Grouper les équipements par catégorie
  const groupEquipmentByCategory = (equipment: FeatureItem[]) => {
    return equipment.reduce((acc, item) => {
      if (!acc[item.category]) {
        acc[item.category] = [];
      }
      acc[item.category].push(item);
      return acc;
    }, {} as Record<string, FeatureItem[]>);
  };

  const availableEquipment = getAvailableEquipment();
  const groupedEquipment = groupEquipmentByCategory(availableEquipment);

  const FeatureItem: React.FC<{ feature: FeatureItem }> = ({ feature }) => (
    <div
      className={`flex items-center gap-2 text-sm p-2 rounded-lg transition-colors ${
        feature.available
          ? "text-gray-700 hover:bg-green-50"
          : "text-gray-400 hover:bg-red-50"
      }`}
    >
      {feature.available ? (
        <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
      ) : (
        <X className="w-4 h-4 text-red-400 flex-shrink-0" />
      )}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 flex-wrap">
          <span
            className={`font-medium ${
              feature.available ? "text-gray-700" : "text-gray-400 line-through"
            }`}
          >
            {feature.text}
          </span>
          {feature.badge && feature.available && (
            <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full font-medium">
              {feature.badge}
            </span>
          )}
        </div>
      </div>
      <div
        className={`flex-shrink-0 ${
          feature.available ? "text-gray-600" : "text-gray-300"
        }`}
      >
        {feature.icon}
      </div>
    </div>
  );

  const EquipmentSection: React.FC<{
    title: string;
    equipment: FeatureItem[];
  }> = ({ title, equipment }) => (
    <div className="mb-6">
      <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2 pb-2 border-b border-gray-100">
        <Building2 className="w-5 h-5 text-blue-600" />
        {title}
        <span className="text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded-full ml-auto">
          {equipment.filter((e) => e.available).length}/{equipment.length}
        </span>
      </h3>
      <div className="space-y-1">
        {equipment.map((item) => (
          <FeatureItem key={item.key} feature={item} />
        ))}
      </div>
    </div>
  );

  return (
    <Modal
      // title="Services et équipements"
      open={isOpen}
      onCancel={() => onClose()}
      footer={null}
      width={"80vw"}
      height={"50vh"}
    >
      <div>
        <h2 className="text-2xl font-bold text-gray-900">{optionData.name}</h2>
        <div className="flex items-center gap-4 text-sm text-gray-600 mt-2">
          <div className="flex items-center gap-1">
            <Users className="w-4 h-4" />
            <span>{optionData.maxGuests} personnes</span>
          </div>
          <div className="flex items-center gap-1">
            <Home className="w-4 h-4" />
            <span>{optionData.size}</span>
          </div>
          {optionData.vue_sur && (
            <div className="flex items-center gap-1">
              <MapPin className="w-4 h-4" />
              <span>Vue sur {optionData.vue_sur}</span>
            </div>
          )}
        </div>
      </div>
      {/* Content */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left side - Images */}
        <div className="flex-1 relative h-[70vh]">
          {optionData.photo && optionData.photo.length > 0 ? (
            <>
              {/* Main image */}
              <div className="relative h-full">
                <img
                  src={getFileLink(
                    optionData.photo[currentImageIndex]?.file as string
                  )}
                  alt={`${optionData.name} - Image ${currentImageIndex + 1}`}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.currentTarget.src = "/placeholder-room.jpg";
                  }}
                />

                {/* Navigation arrows */}
                {optionData.photo.length > 1 && (
                  <>
                    <button
                      onClick={() => handleImageNavigation("prev")}
                      className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-80 hover:bg-opacity-100 rounded-full p-2 shadow-lg transition-all"
                    >
                      <div className="w-6 h-6 flex items-center justify-center text-lg font-bold">
                        ‹
                      </div>
                    </button>
                    <button
                      onClick={() => handleImageNavigation("next")}
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-80 hover:bg-opacity-100 rounded-full p-2 shadow-lg transition-all"
                    >
                      <div className="w-6 h-6 flex items-center justify-center text-lg font-bold">
                        ›
                      </div>
                    </button>
                  </>
                )}

                {/* Image indicators */}
                {optionData.photo.length > 1 && (
                  <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
                    {optionData.photo.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentImageIndex(index)}
                        className={`w-3 h-3 rounded-full transition-all ${
                          index === currentImageIndex
                            ? "bg-white"
                            : "bg-white bg-opacity-50"
                        }`}
                      />
                    ))}
                  </div>
                )}

                {/* Image counter */}
                {optionData.photo.length > 1 && (
                  <div className="absolute top-4 right-4 bg-black bg-opacity-70 text-white px-3 py-1 rounded-full text-sm">
                    {currentImageIndex + 1} / {optionData.photo.length}
                  </div>
                )}
              </div>

              {/* Thumbnail grid */}
              {optionData.photo.length > 1 && (
                <div className="absolute bottom-4 left-4 flex gap-2">
                  {optionData.photo.slice(0, 4).map((photo, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      className={`w-16 h-12 rounded-lg overflow-hidden border-2 transition-all ${
                        index === currentImageIndex
                          ? "border-white"
                          : "border-transparent opacity-70 hover:opacity-100"
                      }`}
                    >
                      <img
                        src={getFileLink(photo.file as string)}
                        alt={`Thumbnail ${index + 1}`}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.currentTarget.src = "/placeholder-room.jpg";
                        }}
                      />
                    </button>
                  ))}
                  {optionData.photo.length > 4 && (
                    <div className="w-16 h-12 rounded-lg bg-black bg-opacity-50 flex items-center justify-center text-white text-xs">
                      +{optionData.photo.length - 4}
                    </div>
                  )}
                </div>
              )}
            </>
          ) : (
            <div className="h-full flex items-center justify-center bg-gray-100">
              <div className="text-center">
                <Home className="w-16 h-16 text-gray-300 mx-auto mb-2" />
                <p className="text-gray-500">Aucune image disponible</p>
              </div>
            </div>
          )}
        </div>

        {/* Right side - Details */}
        <div className="w-96 bg-gray-50 flex flex-col h-[70vh]">
          <div className="p-6 flex-1 overflow-y-auto">
            {/* Room description */}
            <div className="mb-6">
              <h3 className="font-semibold text-gray-900 mb-3">Description</h3>
              <p className="text-sm text-gray-700 leading-relaxed">
                {optionData.description}
              </p>
            </div>

            {/* Room details */}
            <div className="mb-6">
              <h3 className="font-semibold text-gray-900 mb-3">
                Détails de la chambre
              </h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Type de lit:</span>
                  <span className="font-medium text-gray-800">
                    {optionData.bedType}
                  </span>
                </div>
                {optionData.lit && (
                  <div className="flex justify-between">
                    <span className="text-gray-600">Configuration lit:</span>
                    <span className="font-medium text-gray-800">
                      {optionData.lit}
                    </span>
                  </div>
                )}
                {optionData.surface && (
                  <div className="flex justify-between">
                    <span className="text-gray-600">Surface:</span>
                    <span className="font-medium text-gray-800">
                      {optionData.surface}
                    </span>
                  </div>
                )}
                {optionData.etage && (
                  <div className="flex justify-between">
                    <span className="text-gray-600">Étage:</span>
                    <span className="font-medium text-gray-800">
                      {optionData.etage}
                    </span>
                  </div>
                )}
              </div>
            </div>

            {/* Equipment sections */}
            <div className="space-y-6">
              {Object.entries(groupedEquipment).map(([category, equipment]) => (
                <EquipmentSection
                  key={category}
                  title={category}
                  equipment={equipment}
                />
              ))}
            </div>

            {/* Policies */}
            <div className="space-y-4 mt-6">
              {optionData.childPolicy && (
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                    <Baby className="w-5 h-5 text-blue-600" />
                    Conditions relatives aux enfants
                  </h3>
                  <p className="text-sm text-blue-600 bg-blue-50 p-3 rounded-lg">
                    {optionData.childPolicy}
                  </p>
                </div>
              )}

              {optionData.additionalBeds && (
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                    <BedDouble className="w-5 h-5 text-blue-600" />
                    Lits supplémentaires
                  </h3>
                  <p className="text-sm text-gray-600 bg-gray-100 p-3 rounded-lg">
                    {optionData.additionalBeds}
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Bottom action */}
          <div className="p-6 border-t border-gray-200">
            <div className="mb-4 text-center">
              <div className="text-2xl font-bold text-blue-600">
                {optionData.price.toLocaleString()} FCFA
              </div>
              <div className="text-sm text-gray-600">par nuit</div>
            </div>
            <button
              onClick={() => {
                setTransaction({
                  id: optionData._id,
                  title: optionData.name,
                  amount: optionData.price,
                  tarification: []
                });
                navigate("/reservations-locations");
              }}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-xl transition-colors"
            >
              Sélectionner cette chambre
            </button>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export { HotelServicesModal, AccommodationOptionModal };
