import { ImageOutlined } from '@mui/icons-material';
import { MenuItem, Paper, Stack, TextField, Typography } from '@mui/material';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useFetchAllCategoriesQuery, useFetchAllCitiesQuery } from 'store/api/home/home';
import { DetailsProps } from './details.types';

const Details = ({ register, errors, setValue }: DetailsProps) => {
  const [translation] = useTranslation('admin');
  const [imagePreview, setImagePreview] = useState<string | undefined>(undefined);
  const { data: cities } = useFetchAllCitiesQuery();
  const { data: types } = useFetchAllCategoriesQuery();

  const showImagePreview = (event: any) => {
    const file = event?.target?.files?.[0];
    const fileSrc = URL.createObjectURL(file);
    setValue('image', file);
    setImagePreview(fileSrc);
  };

  return (
    <>
      <TextField
        variant="outlined"
        size="small"
        label={translation('createSalon.forms.details.name')}
        type="text"
        {...register('name', {
          required: {
            value: true,
            message: translation('common.required', { ns: 'validation' }),
          },
          minLength: {
            value: 3,
            message: translation('common.minLength', { ns: 'validation', min: 3 }),
          },
        })}
        error={!!errors.name}
        helperText={errors.name?.message}
      />
      <input
        type="file"
        id="avatar-image-upload"
        accept="image/png, image/jpeg"
        onChange={(event) => showImagePreview(event)}
        hidden
      />
      <label htmlFor="avatar-image-upload">
        <Paper elevation={0} variant="outlined" sx={{ height: '300px', cursor: 'pointer' }}>
          {imagePreview ? (
            <img src={imagePreview} width="100%" height="100%" />
          ) : (
            <Stack height="100%" justifyContent="center" alignItems="center">
              <ImageOutlined />
              <Typography>{translation('createSalon.forms.details.photo')}</Typography>
            </Stack>
          )}
        </Paper>
      </label>
      <TextField
        variant="outlined"
        size="small"
        label={translation('createSalon.forms.details.address')}
        type="text"
        {...register('address', {
          required: {
            value: true,
            message: translation('common.required', { ns: 'validation' }),
          },
        })}
        error={!!errors.address}
        helperText={errors.address?.message}
      />
      <TextField
        variant="outlined"
        size="small"
        label={translation('createSalon.forms.details.city')}
        select
        onChange={(event) => setValue('city', event.target.value)}
        error={!!errors.city}
        helperText={errors.city?.message}
        defaultValue={''}
        sx={{ textTransform: 'capitalize' }}
      >
        {cities &&
          cities?.cities.map((city) => (
            <MenuItem key={city._id} value={city._id} sx={{ textTransform: 'capitalize' }}>
              {city.name}
            </MenuItem>
          ))}
      </TextField>
      <TextField
        variant="outlined"
        size="small"
        label={translation('createSalon.forms.details.postalCode')}
        type="text"
        {...register('postalCode', {
          required: {
            value: true,
            message: translation('common.required', { ns: 'validation' }),
          },
          pattern: {
            value: /\d{2}[-]{0,1}\d{3}$/,
            message: translation('postalCode.pattern', { ns: 'validation' }),
          },
        })}
        error={!!errors.postalCode}
        helperText={errors.postalCode?.message}
      />
      <TextField
        variant="outlined"
        size="small"
        label={translation('createSalon.forms.details.phone')}
        type="text"
        {...register('phone', {
          required: {
            value: true,
            message: translation('common.required', { ns: 'validation' }),
          },
        })}
        error={!!errors.phone}
        helperText={errors.phone?.message}
      />
      <TextField
        variant="outlined"
        size="small"
        label={translation('createSalon.forms.details.email')}
        type="text"
        {...register('contactEmail', {
          required: {
            value: true,
            message: translation('common.required', { ns: 'validation' }),
          },
        })}
        error={!!errors.contactEmail}
        helperText={errors.contactEmail?.message}
      />
      <TextField
        variant="outlined"
        size="small"
        label={translation('createSalon.forms.details.type')}
        select
        onChange={(event) => setValue('type', event.target.value)}
        error={!!errors.type}
        helperText={errors.type?.message}
        defaultValue={''}
      >
        {types &&
          types?.categories.map((type) => (
            <MenuItem key={type._id} value={type._id}>
              {translation(`salonType.${type.name.toLowerCase()}`, { ns: 'common' })}
            </MenuItem>
          ))}
      </TextField>
    </>
  );
};

export default Details;
