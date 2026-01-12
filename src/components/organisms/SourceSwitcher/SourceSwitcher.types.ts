import type { ClassValue } from "clsx";

export interface SourceSwitcherProps {
  accept?: string;
  handleFiles: (files: FileList) => void; //TODO: migliorare
  handleText: (text: string) => void;
  additionalClasses?: ClassValue;
} 