import React, { useState, useEffect } from "react";
import {
  MapPin,
  Users,
  Calendar,
  Clock,
  Car,
  ArrowRight,
  CheckCircle,
} from "lucide-react";
import { Button, Flex, Typography } from "antd";
import BeginningButton from "../../components/dededed/BeginingButton";
import NavBar from "../../components/navBar/navBar";
import Footer from "../../components/footer/footer";
import {
  emptyIPageMedia,
  IPageMedia,
  ITransferDestination,
} from "../../sdk/models/pagesMedias";
import { PageSettings } from "../../sdk/api/pageMedias";
import { HandleGetFileLink } from "../Circuits/CircuitsCartes";

import { ClientsAPI } from "../../sdk/api/clients";
import { usePanier } from "../../context/panierContext";
import {
  PanierTransferInfos,
  addTransfer,
  emptyPanier,
} from "../../sdk/models/panier";
import PaniersAPI from "../../sdk/api/panier";
import { v4 } from "uuid";
import CrossSelling from "../../components/dededed/crossSelling";
import { IClientHistory } from "../../sdk/models/clients";

// no UI lock icon needed when anonymous booking is allowed

const Transferts: React.FC = () => {
  // const [messageApi] = message.useMessage();
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);
  const [selectedDestination, setSelectedDestination] = useState<string>("");
  const [passengers, setPassengers] = useState<number>(1);
  const [date, setDate] = useState<string>("");
  const [time, setTime] = useState<string>("");
  const [vehicleType, setVehicleType] = useState<string>("");
  const [transferType, setTransferType] = useState<string>(
    "airport-to-destination"
  );
  const [flightNumber, setFlightNumber] = useState<string>("");
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [showBookingForm, setShowBookingForm] = useState<boolean>(false);
  const [bookingConfirmed, setBookingConfirmed] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [settings, setSettings] = useState<IPageMedia>(emptyIPageMedia());
  // We don't require a logged-in user to fill the form or confirm a transfer.
  const { panier, addTransferToPanier } = usePanier();
  const [history, setHistory] = useState<IClientHistory[]>([]);

  useEffect(() => {
    window.scrollTo(0, 0);
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

  // backend persistence will be guarded at the moment of saving (ClientsAPI.GetUser())

  useEffect(() => {
    PageSettings.List()
      .then((data) => {
        console.log("the settings are:", data);
        setSettings(data);
        // Définir le premier véhicule comme sélection par défaut
        if (data.transfer_vehicules && data.transfer_vehicules.length > 0) {
          setVehicleType(data.transfer_vehicules[0]._id);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching circuits:", err);
        setLoading(false);
      });
  }, []);

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
    const today = new Date().toISOString().split("T")[0];
    setDate(today);
  }, []);

  const getSelectedDestination = () => {
    return settings.transfer_destinations?.find(
      (dest) => dest._id === selectedDestination
    );
  };

  const getSelectedVehicle = () => {
    return settings.transfer_vehicules?.find(
      (vehicle) => vehicle._id === vehicleType
    );
  };

  const calculatePrice = (): number => {
    const destination = getSelectedDestination();
    if (!destination) return 0;

    const vehicle = getSelectedVehicle();

    if (destination.departement === "Littoral") return 15000;

    return Math.round(destination.distance * (vehicle?.price ?? 0));
  };

  useEffect(() => {
    PageSettings.List()
      .then((data) => {
        console.log("the settings are:", data);
        setSettings(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching circuits:", err);
      });
  }, []);

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
    const today = new Date().toISOString().split("T")[0];
    setDate(today);
  }, []);

  const handleBooking = () => {
    if (!selectedDestination || !date || !time) {
      alert("Veuillez remplir tous les champs obligatoires");
      return;
    }

    if (transferType === "airport-to-destination" && !flightNumber.trim()) {
      alert("Veuillez indiquer votre numéro de vol");
      return;
    }

    if (transferType === "destination-to-airport" && !phoneNumber.trim()) {
      alert("Veuillez indiquer votre numéro de téléphone à destination");
      return;
    }

    setShowBookingForm(true);
  };
  const confirmBooking = async () => {
    // Build panier transfer info and persist to panier before payment
    const transferInfo: PanierTransferInfos = {
      _id: v4(),
      transfer_type: transferType,
      destination: selectedDestination,
      passagers: passengers,
      type_vehicule: vehicleType,
      price: calculatePrice(),
      date: new Date(date),
      time: time,
      numero_vol: flightNumber,
      numero_tel: phoneNumber,
    };

    // Add locally to context
    try {
      addTransferToPanier(transferInfo);
    } catch (e) {
      console.error("Error adding transfer to panier (local):", e);
    }

    // Persist to backend only if user is logged in
    try {
      const toSend = addTransfer(panier ?? emptyPanier(), transferInfo);
      const userId = (ClientsAPI.GetUser()?._id as string) || "";
      if (userId) {
        await PaniersAPI.Add(toSend, userId);
        console.log("Transfer added to panier and persisted");
      } else {
        console.log("Anonymous user: skipping panier persistence for transfer");
      }
    } catch (e) {
      console.error("Error persisting transfer to panier:", e);
    }
  };

  if (bookingConfirmed) {
    return (
      <Flex justify="center" vertical>
        <BeginningButton />

        {/* Header avec NavBar */}
        <div className="relative z-20 flex items-center justify-center">
          <NavBar menu="TRANSFERT" />
        </div>
        <div className="min-h-screen">
          {!loading && (
            <Flex
              vertical
              className="relative w-full overflow-hidden"
              style={{
                backgroundImage: `url(${HandleGetFileLink(
                  settings.transfert_background[0].file as string
                )})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                padding: isMobile
                  ? "4vh 4vw"
                  : isTablet
                  ? "6vh 6vw"
                  : "8vh 8vw",
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
                    {settings.transfert_title}
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
                    {settings.transfert_subtitle}
                  </Typography.Text>
                </Flex>
              </Flex>
            </Flex>
          )}
          <div className="container mx-auto px-4 py-8">
            <div className="max-w-md mx-auto bg-white rounded-xl shadow-lg p-8 text-center">
              <CheckCircle className="mx-auto mb-4 w-16 h-16 text-green-500" />
              <h2 className="text-2xl font-bold text-gray-800 mb-4">
                Réservation Confirmée !
              </h2>
              <p className="text-gray-600 mb-6">
                Votre transfert{" "}
                {transferType === "airport-to-destination"
                  ? `depuis l'Aéroport International Bernardin Gantin vers ${
                      getSelectedDestination()?.nom
                    }`
                  : `depuis ${
                      getSelectedDestination()?.nom
                    } vers l'Aéroport International Bernardin Gantin`}{" "}
                a été confirmé.
              </p>
              <div className="bg-gray-50 p-4 rounded-lg mb-6">
                <p>
                  <strong>Date:</strong> {date}
                </p>
                <p>
                  <strong>Heure:</strong> {time}
                </p>
                <p>
                  <strong>Passagers:</strong> {passengers}
                </p>
                {transferType === "airport-to-destination" && flightNumber && (
                  <p>
                    <strong>Vol:</strong> {flightNumber}
                  </p>
                )}
                {transferType === "destination-to-airport" && phoneNumber && (
                  <p>
                    <strong>Téléphone à destination:</strong> {phoneNumber}
                  </p>
                )}
                <p>
                  <strong>Prix total:</strong>{" "}
                  {calculatePrice().toLocaleString()} FCFA
                </p>
              </div>
              <button
                onClick={() => {
                  setBookingConfirmed(false);
                  setShowBookingForm(false);
                  setSelectedDestination("");
                  setFlightNumber("");
                  setPhoneNumber("");
                }}
                className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Nouvelle réservation
              </button>
            </div>
          </div>
        </div>

        {/* Footer */}
        <Footer />
      </Flex>
    );
  }

  if (showBookingForm) {
    const destination = getSelectedDestination();
    return (
      <Flex justify="center" vertical>
        <BeginningButton />

        {/* Header avec NavBar */}
        <div className="relative z-20 flex items-center justify-center">
          <NavBar menu="TRANSFERT" />
        </div>
        <div className="min-h-screen">
          {!loading && (
            <Flex
              vertical
              className="relative w-full overflow-hidden"
              style={{
                backgroundImage: `url(${HandleGetFileLink(
                  settings.transfert_background[0].file as string
                )})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                padding: isMobile
                  ? "4vh 4vw"
                  : isTablet
                  ? "6vh 6vw"
                  : "8vh 8vw",
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
                    {settings.transfert_title}
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
                    {settings.transfert_subtitle}
                  </Typography.Text>
                </Flex>
              </Flex>
            </Flex>
          )}

          <div className="container mx-auto px-4 py-8">
            <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">
                Confirmer votre réservation
              </h2>

              <div className="bg-[#fff7ed] p-6 rounded-lg mb-6">
                <div className="flex items-center mb-4">
                  <MapPin className="w-5 h-5 text-[#f59f00] mr-2" />
                  {transferType === "airport-to-destination" ? (
                    <>
                      <span className="font-semibold">
                        Aéroport International Bernardin Gantin
                      </span>
                      <ArrowRight className="w-5 h-5 mx-3 text-gray-400" />
                      <span className="font-semibold">{destination?.nom}</span>
                    </>
                  ) : (
                    <>
                      <span className="font-semibold">{destination?.nom}</span>
                      <ArrowRight className="w-5 h-5 mx-3 text-gray-400" />
                      <span className="font-semibold">
                        Aéroport International Bernardin Gantin
                      </span>
                    </>
                  )}
                </div>

                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-gray-600">Département</p>
                    <p className="font-semibold">{destination?.departement}</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Date</p>
                    <p className="font-semibold">{date}</p>
                  </div>
                  <div>
                    <p className="text-gray-600">Heure</p>
                    <p className="font-semibold">{time}</p>
                  </div>
                  {transferType === "airport-to-destination" &&
                    flightNumber && (
                      <div className="col-span-2">
                        <p className="text-gray-600">Numéro de vol</p>
                        <p className="font-semibold">{flightNumber}</p>
                      </div>
                    )}
                  {transferType === "destination-to-airport" && phoneNumber && (
                    <div className="col-span-2">
                      <p className="text-gray-600">Téléphone à destination</p>
                      <p className="font-semibold">{phoneNumber}</p>
                    </div>
                  )}
                </div>
              </div>

              {/* <div className="mb-6">
                <h3 className="text-lg font-semibold mb-4">
                  Détails de la réservation
                </h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Nom complet *
                    </label>
                    <input
                      type="text"
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Votre nom complet"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Téléphone *
                    </label>
                    <input
                      type="tel"
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="+229 XX XX XX XX"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Email
                    </label>
                    <input
                      type="email"
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="votre@email.com"
                    />
                  </div>
                </div>
              </div> */}

              <div className="bg-gray-50 p-4 rounded-lg mb-6">
                <div className="flex justify-between items-center">
                  <span className="text-lg font-semibold">Prix total</span>
                  <span className="text-2xl font-bold text-[#f59f00]">
                    {calculatePrice().toLocaleString()} FCFA
                  </span>
                </div>
              </div>

              {/* Anonymous reservations allowed — no login banner shown */}

              <div className="flex space-x-4">
                <button
                  onClick={() => setShowBookingForm(false)}
                  className="flex-1 bg-gray-500 text-white py-3 rounded-lg hover:bg-gray-600 transition-colors"
                >
                  Retour
                </button>
                <button
                  onClick={confirmBooking}
                  className={`flex-1 py-3 rounded-lg transition-colors bg-[#f59f00] text-white hover:bg-[#ff3100]`}
                >
                  Confirmer la réservation
                </button>
              </div>
            </div>
          </div>
        </div>
        {/* Footer */}
        <Footer />
      </Flex>
    );
  }

  return (
    <Flex justify="center" vertical>
      <BeginningButton />

      {/* Header avec NavBar */}
      <div className="relative z-20 flex items-center justify-center">
        <NavBar menu="TRANSFERT" />
      </div>
      <div className="min-h-screen">
        {!loading && (
          <Flex
            vertical
            className="relative w-full overflow-hidden"
            style={{
              backgroundImage: `url(${HandleGetFileLink(
                settings.transfert_background[0].file as string
              )})`,
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
                  {settings.transfert_title}
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
                  {settings.transfert_subtitle}
                </Typography.Text>
              </Flex>
            </Flex>
          </Flex>
        )}

        <div className="container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto">
            {/* Formulaire de réservation */}
            <div className="bg-white p-6 mb-8">
              {/* Sélecteur de type de transfert */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">
                  Type de transfert
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div
                    onClick={() => setTransferType("airport-to-destination")}
                    className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                      transferType === "airport-to-destination"
                        ? "border-blue-500 bg-blue-50"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    <div className="flex items-center mb-2">
                      <div
                        className={`w-4 h-4 rounded-full border-2 mr-3 ${
                          transferType === "airport-to-destination"
                            ? "border-blue-500 bg-blue-500"
                            : "border-gray-300"
                        }`}
                      >
                        {transferType === "airport-to-destination" && (
                          <div className="w-2 h-2 bg-white rounded-full mx-auto mt-0.5"></div>
                        )}
                      </div>
                      <h4 className="font-semibold">Aéroport → Destination</h4>
                    </div>
                    <p className="text-sm text-gray-600 ml-7">
                      Transfert depuis l'aéroport vers votre destination
                    </p>
                  </div>

                  <div
                    onClick={() => setTransferType("destination-to-airport")}
                    className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                      transferType === "destination-to-airport"
                        ? "border-blue-500 bg-blue-50"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    <div className="flex items-center mb-2">
                      <div
                        className={`w-4 h-4 rounded-full border-2 mr-3 ${
                          transferType === "destination-to-airport"
                            ? "border-blue-500 bg-blue-500"
                            : "border-gray-300"
                        }`}
                      >
                        {transferType === "destination-to-airport" && (
                          <div className="w-2 h-2 bg-white rounded-full mx-auto mt-0.5"></div>
                        )}
                      </div>
                      <h4 className="font-semibold">Destination → Aéroport</h4>
                    </div>
                    <p className="text-sm text-gray-600 ml-7">
                      Transfert depuis votre lieu de séjour vers l'aéroport
                    </p>
                  </div>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                {/* Points de départ et destination */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <MapPin className="inline w-4 h-4 mr-1" />
                    {transferType === "airport-to-destination"
                      ? "Point de départ"
                      : "Point d'arrivée"}
                  </label>
                  <div className="p-3 bg-gray-100 rounded-lg">
                    <p className="font-semibold">
                      Aéroport International Bernardin Gantin
                    </p>
                    <p className="text-sm text-gray-600">Cotonou, Bénin</p>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <MapPin className="inline w-4 h-4 mr-1" />
                    {transferType === "airport-to-destination"
                      ? "Destination"
                      : "Point de départ"}{" "}
                    *
                  </label>
                  <select
                    value={selectedDestination}
                    onChange={(e) => setSelectedDestination(e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">
                      Choisissez votre{" "}
                      {transferType === "airport-to-destination"
                        ? "destination"
                        : "lieu de départ"}
                    </option>
                    {Object.entries(
                      settings.transfer_destinations.reduce((acc, dest) => {
                        if (!acc[dest.departement]) acc[dest.departement] = [];
                        acc[dest.departement].push(dest);
                        return acc;
                      }, {} as Record<string, ITransferDestination[]>)
                    ).map(([department, dests]) => (
                      <optgroup
                        key={department}
                        label={`Département ${department}`}
                      >
                        {dests.map((dest) => (
                          <option key={dest._id} value={dest._id}>
                            {dest.nom}
                          </option>
                        ))}
                      </optgroup>
                    ))}
                  </select>
                </div>

                {/* Nombre de passagers */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <Users className="inline w-4 h-4 mr-1" />
                    Nombre de passagers
                  </label>
                  <select
                    value={passengers}
                    onChange={(e) => setPassengers(Number(e.target.value))}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                      <option key={num} value={num}>
                        {num} passager{num > 1 ? "s" : ""}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Type de véhicule */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <Car className="inline w-4 h-4 mr-1" />
                    Type de véhicule
                  </label>
                  <select
                    value={vehicleType}
                    onChange={(e) => setVehicleType(e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    {settings.transfer_vehicules.map((vehicle) => (
                      <option key={vehicle._id} value={vehicle._id}>
                        {vehicle.nom} ({vehicle.capacity})
                      </option>
                    ))}
                  </select>
                </div>

                {/* Date */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <Calendar className="inline w-4 h-4 mr-1" />
                    Date *
                  </label>
                  <input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    min={new Date().toISOString().split("T")[0]}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                {/* Heure */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <Clock className="inline w-4 h-4 mr-1" />
                    Heure{" "}
                    {transferType === "airport-to-destination"
                      ? "d'arrivée du vol"
                      : "de départ souhaitée"}{" "}
                    *
                  </label>
                  <input
                    type="time"
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                {/* Informations spécifiques selon le type de transfert */}
                {transferType === "airport-to-destination" ? (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      ✈️ Numéro de vol *
                    </label>
                    <input
                      type="text"
                      value={flightNumber}
                      onChange={(e) => setFlightNumber(e.target.value)}
                      placeholder="Ex: AF 736, TK 536, ET 909..."
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      Nous suivrons votre vol pour ajuster l'heure de prise en
                      charge
                    </p>
                  </div>
                ) : (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      📞 Téléphone à destination *
                    </label>
                    <input
                      type="tel"
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                      placeholder="+229 XX XX XX XX"
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      Numéro où vous joindre le jour du transfert
                    </p>
                  </div>
                )}
              </div>

              {/* Récapitulatif du prix */}
              {selectedDestination && (
                <div className="mt-6 p-4 bg-[#fff7ed] rounded-lg">
                  {/* <div className="flex justify-between items-center mb-2">
                    <span className="text-gray-700">Prix de base</span>
                    <span className="font-semibold">
                      {getSelectedDestination()?.price.toLocaleString()} FCFA
                    </span>
                  </div>
                  {vehicleTypes.find((v) => v.id === vehicleType)
                    ?.multiplier !== 1 && (
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-gray-700">Supplément véhicule</span>
                      <span className="font-semibold">
                        x
                        {
                          vehicleTypes.find((v) => v.id === vehicleType)
                            ?.multiplier
                        }
                      </span>
                    </div>
                  )} */}
                  <hr className="my-2" />
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-bold">Prix total</span>
                    <span className="text-xl font-bold text-[#f59f00]">
                      {calculatePrice().toLocaleString()} FCFA
                    </span>
                  </div>
                </div>
              )}

              <button
                onClick={handleBooking}
                disabled={
                  !selectedDestination ||
                  !date ||
                  !time ||
                  (transferType === "airport-to-destination" &&
                    !flightNumber.trim()) ||
                  (transferType === "destination-to-airport" &&
                    !phoneNumber.trim())
                }
                className="w-full mt-6 bg-[#f59f00] text-white py-3 rounded-lg hover:bg-[#ff3100] transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
              >
                Réserver maintenant
              </button>
            </div>

            {/* Informations sur les tarifs */}
            {/* <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-xl font-bold text-gray-800 mb-4">Tarifs par département</h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {Object.entries(
                destinations.reduce((acc, dest) => {
                  if (!acc[dest.department]) {
                    acc[dest.department] = { price: dest.price, count: 0 };
                  }
                  acc[dest.department].count++;
                  return acc;
                }, {} as Record<string, { price: number; count: number }>)
              ).map(([department, info]) => (
                <div key={department} className="p-4 border border-gray-200 rounded-lg">
                  <h4 className="font-semibold text-gray-800">{department}</h4>
                  <p className="text-blue-600 font-bold">{info.price.toLocaleString()} FCFA</p>
                  <p className="text-sm text-gray-600">{info.count} destination{info.count > 1 ? 's' : ''}</p>
                </div>
              ))}
            </div>
          </div> */}
          </div>
        </div>
      </div>
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

      <Flex>
        <CrossSelling history={history} maxItems={5} />
      </Flex>

      {/* Footer */}
      <Footer />
    </Flex>
  );
};

export default Transferts;
