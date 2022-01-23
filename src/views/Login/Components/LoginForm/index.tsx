import { ArrowForward } from '@mui/icons-material';
import { IconButton, TextField } from '@mui/material';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useHistory, useRouteMatch } from 'react-router-dom';
import { ENV } from 'config/enviroments';

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
  const [translation] = useTranslation('login');

  const submitForm = async (data: { email: string }) => {
    const result = await axios.post<ServerResponse>(`${ENV.apiUrl}/auth/checkemail`, data);
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
    <form onSubmit={handleSubmit(submitForm)} data-testid="form">
      <TextField
        variant="outlined"
        type="text"
        size="small"
        inputProps={{ 'data-testid': 'Email' }}
        label={translation('form.email.label')}
        InputProps={{
          endAdornment: (
            <IconButton edge="end" type="submit" color="primary" disabled={!isDirty || !isValid} data-testid="Submit">
              <ArrowForward />
            </IconButton>
          ),
        }}
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
        helperText={errors.email && errors.email.message}
      />
    </form>
  );
};

export default LoginForm;
