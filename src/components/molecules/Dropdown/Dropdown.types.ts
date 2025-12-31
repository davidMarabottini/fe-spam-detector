type dropdownOption = {
  label: string;
  url?: string;
  onClick?: () => void;
}

export interface DropdownProps {
  label: React.ReactNode;
  options: dropdownOption[];
  className?: string;
  onTriggerClick?: (isOpen: boolean) => void;
}