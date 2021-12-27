import { Button, Stack, Typography } from '@mui/material';
import { ReactNode } from 'react';
import { Trans, useTranslation } from 'react-i18next';
import { Box } from '@mui/system';
import { useLocation, Redirect } from 'react-router-dom';
import Spinner from 'components/Spinner';
import { useFetchAllSalonsQuery } from 'store/api/admin';
import { CustomEditHeader, CustomSalonsNavigation } from './salons.styled';
import NavTabs from './salons.navtabs';
import SalonsNavigation from 'components/AdminPanelNavigation/adminPanelNavigation.list';

const SalonsTemplate = ({ children }: { children: ReactNode }) => {
  const [translation] = useTranslation('admin');
  const { data = [], isFetching, isError } = useFetchAllSalonsQuery();
  const { pathname } = useLocation();

  if (isError)
    return (
      <Typography variant="h5" textAlign="center" marginTop={5}>
        {translation('salonTemplate.error')}
      </Typography>
    );

  if (isFetching) return <Spinner />;

  if (pathname === '/salons') return <Redirect to={`/salons/${data[0]._id || 1}/edit`} />;

  return (
    <Stack direction="row">
      <CustomSalonsNavigation padding={2}>
        <SalonsNavigation data={data} />
      </CustomSalonsNavigation>
      <Box display="flex" flexDirection="column" flexGrow={1}>
        {data.length > 0 ? (
          <>
            <CustomEditHeader>
              <Typography variant="h5">{translation('salonTemplate.heading.salonName')}</Typography>
              <Button variant="outlined" color="error" size="small">
                {translation('salonTemplate.deleteSalon')}
              </Button>
            </CustomEditHeader>
            <NavTabs />
            {children}
          </>
        ) : (
          <Box height="100%" display="flex" justifyContent="center" alignItems="center">
            <Typography variant="h5" textAlign="center">
              <Trans defaults={translation('salonTemplate.noSalons')} components={[<br key="breakLine" />]} />
            </Typography>
          </Box>
        )}
      </Box>
    </Stack>
  );
};

export default SalonsTemplate;
