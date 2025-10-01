import { useEffect, useState } from "react";
import {
  Star,
  MapPin,
  Clock,
  Users,
  Calendar,
  Shield,
  ChevronLeft,
  ChevronRight,
  Check,
  X,
  Info,
  Globe,
  Zap,
} from "lucide-react";
import { useLocation, useParams } from "react-router-dom";
import { AttractionsAPI } from "../../sdk/api/attraction";
import { emptyIAttraction, IAttraction } from "../../sdk/models/attraction";
import { HandleGetFileLink } from "../Circuits/CircuitsCartes";
import { Flex, Typography } from "antd";
import BeginningButton from "../../components/dededed/BeginingButton";
import NavBar from "../../components/navBar/navBar";
import Footer from "../../components/footer/footer";
import attractionImg from "/images/attraction.jpg";
import { IClientHistory } from "../../sdk/models/clients";
import { ClientsAPI } from "../../sdk/api/clients";
import SimilarSelling from "../../components/dededed/similarSelling";
import CrossSelling from "../../components/dededed/crossSelling";

const AttractionDetailPage = () => {
  const { id } = useParams();
  const { pathname } = useLocation();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [selectedDate, setSelectedDate] = useState("2024-12-15");
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string>("");
  const [selectedTarification, setSelectedTarification] = useState<string>("");
  const [participants, setParticipants] = useState(2);
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);
  const [attraction, setAttraction] = useState<IAttraction>(emptyIAttraction());
  const [history, setHistory] = useState<IClientHistory[]>([]);
  const [attractions, setAttractions] = useState<IAttraction[]>([]);

  useEffect(() => {
    AttractionsAPI.GetByID(id as string)
      .then((data) => {
        setAttraction(data);
        const newElement: IClientHistory = {
          _id: data._id,
          type: "attraction",
          lien: pathname,
        };
        ClientsAPI.AddToClientHistoryLocal(newElement);
          // .then((_) => {
          //   console.log("History added");
          // })
          // .catch((err) => {
          //   console.error("History added not added", err);
          // });
        // Sélectionner automatiquement la première tarification si disponible
        if (data.price && data.price.length > 0) {
          setSelectedTarification(data.price[0]._id);
        }
        console.log("Attraction fetched successfully:", data);
      })
      .catch((err) => {
        console.error("Error fetching attraction:", err);
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
    AttractionsAPI.List()
      .then((data) => {
        console.log("the attractions are:", data);
        setAttractions(data.filter((h) => h._id != id));
      })
      .catch((err) => {
        console.error("Error fetching attractions:", err);
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

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % attraction.images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex(
      (prev) => (prev - 1 + attraction.images.length) % attraction.images.length
    );
  };

  // Calculer le prix actuel basé sur la tarification sélectionnée
  const getCurrentPrice = (): number => {
    if (!selectedTarification || !attraction.price.length) return 0;
    const selectedTarif = attraction.price.find(
      (tarif) => tarif._id === selectedTarification
    );
    return selectedTarif ? selectedTarif.price : attraction.price[0].price;
  };

  // Calculer le prix total
  const totalPrice = getCurrentPrice() * participants;

  // Obtenir le prix minimum pour l'affichage principal
  const getMinPrice = (): number => {
    if (!attraction.price.length) return 0;
    return Math.min(...attraction.price.map((tarif) => tarif.price));
  };

  return (
    <Flex justify="center" vertical>
      <BeginningButton />
      {/* Header avec NavBar */}
      <div className="relative z-20 flex items-center justify-center">
        <NavBar menu="ATTRACTION" />
      </div>

      <Flex
        vertical
        className="relative w-full overflow-hidden"
        style={{
          backgroundImage: `url(${attractionImg})`,
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
            maxWidth: "1250px",
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
              Découvrez des expériences inoubliables
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
              Explorez les meilleures attractions et activités près de chez vous
            </Typography.Text>
          </Flex>
        </Flex>
      </Flex>

      {/* Contenu principal */}
      <Flex
        vertical
        style={{
          maxWidth: "1250px",
          width: "100%",
          margin: "0 auto",
          zIndex: 1,
        }}
      >
        <div className="min-h-screen w-full">
          {/* Header avec image et galerie */}
          <div className="relative h-96 md:h-[500px] overflow-hidden">
            {attraction.images.length > 0 && (
              <img
                src={HandleGetFileLink(
                  attraction.images[currentImageIndex].file as string
                )}
                alt={attraction.title}
                className="w-full h-full object-cover"
              />
            )}

            {/* Overlay gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>

            {/* Navigation des images */}
            {attraction.images.length > 1 && (
              <>
                <button
                  onClick={prevImage}
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full transition-colors"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>
                <button
                  onClick={nextImage}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full transition-colors"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>

                {/* Indicateurs d'image */}
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
                  {attraction.images.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      className={`w-2 h-2 rounded-full transition-colors ${
                        index === currentImageIndex ? "bg-white" : "bg-white/50"
                      }`}
                    />
                  ))}
                </div>
              </>
            )}
          </div>

          <div className="container mx-auto px-4 py-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Contenu principal */}
              <div className="lg:col-span-2">
                {/* Titre et infos de base */}
                <div className="bg-white rounded-2xl p-6 mb-6 shadow-sm">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <span className="bg-blue-100 text-blue-800 text-sm font-medium px-3 py-1 rounded-full">
                        {attraction.category}
                      </span>
                      <h1 className="text-3xl font-bold text-gray-800 mt-3 mb-4">
                        {attraction.title}
                      </h1>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-6 text-gray-600 mb-6">
                    <div className="flex items-center gap-2">
                      <Star className="w-5 h-5 text-yellow-400 fill-current" />
                      <span className="font-semibold text-gray-800">
                        {attraction.rating}
                      </span>
                      <span>({attraction.reviewCount} avis)</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="w-5 h-5" />
                      <span>{attraction.location}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-5 h-5" />
                      <span>{attraction.duration}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Users className="w-5 h-5" />
                      <span>Jusqu'à {attraction.groupSize} personnes</span>
                    </div>
                  </div>

                  {/* Langues disponibles */}
                  {attraction.languages.length > 0 && (
                    <div className="flex items-center gap-2 mb-6">
                      <Globe className="w-5 h-5 text-gray-500" />
                      <span className="text-gray-600">Disponible en:</span>
                      <div className="flex gap-2">
                        {attraction.languages.map((lang) => (
                          <span
                            key={lang}
                            className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-sm"
                          >
                            {lang}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Description */}
                <div className="bg-white rounded-2xl p-6 mb-6 shadow-sm">
                  <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                    <Zap className="w-5 h-5 text-yellow-500" />
                    Description
                  </h3>
                  <div className="text-gray-700 whitespace-pre-line">
                    {attraction.description}
                  </div>
                </div>

                {/* Inclus / Non inclus */}
                {(attraction.includes.length > 0 ||
                  attraction.notIncludes.length > 0) && (
                  <div className="bg-white rounded-2xl p-6 mb-6 shadow-sm">
                    <h3 className="text-xl font-bold mb-4">
                      Ce qui est inclus
                    </h3>
                    <div className="grid md:grid-cols-2 gap-6">
                      {attraction.includes.length > 0 && (
                        <div>
                          <h4 className="font-semibold text-green-600 mb-3 flex items-center gap-2">
                            <Check className="w-4 h-4" />
                            Inclus
                          </h4>
                          <div className="space-y-2">
                            {attraction.includes.map((item, index) => (
                              <div
                                key={index}
                                className="flex items-start gap-2"
                              >
                                <Check className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                                <span className="text-sm text-gray-700">
                                  {item.title}
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                      {attraction.notIncludes.length > 0 && (
                        <div>
                          <h4 className="font-semibold text-red-600 mb-3 flex items-center gap-2">
                            <X className="w-4 h-4" />
                            Non inclus
                          </h4>
                          <div className="space-y-2">
                            {attraction.notIncludes.map((item, index) => (
                              <div
                                key={index}
                                className="flex items-start gap-2"
                              >
                                <X className="w-4 h-4 text-red-500 mt-0.5 flex-shrink-0" />
                                <span className="text-sm text-gray-700">
                                  {item.title}
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* Informations pratiques */}
                <div className="bg-white rounded-2xl p-6 mb-6 shadow-sm">
                  <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                    <Info className="w-5 h-5 text-blue-500" />
                    Informations pratiques
                  </h3>
                  <div className="space-y-4">
                    {attraction.meetingPoint && (
                      <div>
                        <h4 className="font-semibold mb-2">
                          Point de rendez-vous
                        </h4>
                        <p className="text-gray-700">
                          {attraction.meetingPoint}
                        </p>
                      </div>
                    )}
                    {attraction.cancellation && (
                      <div>
                        <h4 className="font-semibold mb-2 flex items-center gap-2">
                          <Shield className="w-4 h-4 text-green-500" />
                          Politique d'annulation
                        </h4>
                        <p className="text-gray-700">
                          {attraction.cancellation}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Sidebar de réservation */}
              <div className="lg:col-span-1">
                <div className="bg-white rounded-2xl p-6 shadow-lg sticky top-4">
                  <div className="mb-6">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-3xl font-bold text-blue-600">
                        À partir de {getMinPrice()}€
                      </span>
                    </div>
                    <p className="text-gray-600 text-sm">par personne</p>
                  </div>

                  {/* Sélection du type de tarification */}
                  {attraction.price.length > 0 && (
                    <div className="mb-4">
                      <label className="block text-sm font-semibold mb-2">
                        Type de tarification
                      </label>
                      <div className="space-y-2">
                        {attraction.price.map((tarif) => (
                          <div
                            key={tarif._id}
                            className={`border rounded-xl p-3 cursor-pointer transition-colors ${
                              selectedTarification === tarif._id
                                ? "border-blue-500 bg-blue-50"
                                : "border-gray-200 hover:border-gray-300"
                            }`}
                            onClick={() => setSelectedTarification(tarif._id)}
                          >
                            <div className="flex justify-between items-start">
                              <div className="flex-1">
                                <h4 className="font-medium text-gray-900">
                                  {tarif.title}
                                </h4>
                                {tarif.description && (
                                  <p className="text-sm text-gray-600 mt-1">
                                    {tarif.description}
                                  </p>
                                )}
                              </div>
                              <div className="text-right ml-3">
                                <span className="font-bold text-lg text-blue-600">
                                  {tarif.price}€
                                </span>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Sélection de date */}
                  <div className="mb-4">
                    <label className="block text-sm font-semibold mb-2">
                      Date
                    </label>
                    <div className="relative">
                      <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                      <input
                        type="date"
                        value={selectedDate}
                        onChange={(e) => setSelectedDate(e.target.value)}
                        className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                  </div>

                  {/* Créneaux horaires */}
                  {attraction.timeSlots.length > 0 && (
                    <div className="mb-4">
                      <label className="block text-sm font-semibold mb-2">
                        Heure
                      </label>
                      <div className="grid grid-cols-2 gap-2">
                        {attraction.timeSlots.map((slot) => (
                          <button
                            key={slot._id}
                            onClick={() => setSelectedTimeSlot(slot._id)}
                            className={`p-3 text-sm rounded-lg border transition-colors ${
                              selectedTimeSlot === slot._id
                                ? "border-blue-500 bg-blue-50 text-blue-700"
                                : "border-gray-200 hover:border-gray-300"
                            }`}
                          >
                            <div className="font-medium">{slot.time}</div>
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Nombre de participants */}
                  <div className="mb-6">
                    <label className="block text-sm font-semibold mb-2">
                      Participants
                    </label>
                    <div className="flex items-center border border-gray-200 rounded-xl">
                      <button
                        onClick={() =>
                          setParticipants(Math.max(1, participants - 1))
                        }
                        className="p-3 hover:bg-gray-50 rounded-l-xl"
                      >
                        -
                      </button>
                      <span className="flex-1 text-center py-3 font-semibold">
                        {participants}
                      </span>
                      <button
                        onClick={() => setParticipants(participants + 1)}
                        className="p-3 hover:bg-gray-50 rounded-r-xl"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  {/* Prix total */}
                  {selectedTarification && (
                    <div className="border-t pt-4 mb-6">
                      <div className="flex justify-between items-center mb-2">
                        <span>Prix par personne</span>
                        <span>{getCurrentPrice()}€</span>
                      </div>
                      <div className="flex justify-between items-center mb-2">
                        <span>Participants × {participants}</span>
                        <span>{totalPrice}€</span>
                      </div>
                      <div className="flex justify-between items-center font-bold text-lg border-t pt-2">
                        <span>Total</span>
                        <span className="text-blue-600">{totalPrice}€</span>
                      </div>
                    </div>
                  )}

                  {/* Bouton de réservation */}
                  <button
                    disabled={
                      !selectedTarification ||
                      (attraction.timeSlots.length > 0 && !selectedTimeSlot)
                    }
                    className={`w-full py-4 rounded-xl font-bold text-lg transition-all duration-300 ${
                      selectedTarification &&
                      (attraction.timeSlots.length === 0 || selectedTimeSlot)
                        ? "bg-[#f59f00] text-white hover:from-blue-700 hover:to-purple-700 shadow-lg hover:shadow-xl"
                        : "bg-gray-200 text-gray-500 cursor-not-allowed"
                    }`}
                  >
                    {!selectedTarification
                      ? "Sélectionnez une tarification"
                      : attraction.timeSlots.length > 0 && !selectedTimeSlot
                      ? "Sélectionnez un créneau"
                      : "Réserver maintenant"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <SimilarSelling items={attractions} type="attraction" maxItems={4} />
        <CrossSelling history={history} maxItems={5} />
      </Flex>

      {/* Footer */}
      <Footer />
    </Flex>
  );
};

export default AttractionDetailPage;
