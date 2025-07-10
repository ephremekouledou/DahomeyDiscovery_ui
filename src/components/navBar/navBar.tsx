import { Link } from "react-router-dom";
import "./navBar.css";
import logo from "../../assets/images/Logo/logo-belge.png";
import menuVector from "../../assets/icons/menuVector.png";
import { Button, Flex, Drawer, Dropdown } from "antd";
import { useState, useEffect } from "react";
import { MenuOutlined, CloseOutlined, DownOutlined } from "@ant-design/icons";

type SubMenuItem = {
  key: string;
  label: string;
  path: string;
};

type NavItem = {
  key: string;
  label: string;
  path?: string;
  subItems?: SubMenuItem[];
};

type NavBarProps = {
  menu: string;
  scrolled?: boolean;
};

const NavBar: React.FC<NavBarProps> = ({ menu }) => {
  const [menuSelected, setMenuSelected] = useState<string>(menu);
  const [menuHover, setMenuHover] = useState<string | null>(null);
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const [drawerVisible, setDrawerVisible] = useState<boolean>(false);
  const [isHovered, setIsHovered] = useState(false);
  const [expandedMobileMenu, setExpandedMobileMenu] = useState<string | null>(null);

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

  const handleMobileMenuToggle = (menuKey: string) => {
    setExpandedMobileMenu(expandedMobileMenu === menuKey ? null : menuKey);
  };

  const navItems: NavItem[] = [
    { key: "ACCUEIL", label: "ACCUEIL", path: "/" },
    { 
      key: "CIRCUITS", 
      label: "NOS CIRCUITS",
      subItems: [
        { key: "CIRCUIT_SIGNATURE", label: "Circuit Signature", path: "/circuits-signature" },
        { key: "CIRCUITS_THEMATIQUES", label: "Circuits Thématiques", path: "/circuits-thematiques" },
        { key: "CIRCUIT_CARTE", label: "Circuit à la carte", path: "/circuits-a-la-carte" },
      ]
    },
    { key: "ADRESSES", label: "NOS BONNES ADRESSES", path: "/bonnes-adresses" },
    { key: "A PROPOS", label: "À PROPOS", path: "/a-propos" },
    { key: "ACTUALITES", label: "ACTUALITÉS", path: "/actualites" },
  ];

  const renderDesktopNavItem = (item: NavItem) => {
    const hasSubItems = item.subItems && item.subItems.length > 0;

    if (hasSubItems) {
      const dropdownItems = item.subItems!.map((subItem) => ({
        key: subItem.key,
        label: (
          <Link 
            to={subItem.path}
            style={{ 
              textDecoration: "none", 
              color: "black",
              fontFamily: "GeneralSans",
              fontSize: "14px"
            }}
            onClick={() => handleMenuClick(subItem.key)}
          >
            {subItem.label}
          </Link>
        ),
      }));

      return (
        <Dropdown
          menu={{ items: dropdownItems }}
          trigger={['hover']}
          placement="bottomCenter"
          overlayStyle={{ paddingTop: "15px" }}
        >
          <Flex
            vertical
            gap="8px"
            style={{
              cursor: "pointer",
              transition: "transform 0.8s ease",
            }}
            onMouseEnter={() => setMenuHover(item.key)}
            onMouseLeave={() => setMenuHover(null)}
          >
            <Flex align="center" gap="4px">
              <span style={{
                textDecoration: "none",
                color: "black",
                fontSize: "14px",
                fontFamily: "GeneralSans",
              }}>
                {item.label}
              </span>
              <DownOutlined style={{ fontSize: "10px" }} />
            </Flex>

            {(menuSelected === item.key || menuHover === item.key) && (
              <img
                src={menuVector}
                alt="Menu Vector"
                style={{
                  height: "10px",
                  width: "30px",
                  margin: "0 auto",
                  transition: "transform 0.3s ease",
                  transform: menuHover === item.key ? "scale(1.2)" : "none",
                }}
              />
            )}
          </Flex>
        </Dropdown>
      );
    }

    // Regular menu item with link
    return (
      <Link
        to={item.path!}
        style={{
          textDecoration: "none",
          color: "black",
          fontSize: "14px",
          fontFamily: "GeneralSans",
        }}
      >
        <Flex
          vertical
          gap="8px"
          onClick={() => handleMenuClick(item.key)}
          style={{
            cursor: "pointer",
            transition: "transform 0.8s ease",
          }}
          onMouseEnter={() => setMenuHover(item.key)}
          onMouseLeave={() => setMenuHover(null)}
        >
          {item.label}

          {(menuSelected === item.key || menuHover === item.key) && (
            <img
              src={menuVector}
              alt="Menu Vector"
              style={{
                height: "10px",
                width: "30px",
                margin: "0 auto",
                transition: "transform 0.3s ease",
                transform: menuHover === item.key ? "scale(1.2)" : "none",
              }}
            />
          )}
        </Flex>
      </Link>
    );
  };

  const renderMobileNavItem = (item: NavItem) => {
    const hasSubItems = item.subItems && item.subItems.length > 0;

    if (hasSubItems) {
      const isExpanded = expandedMobileMenu === item.key;
      
      return (
        <div key={item.key}>
          <Flex
            justify="space-between"
            align="center"
            onClick={() => handleMobileMenuToggle(item.key)}
            style={{
              cursor: "pointer",
              padding: "12px 0",
              borderBottom: "1px solid #f0f0f0",
            }}
          >
            <span style={{
              fontSize: "16px",
              fontWeight: "500",
              fontFamily: "GeneralSans",
              color: "black",
            }}>
              {item.label}
            </span>
            <DownOutlined 
              style={{ 
                fontSize: "12px",
                transition: "transform 0.3s ease",
                transform: isExpanded ? "rotate(180deg)" : "none"
              }} 
            />
          </Flex>
          
          {isExpanded && (
            <div style={{ paddingLeft: "16px", marginBottom: "8px" }}>
              {item.subItems!.map((subItem) => (
                <Link
                  key={subItem.key}
                  to={subItem.path}
                  style={{
                    textDecoration: "none",
                    color: "black",
                  }}
                >
                  <div
                    onClick={() => handleMenuClick(subItem.key)}
                    style={{
                      padding: "8px 0",
                      fontSize: "14px",
                      fontFamily: "GeneralSans",
                      borderBottom: "1px solid #f8f8f8",
                      cursor: "pointer",
                    }}
                  >
                    {subItem.label}
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      );
    }

    // Regular menu item with link
    return (
      <Link
        key={item.key}
        to={item.path!}
        style={{
          textDecoration: "none",
          color: "black",
        }}
      >
        <div
          onClick={() => handleMenuClick(item.key)}
          style={{
            cursor: "pointer",
            padding: "12px 0",
            borderBottom: "1px solid #f0f0f0",
            fontSize: "16px",
            fontWeight: "500",
            fontFamily: "GeneralSans",
          }}
        >
          {item.label}
        </div>
      </Link>
    );
  };

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
      <Flex
        justify="space-between"
        align="center"
        style={{ marginBottom: "30px" }}
      >
        <img src={logo} alt="Logo" style={{ height: "40px", width: "auto" }} />
        <Button
          type="text"
          icon={<CloseOutlined />}
          onClick={() => setDrawerVisible(false)}
          style={{ fontSize: "18px" }}
        />
      </Flex>

      <Flex vertical gap="0">
        {navItems.map((item) => renderMobileNavItem(item))}
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
          maxWidth: "1000px",
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
                      width: "auto",
                    }}
                  />
                </Link>
              </Flex>
            )}

            {/* Desktop Navigation */}
            {!isMobile && (
              <>
                {navItems.slice(0, 3).map((item) => renderDesktopNavItem(item))}

                {/* Center Logo for desktop */}
                <Flex>
                  <Link to="/">
                    <img
                      src={logo}
                      alt="Logo"
                      style={{ height: "50px", width: "auto" }}
                    />
                  </Link>
                </Flex>

                {navItems.slice(3).map((item) => renderDesktopNavItem(item))}

                <Flex>
                  <Link to="/reserver">
                    <Button
                      type="primary"
                      size="large"
                      style={{
                        backgroundColor: isHovered ? "#ff3100" : "#F59F00",
                        color: isHovered ? "white" : "black",
                        borderRadius: "25px",
                        border: "none",
                        fontFamily: "GeneralSans",
                        transition: "all 0.3s ease",
                        fontSize: "16px",
                        fontWeight: "200",
                      }}
                      onMouseEnter={() => setIsHovered(true)}
                      onMouseLeave={() => setIsHovered(false)}
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