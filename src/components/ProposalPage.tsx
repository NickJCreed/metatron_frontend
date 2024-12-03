import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchGraphQL } from '@/utils/graphql';

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

const ProposalPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [proposal, setProposal] = useState<Proposal | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const getProposal = async () => {
      const query = `
        query Proposal($id: ID!) {
          proposal(id: $id) {
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
        const data = await fetchGraphQL<{ proposal: Proposal }>(query, { id });
        setProposal(data.proposal);
      } catch (error) {
        console.error("Error fetching proposal:", error);
      } finally {
        setIsLoading(false);
      }
    };

    getProposal();
  }, [id]);

  if (isLoading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  if (!proposal) {
    return <div className="text-center mt-10">Proposal not found.</div>;
  }

  return (
    <div className="w-full p-6">
      <h2 className="text-3xl font-bold mb-4">{proposal.title}</h2>
      <p className="mb-4">{proposal.body}</p>
      <div className="mb-4">
        <strong>Choices:</strong>
        <ul className="list-disc list-inside">
          {proposal.choices.map((choice, index) => (
            <li key={index}>{choice}</li>
          ))}
        </ul>
      </div>
      {/* Voting functionality can be added here */}
    </div>
  );
};

export default ProposalPage;
