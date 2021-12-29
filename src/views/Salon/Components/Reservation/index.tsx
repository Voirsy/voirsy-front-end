import { Box, Button, CircularProgress, Grid, Modal, Stack, TextField, Typography } from '@mui/material';
import { Search } from '@mui/icons-material';
import { useState } from 'react';
import { DatePicker, TimePicker } from '@mui/lab';
import { useFetchServiceQuery } from 'store/api/salon';
import { useParams } from 'react-router-dom';
import { CustomWrapper } from 'views/Salon/salon.styled';
import { calculateServiceDuration, sortByDate, splitToDays } from 'helpers/util';
import { format } from 'date-fns';
import { useTranslation } from 'react-i18next';
import { AvailableLocales, locales } from 'config/locales';
import { Checkbox, Tile, TimeField } from './reservation.styled';
import { freeHours } from './reservation.data';

const Reservation = () => {
  const [translation, i18n] = useTranslation('salon');
  const { salonId, serviceId } = useParams<{ salonId: string; serviceId: string }>();
  const { data, isFetching } = useFetchServiceQuery({ salonId, serviceId });
  const [date, setDate] = useState(new Date());
  const [timeStart, setTimeStart] = useState<null | string>(null);
  const [timeEnd, setTimeEnd] = useState<null | string>(null);
  const [selectedDate, setSelectedDate] = useState<null | string>(null);

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
        <Typography variant="h6">{translation('reservation.yourFreeTimeHeading')}</Typography>
        <Stack spacing={2.5} direction={{ xs: 'column', md: 'row' }}>
          <DatePicker
            disablePast
            label={translation('reservation.labels.date')}
            openTo="year"
            views={['year', 'month', 'day']}
            value={date}
            onChange={(newValue: any) => setDate(newValue)}
            renderInput={(params) => <TextField {...params} size="small" />}
          />
          <TimePicker
            label={translation('reservation.labels.start')}
            value={timeStart}
            onChange={(newValue) => setTimeStart(newValue)}
            renderInput={(params) => <TimeField {...params} size="small" />}
          />
          <TimePicker
            label={translation('reservation.labels.end')}
            disabled={timeStart === null}
            value={timeEnd}
            onChange={(newValue) => setTimeEnd(newValue)}
            renderInput={(params) => <TimeField {...params} size="small" />}
          />
          <Button variant="contained" size="small" aria-label={translation('reservation.searchButton.aria')}>
            <Search />
          </Button>
        </Stack>
      </Stack>
      <Stack spacing={2.5} sx={{ flexGrow: 1 }}>
        <Typography variant="h6">{translation('reservation.ourFreeTimeHeading')}</Typography>
        <Stack height="100%" spacing={1.5}>
          {availableHours.map((day) => (
            <Stack key={day[0]} spacing={0.05}>
              <Typography>
                {`
                  ${format(new Date(day[0]), 'd LLLL yyyy', { locale: locales[lng] })} • 
                  ${format(new Date(day[0]), 'eeee', { locale: locales[lng] })}
                `}
              </Typography>
              <Grid container spacing={1.5}>
                {day.map((el) => (
                  <Grid key={el} item>
                    <Tile isActive={el === selectedDate}>
                      <Checkbox
                        type="radio"
                        value={el}
                        checked={selectedDate === el}
                        onChange={() => setSelectedDate(el)}
                      />
                      <Typography textAlign="center">{format(new Date(el), 'HH:mm')}</Typography>
                    </Tile>
                  </Grid>
                ))}
              </Grid>
            </Stack>
          ))}
        </Stack>
      </Stack>
      <Box padding={2} display="flex" justifyContent="center" alignItems="center">
        <Button disabled={selectedDate === null} variant="contained">
          {translation('reservation.bookButton.label')}
        </Button>
      </Box>
    </Stack>
  );
};

export default Reservation;
