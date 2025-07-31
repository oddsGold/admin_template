import {MultiOption} from "../../../types/crud";

interface Props {
    status:  MultiOption;
    removeFilter: (value: string) => void;
}

const FilterButton = ({ status, removeFilter }: Props) => (
    <button
        key={status.value}
        onClick={() => removeFilter(status.value)}
        className="inline-flex items-center justify-center gap-2 rounded-lg transition px-4 py-2 text-sm bg-white text-gray-700 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 dark:bg-gray-800 dark:text-gray-400 dark:ring-gray-700 dark:hover:bg-white/[0.03] dark:hover:text-gray-300"
    >
        {status.label}
        <span className="flex items-center ml-2">
      <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 20 20"
          className="w-4 h-4"
      >
        <path fillRule="evenodd" clipRule="evenodd" d="M6 18L18 6M6 6l12 12" strokeWidth="2" />
      </svg>
    </span>
    </button>
);

export default FilterButton;
