export interface RadioOption {
  label: string;
  value: string;
}

export interface RadioGroupProps {
  options: RadioOption[];
  name?: string;
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  children?: (option: RadioOption, selected: boolean) => React.ReactNode;
  error?: string;
  className?: string;
  orientation?: 'horizontal' | 'vertical';
  variant?: 'standard' | 'ghost';
  gap?: 'sm' | 'md' | 'lg'
}
