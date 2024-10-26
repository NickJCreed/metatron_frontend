import React, { createContext, useState, useContext, useEffect, ReactNode } from "react";
import { useActiveAccount } from "thirdweb/react";
import { balanceOf } from "thirdweb/extensions/erc721";
import { accessContract } from "@/consts/parameters";
import { minimumBalance } from "@/consts/yourDetails";

// Define context and types
interface AuthContextType {
  isAuthorized: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isAuthorized, setIsAuthorized] = useState(false);
  const activeAccount = useActiveAccount();

  useEffect(() => {
    const checkUserBalance = async () => {
      if (!activeAccount?.address) return;

      try {
        const result = await balanceOf({
          contract: accessContract,
          owner: activeAccount.address,
        });
        setIsAuthorized(result >= minimumBalance);
      } catch {
        setIsAuthorized(false);
      }
    };

    if (activeAccount) {
      checkUserBalance();
    }
  }, [activeAccount]);

  return (
    <AuthContext.Provider value={{ isAuthorized }}>
      {children}
    </AuthContext.Provider>
  );
};
