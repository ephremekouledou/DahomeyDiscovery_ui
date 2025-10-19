import { useState, useEffect } from "react";
import {
  Button,
  Card,
  Typography,
  message,
  InputNumber,
  Flex,
} from "antd";
import {
  DeleteOutlined,
  ClockCircleOutlined,
} from "@ant-design/icons";
import { useTransaction } from "../../context/transactionContext";
import { ClientsAPI } from "../../sdk/api/clients";
import { IClient } from "../../sdk/models/clients";
import { IPaiementRequest } from "../../sdk/models/paiement";
import { PaiementAPI } from "../../sdk/api/paiements";
import { ReservationsAPI } from "../../sdk/api/reservations";
import { IAddUpdateReservation } from "../../sdk/models/reservations";

const { Title } = Typography;

// Types
interface FormField {
  name: string;
  label: string;
  required: boolean;
  errorMsg?: string;
  placeholder: string;
  prefix?: React.ReactNode;
  type: "number";
  min?: number;
  max?: number;
}

interface FormPage {
  title: string;
  fields: FormField[];
}

const ReservationLocation = () => {
  const [messageApi, contextHolder] = message.useMessage();
  const [formValues, setFormValues] = useState<{ [key: string]: any }>({});
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [user, setUser] = useState<IClient | null>(null);
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

  useEffect(() => {
    document.title = "Réservation de Location";
  }, []);

  // Check for logged in user
  useEffect(() => {
    const loggedUser = ClientsAPI.GetUser();
    setUser(loggedUser);
  }, []);

  // Calculate total amount based on days
  const calculateTotalAmount = () => {
    const days = formValues.nombreJours || 0;
    return (transaction?.amount ?? 0) * days;
  };

  // Responsive variables based on screen size
  const isMobile = windowWidth < 768;

  // Form pages configuration
  const formPages: FormPage[] = [
    {
      title: "Durée de location",
      fields: [
        {
          name: "nombreJours",
          label: "Nombre de jours de location",
          required: true,
          errorMsg: "Veuillez indiquer le nombre de jours",
          placeholder: "Nombre de jours",
          prefix: <ClockCircleOutlined />,
          type: "number",
          min: 1,
          max: 365,
        },
      ],
    },
  ];

  const handleInputChange = (field: string, value: any) => {
    setFormValues({
      ...formValues,
      [field]: value,
    });
  };

  const resetForm = () => {
    setFormValues({});
  };

  const handlePost = async (data: any) => {
    try {
      setIsSubmitting(true);
      const totalAmount = calculateTotalAmount();
      
      if (!transaction) {
        messageApi.error("Informations de location manquantes");
        return;
      }

      // We initiate the payment process
      const paymentRequest: IPaiementRequest = {
        amount: totalAmount,
        currency: "XOF",
        description: `Location de ${transaction.title} - ${data.nombreJours} jour(s)`,
        return_url: "https://dahomeydiscovery.com/hebergements",
        customer: {
          email: user?.email || "",
          first_name: user?.first_name || "",
          last_name: user?.last_name || "",
        },
      };

      const paymentResponse = await PaiementAPI.Initiate(paymentRequest);
      console.log("Payment response:", paymentResponse);

      // We create the reservation here
      const reservation: IAddUpdateReservation = {
        date: new Date(),
        customer: user ? user._id : "guest",
        status: "pending",
        transaction_id: paymentResponse.data.id,
        type: "hebergement",
        item: transaction.id || transaction.title,
        number: data.nombreJours,
        villes: [],
      };

      const reservationResponse = await ReservationsAPI.Add(reservation);
      console.log("Reservation created:", reservationResponse);
      
      // Redirect to payment page
      window.location.href = paymentResponse.data.checkout_url;
    } catch (error: any) {
      console.error("Form submission error:", error);
      const errorMessage =
        error?.response?.data?.message ||
        "Erreur inconnue. Veuillez réessayer.";
      messageApi.error(`Echec du paiement! ${errorMessage}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  const submitForm = () => {
    let isValid = true;
    
    formPages.forEach((page) => {
      page.fields.forEach((field) => {
        if (field.required && !formValues[field.name]) {
          isValid = false;
        }
      });
    });

    if (!isValid) {
      messageApi.error("Veuillez remplir tous les champs obligatoires");
      return;
    }

    if (!transaction) {
      messageApi.error("Aucune location sélectionnée");
      return;
    }

    console.log("Form submitted with values:", formValues);
    handlePost(formValues);
  };

  const renderFormFields = () => {
    return (
      <>
        {formPages[0].fields.map((field) => (
          <div key={field.name} style={{ marginBottom: "24px" }}>
            <div style={{ display: "flex", marginBottom: "4px" }}>
              <label
                style={{
                  fontSize: "14px",
                  fontWeight: "500",
                  color: "#4B5563",
                }}
              >
                {field.label}{" "}
                {field.required && <span style={{ color: "#EF4444" }}>*</span>}
              </label>
            </div>

            <InputNumber
              value={formValues[field.name]}
              onChange={(value) => handleInputChange(field.name, value)}
              placeholder={field.placeholder}
              size={isMobile ? "middle" : "large"}
              style={{ width: "100%" }}
              min={field.min}
              max={field.max}
              prefix={field.prefix}
            />
          </div>
        ))}
      </>
    );
  };

  const buttonContainerStyle = {
    display: "flex",
    justifyContent: "space-between",
    marginTop: "32px",
    flexDirection: isMobile ? ("column" as const) : ("row" as const),
    gap: isMobile ? "16px" : "0",
  };

  const containerStyle = {
    width: "100%",
    maxWidth: isMobile ? "100%" : "600px",
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
        style={{
          backgroundColor: "#F9FAFB",
          minHeight: "100vh",
          paddingTop: "80px",
          width: "100%",
        }}
      >
        <style>
          {`
          .ant-steps-item-finish .ant-steps-item-icon {
            background-color: #f59f00 !important;
            border-color: #f59f00 !important;
          }
          
          .ant-steps-item-process .ant-steps-item-icon {
            background-color: #f59f00 !important;
            border-color: #f59f00 !important;
          }
          
          .ant-steps-item-finish .ant-steps-item-title::after {
            background-color: #f59f00 !important;
          }
          
          .ant-steps-item-finish .ant-steps-item-title {
            color: #f59f00 !important;
          }
          
          .ant-steps-item-process .ant-steps-item-title {
            color: #f59f00 !important;
          }
          
          .ant-steps-item-process .ant-steps-item-description {
            color: #f59f00 !important;
          }
          
          .ant-steps-item-wait .ant-steps-item-icon {
            border-color: #d9d9d9 !important;
            background-color: #fff !important;
          }
          
          .ant-steps-item-wait .ant-steps-item-icon > .ant-steps-icon {
            color: #d9d9d9 !important;
          }
        `}
        </style>

        {contextHolder}

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
              Réservation de Location
            </Title>

            <div
              style={{
                paddingLeft: isMobile ? "8px" : "16px",
                paddingRight: isMobile ? "8px" : "16px",
              }}
            >
              <div style={{ padding: isMobile ? "4px" : "8px" }}>
                

                {/* Display location info */}
                {transaction && (
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
                        Location de {transaction.title}
                      </Title>
                      <p style={{ fontSize: "14px", color: "#666", margin: 0 }}>
                        Prix par jour: {transaction.amount.toLocaleString("fr-FR")} FCFA
                      </p>
                    </div>
                  </Card>
                )}

                {/* Display total amount only after number of days is entered */}
                {formValues.nombreJours && (
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
                          {transaction?.amount.toLocaleString("fr-FR")} FCFA × {formValues.nombreJours} jour(s)
                        </p>
                      </div>
                    </div>
                  </Card>
                )}

                {renderFormFields()}
              </div>

              <div style={buttonContainerStyle}>
                <div
                  style={{
                    display: "flex",
                    flexDirection: isMobile
                      ? ("column" as const)
                      : ("row" as const),
                    gap: "8px",
                    width: isMobile ? "100%" : "auto",
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
                </div>

                <div style={{ width: isMobile ? "100%" : "auto" }}>
                  <Button
                    type="primary"
                    onClick={submitForm}
                    loading={isSubmitting}
                    disabled={isSubmitting}
                    style={{
                      width: isMobile ? "100%" : "auto",
                      backgroundColor: "#f59f00",
                      borderColor: "#f59f00",
                    }}
                    onMouseEnter={(e) => {
                      if (!isSubmitting) {
                        e.currentTarget.style.backgroundColor = "#e8900d";
                        e.currentTarget.style.borderColor = "#e8900d";
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (!isSubmitting) {
                        e.currentTarget.style.backgroundColor = "#f59f00";
                        e.currentTarget.style.borderColor = "#f59f00";
                      }
                    }}
                  >
                    {isSubmitting ? "Traitement..." : "Payer"}
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

export default ReservationLocation;