import React, { useState, useEffect, createContext, useContext } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Sidebar from "@/components/Nav/Sidebar"; // Adjust the import path as necessary
import Gallery from "@/components/Gallery"; // Adjust the import path as necessary
import NFTPage from "@/pages/nft/$id"; // Adjust the import path as necessary
import { Header } from "@/components/Nav/Header"; // Adjust the import path as necessary
import { useActiveAccount } from "thirdweb/react";
import { balanceOf } from "thirdweb/extensions/erc721";
import { accessContract, startupContract, investorContract, connectorContract } from "@/consts/parameters"; // Adjust the import path as necessary
import { minimumBalance } from "@/consts/yourDetails"; // Adjust the import path as necessary

const ContractContext = createContext({ contract: startupContract, setContract: (contract: any) => {} });
const AuthContext = createContext({ isAuthorized: false });

const Layout: React.FC = ({ children }) => {
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

const App = () => {
  const [contract, setContract] = useState(startupContract);
  const [isAuthorized, setIsAuthorized] = useState(false);
  const activeAccount = useActiveAccount();
  const [page, setPage] = useState(1);
  const [totalCount, setTotalCount] = useState<number>(0); // Initialize totalCount
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
        <Router>
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
                    setTotalCount={setTotalCount} // Pass setTotalCount
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
                    setTotalCount={setTotalCount} // Pass setTotalCount
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
                    setTotalCount={setTotalCount} // Pass setTotalCount
                  />
                }
              />
              <Route path="/nft/:id" element={<NFTPage />} />
            </Routes>
          </Layout>
        </Router>
      </AuthContext.Provider>
    </ContractContext.Provider>
  );
};

export const useContract = () => useContext(ContractContext);
export const useAuth = () => useContext(AuthContext);
export default App;
