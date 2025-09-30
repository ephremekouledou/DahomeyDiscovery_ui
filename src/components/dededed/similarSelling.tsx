import React from "react";
import { IAccommodationData } from "../../sdk/models/hebergements";
import { ICarRentalData } from "../../sdk/models/vehicules";
import { IAttraction } from "../../sdk/models/attraction";
import { ICircuit } from "../../sdk/models/circuits";
import { HandleGetFileLink } from "../../pages/Circuits/CircuitsCartes";

type SimilarItem = IAccommodationData | ICarRentalData | IAttraction | ICircuit;

interface SimilarSellingProps {
  items: SimilarItem[];
  type: "circuit" | "hebergement" | "location" | "attraction";
  maxItems?: number;
}

const SimilarSelling: React.FC<SimilarSellingProps> = ({
  items,
  type,
  maxItems = 5,
}) => {
  const getCardData = (item: SimilarItem, itemType: string) => {
    switch (itemType) {
      case "circuit": {
        const circuit = item as ICircuit;
        return {
          id: circuit._id,
          image: circuit.image?.[0]?.file || "",
          title: circuit.title || "Circuit",
          description: circuit.description || "",
          price: circuit.price,
          subtitle: `${circuit.day || 0} jours / ${circuit.night || 0} nuits`,
          rating: 0,
          reviewCount: 0,
        };
      }
      case "hebergement": {
        const accommodation = item as IAccommodationData;
        return {
          id: accommodation._id,
          image: accommodation.main_image?.[0]?.file || "",
          title: accommodation.name || "Hébergement",
          description: accommodation.description || "",
          price: accommodation.price,
          subtitle: `${accommodation.ville || ""} - ${
            accommodation.type || ""
          }`,
          rating: accommodation.rating,
          reviewCount: accommodation.review_count,
        };
      }
      case "location": {
        const car = item as ICarRentalData;
        return {
          id: car._id,
          image: car.main_image?.[0]?.file || "",
          title: car.name || "Location",
          description: `${car.brand || ""} ${car.model || ""}`,
          price: car.price_per_day,
          subtitle: `${car.passengers || 0} passagers - ${
            car.transmission || ""
          }`,
          rating: car.rating,
          reviewCount: car.review_count,
          isPricePerDay: true,
        };
      }
      case "attraction": {
        const attraction = item as IAttraction;
        return {
          id: attraction._id,
          image: attraction.images?.[0]?.file || "",
          title: attraction.title || "Attraction",
          description: attraction.description || "",
          price: attraction.price?.[0]?.price,
          subtitle: `${attraction.duration || ""} - ${
            attraction.location || ""
          }`,
          rating: attraction.rating,
          reviewCount: attraction.reviewCount,
        };
      }
      default:
        return {
          id: "",
          image: "",
          title: "Item",
          description: "",
          price: 0,
          subtitle: "",
          rating: 0,
          reviewCount: 0,
        };
    }
  };

  const getTitle = (itemType: string) => {
    const titles: Record<string, string> = {
      circuit: "Circuits similaires qui pourraient vous plaire",
      hebergement: "Hébergements similaires recommandés",
      location: "Autres véhicules disponibles",
      attraction: "Attractions similaires à découvrir",
    };
    return titles[itemType] || "Recommandations similaires";
  };

  const renderStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;

    for (let i = 0; i < 5; i++) {
      if (i < fullStars) {
        stars.push(
          <svg key={i} className="w-4 h-4 fill-yellow-400" viewBox="0 0 20 20">
            <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
          </svg>
        );
      } else if (i === fullStars && hasHalfStar) {
        stars.push(
          <svg key={i} className="w-4 h-4" viewBox="0 0 20 20">
            <defs>
              <linearGradient id={`half-${i}`}>
                <stop offset="50%" stopColor="#FBBF24" />
                <stop offset="50%" stopColor="#E5E7EB" />
              </linearGradient>
            </defs>
            <path
              fill={`url(#half-${i})`}
              d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"
            />
          </svg>
        );
      } else {
        stars.push(
          <svg key={i} className="w-4 h-4 fill-gray-300" viewBox="0 0 20 20">
            <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
          </svg>
        );
      }
    }
    return stars;
  };

  const limitedItems = items.slice(0, maxItems);

  if (limitedItems.length === 0) {
    return null;
  }

  return (
    <div className="w-full py-12 px-4" style={{ fontFamily: "GeneralSans" }}>
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bold text-gray-900" style={{ fontFamily: "GeneralSans" }}>
            {getTitle(type)}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {limitedItems.map((item) => {
            const cardData = getCardData(item, type);

            return (
              <a
                key={item._id}
                href={
                  type === "hebergement"
                    ? "/hebergements/" + item._id
                    : type === "location"
                    ? "/locations/" + item._id
                    : type === "attraction"
                    ? "/attractions/" + item._id
                    : "#"
                }
              >
                <div
                  key={cardData.id}
                  className="group bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 cursor-pointer"
                >
                  <div className="relative h-56 overflow-hidden bg-gray-200">
                    {cardData.image ? (
                      <img
                        src={HandleGetFileLink(cardData.image as string)}
                        alt={cardData.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-gray-400">
                        <svg
                          className="w-20 h-20"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={1.5}
                            d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                          />
                        </svg>
                      </div>
                    )}
                  </div>

                  <div className="p-5">
                    <h3 className="font-bold text-gray-900 text-xl mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors">
                      {cardData.title}
                    </h3>

                    {cardData.subtitle && (
                      <p className="text-sm text-gray-600 mb-3 line-clamp-1 flex items-center gap-1.5">
                        <svg
                          className="w-4 h-4 text-gray-400"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                          />
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                          />
                        </svg>
                        {cardData.subtitle}
                      </p>
                    )}

                    {cardData.description && (
                      <p className="text-sm text-gray-500 mb-4 line-clamp-2 leading-relaxed">
                        {cardData.description}
                      </p>
                    )}

                    {cardData.rating > 0 && (
                      <div className="flex items-center gap-2 pt-3 border-t border-gray-100">
                        <div className="flex gap-0.5">
                          {renderStars(cardData.rating)}
                        </div>
                        <span className="text-sm font-semibold text-gray-700">
                          {cardData.rating.toFixed(1)}
                        </span>
                        {cardData.reviewCount > 0 && (
                          <span className="text-xs text-gray-500">
                            ({cardData.reviewCount} avis)
                          </span>
                        )}
                      </div>
                    )}

                    <button className="w-full cursor-pointer mt-4 bg-[#f49e00] hover:bg-[#ff3100] text-white font-medium py-2.5 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2 group-hover:gap-3">
                      Voir les détails
                      <svg
                        className="w-4 h-4 transition-all"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
              </a>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default SimilarSelling;
