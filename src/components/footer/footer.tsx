import { Flex, Typography } from "antd";
import { useState, useEffect } from "react";
import logo from "/images/Logo/monoChrome-blanc.png";
import {
  FacebookFilled,
  InstagramFilled,
  WhatsAppOutlined,
} from "@ant-design/icons";
import { Link } from "react-router-dom";
import "../../assets/Fonts/font.css";

function Footer() {
  const [isMobile, setIsMobile] = useState(false);
  const [isHovered1, setIsHovered1] = useState(false);
  const [isHovered2, setIsHovered2] = useState(false);
  const [isHovered3, setIsHovered3] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const navItems = [
    { key: "ACCUEIL", label: "ACCUEIL", path: "/" },
    { key: "CIRCUITS", label: "NOS CIRCUITS", path: "/circuits-thematiques" },
    { key: "ADRESSES", label: "NOS BONNES ADRESSES", path: "/bonnes-adresses" },
    { key: "A PROPOS", label: "À PROPOS", path: "/a-propos" },
    { key: "ACTUALITES", label: "ACTUALITÉS", path: "/actualites" },
  ];

  return (
    <>
      <div
        style={{
          background: "#401715",
          width: "100%",
          height: "448px",
          position: "relative",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >

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
          <img
            src={logo}
            alt="Logo"
            style={{
              height: isMobile ? "90px" : "150px",
              width: isMobile ? "90px" : "150px",
            }}
          />

          {/* Section 2: Social Media Icons - Responsive */}
          <Flex gap={isMobile ? 8 : 10}>
            <Flex
              style={{
                backgroundColor: isHovered1 ? "#ff3100" : "#411E1C",
                width: isMobile ? "40px" : "50px",
                height: isMobile ? "40px" : "50px",
                borderRadius: "50%",
                justifyContent: "center",
                alignItems: "center",
              }}
              onMouseEnter={() => setIsHovered1(true)}
              onMouseLeave={() => setIsHovered1(false)}
            >
              <Link
                to="https://www.facebook.com/dahomey.discovery"
                target="_blank"
                style={{ textDecoration: "none" }}
              >
                <FacebookFilled
                  style={{
                    fontSize: isMobile ? "20px" : "24px",
                    color: "white",
                  }}
                />
              </Link>
            </Flex>
            <Flex
              style={{
                backgroundColor: isHovered2 ? "#ff3100" : "#411E1C",
                width: isMobile ? "40px" : "50px",
                height: isMobile ? "40px" : "50px",
                borderRadius: "50%",
                justifyContent: "center",
                alignItems: "center",
              }}
              onMouseEnter={() => setIsHovered2(true)}
              onMouseLeave={() => setIsHovered2(false)}
            >
              <Link
                to="https://www.instagram.com/dahomey.discovery/"
                target="_blank"
                rel="noopener noreferrer"
                style={{ textDecoration: "none" }}
              >
                <InstagramFilled
                  style={{
                    fontSize: isMobile ? "20px" : "24px",
                    color: "white",
                  }}
                />
              </Link>
            </Flex>
            <Flex
              style={{
                backgroundColor: isHovered3 ? "#ff3100" : "#411E1C",
                width: isMobile ? "40px" : "50px",
                height: isMobile ? "40px" : "50px",
                borderRadius: "50%",
                justifyContent: "center",
                alignItems: "center",
              }}
              onMouseEnter={() => setIsHovered3(true)}
              onMouseLeave={() => setIsHovered3(false)}
            >
              <Link
                to="https://api.whatsapp.com/send?phone=22995202020"
                target="_blank"
                rel="noopener noreferrer"
                style={{ textDecoration: "none" }}
              >
                <WhatsAppOutlined
                  style={{
                    fontSize: isMobile ? "20px" : "24px",
                    color: "white",
                  }}
                />
              </Link>
            </Flex>
          </Flex>

          <Flex gap={30} style={{ flexWrap: "wrap", justifyContent: "center" }}>
            {navItems.map((item) => (
              <Link
                key={item.key}
                to={item.path}
                style={{ color: "white", fontFamily: "GeneralSans" }}
              >
                {item.label}
              </Link>
            ))}
          </Flex>

          {/* Section 4: Copyright and Legal Text - Responsive */}
          <Flex
            justify={isMobile ? "center" : "space-between"}
            align="center"
            style={{
              width: "90%",
              margin: "0 auto",
              borderTop: "1px solid white",
              paddingTop: "20px",
              paddingBottom: "20px",
              flexDirection: isMobile ? "column" : "row",
              gap: isMobile ? "10px" : "0",
            }}
          >
            <Typography.Text
              style={{
                color: "white",
                fontSize: isMobile ? "12px" : "14px",
                textAlign: isMobile ? "center" : "left",
                fontFamily: "GeneralSans",
              }}
            >
              © 2025 Dahomey Discovery, Tous droits réservés
            </Typography.Text>
            <Typography.Text
              style={{
                color: "white",
                fontSize: isMobile ? "11px" : "14px",
                textAlign: isMobile ? "center" : "right",
                fontFamily: "GeneralSans",
              }}
            >
              Mentions légales | Conditions générales de vente
            </Typography.Text>
          </Flex>
        </Flex>
      </div>
    </>
  );
}
export default Footer;
