import { useTheme } from "@/context/ThemeProvider";
import { startupContract } from "@/consts/parameters";
import { truncateAddress } from "@/utils/truncateAddress";
import type { FC } from "react";

export const PoweredBy: FC = () => {
  const { theme } = useTheme();
  return (
    <a
      href={`https://thirdweb.com/${startupContract.chain.id}/${startupContract.address}`}
      target="_blank"
      rel="noreferrer"
      className="mr-4 flex max-w-[163px] cursor-pointer items-center justify-center gap-3 rounded-lg bg-white/5 px-4 py-2 shadow-2xl md:ml-auto"
    >
      <img
        className="h-4 w-6 object-contain"
        src="/thirdweb.svg"
        alt="thirdweb"
      />
      <div className="flex flex-col">
        <p 
          className="text-xs font-semibold"
          style={{color: theme.colors.primaryText}}
          >
          {truncateAddress(startupContract.address)}
        </p>
        <p 
          className="text-[8px] font-bold"
          style={{color: theme.colors.primaryText}}
          >
          powered by thirdweb
        </p>
      </div>
    </a>
  );
};
