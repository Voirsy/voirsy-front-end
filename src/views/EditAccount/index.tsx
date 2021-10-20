import { Button, Stack, TextField, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { DesktopDatePicker } from '@mui/lab';

interface EditAccountForm {
  fullname: string;
  email: string;
  birthdate: string;
  phonenumber: string;
}

const EditAccount = () => {
  const [translation] = useTranslation();
  const { handleSubmit, control } = useForm<EditAccountForm>({
    defaultValues: {
      fullname: 'Alex Smith',
      email: 'alex@gmail.com',
      birthdate: '2014-08-18T00:00:00',
      phonenumber: '324562647',
    },
  });

  const onSubmit: SubmitHandler<EditAccountForm> = (data) => console.log(data);

  return (
    <main>
      <Typography variant="h3" component="h1" textAlign="center">
        {translation('profile:edit.heading')}
      </Typography>
      <Box maxWidth={400} margin="50px auto 0" component="form" onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={2.5}>
          <Controller
            name="fullname"
            control={control}
            render={({ field }) => (
              <TextField fullWidth label={translation('profile:edit.input.fullname')} {...field} />
            )}
          />
          <Controller
            name="email"
            control={control}
            render={({ field }) => (
              <TextField fullWidth label={translation('profile:edit.input.email')} type="email" {...field} />
            )}
          />
          <Controller
            name="birthdate"
            control={control}
            render={({ field }) => (
              <DesktopDatePicker
                inputFormat="dd-MM-yyyy"
                label={translation('profile:edit.input.birthdate')}
                onChange={field.onChange}
                value={field.value}
                renderInput={(params) => <TextField fullWidth {...params} {...field} />}
              />
            )}
          />
          <Controller
            name="phonenumber"
            control={control}
            render={({ field }) => (
              <TextField fullWidth label={translation('profile:edit.input.phonenumber')} type="tel" {...field} />
            )}
          />
          <Box display="flex" gap={2.5}>
            <Button variant="outlined" fullWidth size="large" color="info" component={Link} to="/">
              {translation('profile:edit.action.cancel')}
            </Button>
            <Button variant="contained" fullWidth size="large" type="submit">
              {translation('profile:edit.action.save')}
            </Button>
          </Box>
        </Stack>
      </Box>
    </main>
  );
};

export default EditAccount;
