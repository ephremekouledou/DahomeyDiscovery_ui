import React, { useState, useEffect, useRef } from "react";
import { X, Route, MapPin } from "lucide-react";
import { ICircuitStop } from "../../sdk/models/circuits";


interface AccommodationMapProps {
  accommodations: ICircuitStop[];
  initialZoom?: number;
  showRoute?: boolean; // Activer l'affichage de l'itinéraire
  routeColor?: string; // Couleur de l'itinéraire
}

const MapItineraire: React.FC<AccommodationMapProps> = ({
  accommodations,
  initialZoom = 6,
  showRoute = false,
  routeColor = "#2563eb",
}) => {
  const [selectedAccommodation, setSelectedAccommodation] =
    useState<ICircuitStop | null>(null);
  const [mapLoaded, setMapLoaded] = useState(false);
  const [routingLoaded, setRoutingLoaded] = useState(false);
  const [showRouteUI, setShowRouteUI] = useState(showRoute);
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<any>(null);
  const markersRef = useRef<any[]>([]);
  const routeControlRef = useRef<any>(null);

  // Charger Leaflet CSS et JS
  useEffect(() => {
    // Charger le CSS de Leaflet
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href =
      "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/leaflet.min.css";
    document.head.appendChild(link);

    // Charger le CSS de Leaflet Routing Machine
    const routingCss = document.createElement("link");
    routingCss.rel = "stylesheet";
    routingCss.href =
      "https://cdnjs.cloudflare.com/ajax/libs/leaflet-routing-machine/3.2.12/leaflet-routing-machine.min.css";
    document.head.appendChild(routingCss);

    // Charger le JS de Leaflet
    const script = document.createElement("script");
    script.src =
      "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/leaflet.min.js";
    script.async = true;
    script.onload = () => {
      setMapLoaded(true);

      // Charger le JS de Leaflet Routing Machine après Leaflet
      const routingScript = document.createElement("script");
      routingScript.src =
        "https://cdnjs.cloudflare.com/ajax/libs/leaflet-routing-machine/3.2.12/leaflet-routing-machine.min.js";
      routingScript.async = true;
      routingScript.onload = () => {
        setRoutingLoaded(true);
      };
      document.head.appendChild(routingScript);
    };
    document.head.appendChild(script);

    return () => {
      if (document.head.contains(link)) document.head.removeChild(link);
      if (document.head.contains(routingCss))
        document.head.removeChild(routingCss);
      if (document.head.contains(script)) document.head.removeChild(script);
    };
  }, []);

  // Initialiser la carte
  useEffect(() => {
    if (
      mapLoaded &&
      mapRef.current &&
      !mapInstanceRef.current &&
      (window as any).L &&
      accommodations.length > 0
    ) {
      initializeMap();
    }
  }, [mapLoaded, accommodations]);

  // Gérer l'affichage de l'itinéraire
  useEffect(() => {
    if (mapInstanceRef.current && routingLoaded && accommodations.length > 1) {
      if (showRouteUI) {
        addRoute();
      } else {
        removeRoute();
      }
    }
  }, [showRouteUI, routingLoaded, accommodations]);

  const initializeMap = () => {
    if (!mapRef.current || !(window as any).L || accommodations.length === 0)
      return;

    const L = (window as any).L;

    // Centre de la carte (moyenne des positions)
    const centerLat =
      accommodations.reduce((sum, acc) => sum + acc.latitude, 0) /
      accommodations.length;
    const centerLng =
      accommodations.reduce((sum, acc) => sum + acc.longitude, 0) /
      accommodations.length;

    // Créer la carte avec OpenStreetMap et le zoom initial personnalisé
    const map = L.map(mapRef.current).setView(
      [centerLat, centerLng],
      initialZoom
    );

    // Ajouter les tuiles OpenStreetMap en français
    L.tileLayer("https://{s}.tile.openstreetmap.fr/osmfr/{z}/{x}/{y}.png", {
      attribution:
        '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributeurs',
      maxZoom: 20,
    }).addTo(map);

    mapInstanceRef.current = map;

    // Créer une icône personnalisée
    const defaultIcon = L.divIcon({
      html: `<div style="background-color: ${routeColor}; width: 30px; height: 30px; border-radius: 50% 50% 50% 0; transform: rotate(-45deg); border: 3px solid white; box-shadow: 0 2px 5px rgba(0,0,0,0.3);"></div>`,
      className: "custom-marker",
      iconSize: [30, 30],
      iconAnchor: [15, 30],
    });

    const selectedIcon = L.divIcon({
      html: `<div style="background-color: #dc2626; width: 36px; height: 36px; border-radius: 50% 50% 50% 0; transform: rotate(-45deg); border: 3px solid white; box-shadow: 0 3px 8px rgba(0,0,0,0.4);"></div>`,
      className: "custom-marker-selected",
      iconSize: [36, 36],
      iconAnchor: [18, 36],
    });

    // Vider les anciens marqueurs
    markersRef.current = [];

    // Ajouter les marqueurs avec numéros pour l'itinéraire
    accommodations.forEach((accommodation, index) => {
      const markerHtml = showRouteUI
        ? `<div style="background-color: ${routeColor}; width: 32px; height: 32px; border-radius: 50%; border: 3px solid white; box-shadow: 0 2px 5px rgba(0,0,0,0.3); display: flex; align-items: center; justify-content: center; color: white; font-weight: bold; font-size: 14px;">${
            index + 1
          }</div>`
        : `<div style="background-color: ${routeColor}; width: 30px; height: 30px; border-radius: 50% 50% 50% 0; transform: rotate(-45deg); border: 3px solid white; box-shadow: 0 2px 5px rgba(0,0,0,0.3);"></div>`;

      const icon = L.divIcon({
        html: markerHtml,
        className: "custom-marker",
        iconSize: [32, 32],
        iconAnchor: [16, 32],
      });

      const marker = L.marker(
        [accommodation.latitude, accommodation.longitude],
        { icon: showRouteUI ? icon : defaultIcon }
      ).addTo(map);

      marker.on("click", () => {
        setSelectedAccommodation(accommodation);
        map.setView([accommodation.latitude, accommodation.longitude], 15, {
          animate: true,
          duration: 0.5,
        });

        // Changer les icônes
        markersRef.current.forEach((m, idx) => {
          if (accommodations[idx]._id === accommodation._id) {
            m.setIcon(selectedIcon);
          } else {
            m.setIcon(showRouteUI ? icon : defaultIcon);
          }
        });
      });

      markersRef.current.push(marker);
    });

    // Ajuster les limites pour voir tous les marqueurs
    const bounds = L.latLngBounds(
      accommodations.map((acc) => [acc.latitude, acc.longitude])
    );
    map.fitBounds(bounds, { padding: [50, 50] });
  };

  const addRoute = () => {
    if (!mapInstanceRef.current || !routingLoaded || accommodations.length < 2)
      return;

    const L = (window as any).L;

    // Supprimer l'ancien itinéraire s'il existe
    removeRoute();

    // Créer les waypoints (points de passage)
    const waypoints = accommodations.map((acc) =>
      L.latLng(acc.latitude, acc.longitude)
    );

    // Créer le contrôle de routage
    routeControlRef.current = L.Routing.control({
      waypoints: waypoints,
      routeWhileDragging: false,
      addWaypoints: false,
      draggableWaypoints: false,
      fitSelectedRoutes: true,
      showAlternatives: false,
      lineOptions: {
        styles: [
          { color: routeColor, opacity: 0.8, weight: 6 },
          { color: "white", opacity: 0.3, weight: 9 },
        ],
      },
      createMarker: function () {
        return null;
      }, // Ne pas créer de marqueurs (on utilise les nôtres)
      router: L.Routing.osrmv1({
        serviceUrl: "https://router.project-osrm.org/route/v1",
        profile: "driving", // ou 'walking', 'cycling'
      }),
    }).addTo(mapInstanceRef.current);

    // Masquer le panneau d'instructions par défaut
    const container = routeControlRef.current.getContainer();
    if (container) {
      container.style.display = "none";
    }
  };

  const removeRoute = () => {
    if (routeControlRef.current && mapInstanceRef.current) {
      mapInstanceRef.current.removeControl(routeControlRef.current);
      routeControlRef.current = null;
    }
  };

  const toggleRoute = () => {
    setShowRouteUI(!showRouteUI);

    // Mettre à jour les marqueurs
    if (mapInstanceRef.current && (window as any).L) {
      const L = (window as any).L;
      const newShowRoute = !showRouteUI;

      markersRef.current.forEach((marker, index) => {
        const markerHtml = newShowRoute
          ? `<div style="background-color: ${routeColor}; width: 32px; height: 32px; border-radius: 50%; border: 3px solid white; box-shadow: 0 2px 5px rgba(0,0,0,0.3); display: flex; align-items: center; justify-content: center; color: white; font-weight: bold; font-size: 14px;">${
              index + 1
            }</div>`
          : `<div style="background-color: ${routeColor}; width: 30px; height: 30px; border-radius: 50% 50% 50% 0; transform: rotate(-45deg); border: 3px solid white; box-shadow: 0 2px 5px rgba(0,0,0,0.3);"></div>`;

        const icon = L.divIcon({
          html: markerHtml,
          className: "custom-marker",
          iconSize: [32, 32],
          iconAnchor: [16, 32],
        });

        marker.setIcon(icon);
      });
    }
  };

  return (
    <div className="w-full bg-gray-100 flex" style={{ height: "50vh" }}>
      {/* Conteneur de la carte */}
      <div
        className="flex-1 relative"
        style={{ height: "50vh", width: "100%" }}
      >
        {/* Carte Leaflet */}
        <div ref={mapRef} className="w-full h-[50vh]" />

        {/* Bouton pour afficher/masquer l'itinéraire */}
        {accommodations.length > 1 && routingLoaded && (
          <button
            onClick={toggleRoute}
            className={`absolute top-4 right-4 px-4 py-2 rounded-lg shadow-lg font-medium transition-all z-[1000] flex items-center gap-2 ${
              showRouteUI
                ? "bg-blue-600 text-white hover:bg-blue-700"
                : "bg-white text-gray-700 hover:bg-gray-100"
            }`}
            title={
              showRouteUI ? "Masquer l'itinéraire" : "Afficher l'itinéraire"
            }
          >
            {showRouteUI ? (
              <>
                <MapPin size={18} />
                <span>Marqueurs seuls</span>
              </>
            ) : (
              <>
                <Route size={18} />
                <span>Afficher itinéraire</span>
              </>
            )}
          </button>
        )}

        {/* Message de chargement */}
        {!mapLoaded && (
          <div className="absolute inset-0 flex items-center justify-center bg-white">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
              <p className="text-gray-600">Chargement de la carte...</p>
            </div>
          </div>
        )}

        {/* Message si aucun hébergement */}
        {accommodations.length === 0 && mapLoaded && (
          <div className="absolute inset-0 flex items-center justify-center bg-white">
            <div className="text-center">
              <p className="text-gray-600">Aucun hébergement à afficher</p>
            </div>
          </div>
        )}

        {/* Popup d'information */}
        {selectedAccommodation && (
          <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 bg-white rounded-2xl shadow-2xl w-full max-w-md z-[1000] animate-in fade-in slide-in-from-bottom-4 duration-300 mx-4">
            <button
              onClick={() => setSelectedAccommodation(null)}
              className="absolute top-3 right-3 bg-white rounded-full p-2 shadow-lg hover:bg-gray-100 transition-colors z-30"
            >
              <X size={20} className="text-gray-700" />
            </button>

            {/* {selectedAccommodation.image && (
              <img
                src={selectedAccommodation.image}
                alt={selectedAccommodation.name}
                className="w-full h-48 object-cover rounded-t-2xl"
              />
            )} */}

            <div className="p-5">
              <h3 className="text-xl font-bold text-gray-800 mb-1">
                {selectedAccommodation.title}
              </h3>

              {/* <p className="text-gray-600 text-sm mb-3">
                {selectedAccommodation.address}
              </p> */}

              {selectedAccommodation.description && (
                <p className="text-gray-600 text-sm mb-3">
                  {selectedAccommodation.description}
                </p>
              )}

              {/* <div className="flex items-center justify-between mb-4">
                {selectedAccommodation.rating && (
                  <div className="flex items-center gap-2">
                    <span className="bg-blue-600 text-white px-3 py-1.5 rounded-lg font-bold">
                      {selectedAccommodation.rating}
                    </span>
                    <span className="text-sm text-gray-600 font-medium">
                      Excellent
                    </span>
                  </div>
                )}

                {selectedAccommodation.price && (
                  <div className="text-right">
                    <p className="text-xs text-gray-500">À partir de</p>
                    <p className="text-xl font-bold text-blue-600">
                      {selectedAccommodation.price}
                    </p>
                  </div>
                )}
              </div> */}

              <button className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-3 rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all font-medium shadow-md hover:shadow-lg">
                Voir les détails et réserver
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// Exemple d'utilisation avec itinéraire
// const MapItineraire = () => {
//   const sampleAccommodations: Accommodation[] = [
//     {
//       id: 1,
//       name: "Hôtel Paris Centre",
//       address: "Paris, France",
//       latitude: 48.8566,
//       longitude: 2.3522,
//       rating: 9.1,
//       price: "95,00 €",
//       image:
//         "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400&h=250&fit=crop",
//       description: "Hôtel moderne au cœur de Paris",
//     },
//     {
//       id: 2,
//       name: "Hôtel Lyon Prestige",
//       address: "Lyon, France",
//       latitude: 45.764,
//       longitude: 4.8357,
//       rating: 8.9,
//       price: "120,00 €",
//       image:
//         "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=400&h=250&fit=crop",
//       description: "Vue sur la Saône",
//     },
//     {
//       id: 3,
//       name: "Hôtel Marseille Vieux Port",
//       address: "Marseille, France",
//       latitude: 43.2965,
//       longitude: 5.3698,
//       rating: 8.7,
//       price: "85,00 €",
//       image:
//         "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=400&h=250&fit=crop",
//       description: "Face à la mer Méditerranée",
//     },
//   ];

//   return (
//     <div className="min-h-screen bg-gray-50 p-8">
//       <div className="max-w-7xl mx-auto">
//         <h1 className="text-3xl font-bold text-gray-800 mb-2">
//           Itinéraire entre Hébergements
//         </h1>
//         <p className="text-gray-600 mb-6">
//           Cliquez sur "Afficher itinéraire" pour voir le chemin entre les
//           hébergements
//         </p>

//         <AccommodationMap
//           accommodations={sampleAccommodations}
//           initialZoom={6}
//           showRoute={true} // false par défaut, l'utilisateur peut activer via le bouton
//           routeColor="#2563eb" // Couleur de l'itinéraire (bleu par défaut)
//         />

//         <div className="mt-6 bg-white p-4 rounded-lg shadow">
//           <h3 className="font-bold text-gray-800 mb-2">Instructions :</h3>
//           <ul className="text-sm text-gray-600 space-y-1">
//             <li>• Les hébergements sont numérotés dans l'ordre du tableau</li>
//             <li>
//               • L'itinéraire suit l'ordre des hébergements (1 → 2 → 3 → ...)
//             </li>
//             <li>
//               • Cliquez sur le bouton en haut à droite pour afficher/masquer
//               l'itinéraire
//             </li>
//             <li>
//               • L'itinéraire utilise les routes réelles (conduite automobile)
//             </li>
//           </ul>
//         </div>
//       </div>
//     </div>
//   );
// };

export default MapItineraire;
