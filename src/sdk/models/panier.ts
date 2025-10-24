export interface PanierAttractionInfos {
  _id: string;
  attraction_id: string;
  option_id: string;
  price: number;
  date: Date; // ISO string (équivalent à time.Time)
  time: string;
  participants: number;
}

export interface PanierAttractionInfosPresenter {
  _id: string;
  attraction: string;
  option: string;
  price: number;
  image: string;
  date: Date;
  time: string;
  participants: number;
}

export interface PanierVehiculeInfos {
  _id: string;
  vehicule_id: string;
  price: number;
  chauffeur: boolean;
  date: Date;
  jour: number;
}

export interface PanierVehiculeInfosPresenter {
  _id: string;
  vehicule: string;
  price: number;
  image: string;
  chauffeur: boolean;
  date: Date;
  jour: number;
}

export interface PanierHebergementInfos {
  _id: string;
  hebergement_id: string;
  option_id: string;
  price: number;
  date: Date;
  jour: number;
}

export interface PanierHebergementInfosPresenter {
  _id: string;
  hebergement: string;
  option: string;
  price: number;
  image: string;
  date: Date;
  jour: number;
}

export interface PanierCircuitInfos {
  _id: string;
  circuit_type: string;
  circuit_id: string;
  price: number;
  date: Date;
  participants: number;
  chauffeur: boolean;
  villes: string[];
}

export interface PanierCircuitInfosPresenter {
  _id: string;
  circuit_type: string;
  circuit: string;
  price: number;
  image: string;
  date: Date;
  participants: number;
  chauffeur: boolean;
  villes: string[];
}

export interface PanierTransferInfos {
  _id: string;
  transfer_type: string;
  destination: string;
  passagers: number;
  type_vehicule: string;
  price: number;
  date: Date;
  time: string;
  numero_vol: string;
  numero_tel: string;
}

export interface AddUpdatePanier {
  customer_id: string;
  attractions: PanierAttractionInfos[];
  vehicules: PanierVehiculeInfos[];
  hebergements: PanierHebergementInfos[];
  circuits: PanierCircuitInfos[];
  transfers: PanierTransferInfos[];
  catalogue: boolean;
  actuel: boolean;
}

export interface Panier extends AddUpdatePanier {
  _id: string;
}



export interface PanierPresenter {
  _id: string;
  customer_id: string;
  attractions: PanierAttractionInfosPresenter[];
  vehicules: PanierVehiculeInfosPresenter[];
  hebergements: PanierHebergementInfosPresenter[];
  circuits: PanierCircuitInfosPresenter[];
  transfers: PanierTransferInfos[];
  catalogue: boolean;
}

// Utility functions to work with Panier objects (immutable)

/**
 * Ajoute une attraction au panier et retourne un nouveau Panier
 */
export function addAttraction(p: Panier, item: PanierAttractionInfos): Panier {
  return { ...p, attractions: [...(p.attractions || []), item] };
}

/**
 * Ajoute un véhicule au panier et retourne un nouveau Panier
 */
export function addVehicule(p: Panier, item: PanierVehiculeInfos): Panier {
  return { ...p, vehicules: [...(p.vehicules || []), item] };
}

/**
 * Ajoute un hébergement au panier et retourne un nouveau Panier
 */
export function addHebergement(p: Panier, item: PanierHebergementInfos): Panier {
  return { ...p, hebergements: [...(p.hebergements || []), item] };
}

/**
 * Ajoute un circuit au panier et retourne un nouveau Panier
 */
export function addCircuit(p: Panier, item: PanierCircuitInfos): Panier {
  return { ...p, circuits: [...(p.circuits || []), item] };
}

/**
 * Ajoute un transfert au panier et retourne un nouveau Panier
 */
export function addTransfer(p: Panier, item: PanierTransferInfos): Panier {
  return { ...p, transfers: [...(p.transfers || []), item] };
}

/**
 * Supprime un élément (quel que soit le tableau) identifié par son _id.
 * Retourne un nouveau Panier. Si l'id n'est pas trouvé, le panier est retourné inchangé.
 */
export function removeItemById(p: Panier, id: string): Panier {
  const attractions = (p.attractions || []).filter((a) => a._id !== id);
  const vehicules = (p.vehicules || []).filter((v) => v._id !== id);
  const hebergements = (p.hebergements || []).filter((h) => h._id !== id);
  const circuits = (p.circuits || []).filter((c) => c._id !== id);
  const transfers = (p.transfers || []).filter((t) => t._id !== id);

  // If nothing changed, return original reference
  if (
    attractions.length === (p.attractions || []).length &&
    vehicules.length === (p.vehicules || []).length &&
    hebergements.length === (p.hebergements || []).length &&
    circuits.length === (p.circuits || []).length &&
    transfers.length === (p.transfers || []).length
  ) {
    return p;
  }

  return { ...p, attractions, vehicules, hebergements, circuits, transfers };
}

/**
 * Met le champ catalogue à true et retourne un nouveau Panier
 */
export function setCatalogueTrue(p: Panier): Panier {
  return { ...p, catalogue: true };
}

/**
 * Met le champ catalogue à false et retourne un nouveau Panier
 */
export function setCatalogueFalse(p: Panier): Panier {
  return { ...p, catalogue: false };
}

/**
 * Retourne un Panier vide (valeurs par défaut)
 */
export function emptyPanier(): Panier {
  return {
    _id: "",
    customer_id: "",
    attractions: [],
    vehicules: [],
    hebergements: [],
    circuits: [],
    transfers: [],
    catalogue: false,
    actuel: false,
  };
}

export function emptyPanierPresenter(): PanierPresenter {
  return {
    _id: "",
    customer_id: "",
    attractions: [],
    vehicules: [],
    hebergements: [],
    circuits: [],
    transfers: [],
    catalogue: false,
  };
}
