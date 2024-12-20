import React, { useEffect, useState } from 'react';
import { db } from "@/firebase";
import { collection, addDoc, getDocs, query, where } from "firebase/firestore";
import { useAuth } from '@/context/AuthProvider';

interface Proposal {
  id: string;
  title: string;
  description: string;
  options: string[];
  votes: { [option: string]: number };
}

const VotingPage: React.FC = () => {
  const { isAuthorized } = useAuth();
  const [proposals, setProposals] = useState<Proposal[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchProposals = async () => {
      try {
        const q = query(collection(db, "proposals"));
        const querySnapshot = await getDocs(q);
        const proposalsData: Proposal[] = [];
        querySnapshot.forEach((doc) => {
          proposalsData.push({ id: doc.id, ...doc.data() } as Proposal);
        });
        setProposals(proposalsData);
      } catch (error) {
        console.error("Error fetching proposals:", error);
      } finally {
        setLoading(false);
      }
    };

    if (isAuthorized) {
      fetchProposals();
    }
  }, [isAuthorized]);

  if (!isAuthorized) {
    return <div>Please log in to participate in voting.</div>;
  }

  if (loading) {
    return <div>Loading voting options...</div>;
  }

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Voting Page</h2>
      {proposals.map((proposal) => (
        <div key={proposal.id} className="mb-6 p-4 border rounded-lg">
          <h3 className="text-xl font-semibold">{proposal.title}</h3>
          <p className="mt-2">{proposal.description}</p>
          <div className="mt-4">
            {proposal.options.map((option) => (
              <div key={option} className="flex items-center mb-2">
                <input type="radio" name={`proposal-${proposal.id}`} value={option} className="mr-2" />
                <span>{option}</span>
              </div>
            ))}
          </div>
          <button className="mt-2 px-4 py-2 bg-blue-500 text-white rounded">Vote</button>
        </div>
      ))}
    </div>
  );
};

export default VotingPage;
