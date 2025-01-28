import { ChevronDownIcon } from "@heroicons/react/24/outline";
import { useState } from "react";

interface DropdownProps {
  limit: number;
  onSelect: (limit: number) => void;
}

const DropdownLimit = ({ limit, onSelect }: DropdownProps) => {
  const [dropdownVisible, setDropdownVisible] = useState(false);

  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };

  const handleSelect = (limit: number) => {
    onSelect(limit);
    setDropdownVisible(false); // Hide dropdown after selection
  };

  return (
    <div className="relative inline-block text-left">
      <button
        id="dropdownActionButton"
        onClick={toggleDropdown}
        className="flex items-center rounded-lg border border-gray-300 bg-white px-3 py-1.5 text-sm font-medium text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-4 focus:ring-gray-100 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-400 dark:hover:border-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-700"
        type="button"
      >
        <span className="sr-only">Action button</span>
        {limit}
        <ChevronDownIcon className="h-5 w-5 ml-2" />
      </button>

      {dropdownVisible && (
        <div
          id="dropdownAction"
          className="absolute right-0 z-10 mt-2  origin-top-right divide-y divide-gray-100 rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none dark:divide-gray-600 dark:bg-gray-700"
        >
          <ul
            className="py-1 text-sm text-gray-700 dark:text-gray-200"
            aria-labelledby="dropdownActionButton"
          >
            <li
              className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
              onClick={() => handleSelect(10)}
            >
              10
            </li>
            <li
              className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
              onClick={() => handleSelect(25)}
            >
              25
            </li>
            <li
              className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
              onClick={() => handleSelect(50)}
            >
              50
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default DropdownLimit;
