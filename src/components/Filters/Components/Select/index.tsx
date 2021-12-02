import { Select as MuiSelect } from '@mui/material';
import { CustomFormControl, CustomInputLabel } from './select.styled';
import { ReactNode } from 'react';
import { SelectProps } from '@mui/material/Select/Select';

interface CustomSelectProps extends SelectProps<string | string[]> {
  label: string;
  isPrimary?: boolean;
  children: ReactNode;
}

const Select = ({ label, isPrimary = false, children, MenuProps, ...selectProps }: CustomSelectProps) => (
  <CustomFormControl isPrimary={isPrimary}>
    <CustomInputLabel isPrimary={isPrimary} variant="body2" id="location-helper-label">
      {label}
    </CustomInputLabel>
    <MuiSelect
      labelId="location-helper-label"
      id="location-helper"
      color="primary"
      renderValue={() => ''}
      size="small"
      MenuProps={{
        transformOrigin: {
          vertical: 'top',
          horizontal: 'left',
        },
        anchorOrigin: {
          vertical: 'bottom',
          horizontal: 'left',
        },
        ...MenuProps,
      }}
      {...selectProps}
    >
      {children}
    </MuiSelect>
  </CustomFormControl>
);

export default Select;
