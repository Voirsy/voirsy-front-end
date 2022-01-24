import { Box, Button, Container, Grid, Stack, Step, StepLabel, Stepper, Typography } from '@mui/material';
import axios from 'axios';
import { ENV } from 'config/enviroments';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { useCreateSalonMutation } from 'store/api/admin/admin';
import { RootState } from 'store/store';
import { useSnackbar } from 'notistack';
import { useHistory } from 'react-router-dom';
import Details from './Components/Details';
import OpeningHours from './Components/OpeningHours';
import Crew from './Components/Crew';
import Service from './Components/Service';
import { CreateSalonFormArguments } from './createSalonForm.types';

const CreateSalonForm = () => {
  const [translation] = useTranslation(['admin', 'common', 'validation']);
  const stepsLabel = [
    translation('createSalon.stepsLabel.details'),
    translation('createSalon.stepsLabel.openingHours'),
    translation('createSalon.stepsLabel.crew'),
    translation('createSalon.stepsLabel.services'),
  ];
  const stepsTitle = [
    translation('createSalon.stepsTitle.details'),
    translation('createSalon.stepsTitle.openingHours'),
    translation('createSalon.stepsTitle.crew'),
    translation('createSalon.stepsTitle.services'),
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
  } = useForm<CreateSalonFormArguments>({
    mode: 'onBlur',
  });
  const [createSalon, { isSuccess, isError }] = useCreateSalonMutation();
  const userId = useSelector((state: RootState) => state.user?.id);
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

  return (
    <Container maxWidth={false}>
      <Box sx={{ marginBottom: 2 }}>
        <Typography component="h1" variant="h5">
          {translation('createSalon.mainHeading')}
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
                        return <Details register={register} errors={errors} setValue={setValue} />;
                      case 1:
                        return <OpeningHours register={register} />;
                      case 2:
                        return <Crew register={register} watch={watch} setValue={setValue} getValues={getValues} />;
                      case 3:
                        return (
                          <Service
                            register={register}
                            watch={watch}
                            setValue={setValue}
                            getValues={getValues}
                            reset={reset}
                            errors={errors}
                          />
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
              {translation('createSalon.controls.back')}
            </Button>
            <Button variant="contained" onClick={() => handleStepChange('next')} disableElevation type="button">
              {activeStep === stepsLabel.length - 1
                ? translation('createSalon.controls.save')
                : translation('createSalon.controls.next')}
            </Button>
          </Stack>
        </Container>
      </Stack>
    </Container>
  );
};

export default CreateSalonForm;
