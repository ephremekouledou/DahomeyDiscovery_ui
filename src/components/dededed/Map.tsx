import React, { useState, useEffect, useRef } from "react";

export interface MapItem {
  id: string;
  name: string;
  latitude: number;
  longitude: number;
}

interface MapProps {
  item: MapItem;
}

const ItemLocation: React.FC<MapProps> = ({ item }: MapProps) => {
  const [mapLoaded, setMapLoaded] = useState(false);
  const [initialZoom, _] = useState(15);
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<any>(null);
  const markersRef = useRef<any[]>([]);

  // Charger Leaflet CSS et JS
  useEffect(() => {
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href =
      "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/leaflet.min.css";
    document.head.appendChild(link);

    const script = document.createElement("script");
    script.src =
      "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/leaflet.min.js";
    script.async = true;
    script.onload = () => setMapLoaded(true);
    document.head.appendChild(script);

    return () => {
      document.head.removeChild(link);
      document.head.removeChild(script);
    };
  }, []);

  // Initialiser la carte
  useEffect(() => {
    if (
      mapLoaded &&
      mapRef.current &&
      !mapInstanceRef.current &&
      (window as any).L
    ) {
      initializeMap();
    }
  }, [mapLoaded, item]); // 🔹 Ajout de item dans les dépendances

  // Nettoyer la carte si item change
  useEffect(() => {
    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
        markersRef.current = [];
      }
    };
  }, [item]);

  const initializeMap = () => {
    if (!mapRef.current || !(window as any).L) return;

    const L = (window as any).L;

    // 🔹 CORRECTION: Vérifier que les coordonnées sont valides
    const lat = item.latitude;
    const lng = item.longitude;

    console.log("Coordonnées reçues:", { lat, lng, item }); // Debug

    // Vérification de validité des coordonnées
    if (
      typeof lat !== "number" ||
      typeof lng !== "number" ||
      isNaN(lat) ||
      isNaN(lng) ||
      lat < -90 ||
      lat > 90 ||
      lng < -180 ||
      lng > 180
    ) {
      console.error("Coordonnées invalides:", { lat, lng });
      return;
    }

    // 🔹 Création de la carte avec les bonnes coordonnées
    const map = L.map(mapRef.current).setView([lat, lng], initialZoom);

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution:
        '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      maxZoom: 19,
    }).addTo(map);

    mapInstanceRef.current = map;

    const defaultIcon = L.divIcon({
      html: `<div style="background-color: #2563eb; width: 30px; height: 30px; border-radius: 50% 50% 50% 0; transform: rotate(-45deg); border: 3px solid white; box-shadow: 0 2px 5px rgba(0,0,0,0.3);"></div>`,
      className: "custom-marker",
      iconSize: [30, 30],
      iconAnchor: [15, 30],
    });

    // 🔹 Ajouter le marqueur avec les bonnes coordonnées
    const marker = L.marker([lat, lng], {
      icon: defaultIcon,
    }).addTo(map);

    // Ajouter un popup avec le nom
    marker.bindPopup(`<b>${item.name}</b>`).openPopup();

    markersRef.current.push(marker);
  };

  return (
    <div className="w-full bg-gray-100 flex" style={{ height: "50vh" }}>
      <div
        className="flex-1 relative"
        style={{ height: "50vh", width: "100%" }}
      >
        <div ref={mapRef} className="w-full h-[50vh]" />

        {!mapLoaded && (
          <div className="absolute inset-0 flex items-center justify-center bg-white">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
              <p className="text-gray-600">Chargement de la carte...</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ItemLocation;
