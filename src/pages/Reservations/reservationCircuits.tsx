import { useState, useEffect } from "react";
import {
  Input,
  Button,
  Card,
  Typography,
  message,
  Checkbox,
  Radio,
  Select,
  DatePicker,
  InputNumber,
  Flex,
} from "antd";
import {
  DeleteOutlined,
  CalendarOutlined,
  TeamOutlined,
  EnvironmentOutlined,
} from "@ant-design/icons";
import dayjs from "dayjs";
import { CircuitsAPI } from "../../sdk/api/circuits";
import { VillesAPI } from "../../sdk/api/villes";
import { ClientsAPI } from "../../sdk/api/clients";
import { IClient } from "../../sdk/models/clients";
import BeginningButton from "../../components/dededed/BeginingButton";
import NavBar from "../../components/navBar/navBar";
import Footer from "../../components/footer/footer";
import FloatingCartButton from "../../components/dededed/PanierButton";

const { Title } = Typography;
const { Option } = Select;

// Types
interface IVilleVehiculeTarification {
  _id: string;
  from: number;
  to: number;
  price: number;
}

interface IVille {
  _id: string;
  name: string;
  description: string;
  price: number;
  price_supp: number;
  vehicule_tarification: IVilleVehiculeTarification[];
}

interface ICircuitPresenter {
  _id: string;
  type: string;
  title: string;
  price: number;
  day: number;
  night: number;
  description: string;
}

type InputType =
  | "text"
  | "select"
  | "date"
  | "number"
  | "checkbox"
  | "radio"
  | "textarea";

interface FormField {
  name: string;
  label: string;
  required: boolean;
  errorMsg?: string;
  placeholder: string;
  prefix?: React.ReactNode;
  type: InputType;
  options?: { label: string; value: string }[];
  min?: number;
  max?: number;
}

interface FormPage {
  title: string;
  fields: FormField[];
}

const ReservationCircuit = () => {
  const [messageApi, contextHolder] = message.useMessage();
  const [formValues, setFormValues] = useState<{ [key: string]: any }>({});
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [circuits, setCircuits] = useState<ICircuitPresenter[]>([]);
  const [villes, setVilles] = useState<IVille[]>([]);
  const [showVillesSelect, setShowVillesSelect] = useState(false);
  const [_, setUser] = useState<IClient | null>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // On recupere les circuits disponibles
  useEffect(() => {
    CircuitsAPI.List()
      .then((data) => {
        console.log("the circuits are:", data);
        setCircuits(data);
      })
      .catch((err) => {
        console.error("Error fetching circuits:", err);
      });
  }, []);

  // On recupere les villes
  useEffect(() => {
    VillesAPI.List()
      .then((data) => {
        setVilles(data);
      })
      .catch((err) => {
        console.error("Error fetching villes:", err);
      });
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
    document.title = "Réservation de Circuit";
  }, []);

  // Check for logged in user
  useEffect(() => {
    const loggedUser = ClientsAPI.GetUser();
    setUser(loggedUser);
  }, []);

  // Fonction pour déterminer le véhicule selon le nombre de participants
  const getVehiculePrice = (
    ville: IVille,
    nombreParticipants: number
  ): number => {
    if (
      !ville.vehicule_tarification ||
      ville.vehicule_tarification.length === 0
    ) {
      return 0;
    }

    const vehicule = ville.vehicule_tarification.find(
      (v) => nombreParticipants >= v.from && nombreParticipants <= v.to
    );

    return vehicule ? vehicule.price : 0;
  };

  // Calculate total amount
  const calculateTotalAmount = () => {
    const circuitId = formValues.circuit;
    const participants = formValues.nombreParticipants || 0;

    if (!circuitId || participants === 0) return 0;

    // Cas Circuit à la carte
    if (circuitId === "circuit-a-la-carte") {
      const selectedVilleIds = formValues.villesSelectionnees || [];
      if (selectedVilleIds.length === 0) return 0;

      let totalAmount = 0;
      selectedVilleIds.forEach((villeId: string) => {
        const ville = villes.find((v) => v._id === villeId);
        if (ville) {
          const vehiculePrice = getVehiculePrice(ville, participants);
          const villeTotal = ville.price + participants * vehiculePrice;
          totalAmount += villeTotal;
        }
      });

      return totalAmount;
    }

    // Cas circuits normaux
    const circuit = circuits.find((c) => c._id === circuitId);
    if (!circuit) return 0;

    console.log(
      "Calculating total amount for circuit:",
      circuit,
      "with participants:",
      participants
    );

    return circuit.price * participants;
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
            ...circuits.map((circuit) => ({
              label: circuit.title,
              value: circuit._id,
            })),
            {
              label: "Circuit à la carte",
              value: "circuit-a-la-carte",
            },
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
        },
      ],
    },
  ];

  const handleInputChange = (
    field: string,
    value: any,
    fieldType?: InputType
  ) => {
    // Gestion spéciale pour le champ circuit
    if (field === "circuit") {
      setShowVillesSelect(value === "circuit-a-la-carte");
      if (value !== "circuit-a-la-carte") {
        // Réinitialiser la sélection des villes si on ne choisit pas circuit à la carte
        setFormValues((prev) => {
          const newValues = { ...prev, [field]: value } as {
            [key: string]: any;
          };
          delete newValues.villesSelectionnees;
          return newValues;
        });
        return;
      }
    }

    if (fieldType === "checkbox") {
      setFormValues((prev) => {
        const currentValues = prev[field] || [];

        if (Array.isArray(value)) {
          return {
            ...prev,
            [field]: value,
          };
        } else {
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

  const resetForm = () => {
    setFormValues({});
    setShowVillesSelect(false);
  };

  const handlePost = async (_: any) => {
    try {
      // setIsSubmitting(true);
      // const totalAmount = calculateTotalAmount();
      // const formattedData = {
      //   circuit: data.circuit,
      //   dateReservation: data.dateReservation,
      //   nombreParticipants: data.nombreParticipants,
      //   montantTotal: totalAmount,
      //   villesSelectionnees: data.villesSelectionnees || [],
      //   customer: {
      //     email: data.email,
      //     first_name: data.firstName,
      //     last_name: data.lastName,
      //     phone: data.phone,
      //   },
      // };

      // we initiate the payment process
      // const paymentRequest: IPaiementRequest = {
      //   amount: totalAmount,
      //   currency: "XOF",
      //   description: "Réservation Dahomey Discovery",
      //   return_url: "https://dahomeydiscovery.com/circuits-thematiques",
      //   customer: {
      //     email: user ? user.email : formattedData.customer.email || "",
      //     first_name: user
      //       ? user.first_name
      //       : formattedData.customer.first_name || "",
      //     last_name: user
      //       ? user.last_name
      //       : formattedData.customer.last_name || "",
      //   },
      // };

      // PaiementAPI.Initiate(paymentRequest)
      //   .then((data) => {
      //     console.log("the response is:", data);

      //     // we create the reservation here
      //     const reservationDate = new Date(
      //       `${formattedData.dateReservation}T15:04:05Z`
      //     );
      //     const reservation: IAddUpdateReservation = {
      //       date: reservationDate,
      //       customer: user ? user._id : "guest",
      //       status: "pending",
      //       transaction_id: data.data.id,
      //       type: "circuit",
      //       item: formattedData.circuit,
      //       number: formattedData.nombreParticipants,
      //       villes: formattedData.villesSelectionnees,
      //     };

      //     ReservationsAPI.Add(reservation)
      //       .then((res) => {
      //         console.log("Reservation created:", res);
      //         // Redirect to payment page
      //         window.location.href = data.data.checkout_url;
      //       })
      //       .catch((err) => {
      //         console.error("Error creating reservation:", err);
      //         messageApi.error(
      //           "Erreur lors de la création de la réservation. Veuillez réessayer."
      //         );
      //       });
      //   })
      //   .catch((err) => {
      //     console.error("Error fetching attractions:", err);
      //   });

      // console.log("Formatted data to be sent:", formattedData);
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

    // Validation supplémentaire pour circuit à la carte
    if (formValues.circuit === "circuit-a-la-carte") {
      if (
        !formValues.villesSelectionnees ||
        formValues.villesSelectionnees.length === 0
      ) {
        isValid = false;
        messageApi.error(
          "Veuillez sélectionner au moins une ville pour le circuit à la carte"
        );
        return;
      }
    }

    if (isValid) {
      console.log("Form submitted with values:", formValues);
      handlePost(formValues);
    } else {
      messageApi.error("Veuillez remplir tous les champs obligatoires");
    }
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

            {field.type === "select" ? (
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
              <DatePicker
                value={
                  formValues[field.name] ? dayjs(formValues[field.name]) : null
                }
                onChange={(date) =>
                  handleInputChange(field.name, date, field.type)
                }
                placeholder={field.placeholder}
                size={isMobile ? "middle" : "large"}
                style={{ width: "100%" }}
                format="DD/MM/YYYY"
                disabledDate={(current) =>
                  current && current < dayjs().startOf("day")
                }
              />
            ) : field.type === "number" ? (
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
              <Checkbox.Group
                options={field.options}
                value={formValues[field.name] || []}
                onChange={(checkedValues) =>
                  handleInputChange(field.name, checkedValues, field.type)
                }
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "8px",
                }}
              />
            ) : field.type === "radio" ? (
              <Radio.Group
                options={field.options}
                value={formValues[field.name]}
                onChange={(e) =>
                  handleInputChange(field.name, e.target.value, field.type)
                }
                buttonStyle="solid"
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "8px",
                }}
              />
            ) : field.type === "textarea" ? (
              <Input.TextArea
                value={formValues[field.name] || ""}
                onChange={(e) => handleInputChange(field.name, e.target.value)}
                placeholder={field.placeholder}
                size={isMobile ? "middle" : "large"}
                style={{ width: "100%" }}
                rows={4}
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

        {/* Afficher le select des villes si "Circuit à la carte" est sélectionné */}
        {showVillesSelect && (
          <div style={{ marginBottom: "24px" }}>
            <div style={{ display: "flex", marginBottom: "4px" }}>
              <label
                style={{
                  fontSize: "14px",
                  fontWeight: "500",
                  color: "#4B5563",
                }}
              >
                Sélectionnez les villes{" "}
                <span style={{ color: "#EF4444" }}>*</span>
              </label>
            </div>
            <Select
              mode="multiple"
              value={formValues.villesSelectionnees || []}
              onChange={(value) =>
                handleInputChange("villesSelectionnees", value)
              }
              placeholder="Choisissez les villes de votre circuit"
              size={isMobile ? "middle" : "large"}
              style={{ width: "100%" }}
              suffixIcon={<EnvironmentOutlined />}
            >
              {villes.map((ville) => (
                <Option key={ville._id} value={ville._id}>
                  {ville.name}
                </Option>
              ))}
            </Select>
          </div>
        )}
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
      <FloatingCartButton />
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
              Réservation de circuit
            </Title>

            <div
              style={{
                paddingLeft: isMobile ? "8px" : "16px",
                paddingRight: isMobile ? "8px" : "16px",
              }}
            >
              <div style={{ padding: isMobile ? "4px" : "8px" }}>
                {renderFormFields()}

                {/* Display total amount */}
                {formValues.circuit &&
                  formValues.nombreParticipants &&
                  (formValues.circuit !== "circuit-a-la-carte" ||
                    (formValues.villesSelectionnees &&
                      formValues.villesSelectionnees.length > 0)) && (
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
                            {calculateTotalAmount().toLocaleString("fr-FR")}{" "}
                            FCFA
                          </p>
                          {/* {formValues.circuit === "circuit-a-la-carte" ? (
                            <p style={{ fontSize: "14px", color: "#666" }}>
                              {formValues.villesSelectionnees.length} ville(s)
                              sélectionnée(s) • {formValues.nombreParticipants}{" "}
                              participant(s)
                            </p>
                          ) : (
                            <p style={{ fontSize: "14px", color: "#666" }}>
                              {circuits.find(
                                (c) => c._id === formValues.circuit
                              )?.price || 0}{" "}
                              FCFA × {formValues.nombreParticipants}{" "}
                              participant(s)
                            </p>
                          )} */}
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

export default ReservationCircuit;
