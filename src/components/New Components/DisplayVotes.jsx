import React from 'react';
import { v4 as uuidv4 } from 'uuid';
import VoteCard from './VoteCard';
import { loader } from '../assets';

const DisplayVotes = ({ isLoading, votes }) => {
  return (
    <div className="w-full mt-10">
      {isLoading && (
        <div className="flex justify-center items-center">
          <img src={loader} alt="loader" className="w-[100px] h-[100px] object-contain" />
        </div>
      )}

      {!isLoading && votes.length === 0 && (
        <p className="font-epilogue font-semibold text-[14px] leading-[30px] text-[#818183]">
          No votes available.
        </p>
      )}

      {!isLoading && votes.length > 0 && (
        <div className="flex flex-col gap-4">
          {votes.map((vote) => (
            <VoteCard key={uuidv4()} {...vote} />
          ))}
        </div>
      )}
    </div>
  );
};

export default DisplayVotes;