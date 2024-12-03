import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ProposalCard from '@/components/voting/ProposalCard';
import { fetchGraphQL } from '@/utils/graphql';
import { snapshotParams } from '@/consts/parameters';
import { useAuth } from "@/context/AuthProvider";

interface Proposal {
  id: string;
  title: string;
  body: string;
  choices: string[];
  start: number;
  end: number;
  snapshot: string;
  state: string;
  author: string;
  space: {
    id: string;
    name: string;
  };
}

const VotingPage: React.FC = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [proposals, setProposals] = useState<Proposal[]>([]);
  const navigate = useNavigate();
  const { isAuthorized } = useAuth();

  useEffect(() => {
    if (!isAuthorized) {
      return;
    }

    const getProposals = async () => {
      const query = `
        query Proposals {
          proposals(
            first: 20,
            skip: 0,
            where: {
              space_in: ["${snapshotParams.space}"],
              state_not: "closed"
            },
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
            author
            space {
              id
              name
            }
          }
        }
      `;

      try {
        const data = await fetchGraphQL<{ proposals: Proposal[] }>(query);
        setProposals(data.proposals);
      } catch (error) {
        console.error("Error fetching proposals:", error);
      } finally {
        setIsLoading(false);
      }
    };

    getProposals();
  }, [isAuthorized]);

  if (!isAuthorized) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-lg text-gray-500">
          Only members can conduct voting on the Metatron DAO platform. Please register to become a member.
        </p>
      </div>
    );
  }

  const handleProposalClick = (id: string) => {
    navigate(`/proposal/${id}`);
  };

  return (
    <div className="w-full p-6">
      <h2 className="text-2xl font-bold mb-4">DAO Voting Dashboard</h2>
      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <p className="text-lg text-gray-500">Loading proposals...</p>
        </div>
      ) : proposals.length === 0 ? (
        <div className="flex flex-col justify-center items-center h-64 text-center">
          <h3 className="text-3xl font-bold mb-4">No Proposals Available</h3>
          <p className="text-lg mb-4">
            There are currently no proposals to vote on.
          </p>
          <p className="text-lg mb-4">
            Sign up to be notified when new proposals are created!
          </p>
          <button className="mt-4 px-4 py-2 bg-blue-500 text-white rounded">
            Sign Up for Notifications
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {proposals.map((proposal) => (
            <ProposalCard key={proposal.id} proposal={proposal} onClick={handleProposalClick} />
          ))}
        </div>
      )}
    </div>
  );
};

export default VotingPage;
