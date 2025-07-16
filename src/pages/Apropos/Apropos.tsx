import Footer from "../../components/footer/footer";
import NavBar from "../../components/navBar/navBar";
import { Layout, Flex, Row, Col, Typography, Button } from "antd";
import vector from "../../assets/icons/aproposVector.svg";
import mmeDerby from "../../assets/images/mmeDerby.png";
import ImageGallery from "../../components/ImageGallery/imageGallery";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
const { Content } = Layout;
const { Title, Paragraph } = Typography;

const Apropos = () => {
  const images = [
    {
      id: 1,
      src: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop",
      alt: "Artisanat traditionnel",
      title: "Artisanat Local",
      description: "Découvrez l'artisanat traditionnel local",
    },
    {
      id: 2,
      src: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=400&h=300&fit=crop",
      alt: "Architecture sur pilotis",
      title: "Villages Lacustres",
      description: "Architecture traditionnelle sur l'eau",
    },
    {
      id: 3,
      src: "https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?w=400&h=300&fit=crop",
      alt: "Art contemporain",
      title: "Art Moderne",
      description: "Œuvres d'art contemporain",
    },
    {
      id: 4,
      src: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=400&h=300&fit=crop",
      alt: "Architecture traditionnelle",
      title: "Habitations Locales",
      description: "Architecture résidentielle traditionnelle",
    },
  ];
  const { pathname } = useLocation();

  useEffect(() => {
    document.title = "A Propos";
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <Flex justify="center" vertical>
      <div className="relative z-20 flex items-center justify-center p-8">
        <NavBar menu="A PROPOS" />
      </div>
      <Flex style={{ maxWidth: "1600px", margin: "0 auto" }}>
        <DahomeyDiscovery />
      </Flex>
      <Flex
        style={{ backgroundColor: "#F59F00" /* padding: "3vh 0" */ }}
        vertical
        gap={24}
      >
        <ImageGallery images={images} />
      </Flex>
      <Footer />
    </Flex>
  );
};

const DahomeyDiscovery = () => {
  const [isHovered, setIsHovered] = useState(false);
  return (
    <Layout
      style={{ background: "white", padding: "10vh 0", marginBottom: "20vh" }}
    >
      <Flex>
        {/* Logo et titre */}
        <div style={{ marginBottom: "40px", width: "100%", padding: "0 5vw" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              marginBottom: "10px",
            }}
          >
            <div
              style={{
                // width: '60px',
                // height: '60px',
                // background: 'linear-gradient(135deg, #ffd89b 0%, #19547b 100%)',
                borderRadius: "10px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginRight: "20px",
                // boxShadow: '0 4px 15px rgba(0,0,0,0.1)'
              }}
            >
              <img
                src={vector}
                alt="Logo Dahomey Discovery"
                style={{ width: "7vw", height: "7vh" }}
              />
            </div>
            <div>
              <Title
                level={1}
                style={{
                  margin: 0,
                  color: "#e74c3c",
                  fontSize: "clamp(44px, 4vw, 78px)",
                  fontFamily: "DragonAngled",
                  //   fontWeight: "bold",
                  lineHeight: 1.2,
                }}
              >
                Agence
                <br />
                <b>Dahomey Discovery</b>
              </Title>
            </div>
          </div>
        </div>
      </Flex>
      <Content style={{ padding: "0 13vw" }}>
        <div style={{ position: "relative" }}>
          {/* Éléments décoratifs */}
          <div
            style={{
              position: "absolute",
              top: "100px",
              right: "100px",
              width: "60px",
              height: "60px",
              background: "#ff6b6b",
              borderRadius: "50%",
              opacity: 0.2,
              zIndex: 0,
            }}
          />
          <div
            style={{
              position: "absolute",
              bottom: "50px",
              left: "50px",
              width: "40px",
              height: "40px",
              background: "#4ecdc4",
              borderRadius: "50%",
              opacity: 0.3,
              zIndex: 0,
            }}
          />

          <Row gutter={[40, 40]} align="middle">
            <Col xs={24} lg={12}>
              <div style={{ position: "relative", zIndex: 1 }}>
                {/* Description */}
                <div style={{ marginBottom: "40px" }}>
                  <Paragraph
                    style={{
                      fontSize: "16px",
                      lineHeight: 1.6,
                      color: "#2c3e50",
                      marginBottom: "20px",
                      fontFamily: "GeneralSans",
                    }}
                  >
                    <b>Dahomey Discovery</b> est une agence de voyages engagée
                    et immersive, née d'un rêve simple : permettre à chacun de
                    reconnecter avec la Terre Mère à travers des séjours riches
                    en culture, émotions et rencontres humaines.
                  </Paragraph>

                  <Paragraph
                    style={{
                      fontSize: "16px",
                      lineHeight: 1.6,
                      color: "#2c3e50",
                      fontFamily: "GeneralSans",
                    }}
                  >
                    Fondée par <b>Zoulfati</b>, entrepreneure franco-mahoraise
                    vivant entre la Guyane, la France et le Bénin, Dahomey
                    Discovery incarne un tourisme nouveau : authentique,
                    responsable, enraciné et vibrant.
                  </Paragraph>
                </div>

                {/* Mission */}
                <div style={{ marginBottom: "40px" }}>
                  <Title
                    level={2}
                    style={{
                      color: "#1D0D0D",
                      fontSize: "clamp(34px, 4vw, 58px)",
                      marginBottom: "20px",
                      // fontWeight: "bold",
                      fontFamily: "DragonAngled",
                    }}
                  >
                    Mission
                  </Title>
                  <Paragraph
                    style={{
                      fontSize: "16px",
                      lineHeight: 1.6,
                      color: "#2c3e50",
                      marginBottom: "30px",
                      fontFamily: "GeneralSans",
                    }}
                  >
                    Faire du Bénin une destination de cœur pour les voyageurs
                    afro-descendants, les curieux du monde, les familles ou les
                    aventuriers modernes qui veulent donner du sens à leur
                    voyage.
                  </Paragraph>
                </div>

                {/* Bouton */}
                <Button
                  type="primary"
                  size="large"
                  style={{
                    backgroundColor: isHovered ? "#ff3100" : "#F59F00",
                    border: "none",
                    borderRadius: "30px",
                    padding: "12px 30px",
                    height: "auto",
                    fontSize: "16px",
                    fontWeight: "500",
                    boxShadow: "0 4px 15px rgba(255, 107, 53, 0.3)",
                    transition: "all 0.3s ease",
                    color: isHovered ? "white" : "black",
                    fontFamily: "GeneralSans",
                  }}
                  onMouseEnter={() => setIsHovered(true)}
                  onMouseLeave={() => setIsHovered(false)}
                >
                  Je choisis mon expérience
                </Button>
              </div>
            </Col>

            <Col xs={24} lg={12}>
              <div
                style={{
                  position: "relative",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                {/* Arrière-plan décoratif pour l'image */}
                <div
                  style={{
                    position: "absolute",
                    width: "300px",
                    height: "400px",
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
                    width: "320px",
                    height: "420px",
                    background:
                      "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
                    borderRadius: "20px",
                    transform: "rotate(5deg)",
                    opacity: 0.1,
                    zIndex: 0,
                  }}
                />

                {/* Container de l'image */}
                <div
                  style={{
                    position: "relative",
                    width: "280px",
                    height: "380px",
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
        </div>
      </Content>
    </Layout>
  );
};

export default Apropos;
