import { Select as MuiSelect } from '@mui/material';
import { CustomFormControl, CustomInputLabel } from './select.styled';
import { ReactNode, useState } from 'react';
import { SelectProps } from '@mui/material/Select/Select';

interface CustomSelectProps extends SelectProps<string | string[]> {
  label: string;
  children: ReactNode;
}

const Select = ({ label, children, MenuProps, ...selectProps }: CustomSelectProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <CustomFormControl isOpen={isOpen}>
      <CustomInputLabel isOpen={isOpen} variant="body2" id="location-helper-label">
        {label}
      </CustomInputLabel>
      <MuiSelect
        onOpen={() => setIsOpen(true)}
        onClose={() => setIsOpen(false)}
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
};

export default Select;
