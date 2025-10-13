import { useState, useEffect } from "react";
import {
  Input,
  Button,
  Card,
  Typography,
  message,
  Radio,
  InputNumber,
  Flex,
  Select,
} from "antd";
import {
  UserOutlined,
  MailOutlined,
  DeleteOutlined,
  ClockCircleOutlined,
  ContactsOutlined,
  EnvironmentOutlined,
  GlobalOutlined,
  BankOutlined,
} from "@ant-design/icons";
import NavBar from "../../components/navBar/navBar";
import { useTransaction } from "../../context/transactionContext";
import { fedaKey } from "../../sdk/api/api";

// Types pour TypeScript
interface FormValues {
  [key: string]: any;
  chauffeur?: string;
  nombreJours?: number;
  email?: string;
  firstName?: string;
  lastName?: string;
  phone?: string;
  address?: string;
  city?: string;
  state?: string;
  country?: string;
  zip?: string;
}

interface FedaPayWindow extends Window {
  FedaPay?: {
    CHECKOUT_COMPLETED: string;
    CHECKOUT_FAILED: string;
    init: (options: any) => void;
    checkout: (options: any) => Promise<any>;
  };
}

const { Title } = Typography;
const { Option } = Select;
/*  */
const ReservationVehicule = () => {
  const [messageApi, contextHolder] = message.useMessage();
  const [formValues, setFormValues] = useState<FormValues>({});
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [_, setIsPaymentModalVisible] = useState(false);
  const { transaction } = useTransaction();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Add responsive window width tracking
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Effet pour définir le titre de la page
  useEffect(() => {
    document.title = "Réservation de Location";
  }, []);

  // Charger le script FedaPay
  useEffect(() => {
    const loadFedaPayScript = () => {
      // Vérifier si le script est déjà chargé
      if ((window as FedaPayWindow).FedaPay) {
        return Promise.resolve();
      }

      return new Promise<void>((resolve, reject) => {
        const script = document.createElement("script");
        script.src = "https://cdn.fedapay.com/checkout.js";
        script.async = true;
        script.onload = () => {
          console.log("FedaPay script loaded successfully");
          resolve();
        };
        script.onerror = () => {
          console.error("Failed to load FedaPay script");
          reject(new Error("Failed to load FedaPay script"));
        };
        document.head.appendChild(script);
      });
    };

    loadFedaPayScript().catch((error) => {
      console.error("Error loading FedaPay:", error);
      messageApi.error("Erreur lors du chargement du système de paiement");
    });
  }, [messageApi]);

  // Helper to get the correct tarification based on nombreJours
  const getTarificationForDays = () => {
    const days = Number(formValues.nombreJours) || 0;
    if (!transaction?.tarification || !Array.isArray(transaction.tarification))
      return null;
    // Find the matching range
    const found = transaction.tarification.find(
      (t: any) => days >= t.from && days <= t.to
    );
    if (found) return found;
    // If days is more than all ranges, return the last element
    if (
      transaction.tarification.length > 0 &&
      days > transaction.tarification[transaction.tarification.length - 1].to
    ) {
      return transaction.tarification[transaction.tarification.length - 1];
    }
    return null;
  };

  const calculateTotalAmount = () => {
    const days = Number(formValues.nombreJours) || 0;
    const tarification = getTarificationForDays();
    if (!tarification) return 0;

    const withDriver = formValues.chauffeur === "true";
    const pricePerDay = withDriver
      ? tarification.price_driver
      : tarification.price;

    return pricePerDay * days;
  };

  // Traitement après un paiement réussi
  const handleReservationSuccess = async (transactionData: any) => {
    try {
      setIsSubmitting(true);
      setIsPaymentModalVisible(false);

      // Préparer les données de réservation
      const reservationData = {
        nombreJours: formValues.nombreJours,
        chauffeur: formValues.chauffeur === "true",
        montantTotal: calculateTotalAmount(),
        item: transaction?.title || "Location",
        paymentData: {
          transaction_id: transactionData.id,
          transaction_reference: transactionData.reference,
          status: transactionData.status,
        },
        customer: {
          email: formValues.email,
          firstName: formValues.firstName,
          lastName: formValues.lastName,
          phone: formValues.phone,
          address: formValues.address,
          city: formValues.city,
          state: formValues.state,
          country: formValues.country,
          zip: formValues.zip,
        },
      };

      console.log("Données de réservation à envoyer:", reservationData);

      // Ici vous pouvez faire l'appel API pour sauvegarder la réservation
      /*
      const response = await axios.post('https://your-api-endpoint.com/api/reservations', reservationData, {
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (response.status >= 200 && response.status < 300) {
        messageApi.success("Réservation enregistrée avec succès!");
        setTimeout(() => {
          // navigate('/confirmation', { state: { reservation: reservationData } });
        }, 2000);
      }
      */

      // Simulation pour la démo
      setTimeout(() => {
        messageApi.info(
          "Réservation enregistrée! Redirection vers la confirmation..."
        );
        // navigate('/confirmation');
      }, 2000);
    } catch (error) {
      console.error(
        "Erreur lors de l'enregistrement de la réservation:",
        error
      );
      messageApi.error("Erreur lors de l'enregistrement de la réservation");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Configuration pour le paiement FedaPay
  const initiateFedaPayment = async () => {
    try {
      const fedaPayWindow = window as FedaPayWindow;

      if (!fedaPayWindow.FedaPay) {
        messageApi.error(
          "Le système de paiement n'est pas encore chargé. Veuillez réessayer."
        );
        return;
      }

      const totalAmount = calculateTotalAmount();

      // Initialiser FedaPay
      fedaPayWindow.FedaPay.init({
        public_key: fedaKey,
        sandbox: true, // Mettre à false en production
      });

      // Configuration de la transaction
      const checkoutOptions = {
        amount: totalAmount,
        currency: "XOF",
        description: `Location de ${transaction?.title} - ${formValues.nombreJours} jour(s)`,
        callback_url: window.location.origin + "/payment-success",
        cancel_url: window.location.origin + "/payment-cancel",
        customer: {
          email: formValues.email || "client@example.com",
          firstname: formValues.firstName || "Client",
          lastname: formValues.lastName || "Location",
          phone_number: formValues.phone || "+22900000000",
        },
        custom_metadata: {
          vehicle: transaction?.title,
          days: formValues.nombreJours,
          with_driver: formValues.chauffeur === "true",
        },
      };

      // Lancer le checkout
      const result = await fedaPayWindow.FedaPay.checkout(checkoutOptions);

      if (result && result.transaction) {
        console.log("Paiement réussi:", result);
        messageApi.success("Paiement effectué avec succès!");
        await handleReservationSuccess(result.transaction);
      }
    } catch (error) {
      console.error("Erreur lors du paiement:", error);
      messageApi.error(
        "Erreur lors du traitement du paiement. Veuillez réessayer."
      );
    }
  };

  // Responsive variables based on screen size
  const isMobile = windowWidth < 768;

  const handleInputChange = (field: string, value: any) => {
    setFormValues({
      ...formValues,
      [field]: value,
    });
  };

  const resetForm = () => {
    setFormValues({});
    setIsPaymentModalVisible(false);
  };

  const handlePayment = () => {
    // Vérifier si les champs obligatoires sont remplis
    const requiredFields = [
      "chauffeur",
      "nombreJours",
      "email",
      "firstName",
      "lastName",
      "phone",
      "address",
      "city",
      "state",
      "country",
      "zip",
    ];

    const missingFields = requiredFields.filter((field) => !formValues[field]);

    if (missingFields.length > 0) {
      messageApi.error("Veuillez remplir tous les champs obligatoires");
      return;
    }

    // Lancer le paiement directement
    initiateFedaPayment();
  };

  // Vérifier si tous les champs sont remplis
  const areAllFieldsValid = () => {
    const requiredFields = [
      "chauffeur",
      "nombreJours",
      "email",
      "firstName",
      "lastName",
      "phone",
      "address",
      "city",
      "state",
      "country",
      "zip",
    ];

    return requiredFields.every((field) => formValues[field]);
  };

  // Get responsive container styles
  const containerStyle = {
    maxWidth: isMobile ? "100%" : "672px",
    margin: "0 auto",
    padding: isMobile ? "8px" : "16px",
    backgroundColor: "#F9FAFB",
  };

  return (
    <>
      <Flex
        justify="center"
        align="center"
        vertical
        style={{ backgroundColor: "#F9FAFB", minHeight: "100vh" }}
      >
        {/* Header avec NavBar */}
        <div className="relative z-20 flex items-center justify-center">
          <NavBar menu="" />
        </div>

        {contextHolder}

        {/* Main content */}
        <div style={containerStyle}>
          <Card
            style={{
              marginBottom: "24px",
              boxShadow: "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
              padding: isMobile ? "8px" : "16px",
            }}
          >
            <Title
              level={isMobile ? 5 : 4}
              style={{
                textAlign: "center",
                marginBottom: isMobile ? "16px" : "24px",
              }}
            >
              Réservation de véhicule
            </Title>

            <div
              style={{
                paddingLeft: isMobile ? "8px" : "16px",
                paddingRight: isMobile ? "8px" : "16px",
              }}
            >
              <div style={{ padding: isMobile ? "4px" : "8px" }}>
                {/* Display location info - always visible */}
                <Card
                  style={{
                    backgroundColor: "#f0f9ff",
                    border: "1px solid #0ea5e9",
                    marginBottom: "24px",
                  }}
                >
                  <div style={{ textAlign: "center" }}>
                    <Title
                      level={4}
                      style={{ color: "#0ea5e9", marginBottom: "8px" }}
                    >
                      Location de {transaction?.title}
                    </Title>
                  </div>
                </Card>

                {/* Formulaire simplifié */}
                <div>
                  {/* Chauffeur */}
                  <div style={{ marginBottom: "24px" }}>
                    <div style={{ display: "flex", marginBottom: "4px" }}>
                      <label
                        style={{
                          fontSize: "14px",
                          fontWeight: "500",
                          color: "#4B5563",
                        }}
                      >
                        Réservation avec chauffeur{" "}
                        <span style={{ color: "#EF4444" }}>*</span>
                      </label>
                    </div>
                    <Radio.Group
                      options={[
                        { label: "Oui", value: "true" },
                        { label: "Non", value: "false" },
                      ]}
                      value={formValues.chauffeur}
                      onChange={(e) =>
                        handleInputChange("chauffeur", e.target.value)
                      }
                      buttonStyle="solid"
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "8px",
                      }}
                    />
                  </div>

                  {/* Nombre de jours */}
                  <div style={{ marginBottom: "24px" }}>
                    <div style={{ display: "flex", marginBottom: "4px" }}>
                      <label
                        style={{
                          fontSize: "14px",
                          fontWeight: "500",
                          color: "#4B5563",
                        }}
                      >
                        Nombre de jours de location{" "}
                        <span style={{ color: "#EF4444" }}>*</span>
                      </label>
                    </div>
                    <InputNumber
                      value={formValues.nombreJours}
                      onChange={(value) =>
                        handleInputChange("nombreJours", value)
                      }
                      placeholder="Nombre de jours"
                      size={isMobile ? "middle" : "large"}
                      style={{ width: "100%" }}
                      min={1}
                      max={365}
                      prefix={<ClockCircleOutlined />}
                    />
                  </div>

                  {/* Section Informations Personnelles */}
                  <Card
                    style={{
                      backgroundColor: "#f8fafc",
                      border: "1px solid #e2e8f0",
                      marginBottom: "24px",
                    }}
                  >
                    <Title
                      level={5}
                      style={{ marginBottom: "16px", color: "#374151" }}
                    >
                      Informations personnelles
                    </Title>

                    {/* Email */}
                    <div style={{ marginBottom: "16px" }}>
                      <div style={{ display: "flex", marginBottom: "4px" }}>
                        <label
                          style={{
                            fontSize: "14px",
                            fontWeight: "500",
                            color: "#4B5563",
                          }}
                        >
                          Adresse email{" "}
                          <span style={{ color: "#EF4444" }}>*</span>
                        </label>
                      </div>
                      <Input
                        value={formValues.email || ""}
                        onChange={(e) =>
                          handleInputChange("email", e.target.value)
                        }
                        placeholder="client@example.com"
                        prefix={<MailOutlined />}
                        size={isMobile ? "middle" : "large"}
                        style={{ width: "100%" }}
                      />
                    </div>

                    {/* Prénom et Nom */}
                    <div
                      style={{
                        display: "flex",
                        gap: "16px",
                        marginBottom: "16px",
                        flexDirection: isMobile ? "column" : "row",
                      }}
                    >
                      <div style={{ flex: 1 }}>
                        <div style={{ display: "flex", marginBottom: "4px" }}>
                          <label
                            style={{
                              fontSize: "14px",
                              fontWeight: "500",
                              color: "#4B5563",
                            }}
                          >
                            Prénom <span style={{ color: "#EF4444" }}>*</span>
                          </label>
                        </div>
                        <Input
                          value={formValues.firstName || ""}
                          onChange={(e) =>
                            handleInputChange("firstName", e.target.value)
                          }
                          placeholder="Jean"
                          prefix={<UserOutlined />}
                          size={isMobile ? "middle" : "large"}
                          style={{ width: "100%" }}
                        />
                      </div>

                      <div style={{ flex: 1 }}>
                        <div style={{ display: "flex", marginBottom: "4px" }}>
                          <label
                            style={{
                              fontSize: "14px",
                              fontWeight: "500",
                              color: "#4B5563",
                            }}
                          >
                            Nom de famille{" "}
                            <span style={{ color: "#EF4444" }}>*</span>
                          </label>
                        </div>
                        <Input
                          value={formValues.lastName || ""}
                          onChange={(e) =>
                            handleInputChange("lastName", e.target.value)
                          }
                          placeholder="Dupont"
                          prefix={<UserOutlined />}
                          size={isMobile ? "middle" : "large"}
                          style={{ width: "100%" }}
                        />
                      </div>
                    </div>

                    {/* Téléphone */}
                    <div style={{ marginBottom: "16px" }}>
                      <div style={{ display: "flex", marginBottom: "4px" }}>
                        <label
                          style={{
                            fontSize: "14px",
                            fontWeight: "500",
                            color: "#4B5563",
                          }}
                        >
                          Numéro de téléphone{" "}
                          <span style={{ color: "#EF4444" }}>*</span>
                        </label>
                      </div>
                      <Input
                        value={formValues.phone || ""}
                        onChange={(e) =>
                          handleInputChange("phone", e.target.value)
                        }
                        placeholder="+22912345678"
                        prefix={<ContactsOutlined />}
                        size={isMobile ? "middle" : "large"}
                        style={{ width: "100%" }}
                      />
                    </div>

                    {/* Adresse */}
                    <div style={{ marginBottom: "16px" }}>
                      <div style={{ display: "flex", marginBottom: "4px" }}>
                        <label
                          style={{
                            fontSize: "14px",
                            fontWeight: "500",
                            color: "#4B5563",
                          }}
                        >
                          Adresse <span style={{ color: "#EF4444" }}>*</span>
                        </label>
                      </div>
                      <Input
                        value={formValues.address || ""}
                        onChange={(e) =>
                          handleInputChange("address", e.target.value)
                        }
                        placeholder="123 rue de Paris"
                        prefix={<BankOutlined />}
                        size={isMobile ? "middle" : "large"}
                        style={{ width: "100%" }}
                      />
                    </div>

                    {/* Ville et Région */}
                    <div
                      style={{
                        display: "flex",
                        gap: "16px",
                        marginBottom: "16px",
                        flexDirection: isMobile ? "column" : "row",
                      }}
                    >
                      <div style={{ flex: 1 }}>
                        <div style={{ display: "flex", marginBottom: "4px" }}>
                          <label
                            style={{
                              fontSize: "14px",
                              fontWeight: "500",
                              color: "#4B5563",
                            }}
                          >
                            Ville <span style={{ color: "#EF4444" }}>*</span>
                          </label>
                        </div>
                        <Input
                          value={formValues.city || ""}
                          onChange={(e) =>
                            handleInputChange("city", e.target.value)
                          }
                          placeholder="Cotonou"
                          prefix={<EnvironmentOutlined />}
                          size={isMobile ? "middle" : "large"}
                          style={{ width: "100%" }}
                        />
                      </div>

                      <div style={{ flex: 1 }}>
                        <div style={{ display: "flex", marginBottom: "4px" }}>
                          <label
                            style={{
                              fontSize: "14px",
                              fontWeight: "500",
                              color: "#4B5563",
                            }}
                          >
                            Région/État{" "}
                            <span style={{ color: "#EF4444" }}>*</span>
                          </label>
                        </div>
                        <Input
                          value={formValues.state || ""}
                          onChange={(e) =>
                            handleInputChange("state", e.target.value)
                          }
                          placeholder="Littoral"
                          prefix={<GlobalOutlined />}
                          size={isMobile ? "middle" : "large"}
                          style={{ width: "100%" }}
                        />
                      </div>
                    </div>

                    {/* Code pays et Code postal */}
                    <div
                      style={{
                        display: "flex",
                        gap: "16px",
                        marginBottom: "16px",
                        flexDirection: isMobile ? "column" : "row",
                      }}
                    >
                      <div style={{ flex: 1 }}>
                        <div style={{ display: "flex", marginBottom: "4px" }}>
                          <label
                            style={{
                              fontSize: "14px",
                              fontWeight: "500",
                              color: "#4B5563",
                            }}
                          >
                            Code pays{" "}
                            <span style={{ color: "#EF4444" }}>*</span>
                          </label>
                        </div>
                        <Select
                          value={formValues.country}
                          onChange={(value) =>
                            handleInputChange("country", value)
                          }
                          placeholder="Sélectionnez votre pays"
                          size={isMobile ? "middle" : "large"}
                          style={{ width: "100%" }}
                          suffixIcon={<GlobalOutlined />}
                        >
                          <Option value="FR">France (FR)</Option>
                          <Option value="BE">Belgique (BE)</Option>
                          <Option value="CH">Suisse (CH)</Option>
                          <Option value="CA">Canada (CA)</Option>
                          <Option value="US">États-Unis (US)</Option>
                          <Option value="DE">Allemagne (DE)</Option>
                          <Option value="ES">Espagne (ES)</Option>
                          <Option value="IT">Italie (IT)</Option>
                          <Option value="GB">Royaume-Uni (GB)</Option>
                          <Option value="BJ">Bénin (BJ)</Option>
                          <Option value="CI">Côte d'Ivoire (CI)</Option>
                          <Option value="SN">Sénégal (SN)</Option>
                          <Option value="ML">Mali (ML)</Option>
                          <Option value="BF">Burkina Faso (BF)</Option>
                          <Option value="NE">Niger (NE)</Option>
                          <Option value="TG">Togo (TG)</Option>
                          <Option value="GH">Ghana (GH)</Option>
                          <Option value="NG">Nigeria (NG)</Option>
                          <Option value="MA">Maroc (MA)</Option>
                          <Option value="TN">Tunisie (TN)</Option>
                          <Option value="DZ">Algérie (DZ)</Option>
                          <Option value="OTHER">Autre</Option>
                        </Select>
                      </div>

                      <div style={{ flex: 1 }}>
                        <div style={{ display: "flex", marginBottom: "4px" }}>
                          <label
                            style={{
                              fontSize: "14px",
                              fontWeight: "500",
                              color: "#4B5563",
                            }}
                          >
                            Code postal{" "}
                            <span style={{ color: "#EF4444" }}>*</span>
                          </label>
                        </div>
                        <Input
                          value={formValues.zip || ""}
                          onChange={(e) =>
                            handleInputChange("zip", e.target.value)
                          }
                          placeholder="75001"
                          prefix={<BankOutlined />}
                          size={isMobile ? "middle" : "large"}
                          style={{ width: "100%" }}
                        />
                      </div>
                    </div>
                  </Card>
                </div>

                {/* Display total amount only after fields are filled */}
                {formValues.nombreJours && formValues.chauffeur && (
                  <Card
                    style={{
                      backgroundColor: "#fff7ed",
                      border: "1px solid #f59f00",
                      marginBottom: "24px",
                    }}
                  >
                    <div style={{ textAlign: "center" }}>
                      <Title
                        level={4}
                        style={{ color: "#f59f00", marginBottom: "8px" }}
                      >
                        Montant total à payer
                      </Title>
                      <div>
                        <p
                          style={{
                            fontSize: "24px",
                            fontWeight: "bold",
                            color: "#f59f00",
                          }}
                        >
                          {calculateTotalAmount().toLocaleString("fr-FR")} FCFA
                        </p>
                        <p style={{ fontSize: "14px", color: "#666" }}>
                          {formValues.chauffeur === "true"
                            ? getTarificationForDays()?.price_driver.toLocaleString(
                                "fr-FR"
                              )
                            : getTarificationForDays()?.price.toLocaleString(
                                "fr-FR"
                              )}{" "}
                          FCFA × {formValues.nombreJours} jour(s)
                        </p>
                        {formValues.chauffeur === "true" && (
                          <p style={{ fontSize: "12px", color: "#f59f00" }}>
                            Avec chauffeur inclus
                          </p>
                        )}
                      </div>
                    </div>
                  </Card>
                )}

                {/* Boutons d'action */}
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginTop: "32px",
                    flexDirection: isMobile
                      ? ("column" as const)
                      : ("row" as const),
                    gap: isMobile ? "16px" : "0",
                  }}
                >
                  <Button
                    danger
                    icon={<DeleteOutlined />}
                    onClick={resetForm}
                    style={{ width: isMobile ? "100%" : "auto" }}
                  >
                    Effacer le formulaire
                  </Button>

                  <Button
                    type="primary"
                    onClick={handlePayment}
                    disabled={!areAllFieldsValid() || isSubmitting}
                    loading={isSubmitting}
                    style={{
                      width: isMobile ? "100%" : "auto",
                      backgroundColor: "#f59f00",
                      borderColor: "#f59f00",
                    }}
                    // onMouseEnter={(e) => {
                    //   if (!e.currentTarget.disabled) {
                    //     e.currentTarget.style.backgroundColor = "#e8900d";
                    //     e.currentTarget.style.borderColor = "#e8900d";
                    //   }
                    // }}
                    // onMouseLeave={(e) => {
                    //   if (!e.currentTarget.disabled) {
                    //     e.currentTarget.style.backgroundColor = "#f59f00";
                    //     e.currentTarget.style.borderColor = "#f59f00";
                    //   }
                    // }}
                  >
                    Procéder au paiement
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </Flex>
    </>
  );
};

export default ReservationVehicule;
