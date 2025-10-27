import { useEffect, useState } from "react";
import { ShoppingCart } from "lucide-react";
import { usePanier } from "../../context/panierContext";
import { IClient } from "../../sdk/models/clients";
import { ClientsAPI } from "../../sdk/api/clients";
import PaniersAPI from "../../sdk/api/panier";
import { useNavigate } from "react-router-dom";

export default function FloatingCartButton() {
  // Nombre d'articles dans le panier (calculé depuis le contexte panier)
  const [cartItemCount, setCartItemCount] = useState(0);
  const { panier, setPanier } = usePanier();
  const [user, setUser] = useState<IClient | null>(null);

  const getCartItemCount = () => {
    if (!panier) {
      setCartItemCount(0);
      return;
    }

    const attractionsCount = panier.attractions ? panier.attractions.length : 0;
    const vehiculesCount = panier.vehicules ? panier.vehicules.length : 0;
    const hebergementsCount = panier.hebergements
      ? panier.hebergements.length
      : 0;
    const circuitsCount = panier.circuits ? panier.circuits.length : 0;
    const transfersCount = panier.transfers ? panier.transfers.length : 0;

    let count =
      attractionsCount +
      vehiculesCount +
      hebergementsCount +
      circuitsCount +
      transfersCount;

    if (panier.catalogue) {
      count += 1;
    }

    setCartItemCount(count);
  };

  // Check for logged in user
  useEffect(() => {
    const loggedUser = ClientsAPI.GetUser();
    console.log("user:", loggedUser);
    setUser(loggedUser);
  }, []);

  // Check for logged in user
  useEffect(() => {
    if (user != null) {
      // we get the panier
      PaniersAPI.GetActuelCustomer(user?._id as string)
        .then((data) => {
          setPanier(data);
        })
        .catch((err) => {
          console.error("Error fetching current panier", err);
        });
    }
  }, [user]);

  // Recalculate when panier changes
  useEffect(() => {
    getCartItemCount();
    console.log("Panier button", panier);
  }, [panier]);

  const navigate = useNavigate();

  const handleCartClick = () => {
    // Use React Router navigation to avoid a full page reload which clears
    // the React context state (anonymous panier). This keeps the in-memory
    // panier intact when navigating to the reservations page.
    navigate("/reserver");
  };

  return cartItemCount > 0 ? (
    <div>
      {/* Bouton panier flottant */}
      <button
        onClick={handleCartClick}
        className="fixed bottom-16 right-2 bg-[#f59f00] text-white p-4 rounded-full shadow-lg hover:bg-[#ff3100] transition transform hover:scale-110 active:scale-95 z-50 cursor-pointer"
        aria-label="Panier d'achat"
      >
        <div className="relative">
          <ShoppingCart size={24} />

          {/* Badge de notification */}
          {cartItemCount > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center animate-pulse">
              {cartItemCount > 99 ? "99+" : cartItemCount}
            </span>
          )}
        </div>
      </button>
    </div>
  ) : null;
}
