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
import { notification } from "antd";

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
  // const [messageApi, contextHolder] = message.useMessage();
  const [api, contextHolder] = notification.useNotification();


  const addCircuitToPanier = (c: PanierCircuitInfos) => {
    setPanier((prev) => addCircuit(prev ?? emptyPanier(), c));
    api.open({
      type: "success",
      message: "Votre panier a été modifié",
      description: "Ce circuit a été ajouté à votre panier.",
    });
  };

  const addAttractionToPanier = (a: PanierAttractionInfos) => {
    setPanier((prev) => addAttraction(prev ?? emptyPanier(), a));
    api.open({
      type: "success",
      message: "Votre panier a été modifié",
      description: "Cette attraction a été ajouté à votre panier.",
    });
  };

  const addVehiculeToPanier = (v: PanierVehiculeInfos) => {
    setPanier((prev) => addVehicule(prev ?? emptyPanier(), v));
    api.open({
      type: "success",
      message: "Votre panier a été modifié",
      description: "Cette voiture a été ajouté à votre panier.",
    });
  };

  const addHebergementToPanier = (h: PanierHebergementInfos) => {
    setPanier((prev) => addHebergement(prev ?? emptyPanier(), h));
    api.open({
      type: "success",
      message: "Votre panier a été modifié",
      description: "Cette hébergement a été ajouté à votre panier.",
    });
  };

  const addTransferToPanier = (t: PanierTransferInfos) => {
    setPanier((prev) => addTransfer(prev ?? emptyPanier(), t));
    api.open({
      type: "success",
      message: "Votre panier a été modifié",
      description: "Ce transfert a été ajouté à votre panier.",
    });
  };

  const removeItemFromPanier = (id: string) => {
    setPanier((prev) => removeItemById(prev ?? emptyPanier(), id));
  };

  const setCatalogueTrueInPanier = () => {
    setPanier((prev) => setCatalogueTrue(prev ?? emptyPanier()));
    api.open({
      type: "success",
      message: "Votre panier a été modifié",
      description: "Le catalogue des restaurants a été ajouté à votre panier.",
    });
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
      {contextHolder}
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
