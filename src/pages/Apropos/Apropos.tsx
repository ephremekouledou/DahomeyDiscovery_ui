import Footer from "../../components/footer/footer";
import NavBar from "../../components/navBar/navBar";
import { Layout, Flex, Row, Col, Typography, Button } from "antd";
import vector from "../../assets/icons/aproposVector.svg";
import mmeDerby from "../../assets/images/mmeDerby.png";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
// import img1 from "../../assets/images/1.jpg";
import img2 from "../../assets/images/2.jpg";
// import img3 from "../../assets/images/3.jpg";
import img4 from "../../assets/images/4.jpg";
// import img5 from "../../assets/images/5.jpg";
import img6 from "../../assets/images/6.jpg";
// import img7 from "../../assets/images/7.jpg";
import img8 from "../../assets/images/8.jpg";
// import img9 from "../../assets/images/9.jpg";
import img10 from "../../assets/images/10.jpg";
import ImageCarousel from "../../components/ImageGallery/ImageCarousel";
/* import img11 from "../../assets/images/11.jpg";
import img12 from "../../assets/images/12.jpg";
import img13 from "../../assets/images/13.jpg";
import img14 from "../../assets/images/14.png"; */

const images = [
  // img1,
  img2,
  // img3,
  img4,
  // img5,
  img6,
  // img7,
  img8,
  // img9,
  img10,
  // img11,
  // img12,
  // img13,
  // img14,
];
const { Content } = Layout;
const { Title, Paragraph } = Typography;

const Apropos = () => {
  const { pathname } = useLocation();

  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    document.title = "A Propos";
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <Flex justify="center" vertical>
      <div className="relative z-20 flex items-center justify-center">
        <NavBar menu="A PROPOS" />
      </div>
      <Flex style={{ width: "100%", background: "#FEF1D9" }}>
        <Flex vertical style={{ maxWidth: "1600px", margin: "0 auto" }}>
          <Layout
            style={{
              background: "#FEF1D9",
              paddingTop: "5vw",
              paddingBottom: "40px",
            }}
          >
            <Flex>
              {/* Logo et titre */}
              <div
                style={{
                  marginBottom: "40px",
                  width: "100%",
                  padding: "0 5vw",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    marginBottom: "10px",
                  }}
                >
                  <div
                    style={{
                      borderRadius: "10px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      marginRight: "20px",
                    }}
                  >
                    <img
                      src={vector}
                      alt="Logo Dahomey Discovery"
                      style={{ width: "7vw", height: "7vw" }}
                    />
                  </div>
                  <div>
                    <Typography
                      style={{
                        margin: 0,
                        color: "#e74c3c",
                        fontSize: "clamp(44px, 4vw, 78px)",
                        fontFamily: "DragonAngled",
                        //   fontWeight: "bold",
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
                        fontSize: "clamp(44px, 4vw, 78px)",
                        fontFamily: "DragonAngled",
                        //   fontWeight: "bold",
                        lineHeight: 1.2,
                      }}
                    >
                      <b>Dahomey Discovery</b>
                    </Title>
                  </div>
                </div>
              </div>
            </Flex>
            <Content style={{ padding: "0 13vw" }}>
              <div style={{ position: "relative" }}>
                {/* Éléments décoratifs */}
                <Row gutter={[40, 40]} align="top">
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
                          <b>Dahomey Discovery</b> est une agence de voyages
                          engagée et immersive, née d'un rêve simple : permettre
                          à chacun de reconnecter avec la Terre Mère à travers
                          des séjours riches en culture, émotions et rencontres
                          humaines.
                        </Paragraph>

                        <Paragraph
                          style={{
                            fontSize: "16px",
                            lineHeight: 1.6,
                            color: "#2c3e50",
                            fontFamily: "GeneralSans",
                          }}
                        >
                          Fondée par <b>Zoulfati</b>, entrepreneure
                          franco-mahoraise vivant entre la Guyane, la France et
                          le Bénin, Dahomey Discovery incarne un tourisme
                          nouveau : authentique, responsable, enraciné et
                          vibrant.
                        </Paragraph>
                      </div>
                    </div>
                  </Col>
                </Row>
              </div>
            </Content>
          </Layout>
        </Flex>
      </Flex>
      <Flex style={{ width: "100%", background: "white" }}>
        <Flex vertical style={{ maxWidth: "1600px", margin: "0 auto" }}>
          <Layout
            style={{
              background: "white",
              paddingTop: "50px",
              paddingBottom: "80px",
            }}
          >
            <Content style={{ padding: "0 13vw" }}>
              <div style={{ position: "relative" }}>
                {/* Éléments décoratifs */}
                <Row gutter={[40, 40]} align="top">
                  <Col xs={24} lg={12}>
                    <div style={{ position: "relative", zIndex: 1 }}>
                      {/* Description */}
                      <div style={{ marginBottom: "40px" }}>
                        {/* Mission */}
                        <div style={{ marginBottom: "40px" }}>
                          <Typography
                            style={{
                              color: "#1D0D0D",
                              fontSize: "clamp(34px, 4vw, 58px)",
                              fontFamily: "DragonAngled",
                            }}
                          >
                            Mission
                          </Typography>
                          <Paragraph
                            style={{
                              fontSize: "16px",
                              lineHeight: 1.6,
                              color: "#2c3e50",
                              marginBottom: "30px",
                              fontFamily: "GeneralSans",
                            }}
                          >
                            Faire du Bénin une destination de cœur pour les
                            voyageurs afro-descendants, les curieux du monde,
                            les familles ou les aventuriers modernes qui veulent
                            donner du sens à leur voyage.
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
                    </div>
                  </Col>

                  <Col xs={0} lg={12}>
                    <div
                      style={{
                        position: "absolute",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        bottom: "-50px",
                        left: "120px",
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
        </Flex>
      </Flex>
      <section style={{ height: "45vw" }}>
        <ImageCarousel images={images} />
      </section>
      <Footer />
    </Flex>
  );
};

export default Apropos;
