import { Button, Stack, TextField, Typography } from '@mui/material';
import { MobileDatePicker } from '@mui/lab';
import { Box } from '@mui/system';
import InputMask from 'react-input-mask';
import { useTranslation } from 'react-i18next';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import CancelButton from 'components/CancelButton';
import ProfileAvatar from 'components/ProfileAvatar';
import { useState } from 'react';

interface EditAccountForm {
  fullname: string;
  email: string;
  birthdate: string;
  phonenumber: string;
}

const EditAccount = () => {
  const [img, setImg] = useState('https://bit.ly/2Zbhp10');
  const [translation] = useTranslation(['profile', 'validation']);
  const {
    handleSubmit,
    control,
    setValue,
    register,
    formState: { errors },
  } = useForm<EditAccountForm>({
    defaultValues: {
      fullname: 'Alex Smith',
      email: 'alex@gmail.com',
      birthdate: '2014-08-18T00:00:00',
      phonenumber: '324-562-647',
    },
    mode: 'all',
  });

  const handleChangeImg = (file: any) => {
    if (file && file.length > 0 && file[0].preview.url) {
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
      <Typography marginBottom={6} variant="h4" component="h1" textAlign="center">
        {translation('edit.heading')}
      </Typography>
      <ProfileAvatar url={img} handleChangeImg={handleChangeImg} />
      <Box component="form" onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={2.5}>
          <TextField
            variant="outlined"
            type="text"
            size="small"
            label={translation('edit.input.fullname')}
            {...register('fullname', {
              required: translation('common.required') as string,
            })}
            error={!!errors.fullname}
            helperText={!!errors.fullname && errors.fullname.message}
          />
          <TextField
            variant="outlined"
            type="email"
            size="small"
            label={translation('edit.input.email')}
            {...register('email', {
              required: translation('common.required') as string,
              minLength: {
                value: 3,
                message: translation('common.minLength', { min: '3' }),
              },
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: translation('common.invalidFormat', { format: 'email' }),
              },
            })}
            error={!!errors.email}
            helperText={!!errors.email && errors.email.message}
          />
          <Controller
            name="birthdate"
            control={control}
            rules={{
              required: translation('common.required') as string,
            }}
            render={({ field, fieldState: { error } }) => (
              <MobileDatePicker
                inputFormat="dd-MM-yyyy"
                mask="__-__-____"
                label={translation('edit.input.birthdate')}
                onChange={(date: Date | null) =>
                  setValue('birthdate', date?.toString() || '', { shouldValidate: true, shouldDirty: true })
                }
                value={field.value}
                maxDate={new Date()}
                minDate={new Date('1900-01-01')}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    {...field}
                    error={!!error}
                    helperText={error?.message}
                    fullWidth
                    size="small"
                  />
                )}
              />
            )}
          />
          <Controller
            name="phonenumber"
            control={control}
            rules={{
              required: translation('common.required') as string,
              pattern: {
                value: /^[0-9]{3}-[0-9]{3}-[0-9]{3}$/,
                message: translation('common.invalidFormat', { format: 'phone number' }),
              },
            }}
            render={({ field, fieldState: { error } }) => (
              <InputMask {...{ ...field, error: error }} mask="999-999-999">
                {(inputProps: any) => (
                  <TextField
                    {...inputProps}
                    fullWidth
                    label={translation('edit.input.phonenumber')}
                    type="tel"
                    size="small"
                    error={!!inputProps.error}
                    helperText={inputProps.error?.message}
                  />
                )}
              </InputMask>
            )}
          />
          <Stack direction="row" spacing={2.5}>
            <CancelButton>{translation('delete.action.cancel')}</CancelButton>
            <Button variant="contained" fullWidth size="large" type="submit" sx={{ color: 'common.white' }}>
              {translation('edit.action.save')}
            </Button>
          </Stack>
        </Stack>
      </Box>
    </Box>
  );
};

export default EditAccount;
