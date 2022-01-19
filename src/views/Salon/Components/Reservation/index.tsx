import { Box, Button, CircularProgress, Grid, Modal, Stack, TextField, Typography } from '@mui/material';
import { Search } from '@mui/icons-material';
import { useEffect, useState } from 'react';
import { DatePicker, TimePicker } from '@mui/lab';
import { useConfirmReservationMutation, useFetchServiceQuery } from 'store/api/salon/salon';
import { useParams } from 'react-router-dom';
import { CustomWrapper } from 'views/Salon/salon.styled';
import { calculateServiceDuration, findWorder, sortByDate } from 'helpers/util';
import { addDays, differenceInDays, format } from 'date-fns';
import { useTranslation } from 'react-i18next';
import { AvailableLocales, locales } from 'config/locales';
import { Checkbox, Tile, TimeField } from './reservation.styled';
import { useLazyGetFreeHoursQuery } from 'store/api/salon/salon';
import { useSnackbar } from 'notistack';

const Reservation = () => {
  const { salonId, serviceId } = useParams<{ salonId: string; serviceId: string }>();
  const [getFreeHours, { data: fetchedAvailableHours, error }] = useLazyGetFreeHoursQuery();
  const { data, isFetching } = useFetchServiceQuery({ salonId, serviceId });
  const [confirmReservation, { isSuccess, isError }] = useConfirmReservationMutation();
  const [translation, i18n] = useTranslation('salon');
  const [date, setDate] = useState(new Date());
  const [timeStart, setTimeStart] = useState<null | Date>(null);
  const [timeEnd, setTimeEnd] = useState<null | Date>(null);
  const [selectedDate, setSelectedDate] = useState<null | string>(null);
  const { enqueueSnackbar } = useSnackbar();

  const lng = i18n.language as AvailableLocales;

  const handleGetFreeHours = () => {
    if (timeStart && timeEnd) {
      const diff = differenceInDays(date, timeStart) + 1;
      getFreeHours({
        salonId,
        serviceId,
        timeRange: {
          start: addDays(timeStart, diff).toString(),
          end: addDays(timeEnd, diff).toString(),
        },
      });
    }
  };

  const handleConfirmReservation = () => {
    if (selectedDate && fetchedAvailableHours) {
      const workerId = findWorder(selectedDate, fetchedAvailableHours);
      if (workerId !== null) {
        confirmReservation({ salonId, workerId, serviceId, startHour: selectedDate });
      }
    }
  };

  useEffect(() => {
    if (isError) enqueueSnackbar(translation('salon:reservation.errorMsg'), { variant: 'error' });
    if (isSuccess) enqueueSnackbar(translation('salon:reservation.successMsg'), { variant: 'success' });
  }, [isError, isSuccess]);

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

  let availableHours: string[] = [];
  if (fetchedAvailableHours && fetchedAvailableHours.freeHours.length > 0) {
    const hours = Array.from(new Set(fetchedAvailableHours.freeHours.map((el) => el.startHours).flat()));
    availableHours = sortByDate(hours);
  }

  const { name, duration, price } = data.service;

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
            value={date}
            onChange={(newValue: any) => setDate(newValue)}
            renderInput={(params) => <TextField {...params} size="small" />}
          />
          <TimePicker
            label={translation('reservation.labels.start')}
            value={timeStart}
            onChange={(newValue) => setTimeStart(newValue)}
            renderInput={(params) => <TimeField {...params} size="small" />}
            minutesStep={15}
          />
          <TimePicker
            label={translation('reservation.labels.end')}
            disabled={timeStart === null}
            value={timeEnd}
            onChange={(newValue) => setTimeEnd(newValue)}
            renderInput={(params) => <TimeField {...params} size="small" />}
            minutesStep={15}
          />
          <Button
            variant="contained"
            size="small"
            aria-label={translation('reservation.searchButton.aria')}
            disabled={timeStart === null || timeEnd === null}
            onClick={() => handleGetFreeHours()}
          >
            <Search />
          </Button>
        </Stack>
      </Stack>
      <Stack spacing={2.5} sx={{ flexGrow: 1 }}>
        <Typography variant="h6">{translation('reservation.ourFreeTimeHeading')}</Typography>
        <Stack height="100%" spacing={1.5}>
          {availableHours.length > 0 ? (
            <Stack key={availableHours[0]} spacing={0.05}>
              <Typography>
                {`
                ${format(new Date(availableHours[0]), 'd LLLL yyyy', { locale: locales[lng] })} • 
                ${format(new Date(availableHours[0]), 'eeee', { locale: locales[lng] })}
              `}
              </Typography>
              <Grid container spacing={1.5}>
                {availableHours.map((el) => (
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
          ) : (
            <Typography>{translation('reservation.noDates')}</Typography>
          )}
        </Stack>
      </Stack>
      <Box padding={2} display="flex" justifyContent="center" alignItems="center">
        <Button disabled={selectedDate === null} variant="contained" onClick={handleConfirmReservation}>
          {translation('reservation.bookButton.label')}
        </Button>
      </Box>
    </Stack>
  );
};

export default Reservation;
