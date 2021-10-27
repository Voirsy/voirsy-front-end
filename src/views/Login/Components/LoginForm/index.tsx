import { ArrowForward } from '@mui/icons-material';
import { IconButton, TextField } from '@mui/material';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { useHistory, useRouteMatch } from 'react-router-dom';

type ServerResponse = {
  email: string;
  exist: boolean;
};

const LoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isDirty, isValid },
  } = useForm({
    mode: 'onChange',
  });
  const history = useHistory();
  const { url } = useRouteMatch();

  const submitForm = async (data: { email: string }) => {
    const result = await axios.post<ServerResponse>('http://localhost:8080/auth/checkemail', data);
    if (result.data.exist) {
      history.push({
        pathname: `${url}/signin`,
        state: result.data.email,
      });
    } else {
      history.push({
        pathname: `${url}/signup`,
        state: result.data.email,
      });
    }
  };

  return (
    <form onSubmit={handleSubmit(submitForm)}>
      <TextField
        variant="outlined"
        type="text"
        size="small"
        placeholder="Email"
        InputProps={{
          endAdornment: (
            <IconButton edge="end" type="submit" color="primary" disabled={!isDirty || !isValid}>
              <ArrowForward />
            </IconButton>
          ),
        }}
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
        helperText={errors.email && 'Field is required'}
      />
    </form>
  );
};

export default LoginForm;
