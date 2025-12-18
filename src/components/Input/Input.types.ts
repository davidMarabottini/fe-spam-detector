export interface InputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  type?: string; // TODO: sostituire con tipi input supportati in futuro
}