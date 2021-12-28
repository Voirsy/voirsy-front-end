import { Box, Button, CircularProgress, Grid, Modal, Paper, Stack, TextField, Typography } from '@mui/material';
import { Search } from '@mui/icons-material';
import { useState } from 'react';
import { DatePicker, DateRangePicker } from '@mui/lab';
import { RangeInput } from '@mui/lab/DateRangePicker/RangeTypes';
import { useFetchServiceQuery } from 'store/api/salon';
import { useParams } from 'react-router-dom';
import { CustomWrapper } from 'views/Salon/salon.styled';
import { calculateServiceDuration } from 'helpers/util';
import { format } from 'date-fns';
import { useTranslation } from 'react-i18next';
import { AvailableLocales, locales } from 'config/locales';

const sortByDate = (dates: string[]) => dates.sort((a, b) => new Date(a).getTime() - new Date(b).getTime());

const splitToDays = (dates: string[]) => {
  const datesToReturn = [[dates[0]]];
  let k = 0;

  for (let i = 1; i < dates.length; i++) {
    if (datesToReturn[k][0].split('T')[0] === dates[i].split('T')[0]) {
      datesToReturn[k].push(dates[i]);
    } else {
      k++;
      datesToReturn[k] = [dates[i]];
    }
  }

  return datesToReturn;
};

const freeHours = {
  freeHours: [
    {
      workedId: '60ae96dad2396a054c3ab53e',
      startHours: [
        '2021-10-04T13:15:00.000Z',
        '2021-10-03T12:45:00.000Z',
        '2021-10-03T12:15:00.000Z',
        '2021-10-03T12:30:00.000Z',
      ],
    },
    {
      workedId: '60ae96dad2396a054c3ab53f',
      startHours: ['2021-10-03T12:45:00.000Z', '2021-10-03T12:30:00.000Z', '2021-10-03T13:00:00.000Z'],
    },
    {
      workedId: '60ae96dad2396a054c3ab53g',
      startHours: ['2021-10-04T13:00:00.000Z', '2021-10-03T12:15:00.000Z', '2021-10-03T12:30:00.000Z'],
    },
    {
      workedId: '60ae96dad2396a054c3ab53g',
      startHours: ['2021-10-03T12:15:00.000Z', '2021-10-03T12:45:00.000Z', '2021-10-04T13:00:00.000Z'],
    },
  ],
};

const Reservation = () => {
  const [, i18n] = useTranslation('salon');
  const { salonId, serviceId } = useParams<{ salonId: string; serviceId: string }>();
  const { data, isFetching } = useFetchServiceQuery({ salonId, serviceId });
  const [date, setDate] = useState(new Date());
  const [range, setRange] = useState<RangeInput<Date>>([new Date(), new Date()]);

  const lng = i18n.language as AvailableLocales;

  if (isFetching || data === undefined) {
    return (
      <Modal open>
        <CustomWrapper>
          <Box height="100vh" display="flex" alignItems="center" justifyContent="center">
            <CircularProgress />
          </Box>
        </CustomWrapper>
      </Modal>
    );
  }
  const hours = Array.from(new Set(freeHours.freeHours.map((el) => el.startHours).flat()));
  const availableHours = splitToDays(sortByDate(hours));
  const { name, duration, price } = data;

  return (
    <Stack spacing={1.5} height="100%">
      <Stack direction={{ xs: 'column', md: 'row' }} justifyContent="space-between" alignItems="center">
        <Typography variant="h5" noWrap>
          {name}
        </Typography>
        <Typography variant="h6" width="fit-content" sx={{ whiteSpace: 'nowrap' }}>
          {`${calculateServiceDuration(duration)} • ${price}$`}
        </Typography>
      </Stack>
      <Stack spacing={2.5}>
        <Typography variant="h6">Your free time</Typography>
        <Stack spacing={2.5} direction={{ xs: 'column', md: 'row' }}>
          <DatePicker
            disablePast
            label="Date"
            openTo="year"
            views={['year', 'month', 'day']}
            value={date}
            onChange={(newValue: any) => setDate(newValue)}
            renderInput={(params: any) => <TextField {...params} size="small" />}
          />
          <DateRangePicker
            startText="Check-in"
            endText="Check-out"
            value={range}
            onChange={(newValue: any) => setRange(newValue)}
            renderInput={(startProps: any, endProps: any) => (
              <>
                <TextField {...startProps} size="small" />
                <Box sx={{ mx: 2 }}> to </Box>
                <TextField {...endProps} size="small" />
              </>
            )}
          />
          <Button variant="contained" size="small">
            <Search />
          </Button>
        </Stack>
      </Stack>
      <Stack spacing={2.5} sx={{ flexGrow: 1 }}>
        <Typography variant="h6">Our free time</Typography>
        <Stack height="100%" spacing={1.5}>
          {availableHours.map((day) => (
            <Stack key={day[0]} spacing={1.5}>
              <Typography>
                {`
                  ${format(new Date(day[0]), 'd LLLL yyyy', { locale: locales[lng] })} • 
                  ${format(new Date(day[0]), 'eeee', { locale: locales[lng] })}
                `}
              </Typography>
              <Grid container spacing={2}>
                {day.map((el) => (
                  <Grid key={el} item>
                    <Paper sx={{ width: '140px', padding: 1.5 }}>
                      <Typography textAlign="center">{format(new Date(el), 'HH:mm')}</Typography>
                    </Paper>
                  </Grid>
                ))}
              </Grid>
            </Stack>
          ))}
        </Stack>
      </Stack>
      <Box padding={2} display="flex" justifyContent="center" alignItems="center">
        <Button variant="contained">book</Button>
      </Box>
    </Stack>
  );
};

export default Reservation;
