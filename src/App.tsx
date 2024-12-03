import React from "react";
import { Routes, Route } from "react-router-dom";
import { ContractProvider } from "@/context/ContractProvider";
import { AuthProvider } from "@/context/AuthProvider";
import { HelmetProvider } from "react-helmet-async";
import { Layout } from "@/components/Layout";
import Gallery from "@/components/Gallery";
import NFTPage from "@/pages/nft/$id";
import InvestorProfilePage from "@/pages/investor/$id";
import VotingPage from "@/components/VotingPage";
import ProposalPage from "@/components/ProposalPage";
import { usePagination } from "@/hooks/usePagination";
import { startupContract, investorContract, connectorContract } from "@/consts/parameters";
import { ThemeProvider } from "./context/ThemeProvider";
import ConnectorsPage from "@/components/ConnectorsPage";

const App: React.FC = () => {
  const { page, setPage, totalCount, setTotalCount, itemsPerPage } = usePagination();

  return (
    <HelmetProvider>
      <ContractProvider>
        <AuthProvider>
          <ThemeProvider>
            <Layout>
              <Routes>
                <Route
                  path="/"
                  element={
                    <Gallery
                      contract={startupContract}
                      page={page}
                      setPage={setPage}
                      nftsPerPage={itemsPerPage}
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
                      nftsPerPage={itemsPerPage}
                      setTotalCount={setTotalCount}
                      type="investor"
                    />
                  }
                />
                <Route
                  path="/connectors"
                  element={
                    // <Gallery
                    //   contract={connectorContract}
                    //   page={page}
                    //   setPage={setPage}
                    //   nftsPerPage={itemsPerPage}
                    //   setTotalCount={setTotalCount}
                    //   type="connector"
                    // />
                    <ConnectorsPage />
                  }
                />
                <Route path="/nft/:id" element={<NFTPage />} />
                <Route path="/investor/:id" element={<InvestorProfilePage />} />
                <Route path="/vote" element={<VotingPage />} />
                <Route path="/proposal/:id" element={<ProposalPage />} />
              </Routes>
            </Layout>
          </ThemeProvider>
        </AuthProvider>
      </ContractProvider>
    </HelmetProvider>
  );
};

export default App;
