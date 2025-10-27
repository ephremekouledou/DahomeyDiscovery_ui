import {
  Calendar,
  Clock,
  Users,
  Car,
  Home,
  Route,
  ArrowRightLeft,
  MapPin,
  Phone,
  Plane,
  Utensils,
  Star,
} from "lucide-react";
import { PanierPresenter } from "../../sdk/models/panier";
import { usePanier } from "../../context/panierContext";
import { removeItemById, emptyPanier } from "../../sdk/models/panier";
import PaniersAPI from "../../sdk/api/panier";
import { ClientsAPI } from "../../sdk/api/clients";
import { HandleGetFileLink } from "../../pages/Circuits/CircuitsCartes";

interface PanierViewerProps {
  panier: PanierPresenter;
  current?: boolean;
}

const PanierViewer: React.FC<PanierViewerProps> = ({
  panier,
  current = false,
}) => {
  const { panier: panierCtx, setPanier: setPanierCtx } = usePanier();

  const handleRemoveItem = async (id: string) => {
    try {
      // compute updated panier from context (Panier) and persist
      const updated = removeItemById(panierCtx ?? emptyPanier(), id);
      // update local context immediately
      setPanierCtx(updated);

      const userId = (ClientsAPI.GetUser()?._id as string) || "";
      if (userId) {
        const res = await PaniersAPI.Add(updated, userId);
        // update with server response if provided
        if (res) setPanierCtx(res);
      }
    } catch (err) {
      console.error("Error removing item from panier:", err);
    }
  };

  const handlePayAll = () => {
    // Navigate to reservation / payment flow
    // window.location.href = "/reserver";
  };
  const formatDate = (date: Date | string) => {
    const d = typeof date === "string" ? new Date(date) : date;
    return d.toLocaleDateString("fr-FR", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    });
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("fr-FR", {
      style: "currency",
      currency: "XOF",
    }).format(price);
  };

  const calculateTotal = () => {
    let total = 0;
    panier.attractions?.forEach((a) => (total += a.price));
    panier.vehicules?.forEach((v) => (total += v.price));
    panier.hebergements?.forEach((h) => (total += h.price));
    panier.circuits?.forEach((c) => (total += c.price));
    panier.transfers?.forEach((t) => (total += t.price));
    return total;
  };

  const isEmpty =
    !panier.attractions?.length &&
    !panier.vehicules?.length &&
    !panier.hebergements?.length &&
    !panier.circuits?.length &&
    !panier.transfers?.length &&
    !panier.catalogue;

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      {/* Header */}
      <div className="mb-6 pb-4 border-b-2 border-gray-200">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-gray-800">
            Récapitulatif du panier
          </h2>
          {current && (
            <span className="px-3 py-1 bg-green-500 text-white text-sm font-semibold rounded-full">
              Actuel
            </span>
          )}
        </div>
      </div>

      {isEmpty ? (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">Votre panier est vide</p>
        </div>
      ) : (
        <div className="space-y-6">
          {/* Attractions */}
          {panier.attractions?.length > 0 && (
            <div className="space-y-3">
              <h3 className="text-xl font-semibold text-gray-700 flex items-center gap-2">
                <Star className="w-5 h-5 text-yellow-500" />
                Attractions ({panier.attractions.length})
              </h3>
              <div className="space-y-3">
                {panier.attractions.map((attraction) => (
                  <div
                    key={attraction._id}
                    className="flex gap-4 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition"
                  >
                    <img
                      src={HandleGetFileLink(attraction.image)}
                      alt={attraction.attraction}
                      className="w-24 h-24 object-cover rounded-md"
                    />
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-800">
                        {attraction.attraction}
                      </h4>
                      <p className="text-sm text-gray-600">
                        {attraction.option}
                      </p>
                      <div className="flex gap-4 mt-2 text-sm text-gray-600">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          {formatDate(attraction.date)}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          {attraction.time}
                        </span>
                        <span className="flex items-center gap-1">
                          <Users className="w-4 h-4" />
                          {attraction.participants} pers.
                        </span>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-lg text-gray-800">
                        {formatPrice(attraction.price)}
                      </p>
                      {current && (
                        <button
                          onClick={() => handleRemoveItem(attraction._id)}
                          className="mt-2 text-sm text-red-600 hover:underline"
                        >
                          Supprimer
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Véhicules */}
          {panier.vehicules?.length > 0 && (
            <div className="space-y-3">
              <h3 className="text-xl font-semibold text-gray-700 flex items-center gap-2">
                <Car className="w-5 h-5 text-blue-500" />
                Véhicules ({panier.vehicules.length})
              </h3>
              <div className="space-y-3">
                {panier.vehicules.map((vehicule) => (
                  <div
                    key={vehicule._id}
                    className="flex gap-4 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition"
                  >
                    <img
                      src={HandleGetFileLink(vehicule.image)}
                      alt={vehicule.vehicule}
                      className="w-24 h-24 object-cover rounded-md"
                    />
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-800">
                        {vehicule.vehicule}
                      </h4>
                      {vehicule.chauffeur && (
                        <span className="inline-block mt-1 px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded">
                          Avec chauffeur
                        </span>
                      )}
                      <div className="flex gap-4 mt-2 text-sm text-gray-600">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          {formatDate(vehicule.date)}
                        </span>
                        <span>
                          {vehicule.jour} jour{vehicule.jour > 1 ? "s" : ""}
                        </span>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-lg text-gray-800">
                        {formatPrice(vehicule.price)}
                      </p>
                      {current && (
                        <button
                          onClick={() => handleRemoveItem(vehicule._id)}
                          className="mt-2 text-sm text-red-600 hover:underline"
                        >
                          Supprimer
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Hébergements */}
          {panier.hebergements?.length > 0 && (
            <div className="space-y-3">
              <h3 className="text-xl font-semibold text-gray-700 flex items-center gap-2">
                <Home className="w-5 h-5 text-purple-500" />
                Hébergements ({panier.hebergements.length})
              </h3>
              <div className="space-y-3">
                {panier.hebergements.map((hebergement) => (
                  <div
                    key={hebergement._id}
                    className="flex gap-4 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition"
                  >
                    <img
                      src={HandleGetFileLink(hebergement.image)}
                      alt={hebergement.hebergement}
                      className="w-24 h-24 object-cover rounded-md"
                    />
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-800">
                        {hebergement.hebergement}
                      </h4>
                      <p className="text-sm text-gray-600">
                        {hebergement.option}
                      </p>
                      <div className="flex gap-4 mt-2 text-sm text-gray-600">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          {formatDate(hebergement.date)}
                        </span>
                        <span>
                          {hebergement.jour} nuit
                          {hebergement.jour > 1 ? "s" : ""}
                        </span>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-lg text-gray-800">
                        {formatPrice(hebergement.price)}
                      </p>
                        {current && (
                          <button
                            onClick={() => handleRemoveItem(hebergement._id)}
                            className="mt-2 text-sm text-red-600 hover:underline"
                          >
                            Supprimer
                          </button>
                        )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Circuits */}
          {panier.circuits?.length > 0 && (
            <div className="space-y-3">
              <h3 className="text-xl font-semibold text-gray-700 flex items-center gap-2">
                <Route className="w-5 h-5 text-orange-500" />
                Circuits ({panier.circuits.length})
              </h3>
              <div className="space-y-3">
                {panier.circuits.map((circuit) => (
                  <div
                    key={circuit._id}
                    className="flex gap-4 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition"
                  >
                    <img
                      src={HandleGetFileLink(circuit.image)}
                      alt={circuit.circuit}
                      className="w-24 h-24 object-cover rounded-md"
                    />
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-800">
                        {circuit.circuit}
                      </h4>
                      <p className="text-sm text-gray-600">
                        {circuit.circuit_type}
                      </p>
                      <div className="flex gap-4 mt-2 text-sm text-gray-600">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          {formatDate(circuit.date)}
                        </span>
                        <span className="flex items-center gap-1">
                          <Users className="w-4 h-4" />
                          {circuit.participants} pers.
                        </span>
                      </div>
                      {circuit.villes?.length > 0 && (
                        <div className="mt-2 flex items-center gap-1 text-sm text-gray-600">
                          <MapPin className="w-4 h-4" />
                          <span>{circuit.villes.join(" → ")}</span>
                        </div>
                      )}
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-lg text-gray-800">
                        {formatPrice(circuit.price)}
                      </p>
                        {current && (
                          <button
                            onClick={() => handleRemoveItem(circuit._id)}
                            className="mt-2 text-sm text-red-600 hover:underline"
                          >
                            Supprimer
                          </button>
                        )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Transferts */}
          {panier.transfers?.length > 0 && (
            <div className="space-y-3">
              <h3 className="text-xl font-semibold text-gray-700 flex items-center gap-2">
                <ArrowRightLeft className="w-5 h-5 text-green-500" />
                Transferts ({panier.transfers.length})
              </h3>
              <div className="space-y-3">
                {panier.transfers.map((transfer) => (
                  <div
                    key={transfer._id}
                    className="p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition"
                  >
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <h4 className="font-semibold text-gray-800">
                          {transfer.transfer_type}
                        </h4>
                        <p className="text-sm text-gray-600 mt-1">
                          <MapPin className="w-4 h-4 inline mr-1" />
                          {transfer.destination}
                        </p>
                        <p className="text-sm text-gray-600">
                          Véhicule: {transfer.type_vehicule}
                        </p>
                        <div className="flex gap-4 mt-2 text-sm text-gray-600">
                          <span className="flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            {formatDate(transfer.date)}
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            {transfer.time}
                          </span>
                          <span className="flex items-center gap-1">
                            <Users className="w-4 h-4" />
                            {transfer.passagers} pass.
                          </span>
                        </div>
                        {transfer.numero_vol && (
                          <p className="text-sm text-gray-600 mt-1">
                            <Plane className="w-4 h-4 inline mr-1" />
                            Vol: {transfer.numero_vol}
                          </p>
                        )}
                        {transfer.numero_tel && (
                          <p className="text-sm text-gray-600">
                            <Phone className="w-4 h-4 inline mr-1" />
                            {transfer.numero_tel}
                          </p>
                        )}
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-lg text-gray-800">
                          {formatPrice(transfer.price)}
                        </p>
                          {current && (
                            <button
                              onClick={() => handleRemoveItem(transfer._id)}
                              className="mt-2 text-sm text-red-600 hover:underline"
                            >
                              Supprimer
                            </button>
                          )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Catalogue Restaurant */}
          {panier.catalogue && (
            <div className="p-4 bg-gradient-to-r from-amber-50 to-orange-50 rounded-lg border-2 border-amber-200">
              <div className="flex items-center gap-3">
                <Utensils className="w-6 h-6 text-amber-600" />
                <div>
                  <h4 className="font-semibold text-gray-800">
                    Catalogue des Restaurants
                  </h4>
                  <p className="text-sm text-gray-600">
                    Le catalogue complet des restaurants est inclus dans votre
                    panier
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Total */}
          <div className="mt-8 pt-6 border-t-2 border-gray-200">
            <div className="flex justify-between items-center">
              <span className="text-xl font-semibold text-gray-700">Total</span>
              <span className="text-3xl font-bold text-gray-900">
                {formatPrice(calculateTotal())}
              </span>
            </div>
            {current && !isEmpty && (
              <div className="mt-6 flex justify-end">
                <button
                  onClick={handlePayAll}
                  className="px-6 py-3 bg-[#f59f00] text-white hover:bg-[#ff3100] text-white font-semibold rounded-lg"
                >
                  Payer
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default PanierViewer;
