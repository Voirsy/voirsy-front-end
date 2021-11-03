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
  const [t] = useTranslation();
  const [translation] = useTranslation();
  const { handleSubmit, control, watch } = useForm<ChangePasswordForm>({
    defaultValues: { currentPassword: '', newPassword: '' },
    mode: 'all',
  });

  const currentPassword = useRef({});
  currentPassword.current = watch('currentPassword', '');

  const onSubmit: SubmitHandler<ChangePasswordForm> = (data) => console.log(data);

  return (
    <Box component="main" maxWidth={400} margin="0 auto" padding={2}>
      <Typography marginBottom={6} variant="h3" component="h1" textAlign="center">
        {translation('profile:password.heading')}
      </Typography>
      <Box component="form" onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={2.5}>
          <Controller
            name="currentPassword"
            control={control}
            rules={{
              required: t('validation:common.required') as string,
              minLength: {
                value: 8,
                message: t('validation:common.minLength', { min: 8 }),
              },
            }}
            render={({ field, fieldState: { error } }) => (
              <PasswordTextfield
                label={translation('profile:password.input.currentPassword')}
                error={error}
                {...field}
              />
            )}
          />
          <Controller
            name="newPassword"
            control={control}
            rules={{
              required: t('validation:common.required') as string,
              validate: (value) => value !== currentPassword.current || (t('validation:password.cantMatch') as string),
              minLength: {
                value: 8,
                message: t('validation:common.minLength', { min: 8 }),
              },
            }}
            render={({ field, fieldState: { error } }) => (
              <PasswordTextfield label={translation('profile:password.input.newPassword')} error={error} {...field} />
            )}
          />
          <Stack direction="row" spacing={2.5}>
            <CancelButton>{translation('profile:delete.action.cancel')}</CancelButton>
            <Button variant="contained" fullWidth size="large" type="submit" sx={{ color: 'common.white' }}>
              {translation('profile:password.action.save')}
            </Button>
          </Stack>
        </Stack>
      </Box>
    </Box>
  );
};

export default ChangePassword;
