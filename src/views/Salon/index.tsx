import { CircularProgress, Modal, Stack, useMediaQuery, Box, Typography, Button } from '@mui/material';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeftRounded';
import { useParams, Link, useRouteMatch } from 'react-router-dom';
import { CustomLink, CustomSalonAddress, CustomSalonName, CustomWrapper } from './salon.styled';
import { useFetchSpecifiedSalonDataQuery } from 'store/api/salon';
import { useTranslation } from 'react-i18next';
import NavTabs from './salon.navtabs';
import theme from 'theme';
import Information from './Components/Information';
import Reviews from './Components/Reviews';
import Portfolio from './Components/Portfolio';

const Salon = () => {
  const { salonId } = useParams<{ salonId: string }>();
  const [translation] = useTranslation();
  const { data, isFetching, isError } = useFetchSpecifiedSalonDataQuery({ salonId });
  const matches = useMediaQuery(theme.breakpoints.down('md'));
  const routeMatch = useRouteMatch(['/:salonId/portfolio', '/:salonId/reviews', '/:salonId']);
  const currentTab = routeMatch?.path;

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
        <NavTabs currentTab={currentTab} />
        <Box padding={matches ? '10px' : '25px'} flexGrow={1} overflow="auto">
          {currentTab === '/:salonId' && (
            <Information
              description={data.description}
              phone={data.phone}
              imageUrl={data.imageUrl}
              openingHours={data.openingHours}
              services={data.services}
              crew={data.crew}
            />
          )}
          {currentTab === '/:salonId/reviews' && <Reviews />}
          {currentTab === '/:salonId/portfolio' && <Portfolio />}
        </Box>
      </CustomWrapper>
    </Modal>
  );
};

export default Salon;
