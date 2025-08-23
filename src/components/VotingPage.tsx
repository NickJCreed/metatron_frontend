import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { useTheme } from "@/context/ThemeProvider";
import { FaVoteYea } from 'react-icons/fa';

const SNAPSHOT_GRAPHQL_ENDPOINT = "https://hub.snapshot.org/graphql";

const GET_PROPOSALS_QUERY = `query {
  proposals(
    first: 20,
    skip: 0,
    where: { space_in: ["metatrondao.eth"] },
    orderBy: "created",
    orderDirection: desc
  ) {
    id
    title
    body
    choices
    start
    end
    snapshot
    state
    scores
    scores_by_strategy
    scores_total
    scores_updated
    author
    space { id name }
    created
  }
}`;

const GET_DAO_DETAILS_QUERY = `query {
  space(id: "metatrondao.eth") {
    id
    name
    about
    network
    symbol
    members
  }
}`;

interface Proposal {
  id: string;
  title: string;
  body: string;
  choices: string[];
  start: number;
  end: number;
  snapshot: number;
  state: string;
  scores: any;
  scores_by_strategy: any;
  scores_total: any;
  scores_updated: number;
  author: string;
  space: { id: string; name: string };
  created: number;
}

interface DaoDetails {
  id: string;
  name: string;
  about: string;
  network: string;
  symbol: string;
  members: number;
}

export const VotingPage: React.FC = () => {
  const [proposals, setProposals] = useState<Proposal[]>([]);
  const [daoDetails, setDaoDetails] = useState<DaoDetails | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const { theme } = useTheme();

  // Generic function to call the Snapshot GraphQL API
  const fetchSnapshotData = async (query: string) => {
    const res = await fetch(SNAPSHOT_GRAPHQL_ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ query }),
    });

    const json = await res.json();

    console.log("GraphQL Response:", json);

    if (json.errors) {
      throw new Error(json.errors.map((err: any) => err.message).join(", "));
    }

    return json.data;
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch DAO details
        const daoData = await fetchSnapshotData(GET_DAO_DETAILS_QUERY);
        setDaoDetails(daoData.space);

        // Fetch proposals
        const proposalsData = await fetchSnapshotData(GET_PROPOSALS_QUERY);
        setProposals(proposalsData.proposals);
      } catch (err: any) {
        console.error("Error fetching snapshot data:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Loading state
  if (loading) {
    return (
      <div className="m-0 pt-28 pb-20 font-inter text-neutral-200 max-w-full" style={{ backgroundColor: theme.colors.secondaryBg }}>
        <div className="z-20 mx-auto flex min-h-screen w-full max-w-7xl flex-col px-12">
          <div className="mb-8 mt-8 text-center">
            <h1 className="text-4xl font-bold" style={{ color: theme.colors.primaryText }}>
              Metatron DAO Governance
            </h1>
            <p className="text-xl mt-2" style={{ color: theme.colors.secondaryText }}>
              Loading governance data...
            </p>
          </div>
          
          <div className="flex justify-center items-center mt-16">
            <div className="animate-pulse flex space-x-4">
              <div className="rounded-full bg-gray-700 h-12 w-12"></div>
              <div className="flex-1 space-y-4 py-1">
                <div className="h-4 bg-gray-700 rounded w-3/4"></div>
                <div className="space-y-2">
                  <div className="h-4 bg-gray-700 rounded"></div>
                  <div className="h-4 bg-gray-700 rounded w-5/6"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="m-0 pt-28 pb-20 font-inter text-neutral-200 max-w-full" style={{ backgroundColor: theme.colors.secondaryBg }}>
        <div className="z-20 mx-auto flex min-h-screen w-full max-w-7xl flex-col px-12">
          <div className="mb-8 mt-8 text-center">
            <h1 className="text-4xl font-bold" style={{ color: theme.colors.primaryText }}>
              Metatron DAO Governance
            </h1>
          </div>
          
          <div className="text-center text-red-500 mt-10 p-6 bg-red-100 bg-opacity-10 rounded-lg mx-auto max-w-3xl">
            <h2 className="text-2xl font-bold mb-2">Error Loading Governance Data</h2>
            <p className="text-lg">{error}</p>
            <p className="mt-4 text-white">Please try again later.</p>
          </div>
        </div>
      </div>
    );
  }

  // Main render - either with proposals or empty state
  return (
    <div className="m-0 pt-28 pb-20 font-inter text-neutral-200 max-w-full" style={{ backgroundColor: theme.colors.secondaryBg }}>
      <Helmet>
        <title>Voting | MetatronDAO</title>
      </Helmet>

      <div className="z-20 mx-auto flex min-h-screen w-full max-w-7xl flex-col px-12">
        {/* DAO Details Header */}
        <div className="mb-8 mt-8 text-center">
          <h1 className="text-4xl font-bold" style={{ color: theme.colors.primaryText }}>
            {daoDetails?.name || "Metatron DAO"} Governance
          </h1>
          <h2 className="text-xl font-bold mt-2" style={{ color: theme.colors.primaryText }}>
            {daoDetails?.about || "Participate in governance decisions for the Metatron ecosystem"}
          </h2>
          {daoDetails && (
            <div className="mt-4 text-sm inline-block px-4 py-2 bg-opacity-20 bg-blue-500 rounded-lg" style={{ color: theme.colors.tertiaryText }}>
              Network: {daoDetails.network} | Symbol: {daoDetails.symbol} | Members: {daoDetails.members}
            </div>
          )}
        </div>

        {/* Proposals Header */}
        <div className="mb-8 text-center">
          <h2 className="text-3xl font-bold" style={{ color: theme.colors.primaryText }}>Proposals</h2>
          <p className="text-md mt-2" style={{ color: theme.colors.secondaryText }}>
            Vote on active proposals or review past governance decisions
          </p>
        </div>
        
        {/* Proposals or Empty State */}
        <div className="mx-auto flex flex-wrap items-start justify-center w-full px-4 md:px-8 lg:px-16">
          <div className="flex flex-col gap-6 w-full max-w-5xl">
            {proposals.length > 0 ? (
              proposals.map((proposal) => (
                <div 
                  key={proposal.id} 
                  className="rounded-lg p-6 border border-gray-700 transition-all duration-300 hover:shadow-lg hover:border-blue-500 hover:border-opacity-50" 
                  style={{ backgroundColor: 'rgba(255, 255, 255, 0.05)' }}
                >
                  <div className="flex justify-between items-start">
                    <h3 className="text-2xl font-bold mb-3" style={{ color: theme.colors.primaryText }}>{proposal.title}</h3>
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                      proposal.state === 'active' ? 'bg-green-600 bg-opacity-30 text-green-300' :
                      proposal.state === 'closed' ? 'bg-red-600 bg-opacity-30 text-red-300' :
                      'bg-gray-600 bg-opacity-30 text-gray-300'
                    }`}>
                      {proposal.state.toUpperCase()}
                    </span>
                  </div>
                  
                  <p className="mb-4" style={{ color: theme.colors.secondaryText }}>
                    {proposal.body?.substring(0, 200)}
                    {proposal.body && proposal.body.length > 200 ? '...' : ''}
                  </p>
                  
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                    <div className="flex flex-col">
                      <span className="text-sm font-semibold" style={{ color: theme.colors.tertiaryText }}>CREATED</span>
                      <span className="font-medium" style={{ color: theme.colors.primaryText }}>{new Date(proposal.created * 1000).toLocaleDateString()}</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-sm font-semibold" style={{ color: theme.colors.tertiaryText }}>END DATE</span>
                      <span className="font-medium" style={{ color: theme.colors.primaryText }}>{new Date(proposal.end * 1000).toLocaleDateString()}</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-sm font-semibold" style={{ color: theme.colors.tertiaryText }}>CHOICES</span>
                      <span className="font-medium" style={{ color: theme.colors.primaryText }}>{proposal.choices.length}</span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-sm font-semibold" style={{ color: theme.colors.tertiaryText }}>AUTHOR</span>
                      <span className="font-medium truncate" style={{ color: theme.colors.primaryText }}>
                        {proposal.author.substring(0, 6)}...{proposal.author.substring(proposal.author.length - 4)}
                      </span>
                    </div>
                  </div>
                  
                  <div className="flex justify-end">
                    <a 
                      href={`https://snapshot.page/#/${proposal.space.id}/proposal/${proposal.id}`} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="px-4 py-2 rounded-md font-medium flex items-center space-x-2"
                      style={{ 
                        backgroundColor: theme.colors.accentButtonBg, 
                        color: theme.colors.accentButtonText 
                      }}
                    >
                      <FaVoteYea />
                      <span>View Proposal</span>
                    </a>
                  </div>
                </div>
              ))
            ) : (
              // Empty state with a nice design
              <div className="flex flex-col items-center justify-center py-16 px-4 border border-gray-700 rounded-lg" style={{ backgroundColor: 'rgba(255, 255, 255, 0.03)' }}>
                <FaVoteYea size={60} className="mb-4 text-gray-500" />
                <h3 className="text-2xl font-bold mb-2" style={{ color: theme.colors.primaryText }}>No Active Proposals</h3>
                <p className="text-center max-w-lg mb-6" style={{ color: theme.colors.secondaryText }}>
                  There are currently no active governance proposals for the Metatron DAO. 
                  New proposals will appear here when they are created.
                </p>
                <a 
                  href="https://snapshot.org/#/metatrondao.eth" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="px-6 py-3 rounded-md font-medium"
                  style={{ 
                    backgroundColor: theme.colors.accentButtonBg, 
                    color: theme.colors.accentButtonText 
                  }}
                >
                  Visit Snapshot
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default VotingPage;