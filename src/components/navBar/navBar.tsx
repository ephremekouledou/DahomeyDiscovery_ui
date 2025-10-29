import { Link } from "react-router-dom";
import "./navBar.css";
import logo from "/images/Logo/logo-belge.png";
import menuVector from "../../assets/icons/menuVector.png";
import { Button, Flex, Drawer, Dropdown, Avatar, Badge } from "antd";
import { useState, useEffect } from "react";
import {
  MenuOutlined,
  CloseOutlined,
  DownOutlined,
  UserOutlined,
  LogoutOutlined,
  ShoppingCartOutlined,
} from "@ant-design/icons";
import { ClientsAPI } from "../../sdk/api/clients";
import { usePanier } from "../../context/panierContext";
import PaniersAPI from "../../sdk/api/panier";

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

interface IClient {
  id?: string;
  email: string;
  first_name: string;
  last_name: string;
  phone?: string;
  _id?: string;
}

const NavBar: React.FC<NavBarProps> = ({ menu }) => {
  const [menuSelected, setMenuSelected] = useState<string>(menu);
  const [menuHover, setMenuHover] = useState<string | null>(null);
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const [isTablet, setIsTablet] = useState<boolean>(false);
  const [drawerVisible, setDrawerVisible] = useState<boolean>(false);
  const [isLoginHovered, setIsLoginHovered] = useState(false);
  const [expandedMobileMenu, setExpandedMobileMenu] = useState<string | null>(
    null
  );
  const [scrolled, setScrolled] = useState<boolean>(false);
  const [user, setUser] = useState<IClient | null>(null);
  const [cartItemCount, setCartItemCount] = useState(0);
  const { panier, setPanier } = usePanier();

  // Enhanced responsive breakpoints
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      setIsMobile(width <= 768);
      setIsTablet(width > 768 && width <= 1024);
    };

    handleResize();
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

  // Check for logged in user
  useEffect(() => {
    const loggedUser = ClientsAPI.GetUser();
    setUser(loggedUser);
  }, []);

  // Fetch panier when user is logged in
  useEffect(() => {
    if (user != null) {
      PaniersAPI.GetActuelCustomer(user._id as string)
        .then((data) => {
          setPanier(data);
        })
        .catch((err) => {
          console.error("Error fetching current panier", err);
        });
    }
  }, [user, setPanier]);

  // Calculate cart item count
  useEffect(() => {
    const getCartItemCount = () => {
      if (!panier) {
        setCartItemCount(0);
        return;
      }

      const attractionsCount = panier.attractions
        ? panier.attractions.length
        : 0;
      const vehiculesCount = panier.vehicules ? panier.vehicules.length : 0;
      const hebergementsCount = panier.hebergements
        ? panier.hebergements.length
        : 0;
      const circuitsCount = panier.circuits ? panier.circuits.length : 0;
      const transfersCount = panier.transfers ? panier.transfers.length : 0;

      let count =
        attractionsCount +
        vehiculesCount +
        hebergementsCount +
        circuitsCount +
        transfersCount;

      if (panier.catalogue) {
        count += 1;
      }

      setCartItemCount(count);
    };

    getCartItemCount();
  }, [panier]);

  const handleMenuClick = (menuItem: string) => {
    setMenuSelected(menuItem);
    setDrawerVisible(false);
  };

  const handleMobileMenuToggle = (menuKey: string) => {
    setExpandedMobileMenu(expandedMobileMenu === menuKey ? null : menuKey);
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    window.location.href = "/";
  };

  const navItems: NavItem[] = [
    { key: "ACCUEIL", label: "Accueil", path: "/" },
    {
      key: "CIRCUITS",
      label: "Circuits",
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
    { key: "HÉBERGEMENT", label: "Hébergements", path: "/hebergements" },
    { key: "LOCATION", label: "Voitures", path: "/locations" },
    { key: "TRANSFERT", label: "Transferts", path: "/transferts" },
    { key: "RESTAU", label: "Restaurants", path: "/restaurants" },
    { key: "ATTRACTION", label: "Attractions", path: "/attractions" },
  ];

  // Dropdown menu items for user avatar
  const userMenuItems = [
    {
      key: "profile",
      label: (
        <Link
          to="/mon-profil"
          style={{ textDecoration: "none", color: "inherit" }}
        >
          <Flex align="center" gap="8px">
            <UserOutlined />
            <span style={{ fontFamily: "GeneralSans", fontSize: "14px" }}>
              Mon profil
            </span>
          </Flex>
        </Link>
      ),
    },
    {
      key: "logout",
      label: (
        <Flex
          align="center"
          gap="8px"
          onClick={handleLogout}
          style={{ cursor: "pointer" }}
        >
          <LogoutOutlined />
          <span style={{ fontFamily: "GeneralSans", fontSize: "14px" }}>
            Se déconnecter
          </span>
        </Flex>
      ),
    },
  ];

  // Get responsive font sizes based on device and scroll state
  const getResponsiveFontSize = (baseSize: number) => {
    if (isMobile) {
      return scrolled ? `${baseSize - 2}px` : `${baseSize}px`;
    }
    if (isTablet) {
      return scrolled ? `${baseSize - 1}px` : `${baseSize + 1}px`;
    }
    return scrolled ? `${baseSize}px` : `${baseSize + 2}px`;
  };

  // Get responsive logo height
  const getLogoHeight = () => {
    if (isMobile) {
      return scrolled ? "28px" : "32px";
    }
    if (isTablet) {
      return scrolled ? "35px" : "40px";
    }
    return scrolled ? "40px" : "50px";
  };

  // Get responsive padding
  const getContainerPadding = () => {
    if (isMobile) {
      return scrolled ? "8px 12px" : "12px 16px";
    }
    if (isTablet) {
      return scrolled ? "10px 20px" : "14px 24px";
    }
    return scrolled ? "12px 40px" : "16px 40px";
  };

  // Get responsive container height
  const getContainerHeight = () => {
    if (isMobile) {
      return scrolled ? "50px" : "60px";
    }
    if (isTablet) {
      return scrolled ? "55px" : "65px";
    }
    return scrolled ? "60px" : "70px";
  };

  // Get user initials for avatar
  const getUserInitials = () => {
    if (!user) return "";
    return (
      `${user.first_name.charAt(0)}`.toUpperCase() +
      `${user.last_name.charAt(0)}`.toUpperCase()
    );
  };

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
              fontSize: getResponsiveFontSize(13),
              padding: "8px 4px",
              display: "block",
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
          overlayStyle={{
            paddingTop: "15px",
            minWidth: isTablet ? "180px" : "200px",
          }}
        >
          <Flex
            vertical
            gap="8px"
            style={{
              cursor: "pointer",
              transition: "transform 0.8s ease",
              padding: isTablet ? "4px 8px" : "4px 12px",
            }}
            onMouseEnter={() => setMenuHover(item.key)}
            onMouseLeave={() => setMenuHover(null)}
          >
            <Flex align="center" gap="4px" justify="center">
              <span
                style={{
                  textDecoration: "none",
                  color: "black",
                  fontSize: getResponsiveFontSize(14),
                  fontFamily: "GeneralSans",
                  fontWeight: "500",
                  transition: "font-size 0.3s ease",
                  whiteSpace: "nowrap",
                  textAlign: "center",
                }}
              >
                {item.label}
              </span>
              <DownOutlined
                style={{
                  fontSize: isTablet ? "8px" : "10px",
                  marginLeft: "2px",
                }}
              />
            </Flex>

            {(menuSelected === item.key || menuHover === item.key) && (
              <img
                src={menuVector}
                alt="Menu Vector"
                style={{
                  height: isTablet ? "8px" : "10px",
                  width: isTablet ? "25px" : "30px",
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
            padding: isTablet ? "4px 8px" : "4px 12px",
          }}
          onMouseEnter={() => setMenuHover(item.key)}
          onMouseLeave={() => setMenuHover(null)}
        >
          <span
            style={{
              fontSize: getResponsiveFontSize(14),
              fontFamily: "GeneralSans",
              fontWeight: "500",
              transition: "font-size 0.3s ease",
              whiteSpace: "nowrap",
              textAlign: "center",
            }}
          >
            {item.label}
          </span>

          {(menuSelected === item.key || menuHover === item.key) && (
            <img
              src={menuVector}
              alt="Menu Vector"
              style={{
                height: isTablet ? "8px" : "10px",
                width: isTablet ? "25px" : "30px",
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
              padding: "14px 0",
              borderBottom: "1px solid #f0f0f0",
              minHeight: "48px",
            }}
          >
            <span
              style={{
                fontSize: isMobile ? "15px" : "16px",
                fontWeight: "500",
                fontFamily: "GeneralSans",
                color: "black",
                lineHeight: "1.4",
              }}
            >
              {item.label}
            </span>
            <DownOutlined
              style={{
                fontSize: "12px",
                transition: "transform 0.3s ease",
                transform: isExpanded ? "rotate(180deg)" : "none",
                marginLeft: "8px",
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
                      padding: "10px 0",
                      fontSize: isMobile ? "13px" : "14px",
                      fontFamily: "GeneralSans",
                      borderBottom: "1px solid #f8f8f8",
                      cursor: "pointer",
                      lineHeight: "1.4",
                      minHeight: "40px",
                      display: "flex",
                      alignItems: "center",
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
            padding: "14px 0",
            borderBottom: "1px solid #f0f0f0",
            fontSize: isMobile ? "15px" : "16px",
            fontWeight: "500",
            fontFamily: "GeneralSans",
            lineHeight: "1.4",
            minHeight: "48px",
            display: "flex",
            alignItems: "center",
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
      width={isMobile ? Math.min(280, window.innerWidth - 40) : 300}
      closable={false}
      styles={{
        body: { padding: isMobile ? "16px" : "20px" },
        header: { display: "none" },
      }}
    >
      <Flex
        justify="space-between"
        align="center"
        style={{ marginBottom: "30px" }}
      >
        <img
          src={logo}
          alt="Logo"
          style={{
            height: isMobile ? "32px" : "40px",
            width: "auto",
            maxWidth: "120px",
          }}
        />
        <Button
          type="text"
          icon={<CloseOutlined />}
          onClick={() => setDrawerVisible(false)}
          style={{
            fontSize: "18px",
            minWidth: "40px",
            height: "40px",
          }}
        />
      </Flex>

      <Flex vertical gap="0">
        {navItems.map((item) => renderMobileNavItem(item))}
      </Flex>

      {user ? (
        <Flex vertical gap="12px" style={{ marginTop: "30px" }}>
          <Link to="/mon-profil" style={{ width: "100%" }}>
            <Button
              type="default"
              size="large"
              block
              icon={<UserOutlined />}
              style={{
                backgroundColor: "transparent",
                color: "black",
                borderRadius: "25px",
                border: "2px solid #F59F00",
                height: isMobile ? "48px" : "50px",
                fontSize: isMobile ? "15px" : "16px",
                fontWeight: "600",
                fontFamily: "GeneralSans",
              }}
              onClick={() => setDrawerVisible(false)}
            >
              Mon profil
            </Button>
          </Link>

          <Button
            type="primary"
            size="large"
            block
            icon={<LogoutOutlined />}
            style={{
              backgroundColor: "#F59F00",
              color: "black",
              borderRadius: "25px",
              border: "none",
              height: isMobile ? "48px" : "50px",
              fontSize: isMobile ? "15px" : "16px",
              fontWeight: "600",
              fontFamily: "GeneralSans",
            }}
            onClick={() => {
              handleLogout();
              setDrawerVisible(false);
            }}
          >
            Se déconnecter
          </Button>
        </Flex>
      ) : (
        <Flex vertical gap="12px" style={{ marginTop: "30px" }}>
          <Link to="/login" style={{ width: "100%" }}>
            <Button
              type="default"
              size="large"
              block
              style={{
                backgroundColor: "transparent",
                color: "black",
                borderRadius: "25px",
                border: "2px solid #F59F00",
                height: isMobile ? "48px" : "50px",
                fontSize: isMobile ? "15px" : "16px",
                fontWeight: "600",
                fontFamily: "GeneralSans",
              }}
              onClick={() => setDrawerVisible(false)}
            >
              SE CONNECTER
            </Button>
          </Link>
        </Flex>
      )}
    </Drawer>
  );

  // Get spacer height for fixed navbar
  const getSpacerHeight = () => {
    if (isMobile) {
      return scrolled ? "66px" : "76px";
    }
    if (isTablet) {
      return scrolled ? "71px" : "81px";
    }
    return scrolled ? "76px" : "86px";
  };

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
          boxShadow: scrolled ? "0 2px 8px rgba(0, 0, 0, 0.1)" : "none",
        }}
      >
        <Flex
          style={{
            color: "black",
            width: "100%",
            maxWidth: isMobile ? "100%" : isTablet ? "900px" : "1200px",
            margin: "0 auto",
            padding: isMobile ? "0 12px" : "0 20px",
          }}
          justify="center"
          align="center"
        >
          <nav style={{ width: "100%" }}>
            <Flex
              style={{
                backgroundColor: "white",
                width: "100%",
                padding: getContainerPadding(),
                transition: "all 0.3s ease",
                height: getContainerHeight(),
              }}
              justify="space-between"
              align="center"
              gap={isMobile ? "12px" : isTablet ? "20px" : "36px"}
            >
              {/* Mobile Logo */}
              {isMobile && (
                <Flex flex="1">
                  <Link to="/">
                    <img
                      src={logo}
                      alt="Logo"
                      style={{
                        height: getLogoHeight(),
                        width: "auto",
                        transition: "height 0.3s ease",
                        maxWidth: "100px",
                      }}
                    />
                  </Link>
                </Flex>
              )}

              {/* Desktop and Tablet Navigation */}
              {!isMobile && (
                <>
                  {/* Center Logo */}
                  <Flex justify="center" style={{ margin: "0 16px" }}>
                    <Link to="/">
                      <img
                        src={logo}
                        alt="Logo"
                        style={{
                          height: getLogoHeight(),
                          width: "auto",
                          transition: "height 0.3s ease",
                          maxWidth: isTablet ? "120px" : "150px",
                        }}
                      />
                    </Link>
                  </Flex>

                  {/* Nav items and action buttons */}
                  <Flex
                    align="center"
                    gap={isTablet ? "8px" : "16px"}
                    flex="1"
                    justify="flex-end"
                  >
                    {navItems.map((item) => renderDesktopNavItem(item))}

                    {/* Cart Button - Always visible */}
                    <Link to="/reserver">
                      <Badge count={cartItemCount} overflowCount={99}>
                        <Button
                          type="text"
                          icon={<ShoppingCartOutlined />}
                          style={{
                            fontSize: isTablet ? "20px" : "22px",
                            color: cartItemCount > 0 ? "#F59F00" : "black",
                            transition: "all 0.3s ease",
                            width: isTablet ? "36px" : "40px",
                            height: isTablet ? "36px" : "40px",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                        />
                      </Badge>
                    </Link>

                    {user ? (
                      // User is logged in - show avatar with dropdown
                      <Dropdown
                        menu={{ items: userMenuItems }}
                        trigger={["hover"]}
                        placement="bottomRight"
                        overlayStyle={{
                          paddingTop: "8px",
                          minWidth: "180px",
                        }}
                      >
                        <Avatar
                          style={{
                            backgroundColor: "#fff",
                            borderColor: "#F59F00",
                            border: "2px solid",
                            color: "black",
                            cursor: "pointer",
                            fontFamily: "GeneralSans",
                            fontWeight: "600",
                            fontSize: isTablet ? "14px" : "16px",
                            width: isTablet
                              ? scrolled
                                ? "36px"
                                : "40px"
                              : scrolled
                              ? "40px"
                              : "44px",
                            height: isTablet
                              ? scrolled
                                ? "36px"
                                : "40px"
                              : scrolled
                              ? "40px"
                              : "44px",
                            transition: "all 0.3s ease",
                          }}
                        >
                          {getUserInitials()}
                        </Avatar>
                      </Dropdown>
                    ) : (
                      // User is not logged in - show login button
                      <Link to="/login">
                        <Button
                          type="default"
                          size={scrolled ? "middle" : "large"}
                          style={{
                            backgroundColor: isLoginHovered
                              ? "#F59F00"
                              : "transparent",
                            color: isLoginHovered ? "black" : "black",
                            borderRadius: "25px",
                            border: "2px solid #F59F00",
                            fontFamily: "GeneralSans",
                            transition: "all 0.3s ease",
                            fontSize: isTablet
                              ? "12px"
                              : getResponsiveFontSize(13),
                            height: isTablet
                              ? scrolled
                                ? "32px"
                                : "36px"
                              : scrolled
                              ? "36px"
                              : "40px",
                            padding: isTablet
                              ? "0 10px"
                              : scrolled
                              ? "0 14px"
                              : "0 16px",
                            fontWeight: "600",
                            whiteSpace: "nowrap",
                          }}
                          onMouseEnter={() => setIsLoginHovered(true)}
                          onMouseLeave={() => setIsLoginHovered(false)}
                        >
                          SE CONNECTER
                        </Button>
                      </Link>
                    )}
                  </Flex>
                </>
              )}

              {/* Mobile: Cart and Menu Button */}
              {isMobile && (
                <Flex align="center" gap="8px">
                  {/* Cart Button */}
                  <Link to="/reserver">
                    <Badge count={cartItemCount} overflowCount={99}>
                      <Button
                        type="text"
                        icon={<ShoppingCartOutlined />}
                        style={{
                          fontSize: "20px",
                          color: cartItemCount > 0 ? "#F59F00" : "black",
                          padding: "8px",
                          height: "40px",
                          width: "40px",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      />
                    </Badge>
                  </Link>

                  {/* Menu Button */}
                  <Button
                    type="text"
                    icon={<MenuOutlined />}
                    onClick={() => setDrawerVisible(true)}
                    style={{
                      fontSize: "18px",
                      padding: "8px",
                      height: "40px",
                      width: "40px",
                      color: "black",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  />
                </Flex>
              )}
            </Flex>
          </nav>
        </Flex>
      </div>

      {/* Spacer to prevent content from being hidden behind fixed navbar */}
      <div
        style={{
          height: getSpacerHeight(),
          transition: "height 0.3s ease",
        }}
      />

      {/* Mobile Drawer Menu */}
      {(isMobile || isTablet) && renderMobileMenu()}
    </>
  );
};

export default NavBar;
