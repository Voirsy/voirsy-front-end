import { VisibilityOffOutlined, VisibilityOutlined } from '@mui/icons-material';
import { FormControl, FormControlLabel, FormLabel, IconButton, Radio, RadioGroup, TextField } from '@mui/material';
import axios from 'axios';
import { User } from 'models/user.model';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useHistory, useLocation } from 'react-router-dom';
import { CustomButton, CustomForm } from 'views/Login/loginForms.styles';

type ServerResponse = {
  message: string;
  token: string;
  user: User;
};

type FormData = {
  email: string;
  passowrd: string;
};

const SignUpForm = () => {
  const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false);
  const location = useLocation();
  const history = useHistory();

  const {
    register,
    handleSubmit,
    formState: { errors, isDirty, isValid },
  } = useForm({
    mode: 'onBlur',
    defaultValues: {
      fullname: '',
      email: location.state as string,
      password: '',
      role: '',
    },
  });

  const showPassword = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  const signUp = async (data: FormData) => {
    try {
      const result = await axios.post<ServerResponse>('http://localhost:8080/auth/signup', data);
      localStorage.setItem('JWT_TOKEN', result.data.token);
      history.push('/');
    } catch (error: any) {
      console.log(error.response.data.error.message);
    }
  };

  return (
    <CustomForm onSubmit={handleSubmit(signUp)}>
      <TextField
        variant="outlined"
        type="text"
        size="small"
        label="Fullname"
        margin="normal"
        {...register('fullname', {
          required: {
            value: true,
            message: 'Field is required',
          },
          minLength: {
            value: 3,
            message: 'Field should contains at least 3 characters',
          },
        })}
        error={!!errors.fullname}
        helperText={!!errors.fullname && errors.fullname.message}
      />
      <TextField
        variant="outlined"
        type="text"
        size="small"
        label="Email"
        margin="normal"
        {...register('email', {
          required: {
            value: true,
            message: 'Field is required',
          },
          minLength: {
            value: 3,
            message: 'Email should contains at least 3 characters',
          },
          pattern: {
            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
            message: 'Invalid email address',
          },
        })}
        error={!!errors.email}
        helperText={!!errors.email && errors.email.message}
      />
      <TextField
        variant="outlined"
        type={isPasswordVisible ? 'text' : 'password'}
        size="small"
        label="Password"
        margin="normal"
        InputProps={{
          endAdornment: (
            <IconButton edge="end" onClick={showPassword}>
              {isPasswordVisible ? <VisibilityOffOutlined /> : <VisibilityOutlined />}
            </IconButton>
          ),
        }}
        {...register('password', {
          required: {
            value: true,
            message: 'Field is required',
          },
          minLength: {
            value: 8,
            message: 'Password should contains at least 8 characters',
          },
        })}
        error={!!errors.password}
        helperText={!!errors.password && errors.password.message}
      />
      <FormControl component="fieldset">
        <FormLabel component="legend">Account type</FormLabel>
        <RadioGroup name="account-type" defaultValue="standard">
          <FormControlLabel
            value="standard"
            control={<Radio />}
            label="Standard"
            {...register('role', { required: true })}
          />
          <FormControlLabel
            value="business"
            control={<Radio />}
            label="Business"
            {...register('role', { required: true })}
          />
        </RadioGroup>
      </FormControl>
      <CustomButton type="submit" variant="contained" disableElevation disabled={!isDirty || !isValid}>
        Create account
      </CustomButton>
    </CustomForm>
  );
};

export default SignUpForm;
