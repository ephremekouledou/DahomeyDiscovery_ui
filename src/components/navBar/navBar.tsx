import { Link } from "react-router-dom";
import "./navBar.css";
import logo from "../../assets/images/Logo/logo-belge.png";
import menuVector from "../../assets/icons/menuVector.png";
import { Button, Flex } from "antd";
import { useState } from "react";

type NavBarProps = {
  scrolled: boolean;
};

const NavBar: React.FC<NavBarProps> = () => {
  const [menuSelected, setMenuSelected] = useState<string>("ACCUEIL");
  return (
    <Flex
      style={{
        color: "black",
        width: "100%",
        position: "sticky",
        top: 0,
        zIndex: 100,
        // marginTop: "30px",
        backgroundColor: "transparent", // This will be overridden by the white background of the nav
      }}
      justify="center"
    >
      <nav style={{ maxWidth: "1200px", width: "100%" }}>
        <Flex
          style={{
            backgroundColor: "white",
            width: "100%",
            padding: "10px 20px",
            borderRadius: "100px",
            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)", // Enhanced shadow for better visibility
          }}
          justify="space-between"
          align="center"
          gap="36px"
        >
          <Flex vertical gap="8px" onClick={() => setMenuSelected("ACCUEIL")}>
            <Link
              to="/"
              style={{
                textDecoration: "none",
                color: "black",

                fontSize: "14px",
              }}
            >
              ACCUEIL
            </Link>
            {menuSelected === "ACCUEIL" && (
              <img
                src={menuVector}
                alt="Menu Vector"
                style={{ height: "10px", width: "auto" }}
              />
            )}
          </Flex>
          <Flex vertical gap="8px" onClick={() => setMenuSelected("CIRCUITS")}>
            <Link
              to="/circuits"
              style={{
                textDecoration: "none",
                color: "black",

                fontSize: "14px",
              }}
            >
              NOS CIRCUITS
            </Link>
            {menuSelected === "CIRCUITS" && (
              <img
                src={menuVector}
                alt="Menu Vector"
                style={{ height: "10px", width: "auto" }}
              />
            )}
          </Flex>
          <Flex vertical gap="8px" onClick={() => setMenuSelected("ADRESSES")}>
            <Link
              to="/bonnes-adresses"
              style={{
                textDecoration: "none",
                color: "black",

                fontSize: "14px",
              }}
            >
              NOS BONNES ADRESSES
            </Link>
            {menuSelected === "ADRESSES" && (
              <img
                src={menuVector}
                alt="Menu Vector"
                style={{ height: "10px", width: "auto" }}
              />
            )}
          </Flex>
          <Flex>
            <Link to="/">
              <img
                src={logo}
                alt="Logo"
                style={{ height: "50px", width: "auto" }}
              />
            </Link>
          </Flex>
          <Flex vertical gap="8px" onClick={() => setMenuSelected("A PROPOS")}>
            <Link
              to="/a-propos"
              style={{
                textDecoration: "none",
                color: "black",

                fontSize: "14px",
              }}
            >
              À PROPOS
            </Link>
            {menuSelected === "A PROPOS" && (
              <img
                src={menuVector}
                alt="Menu Vector"
                style={{ height: "10px", width: "auto" }}
              />
            )}
          </Flex>
          <Flex
            vertical
            gap="8px"
            onClick={() => setMenuSelected("ACTUALITES")}
          >
            <Link
              to="/actualites"
              style={{
                textDecoration: "none",
                color: "black",

                fontSize: "14px",
              }}
            >
              ACTUALITÉS
            </Link>
            {menuSelected === "ACTUALITES" && (
              <img
                src={menuVector}
                alt="Menu Vector"
                style={{ height: "10px", width: "auto" }}
              />
            )}
          </Flex>
          <Flex>
            <Link to="/reserver">
              <Button
                type="primary"
                size="large"
                style={{
                  backgroundColor: "#F59F00",
                  color: "black",
                  borderRadius: "25px",
                  border: "none",
                }}
              >
                RÉSERVER
              </Button>
            </Link>
          </Flex>
        </Flex>
      </nav>
    </Flex>
  );
};

export default NavBar;
