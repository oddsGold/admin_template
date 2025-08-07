interface FilterProps {
  clearFilters: () => void;
}

export default function ClearFilter({ clearFilters }: FilterProps) {
  return (
    <button
      onClick={clearFilters}
      className="inline-flex items-center gap-2 rounded-lg border border-red-200 bg-white px-4 py-2.5 text-theme-sm font-medium text-red-600 shadow-theme-xs hover:bg-red-50 hover:text-red-700 dark:border-red-800/50 dark:bg-red-900/10 dark:text-red-400 dark:hover:bg-red-900/20 dark:hover:text-red-300"
    >
      <svg
        className="stroke-current"
        width="20"
        height="20"
        viewBox="0 0 20 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M3.33301 5H16.6663"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <path
          d="M5.83301 5V3.33333C5.83301 2.89131 6.0086 2.46738 6.32116 2.15482C6.63372 1.84226 7.05765 1.66667 7.49967 1.66667H12.4997C12.9417 1.66667 13.3656 1.84226 13.6782 2.15482C13.9907 2.46738 14.1663 2.89131 14.1663 3.33333V5M16.6663 5V16.6667C16.6663 17.1087 16.4907 17.5326 16.1782 17.8452C15.8656 18.1577 15.4417 18.3333 14.9997 18.3333H4.99967C4.55765 18.3333 4.13372 18.1577 3.82116 17.8452C3.5086 17.5326 3.33301 17.1087 3.33301 16.6667V5H16.6663Z"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M8.33301 9.16667V14.1667"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <path
          d="M11.6663 9.16667V14.1667"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      </svg>
      Clear Filters
    </button>
  );
}
