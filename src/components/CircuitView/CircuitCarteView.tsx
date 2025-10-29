import { Button, Divider, Flex, Typography, DatePicker, Select, Switch } from "antd";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import NavBar from "../navBar/navBar";
import Footer from "../footer/footer";
import { useState, useEffect, useMemo } from "react";
import BeginningButton from "../dededed/BeginingButton";
import {
  DetailedTimeline,
  InclusNonInclusComponent,
  useScreenSize,
} from "./Timeline";
import { VillesAPI } from "../../sdk/api/villes";
import { emptyIVille, IVille } from "../../sdk/models/villes";
import { emptyIPageMedia, IPageMedia } from "../../sdk/models/pagesMedias";
import { PageSettings } from "../../sdk/api/pageMedias";
import { HandleGetFileLink } from "../../pages/Circuits/CircuitsCartes";
import CrossSelling, { IClientHistory } from "../dededed/crossSelling";
import { ClientsAPI } from "../../sdk/api/clients";
import { CalendarOutlined, UserOutlined } from "@ant-design/icons";
import { usePanier } from "../../context/panierContext";
import { addCircuit, PanierCircuitInfos } from "../../sdk/models/panier";
import PaniersAPI from "../../sdk/api/panier";
import { v4 } from "uuid";
import dayjs, { Dayjs } from "dayjs";


interface VilleCardOtherProps {
  ville: IVille;
  isSelected: boolean;
  onHover: (villeId: string) => void;
  showDivider: boolean;
  isMobile: boolean;
}

const VilleOtherCard: React.FC<VilleCardOtherProps> = ({
  ville,
  isSelected,
  onHover,
  showDivider,
  isMobile,
}) => {
  const navigate = useNavigate();

  return (
    <Flex
      vertical
      style={{ backgroundColor: "white" }}
      onClick={() => navigate(`/circuits-a-la-carte/${ville._id}`)}
      onMouseEnter={() => onHover(ville._id)}
      onMouseLeave={() => onHover("")}
    >
      {/* Contenu principal du circuit */}
      <Flex
        justify="space-between"
        align="center"
        style={{
          width: "100%",
          backgroundColor: "white",
          padding: isMobile ? "12px" : "24px",
          borderRadius: "0.3rem",
          cursor: "pointer",
          height: isSelected ? "100%" : isMobile ? "80px" : "120px",
        }}
        onMouseEnter={() => onHover(ville._id)}
      >
        <Flex vertical>
          <Typography.Title
            level={2}
            style={{
              color: isSelected ? "#BF2500" : "#411E1C",
              fontSize: isMobile ? "26px" : "58px",
              fontFamily: "DragonAngled",
              fontWeight: "300",
              paddingLeft: isMobile ? "8px" : "24px",
              margin: "0",
              lineHeight: isMobile ? "1.2" : "1.4",
              transition: "all 0.5s ease",
            }}
          >
            {ville.name}
          </Typography.Title>
          {isSelected && (
            <Typography
              style={{
                color: "#311715",
                fontSize: isMobile ? "26px" : "18px",
                paddingLeft: isMobile ? "8px" : "25px",
                fontFamily: "GeneralSans",
                fontWeight: "300",
              }}
            >
              {ville.description}
            </Typography>
          )}
        </Flex>

        {/* Image affichée uniquement pour le circuit sélectionné */}
        {isSelected && (
          <img
            src={HandleGetFileLink(ville.image[0].file as string)}
            style={{
              height: isMobile ? "5rem" : "15rem",
              width: "auto",
              paddingRight: isMobile ? "16px" : "64px",
              maxWidth: isMobile ? "40vw" : "30vw",
              position: "relative",
              bottom:
                ville._id === "circuit-signature"
                  ? isMobile
                    ? "2vh"
                    : "4vh"
                  : "0",
            }}
            className="Accueil_image_2"
            alt={`${ville.name} Logo`}
          />
        )}
      </Flex>

      {/* Divider affiché uniquement si le circuit n'est pas sélectionné */}
      {!isSelected && showDivider && <Divider size="large" />}
    </Flex>
  );
};

export const CircuitCarteView = () => {
  const { id } = useParams();
  const [isMobile, setIsMobile] = useState(false);
  const { pathname } = useLocation();
  const [selectedCircuitId, setSelectedCircuitId] = useState<string>("");
  const [ville, setVille] = useState<IVille>(emptyIVille());
  const [villes, setVilles] = useState<IVille[]>([]);
  const [isHovered, setIsHovered] = useState(false);
  const { panier, setPanier, addCircuitToPanier } = usePanier();
  const [loading, setLoading] = useState<boolean>(true);
  const screenSize = useScreenSize();
  const [loadingSettgins, setLoadingSettgins] = useState<boolean>(true);
  const [settings, setSettings] = useState<IPageMedia>(emptyIPageMedia());
  const [history, setHistory] = useState<IClientHistory[]>([]);

  // Reservation form state (copied from CircuitView)
  const [selectedDate, setSelectedDate] = useState<Dayjs | null>(null);
  const [participants, setParticipants] = useState<number | null>(null);
  const [chauffeur, setChauffeur] = useState<boolean>(false);

  const isFormValid = selectedDate !== null && participants !== null && participants > 0;

  const computePriceForN = (n: number) => {
    if (!n || !ville.price) return 0;
    const base = ville.price || 0;
    // For 1 participant, price = base. For more: base + base*0.25*(n-1)
    let total = n === 1 ? base : base + base * 0.25 * (n - 1);
    // If chauffeur required, add first vehicule_tarification price if present
    const vehPrice = (ville.vehicule_tarification && ville.vehicule_tarification[0] && ville.vehicule_tarification[0].price) || 0;
    if (chauffeur) total += vehPrice;
    return Math.round(total);
  };

  const vehiculePrice = (ville.vehicule_tarification && ville.vehicule_tarification[0] && ville.vehicule_tarification[0].price) || 0;

  const totalPrice = useMemo(() => {
    if (!participants) return 0;
    return computePriceForN(participants);
  }, [participants, ville.price, chauffeur, ville.vehicule_tarification]);

  const circuitCardStyles = useMemo(() => {
    if (screenSize.isMobile) {
      return {
        badgeMargin: "1vh 0 0 0",
        badgePadding: "8px 16px",
        badgeFontSize: "12px",
        height: "auto",
        padding: "16px",
        titleFontSize: "22px",
        subtitleFontSize: "14px",
        titlePadding: "0",
        subtitlePadding: "0",
      };
    } else if (screenSize.isTablet) {
      return {
        badgeMargin: "1.5vh 0 0 2vw",
        badgePadding: "10px 20px",
        badgeFontSize: "14px",
        height: "fit-content",
        padding: "20px",
        titleFontSize: "40px",
        subtitleFontSize: "16px",
        titlePadding: "16px",
        subtitlePadding: "17px",
      };
    } else {
      return {
        badgeMargin: "2vh 0 0 3vw",
        badgePadding: "12px 24px",
        badgeFontSize: "16px",
        height: "fit-content",
        padding: "24px",
        titleFontSize: "58px",
        subtitleFontSize: "18px",
        titlePadding: "24px",
        subtitlePadding: "25px",
      };
    }
  }, [screenSize]);

  const handleCircuitHover = (circuitId: string) => {
    setSelectedCircuitId(circuitId);
  };

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  useEffect(() => {
    PageSettings.List()
      .then((data) => {
        console.log("the settings are:", data);
        setSettings(data);
        setLoadingSettgins(false);
      })
      .catch((err) => {
        console.error("Error fetching circuits:", err);
      });
  }, []);

  useEffect(() => {
    VillesAPI.GetByID(id || "")
      .then((data) => {
        console.log("Fetched ville:", data);
        setVille(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching ville:", err);
      });
  }, [pathname]);

  useEffect(() => {
    VillesAPI.List()
      .then((data) => {
        console.log("Fetched villes:", data);
        setVilles(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching ville:", err);
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
      
      {/* Header avec NavBar */}
      <div className="relative z-20 flex items-center justify-center">
        <NavBar menu="CIRCUITS" />
      </div>

      {/* Section héros - Responsive */}
      {!loadingSettgins && !loading && (
        <Flex
          vertical
          style={{
            position: "relative",
            overflow: "hidden",
            padding: isMobile ? "4vh 6vw" : "8vh 8vw",
            paddingBottom: isMobile ? "10vh" : "20vh",
            backgroundColor: "#FEF1D9", // Fallback background
          }}
        >
          {/* Optimized Video Background */}
          <video
            autoPlay
            loop
            muted
            playsInline
            preload="auto" // Ensures early loading
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              objectFit: "cover",
              zIndex: 0,
            }}
            onError={(e) => {
              console.error("Video error:", e);
            }}
          >
            <source
              src={HandleGetFileLink(ville.video[0].file as string)}
              type="video/mp4"
            />
            Your browser does not support the video tag.
          </video>

          {/* Content Layer */}
          <Flex
            style={{
              maxWidth: "1050px",
              width: "100%",
              margin: "0 auto",
              zIndex: 1,
            }}
          >
            <Flex vertical>
              <Typography.Text
                style={{
                  color: "white",
                  fontSize: isMobile ? "12px" : "16px",
                  lineHeight: "1.1",
                  margin: "0",
                  textTransform: "uppercase",
                  fontFamily: "GeneralSans",
                  letterSpacing: "0.3em",
                }}
              >
                CIRCUITS à la carte
              </Typography.Text>
              <Typography.Title
                level={1}
                style={{
                  color: "#FF3100",
                  fontSize: isMobile ? "44px" : "85px",
                  fontWeight: "900",
                  lineHeight: "1.1",
                  letterSpacing: "0.03em",
                  margin: "0",
                  fontFamily: "DragonAngled",
                }}
              >
                {settings.carte_title}
              </Typography.Title>
              <Typography.Text
                style={{
                  color: "#FFFFFF",
                  fontSize: isMobile ? "44px" : "44px",
                  lineHeight: isMobile ? "1.3" : "1",
                  marginTop: "0",
                  fontFamily: "DragonAngled",
                }}
              >
                {settings.carte_subtitle}
              </Typography.Text>
            </Flex>
          </Flex>
        </Flex>
      )}

      {/* Contenu principal - Responsive */}
      {!loading && (
        <Flex
          style={{
            width: "100%",
            paddingBottom: "0vh",
            maxWidth: screenSize.isMobile ? "100%" : "1100px",
            margin: "0 auto",
            padding: screenSize.isMobile ? "0 16px" : "0",
          }}
          vertical
          gap={screenSize.isMobile ? 20 : screenSize.isTablet ? 35 : 50}
        >
          {/* Section des circuits - Responsive */}
          <Flex
            className="bg-white rounded-lg shadow-md border border-gray-200"
            vertical
            gap="20px"
            style={{
              width: "100%",
              position: "relative",
              bottom: screenSize.isMobile ? "2vw" : "3vw",
              margin: screenSize.isMobile ? "16px 0" : "0",
            }}
          >
            <Flex
              vertical
              style={{ backgroundColor: "white" }}
              className="bg-white rounded-lg shadow-md border border-gray-200 p-6"
            >
              {/* Contenu principal du circuit */}
              <Flex
                justify="space-between"
                align="center"
                vertical={screenSize.isMobile}
                style={{
                  width: "100%",
                  height: screenSize.isMobile
                    ? "auto"
                    : circuitCardStyles.height,
                  backgroundColor: "white",
                  padding: circuitCardStyles.padding,
                  borderRadius: "0.3rem",
                  cursor: "pointer",
                }}
              >
                <Flex
                  vertical
                  style={{ width: screenSize.isMobile ? "100%" : "auto" }}
                >
                  <Typography.Title
                    level={2}
                    style={{
                      color: "#BF2500",
                      fontSize: circuitCardStyles.titleFontSize,
                      fontFamily: "DragonAngled",
                      fontWeight: "300",
                      paddingLeft: circuitCardStyles.titlePadding,
                      margin: "0",
                      lineHeight: screenSize.isMobile ? "1.2" : "1.4",
                      transition: "all 0.5s ease",
                    }}
                  >
                    <span style={{ color: "black" }}>{ville.name}</span>{" "}
                    {screenSize.isMobile ? <br /> : ""}
                  </Typography.Title>
                  <Typography
                    style={{
                      color: "#311715",
                      fontSize: circuitCardStyles.subtitleFontSize,
                      paddingLeft: circuitCardStyles.subtitlePadding,
                      fontFamily: "GeneralSans",
                      fontWeight: "300",
                      marginTop: screenSize.isMobile ? "8px" : "0",
                      lineHeight: "1.4",
                    }}
                  >
                    {ville.full_description}
                  </Typography>
                </Flex>
              </Flex>
            </Flex>
          </Flex>

          {/* Timeline */}
          <Flex style={{ width: "100%" }}>
            <DetailedTimeline
              timelineData={ville.timeline}
              screenSize={screenSize}
            />
          </Flex>

          {/* Formulaire de réservation (inspiré de CircuitView) */}
          <Flex vertical style={{ ...{ backgroundColor: "#f8f9fa", border: "1px solid #e0e0e0", borderRadius: "12px", padding: screenSize.isMobile ? "20px" : "30px", marginBottom: screenSize.isMobile ? "20px" : "30px", position: "relative" }, width: "100%" }}>
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
              Réserver cette offre
            </Typography.Title>

            <Flex vertical={screenSize.isMobile} gap={screenSize.isMobile ? 15 : 20}>
              {/* Date */}
              <Flex vertical style={{ flex: 1 }}>
                <Typography.Text style={{ fontSize: screenSize.isMobile ? "14px" : "16px", fontFamily: "GeneralSans", fontWeight: "500", color: "#311715", marginBottom: "8px" }}>
                  Date:
                </Typography.Text>
                <DatePicker
                  value={selectedDate}
                  onChange={(date) => setSelectedDate(date)}
                  format="DD/MM/YYYY"
                  placeholder="Sélectionnez une date"
                  suffixIcon={<CalendarOutlined style={{ color: "#BF2500" }} />}
                  style={{ width: "100%", height: screenSize.isMobile ? "45px" : "50px", borderRadius: "8px", fontSize: screenSize.isMobile ? "14px" : "16px", fontFamily: "GeneralSans" }}
                  size="large"
                  disabledDate={(current) => {
                    return current && current < dayjs().startOf("day");
                  }}
                />
              </Flex>

              {/* Participants */}
              <Flex vertical style={{ flex: 1 }}>
                <Typography.Text style={{ fontSize: screenSize.isMobile ? "14px" : "16px", fontFamily: "GeneralSans", fontWeight: "500", color: "#311715", marginBottom: "8px" }}>
                  Nombre de participants:
                </Typography.Text>
                <Select
                  value={participants}
                  onChange={(value) => setParticipants(value)}
                  style={{ width: "100%", height: screenSize.isMobile ? "45px" : "50px", borderRadius: "8px", fontSize: screenSize.isMobile ? "14px" : "16px", fontFamily: "GeneralSans" }}
                  size="large"
                  placeholder="Sélectionnez le nombre"
                  suffixIcon={<UserOutlined style={{ color: "#BF2500" }} />}
                >
                  {[...Array(5)].map((_, i) => {
                    const n = i + 1;
                    const priceForN = computePriceForN(n);
                    const perPerson = n > 0 ? Math.round(priceForN / n) : 0;
                    return (
                      <Select.Option key={n} value={n}>
                        {n} {n === 1 ? "participant" : "participants"} — {priceForN.toLocaleString("fr-FR")} CFA — ({perPerson.toLocaleString("fr-FR")} / pers.)
                      </Select.Option>
                    );
                  })}
                </Select>

                <div className="mt-3 flex items-center justify-between">
                  <div>
                    <Typography.Text style={{ fontSize: "14px", color: "#311715", marginRight: "8px" }}>
                      Avec transport (véhicule, chauffeur, carburant)
                    </Typography.Text>
                    {vehiculePrice > 0 && (
                      <Typography.Text style={{ fontSize: "13px", color: "#666", display: "block", marginTop: "4px" }}>
                        Prix véhicule: {vehiculePrice.toLocaleString("fr-FR")} CFA
                      </Typography.Text>
                    )}
                  </div>
                  <Switch checked={chauffeur} onChange={(val) => setChauffeur(val)} />
                </div>
              </Flex>
            </Flex>

            {/* Prix total */}
            {participants && participants > 0 && (
              <Flex justify="space-between" align="center" style={{ marginTop: "20px", padding: "15px 20px", backgroundColor: "#fff3e0", borderRadius: "8px", border: "2px solid #F59F00" }}>
                <Typography.Text style={{ fontSize: screenSize.isMobile ? "16px" : "18px", fontFamily: "GeneralSans", fontWeight: "600", color: "#311715" }}>
                  Prix total:
                </Typography.Text>
                <Typography.Text style={{ fontSize: screenSize.isMobile ? "20px" : "24px", fontFamily: "GeneralSans", fontWeight: "700", color: "#BF2500" }}>
                  {totalPrice.toLocaleString("fr-FR")} CFA
                </Typography.Text>
              </Flex>
            )}

            {/* Bouton réserver */}
            <Flex justify="center" style={{ marginTop: "25px" }}>
              <Button
                type="primary"
                size="large"
                disabled={!isFormValid}
                style={{
                  backgroundColor: !isFormValid ? "#d9d9d9" : isHovered ? "#ff3100" : "#F59F00",
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
                  // handle reservation similar to CircuitView
                  if (!isFormValid) return;

                  const circuitReservationInfos: PanierCircuitInfos = {
                    _id: v4(),
                    circuit_type: "carte",
                    circuit_id: ville._id,
                    price: totalPrice,
                    date: selectedDate!.toDate(),
                    participants: participants!,
                    villes: [],
                    chauffeur: chauffeur,
                  };

                  addCircuitToPanier(circuitReservationInfos);

                  // persist backend only when user is logged in
                  const toSend = addCircuit(panier, circuitReservationInfos);
                  const userId = (ClientsAPI.GetUser()?._id as string) || "";
                  if (userId) {
                    PaniersAPI.Add(toSend, userId)
                      .then((data) => {
                        console.log("Panier updated with circuit a la carte", data);
                        setPanier(data);
                      })
                      .catch((err) => {
                        console.error("Error updating panier with circuit a la carte", err);
                      });
                  }
                }}
              >
                RÉSERVER
              </Button>
            </Flex>
          </Flex>

          {/* Section Inclus/Non Inclus */}
          <Flex style={{ width: "100%", paddingBottom: "60px" }}>
            <InclusNonInclusComponent
              inclus={ville.inclus}
              nonInclus={ville.exclus}
              screenSize={screenSize}
            />
          </Flex>
        </Flex>
      )}

      <CrossSelling history={history} maxItems={5} />

      {/* Section autres circuits - Responsive */}
      <Flex style={{ backgroundColor: "#411E1C" }}>
        <Flex
          vertical
          gap="20px"
          style={{ width: "100%", maxWidth: "1300px", margin: "0 auto" }}
        >
          <Typography.Title
            level={1}
            style={{
              color: "white",
              fontFamily: "DragonAngled",
              padding: isMobile ? "1vw" : "3vw 0 0vw 1vw",
              fontSize: isMobile ? "24px" : "68px",
              fontWeight: "800",
            }}
          >
            Autres villes
          </Typography.Title>
          <Flex
            vertical
            gap="10px"
            style={{
              width: "100%",
              padding: isMobile ? "0 4vw" : "0",
              paddingBottom: isMobile ? "4vw" : "7vw",
            }}
          >
            {villes
              .filter((ville) => ville._id !== id)
              .map((ville, index) => (
                <VilleOtherCard
                  key={ville._id}
                  ville={ville}
                  isSelected={selectedCircuitId === ville._id}
                  onHover={handleCircuitHover}
                  showDivider={index < villes.length - 1}
                  isMobile={isMobile}
                />
              ))}
          </Flex>
        </Flex>
      </Flex>

      {/* Footer */}
      <Footer />
    </Flex>
  );
};

export default CircuitCarteView;
