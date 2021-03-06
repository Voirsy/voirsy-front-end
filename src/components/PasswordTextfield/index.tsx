import { Visibility, VisibilityOff } from '@mui/icons-material';
import { IconButton, InputAdornment, TextField } from '@mui/material';
import { forwardRef, useState } from 'react';
import { FieldError } from 'react-hook-form';

const PasswordTextfield = forwardRef<HTMLInputElement, { label: string; error: FieldError | undefined }>(
  ({ label, error, ...rest }, ref) => {
    const [isShown, setIsShown] = useState(false);

    return (
      <TextField
        {...rest}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton onClick={() => setIsShown((prevState) => !prevState)} edge="end">
                {isShown ? <Visibility /> : <VisibilityOff />}
              </IconButton>
            </InputAdornment>
          ),
        }}
        inputRef={ref}
        fullWidth
        id={label}
        label={label}
        variant="outlined"
        type={isShown ? 'text' : 'password'}
        margin="dense"
        error={!!error}
        helperText={error?.message}
        size="small"
      />
    );
  }
);

PasswordTextfield.displayName = 'PasswordTextField';

export default PasswordTextfield;
