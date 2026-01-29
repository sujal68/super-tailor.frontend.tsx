import React from 'react';
import SearchableDropdown from './SearchableDropdown';
import CustomDropdown from './CustomDropdown';
import { cities, getCityOptions } from '../utils/cities';

interface CityDropdownProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  searchable?: boolean;
  includeAll?: boolean;
  className?: string;
  customOptions?: { value: string; label: string }[];
}

const CityDropdown: React.FC<CityDropdownProps> = ({
  value,
  onChange,
  placeholder = "Select City",
  searchable = true,
  includeAll = false,
  className = "",
  customOptions
}) => {
  let options;
  
  if (customOptions) {
    options = customOptions;
  } else {
    options = includeAll ? getCityOptions() : cities;
  }

  if (searchable) {
    return (
      <div className={className}>
        <SearchableDropdown
          options={options}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
        />
      </div>
    );
  }

  return (
    <div className={className}>
      <CustomDropdown
        options={options}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
      />
    </div>
  );
};

export default CityDropdown;