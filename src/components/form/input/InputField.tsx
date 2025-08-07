import React, { useEffect, useRef, useState } from 'react';
import type { FC } from 'react';

interface InputProps {
  type?: 'text' | 'number' | 'email' | 'password' | 'date' | 'time' | string;
  id?: string;
  name?: string;
  placeholder?: string;
  value?: string | number;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
  min?: string | number;
  max?: string | number;
  step?: number;
  disabled?: boolean;
  success?: boolean;
  error?: boolean;
  errorMessage?: string;
  hint?: string;
  label: string;
}

const Input: FC<InputProps> = ({
  type = 'text',
  id,
  name,
  placeholder,
  value,
  onChange,
  className = '',
  min,
  max,
  step,
  disabled = false,
  success = false,
  error = false,
  errorMessage,
  hint,
  label,
  ...rest
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [hasValue, setHasValue] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setHasValue(!!value);
  }, [value]);

  useEffect(() => {
    const handleFocusIn = (e: FocusEvent) => {
      if (wrapperRef.current?.contains(e.target as Node)) {
        setIsFocused(true);
      }
    };

    const handleFocusOut = (e: FocusEvent) => {
      if (!wrapperRef.current?.contains(e.relatedTarget as Node)) {
        setIsFocused(false);
      }
    };

    const wrapper = wrapperRef.current;
    if (wrapper) {
      wrapper.addEventListener('focusin', handleFocusIn);
      wrapper.addEventListener('focusout', handleFocusOut);

      return () => {
        wrapper.removeEventListener('focusin', handleFocusIn);
        wrapper.removeEventListener('focusout', handleFocusOut);
      };
    }
  }, []);

  let inputClasses = ` h-11 w-full rounded-lg border appearance-none px-4 py-2.5 text-sm shadow-theme-xs placeholder:text-gray-400 focus:outline-hidden focus:ring-3  dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30 ${className}`;

  if (disabled) {
    inputClasses += ` text-gray-500 border-gray-300 opacity-40 bg-gray-100 cursor-not-allowed dark:bg-gray-800 dark:text-gray-400 dark:border-gray-700 opacity-40`;
  } else if (error) {
    inputClasses += `  border-error-500 focus:border-error-300 focus:ring-error-500/20 dark:text-error-400 dark:border-error-500 dark:focus:border-error-800`;
  } else if (success) {
    inputClasses += `  border-success-500 focus:border-success-300 focus:ring-success-500/20 dark:text-success-400 dark:border-success-500 dark:focus:border-success-800`;
  } else {
    inputClasses += ` bg-transparent text-gray-800 border-gray-300 focus:border-brand-300 focus:ring-brand-500/20 dark:border-gray-700 dark:text-white/90  dark:focus:border-brand-800`;
  }

  return (
    <div className="relative" ref={wrapperRef}>
      {label && (
        <label
          htmlFor={id}
          className={`absolute left-4 transition-all duration-200 ease-in-out ${
            isFocused || hasValue
              ? `top-0 text-xs transform -translate-y-3 bg-white px-1 dark:text-white ${error ? 'text-error-500' : 'text-[#111112]'}`
              : `top-[22px] text-[14px] transform -translate-y-1/2 text-[#888990] ${error ? 'text-error-500' : 'text-[#111112]'}`
          }`}
        >
          {label}
        </label>
      )}
      <input
        ref={inputRef}
        type={type}
        id={id}
        name={name}
        placeholder={isFocused || hasValue ? '' : placeholder}
        value={value}
        onChange={onChange}
        min={min}
        max={max}
        step={step}
        disabled={disabled}
        className={inputClasses}
        autoComplete="new-password"
        {...rest}
      />

      {(hint || errorMessage) && (
        <p
          className={`mt-1.5 text-xs ${
            error ? 'text-error-500' : success ? 'text-success-500' : 'text-gray-500'
          }`}
        >
          {errorMessage || hint}
        </p>
      )}
    </div>
  );
};

export default Input;
