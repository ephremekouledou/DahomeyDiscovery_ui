import { Card, Col, Flex, Row, Tabs, Typography, Button } from "antd";
import { RightOutlined } from "@ant-design/icons";
import NavBar from "../../components/navBar/navBar";
import Footer from "../../components/footer/footer";
const { Title, Text } = Typography;

const BonneAddress = () => {
  const establishments = [
    {
      id: 1,
      type: "hotel",
      name: "HOTEL Z",
      description: "Lorem ipsum dolor sit amet,",
      price: "100.000 XOF / nuit",
      image:
        "https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    },
    {
      id: 2,
      type: "restaurant",
      name: "Restaurant",
      description: "Lorem ipsum dolor sit amet,",
      price: "8.000 XOF et plus",
      image:
        "https://images.unsplash.com/photo-1544148103-0773bf10d330?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    },
    {
      id: 3,
      type: "hotel",
      name: "HOTEL Z",
      description: "Lorem ipsum dolor sit amet,",
      price: "100.000 XOF / nuit",
      image:
        "https://images.unsplash.com/photo-1544148103-0773bf10d330?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    },
    {
      id: 4,
      type: "restaurant",
      name: "Restaurant",
      description: "Lorem ipsum dolor sit amet,",
      price: "8.000 XOF et plus",
      image:
        "https://images.unsplash.com/photo-1544148103-0773bf10d330?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    },
    {
      id: 5,
      type: "hotel",
      name: "HOTEL Z",
      description: "Lorem ipsum dolor sit amet,",
      price: "100.000 XOF / nuit",
      image:
        "https://images.unsplash.com/photo-1544148103-0773bf10d330?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    },
  ];

  const hotels = [
    {
      id: 1,
      name: "HOTEL Z",
      description: "Lorem ipsum dolor sit amet,",
      image:
        "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    },
    {
      id: 2,
      name: "HOTEL Z",
      description: "Lorem ipsum dolor sit amet,",
      image:
        "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    },
    {
      id: 3,
      name: "HOTEL Z",
      description: "Lorem ipsum dolor sit amet,",
      image:
        "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    },
    {
      id: 4,
      name: "HOTEL Z",
      description: "Lorem ipsum dolor sit amet,",
      image:
        "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
    },
  ];

  return (
    <Flex justify="center" vertical>
      <div
        className="relative z-20 flex items-center justify-center p-8"
        style={{ backgroundColor: "#FEF1D9" }}
      >
        <NavBar menu="ADRESSES" />
      </div>
      <Flex vertical style={{ backgroundColor: "#FEF1D9", padding: "8vh 8vw" }}>
        <Typography.Title
          level={1}
          style={{
            color: "#FF3100",
            fontSize: "clamp(1rem, 5vw, 3rem)",
            fontWeight: "800",
            lineHeight: "1.1",
            margin: "0",
          }}
        >
          RECOMMANDATIONS
        </Typography.Title>
        <Typography.Text
          style={{
            color: "#000000",
            fontSize: "clamp(0.5rem, 2vw, 1.6rem)",
            lineHeight: "1.1",
            margin: "0",
          }}
        >
          Hôtels, maisons d’hôtes, écolodges & restaurants
        </Typography.Text>
      </Flex>
      <Flex
        style={{ width: "100%", padding: "2vh 5vw", paddingBottom: "20vh" }}
        vertical
        gap={50}
      >
        <DahomeyDiscovery establishments={establishments} />
        <HotelsSection
          hotels={hotels}
          title="Hôtels, maisons d'hôtes, écolodges"
          buttonText="Obtenir le catalogue de logements"
        />
        <HotelsSection
          hotels={hotels}
          title="Restaurants"
          buttonText="Obtenir le catalogue des restaurants"
        />
      </Flex>
      <Footer />
    </Flex>
  );
};

type Establishment = {
  id: number;
  type: string;
  name: string;
  description: string;
  price: string;
  image: string;
};

interface DahomeyDiscoveryProps {
  establishments: Establishment[];
}

const DahomeyDiscovery: React.FC<DahomeyDiscoveryProps> = ({
  establishments,
}) => {
  const EstablishmentCard = ({
    establishment,
  }: {
    establishment: Establishment;
  }) => (
    <Card
      hoverable
      cover={
        <div
          style={{ position: "relative", height: "250px", overflow: "hidden" }}
        >
          <img
            alt={establishment.name}
            src={establishment.image}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
          />
          {/* Overlay gradient */}
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background:
                "linear-gradient(to bottom, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.7) 100%)",
            }}
          />
          {/* Prix */}
          <div
            style={{
              position: "absolute",
              top: "15px",
              right: "0px",
              backgroundColor: "#FF8C00",
              color: "white",
              padding: "8px 12px",
              borderRadius: "4px",
              fontSize: "12px",
              fontWeight: "bold",
            }}
          >
            {establishment.price}
          </div>
          {/* Contenu en bas */}
          <div
            style={{
              position: "absolute",
              bottom: "15px",
              left: "15px",
              right: "15px",
              color: "white",
            }}
          >
            <Title
              level={4}
              style={{
                color: "white",
                margin: "0 0 8px 0",
                fontSize: "18px",
                fontWeight: "bold",
              }}
            >
              {establishment.name}
            </Title>
            <Text style={{ color: "white", fontSize: "14px" }}>
              {establishment.description}
            </Text>
          </div>
        </div>
      }
      style={{
        border: "none",
        borderRadius: "8px",
        overflow: "hidden",
      }}
      bodyStyle={{ display: "none" }}
    />
  );

  const tabItems = [
    {
      key: "all",
      label: (
        <span
          style={{
            fontSize: "16px",
            fontWeight: "500",
          }}
        >
          Tout
        </span>
      ),
      children: (
        <>
          {/* Titre principal */}
          <Title
            level={2}
            style={{
              marginTop: "30px",
              marginBottom: "30px",
              fontSize: "24px",
              fontWeight: "600",
              color: "#333",
            }}
          >
            Testé et approuvé par Dahomey Discovery
          </Title>
          <Row gutter={[20, 20]}>
            {establishments.map((establishment) => (
              <Col key={establishment.id} xs={24} sm={12} md={8} lg={8} xl={8}>
                <EstablishmentCard establishment={establishment} />
              </Col>
            ))}
          </Row>
        </>
      ),
    },
    {
      key: "hotels",
      label: (
        <span style={{ fontSize: "16px", fontWeight: "500" }}>
          Hôtels Maisons d'hôtes Ecolodges
        </span>
      ),
      children: (
        <>
          {/* Titre principal */}
          <Title
            level={2}
            style={{
              marginTop: "30px",
              marginBottom: "30px",
              fontSize: "24px",
              fontWeight: "600",
              color: "#333",
            }}
          >
            Testé et approuvé par Dahomey Discovery
          </Title>
          <Row gutter={[20, 20]}>
            {establishments
              .filter((e) => e.type === "hotel")
              .map((establishment) => (
                <Col
                  key={establishment.id}
                  xs={24}
                  sm={12}
                  md={8}
                  lg={8}
                  xl={8}
                >
                  <EstablishmentCard establishment={establishment} />
                </Col>
              ))}
          </Row>
        </>
      ),
    },
    {
      key: "restaurants",
      label: (
        <span style={{ fontSize: "16px", fontWeight: "500" }}>Restaurants</span>
      ),
      children: (
        <>
          {/* Titre principal */}
          <Title
            level={2}
            style={{
              marginTop: "30px",
              marginBottom: "30px",
              fontSize: "24px",
              fontWeight: "600",
              color: "#333",
            }}
          >
            Testé et approuvé par Dahomey Discovery
          </Title>
          <Row gutter={[20, 20]}>
            {establishments
              .filter((e) => e.type === "restaurant")
              .map((establishment) => (
                <Col
                  key={establishment.id}
                  xs={24}
                  sm={12}
                  md={8}
                  lg={8}
                  xl={8}
                >
                  <EstablishmentCard establishment={establishment} />
                </Col>
              ))}
          </Row>
        </>
      ),
    },
  ];

  return (
    <div
      style={{
        // padding: "20px",
        // minHeight: "100vh",
      }}
    >
      {/* Onglets avec contenu */}
      <Tabs
        defaultActiveKey="all"
        items={tabItems}
        size="large"
        style={{
          backgroundColor: "white",
          borderRadius: "8px",
          padding: "20px",
        }}
        tabBarStyle={{
          borderBottom: "2px solid #f0f0f0",
          marginBottom: "30px",
        }}
        tabBarGutter={40}
      />
    </div>
  );
};

type Hotel = {
  id: number;
  name: string;
  description: string;
  image: string;
};

interface HotelsSectionProps {
  hotels: Hotel[];
  title: string;
  buttonText: string;
}

const HotelsSection: React.FC<HotelsSectionProps> = ({
  hotels,
  title,
  buttonText,
}) => {
  return (
    <div style={{ padding: "40px 20px" }}>
      <div>
        {/* En-tête avec titre et lien */}
        <Row
          justify="space-between"
          align="middle"
          style={{ marginBottom: "30px" }}
        >
          <Col xs={24} sm={16} md={18}>
            <Title
              level={2}
              style={{
                margin: 0,
                color: "#411E1C",
                fontSize: "clamp(1.5rem, 4vw, 2.2rem)",
                fontWeight: "600",
              }}
            >
              {title}
            </Title>
          </Col>
          <Col xs={24} sm={8} md={6} style={{ textAlign: "right" }}>
            <Button
              type="link"
              style={{
                color: "#411E1C",
                padding: 0,
                fontSize: "14px",
                textDecoration: "underline",
              }}
              icon={<RightOutlined style={{ fontSize: "12px" }} />}
              iconPosition="end"
            >
              {buttonText}
            </Button>
          </Col>
        </Row>

        {/* Grille des cartes d'hôtels */}
        <Row gutter={[20, 20]}>
          {hotels.map((hotel) => (
            <Col
              key={hotel.id}
              xs={24} // Mobile: 1 carte par ligne
              sm={12} // Tablette: 2 cartes par ligne
              md={6} // Desktop: 4 cartes par ligne
            >
              <Card
                hoverable
                cover={
                  <div style={{ height: "200px", overflow: "hidden" }}>
                    <img
                      alt={hotel.name}
                      src={hotel.image}
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        transition: "transform 0.3s ease",
                      }}
                      onMouseOver={(e) => {
                        (e.target as HTMLImageElement).style.transform =
                          "scale(1.05)";
                      }}
                      onMouseOut={(e) => {
                        (e.target as HTMLImageElement).style.transform =
                          "scale(1)";
                      }}
                    />
                  </div>
                }
                style={{
                  borderRadius: "8px",
                  overflow: "hidden",
                  boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                  transition: "box-shadow 0.3s ease, transform 0.3s ease",
                }}
                bodyStyle={{ padding: "16px" }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.boxShadow =
                    "0 4px 16px rgba(0,0,0,0.15)";
                  e.currentTarget.style.transform = "translateY(-2px)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.boxShadow = "0 2px 8px rgba(0,0,0,0.1)";
                  e.currentTarget.style.transform = "translateY(0)";
                }}
              >
                <Title
                  level={4}
                  style={{
                    margin: "0 0 8px 0",
                    fontSize: "16px",
                    fontWeight: "700",
                    color: "#333",
                  }}
                >
                  {hotel.name}
                </Title>
                <Text
                  style={{
                    color: "#666",
                    fontSize: "14px",
                    lineHeight: "1.4",
                  }}
                >
                  {hotel.description}
                </Text>
              </Card>
            </Col>
          ))}
        </Row>
      </div>
    </div>
  );
};

export default BonneAddress;
