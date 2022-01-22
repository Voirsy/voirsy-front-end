import { Add, DeleteOutlined, ImageOutlined } from '@mui/icons-material';
import {
  Avatar,
  Box,
  Button,
  Chip,
  Container,
  Divider,
  Grid,
  IconButton,
  InputAdornment,
  List,
  ListItem,
  ListItemText,
  MenuItem,
  Paper,
  Stack,
  Step,
  StepLabel,
  Stepper,
  TextField,
  Typography,
} from '@mui/material';
import axios from 'axios';
import { ENV } from 'config/enviroments';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { useCreateSalonMutation } from 'store/api/admin/admin';
import { useFetchAllCategoriesQuery, useFetchAllCitiesQuery } from 'store/api/home/home';
import { RootState } from 'store/store';
import { useSnackbar } from 'notistack';
import { useHistory } from 'react-router-dom';

const CreateSalonForm = () => {
  const stepsLabel = ['Details', 'Opening hours', 'Crew', 'Services'];
  const stepsTitle = [
    "Let's provide some informations",
    'Time of your work',
    'Introduce your crew',
    'What services will be provided?',
  ];
  const [activeStep, setActiveStep] = useState<number>(0);
  const {
    register,
    handleSubmit,
    watch,
    getValues,
    setValue,
    reset,
    formState: { errors },
  } = useForm({
    mode: 'onBlur',
  });
  const addedCrew = watch('crew');
  const addedServices = watch('services');
  const [translation] = useTranslation('admin');
  const [imagePreview, setImagePreview] = useState<string | undefined>(undefined);
  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  const [createSalon, { isSuccess, isError }] = useCreateSalonMutation();
  const userId = useSelector((state: RootState) => state.user?.id);
  const { data: cities } = useFetchAllCitiesQuery();
  const { data: types } = useFetchAllCategoriesQuery();
  const { enqueueSnackbar } = useSnackbar();
  const history = useHistory();

  useEffect(() => {
    if (isSuccess) {
      enqueueSnackbar(translation('Salon created'), {
        variant: 'success',
        anchorOrigin: { horizontal: 'right', vertical: 'bottom' },
      });
      history.push('/salons');
    }
    if (isError) {
      enqueueSnackbar(translation('Salon creation failed'), {
        variant: 'error',
        anchorOrigin: { horizontal: 'right', vertical: 'bottom' },
      });
      history.push('/salons');
    }
  }, [isSuccess, isError]);

  const createNewSalon = async (data: any) => {
    let imageUrl = '';
    if (data.image) {
      const formData = new FormData();
      formData.append('image', data.image);
      try {
        const response = await axios({
          method: 'post',
          url: `${ENV.apiUrl}/image-upload`,
          data: formData,
          headers: { 'Content-Type': 'multipart/form-data' },
        });
        imageUrl = response.data.links[0];
      } catch (error) {
        console.error(error);
      }
    }
    const openingHoursKeys = Object.keys(data.openingHours);
    const openingHours = openingHoursKeys.map((key) => ({
      name: key.toLowerCase(),
      ...data.openingHours[key],
    }));
    const { name, address, city, services, crew, description, type } = data;

    createSalon({
      owner: userId,
      name,
      address,
      city,
      services,
      crew,
      description,
      type: [type],
      imageUrl,
      openingHours,
      contact: { email: data.contactEmail, phone: data.phone },
    });
  };

  const handleStepChange = (step: string): void => {
    if (step === 'next') {
      if (activeStep === stepsLabel.length - 1) {
        handleSubmit(createNewSalon)();
      }
      if (activeStep + 1 < stepsLabel.length) {
        setActiveStep((prev) => prev + 1);
      }
    }
    if (step === 'back' && activeStep - 1 >= 0) {
      setActiveStep((prev) => prev - 1);
    }
  };

  const handleCrewAdd = () => {
    const crewArray = getValues('crew');
    const name = getValues('crewInput');
    const crewMember = {
      name,
      imageId: '',
    };
    if (Array.isArray(crewArray)) {
      crewArray.push(crewMember);
      setValue('crew', crewArray);
    } else {
      setValue('crew', [crewMember]);
    }
    setValue('crewInput', '');
  };

  const handleCrewDelete = (index: number) => {
    const crewArray = getValues('crew');
    crewArray.splice(index, 1);
    setValue('crew', crewArray);
  };

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

  const showImagePreview = (event: any) => {
    const file = event?.target?.files?.[0];
    const fileSrc = URL.createObjectURL(file);
    setValue('image', file);
    setImagePreview(fileSrc);
  };

  return (
    <Container maxWidth={false}>
      <Box sx={{ marginBottom: 2 }}>
        <Typography component="h1" variant="h5">
          Create salon
        </Typography>
      </Box>
      <Stack spacing={2} alignItems="center">
        <Container maxWidth="lg" disableGutters>
          <Stepper activeStep={activeStep}>
            {stepsLabel.map((step, index) => (
              <Step key={index}>
                <StepLabel>{step}</StepLabel>
              </Step>
            ))}
          </Stepper>
        </Container>
        <Container maxWidth="lg" disableGutters>
          <Typography variant="h6" component="h2">
            {stepsTitle[activeStep]}
          </Typography>
          <Grid container sx={{ marginY: 2 }} justifyContent="center">
            <Grid item xs lg={6}>
              <form>
                <Stack spacing={2}>
                  {(() => {
                    switch (activeStep) {
                      case 0:
                        return (
                          <>
                            <TextField
                              variant="outlined"
                              size="small"
                              label="Salon name"
                              type="text"
                              {...register('name', {
                                required: { value: true, message: 'Field is required' },
                                minLength: { value: 3, message: 'Minimum field length is 3' },
                              })}
                              error={!!errors.name}
                              helperText={errors.name?.message}
                            ></TextField>
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
                                    <Typography>Add photo</Typography>
                                  </Stack>
                                )}
                              </Paper>
                            </label>
                            <TextField
                              variant="outlined"
                              size="small"
                              label="Address"
                              type="text"
                              {...register('address', {
                                required: { value: true, message: 'Field is required' },
                              })}
                              error={!!errors.address}
                              helperText={errors.address?.message}
                            ></TextField>
                            <TextField
                              variant="outlined"
                              size="small"
                              label="City"
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
                              label="Postal code"
                              type="text"
                              {...register('postalCode', {
                                required: { value: true, message: 'Field is required' },
                                pattern: { value: /\d{2}[-]{0,1}\d{3}$/, message: 'Wrong postal code' },
                              })}
                              error={!!errors.postalCode}
                              helperText={errors.postalCode?.message}
                            ></TextField>
                            <TextField
                              variant="outlined"
                              size="small"
                              label="Phone"
                              type="text"
                              {...register('phone', { required: { value: true, message: 'Field is required' } })}
                              error={!!errors.phone}
                              helperText={errors.phone?.message}
                            ></TextField>
                            <TextField
                              variant="outlined"
                              size="small"
                              label="Contact email"
                              type="text"
                              {...register('contactEmail', { required: { value: true, message: 'Field is required' } })}
                              error={!!errors.contactEmail}
                              helperText={errors.contactEmail?.message}
                            ></TextField>
                            <TextField
                              variant="outlined"
                              size="small"
                              label="Type"
                              select
                              onChange={(event) => setValue('type', event.target.value)}
                              error={!!errors.type}
                              helperText={errors.type?.message}
                              defaultValue={''}
                            >
                              {types &&
                                types?.categories.map((type) => (
                                  <MenuItem key={type._id} value={type._id}>
                                    {type.name}
                                  </MenuItem>
                                ))}
                            </TextField>
                          </>
                        );
                      case 1:
                        return (
                          <>
                            <Stack direction="column" spacing={1}>
                              {days.map((day, index) => (
                                <Grid container key={index}>
                                  <Grid item container xs={3} alignItems="center">
                                    <Typography variant="body1">{day}</Typography>
                                  </Grid>
                                  <Grid item container xs alignItems="center">
                                    <TextField
                                      variant="outlined"
                                      label="From"
                                      size="small"
                                      {...register(`openingHours.${day}.open`)}
                                      margin="dense"
                                      sx={{ marginRight: 1 }}
                                    />
                                    <TextField
                                      variant="outlined"
                                      label="To"
                                      size="small"
                                      {...register(`openingHours.${day}.close`)}
                                      margin="dense"
                                    />
                                  </Grid>
                                </Grid>
                              ))}
                            </Stack>
                          </>
                        );
                      case 2:
                        return (
                          <>
                            <Stack direction="row" spacing={1}>
                              <TextField
                                variant="outlined"
                                size="small"
                                label="Fullname"
                                type="text"
                                sx={{ flexGrow: 1 }}
                                {...register('crewInput')}
                              />
                              <Button onClick={handleCrewAdd} endIcon={<Add />} variant="outlined">
                                Add
                              </Button>
                            </Stack>
                            <Typography variant="body1" component="p">
                              Crew members:
                            </Typography>
                            <Stack direction="row" spacing={1} flexWrap="wrap">
                              {addedCrew &&
                                addedCrew.map((member: { name: string; imageId: string }, index: number) => (
                                  <Chip
                                    key={index}
                                    label={member.name}
                                    avatar={<Avatar>{member.name[0]}</Avatar>}
                                    onDelete={() => handleCrewDelete(index)}
                                    color="secondary"
                                    sx={{ marginBottom: 1 }}
                                  />
                                ))}
                            </Stack>
                          </>
                        );
                      case 3:
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
                                Add
                              </Button>
                            </Stack>
                            <Typography variant="body1" component="p">
                              Services:
                            </Typography>
                            <List>
                              {addedServices &&
                                addedServices.map((service: any, index: number) => (
                                  <>
                                    <ListItem
                                      key={index}
                                      secondaryAction={
                                        <IconButton
                                          edge="end"
                                          aria-label="delete"
                                          onClick={() => handleServiceDelete(index)}
                                        >
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
                                                Price: {service.price} €
                                              </Typography>
                                            </ListItem>
                                            <ListItem>
                                              <Typography variant="body2" component="p">
                                                Duration: {service.duration} min
                                              </Typography>
                                            </ListItem>
                                            <ListItem>
                                              <Typography variant="body2" component="p">
                                                Description: {service.description}
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
                    }
                  })()}
                </Stack>
              </form>
            </Grid>
          </Grid>
          <Stack spacing={1} direction="row" justifyContent="flex-end" paddingBottom={2}>
            <Button
              variant="outlined"
              onClick={() => handleStepChange('back')}
              disabled={activeStep === 0}
              disableElevation
            >
              Back
            </Button>
            <Button variant="contained" onClick={() => handleStepChange('next')} disableElevation type="button">
              {activeStep === stepsLabel.length - 1 ? 'Save' : 'Next'}
            </Button>
          </Stack>
        </Container>
      </Stack>
    </Container>
  );
};

export default CreateSalonForm;
