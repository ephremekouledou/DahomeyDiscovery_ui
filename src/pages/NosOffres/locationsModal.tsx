import { Modal } from "antd";
import {
  Car,
  Euro,
  Shield,
  Navigation,
  Users,
  AlertCircle,
  Wrench,
} from "lucide-react";
import { useState } from "react";
import { ICarTarification } from "../../sdk/models/vehicules";

interface EquipmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  equipment: any;
}

export const EquipmentModal = ({
  isOpen,
  onClose,
  equipment,
}: EquipmentModalProps) => {
  const equipmentCategories = [
    {
      title: "Sécurité enfants",
      icon: <Shield className="w-5 h-5 text-blue-600" />,
      items: [
        {
          key: "siege_bebe",
          label: "Siège bébé",
          badge: equipment.siege_bebe_badge,
        },
        {
          key: "siege_enfant",
          label: "Siège enfant",
          badge: equipment.siege_enfant_badge,
        },
        {
          key: "rehausseur",
          label: "Rehausseur",
          badge: equipment.rehausseur_badge,
        },
      ],
    },
    {
      title: "Navigation & connectivité",
      icon: <Navigation className="w-5 h-5 text-green-600" />,
      items: [
        { key: "gps", label: "GPS", badge: equipment.gps_badge },
        {
          key: "wifi_portable",
          label: "WiFi portable",
          badge: equipment.wifi_portable_badge,
        },
        {
          key: "bluetooth",
          label: "Bluetooth",
          badge: equipment.bluetooth_badge,
        },
      ],
    },
    {
      title: "Confort & services",
      icon: <Users className="w-5 h-5 text-purple-600" />,
      items: [
        {
          key: "conducteur_supplementaire",
          label: "Conducteur supplémentaire",
          badge: equipment.conducteur_supplementaire_badge,
        },
        {
          key: "forfait_peage",
          label: "Forfait péage",
          badge: equipment.forfait_peage_badge,
        },
        {
          key: "coffre_toit",
          label: "Coffre de toit",
          badge: equipment.coffre_toit_badge,
        },
      ],
    },
    {
      title: "Accessibilité",
      icon: <AlertCircle className="w-5 h-5 text-orange-600" />,
      items: [
        {
          key: "equipement_mobilite_reduite",
          label: "Équipement mobilité réduite",
          badge: equipment.equipement_mobilite_reduite_badge,
        },
      ],
    },
    {
      title: "Équipements obligatoires",
      icon: <Wrench className="w-5 h-5 text-red-600" />,
      items: [
        {
          key: "gilet_fluorescent",
          label: "Gilet fluorescent",
          badge: equipment.gilet_fluorescent_badge,
        },
        { key: "triangle", label: "Triangle", badge: equipment.triangle_badge },
        {
          key: "roue_secours",
          label: "Roue de secours",
          badge: equipment.roue_secours_badge,
        },
        {
          key: "kit_ampoules",
          label: "Kit ampoules",
          badge: equipment.kit_ampoules_badge,
        },
      ],
    },
    {
      title: "Assurance",
      icon: <Shield className="w-5 h-5 text-indigo-600" />,
      items: [
        { key: "cdw", label: "Assurance CDW", badge: equipment.cdw_badge },
      ],
    },
  ];

  return (
    <Modal
      open={isOpen}
      onCancel={onClose}
      title="Équipements du véhicule"
      width={"60vw"}
      footer={null}
    >
      <div className="p-6 space-y-6">
        {equipmentCategories.map((category, index) => (
          <div key={index} className="border rounded-lg p-4">
            <div className="flex items-center gap-2 mb-3">
              {category.icon}
              <h3 className="font-semibold text-gray-800">{category.title}</h3>
            </div>
            <div className="grid grid-cols-1 gap-2">
              {category.items.map((item, itemIndex) => (
                <div
                  key={itemIndex}
                  className="flex items-center justify-between py-2 px-3 bg-gray-50 rounded"
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-3 h-3 rounded-full ${
                        equipment[item.key] ? "bg-green-500" : "bg-gray-300"
                      }`}
                    ></div>
                    <span className="text-sm text-gray-700">{item.label}</span>
                  </div>
                  {item.badge && (
                    <span
                      className={`px-2 py-1 text-xs rounded-full ${
                        equipment[item.key]
                          ? "bg-green-100 text-green-800"
                          : "bg-gray-100 text-gray-600"
                      }`}
                    >
                      {item.badge}
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </Modal>
  );
};

interface TarificationModalProps {
  isOpen: boolean;
  onClose: () => void;
  tarification: ICarTarification[];
}

// Modal de tarification
export const TarificationModal = ({
  isOpen,
  onClose,
  tarification,
}: TarificationModalProps) => {
  return (
    <Modal
      open={isOpen}
      onCancel={onClose}
      title="Tarification"
      width={"60vw"}
      footer={null}
    >
      <div className="p-6">
        {tarification.length === 0 ? (
          <div className="text-center py-8">
            <Euro className="w-12 h-12 text-gray-400 mx-auto mb-3" />
            <p className="text-gray-500">Aucune tarification disponible</p>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="bg-blue-50 p-4 rounded-lg border-l-4 border-blue-400">
              <h3 className="font-semibold text-blue-800 mb-1">
                Tarification par durée
              </h3>
              <p className="text-sm text-blue-600">
                Les prix varient selon la durée de location
              </p>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full border-collapse border border-gray-300 rounded-lg">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="border border-gray-300 px-4 py-3 text-left text-sm font-semibold text-gray-700">
                      Durée (jours)
                    </th>
                    <th className="border border-gray-300 px-4 py-3 text-right text-sm font-semibold text-gray-700">
                      Prix/jour
                    </th>
                    <th className="border border-gray-300 px-4 py-3 text-left text-sm font-semibold text-gray-700">
                      Description
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {tarification.map((tarif: ICarTarification, index: any) => (
                    <tr
                      key={tarif._id}
                      className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}
                    >
                      <td className="border border-gray-300 px-4 py-3 text-sm text-gray-700">
                        {tarif.from === tarif.to
                          ? `${tarif.from} jour${tarif.from > 1 ? "s" : ""}`
                          : `${tarif.from} - ${tarif.to} jours`}
                      </td>
                      <td className="border border-gray-300 px-4 py-3 text-sm font-semibold text-right">
                        <span className="text-green-600">
                          {tarif.price} FCFA
                        </span>
                      </td>
                      <td className="border border-gray-300 px-4 py-3 text-sm text-gray-600">
                        {tarif.description || "Aucune description"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </Modal>
  );
};

// Composant principal de démonstration
export default function CarModalsDemo() {
  const [showEquipmentModal, setShowEquipmentModal] = useState(false);
  const [showTarificationModal, setShowTarificationModal] = useState(false);

  // Données d'exemple pour les équipements
  const sampleEquipment = {
    siege_bebe: true,
    siege_bebe_badge: "Gratuit",
    siege_enfant: true,
    siege_enfant_badge: "5€/jour",
    rehausseur: false,
    rehausseur_badge: "",
    gps: true,
    gps_badge: "10€/jour",
    wifi_portable: true,
    wifi_portable_badge: "Premium",
    bluetooth: true,
    bluetooth_badge: "Inclus",
    conducteur_supplementaire: true,
    conducteur_supplementaire_badge: "20€",
    forfait_peage: false,
    forfait_peage_badge: "",
    coffre_toit: true,
    coffre_toit_badge: "15€/jour",
    equipement_mobilite_reduite: false,
    equipement_mobilite_reduite_badge: "",
    gilet_fluorescent: true,
    gilet_fluorescent_badge: "Obligatoire",
    triangle: true,
    triangle_badge: "Inclus",
    roue_secours: true,
    roue_secours_badge: "Standard",
    kit_ampoules: true,
    kit_ampoules_badge: "Inclus",
    cdw: true,
    cdw_badge: "Premium",
  };

  // Données d'exemple pour la tarification
  const sampleTarification = [
    { _id: "1", from: 1, to: 3, price: 50, description: "Tarif court séjour" },
    { _id: "2", from: 4, to: 7, price: 45, description: "Tarif semaine" },
    { _id: "3", from: 8, to: 14, price: 40, description: "Tarif longue durée" },
    { _id: "4", from: 15, to: 30, price: 35, description: "Tarif mensuel" },
  ];

  return (
    <div className="p-8 space-y-4">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">
        Gestion des Modales Véhicule
      </h1>

      <div className="flex gap-4">
        <button
          onClick={() => setShowEquipmentModal(true)}
          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Car className="w-5 h-5" />
          Voir les équipements
        </button>

        <button
          onClick={() => setShowTarificationModal(true)}
          className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
        >
          <Euro className="w-5 h-5" />
          Voir la tarification
        </button>
      </div>

      <div className="bg-gray-100 p-4 rounded-lg">
        <h3 className="font-semibold mb-2">Instructions d'utilisation :</h3>
        <ul className="text-sm text-gray-600 space-y-1">
          <li>
            • La modale des équipements se charge avec les données de
            l'interface ICarEquipment
          </li>
          <li>
            • La modale de tarification ne s'affiche que si tarification.length
            0
          </li>
          <li>
            • Les équipements sont organisés par catégories avec des indicateurs
            visuels
          </li>
          <li>
            • La tarification est présentée sous forme de tableau avec calcul
            automatique
          </li>
        </ul>
      </div>

      <EquipmentModal
        isOpen={showEquipmentModal}
        onClose={() => setShowEquipmentModal(false)}
        equipment={sampleEquipment}
      />

      <TarificationModal
        isOpen={showTarificationModal}
        onClose={() => setShowTarificationModal(false)}
        tarification={sampleTarification}
      />
    </div>
  );
}
