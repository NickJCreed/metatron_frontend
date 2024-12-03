import React from 'react';

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

interface ProposalCardProps {
  proposal: Proposal;
  onClick: (id: string) => void;
}

const ProposalCard: React.FC<ProposalCardProps> = ({ proposal, onClick }) => {
  return (
    <div onClick={() => onClick(proposal.id)} className="proposal-card">
      <h3>{proposal.title}</h3>
      <p>{proposal.body}</p>
      {/* Add more proposal details as needed */}
    </div>
  );
};

export default ProposalCard;
