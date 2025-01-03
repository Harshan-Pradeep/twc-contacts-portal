import React from 'react';
import { UseFormRegister } from 'react-hook-form';

interface RadioOption {
  label: string;
  value: string;
}

interface RadioGroupProps {
  label: string;
  name: string;
  options: RadioOption[];
  error?: string;
  register: UseFormRegister<any>;
}

const RadioGroup = ({ label, name, options, error, register }: RadioGroupProps) => {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        {label}
      </label>
      <div className="space-x-6">
        {options.map((option) => (
          <label key={option.value} className="inline-flex items-center">
            <input
              type="radio"
              {...register(name)}
              value={option.value}
              className="form-radio h-4 w-4 text-indigo-600"
            />
            <span className="ml-2">{option.label}</span>
          </label>
        ))}
      </div>
      {error && (
        <p className="mt-1 text-sm text-red-600">{error}</p>
      )}
    </div>
  );
};

export default RadioGroup;