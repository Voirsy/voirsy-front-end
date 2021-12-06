import { Container, Stack, Typography } from '@mui/material';
import { ReactNode, useEffect } from 'react';
import { Trans, useTranslation } from 'react-i18next';
import { Box } from '@mui/system';
import { useHistory } from 'react-router-dom';
import Spinner from 'components/Spinner';
import { CustomSalonsNavigation } from './salons.styled';
import NavTabs from './salons.navtabs';
import SalonsNavigation from 'components/AdminPanelNavigation/adminPanelNavigation.list';
import { useFetchAllSalonsQuery } from 'store/api/admin';

const SalonsTemplate = ({ children }: { children?: ReactNode }) => {
  const [translation] = useTranslation();
  const { data = [], isFetching, isError } = useFetchAllSalonsQuery();

  const history = useHistory();

  useEffect(() => {
    isFetching === false && data.length ? history.replace(`/salons/${data[0]._id}/details`) : null;
  }, [isFetching]);

  if (isFetching) return <Spinner />;

  if (isError)
    return (
      <Typography variant="h5" textAlign="center" marginTop={5}>
        {translation('admin:salonTemplate.error')}
      </Typography>
    );

  return (
    <Container maxWidth={false}>
      <Stack direction="row" spacing={2}>
        <CustomSalonsNavigation>
          <SalonsNavigation data={data} />
        </CustomSalonsNavigation>
        <Box display="flex" flexDirection="column" flexGrow={1}>
          {data.length > 0 ? (
            <>
              {/* <CustomEditHeader>
                <Typography variant="h5">Salon</Typography>
              </CustomEditHeader> */}
              <NavTabs />
              {children}
            </>
          ) : (
            <Box height="100%" display="flex" justifyContent="center" alignItems="center">
              <Typography variant="h5" textAlign="center">
                <Trans defaults={translation('admin:salonTemplate.noSalons')} components={[<br key="breakLine" />]} />
              </Typography>
            </Box>
          )}
        </Box>
      </Stack>
    </Container>
  );
};

export default SalonsTemplate;
