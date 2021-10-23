import { Button, Stack, TextField, Typography } from '@mui/material';
import { DesktopDatePicker } from '@mui/lab';
import { Box } from '@mui/system';
import InputMask from 'react-input-mask';
import { useTranslation } from 'react-i18next';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import CancelButton from 'components/CancelButton';
import { editAccountSchema } from 'validation/profile';
import ProfileAvatar from 'components/ProfileAvatar';
import { useEffect, useState } from 'react';

interface EditAccountForm {
  fullname: string;
  email: string;
  birthdate: string;
  phonenumber: string;
}

const EditAccount = () => {
  const [img, setImg] = useState('https://bit.ly/2Zbhp10');

  const [translation] = useTranslation();
  const { handleSubmit, control, setValue } = useForm<EditAccountForm>({
    defaultValues: {
      fullname: 'Alex Smith',
      email: 'alex@gmail.com',
      birthdate: '2014-08-18T00:00:00',
      phonenumber: '324-562-647',
    },
    resolver: yupResolver(editAccountSchema),
    mode: 'onBlur',
  });

  const handleChangeImg = (file: any) => {
    if (file && file[0].preview.url) {
      setImg(file[0].preview.url);

      //preparation for send
      //the image will be sent separately from the form data
      const formData = new FormData();
      formData.append('avatar', new Blob([file], { type: file.type }), file.name || 'file');
    }
  };

  const onSubmit: SubmitHandler<EditAccountForm> = (data) => console.log(data);

  return (
    <Box component="main" maxWidth={400} margin="0 auto" padding={2}>
      <Typography marginBottom={6} variant="h3" component="h1" textAlign="center">
        {translation('profile:edit.heading')}
      </Typography>
      <ProfileAvatar url={img} handleChangeImg={handleChangeImg} />
      <Box component="form" onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={2.5}>
          <Controller
            name="fullname"
            control={control}
            render={({ field, fieldState: { error } }) => (
              <TextField
                {...field}
                fullWidth
                label={translation('profile:edit.input.fullname')}
                error={!!error}
                helperText={error?.message}
              />
            )}
          />
          <Controller
            name="email"
            control={control}
            render={({ field, fieldState: { error } }) => (
              <TextField
                {...field}
                fullWidth
                label={translation('profile:edit.input.email')}
                type="email"
                error={!!error}
                helperText={error?.message}
              />
            )}
          />
          <Controller
            name="birthdate"
            control={control}
            render={({ field, fieldState: { error } }) => (
              <DesktopDatePicker
                inputFormat="dd-MM-yyyy"
                mask="__-__-____"
                label={translation('profile:edit.input.birthdate')}
                onChange={(date) =>
                  setValue('birthdate', date?.toString() || '', { shouldValidate: true, shouldDirty: true })
                }
                value={field.value}
                maxDate={new Date()}
                minDate={new Date('1900-01-01T00:00:00')}
                renderInput={(params) => (
                  <TextField {...params} {...field} error={!!error} helperText={error?.message} fullWidth />
                )}
              />
            )}
          />
          <Controller
            name="phonenumber"
            control={control}
            render={({ field, fieldState: { error } }) => (
              <InputMask {...{ ...field, error: error }} mask="999-999-999">
                {(inputProps: any) => (
                  <TextField
                    {...inputProps}
                    fullWidth
                    label={translation('profile:edit.input.phonenumber')}
                    type="tel"
                    error={!!inputProps.error}
                    helperText={inputProps.error?.message}
                  />
                )}
              </InputMask>
            )}
          />
          <Stack direction="row" spacing={2.5}>
            <CancelButton>{translation('profile:delete.action.cancel')}</CancelButton>
            <Button variant="contained" fullWidth size="large" type="submit" sx={{ color: 'common.white' }}>
              {translation('profile:edit.action.save')}
            </Button>
          </Stack>
        </Stack>
      </Box>
    </Box>
  );
};

export default EditAccount;
