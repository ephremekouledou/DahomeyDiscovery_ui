import { Link } from "react-router-dom";
import "./navBar.css";
import logo from "../../assets/images/Logo/logo-belge.png";
import menuVector from "../../assets/icons/menuVector.png";
import { Button, Flex, Drawer } from "antd";
import { useState, useEffect } from "react";
import { MenuOutlined, CloseOutlined } from "@ant-design/icons";

type NavBarProps = {
  menu: string;
  scrolled?: boolean;
};

const NavBar: React.FC<NavBarProps> = ({ menu }) => {
  const [menuSelected, setMenuSelected] = useState<string>(menu);
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const [drawerVisible, setDrawerVisible] = useState<boolean>(false);

  // Handle responsive breakpoint
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    handleResize(); // Check initial size
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleMenuClick = (menuItem: string) => {
    setMenuSelected(menuItem);
    setDrawerVisible(false); // Close mobile menu when item is clicked
  };

  const navItems = [
    { key: "ACCUEIL", label: "ACCUEIL", path: "/" },
    { key: "CIRCUITS", label: "NOS CIRCUITS", path: "/circuits" },
    { key: "ADRESSES", label: "NOS BONNES ADRESSES", path: "/bonnes-adresses" },
    { key: "A PROPOS", label: "À PROPOS", path: "/a-propos" },
    { key: "ACTUALITES", label: "ACTUALITÉS", path: "/actualites" },
  ];

  const renderNavItem = (item: any, mobile: boolean = false) => (
    <Flex
      key={item.key}
      vertical={!mobile}
      gap="8px"
      onClick={() => handleMenuClick(item.key)}
      style={{
        cursor: "pointer",
        padding: mobile ? "12px 0" : "0",
        borderBottom: mobile ? "1px solid #f0f0f0" : "none",
      }}
    >
      <Link
        to={item.path}
        style={{
          textDecoration: "none",
          color: "black",
          fontSize: mobile ? "16px" : "14px",
          fontWeight: mobile ? "500" : "normal",
          fontFamily: "GeneralSans",
        }}
      >
        {item.label}
      </Link>
      {menuSelected === item.key && !mobile && (
        <img
          src={menuVector}
          alt="Menu Vector"
          style={{ height: "10px", width: "auto" }}
        />
      )}
    </Flex>
  );

  const renderMobileMenu = () => (
    <Drawer
      title={null}
      placement="right"
      onClose={() => setDrawerVisible(false)}
      open={drawerVisible}
      width={280}
      closable={false}
      styles={{
        body: { padding: "20px" },
        header: { display: "none" },
      }}
    >
      <Flex justify="space-between" align="center" style={{ marginBottom: "30px" }}>
        <img src={logo} alt="Logo" style={{ height: "40px", width: "auto" }} />
        <Button
          type="text"
          icon={<CloseOutlined />}
          onClick={() => setDrawerVisible(false)}
          style={{ fontSize: "18px" }}
        />
      </Flex>
      
      <Flex vertical gap="0">
        {navItems.map((item) => renderNavItem(item, true))}
      </Flex>
      
      <Flex style={{ marginTop: "30px" }}>
        <Link to="/reserver" style={{ width: "100%" }}>
          <Button
            type="primary"
            size="large"
            block
            style={{
              backgroundColor: "#F59F00",
              color: "black",
              borderRadius: "25px",
              border: "none",
              height: "45px",
              fontSize: "16px",
              fontWeight: "600",
            }}
            onClick={() => setDrawerVisible(false)}
          >
            RÉSERVER
          </Button>
        </Link>
      </Flex>
    </Drawer>
  );

  return (
    <>
      <Flex
        style={{
          color: "black",
          width: isMobile ? "95vw" : "80vw",
          zIndex: 100,
        }}
        justify="center"
        align="center"
      >
        <nav style={{ width: "100%" }}>
          <Flex
            style={{
              backgroundColor: "white",
              width: "100%",
              padding: isMobile ? "10px 16px" : "10px 20px",
              borderRadius: isMobile ? "20px" : "100px",
              boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
            }}
            justify="space-between"
            align="center"
            gap={isMobile ? "16px" : "36px"}
          >
            {/* Logo - Always visible */}
            {isMobile && (
            <Flex>
              <Link to="/">
                <img
                  src={logo}
                  alt="Logo"
                  style={{ 
                    height: isMobile ? "35px" : "50px", 
                    width: "auto" 
                  }}
                />
              </Link>
            </Flex>
            )}

            {/* Mobile Navigation */}

            {/* Desktop Navigation */}
            {!isMobile && (
              <>
                {navItems.slice(0, 3).map((item) => renderNavItem(item))}
                
                {/* Center Logo for desktop - duplicate for centering */}
                <Flex>
                  <Link to="/">
                    <img
                      src={logo}
                      alt="Logo"
                      style={{ height: "50px", width: "auto" }}
                    />
                  </Link>
                </Flex>
                
                {navItems.slice(3).map((item) => renderNavItem(item))}
                
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
                        fontFamily: "GeneralSans",
                      }}
                    >
                      RÉSERVER
                    </Button>
                  </Link>
                </Flex>
              </>
            )}

            {/* Mobile Menu Button */}
            {isMobile && (
              <Button
                type="text"
                icon={<MenuOutlined />}
                onClick={() => setDrawerVisible(true)}
                style={{
                  fontSize: "20px",
                  padding: "8px",
                  height: "auto",
                  color: "black",
                }}
              />
            )}
          </Flex>
        </nav>
      </Flex>

      {/* Mobile Drawer Menu */}
      {isMobile && renderMobileMenu()}
    </>
  );
};

export default NavBar;