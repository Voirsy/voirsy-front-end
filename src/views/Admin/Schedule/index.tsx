import { CircularProgress, Grid, Paper, Stack, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import { useFetchSalonScheduleQuery } from 'store/api/admin/admin';

const Schedule = () => {
  const { salonId } = useParams<{ salonId: string }>();
  const { data, isFetching } = useFetchSalonScheduleQuery({ salonId });
  const [translation] = useTranslation('admin');

  if (isFetching)
    return (
      <Box flexGrow={1} display="flex" justifyContent="center" alignItems="center">
        <CircularProgress />
      </Box>
    );

  return (
    <Stack spacing={2} direction="column" paddingTop={2}>
      {data?.salon.length &&
        data.salon.map((item, index) => (
          <Paper key={index} sx={{ paddingX: 1, paddingY: 2 }}>
            <Grid container>
              <Grid item container xs={2} alignItems="center" justifyContent="center">
                <Stack direction="column" alignItems="center">
                  <Typography variant="h4">{item.start.toLocaleDateString('default', { day: '2-digit' })}</Typography>
                  <Typography variant="body2">{item.start.toLocaleString('default', { month: 'long' })}</Typography>
                </Stack>
              </Grid>
              <Grid item xs={6}>
                <Stack direction="column">
                  <Typography variant="h6">{item.worker}</Typography>
                  <Typography variant="body1">{`${translation('schedule.client')}: ${item.customer}`}</Typography>
                  <Typography variant="body2" color="text.secondary">
                    {`${translation('schedule.phone')}: ${item.phone ? item.phone : ''}`}
                  </Typography>
                </Stack>
              </Grid>
              <Grid item container xs justifyContent="flex-end">
                <Typography variant="body2">
                  {`${item.start.toLocaleTimeString('default', { timeStyle: 'short' })} - ${item.end.toLocaleTimeString(
                    'default',
                    { timeStyle: 'short' }
                  )}`}
                </Typography>
              </Grid>
            </Grid>
          </Paper>
        ))}
    </Stack>
  );
};

export default Schedule;
