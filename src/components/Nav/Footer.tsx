import type { FC } from "react";
import { PaginationHelper } from "../PaginationHelper";
import { PoweredBy } from "../PoweredBy";

interface IProps {
  page: number;
  setPage: (page: number) => void;
  nftsPerPage: number;
  totalCount: number | undefined;
  loading: boolean;
}

export const Footer: FC<IProps> = ({
  page,
  setPage,
  nftsPerPage,
  totalCount,
  loading,
}) => {
  if (!totalCount) return null;
  const noOfPages = Math.ceil(totalCount / nftsPerPage);
  
  const start = (page - 1) * nftsPerPage;
  const end = Math.min(start + nftsPerPage, totalCount);

  return (
    <div className="mb-4 mt-10 flex w-full flex-col items-center gap-6 sm:flex-row">
      {/* Left empty space (hidden on mobile) */}
      <div className="hidden w-1/3 sm:block" />

      {/* Centered PaginationHelper */}
      <div className="w-full sm:w-1/3 flex justify-center">
        <PaginationHelper
          page={page}
          noOfPages={noOfPages}
          setPage={setPage}
          loading={loading}
        />
      </div>

      {/* Right-aligned PoweredBy, moves below on smaller screens */}
      <div className="w-full flex justify-center sm:w-1/3 sm:justify-end">
        <PoweredBy />
      </div>
    </div>
  );
};
