export interface RadioOptionBase {
  label: string;
  value: string;
}

export interface RadioBtnProps<RadioOption extends RadioOptionBase = RadioOptionBase> {
  options: RadioOption[];
  name?: string;
  label?: string;
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  children?: (option: RadioOption, selected: boolean) => React.ReactNode;
  error?: string;
  className?: string;
  orientation?: 'horizontal' | 'vertical';
  variant?: 'standard' | 'ghost';
  gap?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
}
