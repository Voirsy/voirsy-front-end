import { UseFormGetValues, UseFormRegister, UseFormReset, UseFormSetValue, UseFormWatch } from 'react-hook-form';
import { CreateSalonFormArguments } from 'views/Admin/CreateSalonForm/createSalonForm.types';

export interface ServiceProps {
  register: UseFormRegister<CreateSalonFormArguments>;
  watch: UseFormWatch<CreateSalonFormArguments>;
  getValues: UseFormGetValues<CreateSalonFormArguments>;
  setValue: UseFormSetValue<CreateSalonFormArguments>;
  reset: UseFormReset<CreateSalonFormArguments>;
  errors: {
    [x: string]: any;
  };
}
