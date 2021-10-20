import { Button, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import PasswordTextfield from 'components/PasswordTextfield';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';

interface ChangePasswordForm {
  currentPassword: string;
  newPassword: string;
}

const ChangePassword = () => {
  const [translation] = useTranslation();
  const { handleSubmit, control } = useForm<ChangePasswordForm>({
    defaultValues: { currentPassword: '', newPassword: '' },
  });

  const onSubmit: SubmitHandler<ChangePasswordForm> = (data) => console.log(data);

  return (
    <main>
      <Typography variant="h3" component="h1" textAlign="center">
        {translation('profile:password.heading')}
      </Typography>
      <Box maxWidth={400} margin="50px auto 0" component="form" onSubmit={handleSubmit(onSubmit)}>
        <Controller
          name="currentPassword"
          control={control}
          render={({ field }) => (
            <PasswordTextfield label={translation('profile:password.input.currentPassword')} {...field} />
          )}
        />
        <Controller
          name="newPassword"
          control={control}
          render={({ field }) => (
            <PasswordTextfield label={translation('profile:password.input.newPassword')} {...field} />
          )}
        />
        <Box marginTop={1} display="flex" gap={2.5}>
          <Button variant="outlined" fullWidth size="large" color="info" component={Link} to="/">
            {translation('profile:password.action.cancel')}
          </Button>
          <Button variant="contained" fullWidth size="large" type="submit">
            {translation('profile:password.action.save')}
          </Button>
        </Box>
      </Box>
    </main>
  );
};

export default ChangePassword;
