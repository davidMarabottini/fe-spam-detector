import { useFormContext } from 'react-hook-form';
import Button from '@components/atoms/Button/Button';
import type { FormButtonProps } from '../Form.types';

const FormButton = ({ children, disabled, ...props }: FormButtonProps) => {
  const { formState: { isSubmitting, isValid } } = useFormContext();

  return (
    <Button 
      {...props} 
      disabled={  !isValid || isSubmitting || disabled}
    >
      {children}
    </Button>
  );
};

export default FormButton;