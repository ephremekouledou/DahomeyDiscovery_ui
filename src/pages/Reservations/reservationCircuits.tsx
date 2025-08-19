import { useState, useEffect } from "react";
import {
  Input,
  Button,
  Steps,
  Card,
  Typography,
  Progress,
  message,
  Checkbox,
  Radio,
  Select,
  DatePicker,
  InputNumber,
  Flex,
} from "antd";
import {
  UserOutlined,
  MailOutlined,
  DeleteOutlined,
  ContactsOutlined,
  CalendarOutlined,
  TeamOutlined,
  EnvironmentOutlined,
} from "@ant-design/icons";
import dayjs from "dayjs";
import { FormPage, InputType } from "./reservationsModels";
import NavBar from "../../components/navBar/navBar";

const { Title } = Typography;
const { Step } = Steps;
const { Option } = Select;

interface Customer {
  email: string;
  first_name: string;
  last_name: string;
  phone: string;
}

interface PayementRequest {
  amount: number;
  currency: string;
  description: string;
  return_url: string;
  customer: Customer;
}

const ReservationCircuit = () => {
  const [messageApi, contextHolder] = message.useMessage();
  const [currentPage, setCurrentPage] = useState(0);
  const [formValues, setFormValues] = useState<{ [key: string]: any }>({});
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const totalPages = 2; // Modifié pour 2 pages

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
    document.title = "Réservation de Circuit";
  }, []);

  // Add circuit pricing
  const circuitPrices: { [key: string]: number } = {
    signature: 850,
    "esprit-femmes": 1200,
    "immersion-savoir-faire": 650,
    "spiritualite-traditions-vodoun": 950,
    "racines-heritage": 1800,
    "sur-mesure": 0, // Prix sur devis
  };

  // Calculate total amount
  const calculateTotalAmount = () => {
    const circuit = formValues.circuit;
    const participants = formValues.nombreParticipants || 0;

    if (!circuit || participants === 0) return 0;

    const unitPrice = circuitPrices[circuit] || 0;
    return unitPrice * participants;
  };

  // Responsive variables based on screen size
  const isMobile = windowWidth < 768;

  // Form pages configuration
  const formPages: FormPage[] = [
    {
      title: "Détails de votre voyage",
      fields: [
        {
          name: "circuit",
          label: "Circuit souhaité",
          required: true,
          errorMsg: "Veuillez sélectionner un circuit",
          placeholder: "Choisissez votre circuit",
          prefix: <EnvironmentOutlined />,
          type: "select",
          options: [
            {
              label: "Circuit Signature",
              value: "signature",
            },
            {
              label: "Circuit Esprit des Femmes - Féminin sacré et créatif",
              value: "esprit-femmes",
            },
            {
              label: "Circuit Immersion & Savoir-Faire",
              value: "immersion-savoir-faire",
            },
            {
              label: "Circuit Spiritualité & Traditions Vodoun",
              value: "spiritualite-traditions-vodoun",
            },
            {
              label: "Circuit Racines & Héritage sur les traces de l'histoire",
              value: "racines-heritage",
            },
            { label: "Circuit sur mesure", value: "sur-mesure" },
          ],
        },
        {
          name: "dateReservation",
          label: "Date de réservation souhaitée",
          required: true,
          errorMsg: "Veuillez sélectionner une date",
          placeholder: "Sélectionnez la date de début de votre voyage",
          prefix: <CalendarOutlined />,
          type: "date",
        },
        {
          name: "nombreParticipants",
          label: "Nombre de participants",
          required: true,
          errorMsg: "Veuillez indiquer le nombre de participants",
          placeholder: "Nombre de personnes",
          prefix: <TeamOutlined />,
          type: "number",
          min: 1,
          max: 50,
        },
      ],
    },
    {
      title: "Informations personnelles",
      fields: [
        {
          name: "email",
          label: "Adresse email",
          required: true,
          errorMsg: "Veuillez entrer votre email",
          placeholder: "client@example.com",
          prefix: <MailOutlined />,
          type: "text",
        },
        {
          name: "firstName",
          label: "Prénom",
          required: true,
          errorMsg: "Veuillez entrer votre prénom",
          placeholder: "Jean",
          prefix: <UserOutlined />,
          type: "text",
        },
        {
          name: "lastName",
          label: "Nom de famille",
          required: true,
          errorMsg: "Veuillez entrer votre nom",
          placeholder: "Dupont",
          prefix: <UserOutlined />,
          type: "text",
        },
        {
          name: "phone",
          label: "Numéro de téléphone",
          required: true,
          errorMsg: "Veuillez entrer votre numéro de téléphone",
          placeholder: "+33612345678",
          prefix: <ContactsOutlined />,
          type: "text",
        },
        // {
        //   name: "address",
        //   label: "Adresse",
        //   required: true,
        //   errorMsg: "Veuillez entrer votre adresse",
        //   placeholder: "123 rue de Paris",
        //   prefix: <BankOutlined />,
        //   type: "text",
        // },
        // {
        //   name: "city",
        //   label: "Ville",
        //   required: true,
        //   errorMsg: "Veuillez entrer votre ville",
        //   placeholder: "Paris",
        //   prefix: <EnvironmentOutlined />,
        //   type: "text",
        // },
        // {
        //   name: "state",
        //   label: "Région/État",
        //   required: true,
        //   errorMsg: "Veuillez entrer votre région",
        //   placeholder: "Île-de-France",
        //   prefix: <GlobalOutlined />,
        //   type: "text",
        // },
        // {
        //   name: "country",
        //   label: "Code pays",
        //   required: true,
        //   errorMsg: "Veuillez sélectionner votre pays",
        //   placeholder: "Sélectionnez votre pays",
        //   prefix: <GlobalOutlined />,
        //   type: "select",
        //   options: [
        //     { label: "France (FR)", value: "FR" },
        //     { label: "Belgique (BE)", value: "BE" },
        //     { label: "Suisse (CH)", value: "CH" },
        //     { label: "Canada (CA)", value: "CA" },
        //     { label: "États-Unis (US)", value: "US" },
        //     { label: "Allemagne (DE)", value: "DE" },
        //     { label: "Espagne (ES)", value: "ES" },
        //     { label: "Italie (IT)", value: "IT" },
        //     { label: "Royaume-Uni (GB)", value: "GB" },
        //     { label: "Bénin (BJ)", value: "BJ" },
        //     { label: "Côte d'Ivoire (CI)", value: "CI" },
        //     { label: "Sénégal (SN)", value: "SN" },
        //     { label: "Mali (ML)", value: "ML" },
        //     { label: "Burkina Faso (BF)", value: "BF" },
        //     { label: "Niger (NE)", value: "NE" },
        //     { label: "Togo (TG)", value: "TG" },
        //     { label: "Ghana (GH)", value: "GH" },
        //     { label: "Nigeria (NG)", value: "NG" },
        //     { label: "Maroc (MA)", value: "MA" },
        //     { label: "Tunisie (TN)", value: "TN" },
        //     { label: "Algérie (DZ)", value: "DZ" },
        //     { label: "Autre", value: "OTHER" },
        //   ],
        // },
        // {
        //   name: "zip",
        //   label: "Code postal",
        //   required: true,
        //   errorMsg: "Veuillez entrer votre code postal",
        //   placeholder: "75001",
        //   prefix: <BankOutlined />,
        //   type: "text",
        // },
      ],
    },
  ];

  const handleInputChange = (
    field: string,
    value: any,
    fieldType?: InputType
  ) => {
    if (fieldType === "checkbox") {
      // For checkboxes, we need to handle arrays of selected values
      setFormValues((prev) => {
        const currentValues = prev[field] || [];

        // If we're getting an array directly from Checkbox.Group (which happens when using the onChange)
        if (Array.isArray(value)) {
          return {
            ...prev,
            [field]: value,
          };
        }
        // If we're getting a single value (which happens when clicking individual checkboxes)
        else {
          if (Array.isArray(currentValues)) {
            if (currentValues.includes(value)) {
              return {
                ...prev,
                [field]: currentValues.filter((v) => v !== value),
              };
            } else {
              return {
                ...prev,
                [field]: [...currentValues, value],
              };
            }
          }
          return {
            ...prev,
            [field]: [value],
          };
        }
      });
    } else if (fieldType === "date") {
      // Handle date values - convert dayjs to string for storage
      setFormValues({
        ...formValues,
        [field]: value ? value.format("YYYY-MM-DD") : null,
      });
    } else {
      setFormValues({
        ...formValues,
        [field]: value,
      });
    }
  };

  const nextPage = () => {
    // Simple validation
    const currentFields = formPages[currentPage].fields;
    let isValid = true;
    let errorMessages: string[] = [];

    currentFields.forEach((field) => {
      if (field.required) {
        if (field.type === "checkbox" || field.type === "radio") {
          if (!formValues[field.name]) {
            isValid = false;
            if (field.errorMsg) {
              errorMessages.push(field.errorMsg);
            }
          }
        } else {
          if (!formValues[field.name]) {
            isValid = false;
            if (field.errorMsg) {
              errorMessages.push(field.errorMsg);
            }
          }
        }
      }
    });

    if (isValid && currentPage < totalPages - 1) {
      setCurrentPage(currentPage + 1);
    } else if (!isValid) {
      messageApi.error("Veuillez remplir tous les champs obligatoires");
    }
  };

  const prevPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  const resetForm = () => {
    setFormValues({});
  };

  // Modified API call for the new form structure
  const handlePost = async (data: any) => {
    try {
      setIsSubmitting(true);
      // Format data to match expected API format
      const totalAmount = calculateTotalAmount();
      const formattedData = {
        circuit: data.circuit,
        dateReservation: data.dateReservation,
        nombreParticipants: data.nombreParticipants,
        montantTotal: totalAmount,
        customer: {
          email: data.email,
          first_name: data.firstName,
          last_name: data.lastName,
          phone: data.phone,
          address: data.address,
          city: data.city,
          state: data.state,
          country: data.country,
          zip: data.zip,
        },
      };

      console.log("Formatted data to be sent:", formattedData);

      // Uncomment and modify the API endpoint as needed
      /*
      const res = await axios.post('https://your-api-endpoint.com/api/reservation', formattedData, {
        headers: {
          'Content-Type': 'application/json'
        }
      });

      // Check if response status is in the 2xx range
      if (res.status >= 200 && res.status < 300) {
        messageApi.success("Réservation soumise avec succès!");
        setTimeout(() => {
          messageApi.info("Redirection vers la page d'accueil...");
          navigate('/');
        }, 2000);
      } else {
        messageApi.error(`Echec de la soumission de la réservation! Statut: ${res.status}`);
      }
      */

      // Simulation for demo purposes
      messageApi.success("Paiement effectué avec succès!");
      setTimeout(() => {
        messageApi.info("Redirection vers la confirmation...");
        // navigate('/confirmation');
      }, 2000);
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
    // Check if all required fields are filled
    let isValid = true;
    formPages.forEach((page) => {
      page.fields.forEach((field) => {
        if (field.required) {
          if (field.type === "checkbox" || field.type === "radio") {
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

    if (isValid) {
      console.log("Form submitted with values:", formValues);
      // handlePost(formValues);
    } else {
      messageApi.error("Veuillez remplir tous les champs obligatoires");
    }
  };

  const renderFormFields = () => {
    const currentFields = formPages[currentPage].fields;

    return currentFields.map((field) => (
      <div key={field.name} style={{ marginBottom: "24px" }}>
        <div style={{ display: "flex", marginBottom: "4px" }}>
          <label
            style={{ fontSize: "14px", fontWeight: "500", color: "#4B5563" }}
          >
            {field.label}{" "}
            {field.required && <span style={{ color: "#EF4444" }}>*</span>}
          </label>
        </div>

        {field.type === "select" ? (
          // Select dropdown
          <Select
            value={formValues[field.name]}
            onChange={(value) =>
              handleInputChange(field.name, value, field.type)
            }
            placeholder={field.placeholder}
            size={isMobile ? "middle" : "large"}
            style={{ width: "100%" }}
            suffixIcon={field.prefix}
          >
            {field.options?.map((option) => (
              <Option key={option.value} value={option.value}>
                {option.label}
              </Option>
            ))}
          </Select>
        ) : field.type === "date" ? (
          // Date picker
          <DatePicker
            value={
              formValues[field.name] ? dayjs(formValues[field.name]) : null
            }
            onChange={(date) => handleInputChange(field.name, date, field.type)}
            placeholder={field.placeholder}
            size={isMobile ? "middle" : "large"}
            style={{ width: "100%" }}
            format="DD/MM/YYYY"
            disabledDate={(current) =>
              current && current < dayjs().startOf("day")
            }
          />
        ) : field.type === "number" ? (
          // Number input
          <InputNumber
            value={formValues[field.name]}
            onChange={(value) =>
              handleInputChange(field.name, value, field.type)
            }
            placeholder={field.placeholder}
            size={isMobile ? "middle" : "large"}
            style={{ width: "100%" }}
            min={field.min}
            max={field.max}
            prefix={field.prefix}
          />
        ) : field.type === "checkbox" && !field.options ? (
          // Single checkbox (boolean)
          <Checkbox
            checked={!!formValues[field.name]}
            onChange={(e) =>
              handleInputChange(field.name, e.target.checked, field.type)
            }
            style={{ marginLeft: 0 }}
          >
            {field.placeholder}
          </Checkbox>
        ) : field.type === "checkbox" && field.options ? (
          // Checkbox group (multiple selection)
          <Checkbox.Group
            options={field.options}
            value={formValues[field.name] || []}
            onChange={(checkedValues) =>
              handleInputChange(field.name, checkedValues, field.type)
            }
            style={{ display: "flex", flexDirection: "column", gap: "8px" }}
          />
        ) : field.type === "radio" ? (
          // Radio button group (single selection)
          <Radio.Group
            options={field.options}
            value={formValues[field.name]}
            onChange={(e) =>
              handleInputChange(field.name, e.target.value, field.type)
            }
            buttonStyle="solid"
            style={{ display: "flex", flexDirection: "column", gap: "8px" }}
          />
        ) : field.type === "textarea" ? (
          // Textarea for longer text
          <Input.TextArea
            value={formValues[field.name] || ""}
            onChange={(e) => handleInputChange(field.name, e.target.value)}
            placeholder={field.placeholder}
            size={isMobile ? "middle" : "large"}
            style={{ width: "100%" }}
            rows={4}
          />
        ) : (
          // Default text input
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
    ));
  };

  // Get responsive steps props
  const getStepsProps = () => {
    const baseProps = {
      current: currentPage,
      style: {
        marginBottom: isMobile ? "24px" : "32px",
      },
    };

    if (isMobile) {
      return {
        ...baseProps,
        progressDot: true,
        direction: "vertical" as const,
      };
    }

    return baseProps;
  };

  // Get responsive button styles
  const buttonContainerStyle = {
    display: "flex",
    justifyContent: "space-between",
    marginTop: "32px",
    flexDirection: isMobile ? ("column" as const) : ("row" as const),
    gap: isMobile ? "16px" : "0",
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
        style={{ backgroundColor: "#F9FAFB" }}
      >
        {/* Header avec NavBar */}
        <div className="relative z-20 flex items-center justify-center">
          <NavBar menu="" />
        </div>
        {/* Custom CSS for Steps colors */}
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
              Réservation
            </Title>

            <Steps {...getStepsProps()}>
              {formPages.map((page, index) => (
                <Step
                  key={index}
                  title={page.title}
                  description={isMobile ? `Étape ${index + 1}` : undefined}
                  style={{
                    color: currentPage === index ? "#f59f00" : undefined,
                  }}
                />
              ))}
            </Steps>

            <div
              style={{
                paddingLeft: isMobile ? "8px" : "16px",
                paddingRight: isMobile ? "8px" : "16px",
              }}
            >
              <div style={{ padding: isMobile ? "4px" : "8px" }}>
                <Title
                  level={5}
                  style={{
                    marginBottom: isMobile ? "16px" : "24px",
                    fontSize: isMobile ? "16px" : "18px",
                  }}
                >
                  {formPages[currentPage].title}
                </Title>

                {/* Display total amount on first page */}
                {currentPage === 0 &&
                  formValues.circuit &&
                  formValues.nombreParticipants && (
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
                        {formValues.circuit === "sur-mesure" ? (
                          <div>
                            <p
                              style={{
                                fontSize: "18px",
                                fontWeight: "bold",
                                color: "#f59f00",
                              }}
                            >
                              Prix sur devis
                            </p>
                            <p style={{ fontSize: "14px", color: "#666" }}>
                              Un devis personnalisé vous sera envoyé
                            </p>
                          </div>
                        ) : (
                          <div>
                            <p
                              style={{
                                fontSize: "24px",
                                fontWeight: "bold",
                                color: "#f59f00",
                              }}
                            >
                              {calculateTotalAmount().toLocaleString("fr-FR")}{" "}
                              FCFA
                            </p>
                            <p style={{ fontSize: "14px", color: "#666" }}>
                              {circuitPrices[formValues.circuit]} FCFA{" "}
                              {formValues.nombreParticipants} participant(s)
                            </p>
                          </div>
                        )}
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
                  {currentPage > 0 && (
                    <Button
                      onClick={prevPage}
                      style={{
                        marginRight: isMobile ? "0" : "8px",
                        width: isMobile ? "100%" : "auto",
                      }}
                    >
                      Précédent
                    </Button>
                  )}

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
                  {currentPage < totalPages - 1 ? (
                    <Button
                      type="primary"
                      onClick={nextPage}
                      style={{
                        width: isMobile ? "100%" : "auto",
                        backgroundColor: "#f59f00",
                        borderColor: "#f59f00",
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = "#e8900d";
                        e.currentTarget.style.borderColor = "#e8900d";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = "#f59f00";
                        e.currentTarget.style.borderColor = "#f59f00";
                      }}
                    >
                      Suivant
                    </Button>
                  ) : (
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
                  )}
                </div>
              </div>
            </div>
          </Card>

          <div
            style={{
              marginTop: "16px",
              display: "flex",
              alignItems: "center",
              flexDirection: isMobile ? "column" : "row",
              gap: isMobile ? "8px" : "0",
            }}
          >
            <Progress
              percent={Math.round(((currentPage + 1) / totalPages) * 100)}
              style={{
                flexGrow: 1,
                marginRight: isMobile ? "0" : "16px",
                width: isMobile ? "100%" : "auto",
              }}
              showInfo={false}
              strokeColor="#f59f00"
            />
            <span
              style={{
                color: "#4B5563",
                fontSize: isMobile ? "14px" : "16px",
              }}
            >
              Page {currentPage + 1} sur {totalPages}
            </span>
          </div>
        </div>
      </Flex>
    </>
  );
};

export default ReservationCircuit;
