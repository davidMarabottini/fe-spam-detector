import type { ReactNode } from "react";
import type { UseFormReturn, FieldValues, Path, DefaultValues, RegisterOptions } from "react-hook-form";
import type { ButtonProps } from "../../atoms/Button/Button.types";
import type { InputProps } from "../../atoms/Input/Input.types";
import type { TextAreaProps } from "../../atoms/TextArea/TextArea.types";
import type { RadioGroupProps } from "../../atoms/RadioBtn/RadioBtn.types";
import type { SelectProps } from "../../molecules/Select/Select.types";

type FormBase = Omit<React.FormHTMLAttributes<HTMLFormElement>, 'children' | 'onSubmit'>;

export interface FormProperties<T extends FieldValues> extends FormBase {
  children: ReactNode | ((methods: UseFormReturn<T>) => ReactNode);
  onSubmit: (data: T) => void;
  defaultValues?: DefaultValues<T>;
  noValidate?: boolean;
}

export interface FormInputProps<T extends FieldValues> extends Omit<InputProps, 'placeholder'> {
  name: Path<T>;
  rules?: RegisterOptions<T, Path<T>>;
}

export interface FormTextAreaProps<T extends FieldValues> extends Omit<TextAreaProps, 'placeholder'> {
  name: Path<T>;
  rules?: RegisterOptions<T, Path<T>>;
}

export interface FormRadioBtnProps<T extends FieldValues> extends Omit<RadioGroupProps, 'placeholder'> {
  name: Path<T>;
  rules?: RegisterOptions<T, Path<T>>;
}

export interface FormSelect<T extends FieldValues> extends Omit<SelectProps, 'placeholder'> {
  name: Path<T>;
  rules?: RegisterOptions<T, Path<T>>;
}

export interface FormButtonProps extends ButtonProps {
  autoDisabled?: boolean
}
