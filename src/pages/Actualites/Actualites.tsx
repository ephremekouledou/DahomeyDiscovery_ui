import { Flex, Typography } from "antd";
import NavBar from "../../components/navBar/navBar";
import "./Actualites.css";
import { useEffect, useState } from "react";
import Footer from "../../components/footer/footer";
import { useLocation } from "react-router-dom";
import BeginningButton from "../../components/dededed/BeginingButton";
import FloatingCartButton from "../../components/dededed/PanierButton";

function Actualites() {
  const { pathname } = useLocation();

  useEffect(() => {
    document.title = "Actualités";
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <Flex justify="center" vertical>
      <BeginningButton />
      <FloatingCartButton />
      {/* Navigation */}
      <div className="relative z-20 flex items-center justify-center">
        <NavBar menu="ACTUALITES" />
      </div>

      {/* Section principale */}
      <Flex
        style={{
          maxWidth: "1400px",
          margin: "0 auto",
          width: "100%",
          padding: "0 clamp(15px, 3vw, 30px)",
        }}
      >
        <Flex
          style={{
            width: "100%",
            paddingTop: "clamp(30px, 6vw, 70px)",
            paddingBottom: "clamp(50px, 8vw, 100px)",
          }}
          vertical
          gap="clamp(20px, 4vw, 40px)"
        >
          {/* Titre responsive */}
          <Typography.Title
            level={2}
            style={{
              color: "#411E1C",
              fontSize: "clamp(2rem, 8vw, 5rem)",
              fontWeight: "800",
              lineHeight: "1.1",
              margin: "0",
              fontFamily: "DragonAngled",
              textAlign: "center",
            }}
          >
            ACTUALITÉS
          </Typography.Title>
          <NewsLayout />
        </Flex>
      </Flex>

      <Footer />
    </Flex>
  );
}

const NewsLayout = () => {
  const [windowWidth, setWindowWidth] = useState(
    typeof window !== "undefined" ? window.innerWidth : 1024
  );

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const isMobile = windowWidth < 768;
  const isTablet = windowWidth >= 768 && windowWidth < 1024;

  const mainArticle = {
    id: 1,
    title:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod.",
    excerpt:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud ex...",
    readTime: "9 min read",
    image:
      "https://images.unsplash.com/photo-1509391366360-2e959784a276?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
  };

  const sideArticles = [
    {
      id: 2,
      title: "Lorem ipsum dolor sit amet, consectetur",
      readTime: "7 min read",
      image:
        "https://images.unsplash.com/photo-1466611653911-95081537e5b7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80",
    },
    {
      id: 3,
      title: "Lorem ipsum dolor sit amet, consectetur",
      readTime: "7 min read",
      image:
        "https://images.unsplash.com/photo-1466611653911-95081537e5b7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80",
    },
    {
      id: 4,
      title:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor",
      readTime: "5 min read",
      image:
        "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80",
    },
  ];

  return (
    <div style={{ width: "100%" }}>
      {/* Layout principal responsive */}
      <Flex
        gap={isMobile ? 24 : 32}
        vertical={isMobile || isTablet}
        wrap={false}
        style={{ width: "100%" }}
      >
        {/* Article principal */}
        <div
          style={{
            flex: isMobile || isTablet ? "1" : "2",
            fontFamily: "GeneralSans",
            width: "100%",
          }}
        >
          <article
            style={{
              overflow: "hidden",
              borderRadius: "12px",
              boxShadow: "0 2px 12px rgba(0,0,0,0.08)",
              transition: "box-shadow 0.3s ease",
              background: "white",
              cursor: "pointer",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.boxShadow = "0 8px 25px rgba(0,0,0,0.15)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.boxShadow = "0 2px 12px rgba(0,0,0,0.08)";
            }}
          >
            <div style={{ position: "relative" }}>
              <img
                src={mainArticle.image}
                alt="Featured article"
                style={{
                  width: "100%",
                  height: isMobile ? "220px" : isTablet ? "280px" : "320px",
                  objectFit: "cover",
                  display: "block",
                }}
              />
            </div>
            <div
              style={{
                padding: isMobile ? "20px" : "clamp(20px, 3vw, 30px)",
              }}
            >
              <h2
                style={{
                  fontSize: isMobile ? "18px" : isTablet ? "20px" : "22px",
                  fontWeight: "600",
                  color: "#2c3e50",
                  marginBottom: "16px",
                  lineHeight: "1.4",
                  fontFamily: "GeneralSans",
                }}
              >
                {mainArticle.title}
              </h2>

              {!isMobile && (
                <p
                  style={{
                    color: "#64748b",
                    fontSize: "14px",
                    lineHeight: "1.6",
                    marginBottom: "16px",
                    fontFamily: "GeneralSans",
                  }}
                >
                  {mainArticle.excerpt}
                </p>
              )}

              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  color: "#3b82f6",
                  fontSize: "13px",
                  fontWeight: "500",
                  fontFamily: "GeneralSans",
                }}
              >
                <span
                  style={{
                    width: "6px",
                    height: "6px",
                    backgroundColor: "#3b82f6",
                    borderRadius: "50%",
                    marginRight: "8px",
                  }}
                ></span>
                {mainArticle.readTime}
              </div>
            </div>
          </article>
        </div>

        {/* Articles latéraux */}
        <div
          style={{
            flex: isMobile || isTablet ? "1" : "1",
            fontFamily: "GeneralSans",
            width: "100%",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: isMobile ? "16px" : "20px",
            }}
          >
            {sideArticles.map((article) => (
              <article
                key={article.id}
                style={{
                  display: "flex",
                  flexDirection: isMobile ? "column" : "row",
                  backgroundColor: "white",
                  overflow: "hidden",
                  borderRadius: "10px",
                  boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
                  transition: "box-shadow 0.3s ease, transform 0.2s ease",
                  cursor: "pointer",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.boxShadow =
                    "0 4px 20px rgba(0,0,0,0.12)";
                  e.currentTarget.style.transform = "translateY(-2px)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.boxShadow =
                    "0 2px 8px rgba(0,0,0,0.06)";
                  e.currentTarget.style.transform = "translateY(0)";
                }}
              >
                <img
                  src={article.image}
                  alt="Article thumbnail"
                  style={{
                    width: isMobile ? "100%" : "120px",
                    height: isMobile ? "160px" : "100px",
                    objectFit: "cover",
                    flexShrink: 0,
                  }}
                />
                <div
                  style={{
                    padding: isMobile ? "16px" : "12px 16px",
                    flex: 1,
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                  }}
                >
                  <h3
                    style={{
                      color: "#2c3e50",
                      fontWeight: "600",
                      fontSize: isMobile ? "16px" : "14px",
                      lineHeight: "1.4",
                      marginBottom: "12px",
                      fontFamily: "GeneralSans",
                      display: "-webkit-box",
                      WebkitBoxOrient: "vertical",
                      WebkitLineClamp: isMobile ? 2 : 3,
                      overflow: "hidden",
                    }}
                  >
                    {article.title}
                  </h3>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      color: "#64748b",
                      fontSize: "12px",
                      fontFamily: "GeneralSans",
                    }}
                  >
                    <span
                      style={{
                        width: "4px",
                        height: "4px",
                        backgroundColor: "#64748b",
                        borderRadius: "50%",
                        marginRight: "6px",
                      }}
                    ></span>
                    {article.readTime}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </Flex>
    </div>
  );
};

export default Actualites;
