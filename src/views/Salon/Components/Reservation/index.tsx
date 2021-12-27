import { Box, Button, CircularProgress, Modal, Stack, TextField, Typography } from '@mui/material';
import { Search } from '@mui/icons-material';
import { useState } from 'react';
import { DatePicker, DateRangePicker } from '@mui/lab';
import { RangeInput } from '@mui/lab/DateRangePicker/RangeTypes';
import { useFetchServiceQuery } from 'store/api/salon';
import { useParams } from 'react-router-dom';
import { CustomWrapper } from 'views/Salon/salon.styled';
import { CustomServiceHeading } from '../Information/information.styled';
import { calculateServiceDuration } from '../../../../helpers/util';

const Reservation = ({ serviceName }: { serviceName: string }) => {
  const { salonId, serviceId } = useParams<{ salonId: string; serviceId: string }>();
  const { data, isFetching } = useFetchServiceQuery({ salonId, serviceId });
  const [date, setDate] = useState(new Date());
  const [range, setRange] = useState<RangeInput<Date>>([new Date(), new Date()]);

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

  const { name, duration, price } = data;

  return (
    <Stack spacing={2.5} height="100%">
      <Stack direction="row" justifyContent="space-between" alignItems="center" marginBottom={1}>
        <Typography variant="h6" noWrap>
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
        <Box height="100%">
          <p>{serviceName}</p>
        </Box>
      </Stack>
      <Box padding={2} display="flex" justifyContent="center" alignItems="center">
        <Button variant="contained">book</Button>
      </Box>
    </Stack>
  );
};

export default Reservation;
