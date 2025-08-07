import React, { useEffect, useRef, useState } from 'react';
import { MultiOption } from '../../types/crud';
import Button from '../ui/button/Button';
import { useAddOption } from '../../queries/general.ts';

interface MultiSelectProps {
  label: string;
  options: MultiOption[];
  defaultSelected?: string[];
  onChange?: (selected: string[]) => void;
  disabled?: boolean;
  className?: string;
  error?: boolean;
  success?: boolean;
  value?: string[];
  hasError?: boolean;
  id?: string;
  onAddOption?: (newOption: MultiOption) => Promise<MultiOption>;
}

const MultiSelectWithSearch: React.FC<MultiSelectProps> = ({
  label,
  options,
  value = [],
  hasError = false,
  id,
  defaultSelected = [],
  onChange,
  disabled = false,
  className = '',
  error = false,
  success = false,
  onAddOption,
}) => {
  const [selectedOptions, setSelectedOptions] = useState<string[]>(
    value.length > 0 ? value : defaultSelected
  );
  const [isOpen, setIsOpen] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [hasValue, setHasValue] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredOptions, setFilteredOptions] = useState<MultiOption[]>(options);

  const { mutateAsync: addOption } = useAddOption();

  useEffect(() => {
    setHasValue(selectedOptions.length > 0);
  }, [selectedOptions]);

  useEffect(() => {
    if (value.length > 0) {
      setSelectedOptions(value);
    }
  }, [value]);

  useEffect(() => {
    setFilteredOptions(
      options.filter(
        (option) =>
          option.label.toLowerCase().includes(searchQuery.toLowerCase()) &&
          !selectedOptions.includes(option.value)
      )
    );
  }, [searchQuery, options, selectedOptions]);

  const dropdownRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLDivElement>(null);

  const toggleDropdown = () => {
    if (!disabled) setIsOpen((prev) => !prev);
  };

  const handleSelect = (optionValue: string) => {
    const newSelectedOptions = selectedOptions.includes(optionValue)
      ? selectedOptions.filter((value) => value !== optionValue)
      : [...selectedOptions, optionValue];

    setSelectedOptions(newSelectedOptions);
    onChange?.(newSelectedOptions);
  };

  const removeOption = (value: string) => {
    const newSelectedOptions = selectedOptions.filter((opt) => opt !== value);
    setSelectedOptions(newSelectedOptions);
    onChange?.(newSelectedOptions);
  };

  const selectedValuesText = selectedOptions.map(
    (value) => options.find((option) => option.value === value)?.label || value
  );

  const handleAddNewOption = async () => {
    if (!searchQuery.trim()) return;

    try {
      const newOption = {
        value: searchQuery.trim(),
        // label: searchQuery.trim()
      };

      const createdOption = await addOption(newOption);

      const newSelectedOptions = [...selectedOptions, createdOption.value];
      setSelectedOptions(newSelectedOptions);
      onChange?.(newSelectedOptions);
      setSearchQuery('');
      setIsOpen(true);
    } catch (err) {
      console.error('Error adding option:', err);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && searchQuery.trim() && onAddOption) {
      e.preventDefault();
      handleAddNewOption();
    }
  };

  let inputClasses = `flex h-auto rounded-t-lg border py-1.5 pl-3 pr-3 shadow-theme-xs outline-hidden transition focus:border-brand-300 focus:shadow-focus-ring dark:bg-gray-900 dark:focus:border-brand-300 ${className}`;

  if (disabled) {
    inputClasses += ` text-gray-500 border-gray-300 opacity-40 bg-gray-100 cursor-not-allowed dark:bg-gray-800 dark:text-gray-400 dark:border-gray-700`;
  } else if (error || hasError) {
    inputClasses += ` border-error-500 focus:border-error-300 focus:ring-error-500/20 dark:text-error-400 dark:border-error-500 dark:focus:border-error-800`;
  } else if (success) {
    inputClasses += ` border-success-500 focus:border-success-300 focus:ring-success-500/20 dark:text-success-400 dark:border-success-500 dark:focus:border-success-800`;
  } else {
    inputClasses += ` bg-transparent text-gray-800 border-gray-300 focus:border-brand-300 focus:ring-brand-500/20 dark:border-gray-700 dark:text-white/90 dark:focus:border-brand-800`;
  }

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        inputRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        !inputRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div
      className="relative w-full"
      onFocus={() => setIsFocused(true)}
      onBlur={() => setIsFocused(false)}
    >
      <label
        htmlFor={id}
        className={`absolute left-3 transition-all duration-200 ease-in-out ${
          isFocused || hasValue
            ? `top-0 text-xs transform -translate-y-3 bg-white px-1 dark:bg-gray-900 dark:text-white ${
                hasError || error ? 'text-error-500' : 'text-[#111112]'
              }`
            : `top-[20px] text-[14px] transform -translate-y-1/2 ${
                hasError || error ? 'text-error-500' : 'text-[#888990]'
              }`
        }`}
      >
        {label}
      </label>

      <div className="relative inline-block w-full">
        <div className="relative flex flex-col items-center">
          <div onClick={toggleDropdown} className="w-full" ref={inputRef}>
            <div className={inputClasses}>
              <div className="flex flex-wrap gap-2 w-full">
                {selectedValuesText.length > 0 ? (
                  selectedValuesText.map((text, index) => (
                    <div
                      key={index}
                      className="group flex items-center justify-center rounded-full border-[0.7px] border-transparent bg-gray-100 py-1 pl-2.5 pr-2 text-sm text-gray-800 hover:border-gray-200 dark:bg-gray-800 dark:text-white/90 dark:hover:border-gray-800"
                    >
                      <span className="flex-initial max-w-full">{text}</span>
                      <div className="flex flex-row-reverse flex-auto">
                        <div
                          onClick={(e) => {
                            e.stopPropagation();
                            removeOption(selectedOptions[index]);
                          }}
                          className="pl-2 text-gray-500 cursor-pointer group-hover:text-gray-400 dark:text-gray-400"
                        >
                          <svg
                            className="fill-current"
                            role="button"
                            width="14"
                            height="14"
                            viewBox="0 0 14 14"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              fillRule="evenodd"
                              clipRule="evenodd"
                              d="M3.40717 4.46881C3.11428 4.17591 3.11428 3.70104 3.40717 3.40815C3.70006 3.11525 4.17494 3.11525 4.46783 3.40815L6.99943 5.93975L9.53095 3.40822C9.82385 3.11533 10.2987 3.11533 10.5916 3.40822C10.8845 3.70112 10.8845 4.17599 10.5916 4.46888L8.06009 7.00041L10.5916 9.53193C10.8845 9.82482 10.8845 10.2997 10.5916 10.5926C10.2987 10.8855 9.82385 10.8855 9.53095 10.5926L6.99943 8.06107L4.46783 10.5927C4.17494 10.8856 3.70006 10.8856 3.40717 10.5927C3.11428 10.2998 3.11428 9.8249 3.40717 9.53201L5.93877 7.00041L3.40717 4.46881Z"
                            />
                          </svg>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <input
                    className="w-full h-full p-1 pr-2 text-sm bg-transparent border-0 outline-hidden appearance-none placeholder:text-gray-800 focus:border-0 focus:outline-hidden focus:ring-0 dark:placeholder:text-white/90"
                    readOnly
                    value=""
                  />
                )}
              </div>
              <div className="flex items-center py-1 pl-1 pr-1 w-7">
                <button
                  type="button"
                  onClick={toggleDropdown}
                  className="w-5 h-5 text-gray-700 outline-hidden cursor-pointer focus:outline-hidden dark:text-gray-400"
                >
                  <svg
                    className={`stroke-current ${isOpen ? 'rotate-180' : ''}`}
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M4.79175 7.39551L10.0001 12.6038L15.2084 7.39551"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>

          {isOpen && (
            <div
              className="absolute left-0 z-40 w-full overflow-y-auto bg-white rounded-b-lg shadow-sm top-full max-h-select dark:bg-gray-900"
              onClick={(e) => e.stopPropagation()}
              ref={dropdownRef}
            >
              <div className="flex flex-col">
                <div className="relative">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="Find or add new"
                    className="h-11 w-full appearance-none px-4 py-1.5 text-sm shadow-theme-xs placeholder:text-gray-400 focus:outline-hidden dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30"
                    autoFocus
                  />
                  {searchQuery && (
                    <button
                      type="button"
                      onClick={() => setSearchQuery('')}
                      className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 dark:text-gray-300 dark:hover:text-white"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                    </button>
                  )}
                </div>
                {filteredOptions.length > 0 ? (
                  filteredOptions.map((option, index) => (
                    <div
                      key={index}
                      className={`hover:bg-primary/5 w-full cursor-pointer rounded-t border-b border-gray-200 dark:border-gray-800`}
                      onClick={() => handleSelect(option.value)}
                    >
                      <div
                        className={`relative flex w-full items-center p-2 pl-2 ${
                          selectedOptions.includes(option.value) ? 'bg-primary/10' : ''
                        }`}
                      >
                        <div className="mx-2 leading-6 text-gray-800 dark:text-white/90">
                          {option.label}
                        </div>
                      </div>
                    </div>
                  ))
                ) : searchQuery.trim() ? (
                  <div className="p-2 text-sm text-gray-500">
                    No results. Click "Add" to create a new option.
                  </div>
                ) : (
                  <div className="p-2 text-sm text-gray-500">No options available</div>
                )}
                {searchQuery.trim() && (
                  <div className="text-sm">
                    <Button
                      type="button"
                      variant="success"
                      size="sm"
                      onClick={handleAddNewOption}
                      className="w-full p-2 text-blue-500 rounded-none rounded-bl-lg rounded-br-lg"
                    >
                      Add "{searchQuery.trim()}"
                    </Button>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MultiSelectWithSearch;
