import { UseFormRegister, UseFormSetValue } from 'react-hook-form';
import { CreateSalonFormArguments } from 'views/Admin/CreateSalonForm/createSalonForm.types';

export interface DetailsProps {
  register: UseFormRegister<CreateSalonFormArguments>;
  setValue: UseFormSetValue<CreateSalonFormArguments>;
  errors: {
    [x: string]: any;
  };
}
