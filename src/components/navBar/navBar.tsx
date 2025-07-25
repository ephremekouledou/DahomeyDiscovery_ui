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
  const [expandedMobileMenu, setExpandedMobileMenu] = useState<string | null>(
    null
  );
  const [scrolled, setScrolled] = useState<boolean>(false);

  // Handle responsive breakpoint
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    handleResize(); // Check initial size
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setScrolled(scrollPosition > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
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
      ],
    },
    {
      key: "OFFRES",
      label: "NOS OFFRES",
      subItems: [
        {
          key: "HÉBERGEMENT",
          label: "Hébergement",
          path: "/hebergement",
        },
        {
          key: "LOCATION",
          label: "Location de voiture",
          path: "/location de voiture",
        },
      ],
    },
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
              fontSize: "14px",
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
          trigger={["hover"]}
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
              <span
                style={{
                  textDecoration: "none",
                  color: "black",
                  fontSize: scrolled ? "13px" : "14px",
                  fontFamily: "GeneralSans",
                  fontWeight: "500",
                  transition: "font-size 0.3s ease",
                }}
              >
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
          <span
            style={{
              fontSize: scrolled ? "13px" : "14px",
              fontFamily: "GeneralSans",
              fontWeight: "500",
              transition: "font-size 0.3s ease",
            }}
          >
            {item.label}
          </span>

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
            <span
              style={{
                fontSize: "16px",
                fontWeight: "500",
                fontFamily: "GeneralSans",
                color: "black",
              }}
            >
              {item.label}
            </span>
            <DownOutlined
              style={{
                fontSize: "12px",
                transition: "transform 0.3s ease",
                transform: isExpanded ? "rotate(180deg)" : "none",
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
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 1000,
          transition: "all 0.3s ease",
          backgroundColor: "white",
          backdropFilter: scrolled ? "blur(10px)" : "none",
          borderBottom: scrolled ? "1px solid rgba(0, 0, 0, 0.1)" : "none",
          padding: scrolled ? "8px 0" : "16px 0",
        }}
      >
        <Flex
          style={{
            color: "black",
            width: "100%",
            maxWidth: "1200px",
            margin: "0 auto",
            padding: "0 20px",
          }}
          justify="center"
          align="center"
        >
          <nav style={{ width: "100%" }}>
            <Flex
              style={{
                backgroundColor: "white",
                width: "100%",
                padding: scrolled
                  ? isMobile
                    ? "8px 16px"
                    : "12px 40px"
                  : isMobile
                  ? "12px 16px"
                  : "16px 40px",
                transition: "all 0.3s ease",
                height: scrolled
                  ? isMobile
                    ? "50px"
                    : "60px"
                  : isMobile
                  ? "60px"
                  : "70px",
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
                        height: scrolled ? "30px" : "35px",
                        width: "auto",
                        transition: "height 0.3s ease",
                      }}
                    />
                  </Link>
                </Flex>
              )}

              {/* Desktop Navigation */}
              {!isMobile && (
                <>
                  {navItems
                    .slice(0, 3)
                    .map((item) => renderDesktopNavItem(item))}

                  {/* {navItems
                    .slice(2, 3)
                    .map((item) => renderDesktopNavItem(item))} */}

                  {/* Center Logo for desktop */}
                  <Flex>
                    <Link to="/">
                      <img
                        src={logo}
                        alt="Logo"
                        style={{
                          height: scrolled ? "40px" : "50px",
                          width: "auto",
                          transition: "height 0.3s ease",
                        }}
                      />
                    </Link>
                  </Flex>

                  {navItems.slice(3).map((item) => renderDesktopNavItem(item))}

                  <Flex>
                    <Link to="/reserver">
                      <Button
                        type="primary"
                        size={scrolled ? "middle" : "large"}
                        style={{
                          backgroundColor: isHovered ? "#ff3100" : "#F59F00",
                          color: isHovered ? "white" : "black",
                          borderRadius: "25px",
                          border: "none",
                          fontFamily: "GeneralSans",
                          transition: "all 0.3s ease",
                          fontSize: scrolled ? "14px" : "16px",
                          height: scrolled ? "36px" : "40px",
                          padding: scrolled ? "0 16px" : "0 20px",
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
      </div>

      {/* Spacer to prevent content from being hidden behind fixed navbar */}
      <div
        style={{
          height: scrolled ? "76px" : "102px",
          transition: "height 0.3s ease",
        }}
      />

      {/* Mobile Drawer Menu */}
      {isMobile && renderMobileMenu()}
    </>
  );
};

export default NavBar;
