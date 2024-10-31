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
  const { theme } = useTheme();
  
  useEffect(() => {
    setIsSearching(false);
  }, [page]);

  return (
    <div className="flex items-center justify-center gap-2">
      {isSearching || loading ? (
        <div 
          className="h-6 w-6 animate-spin rounded-full border-b-2"
          style={{ 
            backgroundColor: theme.colors.secondaryBg,
            color: theme.colors.primaryText,
            borderColor: theme.colors.borderColor
          }}
        ></div>
      ) : (
        <>
          <button
            className="rounded-lg px-4 py-2 shadow-2xl disabled:opacity-30" 
            style={{
              backgroundColor: theme.colors.secondaryBg,
              color: theme.colors.primaryText,
              borderColor: theme.colors.borderColor,
              opacity: page === 1 ? 0.3 : 1, 
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

          <span
            className="text-2xl font-bold"
            style={{
              backgroundColor: theme.colors.secondaryBg,
              color: theme.colors.primaryText,
              borderColor: theme.colors.borderColor,
            }}
          >
            {`${page} / ${noOfPages}`}
          </span>

          <button
            className="rounded-lg px-4 py-2 shadow-2xl disabled:opacity-30"
            style={{ 
              backgroundColor: theme.colors.secondaryBg,
              color: theme.colors.primaryText,
              borderColor: theme.colors.borderColor,
              opacity: page === noOfPages ? 0.3 : 1, 
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
