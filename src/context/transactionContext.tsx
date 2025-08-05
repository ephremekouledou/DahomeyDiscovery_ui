import React, { createContext, useContext, useState, ReactNode } from "react";

export interface Transaction {
    id: string;
    amount: number;
    title: string;
}

interface TransactionContextType {
  transaction: Transaction | null;
  setTransaction: React.Dispatch<React.SetStateAction<Transaction | null>>;
}

const TransactionContext = createContext<TransactionContextType | undefined>(
  undefined
);

export const TransactionProvider = ({ children }: { children: ReactNode }) => {
  const [transaction, setTransaction] = useState<Transaction | null>(null);

  return (
    <TransactionContext.Provider value={{ transaction, setTransaction }}>
      {children}
    </TransactionContext.Provider>
  );
};

export const useTransaction = (): TransactionContextType => {
  const context = useContext(TransactionContext);
  if (!context) {
    throw new Error("useTransaction must be used within an TransactionProvider");
  }
  return context;
};
