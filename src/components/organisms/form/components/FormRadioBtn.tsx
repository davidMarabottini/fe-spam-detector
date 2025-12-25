import { useFormContext, type FieldValues } from 'react-hook-form';
import RadioBtn from '@components/atoms/RadioBtn/RadioBtn';
import type { FormRadioBtnProps } from '../Form.types';


const FormRadioBtn = <T extends FieldValues>({ name, rules, options, ...props }: FormRadioBtnProps<T>) => {
  const { register, formState: { errors } } = useFormContext<T>();
  const error = errors[name]?.message as string | undefined;

  const { onChange, ref, ...restRegister } = register(name, rules);

  return (
    <RadioBtn
      options={options || []}
      {...props}
      {...restRegister}
      ref={ref}
      onValueChange={(val: string) => {
        onChange({ target: { name, value: val } });
      }}
      error={error} 
    />
  );
};

export default FormRadioBtn;
