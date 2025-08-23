import React, { useState } from 'react';
import { FaChevronDown, FaFilter } from 'react-icons/fa';

interface FilterOption {
  trait_type: string;
  values: string[];
}

interface FilterMenuProps {
  type: 'startup' | 'investor';
  onFilterChange: (filters: Record<string, string[]>) => void;
  isOpen: boolean;
  onClose: () => void;
}

const startupFilters: FilterOption[] = [
  {
    trait_type: 'Industry',
    values: ['Artificial Intelligence', 'Blockchain', 'Social Impact', 'Fintech', 'Healthcare']
  },
  {
    trait_type: 'Location',
    values: ['United States of America', 'Europe', 'Asia', 'Africa', 'South America']
  },
  {
    trait_type: 'Funding Types',
    values: ['Equity', 'Debt', 'Grant', 'Convertible Note']
  },
  {
    trait_type: 'Funding Range',
    values: ['Seed', 'Series A', 'Series B', 'Series C', 'Series D+']
  },
  {
    trait_type: 'Compliance',
    values: ['Insurance', 'KYC', 'AML', 'GDPR']
  }
];

const investorFilters: FilterOption[] = [
  {
    trait_type: 'Industry',
    values: ['Artificial Intelligence', 'Blockchain', 'Social Impact', 'Fintech', 'Healthcare']
  },
  {
    trait_type: 'Funding Types',
    values: ['Equity', 'Debt', 'Grant', 'Convertible Note']
  },
  {
    trait_type: 'Funding Range',
    values: ['1. Idea', '2. Prototype', '3. Early Revenue', '4. Growth', '5. Expansion']
  }
];

export const FilterMenu: React.FC<FilterMenuProps> = ({ type, onFilterChange, isOpen, onClose }) => {
  const [selectedFilters, setSelectedFilters] = useState<Record<string, string[]>>({});
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({});

  const filters = type === 'startup' ? startupFilters : investorFilters;

  const toggleSection = (section: string) => {
    setOpenSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const toggleFilter = (section: string, value: string) => {
    setSelectedFilters(prev => {
      const currentSection = prev[section] || [];
      const newSection = currentSection.includes(value)
        ? currentSection.filter(v => v !== value)
        : [...currentSection, value];
      
      const newFilters = {
        ...prev,
        [section]: newSection
      };
      
      onFilterChange(newFilters);
      return newFilters;
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-start justify-end z-30">
      <div className="fixed inset-0 bg-black bg-opacity-50" onClick={onClose}></div>
      <div className="relative bg-darkBg border border-gray-700 rounded-lg p-4 m-4 w-80 max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-bold text-white">Filters</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-white">
            ✕
          </button>
        </div>
        
        {filters.map((filter) => (
          <div key={filter.trait_type} className="mb-4">
            <button
              onClick={() => toggleSection(filter.trait_type)}
              className="w-full flex justify-between items-center text-white py-2 px-4 rounded-md hover:bg-gray-700"
            >
              <span>{filter.trait_type}</span>
              <FaChevronDown
                className={`transform transition-transform ${
                  openSections[filter.trait_type] ? 'rotate-180' : ''
                }`}
              />
            </button>
            
            {openSections[filter.trait_type] && (
              <div className="mt-2 pl-4">
                {filter.values.map((value) => (
                  <label
                    key={value}
                    className="flex items-center space-x-2 text-gray-300 py-1 hover:text-white cursor-pointer"
                  >
                    <input
                      type="checkbox"
                      checked={selectedFilters[filter.trait_type]?.includes(value) || false}
                      onChange={() => toggleFilter(filter.trait_type, value)}
                      className="form-checkbox h-4 w-4 text-blue-600 rounded border-gray-700 bg-gray-800"
                    />
                    <span>{value}</span>
                  </label>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FilterMenu; 