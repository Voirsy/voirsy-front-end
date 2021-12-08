import { CircularProgress, Modal, Stack, useMediaQuery, Box, Typography, Button } from '@mui/material';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeftRounded';
import { useParams, Link } from 'react-router-dom';
import { CustomLink, CustomSalonAddress, CustomSalonName, CustomWrapper } from './salon.styled';
import { useFetchSpecifiedSalonDataQuery } from 'store/api/salon';
import { useTranslation } from 'react-i18next';
import NavTabs from './salon.navtabs';
import theme from 'theme';

const Salon = () => {
  const { salonId } = useParams<{ salonId: string }>();
  const [translation] = useTranslation();
  const { data, isFetching, isError } = useFetchSpecifiedSalonDataQuery({ salonId });
  const matches = useMediaQuery(theme.breakpoints.down('md'));

  if (isError) {
    return (
      <Modal open>
        <CustomWrapper>
          <Box height="100vh" display="flex" alignItems="center" justifyContent="center">
            <Stack maxWidth="40%">
              <Typography variant="h4" textAlign="center" marginBottom={2}>
                {translation('salon:error.unknown')}
              </Typography>
              <Button variant="text" component={Link} to="/" sx={{ alignSelf: 'center' }}>
                {translation('salon:goBackButton.aria')}
              </Button>
            </Stack>
          </Box>
        </CustomWrapper>
      </Modal>
    );
  }

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

  return (
    <Modal open>
      <CustomWrapper>
        <Stack
          direction="row"
          spacing={matches ? 1.5 : 3}
          sx={{ maxWidth: '100%' }}
          padding={matches ? '10px 15px 0' : '25px 25px 0'}
        >
          <CustomLink component={Link} to="/" aria-label={translation('salon:goBackButton.aria')}>
            <ChevronLeftIcon />
          </CustomLink>
          <Stack spacing={-0.5} overflow="hidden" alignSelf="center">
            <CustomSalonName variant="h4" noWrap>
              {data.name}
            </CustomSalonName>
            <CustomSalonAddress variant="body1" noWrap>{`${data.address} ${data.city}`}</CustomSalonAddress>
          </Stack>
        </Stack>
        <NavTabs />
      </CustomWrapper>
    </Modal>
  );
};

export default Salon;
