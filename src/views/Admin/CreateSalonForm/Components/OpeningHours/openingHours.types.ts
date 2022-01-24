import { UseFormRegister } from 'react-hook-form';
import { CreateSalonFormArguments } from 'views/Admin/CreateSalonForm/createSalonForm.types';

export interface OpeningHoursProps {
  register: UseFormRegister<CreateSalonFormArguments>;
}
