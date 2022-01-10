/* eslint-disable @typescript-eslint/no-explicit-any */
import { VisibilityOffOutlined, VisibilityOutlined } from '@mui/icons-material';
import { IconButton, TextField } from '@mui/material';
import axios from 'axios';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useHistory, useLocation } from 'react-router';
import { useAppDispatch } from 'store/store';
import { CustomForm, CustomButton } from '../../loginForms.styles';
import { setUserData } from 'store/slices/userSlice';
import { User } from 'models/user.model';
import { UserRole } from 'enums/userRole.enum';
import { useTranslation } from 'react-i18next';
import { ENV } from 'config/enviroments';

type ServerResponse = {
  token: string;
  user: User;
};

type FormData = {
  email: string;
  fullname: string;
  password: string;
  role: UserRole;
};

const SignInForm = () => {
  const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false);
  const location = useLocation();
  const history = useHistory();
  const dispatch = useAppDispatch();
  const [translation] = useTranslation('login');

  const {
    register,
    handleSubmit,
    formState: { errors, isDirty, isValid },
  } = useForm({
    mode: 'onBlur',
    defaultValues: {
      email: location.state as string,
      password: '',
    },
  });

  const showPassword = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  const signIn = async (data: FormData) => {
    try {
      const result = await axios.post<ServerResponse>(`${ENV.apiUrl}/auth/signin`, data);
      localStorage.setItem('JWT_TOKEN', result.data.token);
      dispatch(setUserData(result.data.user));
      history.push('/');
    } catch (error: any) {
      console.log(error.response.data.error.message);
    }
  };

  return (
    <CustomForm onSubmit={handleSubmit(signIn)}>
      <TextField
        variant="outlined"
        type="text"
        size="small"
        label={translation('form.email.label')}
        margin="normal"
        {...register('email', {
          required: {
            value: true,
            message: translation('form.email.validation.required'),
          },
          minLength: {
            value: 3,
            message: translation('form.email.validation.minLength'),
          },
          pattern: {
            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
            message: translation('form.email.validation.pattern'),
          },
        })}
        error={!!errors.email}
        helperText={!!errors.email && errors.email.message}
      />
      <TextField
        variant="outlined"
        type={isPasswordVisible ? 'text' : 'password'}
        size="small"
        label={translation('form.password.label')}
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
            message: translation('form.password.validation.required'),
          },
          minLength: {
            value: 8,
            message: translation('form.password.validation.minLength'),
          },
        })}
        error={!!errors.password}
        helperText={!!errors.password && errors.password.message}
      />
      <CustomButton type="submit" variant="contained" disableElevation disabled={!isDirty || !isValid}>
        {translation('form.signInButton.label')}
      </CustomButton>
    </CustomForm>
  );
};

export default SignInForm;
