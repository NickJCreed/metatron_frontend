import React from 'react';

interface DisplayVotesProps {
  isLoading: boolean;
  votes: any[]; // Adjust the type as necessary
  children: React.ReactNode;
}

const DisplayVotes: React.FC<DisplayVotesProps> = ({ isLoading, votes, children }) => {
  return (
    <div className="w-full mt-10">
      {isLoading && (
        <div className="flex justify-center items-center">
          <img src="/path/to/loader.gif" alt="loader" className="w-[100px] h-[100px] object-contain" />
        </div>
      )}

      {!isLoading && votes.length === 0 && (
        <p className="font-epilogue font-semibold text-[14px] leading-[30px] text-[#818183]">
          No votes available.
        </p>
      )}

      {!isLoading && votes.length > 0 && (
        <div className="flex flex-col gap-4">
          {children}
        </div>
      )}
    </div>
  );
};

export default DisplayVotes;