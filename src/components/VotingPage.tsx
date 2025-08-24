import React, { useState } from "react";
import { useTheme } from "../context/ThemeProvider";
import { FaVoteYea } from 'react-icons/fa';

const VotingPage: React.FC = () => {
  const { theme } = useTheme();
  const [selectedProposal, setSelectedProposal] = useState<string>('');

  // Mock proposals data
  const mockProposals = [
    {
      id: '1',
      title: 'Proposal: Expand metatron Ecosystem',
      description: 'Vote on expanding the metatron platform to include more startup categories and investor types.',
      choices: ['Yes', 'No', 'Abstain'],
      endDate: '2024-02-15',
      votes: 156
    },
    {
      id: '2',
      title: 'Proposal: New Funding Round Structure',
      description: 'Implement a new funding round structure to better serve early-stage startups.',
      choices: ['Approve', 'Reject', 'Modify'],
      endDate: '2024-02-20',
      votes: 89
    },
    {
      id: '3',
      title: 'Proposal: Community Governance Update',
      description: 'Update community governance rules to improve decision-making processes.',
      choices: ['Accept', 'Decline', 'Further Discussion'],
      endDate: '2024-02-25',
      votes: 203
    }
  ];

  const handleVote = (proposalId: string, choice: string) => {
    console.log(`Voted ${choice} on proposal ${proposalId}`);
    setSelectedProposal(proposalId);
  };

  return (
    <div className="min-h-screen transition-colors duration-300" style={{ backgroundColor: theme.colors.secondaryBg }}>
      <div className="z-20 mx-auto flex min-h-screen w-full flex-col px-4 pt-24 pb-8">
        {/* Header */}
        <div className="mb-12 text-center">
          <h1 className="text-5xl font-bold mb-4 transition-colors duration-300" style={{ color: theme.colors.primaryText }}>
            🗳️ metatron Voting
          </h1>
          <p className="text-xl max-w-2xl mx-auto transition-colors duration-300" style={{ color: theme.colors.secondaryText }}>
            Participate in governance decisions for the metatron ecosystem
          </p>
        </div>

        {/* Proposals Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {mockProposals.map((proposal) => (
            <div
              key={proposal.id}
              className="rounded-lg shadow-lg overflow-hidden transition-transform duration-300 hover:scale-105"
              style={{ backgroundColor: theme.colors.modalBg }}
            >
              <div className="p-6">
                <div className="flex items-center mb-4">
                  <FaVoteYea className="text-2xl mr-3" style={{ color: theme.colors.accentButtonBg }} />
                  <h3 className="text-xl font-semibold" style={{ color: theme.colors.primaryText }}>
                    {proposal.title}
                  </h3>
                </div>
                
                <p className="text-sm mb-4" style={{ color: theme.colors.secondaryText }}>
                  {proposal.description}
                </p>
                
                <div className="mb-4">
                  <p className="text-xs mb-2" style={{ color: theme.colors.tertiaryText }}>
                    Voting Options:
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {proposal.choices.map((choice) => (
                      <button
                        key={choice}
                        onClick={() => handleVote(proposal.id, choice)}
                        className="px-3 py-1 rounded-full text-xs font-medium transition-colors duration-300"
                        style={{
                          backgroundColor: selectedProposal === proposal.id ? theme.colors.accentButtonBg : theme.colors.secondaryButtonBg,
                          color: selectedProposal === proposal.id ? theme.colors.accentButtonText : theme.colors.secondaryText
                        }}
                      >
                        {choice}
                      </button>
                    ))}
                  </div>
                </div>
                
                <div className="flex justify-between items-center text-xs" style={{ color: theme.colors.tertiaryText }}>
                  <span>Ends: {proposal.endDate}</span>
                  <span>{proposal.votes} votes</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Voting Info */}
        <div className="mt-12 text-center">
          <div className="max-w-2xl mx-auto p-6 rounded-lg" style={{ backgroundColor: theme.colors.modalBg }}>
            <h2 className="text-2xl font-bold mb-4" style={{ color: theme.colors.primaryText }}>
              How Voting Works
            </h2>
            <p className="text-sm mb-4" style={{ color: theme.colors.secondaryText }}>
              Each proposal allows you to vote on important decisions for the metatron ecosystem. 
              Your vote helps shape the future of the platform.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
              <div>
                <h3 className="font-semibold mb-2" style={{ color: theme.colors.primaryText }}>Active Proposals</h3>
                <p style={{ color: theme.colors.secondaryText }}>Currently {mockProposals.length} proposals open for voting</p>
              </div>
              <div>
                <h3 className="font-semibold mb-2" style={{ color: theme.colors.primaryText }}>Total Votes</h3>
                <p style={{ color: theme.colors.secondaryText }}>{mockProposals.reduce((sum, p) => sum + p.votes, 0)} votes cast</p>
              </div>
              <div>
                <h3 className="font-semibold mb-2" style={{ color: theme.colors.primaryText }}>Your Participation</h3>
                <p style={{ color: theme.colors.secondaryText }}>Vote on proposals to earn governance tokens</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VotingPage;