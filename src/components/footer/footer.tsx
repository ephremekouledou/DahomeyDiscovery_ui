import { Flex, Typography } from "antd";
import background from "../../assets/images/backgroundFooter.png";
import logo from "../../assets/images/Logo/monoChrome-blanc.png";
import {
  FacebookFilled,
  InstagramFilled,
  WhatsAppOutlined,
} from "@ant-design/icons";
import { Link } from "react-router-dom";

function Footer() {
  const navItems = [
    { key: "ACCUEIL", label: "ACCUEIL", path: "/" },
    { key: "CIRCUITS", label: "NOS CIRCUITS", path: "/circuits" },
    { key: "ADRESSES", label: "NOS BONNES ADRESSES", path: "/bonnes-adresses" },
    { key: "A PROPOS", label: "À PROPOS", path: "/a-propos" },
    { key: "ACTUALITES", label: "ACTUALITÉS", path: "/actualites" },
  ];
  return (
    <>
      <div
        style={{
          backgroundImage: `url(${background})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          width: "100%",
          height: "448px",
          position: "relative",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {/* Overlay pour assombrir l'image */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.5)", // Overlay noir avec 50% d'opacité
            zIndex: 1,
          }}
        ></div>

        {/* Contenu du footer */}
        <Flex
          style={{
            color: "white",
            width: "100%",
            height: "100%",
            fontSize: "18px",
            zIndex: 2, // Au-dessus de l'overlay
          }}
          vertical
          justify="flex-end"
          align="center"
          gap="3vh"
        >
          <img src={logo} alt="Logo" style={{ height: "8vw", width: "8vw" }} />
          <Flex gap={10}>
            <Flex
              style={{
                backgroundColor: "#411E1C",
                width: "50px ",
                height: "50px",
                borderRadius: "50%",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Link
                to="https://www.facebook.com/dahomey.discovery"
                target="_blank"
                style={{ textDecoration: "none" }}
              >
                <FacebookFilled style={{ fontSize: "24px", color: "white" }} />
              </Link>
            </Flex>
            <Flex
              style={{
                backgroundColor: "#411E1C",
                width: "50px ",
                height: "50px",
                borderRadius: "50%",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Link
                to="https://www.instagram.com/dahomey.discovery/"
                target="_blank"
                rel="noopener noreferrer"
                style={{ textDecoration: "none" }}
              >
                <InstagramFilled style={{ fontSize: "24px", color: "white" }} />
              </Link>
            </Flex>
            <Flex
              style={{
                backgroundColor: "#411E1C",
                width: "50px ",
                height: "50px",
                borderRadius: "50%",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Link
                to="https://api.whatsapp.com/send?phone=22995202020"
                target="_blank"
                rel="noopener noreferrer"
                style={{ textDecoration: "none" }}
              >
                <WhatsAppOutlined
                  style={{ fontSize: "24px", color: "white" }}
                />
              </Link>
            </Flex>
          </Flex>
          <Flex gap={30} style={{ flexWrap: "wrap", justifyContent: "center" }}>
            {navItems.map((item) => (
              <Link key={item.key} to={item.path} style={{ color: "white" }}>
                {item.label}
              </Link>
            ))}
          </Flex>
          <Flex
            justify="space-between"
            style={{
              width: "90%",
              margin: "0 auto",
              borderTop: "1px solid white",
              paddingTop: "20px",
              paddingBottom: "20px",
            }}
          >
            <Typography.Text style={{ color: "white" }}>
              © 2025 Dahomey Discovery, Tous droits réservés
            </Typography.Text>
            <Typography.Text style={{ color: "white" }}>
              Mentions légales | Conditions générales de vente
            </Typography.Text>
          </Flex>
        </Flex>
      </div>
    </>
  );
}
export default Footer;
