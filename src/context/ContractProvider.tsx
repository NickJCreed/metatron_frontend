import React, { createContext, useState, useContext, ReactNode } from "react";
import { startupContract } from "@/consts/parameters";

// Define context and types
interface ContractContextType {
  contract: any;
  setContract: (contract: any) => void;
}

const ContractContext = createContext<ContractContextType | undefined>(undefined);

// Custom hook to use context
export const useContract = () => {
  const context = useContext(ContractContext);
  if (!context) {
    throw new Error("useContract must be used within a ContractProvider");
  }
  return context;
};

export const ContractProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [contract, setContract] = useState(startupContract);

  return (
    <ContractContext.Provider value={{ contract, setContract }}>
      {children}
    </ContractContext.Provider>
  );
};
