import React, { useEffect, useState } from "react";
import {
  emptyIPageMedia,
  IPageMedia,
  IRestaurantSettings,
} from "../../sdk/models/pagesMedias";
import { HandleGetFileLink } from "../Circuits/CircuitsCartes";
import { Flex } from "antd";
import BeginningButton from "../../components/dededed/BeginingButton";
import NavBar from "../../components/navBar/navBar";
import Footer from "../../components/footer/footer";
import { PageSettings } from "../../sdk/api/pageMedias";
import { useLocation } from "react-router-dom";


const RestaurantCard: React.FC<{ restaurant: IRestaurantSettings }> = ({
  restaurant,
}) => {
  return (
    <div
      className={`
        relative group cursor-pointer overflow-hidden rounded-2xl shadow-lg 
        hover:shadow-xl transition-all duration-300 hover:scale-105 
        ${restaurant.rotation} hover:rotate-0
        aspect-square
      `}
    >
      <div className="w-full h-full overflow-hidden">
        <img
          src={HandleGetFileLink(restaurant.image[0].file as string)}
          alt={restaurant.type}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
      </div>

      {/* Badge avec le nom du type de cuisine */}
      <div className="absolute bottom-4 left-4 right-4 bg-white/90 backdrop-blur-sm rounded-lg px-3 py-2 group-hover:bg-white/95 transition-colors duration-300">
        <p className="text-gray-800 font-semibold text-center text-sm">
          {restaurant.type}
        </p>
      </div>
    </div>
  );
};

const Restaurants = () => {
  const [settings, setSettings] = useState<IPageMedia>(emptyIPageMedia());
  const { pathname } = useLocation();

  useEffect(() => {
    PageSettings.List()
      .then((data) => {
        console.log("the settings are:", data);
        setSettings(data);
      })
      .catch((err) => {
        console.error("Error fetching circuits:", err);
      });
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <Flex justify="center" vertical>
      <BeginningButton />
      
      {/* Navigation */}
      <div className="relative z-20 flex items-center justify-center">
        <NavBar menu="RESTAU" />
      </div>

      {/* Section principale */}
      <Flex
        style={{
          maxWidth: "1050px",
          margin: "0 auto",
          width: "100%",
          marginTop: "40px",
        }}
      >
        <div className="min-h-screen">
          <div className="container mx-auto px-4 py-8">
            <div className="text-center mb-12">
              <h1 className="text-4xl font-bold text-gray-800 mb-4">
                Découvrez nos restaurants
              </h1>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Une sélection des meilleurs établissements du benin, pour tous
                les goûts et tous les budgets
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              {settings.restaurants.map((restaurant) => (
                <RestaurantCard key={restaurant._id} restaurant={restaurant} />
              ))}
            </div>

            <div className="text-center mt-12">
              <button className="bg-gradient-to-r from-orange-500 to-red-500 text-white font-semibold px-8 py-3 rounded-full hover:from-orange-600 hover:to-red-600 transition-all duration-300 shadow-lg hover:shadow-xl">
                Telecharger la liste des restaurants
              </button>
            </div>
          </div>
        </div>
      </Flex>

      <Footer />
    </Flex>
  );
};

export default Restaurants;
