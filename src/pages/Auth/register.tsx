import React, { useState } from "react";
import { Form, Input, Button, Typography, Card, message } from "antd";
import {
  MailOutlined,
  LockOutlined,
  // UserOutlined,
  // PhoneOutlined,
  EyeTwoTone,
  EyeInvisibleOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { ClientsAPI } from "../../sdk/api/clients";

const { Title, Text } = Typography;

interface IAddClientBody {
  email: string;
  first_name: string;
  last_name: string;
  phone: string;
  password: string;
}

interface RegisterFormData extends IAddClientBody {
  confirmPassword: string;
}

const RegisterPage: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [registerForm] = Form.useForm();

  const onFinish = async (values: RegisterFormData) => {
    setLoading(true);
    const clientData: IAddClientBody = {
      email: values.email,
      first_name: values.first_name,
      last_name: values.last_name,
      phone: values.phone,
      password: values.password,
    };
    ClientsAPI.SignUp(clientData)
      .then((_) => {
        message.success("Connecter");
        window.location.href = "/";
      })
      .catch((err) => {
        message.error(err.message);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Échec de validation:", errorInfo);
  };

  // Validation du numéro de téléphone
  // const validatePhone = (_: any, value: string) => {
  //   if (!value) {
  //     return Promise.reject(
  //       new Error("Veuillez saisir votre numéro de téléphone !")
  //     );
  //   }
  //   const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
  //   if (!phoneRegex.test(value.replace(/[\s\-\(\)]/g, ""))) {
  //     return Promise.reject(
  //       new Error("Veuillez saisir un numéro de téléphone valide !")
  //     );
  //   }
  //   return Promise.resolve();
  // };

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#f9fafb",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "32px 16px",
      }}
    >
      <Card
        style={{
          width: "100%",
          maxWidth: "450px",
          borderRadius: "16px",
          boxShadow: "0 10px 25px rgba(0, 0, 0, 0.1)",
          border: "none",
        }}
      >
        <div style={{ textAlign: "center", marginBottom: "32px" }}>
          <Title
            level={2}
            style={{
              color: "#1f2937",
              marginBottom: "8px",
              fontFamily: "GeneralSans",
              fontWeight: "600",
            }}
          >
            Créer un compte
          </Title>
          <Text
            style={{
              color: "#6b7280",
              fontFamily: "GeneralSans",
              fontSize: "15px",
            }}
          >
            Rejoignez-nous dès aujourd'hui
          </Text>
        </div>

        <Form
          form={registerForm}
          name="register"
          layout="vertical"
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
          size="large"
        >
          <Form.Item
            label={
              <span
                style={{
                  fontFamily: "GeneralSans",
                  fontWeight: "500",
                  color: "#374151",
                }}
              >
                Nom
              </span>
            }
            name="last_name"
            style={{ flex: 1 }}
            rules={[
              {
                required: true,
                message: "Veuillez saisir votre nom !",
              },
              {
                min: 2,
                message: "Le nom doit contenir au moins 2 caractères !",
              },
            ]}
          >
            <Input
              prefix={<UserOutlined style={{ color: "#9ca3af" }} />}
              placeholder="Votre nom"
              style={{
                height: "48px",
                borderRadius: "12px",
                fontFamily: "GeneralSans",
                fontSize: "16px",
                border: "1px solid #d1d5db",
              }}
            />
          </Form.Item>

          <Form.Item
            label={
              <span
                style={{
                  fontFamily: "GeneralSans",
                  fontWeight: "500",
                  color: "#374151",
                }}
              >
                Prénom
              </span>
            }
            name="first_name"
            style={{ flex: 1 }}
            rules={[
              {
                required: true,
                message: "Veuillez saisir votre prénom !",
              },
              {
                min: 2,
                message: "Le prénom doit contenir au moins 2 caractères !",
              },
            ]}
          >
            <Input
              prefix={<UserOutlined style={{ color: "#9ca3af" }} />}
              placeholder="Votre prénom"
              style={{
                height: "48px",
                borderRadius: "12px",
                fontFamily: "GeneralSans",
                fontSize: "16px",
                border: "1px solid #d1d5db",
              }}
            />
          </Form.Item>

          <Form.Item
            label={
              <span
                style={{
                  fontFamily: "GeneralSans",
                  fontWeight: "500",
                  color: "#374151",
                }}
              >
                Adresse email
              </span>
            }
            name="email"
            rules={[
              {
                required: true,
                message: "Veuillez saisir votre adresse email !",
              },
              {
                type: "email",
                message: "Veuillez saisir une adresse email valide !",
              },
            ]}
          >
            <Input
              prefix={<MailOutlined style={{ color: "#9ca3af" }} />}
              placeholder="votre@email.com"
              style={{
                height: "48px",
                borderRadius: "12px",
                fontFamily: "GeneralSans",
                fontSize: "16px",
                border: "1px solid #d1d5db",
              }}
            />
          </Form.Item>

          {/* <Form.Item
            label={
              <span
                style={{
                  fontFamily: "GeneralSans",
                  fontWeight: "500",
                  color: "#374151",
                }}
              >
                Numéro de téléphone
              </span>
            }
            name="phone"
            rules={[
              {
                validator: validatePhone,
              },
            ]}
          >
            <Input
              prefix={<PhoneOutlined style={{ color: "#9ca3af" }} />}
              placeholder="+33 6 12 34 56 78"
              style={{
                height: "48px",
                borderRadius: "12px",
                fontFamily: "GeneralSans",
                fontSize: "16px",
                border: "1px solid #d1d5db",
              }}
            />
          </Form.Item> */}

          <Form.Item
            label={
              <span
                style={{
                  fontFamily: "GeneralSans",
                  fontWeight: "500",
                  color: "#374151",
                }}
              >
                Mot de passe
              </span>
            }
            name="password"
            rules={[
              {
                required: true,
                message: "Veuillez saisir votre mot de passe !",
              },
              {
                min: 8,
                message:
                  "Le mot de passe doit contenir au moins 8 caractères !",
              },
              {
                pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
                message:
                  "Le mot de passe doit contenir au moins une majuscule, une minuscule et un chiffre !",
              },
            ]}
          >
            <Input.Password
              prefix={<LockOutlined style={{ color: "#9ca3af" }} />}
              placeholder="Votre mot de passe"
              iconRender={(visible) =>
                visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
              }
              style={{
                height: "48px",
                borderRadius: "12px",
                fontFamily: "GeneralSans",
                fontSize: "16px",
                border: "1px solid #d1d5db",
              }}
            />
          </Form.Item>

          {/* <Form.Item
            label={
              <span
                style={{
                  fontFamily: "GeneralSans",
                  fontWeight: "500",
                  color: "#374151",
                }}
              >
                Confirmer le mot de passe
              </span>
            }
            name="confirmPassword"
            dependencies={["password"]}
            rules={[
              {
                required: true,
                message: "Veuillez confirmer votre mot de passe !",
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("password") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(
                    new Error("Les mots de passe ne correspondent pas !")
                  );
                },
              }),
            ]}
          >
            <Input.Password
              prefix={<LockOutlined style={{ color: "#9ca3af" }} />}
              placeholder="Confirmez votre mot de passe"
              iconRender={(visible) =>
                visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
              }
              style={{
                height: "48px",
                borderRadius: "12px",
                fontFamily: "GeneralSans",
                fontSize: "16px",
                border: "1px solid #d1d5db",
              }}
            />
          </Form.Item> */}

          <Form.Item style={{ marginBottom: "24px", marginTop: "24px" }}>
            <Button
              type="primary"
              htmlType="submit"
              loading={loading}
              block
              style={{
                height: "48px",
                borderRadius: "12px",
                backgroundColor: "#F59F00",
                borderColor: "#F59F00",
                color: "black",
                fontFamily: "GeneralSans",
                fontWeight: "600",
                fontSize: "16px",
                boxShadow: "none",
                transition: "all 0.3s ease",
              }}
            >
              {loading ? "Création du compte..." : "Créer mon compte"}
            </Button>
          </Form.Item>

          <div style={{ textAlign: "center", marginTop: "24px" }}>
            <Text
              style={{
                color: "#6b7280",
                fontFamily: "GeneralSans",
                fontSize: "14px",
              }}
            >
              Vous avez déjà un compte ?{" "}
              <a
                href="/login"
                style={{
                  color: "#F59F00",
                  fontFamily: "GeneralSans",
                  fontWeight: "500",
                  textDecoration: "none",
                  transition: "color 0.3s ease",
                }}
              >
                Se connecter
              </a>
            </Text>
          </div>
        </Form>
      </Card>
    </div>
  );
};

export default RegisterPage;
