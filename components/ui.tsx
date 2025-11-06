
import React from 'react';

interface QuestionCardProps {
  title: string;
  description: string;
  children: React.ReactNode;
}

export const QuestionCard: React.FC<QuestionCardProps> = ({ title, description, children }) => (
  <div className="mb-8 p-6 bg-white border border-gray-200 rounded-lg shadow-sm transition-shadow hover:shadow-md">
    <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
    <p className="text-sm text-gray-500 mt-1 mb-4">{description}</p>
    <div className="space-y-4">{children}</div>
  </div>
);

interface LabelProps {
  htmlFor?: string;
  children: React.ReactNode;
  className?: string;
}

export const Label: React.FC<LabelProps> = ({ htmlFor, children, className }) => (
  <label htmlFor={htmlFor} className={`block text-sm font-medium text-gray-700 ${className}`}>
    {children}
  </label>
);

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  unit?: string;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(({ label, id, unit, ...props }, ref) => (
  <div>
    {label && <Label htmlFor={id}>{label}</Label>}
    <div className="mt-1 relative rounded-md shadow-sm">
      <input
        id={id}
        ref={ref}
        className="block w-full px-3 py-2 bg-green-50 border border-green-300 text-gray-900 rounded-md focus:ring-green-500 focus:border-green-500 sm:text-sm placeholder-gray-500"
        {...props}
      />
      {unit && (
        <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
          <span className="text-gray-500 sm:text-sm">{unit}</span>
        </div>
      )}
    </div>
  </div>
));

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
}

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(({ label, id, ...props }, ref) => (
  <div>
    <Label htmlFor={id}>{label}</Label>
    <div className="mt-1">
      <textarea
        id={id}
        ref={ref}
        rows={4}
        className="block w-full px-3 py-2 bg-green-50 border border-green-300 text-gray-900 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500 sm:text-sm placeholder-gray-500"
        {...props}
      ></textarea>
    </div>
  </div>
));

interface RadioGroupProps {
  name: string;
  value: string;
  onChange: (value: string) => void;
  options: { label: string; value: string }[];
}

export const RadioGroup: React.FC<RadioGroupProps> = ({ name, value, onChange, options }) => (
  <div className="flex items-center space-x-4">
    {options.map((option) => (
      <label key={option.value} className="flex items-center space-x-2 cursor-pointer">
        <input
          type="radio"
          name={name}
          value={option.value}
          checked={value === option.value}
          onChange={(e) => onChange(e.target.value)}
          className="h-5 w-5 cursor-pointer text-green-600 border-green-400 focus:ring-green-500 focus:ring-2"
        />
        <span className="text-sm text-gray-700">{option.label}</span>
      </label>
    ))}
  </div>
);