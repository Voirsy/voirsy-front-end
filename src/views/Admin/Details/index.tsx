import { AddOutlined, ExpandMoreOutlined } from '@mui/icons-material';
import {
  CircularProgress,
  Stack,
  TextField,
  Typography,
  Grid,
  Button,
  IconButton,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  List,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from '@mui/material';
import { Box } from '@mui/system';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useFetchSalonDataQuery } from 'store/api/admin';
import { RootState } from 'store/store';
import theme from 'theme';
import CrewDialog from './crewDialog';
import { CustomPaper } from './details.styles';
import ServiceDialog from './serviceDialog';

const Edit = () => {
  const { salonId } = useParams<{ salonId: string }>();
  const { data, isFetching } = useFetchSalonDataQuery({ salonId });
  const {
    register,
    handleSubmit,
    setValue,
    formState: { isDirty },
  } = useForm();
  const currency = useSelector((state: RootState) => state.user?.currency);
  const [isServiceDialogOpen, setIsServiceDialogOpen] = useState<boolean>(false);
  const [isCrewDialogOpen, setIsCrewDialogOpen] = useState<boolean>(false);
  const [translation] = useTranslation('admin');

  useEffect(() => {
    if (!isFetching) {
      setValue('salonName', data?.name, { shouldDirty: false });
      setValue('address', data?.address, { shouldDirty: false });
      setValue('city', data?.city, { shouldDirty: false });
      setValue('phone', data?.phone, { shouldDirty: false });
      setValue('description', data?.description, { shouldDirty: false });
    }
  }, [data, isFetching]);

  if (isFetching)
    return (
      <Box flexGrow={1} display="flex" justifyContent="center" alignItems="center">
        <CircularProgress />
      </Box>
    );

  return (
    <>
      <Grid container spacing={2} paddingY={2}>
        <Grid item direction="column" xs={12} lg={6}>
          <Stack spacing={2}>
            <CustomPaper variant="outlined">
              <Grid container justifyContent="space-between" alignItems="center" marginBottom={2}>
                <Typography component="h3" variant="h6">
                  {translation('details.informations.title')}
                </Typography>
                <Button variant="text" size="small" disabled={!isDirty}>
                  {translation('confirmButton')}
                </Button>
              </Grid>

              <form>
                <Stack spacing={2}>
                  <TextField
                    variant="outlined"
                    label={translation('details.informations.salonName')}
                    size="small"
                    {...register('salonName')}
                  />
                  <TextField
                    variant="outlined"
                    label={translation('details.informations.address')}
                    size="small"
                    {...register('address')}
                  />
                  <TextField
                    variant="outlined"
                    label={translation('details.informations.city')}
                    size="small"
                    {...register('city')}
                  />
                  <TextField
                    variant="outlined"
                    label={translation('details.informations.phone')}
                    size="small"
                    {...register('phone')}
                  />
                  <TextField
                    variant="outlined"
                    label={translation('details.informations.description')}
                    size="small"
                    multiline
                    maxRows={4}
                    {...register('description')}
                  />
                </Stack>
              </form>
            </CustomPaper>
            <CustomPaper variant="outlined">
              <Grid container justifyContent="space-between" alignItems="center">
                <Typography component="h3" variant="h6">
                  {translation('details.crew.title')}
                </Typography>
                <IconButton size="small" color="primary" onClick={() => setIsCrewDialogOpen(true)}>
                  <AddOutlined />
                </IconButton>
              </Grid>
              <List>
                {data?.crew &&
                  data.crew.map((person) => (
                    <ListItem key={person._id}>
                      <ListItemAvatar>
                        <Avatar src={person.imageUrl}></Avatar>
                      </ListItemAvatar>
                      <ListItemText primary={person.name} />
                    </ListItem>
                  ))}
              </List>
            </CustomPaper>
          </Stack>
        </Grid>
        <Grid item container xs={12} lg={6} alignItems="stretch">
          <CustomPaper variant="outlined">
            <Grid container justifyContent="space-between" alignItems="center" marginBottom={1}>
              <Typography component="h3" variant="h6">
                {translation('details.services.title')}
              </Typography>
              <IconButton size="small" color="primary" onClick={() => setIsServiceDialogOpen(true)}>
                <AddOutlined />
              </IconButton>
            </Grid>
            {data?.services &&
              data.services.map((service) => (
                <Accordion key={service._id} elevation={0}>
                  <AccordionSummary expandIcon={<ExpandMoreOutlined />}>
                    <Stack>
                      <Typography variant="subtitle1" component="p">
                        {service.name}
                      </Typography>
                      <Stack direction="row" spacing={1} color={theme.palette.text.secondary}>
                        <Typography variant="body2" component="p">
                          {`${translation('details.services.price')}: ${service.price} ${currency}`}
                        </Typography>
                        <Typography variant="body2" component="p">
                          {`${translation('details.services.duration')}: ${service.duration} min`}
                        </Typography>
                      </Stack>
                    </Stack>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Typography variant="body2" component="p">
                      {service.description}
                    </Typography>
                  </AccordionDetails>
                </Accordion>
              ))}
          </CustomPaper>
        </Grid>
      </Grid>
      <ServiceDialog open={isServiceDialogOpen} close={() => setIsServiceDialogOpen(false)} />
      <CrewDialog open={isCrewDialogOpen} close={() => setIsCrewDialogOpen(false)} />
    </>
  );
};

export default Edit;
