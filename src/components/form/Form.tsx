import { useForm, FormProvider, type FieldValues } from 'react-hook-form';
import Stack from '@components/atoms/Stack/Stack';
import type { FormProperties } from './Form.types';
import FormInput from './components/FormInput';
import FormButton from './components/FormButton';
import FormTextArea from './components/FormTextArea';

const Form = <T extends FieldValues>({ 
  children, 
  onSubmit, 
  defaultValues,
  noValidate,
  ...props
}: FormProperties<T>) => {
  const methods = useForm<T>({ defaultValues });

  return (
    <FormProvider {...methods}>
      <form noValidate onSubmit={methods.handleSubmit(onSubmit)} {...props}>
        <Stack spacing="md">
          {typeof children === 'function' ? children(methods) : children}
        </Stack>
      </form>
    </FormProvider>
  );
};

Form.Input = FormInput;
Form.TextArea = FormTextArea;
Form.Button = FormButton;
export default Form;
