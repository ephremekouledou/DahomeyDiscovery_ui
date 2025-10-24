import React, { useEffect, useMemo, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { CarRentalCardProps } from "./locations";
import Footer from "../../components/footer/footer";
import {
  Button,
  Flex,
  Image as AntdImage,
  Typography,
  Rate,
  DatePicker,
  Switch,
  InputNumber,
} from "antd";
import NavBar from "../../components/navBar/navBar";
import {
  Car,
  Fuel,
  LucideIcon,
  Luggage,
  Settings,
  Users,
  Zap,
} from "lucide-react";
import { usePanier } from "../../context/panierContext";
import {
  addVehicule,
  PanierVehiculeInfos,
  emptyPanier,
} from "../../sdk/models/panier";
import { v4 } from "uuid";
import PaniersAPI from "../../sdk/api/panier";

import BeginningButton from "../../components/dededed/BeginingButton";
import { ICarRentalData } from "../../sdk/models/vehicules";
import { VehiculesAPI } from "../../sdk/api/vehicules";
import { HandleGetFileLink } from "../Circuits/CircuitsCartes";
import { EquipmentModal, TarificationModal } from "./locationsModal";
import {
  CalendarOutlined,
  DollarCircleFilled,
  LockOutlined,
} from "@ant-design/icons";
import dayjs, { Dayjs } from "dayjs";
import { IClient, IClientHistory } from "../../sdk/models/clients";
import { ClientsAPI } from "../../sdk/api/clients";
import SimilarSelling from "../../components/dededed/similarSelling";
import CrossSelling from "../../components/dededed/crossSelling";
import { useScreenSize } from "../../components/CircuitView/Timeline";

const ViewLocationContent: React.FC<CarRentalCardProps> = ({ car }) => {
  const [isHovered, setIsHovered] = useState(false);
  const { panier, setPanier, addVehiculeToPanier } = usePanier();
  const screenSize = useScreenSize();
  // local preview of panier can be accessed from context directly when needed
  const [currentImageIndex, setCurrentImageIndex] = useState<number>(0);
  // form states
  const [selectedDate, setSelectedDate] = useState<Dayjs | null>(null);
  const [days, setDays] = useState<number>(1);
  const [chauffeur, setChauffeur] = useState<boolean>(false);
  const [showEquipmentModal, setShowEquipmentModal] = useState(false);
  const [showTarificationModal, setShowTarificationModal] = useState(false);
  const [_, setImageHeights] = useState<number[]>([]);
  const [maxHeight, setMaxHeight] = useState<number>(400); // hauteur par défaut augmentée
  const [user, setUser] = useState<IClient | null>(null);

  // Vérifier si le formulaire est valide
  const isFormValid =
    selectedDate !== null &&
    chauffeur !== null &&
    days !== null &&
    days > 0 &&
    user !== null;

  // Calculer le prix total en fonction des tranches de tarification
  const totalPrice = useMemo(() => {
    // days must be a positive integer
    const nbrDays = Math.max(1, Math.floor(days || 1));

    // If there is a tarification table, try to find a matching tranche
    if (car.tarification && car.tarification.length > 0) {
      // Find tranche where from <= nbrDays <= to
      const matched = car.tarification.find((t) => {
        // some tranches might have to === 0 meaning unlimited upper bound
        const from = typeof t.from === "number" ? t.from : 0;
        const to = typeof t.to === "number" && t.to > 0 ? t.to : Infinity;
        return nbrDays >= from && nbrDays <= to;
      });

      // Use matched per-day price if found, otherwise fallback to price_per_day
      const perDay = matched
        ? chauffeur
          ? matched.price_driver
          : matched.price
        : car.price_per_day;
      return perDay * nbrDays;
    }

    // Fallback: use car.price_per_day
    return (car.price_per_day || 0) * nbrDays;
  }, [days, chauffeur, car.tarification, car.price_per_day]);

  const formStyles = useMemo(
    () => ({
      container: {
        backgroundColor: "#f8f9fa",
        border: "1px solid #e0e0e0",
        borderRadius: "12px",
        padding: screenSize.isMobile ? "20px" : "30px",
        marginBottom: screenSize.isMobile ? "20px" : "30px",
        position: "relative" as const,
      },
      label: {
        fontSize: screenSize.isMobile ? "14px" : "16px",
        fontFamily: "GeneralSans",
        fontWeight: "500",
        color: "#311715",
        marginBottom: "8px",
      },
      input: {
        width: "100%",
        height: screenSize.isMobile ? "45px" : "50px",
        borderRadius: "8px",
        fontSize: screenSize.isMobile ? "14px" : "16px",
        fontFamily: "GeneralSans",
      },
    }),
    [screenSize]
  );

  // Check for logged in user
  useEffect(() => {
    const loggedUser = ClientsAPI.GetUser();
    setUser(loggedUser);
  }, []);

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
  //   return Array.from({ length: 5 }, (_, i) => (
  //     <Star
  //       key={i}
  //       size={16}
  //       className={
  //         i < Math.floor(rating)
  //           ? "fill-yellow-400 text-yellow-400"
  //           : "text-gray-300"
  //       }
  //     />
  //   ));
  // };

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
              {/* {renderStars(car.rating)} */}
              <Rate allowHalf disabled defaultValue={car.rating} />
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

        {/* Login banner when not authenticated */}
        {!ClientsAPI.GetUser()?._id && (
          <Flex
            align="center"
            gap={12}
            style={{
              backgroundColor: "#fff3e0",
              border: "2px solid #F59F00",
              borderRadius: "12px",
              padding: screenSize.isMobile ? "16px" : "20px",
              marginBottom: "20px",
            }}
          >
            <LockOutlined
              style={{
                fontSize: screenSize.isMobile ? "24px" : "28px",
                color: "#BF2500",
              }}
            />
            <Flex vertical gap={4} style={{ flex: 1 }}>
              <Typography.Text
                style={{
                  fontSize: screenSize.isMobile ? "16px" : "18px",
                  fontFamily: "GeneralSans",
                  fontWeight: "600",
                  color: "#BF2500",
                  margin: 0,
                }}
              >
                Connexion requise
              </Typography.Text>
              <Typography.Text
                style={{
                  fontSize: screenSize.isMobile ? "13px" : "14px",
                  fontFamily: "GeneralSans",
                  color: "#311715",
                  margin: 0,
                }}
              >
                Veuillez vous connecter pour effectuer une réservation
              </Typography.Text>
            </Flex>
          </Flex>
        )}

        {/* Reservation form */}
        <Flex
          vertical
          style={{
            ...formStyles.container,
            opacity: user === null ? 0.7 : 1,
            pointerEvents: user === null ? "none" : "auto",
            cursor: user === null ? "not-allowed" : "default",
          }}
        >
          {/* Overlay pour le formulaire désactivé */}
          {user === null && (
            <div
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundColor: "rgba(255, 255, 255, 0.5)",
                zIndex: 1,
                borderRadius: "12px",
                cursor: "not-allowed",
              }}
            />
          )}

          <Typography.Title
            level={3}
            style={{
              fontSize: screenSize.isMobile ? "20px" : "24px",
              fontFamily: "GeneralSans",
              fontWeight: "600",
              color: "#BF2500",
              marginBottom: screenSize.isMobile ? "15px" : "20px",
              borderLeft: "4px solid #BF2500",
              paddingLeft: "15px",
            }}
          >
            Réserver le véhicule
          </Typography.Title>

          <Flex
            vertical={screenSize.isMobile}
            gap={screenSize.isMobile ? 15 : 20}
          >
            {/* Date */}
            <Flex vertical style={{ flex: 1 }}>
              <Typography.Text style={formStyles.label}>Date:</Typography.Text>
              <DatePicker
                value={selectedDate}
                onChange={(date) => setSelectedDate(date)}
                format="DD/MM/YYYY"
                placeholder="Sélectionnez une date"
                suffixIcon={<CalendarOutlined style={{ color: "#BF2500" }} />}
                style={formStyles.input}
                size="large"
                disabled={user === null}
                disabledDate={(current) => {
                  return current && current < dayjs().startOf("day");
                }}
              />
            </Flex>

            {/* Nombre de jours */}
            <Flex vertical style={{ flex: 1 }}>
              <Typography.Text style={formStyles.label}>
                Nombre de jours:
              </Typography.Text>
              <InputNumber
                min={1}
                max={30}
                value={days}
                onChange={(value) =>
                  setDays(typeof value === "number" ? value : 1)
                }
                style={formStyles.input}
                size="large"
                placeholder="Nombre de jours"
                disabled={user === null}
              />
            </Flex>
          </Flex>

          {/* Chauffeur */}
          <Flex vertical style={{ marginTop: 10 }}>
            <Typography.Text style={formStyles.label}>
              Chauffeur:
            </Typography.Text>
            <Switch
              style={{ width: "fit-content" }}
              checked={chauffeur}
              onChange={(v: boolean) => setChauffeur(v)}
            />
          </Flex>

          {/* Prix total */}
          {days && days > 0 && (
            <Flex
              justify="space-between"
              align="center"
              style={{
                marginTop: "20px",
                padding: "15px 20px",
                backgroundColor: "#fff3e0",
                borderRadius: "8px",
                border: "2px solid #F59F00",
              }}
            >
              <Typography.Text
                style={{
                  fontSize: screenSize.isMobile ? "16px" : "18px",
                  fontFamily: "GeneralSans",
                  fontWeight: "600",
                  color: "#311715",
                }}
              >
                Prix total:
              </Typography.Text>
              <Typography.Text
                style={{
                  fontSize: screenSize.isMobile ? "20px" : "24px",
                  fontFamily: "GeneralSans",
                  fontWeight: "700",
                  color: "#BF2500",
                }}
              >
                {totalPrice.toLocaleString("fr-FR")} CFA
              </Typography.Text>
            </Flex>
          )}

          {/* Bouton de réservation */}
          <Flex justify="center" style={{ marginTop: "25px" }}>
            <Button
              type="primary"
              size="large"
              disabled={!isFormValid}
              style={{
                backgroundColor: !isFormValid
                  ? "#d9d9d9"
                  : isHovered
                  ? "#ff3100"
                  : "#F59F00",
                color: !isFormValid ? "#999" : isHovered ? "white" : "black",
                borderRadius: "25px",
                border: "none",
                fontFamily: "GeneralSans",
                transition: "all 0.3s ease",
                fontSize: screenSize.isMobile ? "16px" : "17px",
                fontWeight: "200",
                padding: screenSize.isMobile ? "8px 24px" : "12px 32px",
                height: "auto",
                width: screenSize.isMobile ? "100%" : "auto",
                minWidth: "200px",
                cursor: !isFormValid ? "not-allowed" : "pointer",
                opacity: !isFormValid ? 0.6 : 1,
              }}
              onMouseEnter={() => isFormValid && setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
              onClick={() => {
                // Build PanierVehiculeInfos
                const vehInfo: PanierVehiculeInfos = {
                  _id: v4(),
                  vehicule_id: car._id,
                  price: car.price_per_day,
                  chauffeur: chauffeur,
                  date: (selectedDate || dayjs()).toDate(),
                  jour: days,
                };

                // Add locally to context
                try {
                  addVehiculeToPanier(vehInfo);
                } catch (e) {
                  console.error("Error adding vehicle to panier (local):", e);
                }

                // Persist to backend
                const toSend = addVehicule(panier ?? emptyPanier(), vehInfo);
                PaniersAPI.Add(
                  toSend,
                  (ClientsAPI.GetUser()?._id as string) || ""
                )
                  .then((data) => {
                    console.log("Panier updated with vehicle", data);
                    setPanier(data);
                    // we clear form
                    setSelectedDate(null);
                    setDays(1);
                    setChauffeur(false);
                  })
                  .catch((err) => {
                    console.error("Error updating panier with vehicle", err);
                  });
              }}
            >
              RÉSERVER
            </Button>
          </Flex>
        </Flex>

        {/* Bouton de location
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
              // Build PanierVehiculeInfos
              const vehInfo: PanierVehiculeInfos = {
                _id: v4(),
                vehicule_id: car._id,
                price: car.price_per_day,
                chauffeur: chauffeur,
                date: (selectedDate || dayjs()).toDate(),
                jour: days,
              };

              // Add locally to context
              try {
                addVehiculeToPanier(vehInfo);
              } catch (e) {
                console.error("Error adding vehicle to panier (local):", e);
              }

              // Persist to backend
              const toSend = addVehicule(panier ?? emptyPanier(), vehInfo);
              PaniersAPI.Add(
                toSend,
                (ClientsAPI.GetUser()?._id as string) || ""
              )
                .then((data) => {
                  console.log("Panier updated with vehicle", data);
                  setPanier(data);
                  navigate("/reservations-vehicules");
                })
                .catch((err) => {
                  console.error("Error updating panier with vehicle", err);
                });
            }}
          >
            {car.availability
              ? "Réserver maintenant"
              : "Véhicule non disponible"}
          </Button>
        </div> */}
      </div>
    </div>
  );
};

const ViewLocation = () => {
  const { id } = useParams();
  const [isMobile, setIsMobile] = useState(false);
  const { pathname } = useLocation();
  const [history, setHistory] = useState<IClientHistory[]>([]);
  const [cars, setCars] = useState<ICarRentalData[]>([]);

  const [car, setCar] = useState<ICarRentalData | null>(null);

  // Simulate fetching car data based on the ID
  // const cars = createExampleCars();

  useEffect(() => {
    VehiculesAPI.GetByID(id as string)
      .then((data) => {
        setCar(data);
        console.log("Vehicule fetched successfully:", data);
        const newElement: IClientHistory = {
          _id: data._id,
          type: "location",
          lien: pathname,
        };
        ClientsAPI.AddToClientHistoryLocal(newElement);
        // .then((_) => {
        //   console.log("History added");
        // })
        // .catch((err) => {
        //   console.error("History added not added", err);
        // });
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

  useEffect(() => {
    VehiculesAPI.List()
      .then((data) => {
        setCars(data.filter((h) => h._id != id));
        console.log("Cars fetched successfully:", data);
      })
      .catch((err) => {
        console.error("Error fetching cars:", err);
      });
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
  }, [id]);

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
        <SimilarSelling items={cars} type="location" maxItems={4} />
        <CrossSelling history={history} maxItems={5} />
      </Flex>

      {/* Footer */}
      <Footer />
    </Flex>
  );
};

export default ViewLocation;
