import React, { createContext, useContext, useState, ReactNode } from "react";
import {
  emptyPanier,
  Panier,
  addCircuit,
  addAttraction,
  addVehicule,
  addHebergement,
  addTransfer,
  removeItemById,
  setCatalogueTrue,
  setCatalogueFalse,
  PanierCircuitInfos,
  PanierAttractionInfos,
  PanierVehiculeInfos,
  PanierHebergementInfos,
  PanierTransferInfos,
} from "../sdk/models/panier";

interface PanierContextType {
  panier: Panier;
  setPanier: React.Dispatch<React.SetStateAction<Panier>>;
  addCircuitToPanier: (c: PanierCircuitInfos) => void;
  addAttractionToPanier: (a: PanierAttractionInfos) => void;
  addVehiculeToPanier: (v: PanierVehiculeInfos) => void;
  addHebergementToPanier: (h: PanierHebergementInfos) => void;
  addTransferToPanier: (t: PanierTransferInfos) => void;
  removeItemFromPanier: (id: string) => void;
  setCatalogueTrueInPanier: () => void;
  setCatalogueFalseInPanier: () => void;
}

const PanierContext = createContext<PanierContextType | undefined>(undefined);

export const PanierProvider = ({ children }: { children: ReactNode }) => {
  const [panier, setPanier] = useState<Panier>(emptyPanier());

  const addCircuitToPanier = (c: PanierCircuitInfos) => {
    setPanier((prev) => addCircuit(prev ?? emptyPanier(), c));
  };

  const addAttractionToPanier = (a: PanierAttractionInfos) => {
    setPanier((prev) => addAttraction(prev ?? emptyPanier(), a));
  };

  const addVehiculeToPanier = (v: PanierVehiculeInfos) => {
    setPanier((prev) => addVehicule(prev ?? emptyPanier(), v));
  };

  const addHebergementToPanier = (h: PanierHebergementInfos) => {
    setPanier((prev) => addHebergement(prev ?? emptyPanier(), h));
  };

  const addTransferToPanier = (t: PanierTransferInfos) => {
    setPanier((prev) => addTransfer(prev ?? emptyPanier(), t));
  };

  const removeItemFromPanier = (id: string) => {
    setPanier((prev) => removeItemById(prev ?? emptyPanier(), id));
  };

  const setCatalogueTrueInPanier = () => {
    setPanier((prev) => setCatalogueTrue(prev ?? emptyPanier()));
  };

  const setCatalogueFalseInPanier = () => {
    setPanier((prev) => setCatalogueFalse(prev ?? emptyPanier()));
  };

  return (
    <PanierContext.Provider
      value={{
        panier,
        setPanier,
        addCircuitToPanier,
        addAttractionToPanier,
        addVehiculeToPanier,
        addHebergementToPanier,
        addTransferToPanier,
        removeItemFromPanier,
        setCatalogueTrueInPanier,
        setCatalogueFalseInPanier,
      }}
    >
      {children}
    </PanierContext.Provider>
  );
};

export const usePanier = (): PanierContextType => {
  const context = useContext(PanierContext);
  if (!context) {
    throw new Error("usePanier must be used within a PanierProvider");
  }
  return context;
};
