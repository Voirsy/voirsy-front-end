import { Box, Button, Stack, TextField, Typography } from '@mui/material';
import { Search } from '@mui/icons-material';
import { useState } from 'react';
import { DatePicker, DateRangePicker } from '@mui/lab';
import { RangeInput } from '@mui/lab/DateRangePicker/RangeTypes';

const Reservation = ({ serviceName }: { serviceName: string }) => {
  const [date, setDate] = useState(new Date());
  const [range, setRange] = useState<RangeInput<Date>>([new Date(), new Date()]);

  return (
    <Stack spacing={3} height="100%">
      <Stack spacing={3}>
        <Typography variant="h6">Service name</Typography>
        <Typography>{serviceName}</Typography>
      </Stack>
      <Stack spacing={3}>
        <Typography variant="h6">Your free time</Typography>
        <Stack spacing={3} direction={{ xs: 'column', md: 'row' }}>
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
      <Stack spacing={3} sx={{ flexGrow: 1 }}>
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
