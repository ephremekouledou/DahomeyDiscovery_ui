import Footer from "../../components/footer/footer";
import NavBar from "../../components/navBar/navBar";
import { Layout, Flex, Row, Col, Typography, Button } from "antd";
import vector from "../../assets../../assets/icons/aproposVector.svg";
import mmeDerby from "/images/mmeDerby.png";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import ImageCarousel from "../../components/ImageGallery/ImageCarousel";
import BeginningButton from "../../components/dededed/BeginingButton";
import { emptyIPageMedia, IPageMedia } from "../../sdk/models/pagesMedias";
import { useScreenSizeResponsive } from "../../components/CircuitView/Timeline";
import { PageSettings } from "../../sdk/api/pageMedias";
import { HandleGetFileLink } from "../Circuits/CircuitsCartes";
import FloatingCartButton from "../../components/dededed/PanierButton";

const { Content } = Layout;
const { Title, Paragraph } = Typography;

const Apropos = () => {
  const { pathname } = useLocation();
  const [isHovered, setIsHovered] = useState(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [settings, setSettings] = useState<IPageMedia>(emptyIPageMedia());
  const screenSize = useScreenSizeResponsive();

  useEffect(() => {
    document.title = "A Propos";
    window.scrollTo(0, 0);
  }, [pathname]);

  useEffect(() => {
    PageSettings.List()
      .then((data) => {
        console.log("the settings are:", data);
        setSettings(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching circuits:", err);
      });
  }, []);

  return (
    <Flex justify="center" vertical>
      <BeginningButton />
      <FloatingCartButton />
      {/* Navigation */}
      <div className="relative z-20 flex items-center justify-center">
        <NavBar menu="A PROPOS" />
      </div>

      {/* Section Hero avec titre */}
      <Flex style={{ width: "100%", background: "#FEF1D9" }}>
        <Flex
          vertical
          style={{ maxWidth: "1600px", margin: "0 auto", width: "100%" }}
        >
          <Layout
            style={{
              background: "#FEF1D9",
              paddingTop: "clamp(40px, 5vw, 80px)",
              paddingBottom: "clamp(30px, 4vw, 60px)",
            }}
          >
            {/* Logo et titre - Responsive */}
            <div
              style={{
                marginBottom: "clamp(30px, 4vw, 50px)",
                width: "100%",
                padding: "0 clamp(20px, 5vw, 80px)",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  flexDirection: "row",
                  gap: "clamp(15px, 3vw, 25px)",
                }}
              >
                <div
                  style={{
                    borderRadius: "10px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                  }}
                >
                  <img
                    src={vector}
                    alt="Logo Dahomey Discovery"
                    style={{
                      width: "clamp(50px, 7vw, 100px)",
                      height: "clamp(50px, 7vw, 100px)",
                      maxWidth: "100px",
                    }}
                  />
                </div>
                <div style={{ flex: 1 }}>
                  <Typography
                    style={{
                      margin: 0,
                      color: "#e74c3c",
                      fontSize: "clamp(28px, 5vw, 58px)",
                      fontFamily: "DragonAngled",
                      lineHeight: 1,
                    }}
                  >
                    Agence
                  </Typography>
                  <Title
                    level={1}
                    style={{
                      margin: 0,
                      color: "#e74c3c",
                      fontSize: "clamp(28px, 5vw, 58px)",
                      fontFamily: "DragonAngled",
                      fontWeight: "bold",
                      lineHeight: 1.1,
                    }}
                  >
                    Dahomey Discovery
                  </Title>
                </div>
              </div>
            </div>

            {/* Section description */}
            <Content style={{ padding: "0 clamp(20px, 5vw, 80px)" }}>
              <Row gutter={[0, 40]} align="top">
                <Col xs={24} lg={14} xl={12}>
                  <div style={{ maxWidth: "600px" }}>
                    <Paragraph
                      style={{
                        fontSize: "clamp(14px, 2.5vw, 18px)",
                        lineHeight: 1.6,
                        color: "#2c3e50",
                        marginBottom: "20px",
                        fontFamily: "GeneralSans",
                      }}
                    >
                      <b>Dahomey Discovery</b> est une agence de voyages engagée
                      et immersive, née d'un rêve simple : permettre à chacun de
                      reconnecter avec la Terre Mère à travers des séjours
                      riches en culture, émotions et rencontres humaines.
                    </Paragraph>

                    <Paragraph
                      style={{
                        fontSize: "clamp(14px, 2.5vw, 18px)",
                        lineHeight: 1.6,
                        color: "#2c3e50",
                        fontFamily: "GeneralSans",
                        marginBottom: 0,
                      }}
                    >
                      Fondée par <b>Zoulfati</b>, entrepreneure franco-mahoraise
                      vivant entre la Guyane, la France et le Bénin, Dahomey
                      Discovery incarne un tourisme nouveau : authentique,
                      responsable, enraciné et vibrant.
                    </Paragraph>
                  </div>
                </Col>
              </Row>
            </Content>
          </Layout>
        </Flex>
      </Flex>

      {/* Section Mission avec image */}
      <Flex style={{ width: "100%", background: "white" }}>
        <Flex
          vertical
          style={{ maxWidth: "1600px", margin: "0 auto", width: "100%" }}
        >
          <Layout
            style={{
              background: "white",
              paddingTop: "clamp(40px, 6vw, 80px)",
              paddingBottom: "clamp(60px, 8vw, 120px)",
            }}
          >
            <Content style={{ padding: "0 clamp(20px, 5vw, 80px)" }}>
              <Row gutter={[40, 40]} align="middle">
                {/* Colonne texte */}
                <Col xs={24} lg={12} xl={10}>
                  <div style={{ maxWidth: "500px" }}>
                    {/* Mission */}
                    <div style={{ marginBottom: "clamp(30px, 4vw, 50px)" }}>
                      <Typography
                        style={{
                          color: "#1D0D0D",
                          fontSize: "clamp(28px, 5vw, 48px)",
                          fontFamily: "DragonAngled",
                          marginBottom: "clamp(15px, 2vw, 25px)",
                          lineHeight: 1.2,
                        }}
                      >
                        Mission
                      </Typography>
                      <Paragraph
                        style={{
                          fontSize: "clamp(14px, 2.5vw, 18px)",
                          lineHeight: 1.6,
                          color: "#2c3e50",
                          marginBottom: "clamp(25px, 4vw, 40px)",
                          fontFamily: "GeneralSans",
                        }}
                      >
                        Faire du Bénin une destination de cœur pour les
                        voyageurs afro-descendants, les curieux du monde, les
                        familles ou les aventuriers modernes qui veulent donner
                        du sens à leur voyage.
                      </Paragraph>
                    </div>

                    {/* Bouton responsive */}
                    <Button
                      type="primary"
                      size="large"
                      style={{
                        backgroundColor: isHovered ? "#ff3100" : "#F59F00",
                        border: "none",
                        borderRadius: "30px",
                        padding:
                          "clamp(10px, 2vw, 15px) clamp(20px, 4vw, 35px)",
                        height: "auto",
                        fontSize: "clamp(14px, 2.5vw, 16px)",
                        fontWeight: "500",
                        boxShadow: "0 4px 15px rgba(255, 107, 53, 0.3)",
                        transition: "all 0.3s ease",
                        color: isHovered ? "white" : "black",
                        fontFamily: "GeneralSans",
                        width: "100%",
                        maxWidth: "280px",
                      }}
                      onMouseEnter={() => setIsHovered(true)}
                      onMouseLeave={() => setIsHovered(false)}
                    >
                      Je choisis mon expérience
                    </Button>
                  </div>
                </Col>

                {/* Colonne image - Masquée sur mobile et tablette */}
                <Col xs={0} lg={12} xl={14}>
                  <div
                    style={{
                      position: "relative",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      minHeight: "400px",
                    }}
                  >
                    {/* Arrière-plans décoratifs - Plus petits et adaptés */}
                    <div
                      style={{
                        position: "absolute",
                        width: "clamp(250px, 25vw, 350px)",
                        height: "clamp(320px, 32vw, 450px)",
                        background:
                          "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                        borderRadius: "20px",
                        transform: "rotate(-5deg)",
                        opacity: 0.1,
                        zIndex: 0,
                      }}
                    />
                    <div
                      style={{
                        position: "absolute",
                        width: "clamp(270px, 27vw, 380px)",
                        height: "clamp(340px, 34vw, 480px)",
                        background:
                          "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
                        borderRadius: "20px",
                        transform: "rotate(5deg)",
                        opacity: 0.1,
                        zIndex: 0,
                      }}
                    />

                    {/* Container de l'image responsive */}
                    <div
                      style={{
                        position: "relative",
                        width: "clamp(240px, 24vw, 320px)",
                        height: "clamp(300px, 30vw, 420px)",
                        borderRadius: "20px",
                        overflow: "hidden",
                        boxShadow: "0 20px 40px rgba(0,0,0,0.1)",
                        zIndex: 1,
                      }}
                    >
                      <img
                        src={mmeDerby}
                        alt="Femme avec enfant sur la plage"
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                        }}
                      />
                    </div>
                  </div>
                </Col>
              </Row>
            </Content>
          </Layout>
        </Flex>
      </Flex>

      {/* Section Carrousel - Hauteur responsive */}
      {!loading && (
        <section
          style={{
            height: screenSize.isMobile
              ? "60vw"
              : screenSize.isTablet
              ? "50vw"
              : "45vw",
            width: "100%",
          }}
        >
          {settings.locations_carrousel.length > 0 &&
            settings.locations_carrousel[0].file !== null && (
              <ImageCarousel
                images={settings.locations_carrousel.map((item) =>
                  HandleGetFileLink(item.file as string)
                )}
              />
            )}
        </section>
      )}

      <Footer />
    </Flex>
  );
};

export default Apropos;
