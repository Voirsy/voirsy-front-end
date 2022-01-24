import { UseFormGetValues, UseFormRegister, UseFormSetValue, UseFormWatch } from 'react-hook-form';
import { CreateSalonFormArguments } from 'views/Admin/CreateSalonForm/createSalonForm.types';

export interface CrewProps {
  register: UseFormRegister<CreateSalonFormArguments>;
  watch: UseFormWatch<CreateSalonFormArguments>;
  getValues: UseFormGetValues<CreateSalonFormArguments>;
  setValue: UseFormSetValue<CreateSalonFormArguments>;
}
