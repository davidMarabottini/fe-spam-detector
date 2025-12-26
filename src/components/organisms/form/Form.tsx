import { useForm, FormProvider, type FieldValues } from 'react-hook-form';
import type { FormProperties } from './Form.types';
import FormInput from './components/FormInput';
import FormButton from './components/FormButton';
import FormTextArea from './components/FormTextArea';
import FormRadioBtn from './components/FormRadioBtn';
import FormSelect from './components/FormSelect';

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
      <form noValidate={noValidate} onSubmit={methods.handleSubmit(onSubmit)} {...props}>
        {typeof children === 'function' ? children(methods) : children}
      </form>
    </FormProvider>
  );
};

Form.Input = FormInput;
Form.TextArea = FormTextArea;
Form.Button = FormButton;
Form.RadioBtn = FormRadioBtn;
Form.Select = FormSelect;

export default Form;
