import { CircularProgress, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { useParams } from 'react-router-dom';
import { useFetchSalonDataQuery } from 'store/api/admin';

const Edit = () => {
  const { salonId } = useParams<{ salonId: string }>();
  const { data, isFetching } = useFetchSalonDataQuery({ salonId });

  if (isFetching)
    return (
      <Box flexGrow={1} display="flex" justifyContent="center" alignItems="center">
        <CircularProgress />
      </Box>
    );

  return (
    <Box p={2}>
      <Typography sx={{ overflowWrap: 'break-word', wordBreak: 'break-all' }}>{JSON.stringify(data)}</Typography>
    </Box>
  );
};

export default Edit;
