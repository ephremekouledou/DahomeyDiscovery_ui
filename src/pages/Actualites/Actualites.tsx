import { Flex, Typography } from "antd";
import NavBar from "../../components/navBar/navBar";
import "./Actualites.css"; // Assuming you have a CSS file for styling
import { useEffect, useState } from "react";
import Footer from "../../components/footer/footer";
import { useLocation } from "react-router-dom";

function Actualites() {
  const { pathname } = useLocation();

  useEffect(() => {
    document.title = "Actualités";
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return (
    <Flex justify="center" vertical>
      <div className="relative z-20 flex items-center justify-center p-8">
        <NavBar menu="ACTUALITES" />
      </div>
      <Flex style={{maxWidth: "1300px", margin: "0 auto"}}>
        <Flex
          style={{ width: "100%", padding: "5vw 0", paddingBottom: "12vw" }}
          vertical
          gap={24}
        >
          <Typography.Title
            level={2}
            style={{
              color: "#411E1C",
              fontSize: "clamp(2.5rem, 5vw, 5rem)",
              fontWeight: "800",
              lineHeight: "1.1",
              margin: "0",
              fontFamily: "DragonAngled",
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
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 1024);
    };

    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);

    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);
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
    <Flex>
      {/* Main Layout */}
      <Flex gap={24} vertical={isMobile} wrap={false}>
        {/* Main Featured Article */}
        <div style={{ flex: 2, fontFamily: "GeneralSans" }}>
          <article className="overflow-hidden hover:shadow-md transition-shadow">
            <div className="relative">
              <img
                src={mainArticle.image}
                alt="Featured article"
                className="w-full h-120 object-cover"
              />
            </div>
            <div className="p-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-4 leading-relaxed">
                {mainArticle.title}
              </h2>
              <p className="text-gray-600 text-sm leading-relaxed mb-4">
                {mainArticle.excerpt}
              </p>
              <div className="flex items-center text-blue-600 text-sm font-medium">
                <span className="w-2 h-2 bg-blue-600 rounded-full mr-2"></span>
                {mainArticle.readTime}
              </div>
            </div>
          </article>
        </div>

        {/* Side Articles */}
        <div
          style={{ flex: 1, fontFamily: "GeneralSans" }}
          className="space-y-6"
        >
          {sideArticles.map((article) => (
            <article
              key={article.id}
              className="flex bg-white overflow-hidden hover:shadow-md transition-shadow"
            >
              <img
                src={article.image}
                alt="Article thumbnail"
                className="w-45 h-45 object-cover flex-shrink-0"
              />
              <div className="p-4 flex-1">
                <h3 className="text-gray-800 font-semibold text-base md:text-lg leading-relaxed mb-3">
                  {article.title}
                </h3>
                <div className="flex items-center text-gray-600 text-xs">
                  <span className="w-1.5 h-1.5 bg-gray-600 rounded-full mr-2"></span>
                  {article.readTime}
                </div>
              </div>
            </article>
          ))}
        </div>
      </Flex>
    </Flex>
  );
};

export default Actualites;
