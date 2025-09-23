import { useEffect, useState } from "react";
import { Search, MapPin, Star, Clock } from "lucide-react";
import { Flex, Typography } from "antd";
import BeginningButton from "../../components/dededed/BeginingButton";
import NavBar from "../../components/navBar/navBar";
import Footer from "../../components/footer/footer";
import attraction from "/images/attraction.jpg";
import { useNavigate } from "react-router-dom";
import { AttractionsAPI } from "../../sdk/api/attraction";
import { IAttraction } from "../../sdk/models/attraction";
import { HandleGetFileLink } from "../Circuits/CircuitsCartes";

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
    AttractionsAPI.List()
      .then((data) => {
        console.log("the attractions are:", data);
        setAttractions(data);
      })
      .catch((err) => {
        console.error("Error fetching attractions:", err);
      });
  }, []);

  const filteredAttractions = attractions.filter((attraction) => {
    const matchesCategory =
      selectedCategory === "all" || attraction.category === selectedCategory;
    const matchesSearch =
      attraction.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      attraction.location.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

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
        <NavBar menu="HÉBERGEMENT" />
      </div>

      <Flex
        vertical
        className="relative w-full overflow-hidden"
        style={{
          backgroundImage: `url(${attraction})`,
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
              Découvrez des expériences inoubliables
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
              Explorez les meilleures attractions et activités près de chez vous
            </Typography.Text>
          </Flex>
        </Flex>
      </Flex>

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

                    <button className="w-full bg-[#f59f00] text-white py-3 rounded-xl font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl">
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
            style={{color: "black"}}
            className="bg-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-gray-100 transition-colors shadow-lg"
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

// import React, { useState } from "react";
// import {
//   Star,
//   MapPin,
//   Clock,
//   Users,
//   Calendar,
//   Shield,
//   ChevronLeft,
//   ChevronRight,
//   Heart,
//   Share2,
//   Check,
//   X,
//   Info,
//   Globe,
//   Phone,
//   Mail,
//   Camera,
//   Award,
//   Zap,
// } from "lucide-react";

// interface Review {
//   id: number;
//   name: string;
//   rating: number;
//   date: string;
//   comment: string;
//   avatar: string;
//   country: string;
// }

// interface TimeSlot {
//   id: string;
//   time: string;
//   available: boolean;
//   price: number;
// }

// const AttractionDetailPage = () => {
//   const [currentImageIndex, setCurrentImageIndex] = useState(0);
//   const [selectedDate, setSelectedDate] = useState("2024-12-15");
//   const [selectedTimeSlot, setSelectedTimeSlot] = useState<string>("");
//   const [participants, setParticipants] = useState(2);
//   const [showAllReviews, setShowAllReviews] = useState(false);
//   const [isLiked, setIsLiked] = useState(false);

//   const attraction = {
//     id: 1,
//     title: "Visite guidée du Château de Versailles avec accès coupe-file",
//     location: "Versailles, France",
//     rating: 4.8,
//     reviewCount: 2341,
//     price: 45,
//     originalPrice: 65,
//     duration: "3 heures",
//     groupSize: "Jusqu'à 25 personnes",
//     languages: ["Français", "Anglais", "Espagnol"],
//     category: "Culture & Patrimoine",
//     highlights: [
//       "Accès coupe-file garanti",
//       "Guide expert certifié",
//       "Visite des appartements royaux",
//       "Accès aux jardins de Versailles",
//       "Petit groupe pour une expérience personnalisée",
//     ],
//     includes: [
//       "Guide professionnel",
//       "Billet d'entrée coupe-file",
//       "Écouteurs individuels",
//       "Accès aux jardins",
//     ],
//     notIncludes: ["Transport", "Repas et boissons", "Pourboires (optionnel)"],
//     meetingPoint: "Devant l'entrée principale du château, Place d'Armes",
//     cancellation: "Annulation gratuite jusqu'à 24h avant le début",
//     images: [
//       "https://images.unsplash.com/photo-1539650116574-75c0c6d73a0e?w=800&h=500&fit=crop",
//       "https://images.unsplash.com/photo-1610467164933-2fd6d2b58ea7?w=800&h=500&fit=crop",
//       "https://images.unsplash.com/photo-1571731956672-34d91308181c?w=800&h=500&fit=crop",
//       "https://images.unsplash.com/photo-1664271126967-7fc86d1e2501?w=800&h=500&fit=crop",
//     ],
//   };

//   const timeSlots: TimeSlot[] = [
//     { id: "1", time: "09:00", available: true, price: 45 },
//     { id: "2", time: "10:30", available: true, price: 45 },
//     { id: "3", time: "14:00", available: false, price: 45 },
//     { id: "4", time: "15:30", available: true, price: 50 },
//     { id: "5", time: "17:00", available: true, price: 40 },
//   ];

//   const reviews: Review[] = [
//     {
//       id: 1,
//       name: "Marie Dubois",
//       rating: 5,
//       date: "2024-11-15",
//       comment:
//         "Expérience absolument fantastique ! Notre guide était très compétent et passionné. Le château est magnifique et l'accès coupe-file nous a fait gagner beaucoup de temps.",
//       avatar:
//         "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=60&h=60&fit=crop&crop=face",
//       country: "France",
//     },
//     {
//       id: 2,
//       name: "John Smith",
//       rating: 4,
//       date: "2024-11-10",
//       comment:
//         "Very good tour with excellent guide. The palace is stunning and the gardens are beautiful. Only minus was the weather but that's not controllable!",
//       avatar:
//         "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=60&h=60&fit=crop&crop=face",
//       country: "UK",
//     },
//     {
//       id: 3,
//       name: "Sofia Rodriguez",
//       rating: 5,
//       date: "2024-11-08",
//       comment:
//         "Una experiencia increíble. El guía hablaba perfecto español y conocía todos los detalles históricos. Recomiendo totalmente esta visita.",
//       avatar:
//         "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=60&h=60&fit=crop&crop=face",
//       country: "España",
//     },
//   ];

//   const nextImage = () => {
//     setCurrentImageIndex((prev) => (prev + 1) % attraction.images.length);
//   };

//   const prevImage = () => {
//     setCurrentImageIndex(
//       (prev) => (prev - 1 + attraction.images.length) % attraction.images.length
//     );
//   };

//   const totalPrice = selectedTimeSlot
//     ? timeSlots.find((slot) => slot.id === selectedTimeSlot)?.price! *
//       participants
//     : attraction.price * participants;

//   return (
//     <div className="min-h-screen bg-gray-50">
//       {/* Header avec image et galerie */}
//       <div className="relative h-96 md:h-[500px] overflow-hidden">
//         <img
//           src={attraction.images[currentImageIndex]}
//           alt={attraction.title}
//           className="w-full h-full object-cover"
//         />

//         {/* Overlay gradient */}
//         <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>

//         {/* Navigation des images */}
//         <button
//           onClick={prevImage}
//           className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full transition-colors"
//         >
//           <ChevronLeft className="w-6 h-6" />
//         </button>
//         <button
//           onClick={nextImage}
//           className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full transition-colors"
//         >
//           <ChevronRight className="w-6 h-6" />
//         </button>

//         {/* Indicateurs d'image */}
//         <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
//           {attraction.images.map((_, index) => (
//             <button
//               key={index}
//               onClick={() => setCurrentImageIndex(index)}
//               className={`w-2 h-2 rounded-full transition-colors ${
//                 index === currentImageIndex ? "bg-white" : "bg-white/50"
//               }`}
//             />
//           ))}
//         </div>

//         {/* Actions en haut à droite */}
//         <div className="absolute top-4 right-4 flex gap-2">
//           <button
//             onClick={() => setIsLiked(!isLiked)}
//             className={`p-3 rounded-full transition-colors ${
//               isLiked
//                 ? "bg-red-500 text-white"
//                 : "bg-white/80 hover:bg-white text-gray-700"
//             }`}
//           >
//             <Heart className={`w-5 h-5 ${isLiked ? "fill-current" : ""}`} />
//           </button>
//           <button className="p-3 bg-white/80 hover:bg-white text-gray-700 rounded-full transition-colors">
//             <Share2 className="w-5 h-5" />
//           </button>
//           <button className="p-3 bg-white/80 hover:bg-white text-gray-700 rounded-full transition-colors">
//             <Camera className="w-5 h-5" />
//           </button>
//         </div>
//       </div>

//       <div className="container mx-auto px-4 py-8">
//         <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
//           {/* Contenu principal */}
//           <div className="lg:col-span-2">
//             {/* Titre et infos de base */}
//             <div className="bg-white rounded-2xl p-6 mb-6 shadow-sm">
//               <div className="flex items-start justify-between mb-4">
//                 <div>
//                   <span className="bg-blue-100 text-blue-800 text-sm font-medium px-3 py-1 rounded-full">
//                     {attraction.category}
//                   </span>
//                   <h1 className="text-3xl font-bold text-gray-800 mt-3 mb-4">
//                     {attraction.title}
//                   </h1>
//                 </div>
//                 <div className="flex items-center gap-2">
//                   <Award className="w-5 h-5 text-yellow-500" />
//                   <span className="text-sm text-gray-600">
//                     Choix du personnel
//                   </span>
//                 </div>
//               </div>

//               <div className="flex flex-wrap items-center gap-6 text-gray-600 mb-6">
//                 <div className="flex items-center gap-2">
//                   <Star className="w-5 h-5 text-yellow-400 fill-current" />
//                   <span className="font-semibold text-gray-800">
//                     {attraction.rating}
//                   </span>
//                   <span>({attraction.reviewCount} avis)</span>
//                 </div>
//                 <div className="flex items-center gap-2">
//                   <MapPin className="w-5 h-5" />
//                   <span>{attraction.location}</span>
//                 </div>
//                 <div className="flex items-center gap-2">
//                   <Clock className="w-5 h-5" />
//                   <span>{attraction.duration}</span>
//                 </div>
//                 <div className="flex items-center gap-2">
//                   <Users className="w-5 h-5" />
//                   <span>{attraction.groupSize}</span>
//                 </div>
//               </div>

//               {/* Langues disponibles */}
//               <div className="flex items-center gap-2 mb-6">
//                 <Globe className="w-5 h-5 text-gray-500" />
//                 <span className="text-gray-600">Disponible en:</span>
//                 <div className="flex gap-2">
//                   {attraction.languages.map((lang) => (
//                     <span
//                       key={lang}
//                       className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-sm"
//                     >
//                       {lang}
//                     </span>
//                   ))}
//                 </div>
//               </div>
//             </div>

//             {/* Points forts */}
//             <div className="bg-white rounded-2xl p-6 mb-6 shadow-sm">
//               <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
//                 <Zap className="w-5 h-5 text-yellow-500" />
//                 Points forts
//               </h3>
//               <div className="grid gap-3">
//                 {attraction.highlights.map((highlight, index) => (
//                   <div key={index} className="flex items-start gap-3">
//                     <Check className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
//                     <span className="text-gray-700">{highlight}</span>
//                   </div>
//                 ))}
//               </div>
//             </div>

//             {/* Inclus / Non inclus */}
//             <div className="bg-white rounded-2xl p-6 mb-6 shadow-sm">
//               <h3 className="text-xl font-bold mb-4">Ce qui est inclus</h3>
//               <div className="grid md:grid-cols-2 gap-6">
//                 <div>
//                   <h4 className="font-semibold text-green-600 mb-3 flex items-center gap-2">
//                     <Check className="w-4 h-4" />
//                     Inclus
//                   </h4>
//                   <div className="space-y-2">
//                     {attraction.includes.map((item, index) => (
//                       <div key={index} className="flex items-start gap-2">
//                         <Check className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
//                         <span className="text-sm text-gray-700">{item}</span>
//                       </div>
//                     ))}
//                   </div>
//                 </div>
//                 <div>
//                   <h4 className="font-semibold text-red-600 mb-3 flex items-center gap-2">
//                     <X className="w-4 h-4" />
//                     Non inclus
//                   </h4>
//                   <div className="space-y-2">
//                     {attraction.notIncludes.map((item, index) => (
//                       <div key={index} className="flex items-start gap-2">
//                         <X className="w-4 h-4 text-red-500 mt-0.5 flex-shrink-0" />
//                         <span className="text-sm text-gray-700">{item}</span>
//                       </div>
//                     ))}
//                   </div>
//                 </div>
//               </div>
//             </div>

//             {/* Informations pratiques */}
//             <div className="bg-white rounded-2xl p-6 mb-6 shadow-sm">
//               <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
//                 <Info className="w-5 h-5 text-blue-500" />
//                 Informations pratiques
//               </h3>
//               <div className="space-y-4">
//                 <div>
//                   <h4 className="font-semibold mb-2">Point de rendez-vous</h4>
//                   <p className="text-gray-700">{attraction.meetingPoint}</p>
//                 </div>
//                 <div>
//                   <h4 className="font-semibold mb-2 flex items-center gap-2">
//                     <Shield className="w-4 h-4 text-green-500" />
//                     Politique d'annulation
//                   </h4>
//                   <p className="text-gray-700">{attraction.cancellation}</p>
//                 </div>
//               </div>
//             </div>

//             {/* Avis clients */}
//             <div className="bg-white rounded-2xl p-6 shadow-sm">
//               <div className="flex items-center justify-between mb-6">
//                 <h3 className="text-xl font-bold">Avis des voyageurs</h3>
//                 <div className="flex items-center gap-2">
//                   <Star className="w-5 h-5 text-yellow-400 fill-current" />
//                   <span className="font-bold text-lg">{attraction.rating}</span>
//                   <span className="text-gray-500">
//                     ({attraction.reviewCount} avis)
//                   </span>
//                 </div>
//               </div>

//               <div className="space-y-6">
//                 {(showAllReviews ? reviews : reviews.slice(0, 2)).map(
//                   (review) => (
//                     <div
//                       key={review.id}
//                       className="border-b border-gray-100 pb-6 last:border-b-0"
//                     >
//                       <div className="flex items-start gap-4">
//                         <img
//                           src={review.avatar}
//                           alt={review.name}
//                           className="w-12 h-12 rounded-full object-cover"
//                         />
//                         <div className="flex-1">
//                           <div className="flex items-center gap-2 mb-2">
//                             <span className="font-semibold">{review.name}</span>
//                             <span className="text-sm text-gray-500">
//                               • {review.country}
//                             </span>
//                             <div className="flex">
//                               {[...Array(5)].map((_, i) => (
//                                 <Star
//                                   key={i}
//                                   className={`w-4 h-4 ${
//                                     i < review.rating
//                                       ? "text-yellow-400 fill-current"
//                                       : "text-gray-300"
//                                   }`}
//                                 />
//                               ))}
//                             </div>
//                           </div>
//                           <p className="text-gray-700 mb-2">{review.comment}</p>
//                           <span className="text-sm text-gray-500">
//                             {review.date}
//                           </span>
//                         </div>
//                       </div>
//                     </div>
//                   )
//                 )}
//               </div>

//               {!showAllReviews && reviews.length > 2 && (
//                 <button
//                   onClick={() => setShowAllReviews(true)}
//                   className="mt-4 text-blue-600 hover:text-blue-700 font-semibold"
//                 >
//                   Voir tous les avis ({reviews.length})
//                 </button>
//               )}
//             </div>
//           </div>

//           {/* Sidebar de réservation */}
//           <div className="lg:col-span-1">
//             <div className="bg-white rounded-2xl p-6 shadow-lg sticky top-4">
//               <div className="mb-6">
//                 <div className="flex items-center gap-2 mb-2">
//                   {attraction.originalPrice > attraction.price && (
//                     <span className="text-gray-500 line-through text-lg">
//                       {attraction.originalPrice}€
//                     </span>
//                   )}
//                   <span className="text-3xl font-bold text-blue-600">
//                     {attraction.price}€
//                   </span>
//                 </div>
//                 <p className="text-gray-600 text-sm">par personne</p>
//               </div>

//               {/* Sélection de date */}
//               <div className="mb-4">
//                 <label className="block text-sm font-semibold mb-2">Date</label>
//                 <div className="relative">
//                   <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
//                   <input
//                     type="date"
//                     value={selectedDate}
//                     onChange={(e) => setSelectedDate(e.target.value)}
//                     className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                   />
//                 </div>
//               </div>

//               {/* Créneaux horaires */}
//               <div className="mb-4">
//                 <label className="block text-sm font-semibold mb-2">
//                   Heure
//                 </label>
//                 <div className="grid grid-cols-2 gap-2">
//                   {timeSlots.map((slot) => (
//                     <button
//                       key={slot.id}
//                       onClick={() =>
//                         slot.available && setSelectedTimeSlot(slot.id)
//                       }
//                       disabled={!slot.available}
//                       className={`p-2 text-sm rounded-lg border transition-colors ${
//                         selectedTimeSlot === slot.id
//                           ? "border-blue-500 bg-blue-50 text-blue-700"
//                           : slot.available
//                           ? "border-gray-200 hover:border-gray-300"
//                           : "border-gray-100 bg-gray-50 text-gray-400 cursor-not-allowed"
//                       }`}
//                     >
//                       <div className="font-medium">{slot.time}</div>
//                       <div className="text-xs">
//                         {slot.available ? `${slot.price}€` : "Complet"}
//                       </div>
//                     </button>
//                   ))}
//                 </div>
//               </div>

//               {/* Nombre de participants */}
//               <div className="mb-6">
//                 <label className="block text-sm font-semibold mb-2">
//                   Participants
//                 </label>
//                 <div className="flex items-center border border-gray-200 rounded-xl">
//                   <button
//                     onClick={() =>
//                       setParticipants(Math.max(1, participants - 1))
//                     }
//                     className="p-3 hover:bg-gray-50 rounded-l-xl"
//                   >
//                     -
//                   </button>
//                   <span className="flex-1 text-center py-3 font-semibold">
//                     {participants}
//                   </span>
//                   <button
//                     onClick={() => setParticipants(participants + 1)}
//                     className="p-3 hover:bg-gray-50 rounded-r-xl"
//                   >
//                     +
//                   </button>
//                 </div>
//               </div>

//               {/* Prix total */}
//               <div className="border-t pt-4 mb-6">
//                 <div className="flex justify-between items-center mb-2">
//                   <span>Prix par personne</span>
//                   <span>
//                     {selectedTimeSlot
//                       ? timeSlots.find((slot) => slot.id === selectedTimeSlot)
//                           ?.price
//                       : attraction.price}
//                     €
//                   </span>
//                 </div>
//                 <div className="flex justify-between items-center mb-2">
//                   <span>Participants × {participants}</span>
//                   <span>{totalPrice}€</span>
//                 </div>
//                 <div className="flex justify-between items-center font-bold text-lg border-t pt-2">
//                   <span>Total</span>
//                   <span className="text-blue-600">{totalPrice}€</span>
//                 </div>
//               </div>

//               {/* Bouton de réservation */}
//               <button
//                 disabled={!selectedTimeSlot}
//                 className={`w-full py-4 rounded-xl font-bold text-lg transition-all duration-300 ${
//                   selectedTimeSlot
//                     ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700 shadow-lg hover:shadow-xl"
//                     : "bg-gray-200 text-gray-500 cursor-not-allowed"
//                 }`}
//               >
//                 {selectedTimeSlot
//                   ? "Réserver maintenant"
//                   : "Sélectionnez un créneau"}
//               </button>

//               {/* Garanties */}
//               <div className="mt-4 space-y-2 text-sm text-gray-600">
//                 <div className="flex items-center gap-2">
//                   <Shield className="w-4 h-4 text-green-500" />
//                   <span>Annulation gratuite</span>
//                 </div>
//                 <div className="flex items-center gap-2">
//                   <Check className="w-4 h-4 text-green-500" />
//                   <span>Confirmation instantanée</span>
//                 </div>
//                 <div className="flex items-center gap-2">
//                   <Phone className="w-4 h-4 text-green-500" />
//                   <span>Support client 24/7</span>
//                 </div>
//               </div>
//             </div>

//             {/* Contact */}
//             <div className="bg-white rounded-2xl p-6 shadow-sm mt-6">
//               <h3 className="text-lg font-bold mb-4">Besoin d'aide ?</h3>
//               <div className="space-y-3">
//                 <div className="flex items-center gap-3">
//                   <Phone className="w-5 h-5 text-blue-500" />
//                   <span className="text-sm">+33 1 23 45 67 89</span>
//                 </div>
//                 <div className="flex items-center gap-3">
//                   <Mail className="w-5 h-5 text-blue-500" />
//                   <span className="text-sm">contact@exemple.com</span>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AttractionDetailPage;
