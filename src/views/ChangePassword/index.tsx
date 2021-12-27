import { Button, Stack, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { useTranslation } from 'react-i18next';
import PasswordTextfield from 'components/PasswordTextfield';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import CancelButton from 'components/CancelButton';
import { useRef } from 'react';

interface ChangePasswordForm {
  currentPassword: string;
  newPassword: string;
}

const ChangePassword = () => {
  const [translation] = useTranslation(['profile', 'validation']);
  const { handleSubmit, control, watch } = useForm<ChangePasswordForm>({
    defaultValues: { currentPassword: '', newPassword: '' },
    mode: 'all',
  });

  const currentPassword = useRef({});
  currentPassword.current = watch('currentPassword', '');

  const onSubmit: SubmitHandler<ChangePasswordForm> = (data) => console.log(data);

  return (
    <Box component="main" maxWidth={400} margin="0 auto" padding={2}>
      <Typography marginBottom={6} variant="h4" component="h1" textAlign="center">
        {translation('password.heading')}
      </Typography>
      <Box component="form" onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={2.5}>
          <Controller
            name="currentPassword"
            control={control}
            rules={{
              required: translation('common.required') as string,
              minLength: {
                value: 8,
                message: translation('common.minLength', { min: 8 }),
              },
            }}
            render={({ field, fieldState: { error } }) => (
              <PasswordTextfield label={translation('password.input.currentPassword')} error={error} {...field} />
            )}
          />
          <Controller
            name="newPassword"
            control={control}
            rules={{
              required: translation('common.required') as string,
              validate: (value) => value !== currentPassword.current || (translation('password.cantMatch') as string),
              minLength: {
                value: 8,
                message: translation('common.minLength', { min: 8 }),
              },
            }}
            render={({ field, fieldState: { error } }) => (
              <PasswordTextfield label={translation('password.input.newPassword')} error={error} {...field} />
            )}
          />
          <Stack direction="row" spacing={2.5}>
            <CancelButton>{translation('delete.action.cancel')}</CancelButton>
            <Button variant="contained" fullWidth size="large" type="submit" sx={{ color: 'common.white' }}>
              {translation('password.action.save')}
            </Button>
          </Stack>
        </Stack>
      </Box>
    </Box>
  );
};

export default ChangePassword;
