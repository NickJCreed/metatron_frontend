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
import ProfilePage from "@/pages/ProfilePage";
import Login from "@/components/Login";
import ProtectedRoute from "@/components/ProtectedRoute";
import LandingPage from "@/components/LandingPage";

const App: React.FC = () => {
  const { page, setPage, totalCount, setTotalCount, itemsPerPage } = usePagination();

  return (
    <HelmetProvider>
      <ContractProvider>
        <AuthProvider>
          <ThemeProvider>
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/login" element={<Login />} />
              <Route
                path="/dashboard"
                element={
                  <ProtectedRoute>
                    <Layout>
                      <Gallery
                        contract={startupContract}
                        page={page}
                        setPage={setPage}
                        nftsPerPage={itemsPerPage}
                        setTotalCount={setTotalCount}
                        type="startup"
                      />
                    </Layout>
                  </ProtectedRoute>
                }
              />
              <Route
                path="/investors"
                element={
                  <ProtectedRoute>
                    <Layout>
                      <Gallery
                        contract={investorContract}
                        page={page}
                        setPage={setPage}
                        nftsPerPage={itemsPerPage}
                        setTotalCount={setTotalCount}
                        type="investor"
                      />
                    </Layout>
                  </ProtectedRoute>
                }
              />
              <Route
                path="/deal-makers"
                element={
                  <ProtectedRoute>
                    <Layout>
                      <ConnectorsPage />
                    </Layout>
                  </ProtectedRoute>
                }
              />
              <Route 
                path="/nft/:id" 
                element={
                  <ProtectedRoute>
                    <Layout>
                      <NFTPage />
                    </Layout>
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/investor/:id" 
                element={
                  <ProtectedRoute>
                    <Layout>
                      <InvestorProfilePage />
                    </Layout>
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/vote" 
                element={
                  <ProtectedRoute>
                    <Layout>
                      <VotingPage />
                    </Layout>
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/proposal/:id" 
                element={
                  <ProtectedRoute>
                    <Layout>
                      <ProposalPage />
                    </Layout>
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/profile" 
                element={
                  <ProtectedRoute>
                    <Layout>
                      <ProfilePage />
                    </Layout>
                  </ProtectedRoute>
                } 
              />
            </Routes>
          </ThemeProvider>
        </AuthProvider>
      </ContractProvider>
    </HelmetProvider>
  );
};

export default App;
