import React, { createContext, useContext, useState, ReactNode } from "react";

interface AnimationContextType {
  hasRun: boolean;
  setHasRun: React.Dispatch<React.SetStateAction<boolean>>;
}

const AnimationContext = createContext<AnimationContextType | undefined>(
  undefined
);

export const AnimationProvider = ({ children }: { children: ReactNode }) => {
  const [hasRun, setHasRun] = useState(false);

  return (
    <AnimationContext.Provider value={{ hasRun, setHasRun }}>
      {children}
    </AnimationContext.Provider>
  );
};

export const useAnimation = (): AnimationContextType => {
  const context = useContext(AnimationContext);
  if (!context) {
    throw new Error("useAnimation must be used within an AnimationProvider");
  }
  return context;
};
