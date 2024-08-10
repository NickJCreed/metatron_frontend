import React from 'react';

const VoteCard = ({ title, description, image, handleClick }) => {
  return (
    <div className="w-full bg-[#1c1c24] p-4 rounded-[10px] cursor-pointer" onClick={handleClick}>
      <div className="flex items-center gap-4">
        <img src={image} alt="vote" className="w-[50px] h-[50px] object-cover rounded-full" />
        <div>
          <h3 className="font-epilogue font-semibold text-[16px] text-white">{title}</h3>
          <p className="font-epilogue font-normal text-[14px] text-[#808191]">{description}</p>
        </div>
      </div>
    </div>
  );
};

export default VoteCard;