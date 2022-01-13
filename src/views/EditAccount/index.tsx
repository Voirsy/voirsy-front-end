import { Button, CircularProgress, Stack, TextField, Typography } from '@mui/material';
import { MobileDatePicker } from '@mui/lab';
import { Box } from '@mui/system';
import InputMask from 'react-input-mask';
import { useTranslation } from 'react-i18next';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import CancelButton from 'components/CancelButton';
import ProfileAvatar from 'components/ProfileAvatar';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'store/store';
import { ChangeUserData, useChangeUserDataMutation } from 'store/api/profile';
import { useSnackbar } from 'notistack';
import { setUserData } from 'store/slices/userSlice';
import axios from 'axios';
import { IMAGE } from 'endpoints/images';
import { ENV } from 'config/enviroments';

interface EditAccountForm {
  fullname: string;
  email: string;
  birthdate: string;
  phone: string;
}

const EditAccount = () => {
  const [isLoading, setLoading] = useState(false);
  const [imgToSend, setImgToSend] = useState<FormData | null>(null);
  const [changeUserData, { isSuccess, isError, data: changedData }] = useChangeUserDataMutation();
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const userData = useSelector((state: RootState) => state.user);
  const [img, setImg] = useState(userData?.avatarUrl || undefined);
  const [translation] = useTranslation(['profile', 'validation']);
  const {
    handleSubmit,
    control,
    setValue,
    register,
    formState: { errors },
  } = useForm<EditAccountForm>({
    defaultValues: {
      fullname: userData?.fullname,
      email: userData?.email,
      birthdate: userData?.birthdate || '',
      phone: userData?.phone || '',
    },
    mode: 'all',
  });

  const handleChangeImg = (file: any) => {
    const formData = new FormData();
    if (file && file.length > 0 && file[0].preview.url) {
      setImg(file[0].preview.url);
      formData.append('avatar', file[0]);
      setImgToSend(formData);
    } else setImgToSend(null);
  };

  const onSubmit: SubmitHandler<EditAccountForm> = async (data) => {
    const dataToSend: ChangeUserData = { ...data };

    try {
      setLoading(true);
      let link: null | string = null;
      if (imgToSend !== null) {
        const response = await axios.post(`${ENV.apiUrl}${IMAGE.UPLOAD}`, imgToSend);
        console.log(response);
        if (response && (response.data.links as string[]) && (response.data.links as string[]).length === 1)
          link = response.data.links[0];
      }

      if (link !== null) dataToSend.avatarUrl = link;

      changeUserData(dataToSend);
      setLoading(false);
    } catch {
      enqueueSnackbar(translation('edit.errorMsg'), { variant: 'error' });
    }
  };

  useEffect(() => {
    if (isSuccess) enqueueSnackbar(translation('edit.successMsg'), { variant: 'success' });
    if (isError) enqueueSnackbar(translation('edit.errorMsg'), { variant: 'error' });
    if (changedData) dispatch(setUserData(changedData));
  }, [isSuccess, isError, changedData]);

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
            name="phone"
            control={control}
            rules={{
              pattern: {
                value: /^$|^___-___-___$|^[0-9]{3}-[0-9]{3}-[0-9]{3}$/,
                message: translation('validation:common.invalidFormat', { format: 'phone number' }),
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
            <Button
              disabled={isLoading}
              variant="contained"
              fullWidth
              size="large"
              type="submit"
              sx={{ color: 'common.white' }}
            >
              {isLoading ? <CircularProgress size={25} /> : translation('edit.action.save')}
            </Button>
          </Stack>
        </Stack>
      </Box>
    </Box>
  );
};

export default EditAccount;
