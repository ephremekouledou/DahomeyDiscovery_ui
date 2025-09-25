import { useEffect, useState } from "react";
import { Search, MapPin, Star, Clock } from "lucide-react";
import { Flex, Typography } from "antd";
import BeginningButton from "../../components/dededed/BeginingButton";
import NavBar from "../../components/navBar/navBar";
import Footer from "../../components/footer/footer";
import { useNavigate } from "react-router-dom";
import { AttractionsAPI } from "../../sdk/api/attraction";
import { IAttraction } from "../../sdk/models/attraction";
import { HandleGetFileLink } from "../Circuits/CircuitsCartes";
import { emptyIPageMedia, IPageMedia } from "../../sdk/models/pagesMedias";
import { PageSettings } from "../../sdk/api/pageMedias";

interface Category {
  id: string;
  name: string;
  icon: string;
  color: string;
  description: string;
}

const Attractions = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);
  const [attractions, setAttractions] = useState<IAttraction[]>([]);
  const [filteredAttractions, setFilteredAttractions] = useState<IAttraction[]>(
    []
  );
  const [loading, setLoading] = useState<boolean>(true);
  const [settings, setSettings] = useState<IPageMedia>(emptyIPageMedia());
  // const [showFilters, setShowFilters] = useState(false);
  const navigate = useNavigate();

  const categories: Category[] = [
    {
      id: "culture",
      name: "Culture & Patrimoine",
      icon: "🏛️",
      color: "from-amber-500 to-orange-600",
      description: "Musées, monuments, sites historiques",
    },
    {
      id: "nature",
      name: "Nature & Visites",
      icon: "🌿",
      color: "from-green-500 to-emerald-600",
      description: "Parcs, jardins, visites guidées",
    },
    {
      id: "aventure",
      name: "Aventure & Outdoor",
      icon: "🏔️",
      color: "from-blue-500 to-cyan-600",
      description: "Randonnées, sports extrêmes",
    },
    {
      id: "ateliers",
      name: "Ateliers & Expériences",
      icon: "🎨",
      color: "from-purple-500 to-pink-600",
      description: "Cours, workshops, expériences uniques",
    },
    {
      id: "croisieres",
      name: "Croisières & Transports",
      icon: "🚢",
      color: "from-teal-500 to-blue-600",
      description: "Croisières, transports touristiques",
    },
    {
      id: "detente",
      name: "Bien-être & Divertissement",
      icon: "🧘",
      color: "from-rose-500 to-red-600",
      description: "Spa, spectacles, détente",
    },
  ];

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

  useEffect(() => {
    AttractionsAPI.List()
      .then((data) => {
        console.log("the attractions are:", data);
        setAttractions(data);
      })
      .catch((err) => {
        console.error("Error fetching attractions:", err);
      });
  }, []);

  useEffect(() => {
    setFilteredAttractions(
      attractions.filter((attraction) => {
        const matchesCategory =
          selectedCategory === "all" ||
          attraction.category === selectedCategory;
        const matchesSearch =
          attraction.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          attraction.location.toLowerCase().includes(searchTerm.toLowerCase());
        return matchesCategory && matchesSearch;
      })
    );
  }, [attractions, selectedCategory, searchTerm]);

  // const filteredAttractions = attractions.filter((attraction) => {
  //   const matchesCategory =
  //     selectedCategory === "all" || attraction.category === selectedCategory;
  //   const matchesSearch =
  //     attraction.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
  //     attraction.location.toLowerCase().includes(searchTerm.toLowerCase());
  //   return matchesCategory && matchesSearch;
  // });

  useEffect(() => {
    const checkScreenSize = () => {
      const width = window.innerWidth;
      setIsMobile(width < 768);
      setIsTablet(width >= 768 && width < 1024);
    };
    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  return (
    <Flex justify="center" vertical>
      <BeginningButton />
      {/* Header avec NavBar */}
      <div className="relative z-20 flex items-center justify-center">
        <NavBar menu="ATTRACTION" />
      </div>
      {!loading && (
        <Flex
          vertical
          className="relative w-full overflow-hidden"
          style={{
            backgroundImage: `url(${HandleGetFileLink(
              settings.attraction_background[0].file as string
            )})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            padding: isMobile ? "4vh 4vw" : isTablet ? "6vh 6vw" : "8vh 8vw",
            paddingBottom: isMobile ? "12vw" : isTablet ? "10vw" : "8vw",
          }}
        >
          {/* Gradient overlay - de la couleur beige/crème vers transparent */}
          <div
            className="absolute inset-0"
            style={{
              background: `linear-gradient(to right, 
                  rgba(250, 235, 215, 0.95) 0%,
                  rgba(250, 235, 215, 0.85) 20%,
                  rgba(250, 235, 215, 0.6) 40%,
                  rgba(250, 235, 215, 0.3) 60%,
                  rgba(250, 235, 215, 0.1) 80%,
                  transparent 100%)`,
            }}
          />
          <Flex
            style={{
              maxWidth: "1050px",
              width: "100%",
              margin: "0 auto",
              zIndex: 1,
            }}
          >
            <Flex vertical gap={0}>
              <Typography.Text
                style={{
                  color: "#000000",
                  fontSize: isMobile ? "10px" : isTablet ? "14px" : "16px",
                  lineHeight: "1.1",
                  margin: "0",
                  textTransform: "uppercase",
                  fontFamily: "GeneralSans",
                  letterSpacing: "0.3em",
                }}
              >
                Vivez le Bénin comme chez vous
              </Typography.Text>
              <Typography.Title
                level={1}
                style={{
                  color: "#FF3100",
                  fontSize: isMobile ? "32px" : isTablet ? "60px" : "85px",
                  fontWeight: "900",
                  lineHeight: "1",
                  letterSpacing: "0.03em",
                  marginTop: "20px",
                  marginBottom: "15px",
                  fontFamily: "DragonAngled",
                  textTransform: "uppercase",
                }}
              >
                {settings.attractions_title}
              </Typography.Title>
              <Typography.Text
                style={{
                  color: "#000000",
                  fontSize: isMobile ? "18px" : isTablet ? "32px" : "45px",
                  lineHeight: "1",
                  marginTop: "0",
                  fontFamily: "DragonAngled",
                }}
              >
                {settings.attractions_subtitle}
              </Typography.Text>
            </Flex>
          </Flex>
        </Flex>
      )}

      {/* Contenu principal */}
      <Flex
        style={{
          maxWidth: "1050px",
          width: "100%",
          margin: "0 auto",
          zIndex: 1,
        }}
      >
        <div className="min-h-screen">
          {/* Categories Section */}
          <div className="container mx-auto px-4 py-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
              Explorez par catégorie
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
              {categories.map((category) => (
                <div
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`cursor-pointer group relative overflow-hidden rounded-2xl p-6 text-gray-800 bg-white transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl ${
                    selectedCategory === category.id
                      ? "ring-4 ring-blue-500 ring-opacity-50"
                      : ""
                  }`}
                >
                  <div className="relative z-10">
                    <div className="text-4xl mb-4">{category.icon}</div>
                    <h3 className="text-xl font-bold mb-2">{category.name}</h3>
                    <p className="text-sm opacity-90">{category.description}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Search Bar */}
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Que souhaitez-vous découvrir ?"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 text-gray-800 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            {/* Filter Controls */}
            {/* <div className="flex flex-wrap items-center justify-between mb-8 bg-white rounded-xl p-4 shadow-sm">
          <div className="flex flex-wrap gap-2 mb-4 sm:mb-0">
            <button
              onClick={() => setSelectedCategory("all")}
              className={`px-4 py-2 rounded-full font-medium transition-all duration-300 ${
                selectedCategory === "all"
                  ? "bg-blue-600 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              Toutes
            </button>
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-4 py-2 rounded-full font-medium transition-all duration-300 ${
                  selectedCategory === category.id
                    ? "bg-blue-600 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {category.icon} {category.name.split(" &")[0]}
              </button>
            ))}
          </div>

          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-full hover:bg-gray-200 transition-colors"
          >
            <Filter className="w-4 h-4" />
            Filtres
            <ChevronDown
              className={`w-4 h-4 transform transition-transform ${
                showFilters ? "rotate-180" : ""
              }`}
            />
          </button>
        </div> */}

            {/* Results Count */}
            {/* <div className="mb-6">
          <p className="text-gray-600">
            {filteredAttractions.length} expérience
            {filteredAttractions.length > 1 ? "s" : ""} trouvée
            {filteredAttractions.length > 1 ? "s" : ""}
          </p>
        </div> */}

            <h2 className="text-3xl font-bold text-gray-800 mb-8 pt-15 pb-10 text-center">
              Vivez des expériences inoubliables
            </h2>

            {/* Attractions Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredAttractions.map((attraction) => (
                <div
                  key={attraction._id}
                  onClick={() => navigate(`/attractions/${attraction._id}`)}
                  className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group cursor-pointer transform hover:scale-105"
                >
                  <div className="relative overflow-hidden">
                    <img
                      src={HandleGetFileLink(
                        attraction.images[0].file as string
                      )}
                      alt={attraction.title}
                      className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    {attraction.tag && (
                      <div className="absolute top-4 left-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                        {attraction.tag}
                      </div>
                    )}
                    <div className="absolute bottom-4 right-4 bg-white bg-opacity-90 backdrop-blur-sm px-3 py-1 rounded-full">
                      <span className="font-bold">
                        {attraction.price[0].price} FCFA
                      </span>
                    </div>
                  </div>

                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-800 mb-2 group-hover:text-blue-600 transition-colors">
                      {attraction.title}
                    </h3>

                    <div className="flex items-center gap-2 text-gray-600 mb-3">
                      <MapPin className="w-4 h-4" />
                      <span className="text-sm">{attraction.location}</span>
                    </div>

                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-2">
                        <div className="flex items-center gap-1">
                          <Star className="w-4 h-4 text-yellow-400 fill-current" />
                          <span className="font-semibold">
                            {attraction.rating}
                          </span>
                          <span className="text-gray-500 text-sm">
                            ({attraction.reviewCount})
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center gap-1 text-gray-500">
                        <Clock className="w-4 h-4" />
                        <span className="text-sm">{attraction.duration}</span>
                      </div>
                    </div>

                    <button className="w-full bg-[#f59f00] text-white py-3 rounded-xl font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl cursor-pointer">
                      Réserver maintenant
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {filteredAttractions.length === 0 && (
              <div className="text-center py-12">
                <div className="text-gray-400 text-6xl mb-4">🔍</div>
                <h3 className="text-xl font-semibold text-gray-600 mb-2">
                  Aucune attraction trouvée
                </h3>
                <p className="text-gray-500">
                  Essayez de modifier vos critères de recherche ou explorez une
                  autre catégorie.
                </p>
              </div>
            )}
          </div>
        </div>
      </Flex>

      {/* Call to Action */}
      <div className="bg-gradient-to-r from-[#ff4d00] to-[#f59f00] text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Prêt pour votre prochaine aventure ?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Découvrez encore plus d'expériences extraordinaires
          </p>
          <button
            onClick={() => navigate(`/circuits-thematiques`)}
            style={{ color: "black" }}
            className="bg-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-gray-100 transition-colors shadow-lg cursor-pointer"
          >
            Voir tous les circuits
          </button>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </Flex>
  );
};

export default Attractions;
