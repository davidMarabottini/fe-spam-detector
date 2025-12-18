export interface ButtonProps {
  label: string;
  onClick?: () => void;
  color?: 'primary' | 'secondary';
  rounded?: boolean;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
}