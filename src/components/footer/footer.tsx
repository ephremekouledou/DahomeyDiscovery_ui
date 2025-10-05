import { Flex, Typography, Row, Col } from "antd";
import { useState, useEffect } from "react";
import logo from "/images/Logo/monoChrome-blanc.png";
import mtn from "/images/mtn.jpg";
import celtis from "/images/celtis.png";
import visa from "/images/visa.png";
import mastercard from "/images/mastercard.png";
import moov from "/images/moov.png";
import {
  FacebookFilled,
  InstagramFilled,
  WhatsAppOutlined,
  PhoneOutlined,
  MailOutlined,
  EnvironmentOutlined,
} from "@ant-design/icons";
import { Link } from "react-router-dom";
import "../../assets/Fonts/font.css";

const SOCIAL_LINKS = {
  facebook: "https://www.facebook.com/dahomey.discovery",
  instagram: "https://www.instagram.com/dahomey.discovery/",
  whatsapp: "https://api.whatsapp.com/send?phone=22995202020",
};

const BREAKPOINT = {
  mobile: 768,
};

function Footer() {
  const [isMobile, setIsMobile] = useState(false);
  const [hoveredIcon, setHoveredIcon] = useState<string | null>(null);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < BREAKPOINT.mobile);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const circuitsItems = [
    {
      key: "CIRCUIT_SIGNATURE",
      label: "Circuit Signature",
      path: "/circuits-signature",
    },
    {
      key: "CIRCUITS_THEMATIQUES",
      label: "Circuits Thématiques",
      path: "/circuits-thematiques",
    },
    {
      key: "CIRCUIT_CARTE",
      label: "Circuit à la carte",
      path: "/circuits-a-la-carte",
    },
  ];

  const servicesItems = [
    { key: "HÉBERGEMENT", label: "Hébergements", path: "/hebergements" },
    { key: "LOCATION", label: "Location de voitures", path: "/locations" },
    { key: "TRANSFERT", label: "Transferts", path: "/transferts" },
    { key: "RESTAU", label: "Restaurants", path: "/restaurants" },
    { key: "ATTRACTION", label: "Attractions", path: "/attractions" },
  ];

  const aboutItems = [
    { key: "QUI_SOMMES_NOUS", label: "Qui sommes-nous ?", path: "/a-propos" },
    { key: "ACTUALITES", label: "Actualités", path: "/actualites" },
    {
      key: "CONDITIONS",
      label: "Conditions générales",
      path: "/conditions-generales",
    },
  ];

  const contactItems = [
    {
      icon: PhoneOutlined,
      label: "+229 01 67 11 02 20",
      link: "tel:+2290167110220",
    },
    {
      icon: MailOutlined,
      label: "contact@dahomediscovery.com",
      link: "mailto:contact@dahomediscovery.com",
    },
    { icon: EnvironmentOutlined, label: "Cotonou, Bénin", link: "#" },
  ];

  const socialIcons = [
    { key: "facebook", icon: FacebookFilled, link: SOCIAL_LINKS.facebook },
    { key: "instagram", icon: InstagramFilled, link: SOCIAL_LINKS.instagram },
    { key: "whatsapp", icon: WhatsAppOutlined, link: SOCIAL_LINKS.whatsapp },
  ];

  const paymentMethods = [
    { name: "Visa", logo: visa, color: "#1A1F71" },
    { name: "Mastercard", logo: mastercard, color: "#EB001B" },
    { name: "MTN", logo: mtn, color: "#FFCC00" },
    { name: "Moov", logo: moov, color: "#00A651" },
    { name: "Celtis", logo: celtis, color: "#00A651" },
  ];

  const renderSocialIcon = (social: any) => {
    const Icon = social.icon;
    const isHovered = hoveredIcon === social.key;

    return (
      <Flex
        key={social.key}
        style={{
          backgroundColor: isHovered ? "#ff3100" : "#411E1C",
          width: "56px",
          height: "56px",
          borderRadius: "50%",
          justifyContent: "center",
          alignItems: "center",
          cursor: "pointer",
          transition: "all 0.3s ease",
        }}
        onMouseEnter={() => setHoveredIcon(social.key)}
        onMouseLeave={() => setHoveredIcon(null)}
      >
        <Link
          to={social.link}
          target="_blank"
          rel="noopener noreferrer"
          style={{ textDecoration: "none" }}
        >
          <Icon style={{ fontSize: "35px", color: "white" }} />
        </Link>
      </Flex>
    );
  };

  const linkStyle = {
    color: "#ccc",
    textDecoration: "none",
    fontSize: "14px",
    fontFamily: "GeneralSans",
    lineHeight: "24px",
    transition: "color 0.3s",
  };

  const sectionTitleStyle = {
    color: "white",
    fontSize: "16px",
    fontFamily: "GeneralSans",
    fontWeight: "600",
    marginBottom: "16px",
  };

  return (
    <footer
      style={{
        background: "#401715",
        width: "100%",
        padding: isMobile ? "40px 20px 20px" : "60px 40px 30px",
      }}
    >
      <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
        {/* Logo Section */}
        <Flex justify="center" align="center" style={{ marginBottom: "50px" }}>
          <img
            src={logo}
            alt="Dahomey Discovery Logo"
            style={{
              height: isMobile ? "80px" : "100px",
              width: isMobile ? "80px" : "100px",
              objectFit: "contain",
            }}
          />
        </Flex>

        {/* Main Content */}
        <Row gutter={[32, 32]} style={{ marginBottom: "40px" }}>
          {/* Circuits */}
          <Col xs={24} sm={12} md={6}>
            <Typography.Text style={sectionTitleStyle}>
              Nos Circuits
            </Typography.Text>
            <Flex vertical gap={8}>
              {circuitsItems.map((item) => (
                <Link
                  key={item.key}
                  to={item.path}
                  style={linkStyle}
                  onMouseEnter={(e) =>
                    ((e.target as HTMLElement).style.color = "#ff3100")
                  }
                  onMouseLeave={(e) =>
                    ((e.target as HTMLElement).style.color = "#ccc")
                  }
                >
                  {item.label}
                </Link>
              ))}
            </Flex>
          </Col>

          {/* Services */}
          <Col xs={24} sm={12} md={6}>
            <Typography.Text style={sectionTitleStyle}>
              Nos Services
            </Typography.Text>
            <Flex vertical gap={8}>
              {servicesItems.map((item) => (
                <Link
                  key={item.key}
                  to={item.path}
                  style={linkStyle}
                  onMouseEnter={(e) =>
                    ((e.target as HTMLElement).style.color = "#ff3100")
                  }
                  onMouseLeave={(e) =>
                    ((e.target as HTMLElement).style.color = "#ccc")
                  }
                >
                  {item.label}
                </Link>
              ))}
            </Flex>
          </Col>

          {/* À Propos */}
          <Col xs={24} sm={12} md={6}>
            <Typography.Text style={sectionTitleStyle}>
              À Propos
            </Typography.Text>
            <Flex vertical gap={8}>
              {aboutItems.map((item) => (
                <Link
                  key={item.key}
                  to={item.path}
                  style={linkStyle}
                  onMouseEnter={(e) =>
                    ((e.target as HTMLElement).style.color = "#ff3100")
                  }
                  onMouseLeave={(e) =>
                    ((e.target as HTMLElement).style.color = "#ccc")
                  }
                >
                  {item.label}
                </Link>
              ))}
            </Flex>
          </Col>

          {/* Contact */}
          <Col xs={24} sm={12} md={6}>
            <Typography.Text style={sectionTitleStyle}>
              Nous Contacter
            </Typography.Text>
            <Flex vertical gap={12}>
              {contactItems.map((item, index) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={index}
                    to={item.link}
                    style={{
                      ...linkStyle,
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                    }}
                    onMouseEnter={(e) =>
                      ((e.target as HTMLElement).style.color = "#ff3100")
                    }
                    onMouseLeave={(e) =>
                      ((e.target as HTMLElement).style.color = "#ccc")
                    }
                  >
                    <Icon style={{ fontSize: "16px" }} />
                    {item.label}
                  </Link>
                );
              })}
            </Flex>
          </Col>
        </Row>

        {/* Payment Methods & Social Media */}
        <Flex
          justify="space-between"
          wrap="wrap"
          gap={30}
          style={{ marginBottom: "40px" }}
        >
          <Flex vertical gap={16}>
            <Typography.Text style={sectionTitleStyle}>
              Moyens de paiement
            </Typography.Text>
            <Flex gap={8} style={{ flexWrap: "wrap" }}>
              {paymentMethods.map((method) => (
                <Flex
                  key={method.name}
                  style={{
                    backgroundColor: "#411E1C",
                    // padding: "6px 10px",
                    // borderRadius: "6px",
                    alignItems: "center",
                    // gap: "6px",
                    // border: "1px solid #666",
                    minWidth: "70px",
                    justifyContent: "center",
                  }}
                >
                  <img
                    src={method.logo}
                    alt={method.name}
                    style={{
                      height: "35px",
                      width: "auto",
                      objectFit: "contain",
                      display: "block",
                    }}
                  />
                </Flex>
              ))}
            </Flex>
          </Flex>
          <Flex vertical gap={16}>
            <Typography.Text style={sectionTitleStyle}>
              Suivez-nous
            </Typography.Text>
            <Flex gap={12}>{socialIcons.map(renderSocialIcon)}</Flex>
          </Flex>
        </Flex>
        {/* <Row
          gutter={[32, 24]}
          style={{
            borderTop: "1px solid #555",
            paddingTop: "30px",
            marginBottom: "30px",
          }}
        >
          <Col xs={24} md={12}></Col>

          <Col xs={24} md={12}></Col>
        </Row> */}

        {/* Footer Bottom */}
        <Flex
          justify={"center"}
          align="center"
          style={{
            borderTop: "1px solid #555",
            paddingTop: "20px",
            flexDirection: isMobile ? "column" : "row",
            gap: isMobile ? "10px" : "0",
          }}
        >
          <Typography.Text
            style={{
              color: "#999",
              fontSize: "13px",
              fontFamily: "GeneralSans",
            }}
          >
            Copyright © 2025 Dahomey Discovery. Tous droits réservés
          </Typography.Text>
        </Flex>
      </div>
    </footer>
  );
}

export default Footer;
