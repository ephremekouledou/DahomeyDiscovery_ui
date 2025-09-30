import React from "react";
import { ICircuit } from "../../sdk/models/circuits";
import { IAccommodationData } from "../../sdk/models/hebergements";
import { ICarRentalData } from "../../sdk/models/vehicules";
import { IAttraction } from "../../sdk/models/attraction";
import { HandleGetFileLink } from "../../pages/Circuits/CircuitsCartes";

export interface IClientHistory {
  _id: string;
  created_at?: string;
  type: string;
  lien: string;
  circuit?: ICircuit;
  accommodation?: IAccommodationData;
  car_rental?: ICarRentalData;
  attraction?: IAttraction;
}

interface CrossSellingProps {
  history: IClientHistory[];
  maxItems?: number;
}

const CrossSelling: React.FC<CrossSellingProps> = ({
  history,
  maxItems = 5,
}) => {
  const getCardData = (item: IClientHistory) => {
    switch (item.type) {
      case "circuit":
        return {
          image: item.circuit?.image?.[0]?.file || "",
          title: item.circuit?.title || "Circuit",
          description: item.circuit?.description || "",
          price: item.circuit?.price,
          subtitle: `${item.circuit?.day || 0} jours / ${
            item.circuit?.night || 0
          } nuits`,
        };
      case "hebergement":
        return {
          image: item.accommodation?.main_image?.[0]?.file || "",
          title: item.accommodation?.name || "Hébergement",
          description: item.accommodation?.description || "",
          price: item.accommodation?.price,
          subtitle: `${item.accommodation?.ville || ""} - ${
            item.accommodation?.type || ""
          }`,
        };
      case "location":
        return {
          image: item.car_rental?.main_image?.[0]?.file || "",
          title: item.car_rental?.name || "Location",
          description: `${item.car_rental?.brand || ""} ${
            item.car_rental?.model || ""
          }`,
          price: item.car_rental?.price_per_day,
          subtitle: `${item.car_rental?.passengers || 0} passagers - ${
            item.car_rental?.transmission || ""
          }`,
        };
      case "attraction":
        return {
          image: item.attraction?.images?.[0]?.file || "",
          title: item.attraction?.title || "Attraction",
          description: item.attraction?.description || "",
          price: item.attraction?.price?.[0]?.price,
          subtitle: `${item.attraction?.duration || ""} - ${
            item.attraction?.location || ""
          }`,
        };
      default:
        return {
          image: "",
          title: "Item",
          description: "",
          price: 0,
          subtitle: "",
        };
    }
  };

  const getTypeLabel = (type: string) => {
    const labels: Record<string, string> = {
      circuit: "Circuit",
      hebergement: "Hébergement",
      location: "Véhicule",
      attraction: "Attraction",
    };
    return labels[type] || "cet élément";
  };

  const limitedHistory = history.slice(0, maxItems);

  if (limitedHistory.length === 0) {
    return null;
  }

  return (
    <div className="w-full py-8 px-4" style={{ fontFamily: "GeneralSans" }}>
      <div className="max-w-7xl mx-auto">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">
          Vous avez montré de l'intérêt pour
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
          {limitedHistory.map((item) => {
            const cardData = getCardData(item);

            return (
              <a
                key={item._id}
                href={item.lien}
                className="group block bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
              >
                <div className="relative h-48 overflow-hidden bg-gray-200">
                  {cardData.image ? (
                    <img
                      src={HandleGetFileLink(cardData.image as string)}
                      alt={cardData.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-400">
                      <svg
                        className="w-16 h-16"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                        />
                      </svg>
                    </div>
                  )}

                  <div className="absolute top-2 right-2 bg-white px-2 py-1 rounded-full text-xs font-medium text-gray-700 shadow-sm">
                    {getTypeLabel(item.type)}
                  </div>
                </div>

                <div className="p-4">
                  <h3 className="font-semibold text-gray-900 text-lg mb-1 line-clamp-2 group-hover:text-blue-600 transition-colors">
                    {cardData.title}
                  </h3>

                  {cardData.description && (
                    <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                      {cardData.description}
                    </p>
                  )}
                </div>
              </a>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default CrossSelling;
