import { Grid, Stack, TextField, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { Days } from '../../createSalonForm.types';
import { OpeningHoursProps } from './openingHours.types';

const OpeningHours = ({ register }: OpeningHoursProps) => {
  const [translation] = useTranslation(['admin', 'common']);
  const days: Days[] = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];

  return (
    <>
      <Stack direction="column" spacing={1}>
        {days.map((day, index) => (
          <Grid container key={index}>
            <Grid item container xs={3} alignItems="center">
              <Typography variant="body1">
                {translation(`daysOfTheWeek.${day.toLowerCase()}`, { ns: 'common' })}
              </Typography>
            </Grid>
            <Grid item container xs alignItems="center">
              <TextField
                variant="outlined"
                label={translation('createSalon.forms.openingHours.from')}
                size="small"
                {...register(`openingHours.${day.toLowerCase() as Days}.open`)}
                margin="dense"
                sx={{ marginRight: 1 }}
              />
              <TextField
                variant="outlined"
                label={translation('createSalon.forms.openingHours.to')}
                size="small"
                {...register(`openingHours.${day.toLowerCase() as Days}.close`)}
                margin="dense"
              />
            </Grid>
          </Grid>
        ))}
      </Stack>
    </>
  );
};

export default OpeningHours;
