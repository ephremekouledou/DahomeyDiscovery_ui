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
} from "antd";
import { DeleteOutlined, ClockCircleOutlined } from "@ant-design/icons";
import { useTransaction } from "../../context/transactionContext";
import Footer from "../../components/footer/footer";
import NavBar from "../../components/navBar/navBar";
import BeginningButton from "../../components/dededed/BeginingButton";

const { Title } = Typography;

// Types
interface FormValues {
  [key: string]: any;
  chauffeur?: string;
  nombreJours?: number;
  phone?: string;
}

interface FormField {
  name: string;
  label: string;
  required: boolean;
  errorMsg?: string;
  placeholder: string;
  prefix?: React.ReactNode;
  type: "radio" | "number" | "text";
  options?: { label: string; value: string }[];
  min?: number;
  max?: number;
}

interface FormPage {
  title: string;
  fields: FormField[];
}

const ReservationVehicule = () => {
  const [messageApi, contextHolder] = message.useMessage();
  const [formValues, setFormValues] = useState<FormValues>({});
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [isSubmitting, _] = useState(false);
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
    document.title = "Réservation de Véhicule";
  }, []);

  // Helper to get the correct tarification based on nombreJours
  const getTarificationForDays = () => {
    const days = Number(formValues.nombreJours) || 0;
    if (!transaction?.tarification || !Array.isArray(transaction.tarification))
      return null;

    const found = transaction.tarification.find(
      (t: any) => days >= t.from && days <= t.to
    );

    if (found) return found;

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

  // Responsive variables based on screen size
  const isMobile = windowWidth < 768;

  // Form configuration
  const formPages: FormPage[] = [
    {
      title: "Détails de la location",
      fields: [
        {
          name: "chauffeur",
          label: "Réservation avec chauffeur",
          required: true,
          errorMsg: "Veuillez indiquer si vous souhaitez un chauffeur",
          placeholder: "Avec ou sans chauffeur",
          type: "radio",
          options: [
            { label: "Oui", value: "true" },
            { label: "Non", value: "false" },
          ],
        },
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
    setFormValues((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const resetForm = () => {
    setFormValues({});
  };

  const handlePost = async (_: any) => {
    // try {
    //   setIsSubmitting(true);
    //   const totalAmount = calculateTotalAmount();

    //   if (!transaction) {
    //     messageApi.error("Informations de véhicule manquantes");
    //     return;
    //   }

    //   // We initiate the payment process
    //   const paymentRequest: IPaiementRequest = {
    //     amount: totalAmount,
    //     currency: "XOF",
    //     description: `Location de ${transaction.title} - ${
    //       data.nombreJours
    //     } jour(s)${data.chauffeur === "true" ? " avec chauffeur" : ""}`,
    //     return_url: "https://dahomeydiscovery.com/locations",
    //     customer: {
    //       email: user ? user.email : "",
    //       first_name: user ? user.first_name : "",
    //       last_name: user ? user.last_name : "",
    //     },
    //   };

    //   const paymentResponse = await PaiementAPI.Initiate(paymentRequest);
    //   console.log("Payment response:", paymentResponse);

    //   // We create the reservation here
    //   const reservation: IAddUpdateReservation = {
    //     date: new Date(),
    //     customer: user ? user._id : "guest",
    //     status: "pending",
    //     transaction_id: paymentResponse.data.id,
    //     type: "vehicule",
    //     item: transaction.id || transaction.title,
    //     number: data.nombreJours,
    //     villes: [],
    //     chauffeur: data.chauffeur === "true",
    //   };

    //   const reservationResponse = await ReservationsAPI.Add(reservation);
    //   console.log("Reservation created:", reservationResponse);

    //   // Redirect to payment page
    //   window.location.href = paymentResponse.data.checkout_url;
    // } catch (error: any) {
    //   console.error("Form submission error:", error);
    //   const errorMessage =
    //     error?.response?.data?.message ||
    //     "Erreur inconnue. Veuillez réessayer.";
    //   messageApi.error(`Echec du paiement! ${errorMessage}`);
    // } finally {
    //   setIsSubmitting(false);
    // }
  };

  const submitForm = () => {
    let isValid = true;

    formPages.forEach((page) => {
      page.fields.forEach((field) => {
        if (field.required) {
          if (field.type === "radio") {
            if (!formValues[field.name]) {
              isValid = false;
            }
          } else {
            if (!formValues[field.name]) {
              isValid = false;
            }
          }
        }
      });
    });

    if (!isValid) {
      messageApi.error("Veuillez remplir tous les champs obligatoires");
      return;
    }

    if (!transaction) {
      messageApi.error("Aucun véhicule sélectionné");
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

            {field.type === "radio" ? (
              <Radio.Group
                options={field.options}
                value={formValues[field.name]}
                onChange={(e) => handleInputChange(field.name, e.target.value)}
                buttonStyle="solid"
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "8px",
                }}
              />
            ) : field.type === "number" ? (
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
            ) : (
              <Input
                value={formValues[field.name] || ""}
                onChange={(e) => handleInputChange(field.name, e.target.value)}
                placeholder={field.placeholder}
                prefix={field.prefix}
                size={isMobile ? "middle" : "large"}
                style={{ width: "100%" }}
              />
            )}
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
    <Flex justify="center" vertical>
      <BeginningButton />
      {/* Header avec NavBar */}
      <div className="relative z-20 flex items-center justify-center">
        <NavBar menu="" />
      </div>
      <Flex
        justify="center"
        align="center"
        vertical
        style={{
          backgroundColor: "#F9FAFB",
          // minHeight: "100vh",
          paddingTop: "30px",
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
              Réservation de véhicule
            </Title>

            <div
              style={{
                paddingLeft: isMobile ? "8px" : "16px",
                paddingRight: isMobile ? "8px" : "16px",
              }}
            >
              <div style={{ padding: isMobile ? "4px" : "8px" }}>

                {/* Display vehicle info */}
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
                    </div>
                  </Card>
                )}

                {renderFormFields()}

                {/* Display total amount */}
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
                        {/* <p style={{ fontSize: "14px", color: "#666" }}>
                          {formValues.chauffeur === "true"
                            ? getTarificationForDays()?.price_driver.toLocaleString(
                                "fr-FR"
                              )
                            : getTarificationForDays()?.price.toLocaleString(
                                "fr-FR"
                              )}{" "}
                          FCFA × {formValues.nombreJours} jour(s)
                        </p> */}
                        {formValues.chauffeur === "true" && (
                          <p style={{ fontSize: "12px", color: "#f59f00" }}>
                            Avec chauffeur inclus
                          </p>
                        )}
                      </div>
                    </div>
                  </Card>
                )}
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
      {/* Footer */}
      <Footer />
    </Flex>
  );
};

export default ReservationVehicule;
