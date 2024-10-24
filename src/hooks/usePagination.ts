import { useState } from "react";

export const usePagination = (initialPage = 1, itemsPerPage = 10) => {
  const [page, setPage] = useState(initialPage);
  const [totalCount, setTotalCount] = useState(0);

  return { page, setPage, totalCount, setTotalCount, itemsPerPage };
};
