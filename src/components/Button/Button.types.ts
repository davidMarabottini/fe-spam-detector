export interface ButtonProps {
  children: string | React.ReactNode;
  onClick?: () => void;
  color?: 'primary' | 'secondary' | 'custom';
  rounded?: boolean;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
  additionalClassName?: string;
}