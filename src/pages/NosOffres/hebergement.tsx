import React, { useEffect, useMemo, useState, useCallback } from "react";
import {
  Star,
  MapPin,
  LucideIcon,
  ChevronUp,
  ChevronDown,
  Filter,
  X,
  Building,
} from "lucide-react";
import { Button, Flex, Typography, Drawer, Rate } from "antd";
import NavBar from "../../components/navBar/navBar";
import { useLocation, useNavigate } from "react-router-dom";
import ImageCarousel from "../../components/ImageGallery/ImageCarousel";
import Footer from "../../components/footer/footer";
import { useTransaction } from "../../context/transactionContext";
import bonneAdressImg from "/images/bonnesAddresse.webp";
import BeginningButton from "../../components/dededed/BeginingButton";
import { IAccommodationData } from "../../sdk/models/hebergements";
import { HebergementsAPI } from "../../sdk/api/hebergements";
import { HandleGetFileLink } from "../Circuits/CircuitsCartes";
import { VillesAPI } from "../../sdk/api/villes";
import { emptyIPageMedia, IPageMedia } from "../../sdk/models/pagesMedias";
import { PageSettings } from "../../sdk/api/pageMedias";
import CrossSelling from "../../components/dededed/crossSelling";
import { IClientHistory } from "../../sdk/models/clients";
import { ClientsAPI } from "../../sdk/api/clients";


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

// Types d'hébergement disponibles
export const ACCOMMODATION_TYPES = [
  { value: "hotel", label: "Hôtel" },
  { value: "appartement", label: "Appartement" },
  { value: "villa", label: "Villa" },
] as const;

export type AccommodationType = (typeof ACCOMMODATION_TYPES)[number]["value"];

const BonneAdresse: React.FC = React.memo(() => {
  const [isMobile, setIsMobile] = useState<boolean>(false);

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
      <div className="absolute inset-0">
        <div className="w-full h-full bg-gradient-to-r from-slate-800 via-slate-600 to-slate-500 opacity-60"></div>
      </div>

      <div className="relative z-10 flex items-center min-h-[400px] p-4 sm:p-6 lg:p-8">
        <div className="flex-1 max-w-md">
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
});

BonneAdresse.displayName = "BonneAdresse";

export interface Amenity {
  name: string;
  icon: LucideIcon;
  available: boolean;
  description?: string;
}

interface AmenitiesGroup {
  [key: string]: Amenity[];
}

export interface AccommodationOption {
  name: string;
  description: string;
  photo: string;
  price: number;
  amenities: AmenitiesGroup;
}

export interface AccommodationData {
  id: string;
  name: string;
  price?: number;
  rating: number;
  reviewCount: number;
  mainImage: string;
  images: string[];
  description: string;
  ville: City;
  amenities?: AmenitiesGroup;
  options?: AccommodationOption[];
  owner: boolean;
}

interface AccommodationCardProps {
  accommodation: IAccommodationData;
  onBook?: () => void;
  className?: string;
}

export interface BalancedAmenities {
  leftColumn: [string, Amenity[]][];
  rightColumn: [string, Amenity[]][];
}

const AccommodationCard: React.FC<AccommodationCardProps> = React.memo(
  ({ accommodation, className = "" }) => {
    const navigate = useNavigate();
    const [isHovered, setIsHovered] = useState<boolean>(false);
    const [isMobile, setIsMobile] = useState<boolean>(false);

    useEffect(() => {
      const checkMobile = () => {
        setIsMobile(window.innerWidth < 768);
      };
      checkMobile();
      window.addEventListener("resize", checkMobile);
      return () => window.removeEventListener("resize", checkMobile);
    }, []);

    const getPriceDisplay = useCallback((): string => {
      if (accommodation.options && accommodation.options.length > 0) {
        const prices = accommodation.options.map((option: any) => option.price);
        const minPrice = Math.min(...prices);
        const maxPrice = Math.max(...prices);

        if (minPrice === maxPrice) {
          return `${minPrice} FCFA`;
        }
        return `${minPrice} FCFA - ${maxPrice} FCFA`;
      }
      return `${accommodation.price} FCFA`;
    }, [accommodation.options, accommodation.price]);

    const getTypeLabel = useCallback((type: string): string => {
      const typeObj = ACCOMMODATION_TYPES.find((t) => t.value === type);
      return typeObj ? typeObj.label : type;
    }, []);

    const handleNavigate = useCallback(() => {
      navigate("/hebergements/" + accommodation._id);
    }, [navigate, accommodation._id]);

    const handleMouseEnter = useCallback(() => setIsHovered(true), []);
    const handleMouseLeave = useCallback(() => setIsHovered(false), []);

    const mainImageUrl = useMemo(() => {
      return accommodation.main_image?.[0]?.file
        ? HandleGetFileLink(accommodation.main_image[0].file as string)
        : "";
    }, [accommodation.main_image]);

    return (
      <div
        key={accommodation._id}
        className={`bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 ${
          isMobile ? "w-full max-w-sm mx-auto" : "max-w-sm"
        } ${className}`}
      >
        <div className="relative">
          {mainImageUrl && (
            <img
              src={mainImageUrl}
              alt={accommodation.name}
              className={`w-full object-cover ${isMobile ? "h-40" : "h-48"}`}
            />
          )}
          <div className="absolute top-3 left-3 bg-white bg-opacity-90 rounded-full px-3 py-1">
            <span className="text-xs font-semibold text-gray-700 flex items-center gap-1">
              <MapPin size={12} />
              {accommodation.ville}
            </span>
          </div>
          <div className="absolute top-3 right-3 bg-blue-500 bg-opacity-90 rounded-full px-3 py-1">
            <span className="text-xs font-semibold text-white flex items-center gap-1">
              <Building size={12} />
              {getTypeLabel(accommodation.type)}
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
                  <Rate
                    allowHalf
                    disabled
                    defaultValue={accommodation.rating}
                  />
                  <span
                    className={`text-gray-600 ml-2 ${
                      isMobile ? "text-xs" : "text-sm"
                    }`}
                  >
                    ({accommodation.review_count} avis)
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
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                onClick={handleNavigate}
              >
                Détails
              </Button>
            </Flex>
          </Flex>
        </div>
      </div>
    );
  }
);

AccommodationCard.displayName = "AccommodationCard";

interface FilterOptions {
  priceRange: [number, number];
  minRating: number;
  selectedAmenities: string[];
  accommodationType: "all" | "owner" | "partner";
  searchTerm: string;
  selectedCities: City[];
  selectedTypes: AccommodationType[];
}

interface FilterSectionProps {
  filters: FilterOptions;
  setFilters: React.Dispatch<React.SetStateAction<FilterOptions>>;
  accommodations: IAccommodationData[];
  isMobile: boolean;
}

const FilterSection: React.FC<FilterSectionProps> = React.memo(
  ({ filters, setFilters, accommodations, isMobile }) => {
    const [openSections, setOpenSections] = useState({
      type: true,
      cities: true,
      accommodationTypes: true,
      price: true,
      rating: true,
      amenities: false,
      search: true,
    });

    const toggleSection = useCallback((section: string) => {
      setOpenSections((prev) => ({
        ...prev,
        [section]: !prev[section as keyof typeof prev],
      }));
    }, []);

    const priceRange = useMemo(() => {
      const prices: number[] = [];
      accommodations.forEach((acc) => {
        if (acc.options && acc.options.length > 0) {
          acc.options.forEach((option: any) => prices.push(option.price));
        } else if (acc.price) {
          prices.push(acc.price);
        }
      });
      return prices.length > 0 ? [0, Math.max(...prices)] : [0, 500];
    }, [accommodations]);

    const handlePriceChange = useCallback(
      (index: number, value: number) => {
        setFilters((prev) => {
          const newPriceRange: [number, number] = [...prev.priceRange] as [
            number,
            number
          ];
          newPriceRange[index] = value;
          return { ...prev, priceRange: newPriceRange };
        });
      },
      [setFilters]
    );

    const handleCityToggle = useCallback(
      (city: City) => {
        setFilters((prev) => {
          const newCities = prev.selectedCities.includes(city)
            ? prev.selectedCities.filter((c) => c !== city)
            : [...prev.selectedCities, city];
          return { ...prev, selectedCities: newCities };
        });
      },
      [setFilters]
    );

    const handleTypeToggle = useCallback(
      (type: AccommodationType) => {
        setFilters((prev) => {
          const newTypes = prev.selectedTypes.includes(type)
            ? prev.selectedTypes.filter((t) => t !== type)
            : [...prev.selectedTypes, type];
          return { ...prev, selectedTypes: newTypes };
        });
      },
      [setFilters]
    );

    const clearFilters = useCallback(() => {
      setFilters({
        priceRange: [priceRange[0], priceRange[1]] as [number, number],
        minRating: 0,
        selectedAmenities: [],
        accommodationType: "all",
        searchTerm: "",
        selectedCities: [],
        selectedTypes: [],
      });
    }, [setFilters, priceRange]);

    const handleSearchChange = useCallback(
      (e: React.ChangeEvent<HTMLInputElement>) => {
        setFilters((prev) => ({ ...prev, searchTerm: e.target.value }));
      },
      [setFilters]
    );

    const handleRatingChange = useCallback(
      (e: React.ChangeEvent<HTMLInputElement>) => {
        setFilters((prev) => ({
          ...prev,
          minRating: parseFloat(e.target.value),
        }));
      },
      [setFilters]
    );

    const cityCountMap = useMemo(() => {
      const map = new Map<string, number>();
      accommodations.forEach((acc) => {
        const count = map.get(acc.ville) || 0;
        map.set(acc.ville, count + 1);
      });
      return map;
    }, [accommodations]);

    const typeCountMap = useMemo(() => {
      const map = new Map<string, number>();
      accommodations.forEach((acc) => {
        const count = map.get(acc.type) || 0;
        map.set(acc.type, count + 1);
      });
      return map;
    }, [accommodations]);

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
              onChange={handleSearchChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
          )}
        </div>

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
                <label key={`city-${city}`} className="flex items-center">
                  <input
                    type="checkbox"
                    checked={filters.selectedCities.includes(city)}
                    onChange={() => handleCityToggle(city)}
                    className="mr-2 text-orange-500"
                  />
                  <span className="text-sm text-gray-700">{city}</span>
                  <span className="text-xs text-gray-500 ml-auto">
                    ({cityCountMap.get(city) || 0})
                  </span>
                </label>
              ))}
            </div>
          )}
        </div>

        <div className="mb-6">
          <button
            onClick={() => toggleSection("accommodationTypes")}
            className="flex items-center justify-between w-full text-left font-semibold text-gray-700 mb-3"
          >
            <span className="flex items-center gap-2">
              <Building size={16} />
              Types d'hébergement
            </span>
            {openSections.accommodationTypes ? (
              <ChevronUp size={16} />
            ) : (
              <ChevronDown size={16} />
            )}
          </button>
          {openSections.accommodationTypes && (
            <div className="space-y-2">
              {ACCOMMODATION_TYPES.map((type) => (
                <label key={`type-${type.value}`} className="flex items-center">
                  <input
                    type="checkbox"
                    checked={filters.selectedTypes.includes(type.value)}
                    onChange={() => handleTypeToggle(type.value)}
                    className="mr-2 text-orange-500"
                  />
                  <span className="text-sm text-gray-700">{type.label}</span>
                  <span className="text-xs text-gray-500 ml-auto">
                    ({typeCountMap.get(type.value) || 0})
                  </span>
                </label>
              ))}
            </div>
          )}
        </div>

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
                  <label className="block text-xs text-gray-600 mb-1">
                    Min
                  </label>
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
                  <label className="block text-xs text-gray-600 mb-1">
                    Max
                  </label>
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
                <label key={`rating-${rating}`} className="flex items-center">
                  <input
                    type="radio"
                    name="minRating"
                    value={rating}
                    checked={filters.minRating === rating}
                    onChange={handleRatingChange}
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
                            key={`star-${rating}-${i}`}
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
      </div>
    );
  }
);

FilterSection.displayName = "FilterSection";

const Hebergements: React.FC = () => {
  const [hebergements, setHebergements] = useState<IAccommodationData[]>([]);
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const [isTablet, setIsTablet] = useState<boolean>(false);
  const [filtersOpen, setFiltersOpen] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [settings, setSettings] = useState<IPageMedia>(emptyIPageMedia());
  const [history, setHistory] = useState<IClientHistory[]>([]);

  const realPriceRange = useMemo((): [number, number] => {
    if (hebergements.length === 0) return [0, 1000000];

    const prices: number[] = [];
    hebergements.forEach((acc) => {
      if (acc.options && acc.options.length > 0) {
        acc.options.forEach((option: any) => prices.push(option.price));
      } else if (acc.price) {
        prices.push(acc.price);
      }
    });
    return prices.length > 0 ? [0, Math.max(...prices)] : [0, 1000000];
  }, [hebergements]);

  const [filters, setFilters] = useState<FilterOptions>({
    priceRange: [0, 1000000],
    minRating: 0,
    selectedAmenities: [],
    accommodationType: "all",
    searchTerm: "",
    selectedCities: [],
    selectedTypes: [],
  });

  const { pathname } = useLocation();
  const { setTransaction } = useTransaction();
  const navigate = useNavigate();

  useEffect(() => {
    if (hebergements.length > 0 && filters.priceRange[1] === 1000000) {
      setFilters((prev) => ({
        ...prev,
        priceRange: [realPriceRange[0], realPriceRange[1]],
      }));
    }
  }, [hebergements, realPriceRange]);

  const filteredAccommodations = useMemo(() => {
    if (hebergements.length === 0) return [];

    return hebergements.filter((accommodation) => {
      if (
        filters.searchTerm &&
        !accommodation.name
          .toLowerCase()
          .includes(filters.searchTerm.toLowerCase())
      ) {
        return false;
      }

      if (filters.selectedCities.length > 0) {
        if (!filters.selectedCities.includes(accommodation.ville as City)) {
          return false;
        }
      }

      if (filters.selectedTypes.length > 0) {
        if (
          !filters.selectedTypes.includes(
            accommodation.type as AccommodationType
          )
        ) {
          return false;
        }
      }

      if (filters.accommodationType !== "all") {
        const isOwner = filters.accommodationType === "owner";
        if (accommodation.owner !== isOwner) return false;
      }

      if (filters.priceRange[1] !== 1000000) {
        let priceMatches = false;
        if (accommodation.options && accommodation.options.length > 0) {
          priceMatches = accommodation.options.some(
            (option: any) =>
              option.price >= filters.priceRange[0] &&
              option.price <= filters.priceRange[1]
          );
        } else if (accommodation.price) {
          priceMatches =
            accommodation.price >= filters.priceRange[0] &&
            accommodation.price <= filters.priceRange[1];
        }
        if (!priceMatches) return false;
      }

      if (filters.minRating > 0 && accommodation.rating < filters.minRating) {
        return false;
      }

      return true;
    });
  }, [hebergements, filters]);

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

  useEffect(() => {
    document.title = "Nos Offres - Hébergements";
  }, []);

  useEffect(() => {
    PageSettings.List()
      .then((data) => {
        setSettings(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching settings:", err);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [villesData, hebergementsData] = await Promise.all([
          VillesAPI.List(),
          HebergementsAPI.List(),
        ]);

        const villesMap = new Map(
          villesData.map((ville) => [ville._id, ville.name])
        );

        const mappedHebergements = hebergementsData.map((hebergement) => ({
          ...hebergement,
          ville: villesMap.get(hebergement.ville) || hebergement.ville,
        }));

        setHebergements(mappedHebergements);
      } catch (err) {
        console.error("Error fetching data:", err);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    ClientsAPI.ListClientHistory(ClientsAPI.GetClientHistoryLocal())
      .then((data) => {
        setHistory(data.history);
        console.log("History fetched", data.history);
      })
      .catch((err) => {
        console.error("History added not added", err);
      });
  }, []);

  const getGridColumns = useCallback((): number => {
    if (isMobile) return 1;
    if (isTablet) return 2;
    return 3;
  }, [isMobile, isTablet]);

  const handleResetFilters = useCallback(() => {
    setFilters({
      priceRange: [0, 300],
      minRating: 0,
      selectedAmenities: [],
      accommodationType: "all",
      searchTerm: "",
      selectedCities: [],
      selectedTypes: [],
    });
  }, []);

  const handleBooking = useCallback(
    (acc: IAccommodationData) => {
      setTransaction({
        id: acc._id,
        title: acc.name,
        amount:
          acc.options && acc.options.length > 0
            ? Math.min(...acc.options.map((opt: any) => opt.price))
            : typeof acc.price === "number"
            ? acc.price
            : 0,
        tarification: [],
      });
      navigate("/reservations-locations");
    },
    [setTransaction, navigate]
  );

  const carouselImages = useMemo(() => {
    if (
      settings.hebergements_carrousel?.length > 0 &&
      settings.hebergements_carrousel[0].file !== null
    ) {
      return settings.hebergements_carrousel.map((item) =>
        HandleGetFileLink(item.file as string)
      );
    }
    return [];
  }, [settings.hebergements_carrousel]);

  const backgroundImageUrl = useMemo(() => {
    if (settings.hebergements_background?.[0]?.file) {
      return HandleGetFileLink(
        settings.hebergements_background[0].file as string
      );
    }
    return "";
  }, [settings.hebergements_background]);

  return (
    <Flex justify="center" vertical>
      <BeginningButton />
      
      <div className="relative z-20 flex items-center justify-center">
        <NavBar menu="HÉBERGEMENT" />
      </div>

      {!loading && backgroundImageUrl && (
        <Flex
          vertical
          className="relative w-full overflow-hidden"
          style={{
            backgroundImage: `url(${backgroundImageUrl})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            padding: isMobile ? "4vh 4vw" : isTablet ? "6vh 6vw" : "8vh 8vw",
            paddingBottom: isMobile ? "12vw" : isTablet ? "10vw" : "8vw",
          }}
        >
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
                {settings.hebergements_title}
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
                {settings.hebergements_subtitle}
              </Typography.Text>
            </Flex>
          </Flex>
        </Flex>
      )}

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

      <div
        className={`flex ${isMobile ? "flex-col" : "flex-row"} ${
          isMobile ? "gap-0" : "gap-6"
        } w-full max-w-7xl mx-auto ${isMobile ? "p-0" : "p-6"}`}
      >
        {!isMobile && (
          <div className="flex-shrink-0">
            <div className="sticky top-6">
              <FilterSection
                filters={filters}
                setFilters={setFilters}
                accommodations={hebergements}
                isMobile={false}
              />
            </div>
          </div>
        )}

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
            accommodations={hebergements}
            isMobile={true}
          />
        </Drawer>

        <div className="flex-1 min-w-0">
          <Flex vertical gap={isMobile ? 30 : 50}>
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

              <div className="mb-6 text-sm text-gray-600">
                {filteredAccommodations.length} hébergement
                {filteredAccommodations.length > 1 ? "s" : ""} trouvé
                {filteredAccommodations.length > 1 ? "s" : ""}
                {filters.selectedCities.length > 0 && (
                  <span> dans {filters.selectedCities.join(", ")}</span>
                )}
                {filters.selectedTypes.length > 0 && (
                  <span>
                    {" "}
                    -{" "}
                    {filters.selectedTypes
                      .map(
                        (type) =>
                          ACCOMMODATION_TYPES.find((t) => t.value === type)
                            ?.label || type
                      )
                      .join(", ")}
                  </span>
                )}
              </div>

              {filteredAccommodations.length === 0 && (
                <div className="text-center py-12">
                  <div className="text-gray-500 text-lg mb-4">
                    Aucun hébergement trouvé pour vos critères
                  </div>
                  <Button
                    onClick={handleResetFilters}
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

              {filteredAccommodations.length > 0 && (
                <div
                  className="grid gap-6"
                  style={{
                    gridTemplateColumns: `repeat(${getGridColumns()}, 1fr)`,
                  }}
                >
                  {filteredAccommodations.map((acc) => (
                    <AccommodationCard
                      key={acc._id}
                      accommodation={acc}
                      onBook={() => handleBooking(acc)}
                    />
                  ))}
                </div>
              )}
            </div>
          </Flex>
        </div>
      </div>

      <div
        style={{
          height: isMobile ? "40px" : "80px",
          backgroundColor: "#D9D9D938",
          margin: isMobile ? "20px 0" : "40px 0",
        }}
      ></div>

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

      <CrossSelling history={history} maxItems={5} />

      <section
        style={{ height: isMobile ? "25vh" : isTablet ? "35vh" : "45vw" }}
      >
        {carouselImages.length > 0 && <ImageCarousel images={carouselImages} />}
      </section>

      <Footer />
    </Flex>
  );
};

export default Hebergements;
