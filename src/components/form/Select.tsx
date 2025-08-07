import React, { useState, useRef, useEffect } from 'react';

interface Option {
  value: string;
  label: string;
}

interface SelectProps {
  options: Option[];
  placeholder?: string;
  onChange: (value: string) => void;
  value: string;
  className?: string;
  hasError?: boolean;
  label?: string;
  id?: string;
}

const Select: React.FC<SelectProps> = ({
  options,
  onChange,
  className = '',
  value = '',
  hasError = false,
  label,
  id,
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [hasValue, setHasValue] = useState(false);
  const selectRef = useRef<HTMLSelectElement>(null);

  useEffect(() => {
    setHasValue(!!value);
  }, [value]);

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    onChange(value);
  };

  const handleFocus = () => setIsFocused(true);
  const handleBlur = () => setIsFocused(false);

  return (
    <div className="relative">
      {label && (
        <label
          htmlFor={id}
          className={`absolute left-4 transition-all duration-200 ease-in-out ${
            isFocused || hasValue
              ? `top-0 text-xs transform -translate-y-3 bg-white px-1 dark:text-white ${
                  hasError ? 'text-error-500' : 'text-[#111112]'
                }`
              : `top-[22px] text-[14px] transform -translate-y-1/2 text-[#888990] ${
                  hasError ? 'text-error-500' : 'text-[#111112]'
                }`
          }`}
        >
          {label}
        </label>
      )}
      <select
        ref={selectRef}
        id={id}
        className={`h-11 w-full appearance-none rounded-lg border ${
          hasError
            ? 'border-error-500 focus:border-error-300 focus:ring-error-500/20 dark:text-error-400 dark:border-error-500 dark:focus:border-error-800'
            : 'border-gray-300 focus:border-brand-300 focus:ring-brand-500/10 dark:border-gray-700 dark:focus:border-brand-800'
        } bg-transparent px-4 py-2.5 pr-11 text-sm shadow-theme-xs placeholder:text-gray-400 focus:outline-none focus:ring-3 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 ${
          value ? 'text-gray-800 dark:text-white/90' : 'text-gray-400 dark:text-gray-400'
        } ${className}`}
        value={value}
        onChange={handleChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
      >
        <option
          value=""
          disabled
          className="text-gray-700 dark:bg-gray-900 dark:text-gray-400"
        ></option>
        {options.map((option) => (
          <option
            key={option.value}
            value={option.value}
            className="text-gray-700 dark:bg-gray-900 dark:text-gray-400"
          >
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Select;
