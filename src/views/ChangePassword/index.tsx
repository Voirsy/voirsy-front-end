import { Button, Stack, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { useTranslation } from 'react-i18next';
import PasswordTextfield from 'components/PasswordTextfield';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import CancelButton from 'components/CancelButton';

const schema = yup
  .object({
    currentPassword: yup.string().min(8, 'Must be minimum 8 characters').required('Field is required'),
    newPassword: yup
      .string()
      .min(8, 'Must be minimum 8 characters')
      .required('Field is required')
      .notOneOf([yup.ref('currentPassword'), null], 'Passwords must be different'),
  })
  .required();

interface ChangePasswordForm {
  currentPassword: string;
  newPassword: string;
}

const ChangePassword = () => {
  const [translation] = useTranslation();
  const { handleSubmit, control } = useForm<ChangePasswordForm>({
    defaultValues: { currentPassword: '', newPassword: '' },
    resolver: yupResolver(schema),
    mode: 'onBlur',
  });

  const onSubmit: SubmitHandler<ChangePasswordForm> = (data) => console.log(data);

  return (
    <Box component="main" maxWidth={400} margin="0 auto" padding={2}>
      <Typography marginBottom={6} variant="h3" component="h1" textAlign="center">
        {translation('profile:password.heading')}
      </Typography>
      <Box component="form" onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={2.5}>
          <Controller
            rules={{ required: true }}
            name="currentPassword"
            control={control}
            render={({ field, fieldState: { error } }) => (
              <PasswordTextfield
                label={translation('profile:password.input.currentPassword')}
                error={error}
                {...field}
              />
            )}
          />
          <Controller
            rules={{ required: true }}
            name="newPassword"
            control={control}
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
