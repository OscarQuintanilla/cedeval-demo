import { SearchIcon } from '@heroicons/react/outline';
import { MailIcon } from '@heroicons/react/solid';
import { forwardRef, InputHTMLAttributes } from 'react';

const SearchBar = forwardRef<HTMLInputElement, InputHTMLAttributes<{}>>(
  (props, ref) => {
    return (
      <div className="relative mt-1 rounded-md shadow-sm">
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          <SearchIcon
            className="w-5 h-5 font-bold text-gray-400"
            aria-hidden="true"
          />
        </div>
        <input
          {...props}
          ref={ref}
          type="text"
          className="block w-full pl-10 border-gray-300 rounded-md form-input focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
      </div>
    );
  }
);

export default SearchBar;
