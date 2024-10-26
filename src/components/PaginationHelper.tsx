import useDebounce from "@/hooks/useDebounce";
import { useTheme } from "@/context/ThemeProvider";
import { FC, useEffect, useState } from "react";

interface IProps {
  page: number;
  setPage: (page: number) => void;
  noOfPages: number;
  loading: boolean;
}

const PaginationHelper: FC<IProps> = ({
  page,
  setPage,
  noOfPages,
  loading,
}) => {
  const [isSearching, setIsSearching] = useState(false);
  const [pageInput, setPageInput] = useState<number>(page);
  const debouncedSearchTerm = useDebounce(String(pageInput), 500);
  const { theme } = useTheme();

  useEffect(() => {
    if (debouncedSearchTerm) {
      setIsSearching(true);
      const newPage = Number(debouncedSearchTerm);
      if (newPage > 0 && newPage <= noOfPages) {
        setPage(newPage);
      } else {
        setPage(1);
      }
      setIsSearching(false);
    }
  }, [debouncedSearchTerm, setPage, noOfPages]);

  useEffect(() => {
    setPageInput(page);
  }, [page]);

  return (
    <div className="flex items-center gap-2 md:ml-auto">
      {isSearching || loading ? (
        <div 
          className="h-6 w-6 animate-spin rounded-full border-b-2"
          style={{ 
            backgroundColor: theme.colors.secondaryBg,
            color: theme.colors.primaryText,
            borderColor: theme.colors.borderColor
          }}
          >
        </div>
      ) : (
        <>
          <button
            className="rounded-lg px-4 py-2 shadow-2xl disabled:opacity-50"
            style={{
              backgroundColor: theme.colors.secondaryBg,
              color: theme.colors.primaryText,
              borderColor: theme.colors.borderColor,
            }}
            onClick={() => setPage(page - 1)}
            disabled={page === 1}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke={theme.colors.primaryText}
              className="h-6 w-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 19.5L8.25 12l7.5-7.5"
              />
            </svg>
          </button>
          <input
            type="number"
            className="w-16 rounded-lg p-2 shadow-2xl focus:border-0 focus:outline-none focus:ring-0 active:border-0 active:outline-none active:ring-0"
            style={{
              backgroundColor: theme.colors.secondaryBg,
              color: theme.colors.primaryText,
              borderColor: theme.colors.borderColor,
            }}
            onChange={(e) => setPageInput(Number(e.target.value))}
            value={pageInput}
            min={1}
            max={noOfPages}
          />
          <button
            className="rounded-lg px-4 py-2 shadow-2xl"
            style={{ 
              backgroundColor: theme.colors.secondaryBg,
              color: theme.colors.primaryText,
              borderColor: theme.colors.borderColor
            }}
            onClick={() => setPage(page + 1)}
            disabled={page === noOfPages}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke={theme.colors.primaryText}
              className="h-6 w-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M8.25 4.5l7.5 7.5-7.5 7.5"
              />
            </svg>
          </button>
        </>
      )}
    </div>
  );
};

export { PaginationHelper };
