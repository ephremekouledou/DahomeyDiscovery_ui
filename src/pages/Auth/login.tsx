import React, { useState } from "react";
import { Form, Input, Button, Typography, Card, message } from "antd";
import {
  MailOutlined,
  LockOutlined,
  EyeTwoTone,
  EyeInvisibleOutlined,
} from "@ant-design/icons";
import { ClientsAPI } from "../../sdk/api/clients";

const { Title, Text } = Typography;

interface LoginFormData {
  email: string;
  password: string;
}

const LoginPage: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [loginForm] = Form.useForm();

  const onFinish = async (values: LoginFormData) => {
    setLoading(true);
    ClientsAPI.Login(values.email, values.password)
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
          maxWidth: "400px",
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
            Se connecter
          </Title>
          <Text
            style={{
              color: "#6b7280",
              fontFamily: "GeneralSans",
              fontSize: "15px",
            }}
          >
            Accédez à votre compte
          </Text>
        </div>

        <Form
          form={loginForm}
          name="login"
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
                min: 6,
                message:
                  "Le mot de passe doit contenir au moins 6 caractères !",
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

          <div style={{ textAlign: "right", marginBottom: "24px" }}>
            <a
              href="/forgot-password"
              style={{
                fontSize: "14px",
                color: "#F59F00",
                fontFamily: "GeneralSans",
                textDecoration: "none",
                transition: "color 0.3s ease",
              }}
            >
              Mot de passe oublié ?
            </a>
          </div>

          <Form.Item style={{ marginBottom: "24px" }}>
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
              {loading ? "Connexion..." : "Se connecter"}
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
              Pas encore de compte ?{" "}
              <a
                href="/register"
                style={{
                  color: "#F59F00",
                  fontFamily: "GeneralSans",
                  fontWeight: "500",
                  textDecoration: "none",
                  transition: "color 0.3s ease",
                }}
              >
                Créer un compte
              </a>
            </Text>
          </div>
        </Form>
      </Card>
    </div>
  );
};

export default LoginPage;
