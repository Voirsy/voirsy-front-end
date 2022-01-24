import { Add, DeleteOutlined } from '@mui/icons-material';
import {
  Button,
  Divider,
  IconButton,
  InputAdornment,
  List,
  ListItem,
  ListItemText,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { useTranslation } from 'react-i18next';
import { ServiceProps } from './service.types';

const Service = ({ register, watch, errors, getValues, setValue, reset }: ServiceProps) => {
  const [translation] = useTranslation(['admin']);
  const addedServices = watch('services');

  const handleServiceAdd = () => {
    const servicesArray = getValues('services');
    const service = getValues('service');
    if (Array.isArray(servicesArray)) {
      servicesArray.push(service);
      setValue('services', servicesArray);
    } else {
      setValue('services', [service]);
    }
    reset({ ...getValues(), service: {} });
  };

  const handleServiceDelete = (index: number) => {
    const servicesArray = getValues('services');
    servicesArray.splice(index, 1);
    setValue('services', servicesArray);
  };

  return (
    <>
      <Stack spacing={2}>
        <TextField
          size="small"
          variant="outlined"
          label={translation('admin:serviceDialog.name')}
          {...register('service.name')}
          error={!!errors.name}
          helperText={errors.name?.message}
        />
        <TextField
          size="small"
          variant="outlined"
          label={translation('admin:serviceDialog.price')}
          type="number"
          {...register('service.price')}
          InputProps={{
            endAdornment: <InputAdornment position="start">€</InputAdornment>,
            inputProps: { min: 0 },
          }}
          error={!!errors.price}
          helperText={errors.price?.message}
        />
        <TextField
          size="small"
          variant="outlined"
          label={translation('admin:serviceDialog.duration')}
          type="number"
          multiline
          maxRows={4}
          {...register('service.duration')}
          InputProps={{
            endAdornment: <InputAdornment position="start">min</InputAdornment>,
            inputProps: { min: 0, step: 1 },
          }}
          error={!!errors.duration}
          helperText={errors.duration?.message}
        />
        <TextField
          size="small"
          variant="outlined"
          label={translation('admin:serviceDialog.description')}
          {...register('service.description')}
          error={!!errors.description}
          helperText={errors.description?.message}
        />
        <Button onClick={handleServiceAdd} endIcon={<Add />} variant="outlined">
          {translation('createSalon.forms.services.addButton')}
        </Button>
      </Stack>
      <Typography variant="body1" component="p">
        {translation('createSalon.forms.services.heading')}:
      </Typography>
      <List>
        {addedServices &&
          addedServices.map((service: any, index: number) => (
            <>
              <ListItem
                key={index}
                secondaryAction={
                  <IconButton edge="end" aria-label="delete" onClick={() => handleServiceDelete(index)}>
                    <DeleteOutlined />
                  </IconButton>
                }
              >
                <ListItemText
                  primary={service.name}
                  secondary={
                    <List sx={{ width: '100%' }}>
                      <ListItem>
                        <Typography variant="body2" component="p">
                          {translation('createSalon.forms.services.cards.price')}: {service.price}€
                        </Typography>
                      </ListItem>
                      <ListItem>
                        <Typography variant="body2" component="p">
                          {translation('createSalon.forms.services.cards.duration')}: {service.duration} min
                        </Typography>
                      </ListItem>
                      <ListItem>
                        <Typography variant="body2" component="p">
                          {translation('createSalon.forms.services.cards.description')}: {service.description}
                        </Typography>
                      </ListItem>
                    </List>
                  }
                ></ListItemText>
              </ListItem>
              {index < addedServices.length - 1 && <Divider />}
            </>
          ))}
      </List>
    </>
  );
};

export default Service;
