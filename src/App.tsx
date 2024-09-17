import React, { useState, useEffect, createContext, useContext } from "react";
import { Routes, Route } from "react-router-dom";
import Sidebar from "@/components/Nav/Sidebar";
import Gallery from "@/components/Gallery";
import NFTPage from "@/pages/nft/$id";
import InvestorProfilePage from "@/pages/investor/$id";
import { Header } from "@/components/Nav/Header";
import { useActiveAccount } from "thirdweb/react";
import { balanceOf } from "thirdweb/extensions/erc721";
import { accessContract, startupContract, investorContract, connectorContract } from "@/consts/parameters";
import { minimumBalance } from "@/consts/yourDetails";

const ContractContext = createContext({ contract: startupContract, setContract: (contract: any) => {} });
const AuthContext = createContext({ isAuthorized: false });

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen bg-darkBg text-white">
      <Header />
      <div className="flex flex-1">
        <Sidebar />
        <main className="flex flex-col flex-1 p-4 bg-darkBg">{children}</main>
      </div>
    </div>
  );
};

const App: React.FC = () => {
  const [contract, setContract] = useState(startupContract);
  const [isAuthorized, setIsAuthorized] = useState(false);
  const activeAccount = useActiveAccount();
  const [page, setPage] = useState(1);
  const [totalCount, setTotalCount] = useState<number>(0);
  const nftsPerPage = 10;

  const checkUserBalance = async () => {
    if (!activeAccount || !activeAccount.address) {
      console.error("Active account or address is not available");
      return;
    }

    try {
      const result = await balanceOf({
        contract: accessContract,
        owner: activeAccount.address,
      });

      const hasBalance = result >= minimumBalance;
      setIsAuthorized(hasBalance);
    } catch (error) {
      console.error("Error checking balance:", error);
      setIsAuthorized(false);
    }
  };

  useEffect(() => {
    if (activeAccount) {
      checkUserBalance();
    }
  }, [activeAccount]);

  return (
    <ContractContext.Provider value={{ contract, setContract }}>
      <AuthContext.Provider value={{ isAuthorized }}>
        <Layout>
          <Routes>
            <Route
              path="/"
              element={
                <Gallery
                  contract={startupContract}
                  page={page}
                  setPage={setPage}
                  nftsPerPage={nftsPerPage}
                  setTotalCount={setTotalCount}
                  type="startup"
                />
              }
            />
            <Route
              path="/investors"
              element={
                <Gallery
                  contract={investorContract}
                  page={page}
                  setPage={setPage}
                  nftsPerPage={nftsPerPage}
                  setTotalCount={setTotalCount}
                  type="investor"
                />
              }
            />
            <Route
              path="/connectors"
              element={
                <Gallery
                  contract={connectorContract}
                  page={page}
                  setPage={setPage}
                  nftsPerPage={nftsPerPage}
                  setTotalCount={setTotalCount}
                  type="connector"
                />
              }
            />
            <Route path="/nft/:id" element={<NFTPage />} />
            <Route path="/investor/:id" element={<InvestorProfilePage />} />
          </Routes>
        </Layout>
      </AuthContext.Provider>
    </ContractContext.Provider>
  );
};

export const useContract = () => useContext(ContractContext);
export const useAuth = () => useContext(AuthContext);
export default App;