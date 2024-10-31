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
    <div className="mb-4 mt-10 flex w-full items-center gap-6">
      {/* Left empty space */}
      <div className="w-1/3" />

      {/* Centered PaginationHelper */}
      <div className="w-1/3 flex justify-center mx-auto">
        <PaginationHelper
          page={page}
          noOfPages={noOfPages}
          setPage={setPage}
          loading={loading}
        />
      </div>

      {/* Right-aligned PoweredBy */}
      <div className="w-1/3 flex justify-end">
        <PoweredBy />
      </div>
    </div>
  );
};
